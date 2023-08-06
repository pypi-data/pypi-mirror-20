"""
Copyright 2012-2017 Ministerie van Sociale Zaken en Werkgelegenheid

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""
from __future__ import absolute_import

import datetime
import logging
import urllib2

from . import url_opener
from .. import utils, domain


class AnsibleConfigReport(domain.MetricSource):
    """ Class for Ansible config reports. """
    metric_source_name = 'Ansible configuratierapport'

    def __init__(self, url_open=None, **kwargs):
        self.__url_open = url_open or url_opener.UrlOpener(**kwargs).url_open
        super(AnsibleConfigReport, self).__init__()

    def java_versions(self, url):
        """ Return the number of Java versions. """
        versions = set()
        json = self.__get_json(url)
        if not json:
            return -1
        for environment in json:
            versions.add(environment.values()[0]['java version'])
        return len(versions)

    def app_server_versions(self, url):
        """ Return the number of App server versions. """
        versions = set()
        json = self.__get_json(url)
        if not json:
            return -1
        for environment in json:
            versions.add(environment.values()[0]['appserver version'])
        return len(versions)

    def datetime(self, *urls):
        """ Return the date of the report. """
        if not urls:
            return datetime.datetime.min
        min_date = datetime.datetime.now()
        for url in urls:
            json = self.__get_json(url)
            if not json:
                return datetime.datetime.min
            for environment in json:
                timestamp = utils.parse_iso_datetime(environment.values()[0]['timestamp'])
                min_date = min(timestamp, min_date)
        return min_date

    @utils.memoized
    def __get_json(self, url):
        """ Get the json from the url. """
        try:
            return utils.eval_json(self.__url_open(url).read())
        except url_opener.UrlOpener.url_open_exceptions as reason:
            logging.warning("Couldn't open %s: %s", url, reason)
        except ValueError as reason:
            logging.error("Couldn't parse JSON from %s: %s", url, reason)
