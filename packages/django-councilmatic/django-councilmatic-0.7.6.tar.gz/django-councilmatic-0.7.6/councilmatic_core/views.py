import re
import json
import itertools
from operator import attrgetter
import urllib
from datetime import date, timedelta, datetime

from django.shortcuts import render, redirect
from django.conf import settings
from django.views.generic import TemplateView, ListView, DetailView
from django.views.decorators.clickjacking import xframe_options_exempt
from django.db.models import Max, Min
from django.core.cache import cache
from django.utils.text import slugify
from django.utils.decorators import method_decorator
from django.utils import timezone
from django.views.decorators.cache import never_cache

from haystack.forms import FacetedSearchForm
from haystack.views import FacetedSearchView

import pytz

from .models import Person, Bill, Organization, Event, Post


if (settings.USING_NOTIFICATIONS):
    from notifications.models import BillSearchSubscription

app_timezone = pytz.timezone(settings.TIME_ZONE)


class NeverCacheMixin(object):
    @method_decorator(never_cache)
    def dispatch(self, *args, **kwargs):
        return super(NeverCacheMixin, self).dispatch(*args, **kwargs)


class CouncilmaticFacetedSearchView(FacetedSearchView, NeverCacheMixin):

    def extra_context(self):

        extra = super(FacetedSearchView, self).extra_context()
        extra['request'] = self.request
        extra['facets'] = self.results.facet_counts()

        q_filters = ''
        url_params = [(p, val) for (p, val) in self.request.GET.items(
        ) if p != 'page' and p != 'selected_facets' and p != 'amp' and p != '_']
        selected_facet_vals = self.request.GET.getlist('selected_facets')
        search_term = self.request.GET.get('q')
        for facet_val in selected_facet_vals:
            url_params.append(('selected_facets', facet_val))
        if url_params:
            q_filters = urllib.parse.urlencode(url_params)

        extra['q_filters'] = q_filters

        selected_facets = {}
        for val in self.request.GET.getlist("selected_facets"):
            if val:
                [k, v] = val.split('_exact:', 1)
                try:
                    selected_facets[k].append(v)
                except KeyError:
                    selected_facets[k] = [v]

        extra['selected_facets'] = selected_facets

        extra['current_council_members'] = {
            p.current_member.person.name: p.label for p in Post.objects.all() if p.current_member
        }

        if (settings.USING_NOTIFICATIONS):
            extra['user_subscribed'] = False
            if self.request.user.is_authenticated():
                user = self.request.user
                extra['user'] = user

                search_params = {
                    'term': search_term,
                    'facets': selected_facets
                }

                try:
                    user.billsearchsubscriptions.get(user=user,
                                                     search_params__exact=search_params)
                    extra['user_subscribed'] = True
                except BillSearchSubscription.DoesNotExist:
                    extra['user_subscribed'] = False

        return extra


class CouncilmaticSearchForm(FacetedSearchForm):

    def __init__(self, *args, **kwargs):
        self.load_all = True

        super(CouncilmaticSearchForm, self).__init__(*args, **kwargs)

    def no_query_found(self):

        # return self.searchqueryset.order_by('-last_action_date').all()
        return self.searchqueryset.all()

# This is used by a context processor in settings.py to render these variables
# into the context of every page.


def city_context(request):
    relevant_settings = [
        'SITE_META',
        'FOOTER_CREDITS',
        'CITY_COUNCIL_NAME',
        'CITY_NAME',
        'CITY_NAME_SHORT',
        'CITY_VOCAB',
        'SEARCH_PLACEHOLDER_TEXT',
        'LEGISLATION_TYPE_DESCRIPTIONS',
        'LEGISTAR_URL',
        'DISQUS_SHORTNAME',
        'IMAGES',
        'MAP_CONFIG',
        'ANALYTICS_TRACKING_CODE',
        'ABOUT_BLURBS',
        'USING_NOTIFICATIONS'
    ]

    city_context = {s: getattr(settings, s, None) for s in relevant_settings}

    return city_context


class IndexView(TemplateView):

    template_name = 'councilmatic_core/index.html'
    bill_model = Bill
    event_model = Event

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)

        recently_passed = []
        # go back in time at 10-day intervals til you find 3 passed bills
        for i in range(0, -100, -10):

            today = timezone.now()

            begin = today + timedelta(days=i)
            end = today + timedelta(days=i - 10)

            leg_in_range = self.bill_model.objects\
                .exclude(last_action_date=None)\
                .filter(last_action_date__lte=begin)\
                .filter(last_action_date__gt=end)\
                .order_by('-last_action_date')
            passed_in_range = [l for l in leg_in_range
                               if l.inferred_status == 'Passed']

            recently_passed.extend(passed_in_range)
            if len(recently_passed) >= 3:
                recently_passed = recently_passed[:3]
                break

        upcoming_meetings = list(
            self.event_model.upcoming_committee_meetings())

        context.update({
            'recently_passed': recently_passed,
            'next_council_meeting': self.event_model.next_city_council_meeting(),
            'upcoming_committee_meetings': upcoming_meetings,
        })

        context.update(self.extra_context())

        return context

    def extra_context(self):
        """
        Override this in custom subclass to add more context variables if needed.
        """
        return {}


class AboutView(TemplateView):
    template_name = 'councilmatic_core/about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['timestamp'] = datetime.now(app_timezone).strftime('%m%d%Y%s')

        return context

    def extra_context(self):
        """
        Override this in custom subclass to add more context variables if needed.
        """
        return {}


class CouncilMembersView(ListView):
    template_name = 'councilmatic_core/council_members.html'
    context_object_name = 'posts'

    def get_queryset(self):
        if hasattr(settings, 'OCD_CITY_COUNCIL_ID'):
            get_kwarg = {'ocd_id': settings.OCD_CITY_COUNCIL_ID}
        else:
            get_kwarg = {'name': settings.OCD_CITY_COUNCIL_NAME}

        return Organization.objects.get(**get_kwarg).posts.all()

    def get_context_data(self, *args, **kwargs):
        context = super(CouncilMembersView, self).get_context_data(**kwargs)
        context['seo'] = self.get_seo_blob()

        context['map_geojson'] = None

        if settings.MAP_CONFIG:
            map_geojson = {
                'type': 'FeatureCollection',
                'features': []
            }

            for post in self.object_list:
                if post.shape:

                    council_member = "Vacant"
                    detail_link = ""
                    if post.current_member:
                        council_member = post.current_member.person.name
                        detail_link = post.current_member.person.slug

                    feature = {
                        'type': 'Feature',
                        'geometry': json.loads(post.shape),
                        'properties': {
                            'district': post.label,
                            'council_member': council_member,
                            'detail_link': '/person/' + detail_link,
                            'select_id': 'polygon-{}'.format(slugify(post.label)),
                        }
                    }

                    map_geojson['features'].append(feature)

            context['map_geojson'] = json.dumps(map_geojson)

        return context

    def get_seo_blob(self):
        seo = {}
        seo.update(settings.SITE_META)
        return seo


class BillDetailView(DetailView):
    model = Bill
    template_name = 'councilmatic_core/legislation.html'
    context_object_name = 'legislation'

    def get_context_data(self, **kwargs):
        context = super(BillDetailView, self).get_context_data(**kwargs)

        context['actions'] = self.get_object().actions.all().order_by('-order')
        bill = context['legislation']

        seo = {}
        seo.update(settings.SITE_META)
        seo['site_desc'] = bill.listing_description
        seo['title'] = '%s - %s' % (bill.friendly_name,
                                    settings.SITE_META['site_name'])
        context['seo'] = seo

        context['user_subscribed'] = False
        if self.request.user.is_authenticated():
            user = self.request.user
            context['user'] = user
            # check if person of interest is subscribed to by user

            if settings.USING_NOTIFICATIONS:
                for bas in user.billactionsubscriptions.all():

                    if bill == bas.bill:
                        context['user_subscribed'] = True
                        break

        return context


@method_decorator(xframe_options_exempt, name='dispatch')
class BillWidgetView(BillDetailView):
    template_name = 'councilmatic_core/widgets/legislation.html'


class CommitteesView(ListView):
    template_name = 'councilmatic_core/committees.html'
    context_object_name = 'committees'

    def get_queryset(self):
        return Organization.committees


class CommitteeDetailView(DetailView):
    model = Organization
    template_name = 'councilmatic_core/committee.html'
    context_object_name = 'committee'

    def get_context_data(self, **kwargs):
        context = super(CommitteeDetailView, self).get_context_data(**kwargs)

        committee = context['committee']
        context['memberships'] = committee.memberships.all()

        description = None

        if getattr(settings, 'COMMITTEE_DESCRIPTIONS', None):
            description = settings.COMMITTEE_DESCRIPTIONS.get(committee.slug)
            context['committee_description'] = description

        seo = {}
        seo.update(settings.SITE_META)

        if description:
            seo['site_desc'] = description
        else:
            seo['site_desc'] = "See what %s's %s has been up to!" % (
                settings.CITY_COUNCIL_NAME, committee.name)

        seo['title'] = '%s - %s' % (committee.name,
                                    settings.SITE_META['site_name'])
        context['seo'] = seo

        context['user_subscribed_actions'] = False
        context['user_subscribed_events'] = False
        if self.request.user.is_authenticated():
            user = self.request.user
            context['user'] = user
            # check if person of interest is subscribed to by user

            if settings.USING_NOTIFICATIONS:
                for cas in user.committeeactionsubscriptions.all():
                    if committee == cas.committee:
                        context['user_subscribed_actions'] = True
                for ces in user.committeeeventsubscriptions.all():
                    if committee == ces.committee:
                        context['user_subscribed_events'] = True

        return context


@method_decorator(xframe_options_exempt, name='dispatch')
class CommitteeWidgetView(CommitteeDetailView):
    template_name = 'councilmatic_core/widgets/committee.html'


class PersonDetailView(DetailView):
    model = Person
    template_name = 'councilmatic_core/person.html'
    context_object_name = 'person'

    def get_context_data(self, **kwargs):
        context = super(PersonDetailView, self).get_context_data(**kwargs)

        person = context['person']
        context['sponsored_legislation'] = [
            s.bill for s in person.primary_sponsorships.order_by('-_bill__last_action_date')[:10]]

        title = ''
        if person.current_council_seat:
            title = '%s %s' % (person.current_council_seat,
                               settings.CITY_VOCAB['COUNCIL_MEMBER'])
        elif person.latest_council_seat:
            title = 'Former %s, %s' % (
                settings.CITY_VOCAB['COUNCIL_MEMBER'], person.latest_council_seat)
        elif getattr(settings, 'EXTRA_TITLES', None) and person.slug in settings.EXTRA_TITLES:
            title = settings.EXTRA_TITLES[person.slug]
        context['title'] = title

        seo = {}
        seo.update(settings.SITE_META)
        if person.current_council_seat:
            short_name = re.sub(r',.*', '', person.name)
            seo['site_desc'] = '%s - %s representative in %s. See what %s has been up to!' % (
                person.name, person.current_council_seat, settings.CITY_COUNCIL_NAME, short_name)
        else:
            seo['site_desc'] = 'Details on %s, %s' % (
                person.name, settings.CITY_COUNCIL_NAME)
        seo['title'] = '%s - %s' % (person.name,
                                    settings.SITE_META['site_name'])
        seo['image'] = person.headshot_url
        context['seo'] = seo

        context['map_geojson'] = None

        if settings.MAP_CONFIG and person.latest_council_membership and person.latest_council_membership.post and person.latest_council_membership.post.shape:
            map_geojson = {
                'type': 'FeatureCollection',
                'features': []
            }

            feature = {
                'type': 'Feature',
                'geometry': json.loads(person.latest_council_membership.post.shape),
                'properties': {
                    'district': person.latest_council_membership.post.label,
                }
            }

            map_geojson['features'].append(feature)

            context['map_geojson'] = json.dumps(map_geojson)

        context['user_subscribed'] = False

        if (settings.USING_NOTIFICATIONS):

            if self.request.user.is_authenticated():
                user = self.request.user
                context['user'] = user
                # check if person of interest is subscribed to by user

                for ps in user.personsubscriptions.all():
                    if person == ps.person:
                        context['user_subscribed'] = True
                        break

        return context


@method_decorator(xframe_options_exempt, name='dispatch')
class PersonWidgetView(PersonDetailView):
    template_name = 'councilmatic_core/widgets/person.html'


class EventsView(ListView):
    template_name = 'councilmatic_core/events.html'

    def get_queryset(self):
        # Realize this is stupid. The reason this exists is so that
        # we can have this be a ListView in the inherited subclasses
        # if needed
        return []

    def get_context_data(self, **kwargs):
        context = super(EventsView, self).get_context_data(**kwargs)

        aggregates = Event.objects.aggregate(
            Min('start_time'), Max('start_time'))
        min_year, max_year = aggregates[
            'start_time__min'].year, aggregates['start_time__max'].year
        context['year_range'] = list(reversed(range(min_year, max_year + 1)))

        context['month_options'] = []
        for index in range(1, 13):
            month_name = datetime(datetime.now(app_timezone).date().year, index, 1).strftime('%B')
            context['month_options'].append([month_name, index])

        context['show_upcoming'] = True
        context['this_month'] = datetime.now(app_timezone).date().month
        context['this_year'] = datetime.now(app_timezone).date().year
        events_key = 'upcoming_events'

        upcoming_dates = Event.objects.filter(start_time__gt=datetime.now(app_timezone).date())

        current_year = self.request.GET.get('year')
        current_month = self.request.GET.get('month')

        # if there are no upcoming events, show the most recent month
        # that has events populated
        if not upcoming_dates and not current_year and not current_month:

            most_recent_past_starttime = Event.objects.order_by(
                '-start_time').first().start_time
            current_year = most_recent_past_starttime.year
            current_month = most_recent_past_starttime.month

        if current_year and current_month:
            events_key = 'month_events'
            upcoming_dates = Event.objects\
                                  .filter(start_time__year=int(current_year))\
                                  .filter(start_time__month=int(current_month))

            context['show_upcoming'] = False
            context['this_month'] = int(current_month)
            context['this_year'] = int(current_year)
            context['this_start_date'] = datetime(year=int(current_year), month=int(current_month), day=1)

        context['user_subscribed'] = False
        if self.request.user.is_authenticated():
            user = self.request.user
            context['user'] = user

            if settings.USING_NOTIFICATIONS:
                if (len(user.eventssubscriptions.all()) > 0):
                    context['user_subscribed'] = True

        upcoming_dates = upcoming_dates.order_by('start_time')

        day_grouper = lambda x: (
            x.start_time.year, x.start_time.month, x.start_time.day)
        context[events_key] = []

        for event_date, events in itertools.groupby(upcoming_dates, key=day_grouper):
            events = sorted(events, key=attrgetter('start_time'))
            context[events_key].append([date(*event_date), events])

        return context


class EventDetailView(DetailView):
    template_name = 'councilmatic_core/event.html'
    model = Event
    context_object_name = 'event'

    def get_context_data(self, **kwargs):
        context = super(EventDetailView, self).get_context_data(**kwargs)
        event = context['event']

        participants = [p.entity_name for p in event.participants.all()]
        context['participants'] = Organization.objects.filter(
            name__in=participants)

        seo = {}
        seo.update(settings.SITE_META)
        seo['site_desc'] = 'Public city council event on %s/%s/%s - view event participants & agenda items' % (
            event.start_time.month, event.start_time.day, event.start_time.year)
        seo['title'] = '%s Event - %s' % (event.name,
                                          settings.SITE_META['site_name'])
        context['seo'] = seo

        return context


def flush(request, flush_key):

    try:
        if flush_key == settings.FLUSH_KEY:
            cache.clear()
    except AttributeError:
        print("\n\n** NOTE: to use flush-cache, set FLUSH_KEY in settings_local.py **\n\n")

    return redirect('index')


@xframe_options_exempt
def pdfviewer(request):
    return render(request, 'councilmatic_core/pdfviewer.html')
