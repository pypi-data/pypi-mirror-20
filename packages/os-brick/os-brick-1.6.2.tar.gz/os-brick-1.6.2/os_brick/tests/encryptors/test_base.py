# Copyright (c) 2013 The Johns Hopkins University/Applied Physics Laboratory
# All Rights Reserved.
#
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.

from castellan.tests.unit.key_manager import fake
import mock

from os_brick import encryptors
from os_brick.tests import base


class VolumeEncryptorTestCase(base.TestCase):
    def _create(self):
        pass

    def setUp(self):
        super(VolumeEncryptorTestCase, self).setUp()
        self.connection_info = {
            "data": {
                "device_path": "/dev/disk/by-path/"
                "ip-192.0.2.0:3260-iscsi-iqn.2010-10.org.openstack"
                ":volume-fake_uuid-lun-1",
            },
        }
        self.root_helper = None
        self.keymgr = fake.fake_api()
        self.encryptor = self._create()


class BaseEncryptorTestCase(VolumeEncryptorTestCase):

    def assert_exec_has_calls(self, expected_calls, any_order=False):
        """Check that the root exec mock has calls, excluding child calls."""
        if any_order:
            self.assertSetEqual(set(expected_calls),
                                set(self.mock_execute.call_args_list))
        else:
            self.assertListEqual(expected_calls,
                                 self.mock_execute.call_args_list)

    def test_get_encryptors(self):

        encryption = {'control_location': 'front-end',
                      'provider': 'LuksEncryptor'}
        encryptor = encryptors.get_volume_encryptor(
            root_helper=self.root_helper,
            connection_info=self.connection_info,
            keymgr=self.keymgr,
            **encryption)

        self.assertIsInstance(encryptor,
                              encryptors.luks.LuksEncryptor,
                              "encryptor is not an instance of LuksEncryptor")

        encryption = {'control_location': 'front-end',
                      'provider': 'CryptsetupEncryptor'}
        encryptor = encryptors.get_volume_encryptor(
            root_helper=self.root_helper,
            connection_info=self.connection_info,
            keymgr=self.keymgr,
            **encryption)

        self.assertIsInstance(encryptor,
                              encryptors.cryptsetup.CryptsetupEncryptor,
                              "encryptor is not an instance of"
                              "CryptsetupEncryptor")

        encryption = {'control_location': 'front-end',
                      'provider': 'NoOpEncryptor'}
        encryptor = encryptors.get_volume_encryptor(
            root_helper=self.root_helper,
            connection_info=self.connection_info,
            keymgr=self.keymgr,
            **encryption)

        self.assertIsInstance(encryptor,
                              encryptors.nop.NoOpEncryptor,
                              "encryptor is not an instance of NoOpEncryptor")

    def test_get_error_encryptors(self):
        encryption = {'control_location': 'front-end',
                      'provider': 'ErrorEncryptor'}
        self.assertRaises(ValueError,
                          encryptors.get_volume_encryptor,
                          root_helper=self.root_helper,
                          connection_info=self.connection_info,
                          keymgr=self.keymgr,
                          **encryption)

    @mock.patch('os_brick.encryptors.LOG')
    def test_error_log(self, log):
        encryption = {'control_location': 'front-end',
                      'provider': 'TestEncryptor'}
        provider = 'TestEncryptor'
        try:
            encryptors.get_volume_encryptor(
                root_helper=self.root_helper,
                connection_info=self.connection_info,
                keymgr=self.keymgr,
                **encryption)
        except Exception as e:
            log.error.assert_called_once_with("Error instantiating "
                                              "%(provider)s: "
                                              "%(exception)s",
                                              {'provider': provider,
                                               'exception': e})
