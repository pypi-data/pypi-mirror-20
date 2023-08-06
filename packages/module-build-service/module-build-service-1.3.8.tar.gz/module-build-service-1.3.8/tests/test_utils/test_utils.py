# Copyright (c) 2017  Red Hat, Inc.
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

import unittest
from os import path
import vcr
import modulemd
from mock import patch
import module_build_service.utils
import module_build_service.scm
from module_build_service import models, conf
from module_build_service.errors import ProgrammingError, ValidationError
from tests import test_resuse_component_init_data, init_data, db
import mock
from mock import PropertyMock
import koji
import module_build_service.scheduler.handlers.components
from module_build_service.builder import GenericBuilder, KojiModuleBuilder

BASE_DIR = path.abspath(path.dirname(__file__))
CASSETTES_DIR = path.join(
    path.abspath(path.dirname(__file__)), '..', 'vcr-request-data')


class TestUtils(unittest.TestCase):

    @vcr.use_cassette(
        path.join(CASSETTES_DIR, 'tests.test_utils.TestUtils.test_format_mmd'))
    @patch('module_build_service.scm.SCM')
    def test_format_mmd(self, mocked_scm):
        mocked_scm.return_value.commit = \
            '620ec77321b2ea7b0d67d82992dda3e1d67055b4'
        # For all the RPMs in testmodule, get_latest is called
        hashes_returned = [
            '4ceea43add2366d8b8c5a622a2fb563b625b9abf',
            'fbed359411a1baa08d4a88e0d12d426fbf8f602c',
            '76f9d8c8e87eed0aab91034b01d3d5ff6bd5b4cb']
        mocked_scm.return_value.get_latest.side_effect = hashes_returned
        mmd = modulemd.ModuleMetadata()
        with open(path.join(BASE_DIR, '..', 'staged_data', 'testmodule.yaml')) \
                as mmd_file:
            mmd.loads(mmd_file)
        scmurl = \
            ('git://pkgs.stg.fedoraproject.org/modules/testmodule.git'
             '?#620ec77321b2ea7b0d67d82992dda3e1d67055b4')
        module_build_service.utils.format_mmd(mmd, scmurl)

        # Make sure all the commit hashes were properly set on the RPMs
        for i, pkg in enumerate(mmd.components.rpms.values()):
            self.assertEqual(
                pkg.ref, hashes_returned[i])

        self.assertEqual(mmd.buildrequires, {'base-runtime': 'master'})
        xmd = {
            'mbs': {
                'commit': '620ec77321b2ea7b0d67d82992dda3e1d67055b4',
                'buildrequires': {
                    'base-runtime': {
                        'ref': 'ae993ba84f4bce554471382ccba917ef16265f11',
                        'stream': 'master',
                        'version': '3'}},
                'scmurl': 'git://pkgs.stg.fedoraproject.org/modules/testmodule'
                          '.git?#620ec77321b2ea7b0d67d82992dda3e1d67055b4',
            }
        }
        self.assertEqual(mmd.xmd, xmd)

    def test_get_reusable_component_same(self):
        test_resuse_component_init_data()
        new_module = models.ModuleBuild.query.filter_by(id=2).one()
        rv = module_build_service.utils.get_reusable_component(
            db.session, new_module, 'tangerine')
        self.assertEqual(rv.package, 'tangerine')

    def test_get_reusable_component_different_perl_tangerine(self):
        test_resuse_component_init_data()
        second_module_build = models.ModuleBuild.query.filter_by(id=2).one()
        mmd = second_module_build.mmd()
        mmd.components.rpms['perl-Tangerine'].ref = \
            '00ea1da4192a2030f9ae023de3b3143ed647bbab'
        second_module_build.modulemd = mmd.dumps()
        second_module_perl_tangerine = models.ComponentBuild.query.filter_by(
            package='perl-Tangerine', module_id=2).one()
        second_module_perl_tangerine.ref = \
            '00ea1da4192a2030f9ae023de3b3143ed647bbab'
        db.session.commit()
        # Shares the same build order as the changed perl-Tangerine, but none
        # of the build orders before it are different (in this case there are
        # none)
        plc_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'perl-List-Compare')
        self.assertEqual(plc_rv.package, 'perl-List-Compare')

        # perl-Tangerine has a different commit hash
        pt_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'perl-Tangerine')
        self.assertEqual(pt_rv, None)

        # tangerine is the same but its in a build order that is after the
        # different perl-Tangerine, so it can't be reused
        tangerine_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'tangerine')
        self.assertEqual(tangerine_rv, None)

    def test_get_reusable_component_different_buildrequires_hash(self):
        test_resuse_component_init_data()
        second_module_build = models.ModuleBuild.query.filter_by(id=2).one()
        mmd = second_module_build.mmd()
        mmd.xmd['mbs']['buildrequires']['base-runtime']['ref'] = \
            'da39a3ee5e6b4b0d3255bfef95601890afd80709'
        second_module_build.modulemd = mmd.dumps()
        db.session.commit()

        plc_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'perl-List-Compare')
        self.assertEqual(plc_rv, None)

        # perl-Tangerine has a different commit hash
        pt_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'perl-Tangerine')
        self.assertEqual(pt_rv, None)

        # tangerine is the same but its in a build order that is after the
        # different perl-Tangerine, so it can't be reused
        tangerine_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'tangerine')
        self.assertEqual(tangerine_rv, None)

    def test_get_reusable_component_different_buildrequires(self):
        test_resuse_component_init_data()
        second_module_build = models.ModuleBuild.query.filter_by(id=2).one()
        mmd = second_module_build.mmd()
        mmd.buildrequires = {'some_module': 'master'}
        mmd.xmd['mbs']['buildrequires'] = {
            'some_module': {
                'ref': 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
                'stream': 'master',
                'version': '20170123140147'
            }
        }
        second_module_build.modulemd = mmd.dumps()
        db.session.commit()

        plc_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'perl-List-Compare')
        self.assertEqual(plc_rv, None)

        # perl-Tangerine has a different commit hash
        pt_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'perl-Tangerine')
        self.assertEqual(pt_rv, None)

        # tangerine is the same but its in a build order that is after the
        # different perl-Tangerine, so it can't be reused
        tangerine_rv = module_build_service.utils.get_reusable_component(
            db.session, second_module_build, 'tangerine')
        self.assertEqual(tangerine_rv, None)

    def test_validate_koji_tag_wrong_tag_arg_during_programming(self):
        """ Test that we fail on a wrong param name (non-existing one) due to
        programming error. """

        @module_build_service.utils.validate_koji_tag('wrong_tag_arg')
        def validate_koji_tag_programming_error(good_tag_arg, other_arg):
            pass

        with self.assertRaises(ProgrammingError):
            validate_koji_tag_programming_error('dummy', 'other_val')

    def test_validate_koji_tag_bad_tag_value(self):
        """ Test that we fail on a bad tag value. """

        @module_build_service.utils.validate_koji_tag('tag_arg')
        def validate_koji_tag_bad_tag_value(tag_arg):
            pass

        with self.assertRaises(ValidationError):
            validate_koji_tag_bad_tag_value('forbiddentagprefix-foo')

    def test_validate_koji_tag_bad_tag_value_in_list(self):
        """ Test that we fail on a list containing bad tag value. """

        @module_build_service.utils.validate_koji_tag('tag_arg')
        def validate_koji_tag_bad_tag_value_in_list(tag_arg):
            pass

        with self.assertRaises(ValidationError):
            validate_koji_tag_bad_tag_value_in_list([
                'module-foo', 'forbiddentagprefix-bar'])

    def test_validate_koji_tag_good_tag_value(self):
        """ Test that we pass on a good tag value. """

        @module_build_service.utils.validate_koji_tag('tag_arg')
        def validate_koji_tag_good_tag_value(tag_arg):
            return True

        self.assertEquals(
            validate_koji_tag_good_tag_value('module-foo'), True)

    def test_validate_koji_tag_good_tag_values_in_list(self):
        """ Test that we pass on a list of good tag values. """

        @module_build_service.utils.validate_koji_tag('tag_arg')
        def validate_koji_tag_good_tag_values_in_list(tag_arg):
            return True

        self.assertEquals(
            validate_koji_tag_good_tag_values_in_list(['module-foo',
                                                       'module-bar']), True)

    def test_validate_koji_tag_good_tag_value_in_dict(self):
        """ Test that we pass on a dict arg with default key
        and a good value. """

        @module_build_service.utils.validate_koji_tag('tag_arg')
        def validate_koji_tag_good_tag_value_in_dict(tag_arg):
            return True

        self.assertEquals(
            validate_koji_tag_good_tag_value_in_dict({'name': 'module-foo'}), True)

    def test_validate_koji_tag_good_tag_value_in_dict_nondefault_key(self):
        """ Test that we pass on a dict arg with non-default key
        and a good value. """

        @module_build_service.utils.validate_koji_tag('tag_arg',
                                                      dict_key='nondefault')
        def validate_koji_tag_good_tag_value_in_dict_nondefault_key(tag_arg):
            return True

        self.assertEquals(
            validate_koji_tag_good_tag_value_in_dict_nondefault_key(
               {'nondefault': 'module-foo'}), True)

    def test_validate_koji_tag_double_trouble_good(self):
        """ Test that we pass on a list of tags that are good. """

        expected = 'foo'

        @module_build_service.utils.validate_koji_tag(['tag_arg1', 'tag_arg2'])
        def validate_koji_tag_double_trouble(tag_arg1, tag_arg2):
            return expected

        actual = validate_koji_tag_double_trouble('module-1', 'module-2')
        self.assertEquals(actual, expected)

    def test_validate_koji_tag_double_trouble_bad(self):
        """ Test that we fail on a list of tags that are bad. """

        @module_build_service.utils.validate_koji_tag(['tag_arg1', 'tag_arg2'])
        def validate_koji_tag_double_trouble(tag_arg1, tag_arg2):
            pass

        with self.assertRaises(ValidationError):
            validate_koji_tag_double_trouble('module-1', 'BADNEWS-2')

    def test_validate_koji_tag_is_None(self):
        """ Test that we fail on a tag which is None. """

        @module_build_service.utils.validate_koji_tag('tag_arg')
        def validate_koji_tag_is_None(tag_arg):
            pass

        with self.assertRaises(ValidationError) as cm:
            validate_koji_tag_is_None(None)

        self.assertTrue(str(cm.exception).endswith(' No value provided.'))


class DummyModuleBuilder(GenericBuilder):
    """
    Dummy module builder
    """

    backend = "koji"
    _build_id = 0

    TAGGED_COMPONENTS = []

    @module_build_service.utils.validate_koji_tag('tag_name')
    def __init__(self, owner, module, config, tag_name, components):
        self.module_str = module
        self.tag_name = tag_name
        self.config = config


    def buildroot_connect(self, groups):
        pass

    def buildroot_prep(self):
        pass

    def buildroot_resume(self):
        pass

    def buildroot_ready(self, artifacts=None):
        return True

    def buildroot_add_dependency(self, dependencies):
        pass

    def buildroot_add_artifacts(self, artifacts, install=False):
        DummyModuleBuilder.TAGGED_COMPONENTS += artifacts

    def buildroot_add_repos(self, dependencies):
        pass

    def tag_artifacts(self, artifacts):
        pass

    @property
    def module_build_tag(self):
        return {"name": self.tag_name + "-build"}

    def build(self, artifact_name, source):
        DummyModuleBuilder._build_id += 1
        state = koji.BUILD_STATES['COMPLETE']
        reason = "Submitted %s to Koji" % (artifact_name)
        return DummyModuleBuilder._build_id, state, reason, None

    @staticmethod
    def get_disttag_srpm(disttag):
        # @FIXME
        return KojiModuleBuilder.get_disttag_srpm(disttag)

    def cancel_build(self, task_id):
        pass

    def list_tasks_for_components(self, component_builds=None, state='active'):
        pass

@patch("module_build_service.builder.GenericBuilder.default_buildroot_groups", return_value = {'build': [], 'srpm-build': []})
class TestBatches(unittest.TestCase):

    def setUp(self):
        test_resuse_component_init_data()
        GenericBuilder.register_backend_class(DummyModuleBuilder)

    def tearDown(self):
        init_data()
        DummyModuleBuilder.TAGGED_COMPONENTS = []
        GenericBuilder.register_backend_class(KojiModuleBuilder)

    def test_start_next_batch_build_reuse(self, default_buildroot_groups):
        module_build = models.ModuleBuild.query.filter_by(id=2).one()
        module_build.batch = 1

        builder = mock.MagicMock()
        further_work = module_build_service.utils.start_next_batch_build(
            conf, module_build, db.session, builder)

        # Batch number should increase.
        self.assertEqual(module_build.batch, 2)

        # KojiBuildChange messages in further_work should have build_new_state
        # set to COMPLETE, but the current component build state should be set
        # to BUILDING, so KojiBuildChange message handler handles the change
        # properly.
        for msg in further_work:
            if type(msg) == module_build_service.messaging.KojiBuildChange:
                self.assertEqual(msg.build_new_state, koji.BUILD_STATES['COMPLETE'])
                component_build = models.ComponentBuild.from_component_event(db.session, msg)
                self.assertEqual(component_build.state, koji.BUILD_STATES['BUILDING'])

        # When we handle these KojiBuildChange messages, MBS should tag all
        # the components just once.
        for msg in further_work:
            if type(msg) == module_build_service.messaging.KojiBuildChange:
                module_build_service.scheduler.handlers.components.complete(
                    conf, db.session, msg)

        # Since we have reused all the components in the batch, there should
        # be fake KojiRepoChange message.
        self.assertEqual(type(further_work[-1]), module_build_service.messaging.KojiRepoChange)

        # Check that packages have been tagged just once.
        self.assertEqual(len(DummyModuleBuilder.TAGGED_COMPONENTS), 2)
