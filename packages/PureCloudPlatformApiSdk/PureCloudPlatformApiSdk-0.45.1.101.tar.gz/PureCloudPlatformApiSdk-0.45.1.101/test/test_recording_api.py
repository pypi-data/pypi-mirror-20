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
from swagger_client.apis.recording_api import RecordingApi


class TestRecordingApi(unittest.TestCase):
    """ RecordingApi unit test stubs """

    def setUp(self):
        self.api = swagger_client.apis.recording_api.RecordingApi()

    def tearDown(self):
        pass

    def test_delete_conversation_id_recordings_recording_id_annotations_annotation_id(self):
        """
        Test case for delete_conversation_id_recordings_recording_id_annotations_annotation_id

        Delete annotation
        """
        pass

    def test_delete_mediaretentionpolicies(self):
        """
        Test case for delete_mediaretentionpolicies

        Delete media retention policies
        """
        pass

    def test_delete_mediaretentionpolicies_policy_id(self):
        """
        Test case for delete_mediaretentionpolicies_policy_id

        Delete a media retention policy
        """
        pass

    def test_delete_orphan_id(self):
        """
        Test case for delete_orphan_id

        Deletes a single orphan recording
        """
        pass

    def test_get_conversation_id_recordings(self):
        """
        Test case for get_conversation_id_recordings

        Get all of a Conversation's Recordings.
        """
        pass

    def test_get_conversation_id_recordings_recording_id(self):
        """
        Test case for get_conversation_id_recordings_recording_id

        Gets a specific recording.
        """
        pass

    def test_get_conversation_id_recordings_recording_id_annotations(self):
        """
        Test case for get_conversation_id_recordings_recording_id_annotations

        Get annotations for recording
        """
        pass

    def test_get_conversation_id_recordings_recording_id_annotations_annotation_id(self):
        """
        Test case for get_conversation_id_recordings_recording_id_annotations_annotation_id

        Get annotation
        """
        pass

    def test_get_localkeys_settings(self):
        """
        Test case for get_localkeys_settings

        gets a list local key settings data
        """
        pass

    def test_get_localkeys_settings_settings_id(self):
        """
        Test case for get_localkeys_settings_settings_id

        Get the local encryption settings
        """
        pass

    def test_get_mediaretentionpolicies(self):
        """
        Test case for get_mediaretentionpolicies

        Gets media retention policy list with query options to filter on name and enabled.
        """
        pass

    def test_get_mediaretentionpolicies_policy_id(self):
        """
        Test case for get_mediaretentionpolicies_policy_id

        Get a media retention policy
        """
        pass

    def test_get_orphan_id(self):
        """
        Test case for get_orphan_id

        Gets a single orphan recording
        """
        pass

    def test_get_orphan_id_media(self):
        """
        Test case for get_orphan_id_media

        Gets the media of a single orphan recording
        """
        pass

    def test_get_orphanrecordings(self):
        """
        Test case for get_orphanrecordings

        Gets all orphan recordings
        """
        pass

    def test_get_recordingkeys(self):
        """
        Test case for get_recordingkeys

        Get encryption key list
        """
        pass

    def test_get_recordingkeys_rotationschedule(self):
        """
        Test case for get_recordingkeys_rotationschedule

        Get key rotation schedule
        """
        pass

    def test_get_settings(self):
        """
        Test case for get_settings

        Get the Recording Settings for the Organization
        """
        pass

    def test_gets_screensessions(self):
        """
        Test case for gets_screensessions

        Retrieves a paged listing of screen recording sessions
        """
        pass

    def test_patch_mediaretentionpolicies_policy_id(self):
        """
        Test case for patch_mediaretentionpolicies_policy_id

        Patch a media retention policy
        """
        pass

    def test_patchs_screensessions_recordingsession_id(self):
        """
        Test case for patchs_screensessions_recordingsession_id

        Update a screen recording session
        """
        pass

    def test_post_conversation_id_recordings_recording_id_annotations(self):
        """
        Test case for post_conversation_id_recordings_recording_id_annotations

        Create annotation
        """
        pass

    def test_post_localkeys(self):
        """
        Test case for post_localkeys

        create a local recording key
        """
        pass

    def test_post_localkeys_settings(self):
        """
        Test case for post_localkeys_settings

        create settings for local key creation
        """
        pass

    def test_post_mediaretentionpolicies(self):
        """
        Test case for post_mediaretentionpolicies

        Create media retention policy
        """
        pass

    def test_post_recordingkeys(self):
        """
        Test case for post_recordingkeys

        Create encryption key
        """
        pass

    def test_put_conversation_id_recordings_recording_id(self):
        """
        Test case for put_conversation_id_recordings_recording_id

        Updates the retention records on a recording.
        """
        pass

    def test_put_conversation_id_recordings_recording_id_annotations_annotation_id(self):
        """
        Test case for put_conversation_id_recordings_recording_id_annotations_annotation_id

        Update annotation
        """
        pass

    def test_put_localkeys_settings_settings_id(self):
        """
        Test case for put_localkeys_settings_settings_id

        Update the local encryption settings
        """
        pass

    def test_put_mediaretentionpolicies_policy_id(self):
        """
        Test case for put_mediaretentionpolicies_policy_id

        Update a media retention policy
        """
        pass

    def test_put_orphan_id(self):
        """
        Test case for put_orphan_id

        Updates an orphan recording to a regular recording with retention values
        """
        pass

    def test_put_recordingkeys_rotationschedule(self):
        """
        Test case for put_recordingkeys_rotationschedule

        Update key rotation schedule
        """
        pass

    def test_put_settings(self):
        """
        Test case for put_settings

        Update the Recording Settings for the Organization
        """
        pass


if __name__ == '__main__':
    unittest.main()