import django
try:
    from django.conf.urls import patterns, url  # django 1.8, 1.9
except ImportError:
    from django.conf.urls import url

from waliki.settings import WALIKI_SLUG_PATTERN
from waliki.git.views import whatchanged, WhatchangedFeed, webhook_pull, history, version, diff


_pattern_list = [
    url(r'^_whatchanged/(?P<pag>\d+)$', whatchanged, name='waliki_whatchanged'),       # noqa
    url(r'^_whatchanged$', whatchanged, {'pag': '1'}, name='waliki_whatchanged'),       # noqa
    url(r'^_whatchanged/rss$', WhatchangedFeed(), name='waliki_whatchanged_rss'),

    url(r'^_hooks/pull/(?P<remote>[a-zA-Z0-9]+)$',
        webhook_pull, name='waliki_webhook_pull'),
    url(r'^(?P<slug>' + WALIKI_SLUG_PATTERN + ')/history/(?P<pag>\d+)$',
        history, name='waliki_history'),
    url(r'^(?P<slug>' + WALIKI_SLUG_PATTERN + ')/history/$',
        history, {'pag': '1'}, name='waliki_history'),

    url(r'^(?P<slug>' + WALIKI_SLUG_PATTERN + ')/version/(?P<version>[0-9a-f\^]{4,40})/raw$', version, {'raw': True},
        name='waliki_version_raw'),
    url(r'^(?P<slug>' + WALIKI_SLUG_PATTERN + \
        ')/version/(?P<version>[0-9a-f\^]{4,40})$', version, name='waliki_version'),

    url(r'^(?P<slug>' + WALIKI_SLUG_PATTERN + ')/diff/(?P<old>[0-9a-f\^]{4,40})\.\.(?P<new>[0-9a-f\^]{4,40})/raw$',
        diff, {'raw': True}, name='waliki_diff_raw'),

    url(r'^(?P<slug>' + WALIKI_SLUG_PATTERN + \
        ')/diff/(?P<old>[0-9a-f\^]{4,40})\.\.(?P<new>[0-9a-f\^]{4,40})$', diff, name='waliki_diff'),
]


if django.VERSION[:2] >= (1, 10):
    urlpatterns = _pattern_list
else:
    urlpatterns = patterns('waliki.git.views',
                           *_pattern_list
                           )
