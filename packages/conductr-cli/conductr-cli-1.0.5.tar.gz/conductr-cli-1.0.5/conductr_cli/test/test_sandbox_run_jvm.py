from conductr_cli.test.cli_test_case import CliTestCase, strip_margin
from conductr_cli import logging_setup, sandbox_run_jvm, sandbox_features
from conductr_cli.exceptions import BindAddressNotFound, InstanceCountError, BintrayUnreachableError, \
    SandboxImageNotFoundError, SandboxImageNotAvailableOfflineError, SandboxUnsupportedOsError, \
    SandboxUnsupportedOsArchError, JavaCallError, JavaUnsupportedVendorError, JavaUnsupportedVersionError, \
    JavaVersionParseError
from conductr_cli.sandbox_features import LoggingFeature
from conductr_cli.sandbox_run_jvm import BIND_TEST_PORT
from unittest.mock import call, patch, MagicMock
from requests.exceptions import HTTPError, ConnectionError
import ipaddress
import subprocess


class TestRun(CliTestCase):

    addr_range = ipaddress.ip_network('192.168.1.0/24', strict=True)
    tmp_dir = '~/.conductr/image/tmp'
    default_args = {
        'image_version': '2.0.0',
        'conductr_roles': [],
        'log_level': 'info',
        'nr_of_containers': 1,
        'addr_range': addr_range,
        'offline_mode': False,
        'no_wait': False,
        'tmp_dir': tmp_dir
    }

    def test_default_args(self):
        mock_validate_jvm_support = MagicMock()
        mock_validate_64bit_support = MagicMock()
        mock_cleanup_tmp_dir = MagicMock()

        bind_addr = MagicMock()
        bind_addrs = [bind_addr]
        mock_find_bind_addrs = MagicMock(return_value=bind_addrs)

        mock_core_extracted_dir = MagicMock()
        mock_agent_extracted_dir = MagicMock()
        mock_obtain_sandbox_image = MagicMock(return_value=(mock_core_extracted_dir, mock_agent_extracted_dir))

        mock_sandbox_stop = MagicMock()

        mock_core_pids = MagicMock()
        mock_start_core_instances = MagicMock(return_value=mock_core_pids)

        mock_agent_pids = MagicMock()
        mock_start_agent_instances = MagicMock(return_value=mock_agent_pids)

        input_args = MagicMock(**self.default_args)
        features = []

        with patch('conductr_cli.sandbox_run_jvm.validate_jvm_support', mock_validate_jvm_support), \
                patch('conductr_cli.sandbox_run_jvm.validate_64bit_support', mock_validate_64bit_support), \
                patch('conductr_cli.sandbox_run_jvm.cleanup_tmp_dir', mock_cleanup_tmp_dir), \
                patch('conductr_cli.sandbox_run_jvm.find_bind_addrs', mock_find_bind_addrs), \
                patch('conductr_cli.sandbox_run_jvm.obtain_sandbox_image', mock_obtain_sandbox_image), \
                patch('conductr_cli.sandbox_run_jvm.sandbox_stop', mock_sandbox_stop), \
                patch('conductr_cli.sandbox_run_jvm.start_core_instances', mock_start_core_instances), \
                patch('conductr_cli.sandbox_run_jvm.start_agent_instances', mock_start_agent_instances):
            result = sandbox_run_jvm.run(input_args, features)
            expected_result = sandbox_run_jvm.SandboxRunResult(mock_core_pids, bind_addrs,
                                                               mock_agent_pids, bind_addrs)
            self.assertEqual(expected_result, result)

        mock_validate_jvm_support.assert_called_once_with()
        mock_validate_64bit_support.assert_called_once_with()
        mock_cleanup_tmp_dir.assert_called_once_with(self.tmp_dir)
        mock_find_bind_addrs.assert_called_with(1, self.addr_range)
        mock_start_core_instances.assert_called_with(mock_core_extracted_dir,
                                                     self.tmp_dir,
                                                     bind_addrs,
                                                     [],
                                                     features,
                                                     'info')
        mock_start_agent_instances.assert_called_with(mock_agent_extracted_dir,
                                                      self.tmp_dir,
                                                      bind_addrs,
                                                      bind_addrs,
                                                      [],
                                                      features,
                                                      'info')

    def test_nr_of_core_agent_instances(self):
        mock_validate_jvm_support = MagicMock()
        mock_validate_64bit_support = MagicMock()
        mock_cleanup_tmp_dir = MagicMock()

        bind_addr1 = MagicMock()
        bind_addr2 = MagicMock()
        bind_addr3 = MagicMock()
        bind_addrs = [bind_addr1, bind_addr2, bind_addr3]
        mock_find_bind_addrs = MagicMock(return_value=bind_addrs)

        mock_core_extracted_dir = MagicMock()
        mock_agent_extracted_dir = MagicMock()
        mock_obtain_sandbox_image = MagicMock(return_value=(mock_core_extracted_dir, mock_agent_extracted_dir))

        mock_sandbox_stop = MagicMock()

        mock_core_pids = MagicMock()
        mock_start_core_instances = MagicMock(return_value=mock_core_pids)

        mock_agent_pids = MagicMock()
        mock_start_agent_instances = MagicMock(return_value=mock_agent_pids)

        args = self.default_args.copy()
        args.update({
            'nr_of_instances': '1:3'
        })
        input_args = MagicMock(**args)
        features = []

        with patch('conductr_cli.sandbox_run_jvm.validate_jvm_support', mock_validate_jvm_support), \
                patch('conductr_cli.sandbox_run_jvm.validate_64bit_support', mock_validate_64bit_support), \
                patch('conductr_cli.sandbox_run_jvm.cleanup_tmp_dir', mock_cleanup_tmp_dir), \
                patch('conductr_cli.sandbox_run_jvm.find_bind_addrs', mock_find_bind_addrs), \
                patch('conductr_cli.sandbox_run_jvm.obtain_sandbox_image', mock_obtain_sandbox_image), \
                patch('conductr_cli.sandbox_run_jvm.sandbox_stop', mock_sandbox_stop), \
                patch('conductr_cli.sandbox_run_jvm.start_core_instances', mock_start_core_instances), \
                patch('conductr_cli.sandbox_run_jvm.start_agent_instances', mock_start_agent_instances):
            result = sandbox_run_jvm.run(input_args, features)
            expected_result = sandbox_run_jvm.SandboxRunResult(mock_core_pids, [bind_addr1],
                                                               mock_agent_pids, [bind_addr1, bind_addr2, bind_addr3])
            self.assertEqual(expected_result, result)

        mock_validate_jvm_support.assert_called_once_with()
        mock_validate_64bit_support.assert_called_once_with()
        mock_cleanup_tmp_dir.assert_called_once_with(self.tmp_dir)
        mock_find_bind_addrs.assert_called_with(3, self.addr_range)
        mock_start_core_instances.assert_called_with(mock_core_extracted_dir,
                                                     self.tmp_dir,
                                                     [bind_addr1],
                                                     [],
                                                     features,
                                                     'info')
        mock_start_agent_instances.assert_called_with(mock_agent_extracted_dir,
                                                      self.tmp_dir,
                                                      [bind_addr1, bind_addr2, bind_addr3],
                                                      [bind_addr1],
                                                      [],
                                                      features,
                                                      'info')

    def test_roles(self):
        mock_validate_jvm_support = MagicMock()
        mock_validate_64bit_support = MagicMock()
        mock_cleanup_tmp_dir = MagicMock()

        bind_addr = MagicMock()
        bind_addrs = [bind_addr]
        mock_find_bind_addrs = MagicMock(return_value=bind_addrs)

        mock_core_extracted_dir = MagicMock()
        mock_agent_extracted_dir = MagicMock()
        mock_obtain_sandbox_image = MagicMock(return_value=(mock_core_extracted_dir, mock_agent_extracted_dir))

        mock_sandbox_stop = MagicMock()

        mock_core_pids = MagicMock()
        mock_start_core_instances = MagicMock(return_value=mock_core_pids)

        mock_agent_pids = MagicMock()
        mock_start_agent_instances = MagicMock(return_value=mock_agent_pids)

        args = self.default_args.copy()
        args.update({
            'conductr_roles': [['role1', 'role2'], ['role3']]
        })
        input_args = MagicMock(**args)

        mock_feature = MagicMock()
        features = [mock_feature]

        with patch('conductr_cli.sandbox_run_jvm.validate_jvm_support', mock_validate_jvm_support), \
                patch('conductr_cli.sandbox_run_jvm.validate_64bit_support', mock_validate_64bit_support), \
                patch('conductr_cli.sandbox_run_jvm.cleanup_tmp_dir', mock_cleanup_tmp_dir), \
                patch('conductr_cli.sandbox_run_jvm.find_bind_addrs', mock_find_bind_addrs), \
                patch('conductr_cli.sandbox_run_jvm.obtain_sandbox_image', mock_obtain_sandbox_image), \
                patch('conductr_cli.sandbox_run_jvm.sandbox_stop', mock_sandbox_stop), \
                patch('conductr_cli.sandbox_run_jvm.start_core_instances', mock_start_core_instances), \
                patch('conductr_cli.sandbox_run_jvm.start_agent_instances', mock_start_agent_instances):
            result = sandbox_run_jvm.run(input_args, features)
            expected_result = sandbox_run_jvm.SandboxRunResult(mock_core_pids, bind_addrs,
                                                               mock_agent_pids, bind_addrs)
            self.assertEqual(expected_result, result)

        mock_validate_jvm_support.assert_called_once_with()
        mock_validate_64bit_support.assert_called_once_with()
        mock_cleanup_tmp_dir.assert_called_once_with(self.tmp_dir)
        mock_find_bind_addrs.assert_called_with(1, self.addr_range)
        mock_start_core_instances.assert_called_with(mock_core_extracted_dir,
                                                     self.tmp_dir,
                                                     bind_addrs,
                                                     [['role1', 'role2'], ['role3']],
                                                     features,
                                                     'info')
        mock_start_agent_instances.assert_called_with(mock_agent_extracted_dir,
                                                      self.tmp_dir,
                                                      bind_addrs,
                                                      bind_addrs,
                                                      [['role1', 'role2'], ['role3']],
                                                      features,
                                                      'info')


class TestInstanceCount(CliTestCase):
    def test_x_y_format(self):
        nr_of_core_instances, nr_of_agent_instances = sandbox_run_jvm.instance_count(2, '2:3')
        self.assertEqual(nr_of_core_instances, 2)
        self.assertEqual(nr_of_agent_instances, 3)

    def test_number_format(self):
        nr_of_core_instances, nr_of_agent_instances = sandbox_run_jvm.instance_count(2, '5')
        self.assertEqual(nr_of_core_instances, 1)
        self.assertEqual(nr_of_agent_instances, 5)

    def test_invalid_format(self):
        self.assertRaises(InstanceCountError, sandbox_run_jvm.instance_count, 2, 'FOO')


class TestFindBindAddresses(CliTestCase):
    nr_of_instances = 3
    addr_range = ipaddress.ip_network('192.168.1.0/24', strict=True)

    def test_found(self):
        mock_can_bind = MagicMock(return_value=True)
        mock_addr_alias_setup_instructions = MagicMock(return_value="test")

        with patch('conductr_cli.host.can_bind', mock_can_bind), \
                patch('conductr_cli.host.addr_alias_setup_instructions', mock_addr_alias_setup_instructions):
            result = sandbox_run_jvm.find_bind_addrs(self.nr_of_instances, self.addr_range)
            self.assertEqual([
                ipaddress.ip_address('192.168.1.1'),
                ipaddress.ip_address('192.168.1.2'),
                ipaddress.ip_address('192.168.1.3')
            ], result)

        self.assertEqual([
            call(ipaddress.ip_address('192.168.1.1'), BIND_TEST_PORT),
            call(ipaddress.ip_address('192.168.1.2'), BIND_TEST_PORT),
            call(ipaddress.ip_address('192.168.1.3'), BIND_TEST_PORT)
        ], mock_can_bind.call_args_list)

        mock_addr_alias_setup_instructions.assert_not_called()

    def test_not_found(self):
        mock_can_bind = MagicMock(return_value=False)
        mock_addr_alias_setup_instructions = MagicMock(return_value="test")

        with patch('conductr_cli.host.can_bind', mock_can_bind), \
                patch('conductr_cli.host.addr_alias_setup_instructions', mock_addr_alias_setup_instructions):
            self.assertRaises(BindAddressNotFound, sandbox_run_jvm.find_bind_addrs, 3, self.addr_range)

        self.assertEqual([
            call(addr, BIND_TEST_PORT) for addr in self.addr_range.hosts()
        ], mock_can_bind.call_args_list)

        mock_addr_alias_setup_instructions.assert_called_once_with(
            [ipaddress.ip_address('192.168.1.1'),
             ipaddress.ip_address('192.168.1.2'),
             ipaddress.ip_address('192.168.1.3')],
            self.addr_range.netmask)

    def test_partial_found(self):
        mock_can_bind = MagicMock(side_effect=[
            True if idx == 0 else False
            for idx, addr in enumerate(self.addr_range.hosts())
        ])
        mock_addr_alias_setup_instructions = MagicMock(return_value="test")

        with patch('conductr_cli.host.can_bind', mock_can_bind), \
                patch('conductr_cli.host.addr_alias_setup_instructions', mock_addr_alias_setup_instructions):
            self.assertRaises(BindAddressNotFound, sandbox_run_jvm.find_bind_addrs, 3, self.addr_range)

        self.assertEqual([
            call(addr, BIND_TEST_PORT) for addr in self.addr_range.hosts()
        ], mock_can_bind.call_args_list)

        mock_addr_alias_setup_instructions.assert_called_once_with(
            [ipaddress.ip_address('192.168.1.2'),
             ipaddress.ip_address('192.168.1.3')],
            self.addr_range.netmask)


class TestObtainSandboxImage(CliTestCase):
    def test_obtain_macos_artefact_from_bintray(self):
        mock_is_macos = MagicMock(return_value=True)
        mock_is_64bit = MagicMock(return_value=True)
        mock_download_sandbox_image = \
            MagicMock(side_effect=[
                '/cache_dir/conductr-2.0.0-Mac_OS_X-x86_64.tgz',
                '/cache_dir/conductr-agent-2.0.0-Mac_OS_X-x86_64.tgz'
            ])
        mock_glob = MagicMock(side_effect=[[], []])
        mock_os_path_exists = MagicMock(side_effect=[False, False])
        mock_os_makedirs = MagicMock()
        mock_os_path_basename = MagicMock()
        mock_shutil_unpack_archive = MagicMock()
        mock_os_listdir = MagicMock(side_effect=[
            ['conductr-2.0.0'],  # Top level directory inside the core archive
            ['core-some-file-a', 'core-some-file-b'],  # Extracted files from core archive
            ['conductr-agent-2.0.0'],  # Top level directory inside the agent archive
            ['agent-some-file-a', 'agent-some-file-b'],  # Extracted files from agent archive
        ])
        mock_shutil_move = MagicMock()
        mock_os_rmdir = MagicMock()

        with patch('conductr_cli.host.is_macos', mock_is_macos), \
                patch('conductr_cli.host.is_64bit', mock_is_64bit), \
                patch('conductr_cli.sandbox_run_jvm.download_sandbox_image', mock_download_sandbox_image), \
                patch('glob.glob', mock_glob), \
                patch('os.path.exists', mock_os_path_exists), \
                patch('os.makedirs', mock_os_makedirs), \
                patch('os.path.basename', mock_os_path_basename), \
                patch('shutil.unpack_archive', mock_shutil_unpack_archive), \
                patch('os.listdir', mock_os_listdir), \
                patch('shutil.move', mock_shutil_move), \
                patch('os.rmdir', mock_os_rmdir):
            result = sandbox_run_jvm.obtain_sandbox_image('/cache_dir', '2.0.0', offline_mode=False)
            self.assertEqual(('/cache_dir/core', '/cache_dir/agent'), result)

        mock_glob.assert_has_calls([
            call('/cache_dir/conductr-2.0.0-Mac_OS_X-*64.tgz'),
            call('/cache_dir/conductr-agent-2.0.0-Mac_OS_X-*64.tgz')
        ])

        mock_download_sandbox_image.assert_has_calls([
            call('/cache_dir',
                 package_name='ConductR-Universal',
                 artefact_type='core',
                 image_version='2.0.0'),
            call('/cache_dir',
                 package_name='ConductR-Agent-Universal',
                 artefact_type='agent',
                 image_version='2.0.0')
        ])

        mock_shutil_move.assert_has_calls([
            call('/cache_dir/core/conductr-2.0.0/core-some-file-a', '/cache_dir/core/core-some-file-a'),
            call('/cache_dir/core/conductr-2.0.0/core-some-file-b', '/cache_dir/core/core-some-file-b'),
            call('/cache_dir/agent/conductr-agent-2.0.0/agent-some-file-a', '/cache_dir/agent/agent-some-file-a'),
            call('/cache_dir/agent/conductr-agent-2.0.0/agent-some-file-b', '/cache_dir/agent/agent-some-file-b')
        ])

        mock_os_rmdir.assert_has_calls([
            call('/cache_dir/core/conductr-2.0.0'),
            call('/cache_dir/agent/conductr-agent-2.0.0')
        ])

    def test_obtain_linux_artefact_from_bintray(self):
        mock_is_macos = MagicMock(return_value=False)
        mock_is_linux = MagicMock(return_value=True)
        mock_is_64bit = MagicMock(return_value=True)
        mock_download_sandbox_image = \
            MagicMock(side_effect=[
                '/cache_dir/conductr-2.0.0-Linux-x86_64.tgz',
                '/cache_dir/conductr-agent-2.0.0-Linux-x86_64.tgz'
            ])
        mock_glob = MagicMock(side_effect=[[], []])
        mock_os_path_exists = MagicMock(side_effect=[False, False])
        mock_os_makedirs = MagicMock()
        mock_os_path_basename = MagicMock()
        mock_shutil_unpack_archive = MagicMock()
        mock_os_listdir = MagicMock(side_effect=[
            ['conductr-2.0.0'],  # Top level directory inside the core archive
            ['core-some-file-a', 'core-some-file-b'],  # Extracted files from core archive
            ['conductr-agent-2.0.0'],  # Top level directory inside the agent archive
            ['agent-some-file-a', 'agent-some-file-b'],  # Extracted files from agent archive
        ])
        mock_shutil_move = MagicMock()
        mock_os_rmdir = MagicMock()

        with patch('conductr_cli.host.is_macos', mock_is_macos), \
                patch('conductr_cli.host.is_linux', mock_is_linux), \
                patch('conductr_cli.host.is_64bit', mock_is_64bit), \
                patch('conductr_cli.sandbox_run_jvm.download_sandbox_image', mock_download_sandbox_image), \
                patch('glob.glob', mock_glob), \
                patch('os.path.exists', mock_os_path_exists), \
                patch('os.makedirs', mock_os_makedirs), \
                patch('os.path.basename', mock_os_path_basename), \
                patch('shutil.unpack_archive', mock_shutil_unpack_archive), \
                patch('os.listdir', mock_os_listdir), \
                patch('shutil.move', mock_shutil_move), \
                patch('os.rmdir', mock_os_rmdir):
            result = sandbox_run_jvm.obtain_sandbox_image('/cache_dir', '2.0.0', offline_mode=False)
            self.assertEqual(('/cache_dir/core', '/cache_dir/agent'), result)

        mock_glob.assert_has_calls([
            call('/cache_dir/conductr-2.0.0-Linux-*64.tgz'),
            call('/cache_dir/conductr-agent-2.0.0-Linux-*64.tgz')
        ])

        mock_download_sandbox_image.assert_has_calls([
            call('/cache_dir',
                 package_name='ConductR-Universal',
                 image_version='2.0.0',
                 artefact_type='core'),
            call('/cache_dir',
                 package_name='ConductR-Agent-Universal',
                 image_version='2.0.0',
                 artefact_type='agent')
        ])

        mock_shutil_move.assert_has_calls([
            call('/cache_dir/core/conductr-2.0.0/core-some-file-a', '/cache_dir/core/core-some-file-a'),
            call('/cache_dir/core/conductr-2.0.0/core-some-file-b', '/cache_dir/core/core-some-file-b'),
            call('/cache_dir/agent/conductr-agent-2.0.0/agent-some-file-a', '/cache_dir/agent/agent-some-file-a'),
            call('/cache_dir/agent/conductr-agent-2.0.0/agent-some-file-b', '/cache_dir/agent/agent-some-file-b')
        ])

        mock_os_rmdir.assert_has_calls([
            call('/cache_dir/core/conductr-2.0.0'),
            call('/cache_dir/agent/conductr-agent-2.0.0')
        ])

    def test_sandbox_image_not_available_offline(self):
        mock_os_path_exists = MagicMock(side_effect=[False, False])

        with patch('os.path.exists', mock_os_path_exists):
            self.assertRaises(SandboxImageNotAvailableOfflineError,
                              sandbox_run_jvm.obtain_sandbox_image, '/cache_dir', '1.0.0', True)

    def test_obtain_from_cache(self):
        mock_download_sandbox_image = MagicMock()
        mock_glob = MagicMock(side_effect=[
            ['~/.conductr/images/conductr-2.0.0-Mac_OS_X-*64.tgz'],
            ['~/.conductr/images/conductr-agent-2.0.0-Mac_OS_X-*64.tgz']
        ])
        mock_os_path_exists = MagicMock(side_effect=[True, True])
        mock_shutil_rmtree = MagicMock()
        mock_os_makedirs = MagicMock()
        mock_os_path_basename = MagicMock()
        mock_shutil_unpack_archive = MagicMock()
        mock_os_listdir = MagicMock(side_effect=[
            ['conductr-2.0.0'],  # Top level directory inside the core archive
            ['core-some-file-a', 'core-some-file-b'],  # Extracted files from core archive
            ['conductr-agent-2.0.0'],  # Top level directory inside the agent archive
            ['agent-some-file-a', 'agent-some-file-b'],  # Extracted files from agent archive
        ])
        mock_shutil_move = MagicMock()
        mock_os_rmdir = MagicMock()

        with patch('conductr_cli.sandbox_run_jvm.download_sandbox_image', mock_download_sandbox_image), \
                patch('glob.glob', mock_glob), \
                patch('os.path.exists', mock_os_path_exists), \
                patch('shutil.rmtree', mock_shutil_rmtree), \
                patch('os.makedirs', mock_os_makedirs), \
                patch('os.path.basename', mock_os_path_basename), \
                patch('shutil.unpack_archive', mock_shutil_unpack_archive), \
                patch('os.listdir', mock_os_listdir), \
                patch('shutil.move', mock_shutil_move), \
                patch('os.rmdir', mock_os_rmdir):
            result = sandbox_run_jvm.obtain_sandbox_image('/cache_dir', '1.0.0', offline_mode=False)
            self.assertEqual(('/cache_dir/core', '/cache_dir/agent'), result)

        mock_download_sandbox_image.assert_not_called()

        mock_shutil_rmtree.assert_has_calls([
            call('/cache_dir/core'),
            call('/cache_dir/agent')
        ])

        mock_os_rmdir.assert_has_calls([
            call('/cache_dir/core/conductr-2.0.0'),
            call('/cache_dir/agent/conductr-agent-2.0.0')
        ])

    def test_unsupported_os(self):
        mock_is_macos = MagicMock(return_value=False)
        mock_is_linux = MagicMock(return_value=False)
        mock_os_path_exists = MagicMock(side_effect=[False, False, False, False])

        with patch('conductr_cli.host.is_macos', mock_is_macos), \
                patch('conductr_cli.host.is_linux', mock_is_linux), \
                patch('os.path.exists', mock_os_path_exists):
            self.assertRaises(SandboxUnsupportedOsError,
                              sandbox_run_jvm.obtain_sandbox_image,
                              '/cache_dir',
                              '2.0.0',
                              offline_mode=False)


class TestStartCore(CliTestCase):
    extract_dir = '/User/tester/.conductr/images/core'

    tmp_dir = '/User/tester/.conductr/images/tmp'

    addrs = [
        ipaddress.ip_address('192.168.1.1'),
        ipaddress.ip_address('192.168.1.2'),
        ipaddress.ip_address('192.168.1.3')
    ]

    log_level = 'info'

    def test_start_instances(self):
        conductr_roles = []
        features = []

        mock_popen = MagicMock(side_effect=[
            self.mock_pid(1001),
            self.mock_pid(1002),
            self.mock_pid(1003)
        ])

        with patch('subprocess.Popen', mock_popen):
            result = sandbox_run_jvm.start_core_instances(self.extract_dir,
                                                          self.tmp_dir,
                                                          self.addrs,
                                                          conductr_roles,
                                                          features,
                                                          self.log_level)
            self.assertEqual([1001, 1002, 1003], result)

        self.assertEqual([
            call([
                '{}/bin/conductr'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.ip={}'.format(self.addrs[0]),
                '-Dconductr.resource-provider.match-offer-roles=off'
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.ip={}'.format(self.addrs[1]),
                '-Dconductr.resource-provider.match-offer-roles=off',
                '--seed', '{}:9004'.format(self.addrs[0])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.ip={}'.format(self.addrs[2]),
                '-Dconductr.resource-provider.match-offer-roles=off',
                '--seed', '{}:9004'.format(self.addrs[0])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
        ], mock_popen.call_args_list)

    def test_roles_and_features(self):
        conductr_roles = [['role1', 'role2'], ['role3']]
        features = [LoggingFeature("v1", "2.0.0", offline_mode=False)]

        mock_popen = MagicMock(side_effect=[
            self.mock_pid(1001),
            self.mock_pid(1002),
            self.mock_pid(1003)
        ])

        with patch('subprocess.Popen', mock_popen):
            result = sandbox_run_jvm.start_core_instances(self.extract_dir,
                                                          self.tmp_dir,
                                                          self.addrs,
                                                          conductr_roles,
                                                          features,
                                                          self.log_level)
            self.assertEqual([1001, 1002, 1003], result)

        self.assertEqual([
            call([
                '{}/bin/conductr'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.ip={}'.format(self.addrs[0]),
                '-Dconductr.resource-provider.match-offer-roles=on',
                '-Dcontrail.syslog.server.port=9200',
                '-Dcontrail.syslog.server.elasticsearch.enabled=on'
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.ip={}'.format(self.addrs[1]),
                '-Dconductr.resource-provider.match-offer-roles=on',
                '-Dcontrail.syslog.server.port=9200',
                '-Dcontrail.syslog.server.elasticsearch.enabled=on',
                '--seed', '{}:9004'.format(self.addrs[0])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.ip={}'.format(self.addrs[2]),
                '-Dconductr.resource-provider.match-offer-roles=on',
                '-Dcontrail.syslog.server.port=9200',
                '-Dcontrail.syslog.server.elasticsearch.enabled=on',
                '--seed', '{}:9004'.format(self.addrs[0])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
        ], mock_popen.call_args_list)

    def mock_pid(self, pid_value):
        mock_process = MagicMock()
        mock_process.pid = pid_value
        return mock_process


class TestStartAgent(CliTestCase):
    extract_dir = '/User/tester/.conductr/images/agent'

    tmp_dir = '/User/tester/.conductr/images/tmp'

    addrs = [
        ipaddress.ip_address('192.168.1.1'),
        ipaddress.ip_address('192.168.1.2'),
        ipaddress.ip_address('192.168.1.3')
    ]

    log_level = 'info'

    def test_start_instances(self):
        mock_popen = MagicMock(side_effect=[
            self.mock_pid(1001),
            self.mock_pid(1002),
            self.mock_pid(1003)
        ])

        with patch('subprocess.Popen', mock_popen):
            result = sandbox_run_jvm.start_agent_instances(self.extract_dir,
                                                           self.tmp_dir,
                                                           self.addrs,
                                                           self.addrs,
                                                           conductr_roles=[],
                                                           features=[],
                                                           log_level=self.log_level)
            self.assertEqual([1001, 1002, 1003], result)

        self.assertEqual([
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[0]),
                '--core-node', '{}:9004'.format(self.addrs[0])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[1]),
                '--core-node', '{}:9004'.format(self.addrs[1])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[2]),
                '--core-node', '{}:9004'.format(self.addrs[2])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
        ], mock_popen.call_args_list)

    def test_roles_and_features(self):
        mock_popen = MagicMock(side_effect=[
            self.mock_pid(1001),
            self.mock_pid(1002),
            self.mock_pid(1003)
        ])

        conductr_roles = [['role1', 'role2'], ['role3']]
        features = [LoggingFeature('v2', '2.0.0', offline_mode=False)]

        with patch('subprocess.Popen', mock_popen):
            result = sandbox_run_jvm.start_agent_instances(self.extract_dir,
                                                           self.tmp_dir,
                                                           self.addrs,
                                                           self.addrs,
                                                           conductr_roles=conductr_roles,
                                                           features=features,
                                                           log_level=self.log_level)
            self.assertEqual([1001, 1002, 1003], result)

        self.assertEqual([
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[0]),
                '--core-node', '{}:9004'.format(self.addrs[0]),
                '-Dconductr.agent.roles.0=role1',
                '-Dconductr.agent.roles.1=role2',
                '-Dconductr.agent.roles.2=elasticsearch',
                '-Dconductr.agent.roles.3=kibana',
                '-Dcontrail.syslog.server.port=9200',
                '-Dcontrail.syslog.server.elasticsearch.enabled=on'
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[1]),
                '--core-node', '{}:9004'.format(self.addrs[1]),
                '-Dconductr.agent.roles.0=role3',
                '-Dcontrail.syslog.server.port=9200',
                '-Dcontrail.syslog.server.elasticsearch.enabled=on'
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[2]),
                '--core-node', '{}:9004'.format(self.addrs[2]),
                '-Dconductr.agent.roles.0=role1',
                '-Dconductr.agent.roles.1=role2',
                '-Dcontrail.syslog.server.port=9200',
                '-Dcontrail.syslog.server.elasticsearch.enabled=on'
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
        ], mock_popen.call_args_list)

    def test_start_instances_with_less_number_of_core_nodes(self):
        mock_popen = MagicMock(side_effect=[
            self.mock_pid(1001),
            self.mock_pid(1002),
            self.mock_pid(1003)
        ])

        conductr_roles = []
        features = []

        with patch('subprocess.Popen', mock_popen):
            result = sandbox_run_jvm.start_agent_instances(self.extract_dir,
                                                           self.tmp_dir,
                                                           self.addrs,
                                                           self.addrs[0:2],
                                                           conductr_roles=conductr_roles,
                                                           features=features,
                                                           log_level=self.log_level)
            self.assertEqual([1001, 1002, 1003], result)

        self.assertEqual([
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[0]),
                '--core-node', '{}:9004'.format(self.addrs[0])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[1]),
                '--core-node', '{}:9004'.format(self.addrs[1])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
            call([
                '{}/bin/conductr-agent'.format(self.extract_dir),
                '-Djava.io.tmpdir={}'.format(self.tmp_dir),
                '-Dakka.loglevel={}'.format(self.log_level),
                '-Dconductr.agent.ip={}'.format(self.addrs[2]),
                '--core-node', '{}:9004'.format(self.addrs[0])
            ], cwd=self.extract_dir, start_new_session=True, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL),
        ], mock_popen.call_args_list)

    def mock_pid(self, pid_value):
        mock_process = MagicMock()
        mock_process.pid = pid_value
        return mock_process


class TestLogRunAttempt(CliTestCase):
    wait_timeout = 60
    run_result = sandbox_run_jvm.SandboxRunResult(
        [1001, 1002, 1003],
        [ipaddress.ip_address('192.168.1.1'), ipaddress.ip_address('192.168.1.2'), ipaddress.ip_address('192.168.1.3')],
        [2001, 2002, 2003],
        [ipaddress.ip_address('192.168.1.1'), ipaddress.ip_address('192.168.1.2'), ipaddress.ip_address('192.168.1.3')]
    )
    feature_results = [sandbox_features.BundleStartResult('bundle-a', 1001),
                       sandbox_features.BundleStartResult('bundle-b', 1002)]

    def test_log_output(self):
        run_mock = MagicMock()
        stdout = MagicMock()
        input_args = MagicMock(**{
            'no_wait': False
        })

        with patch('conductr_cli.conduct_main.run', run_mock):
            logging_setup.configure_logging(input_args, stdout)
            sandbox_run_jvm.log_run_attempt(
                input_args,
                run_result=self.run_result,
                feature_results=self.feature_results,
                is_conductr_started=True,
                is_proxy_started=True,
                wait_timeout=self.wait_timeout
            )

        run_mock.assert_called_with(['info', '--host', '192.168.1.1'], configure_logging=False)

        expected_stdout = strip_margin("""||------------------------------------------------|
                                          || Summary                                        |
                                          ||------------------------------------------------|
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || ConductR                                       |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |ConductR has been started:
                                          |  core instances on 192.168.1.1, 192.168.1.2, 192.168.1.3
                                          |  agent instances on 192.168.1.1, 192.168.1.2, 192.168.1.3
                                          |ConductR service locator has been started on:
                                          |  192.168.1.1:9008
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Proxy                                          |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |HAProxy has been started
                                          |Your Bundles are by default accessible on:
                                          |  192.168.1.1:9000
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Features                                       |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |The following feature related bundles have been started:
                                          |  bundle-a on 192.168.1.1:1001
                                          |  bundle-b on 192.168.1.1:1002
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Bundles                                        |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |Check latest bundle status with:
                                          |  conduct info
                                          |Current bundle status:
                                          |""")
        self.assertEqual(expected_stdout, self.output(stdout))

    def test_log_output_single_core_and_agent(self):
        run_result = sandbox_run_jvm.SandboxRunResult(
            [1001],
            [ipaddress.ip_address('192.168.1.1')],
            [2001],
            [ipaddress.ip_address('192.168.1.1')]
        )

        run_mock = MagicMock()
        stdout = MagicMock()
        input_args = MagicMock(**{
            'no_wait': False
        })

        with patch('conductr_cli.conduct_main.run', run_mock):
            logging_setup.configure_logging(input_args, stdout)
            sandbox_run_jvm.log_run_attempt(
                input_args,
                run_result=run_result,
                feature_results=self.feature_results,
                is_conductr_started=True,
                is_proxy_started=True,
                wait_timeout=self.wait_timeout
            )

        expected_stdout = strip_margin("""||------------------------------------------------|
                                          || Summary                                        |
                                          ||------------------------------------------------|
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || ConductR                                       |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |ConductR has been started:
                                          |  core instance on 192.168.1.1
                                          |  agent instance on 192.168.1.1
                                          |ConductR service locator has been started on:
                                          |  192.168.1.1:9008
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Proxy                                          |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |HAProxy has been started
                                          |Your Bundles are by default accessible on:
                                          |  192.168.1.1:9000
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Features                                       |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |The following feature related bundles have been started:
                                          |  bundle-a on 192.168.1.1:1001
                                          |  bundle-b on 192.168.1.1:1002
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Bundles                                        |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |Check latest bundle status with:
                                          |  conduct info
                                          |Current bundle status:
                                          |""")
        self.assertEqual(expected_stdout, self.output(stdout))

    def test_log_output_no_proxy(self):

        run_mock = MagicMock()
        stdout = MagicMock()
        input_args = MagicMock(**{
            'no_wait': False
        })

        with patch('conductr_cli.conduct_main.run', run_mock):
            logging_setup.configure_logging(input_args, stdout)
            sandbox_run_jvm.log_run_attempt(
                input_args,
                run_result=self.run_result,
                feature_results=self.feature_results,
                is_conductr_started=True,
                is_proxy_started=False,
                wait_timeout=self.wait_timeout
            )

        expected_stdout = strip_margin("""||------------------------------------------------|
                                          || Summary                                        |
                                          ||------------------------------------------------|
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || ConductR                                       |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |ConductR has been started:
                                          |  core instances on 192.168.1.1, 192.168.1.2, 192.168.1.3
                                          |  agent instances on 192.168.1.1, 192.168.1.2, 192.168.1.3
                                          |ConductR service locator has been started on:
                                          |  192.168.1.1:9008
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Proxy                                          |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |HAProxy has not been started
                                          |To enable proxying ensure Docker is running and restart the sandbox
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Features                                       |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |The following feature related bundles have been started:
                                          |  bundle-a on 192.168.1.1:9008/services/bundle-a
                                          |  bundle-b on 192.168.1.1:9008/services/bundle-b
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          || Bundles                                        |
                                          ||- - - - - - - - - - - - - - - - - - - - - - - - |
                                          |Check latest bundle status with:
                                          |  conduct info
                                          |Current bundle status:
                                          |""")
        self.assertEqual(expected_stdout, self.output(stdout))

    def test_no_wait(self):
        run_mock = MagicMock()
        stdout = MagicMock()
        input_args = MagicMock(**{
            'no_wait': True
        })

        with patch('conductr_cli.conduct_main.run', run_mock):
            logging_setup.configure_logging(input_args, stdout)
            sandbox_run_jvm.log_run_attempt(
                input_args,
                run_result=self.run_result,
                feature_results=self.feature_results,
                is_conductr_started=True,
                is_proxy_started=True,
                wait_timeout=self.wait_timeout
            )

        run_mock.assert_not_called()
        self.assertEqual('', self.output(stdout))


class TestValidateJvm(CliTestCase):
    def test_supported_oracle(self):
        cmd_output = strip_margin("""|java version "1.8.0_72"
                                     |Java(TM) SE Runtime Environment (build 1.8.0_72-b15)
                                     |Java HotSpot(TM) 64-Bit Server VM (build 25.72-b15, mixed mode)
                                     |""")
        mock_getoutput = MagicMock(return_value=cmd_output)

        with patch('subprocess.getoutput', mock_getoutput):
            sandbox_run_jvm.validate_jvm_support()

        mock_getoutput.assert_called_once_with('java -version')

    def test_supported_open_jdk(self):
        cmd_output = strip_margin("""|openjdk version "1.8.0_111"
                                     |OpenJDK Runtime Environment (build 1.8.0_111-8u111-b14-3-b14)
                                     |OpenJDK 64-Bit Server VM (build 25.111-b14, mixed mode)
                                     |""")
        mock_getoutput = MagicMock(return_value=cmd_output)

        with patch('subprocess.getoutput', mock_getoutput):
            sandbox_run_jvm.validate_jvm_support()

        mock_getoutput.assert_called_once_with('java -version')

    def test_unsupported_vendor(self):
        cmd_output = strip_margin("""|unsupported version "1.2.3.4"
                                     |UnsupportedJDK Runtime Environment (build 1.2.3.4)
                                     |UnsupportedJDK 64-Bit Server VM (build 1.2.3.4, mixed mode)
                                     |""")
        mock_getoutput = MagicMock(return_value=cmd_output)

        with patch('subprocess.getoutput', mock_getoutput):
            self.assertRaises(JavaUnsupportedVendorError, sandbox_run_jvm.validate_jvm_support)

        mock_getoutput.assert_called_once_with('java -version')

    def test_unsupported_version(self):
        cmd_output = strip_margin("""|java version "1.7.0_72"
                                     |Java(TM) SE Runtime Environment (build 1.8.0_72-b15)
                                     |Java HotSpot(TM) 64-Bit Server VM (build 25.72-b15, mixed mode)
                                     |""")
        mock_getoutput = MagicMock(return_value=cmd_output)

        with patch('subprocess.getoutput', mock_getoutput):
            self.assertRaises(JavaUnsupportedVersionError, sandbox_run_jvm.validate_jvm_support)

        mock_getoutput.assert_called_once_with('java -version')

    def test_parse_error_from_invalid_output(self):
        mock_getoutput = MagicMock(return_value="gobbledygook")

        with patch('subprocess.getoutput', mock_getoutput):
            self.assertRaises(JavaVersionParseError, sandbox_run_jvm.validate_jvm_support)

        mock_getoutput.assert_called_once_with('java -version')

    def test_parse_error_from_unexpected_first_line(self):
        cmd_output = strip_margin("""|I like to eat
                                     |Java(TM) SE Runtime Environment (build 1.8.0_72-b15)
                                     |Java HotSpot(TM) 64-Bit Server VM (build 25.72-b15, mixed mode)
                                     |""")
        mock_getoutput = MagicMock(return_value=cmd_output)

        with patch('subprocess.getoutput', mock_getoutput):
            self.assertRaises(JavaVersionParseError, sandbox_run_jvm.validate_jvm_support)

        mock_getoutput.assert_called_once_with('java -version')

    def test_call_error(self):
        mock_getoutput = MagicMock(side_effect=subprocess.CalledProcessError(1, 'test'))

        with patch('subprocess.getoutput', mock_getoutput):
            self.assertRaises(JavaCallError, sandbox_run_jvm.validate_jvm_support)

        mock_getoutput.assert_called_once_with('java -version')


class TestValidate64BitSupport(CliTestCase):
    def test_64bit(self):
        mock_is_64bit = MagicMock(return_value=True)

        with patch('conductr_cli.host.is_64bit', mock_is_64bit):
            sandbox_run_jvm.validate_64bit_support()

    def test_non_64bit(self):
        mock_is_64bit = MagicMock(return_value=False)

        with patch('conductr_cli.host.is_64bit', mock_is_64bit):
            self.assertRaises(SandboxUnsupportedOsArchError,
                              sandbox_run_jvm.validate_64bit_support)


class TestDownloadSandboxImage(CliTestCase):
    bintray_auth = ('Bintray', 'username', 'password')

    image_dir = '~/.conductr/images'

    image_version = '2.0.0-rc.2'

    core_package_name = 'ConductR-Universal'

    core_artefact_type = 'core'

    core_artefact_file_name = 'conductr-2.0.0-rc.2-Mac_OS_X-x86_64.tgz'

    core_artefact_mac_os = {
        'package_name': 'ConductR-Universal',
        'resolver': 'conductr_cli.resolvers.bintray_resolver',
        'org': 'lightbend',
        'repo': 'commercial-releases',
        'version': '2.0.0-rc.2',
        'path': 'conductr-2.0.0-rc.2-Mac_OS_X-x86_64.tgz',
        'download_url': 'https://dl.bintray.com/lightbend/commercial-releases/conductr-2.0.0-rc.2-Mac_OS_X-x86_64.tgz'
    }

    core_artefact_linux = {
        'package_name': 'ConductR-Universal',
        'resolver': 'conductr_cli.resolvers.bintray_resolver',
        'org': 'lightbend',
        'repo': 'commercial-releases',
        'version': '2.0.0-rc.2',
        'path': 'conductr-2.0.0-rc.2-Linux-x86_64.tgz',
        'download_url': 'https://dl.bintray.com/lightbend/commercial-releases/conductr-2.0.0-rc.2-Linux-x86_64.tgz'
    }

    agent_package_name = 'ConductR-Agent-Universal'

    agent_artefact_type = 'agent'

    agent_artefact_file_name = 'conductr-agent-2.0.0-rc.2-Mac_OS_X-x86_64.tgz'

    agent_artefact_mac_os = {
        'package_name': 'ConductR-Agent-Universal',
        'resolver': 'conductr_cli.resolvers.bintray_resolver',
        'org': 'lightbend',
        'repo': 'commercial-releases',
        'version': '2.0.0-rc.2',
        'path': 'conductr-agent-2.0.0-rc.2-Mac_OS_X-x86_64.tgz',
        'download_url': 'https://dl.bintray.com/lightbend/commercial-releases/conductr-agent-2.0.0-rc.2-Mac_OS_X-x86_64.tgz'
    }

    agent_artefact_linux = {
        'package_name': 'ConductR-Agent-Universal',
        'resolver': 'conductr_cli.resolvers.bintray_resolver',
        'org': 'lightbend',
        'repo': 'commercial-releases',
        'version': '2.0.0-rc.2',
        'path': 'conductr-agent-2.0.0-rc.2-Linux-x86_64.tgz',
        'download_url': 'https://dl.bintray.com/lightbend/commercial-releases/conductr-agent-2.0.0-rc.2-Linux-x86_64.tgz'
    }

    def test_download_core(self):
        mock_artefact_os_name = MagicMock(return_value='Mac_OS_X')
        mock_load_bintray_credentials = MagicMock(return_value=self.bintray_auth)

        artefacts = [self.core_artefact_mac_os, self.core_artefact_linux]
        mock_bintray_artefacts_by_version = MagicMock(return_value=artefacts)

        mock_bintray_download_artefact = MagicMock(return_value=(True,
                                                                 'conductr-2.0.0-rc.2-Mac_OS_X-x86_64.tgz',
                                                                 '~/.conductr/images/conductr-2.0.0-rc.2-Mac_OS_X-x86_64.tgz'))

        with patch('conductr_cli.sandbox_run_jvm.artefact_os_name', mock_artefact_os_name), \
                patch('conductr_cli.resolvers.bintray_resolver.load_bintray_credentials',
                      mock_load_bintray_credentials), \
                patch('conductr_cli.resolvers.bintray_resolver.bintray_artefacts_by_version',
                      mock_bintray_artefacts_by_version), \
                patch('conductr_cli.resolvers.bintray_resolver.bintray_download_artefact',
                      mock_bintray_download_artefact):
            self.assertEqual('~/.conductr/images/conductr-2.0.0-rc.2-Mac_OS_X-x86_64.tgz',
                             sandbox_run_jvm.download_sandbox_image(self.image_dir,
                                                                    self.core_package_name,
                                                                    self.core_artefact_type,
                                                                    self.image_version))

        mock_load_bintray_credentials.assert_called_once_with()
        mock_bintray_artefacts_by_version.assert_called_once_with(self.bintray_auth,
                                                                  'lightbend',
                                                                  'commercial-releases',
                                                                  self.core_package_name,
                                                                  self.image_version)
        mock_bintray_download_artefact.assert_called_once_with(self.image_dir,
                                                               self.core_artefact_mac_os,
                                                               self.bintray_auth)

    def test_download_agent(self):
        mock_artefact_os_name = MagicMock(return_value='Mac_OS_X')
        mock_load_bintray_credentials = MagicMock(return_value=self.bintray_auth)

        artefacts = [self.agent_artefact_mac_os, self.agent_artefact_linux]
        mock_bintray_artefacts_by_version = MagicMock(return_value=artefacts)

        mock_bintray_download_artefact = MagicMock(return_value=(True,
                                                                 'conductr-agent-2.0.0-rc.2-Mac_OS_X-x86_64.tgz',
                                                                 '~/.conductr/images/conductr-agent-2.0.0-rc.2-Mac_OS_X-x86_64.tgz'))

        with patch('conductr_cli.sandbox_run_jvm.artefact_os_name', mock_artefact_os_name), \
                patch('conductr_cli.resolvers.bintray_resolver.load_bintray_credentials',
                      mock_load_bintray_credentials), \
                patch('conductr_cli.resolvers.bintray_resolver.bintray_artefacts_by_version',
                      mock_bintray_artefacts_by_version), \
                patch('conductr_cli.resolvers.bintray_resolver.bintray_download_artefact',
                      mock_bintray_download_artefact):
            self.assertEqual('~/.conductr/images/conductr-agent-2.0.0-rc.2-Mac_OS_X-x86_64.tgz',
                             sandbox_run_jvm.download_sandbox_image(self.image_dir,
                                                                    self.agent_package_name,
                                                                    self.agent_artefact_type,
                                                                    self.image_version))

        mock_load_bintray_credentials.assert_called_once_with()
        mock_bintray_artefacts_by_version.assert_called_once_with(self.bintray_auth,
                                                                  'lightbend',
                                                                  'commercial-releases',
                                                                  self.agent_package_name,
                                                                  self.image_version)
        mock_bintray_download_artefact.assert_called_once_with(self.image_dir,
                                                               self.agent_artefact_mac_os,
                                                               self.bintray_auth)

    def test_bintray_unreachable(self):
        mock_load_bintray_credentials = MagicMock(return_value=self.bintray_auth)

        mock_bintray_artefacts_by_version = MagicMock(side_effect=ConnectionError('test'))

        with patch('conductr_cli.resolvers.bintray_resolver.load_bintray_credentials', mock_load_bintray_credentials), \
                patch('conductr_cli.resolvers.bintray_resolver.bintray_artefacts_by_version',
                      mock_bintray_artefacts_by_version):
            self.assertRaises(BintrayUnreachableError,
                              sandbox_run_jvm.download_sandbox_image,
                              self.image_dir,
                              self.core_package_name,
                              self.core_artefact_type,
                              self.image_version)

        mock_load_bintray_credentials.assert_called_once_with()
        mock_bintray_artefacts_by_version.assert_called_once_with(self.bintray_auth,
                                                                  'lightbend',
                                                                  'commercial-releases',
                                                                  self.core_package_name,
                                                                  self.image_version)

    def test_http_error(self):
        mock_load_bintray_credentials = MagicMock(return_value=self.bintray_auth)

        mock_bintray_artefacts_by_version = MagicMock(side_effect=HTTPError('test'))

        with patch('conductr_cli.resolvers.bintray_resolver.load_bintray_credentials', mock_load_bintray_credentials), \
                patch('conductr_cli.resolvers.bintray_resolver.bintray_artefacts_by_version',
                      mock_bintray_artefacts_by_version):
            self.assertRaises(SandboxImageNotFoundError,
                              sandbox_run_jvm.download_sandbox_image,
                              self.image_dir,
                              self.core_package_name,
                              self.core_artefact_type,
                              self.image_version)

        mock_load_bintray_credentials.assert_called_once_with()
        mock_bintray_artefacts_by_version.assert_called_once_with(self.bintray_auth,
                                                                  'lightbend',
                                                                  'commercial-releases',
                                                                  self.core_package_name,
                                                                  self.image_version)

    def test_artefact_not_found(self):
        mock_artefact_os_name = MagicMock(return_value='Mac_OS_X')
        mock_load_bintray_credentials = MagicMock(return_value=self.bintray_auth)

        mock_bintray_artefacts_by_version = MagicMock(return_value=[])

        with patch('conductr_cli.sandbox_run_jvm.artefact_os_name', mock_artefact_os_name), \
                patch('conductr_cli.resolvers.bintray_resolver.load_bintray_credentials',
                      mock_load_bintray_credentials), \
                patch('conductr_cli.resolvers.bintray_resolver.bintray_artefacts_by_version',
                      mock_bintray_artefacts_by_version):
            self.assertRaises(SandboxImageNotFoundError,
                              sandbox_run_jvm.download_sandbox_image,
                              self.image_dir,
                              self.core_package_name,
                              self.core_artefact_type,
                              self.image_version)

        mock_load_bintray_credentials.assert_called_once_with()
        mock_bintray_artefacts_by_version.assert_called_once_with(self.bintray_auth,
                                                                  'lightbend',
                                                                  'commercial-releases',
                                                                  self.core_package_name,
                                                                  self.image_version)

    def test_artefact_multiple_found(self):
        mock_artefact_os_name = MagicMock(return_value='Mac_OS_X')
        mock_load_bintray_credentials = MagicMock(return_value=self.bintray_auth)

        mock_bintray_artefacts_by_version = MagicMock(return_value=[
            self.core_artefact_mac_os,
            self.core_artefact_linux,
            self.core_artefact_mac_os
        ])

        with patch('conductr_cli.sandbox_run_jvm.artefact_os_name', mock_artefact_os_name), \
                patch('conductr_cli.resolvers.bintray_resolver.load_bintray_credentials',
                      mock_load_bintray_credentials), \
                patch('conductr_cli.resolvers.bintray_resolver.bintray_artefacts_by_version',
                      mock_bintray_artefacts_by_version):
            self.assertRaises(SandboxImageNotFoundError,
                              sandbox_run_jvm.download_sandbox_image,
                              self.image_dir,
                              self.core_package_name,
                              self.core_artefact_type,
                              self.image_version)

        mock_load_bintray_credentials.assert_called_once_with()
        mock_bintray_artefacts_by_version.assert_called_once_with(self.bintray_auth,
                                                                  'lightbend',
                                                                  'commercial-releases',
                                                                  self.core_package_name,
                                                                  self.image_version)


class TestArtefactOsName(CliTestCase):
    def test_mac_os(self):
        mock_is_macos = MagicMock(return_value=True)
        mock_is_linux = MagicMock(return_value=False)
        with patch('conductr_cli.host.is_macos', mock_is_macos), \
                patch('conductr_cli.host.is_linux', mock_is_linux):
            self.assertEqual('Mac_OS_X', sandbox_run_jvm.artefact_os_name())

        mock_is_macos.assert_called_once_with()
        mock_is_linux.assert_not_called()

    def test_linux(self):
        mock_is_macos = MagicMock(return_value=False)
        mock_is_linux = MagicMock(return_value=True)
        with patch('conductr_cli.host.is_macos', mock_is_macos), \
                patch('conductr_cli.host.is_linux', mock_is_linux):
            self.assertEqual('Linux', sandbox_run_jvm.artefact_os_name())

        mock_is_macos.assert_called_once_with()
        mock_is_linux.assert_called_once_with()

    def test_unsupported_os(self):
        mock_is_macos = MagicMock(return_value=False)
        mock_is_linux = MagicMock(return_value=False)
        with patch('conductr_cli.host.is_macos', mock_is_macos), \
                patch('conductr_cli.host.is_linux', mock_is_linux):
            self.assertRaises(SandboxUnsupportedOsError,
                              sandbox_run_jvm.artefact_os_name)

        mock_is_macos.assert_called_once_with()
        mock_is_linux.assert_called_once_with()


class TestCleanupTmpDir(CliTestCase):
    tmp_dir = '~/.conductr/images/tmp'

    def test_existing_tmp_dir(self):
        mock_exists = MagicMock(return_value=True)
        mock_rmtree = MagicMock()
        mock_makedirs = MagicMock()

        with patch('os.path.exists', mock_exists), \
                patch('shutil.rmtree', mock_rmtree), \
                patch('os.makedirs', mock_makedirs):
            sandbox_run_jvm.cleanup_tmp_dir(self.tmp_dir)

        mock_exists.assert_called_once_with(self.tmp_dir)
        mock_rmtree.assert_called_once_with(self.tmp_dir)
        mock_makedirs.assert_called_once_with(self.tmp_dir, exist_ok=True)

    def test_without_existing_tmp_dir(self):
        mock_exists = MagicMock(return_value=False)
        mock_rmtree = MagicMock()
        mock_makedirs = MagicMock()

        with patch('os.path.exists', mock_exists), \
                patch('shutil.rmtree', mock_rmtree), \
                patch('os.makedirs', mock_makedirs):
            sandbox_run_jvm.cleanup_tmp_dir(self.tmp_dir)

        mock_exists.assert_called_once_with(self.tmp_dir)
        mock_rmtree.assert_not_called()
        mock_makedirs.assert_called_once_with(self.tmp_dir, exist_ok=True)
