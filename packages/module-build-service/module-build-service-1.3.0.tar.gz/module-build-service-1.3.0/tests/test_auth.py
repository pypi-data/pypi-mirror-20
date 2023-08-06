# Copyright (c) 2016  Red Hat, Inc.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
# Written by Ralph Bean <rbean@redhat.com>

from nose.tools import raises, eq_


import unittest
import mock
from mock import patch

import module_build_service.auth
import module_build_service.errors


class TestAuthModule(unittest.TestCase):
    @raises(module_build_service.errors.Unauthorized)
    def test_get_user_no_token(self):
        request = mock.MagicMock()
        request.cookies.return_value = {}
        module_build_service.auth.get_user(request)

    @raises(module_build_service.errors.Unauthorized)
    @patch('module_build_service.auth._get_token_info')
    def test_get_user_failure(self, get_token_info):
        def mocked_get_token_info(token):
            return {"active": False}
        get_token_info.return_value = mocked_get_token_info

        request = mock.MagicMock()
        request.cookies.return_value = {"oidc_token", "1234"}
        module_build_service.auth.get_user(request)

    @raises(module_build_service.errors.Unauthorized)
    @patch('module_build_service.auth._get_token_info')
    def test_get_user_good(self, get_token_info):
        # https://www.youtube.com/watch?v=G-LtddOgUCE
        name = "Joey Jo Jo Junior Shabadoo"
        def mocked_get_token_info(token):
            return {"active": True, "username": name}
        get_token_info.return_value = mocked_get_token_info

        request = mock.MagicMock()
        request.cookies.return_value = {"oidc_token", "1234"}
        result = module_build_service.auth.get_user(request)
        eq_(result, name)

    def test_disable_authentication(self):
        with patch.dict('module_build_service.app.config', {'NO_AUTH': True}, clear=True):
            request = mock.MagicMock()
            eq_(module_build_service.auth.get_user(request), None)

    @raises(module_build_service.errors.Unauthorized)
    def test_misconfiguring_oidc_client_secrets_should_be_failed(self):
        request = mock.MagicMock()
        module_build_service.auth.get_user(request)
