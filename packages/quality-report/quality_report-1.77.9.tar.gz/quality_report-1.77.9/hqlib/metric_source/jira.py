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

from . import url_opener
from .. import utils, domain


class Jira(domain.MetricSource, url_opener.UrlOpener):
    """ Class representing the Jira instance. """
    metric_source_name = 'Jira'

    def __init__(self, url, username, password, open_bug_query_id=None,
                 open_security_bug_query_id=None, open_static_security_analysis_bug_query_id=None,
                 manual_test_cases_query_id=None,
                 user_stories_ready_query_id=None,
                 technical_debt_issues_query_id=None,
                 user_stories_without_security_risk_query_id=None,
                 user_stories_without_performance_risk_query_id=None,
                 manual_test_cases_duration_field='customfield_11700',
                 user_story_points_field='customfield_10002'):
        self.__url = url
        self.__open_bug_query_id = open_bug_query_id
        self.__open_security_bug_query_id = open_security_bug_query_id
        self.__open_static_security_analysis_bug_query_id = open_static_security_analysis_bug_query_id
        self.__manual_test_cases_query_id = manual_test_cases_query_id
        self.__manual_test_cases_duration_field = manual_test_cases_duration_field
        self.__user_stories_ready_query_id = user_stories_ready_query_id
        self.__user_story_points_field = user_story_points_field
        self.__technical_debt_issues_query_id = technical_debt_issues_query_id
        self.__user_stories_without_security_risk_query_id = user_stories_without_security_risk_query_id
        self.__user_stories_without_performance_risk_query_id = user_stories_without_performance_risk_query_id
        super(Jira, self).__init__(username=username, password=password)

    @utils.memoized
    def nr_open_bugs(self):
        """ Return the number of open bugs. """
        return self.__query_total(self.__open_bug_query_id)

    @utils.memoized
    def nr_open_security_bugs(self):
        """ Return the number of open security bugs. """
        return self.__query_total(self.__open_security_bug_query_id)

    @utils.memoized
    def nr_open_static_security_analysis_bugs(self):
        """ Return the number of open static security analysis bugs. """
        return self.__query_total(self.__open_static_security_analysis_bug_query_id)

    @utils.memoized
    def nr_technical_debt_issues(self):
        """ Return the number of technical debt issues. """
        return self.__query_total(self.__technical_debt_issues_query_id)

    @utils.memoized
    def manual_test_cases_time(self):
        """ Return the number of minutes spend on manual test cases. """
        return self.__query_sum(self.__manual_test_cases_query_id, self.__manual_test_cases_duration_field)

    @utils.memoized
    def nr_manual_test_cases(self):
        """ Return the number of manual test cases. """
        return self.__query_total(self.__manual_test_cases_query_id)

    @utils.memoized
    def nr_manual_test_cases_not_measured(self):
        """ Return the number of manual test cases whose duration has not been measured. """
        return self.__query_field_empty(self.__manual_test_cases_query_id, self.__manual_test_cases_duration_field)

    @utils.memoized
    def nr_story_points_ready(self):
        """ Return the number of user story points ready. """
        return self.__query_sum(self.__user_stories_ready_query_id, self.__user_story_points_field)

    @utils.memoized
    def nr_user_stories_without_security_risk_assessment(self):
        """ Return the number of user stories without security risk assessment. """
        return self.__query_total(self.__user_stories_without_security_risk_query_id)

    @utils.memoized
    def nr_user_stories_without_performance_risk_assessment(self):
        """ Return the number of user stories without performance risk assessment. """
        return self.__query_total(self.__user_stories_without_performance_risk_query_id)

    @utils.memoized
    def __query_total(self, query_id):
        """ Return the number of results of the specified query. """
        if not query_id:
            return -1
        query_url = self.__get_query_url(query_id)
        if not query_url:
            return -1
        try:
            json_string = self.url_open(query_url).read()
        except url_opener.UrlOpener.url_open_exceptions:
            return -1
        return int(utils.eval_json(json_string)['total'])

    def __query_sum(self, query_id, field):
        """ Return the sum of the fields as returned by the query. """
        if not query_id:
            return -1
        query_url = self.__get_query_url(query_id)
        if not query_url:
            return -1
        try:
            json_string = self.url_open(query_url).read()
        except url_opener.UrlOpener.url_open_exceptions:
            return -1
        total = 0
        issues = utils.eval_json(json_string)['issues']
        for issue in issues:
            try:
                total += float(issue['fields'][field])
            except TypeError:
                pass  # field is null
        return total

    def __query_field_empty(self, query_id, field):
        """ Return the number of query results with field empty (null). """
        if not query_id:
            return -1
        query_url = self.__get_query_url(query_id)
        if not query_url:
            return -1
        json_string = utils.eval_json(self.url_open(query_url).read())
        total = 0
        issues = json_string['issues']
        for issue in issues:
            try:
                int(issue['fields'][field])
            except TypeError:
                total += 1
        return total

    @utils.memoized
    def __get_query_url(self, query_id, search=True):
        """ Get the query url based on the query id. """
        url = self.__url + 'rest/api/2/filter/{qid}'.format(qid=query_id)
        try:
            json_string = self.url_open(url).read()
        except url_opener.UrlOpener.url_open_exceptions:
            return None
        url_type = 'searchUrl' if search else 'viewUrl'
        return utils.eval_json(json_string)[url_type]

    def nr_open_bugs_url(self):
        """ Return the url for the nr of open bug reports query. """
        return self.__get_query_url(self.__open_bug_query_id, search=False)

    def nr_open_security_bugs_url(self):
        """ Return the url for the nr of open security bug reports query. """
        return self.__get_query_url(self.__open_security_bug_query_id, search=False)

    def nr_open_static_security_analysis_bugs_url(self):
        """ Return the url for the nr of open static security analysis bug reports query. """
        return self.__get_query_url(self.__open_static_security_analysis_bug_query_id, search=False)

    def manual_test_cases_url(self):
        """ Return the url for the manual test cases query. """
        return self.__get_query_url(self.__manual_test_cases_query_id, search=False)

    def user_stories_ready_url(self):
        """ Return the url for the ready user stories query. """
        return self.__get_query_url(self.__user_stories_ready_query_id, search=False)

    def nr_technical_debt_issues_url(self):
        """ Return the url for the technical debt issues query. """
        return self.__get_query_url(self.__technical_debt_issues_query_id, search=False)

    def user_stories_without_security_risk_assessment_url(self):
        """ Return the url for the user stories without security risk assessment query. """
        return self.__get_query_url(self.__user_stories_without_security_risk_query_id, search=False)

    def user_stories_without_performance_risk_assessment_url(self):
        """ Return the url for the user stories without performance risk assessment query. """
        return self.__get_query_url(self.__user_stories_without_performance_risk_query_id, search=False)

    def url(self):
        """ Return the url of the Jira instance. """
        return self.__url
