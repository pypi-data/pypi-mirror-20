# coding: utf-8

"""
Copyright 2016 SmartBear Software

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

   ref: https://github.com/swagger-api/swagger-codegen
"""

from __future__ import absolute_import

import os
import sys
import unittest

import swagger_client
from swagger_client.rest import ApiException
from swagger_client.apis.languages_api import LanguagesApi


class TestLanguagesApi(unittest.TestCase):
    """ LanguagesApi unit test stubs """

    def setUp(self):
        self.api = swagger_client.apis.languages_api.LanguagesApi()

    def tearDown(self):
        pass

    def test_delete_language_id(self):
        """
        Test case for delete_language_id

        Delete Language (Deprecated)
        """
        pass

    def test_delete_languages_language_id(self):
        """
        Test case for delete_languages_language_id

        Delete Language
        """
        pass

    def test_get_language_id(self):
        """
        Test case for get_language_id

        Get language (Deprecated)
        """
        pass

    def test_get_languages(self):
        """
        Test case for get_languages

        Get the list of supported languages. (Deprecated)
        """
        pass

    def test_get_languages_language_id(self):
        """
        Test case for get_languages_language_id

        Get language
        """
        pass

    def test_get_translations(self):
        """
        Test case for get_translations

        Get all available languages for translation
        """
        pass

    def test_get_translations_builtin(self):
        """
        Test case for get_translations_builtin

        Get the builtin translation for a language
        """
        pass

    def test_get_translations_organization(self):
        """
        Test case for get_translations_organization

        Get effective translation for an organization by language
        """
        pass

    def test_get_translations_users_user_id(self):
        """
        Test case for get_translations_users_user_id

        Get effective language translation for a user
        """
        pass

    def test_post_languages(self):
        """
        Test case for post_languages

        Create Language (Deprecated)
        """
        pass


if __name__ == '__main__':
    unittest.main()