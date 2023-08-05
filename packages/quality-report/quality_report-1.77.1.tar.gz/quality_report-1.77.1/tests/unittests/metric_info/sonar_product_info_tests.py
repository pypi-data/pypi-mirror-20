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

import unittest

from hqlib import metric_source, metric_info, domain


class FakeSonar(object):  # pylint: disable=too-few-public-methods
    """ Fake Sonar to return a fixed version number. """
    @staticmethod
    def version(sonar_id):  # pylint: disable=unused-argument
        """ Return the version number of the product with the specified Sonar id. """
        return '1.2'


class SonarProductInfoTests(unittest.TestCase):
    """t tests for the Sonar product information class. """
    def setUp(self):
        self.__sonar = FakeSonar()
        self.__project = domain.Project('Organization', name='Project name',
                                        metric_sources={metric_source.Sonar: self.__sonar})
        self.__product = domain.Product(self.__project, metric_source_ids={self.__sonar: 'sonar:id'})
        self.__sonar_product_info = metric_info.SonarProductInfo(self.__sonar, self.__product)

    def test_sonar_id(self):
        """ Test that the Sonar id of the product equals the passed id. """
        self.assertEqual('sonar:id', self.__sonar_product_info.sonar_id())

    def test_latest_version_of_a_trunk_product(self):
        """ Test that the version number equals the version number as given by Sonar. """
        product = domain.Product(self.__project, metric_source_ids={self.__sonar: 'sonar:id'})
        sonar_product_info = metric_info.SonarProductInfo(self.__sonar, product)
        self.assertEqual('1.2', sonar_product_info.latest_version())

    def test_latest_version_of_a_trunk_without_sonar(self):
        """ Test that the product has no version number if Sonar isn't available. """
        product = domain.Product(self.__project)
        sonar_product_info = metric_info.SonarProductInfo(self.__sonar, product)
        self.assertEqual('', sonar_product_info.latest_version())
