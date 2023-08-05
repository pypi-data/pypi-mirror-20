# coding: utf-8

"""
    Unique ID

    API to look up or generate a unique study identifier

    OpenAPI spec version: 1.0.0
    Contact: scweber@stanford.edu
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""


from __future__ import absolute_import

import os
import sys
import unittest

import swagger_client
from swagger_client.rest import ApiException
from swagger_client.models.stanford_mrn_list import StanfordMrnList


class TestStanfordMrnList(unittest.TestCase):
    """ StanfordMrnList unit test stubs """

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def testStanfordMrnList(self):
        """
        Test StanfordMrnList
        """
        model = swagger_client.models.stanford_mrn_list.StanfordMrnList()


if __name__ == '__main__':
    unittest.main()
