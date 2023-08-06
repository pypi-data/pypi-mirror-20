# -*- coding: utf-8 -*-

#    Copyright 2016 Mirantis, Inc.
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License along
#    with this program; if not, write to the Free Software Foundation, Inc.,
#    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import mock
import mockfs
import os
import pytest
import sys
import jsonschema
from jimmy import cli
from mock import call
from click.testing import CliRunner
from jimmy.lib.common import yaml_reader
from jimmy.tests import base

modules_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
jimmy_dir = os.path.dirname(modules_dir)
credentials_schema_path = os.path.join(modules_dir, 'credentials', 'resources', 'schema.yaml')
jenkins_yaml_path = os.path.join(jimmy_dir, 'sample', 'input', 'jenkins.yaml')


class TestCredentialsModule(base.TestCase):

    def setup_method(self, method):
        self.runner = CliRunner()

    def teardown_method(self, method):
        mockfs.restore_builtins()

    @mock.patch('jimmy.lib.core.load_py_modules')
    @mock.patch('subprocess.call')
    def test_cli_call(self, mock_subp, mock_modules):
        with open(credentials_schema_path, 'r') as f:
            mock_credentials_schema = f.read()
        self.mfs = mockfs.replace_builtins()
        self.mfs.add_entries({os.path.join(jimmy_dir, 'lib', 'schema.yaml'): self.jimmy_schema,
                              os.path.join(jimmy_dir, 'jimmy.yaml'): self.mock_jimmy_yaml,
                              credentials_schema_path: mock_credentials_schema,
                              jenkins_yaml_path: '\n'.join(
                                  [
                                      'jenkins:',
                                      '  credentials:',
                                      '    password:',
                                      '    - scope: global',
                                      '      username: user',
                                      '      password: passwd',
                                      '      description: test username/password user',
                                      '    ssh:',
                                      '    - scope: global',
                                      '      username: user2',
                                      '      private_key: /home/user/.ssh/id_rsa',
                                      '      id: this-is-an-id',
                                      '    file:',
                                      '    - scope: global',
                                      '      id: secret-key',
                                      '      file: /home/user/secret_key',
                                      '      description: Secret key',
                                      '    kubernetes:',
                                      '    - id: kubernetes-credentials',
                                      '      scope: global',
                                      '      description: kubernetes.example.com service creds',
                                      '    token:',
                                      '    - scope: global',
                                      '      username: user',
                                      '      id: user-token',
                                      '      description: test token credentials'
                                  ])
                              })
        sys.path.insert(0, modules_dir)
        import credentials
        import read_source
        sys.path.pop(0)
        mock_modules.return_value = [credentials, read_source]
        os.chdir(jimmy_dir)
        self.runner.invoke(cli)
        calls = [call(['java',
                       '-jar', '<< path to jenkins-cli.jar >>',
                       '-s', 'http://localhost:8080', 'groovy',
                       modules_dir + '/' + 'credentials/resources/jenkins.groovy',
                       'updateCredentials',
                       "'global'",
                       "'user'",
                       "'passwd'",
                       "'test username/password user'",
                       "''",
                       "''",
                       "''"],
                      shell=False),
                 call(['java',
                       '-jar', '<< path to jenkins-cli.jar >>',
                       '-s', 'http://localhost:8080', 'groovy',
                       modules_dir + '/' + 'credentials/resources/jenkins.groovy',
                       'updateCredentials',
                       "'global'",
                       "'user2'",
                       "''",
                       "''",
                       "'/home/user/.ssh/id_rsa'",
                       "''",
                       "'this-is-an-id'"],
                      shell=False),
                 call(['java',
                       '-jar', '<< path to jenkins-cli.jar >>',
                       '-s', 'http://localhost:8080', 'groovy',
                       modules_dir + '/' + 'credentials/resources/jenkins.groovy',
                       'updateCredentials',
                       "'global'",
                       "''",
                       "''",
                       "'Secret key'",
                       "''",
                       "'/home/user/secret_key'",
                       "'secret-key'"],
                      shell=False),
                 call(['java',
                       '-jar', '<< path to jenkins-cli.jar >>',
                       '-s', 'http://localhost:8080', 'groovy',
                       modules_dir + '/' + 'credentials/resources/kubernetes.groovy',
                       'updateCredentials',
                       'global',
                       'kubernetes-credentials',
                       'kubernetes.example.com service creds'],
                      shell=False),
                 call(['java',
                       '-jar', '<< path to jenkins-cli.jar >>',
                       '-s', 'http://localhost:8080', 'groovy',
                       modules_dir + '/' + 'credentials/resources/jenkins.groovy',
                       'updateCredentials',
                       "'global'",
                       "'user'",
                       "''",
                       "'test token credentials'",
                       "''",
                       "''",
                       "'user-token'"],
                      shell=False)]
        mock_subp.assert_has_calls(calls, any_order=True)
        assert 5 == mock_subp.call_count, "subprocess call should be equal to 5"


class TestCredentialsSchema(object):

    def setup_method(self, method):
        with open(credentials_schema_path, 'r') as f:
            mock_credentials_schema = f.read()
        self.mfs = mockfs.replace_builtins()
        self.mfs.add_entries({credentials_schema_path: mock_credentials_schema})
        self.schema = yaml_reader.read(credentials_schema_path)

    def teardown_method(self, method):
        mockfs.restore_builtins()

    def test_valid_repo_data(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      username: user',
              '      password: passwd',
              '      description: test username/password user',
              '      id: this-is-credentials-id',
              '    ssh:',
              '    - scope: global',
              '      username: user2',
              '      private_key: /home/user/.ssh/id_rsa'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        jsonschema.validate(repo_data, self.schema)

    def test_valid_oneof_password_data(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      username: user',
              '      password: passwd',
              '      description: test username/password user',
              '      id: this-is-credentials-id'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        jsonschema.validate(repo_data, self.schema)

    def test_valid_oneof_ssh_data(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    ssh:',
              '    - scope: global',
              '      username: user2',
              '      private_key: /home/user/.ssh/id_rsa'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        jsonschema.validate(repo_data, self.schema)

    def test_valid_oneof_file_data(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    file:',
              '    - scope: global',
              '      id: secret-key',
              '      file: /home/user/secret_key',
              '      description: Secret key'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        jsonschema.validate(repo_data, self.schema)

    def test_valid_oneof_token_data(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    token:',
              '    - scope: global',
              '      username: user',
              '      description: test token credentials',
              '      id: this-is-token-credentials-id'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        jsonschema.validate(repo_data, self.schema)

    def test_password_validation_fail_if_scope_is_not_enum(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: test',
              '      username: user',
              '      password: passwd',
              '      description: test username/password user'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'test' is not one of ['global', 'system']"

    def test_ssh_validation_fail_if_scope_is_not_enum(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    ssh:',
              '    - scope: test',
              '      username: user2',
              '      private_key: /home/user/.ssh/id_rsa',
              '      id: this-is-credentials-id'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'test' is not one of ['global', 'system']"

    def test_file_validation_fail_if_scope_is_not_enum(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    file:',
              '    - scope: test',
              '      id: secret-key',
              '      file: /home/user/secret_key',
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'test' is not one of ['global', 'system']"

    def test_token_validation_fail_if_scope_is_not_enum(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    token:',
              '    - scope: test',
              '      username: user',
              '      description: test token credentials',
              '      id: this-is-token-credentials-id'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'test' is not one of ['global', 'system']"

    def test_validation_fail_if_username_is_not_string(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      username: 123',
              '      password: passwd',
              '      description: test username/password user',
              '      id: this-is-credentials-id'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'string'"

    def test_validation_fail_if_id_is_not_string(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      username: user',
              '      password: passwd',
              '      description: test username/password user',
              '      id: 123'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'string'"

    def test_validation_fail_if_password_is_not_string(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      username: user',
              '      password: 123',
              '      description: test username/password user'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'string'"

    def test_validation_fail_if_descr_is_not_string(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      username: user',
              '      password: passwd',
              '      description: 123'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'string'"

    def test_validation_fail_if_passphrase_is_not_string(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    ssh:',
              '    - scope: system',
              '      username: user2',
              '      passphrase: 123',
              '      private_key: /home/user/.ssh/id_rsa'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'string'"

    def test_validation_fail_if_private_key_is_not_string(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    ssh:',
              '    - scope: system',
              '      username: user2',
              '      passphrase: psprs',
              '      private_key: 123'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'string'"

    def test_validation_fail_if_file_is_not_string(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    file:',
              '    - scope: global',
              '      id: secret-key',
              '      file: 123',
              '      description: Secret key'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'string'"

    def test_password_validation_fail_for_scope_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - username: user',
              '      password: passwd',
              '      description: test username/password user'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'scope' is a required property"

    def test_password_validation_fail_for_username_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      password: passwd',
              '      description: test username/password user'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'username' is a required property"

    def test_password_validation_fail_for_password_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      username: user',
              '      description: test username/password user'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'password' is a required property"

    def test_ssh_validation_fail_for_scope_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    ssh:',
              '    - username: user2',
              '      private_key: /home/user/.ssh/id_rsa'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'scope' is a required property"

    def test_ssh_validation_fail_for_username_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    ssh:',
              '    - scope: global',
              '      private_key: /home/user/.ssh/id_rsa'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'username' is a required property"

    def test_ssh_validation_fail_for_private_key_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    ssh:',
              '    - scope: global',
              '      username: user2'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'private_key' is a required property"

    def test_file_validation_fail_for_scope_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    file:',
              '    - id: secret-key',
              '      file: /home/user/secret_key'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'scope' is a required property"

    def test_file_validation_fail_for_file_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    file:',
              '    - scope: global',
              '      id: secret-key'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'file' is a required property"

    def test_token_validation_fail_for_scope_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    token:',
              '    - username: user',
              '      description: test token credentials',
              '      id: this-is-token-credentials-id'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'scope' is a required property"

    def test_token_validation_fail_for_username_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    token:',
              '    - scope: global',
              '      description: test token credentials',
              '      id: this-is-token-credentials-id'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'username' is a required property"

    def test_token_validation_fail_for_id_required_property(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    token:',
              '    - scope: global',
              '      username: user',
              '      description: test token credentials'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "'id' is a required property"

    def test_validation_fail_if_password_not_array(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              'password: 123'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'array'"

    def test_validation_fail_if_ssh_not_array(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              'ssh: 123'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'array'"

    def test_validation_fail_if_file_not_array(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              'file: 123'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'array'"

    def test_validation_fail_if_token_not_array(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              'token: 123'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "123 is not of type 'array'"

    def test_validation_fail_for_password_additional_properties(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    password:',
              '    - scope: global',
              '      username: user',
              '      password: passwd',
              '      description: test username/password user',
              '      test: test'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "Additional properties are not allowed ('test' was unexpected)"

    def test_validation_fail_for_ssh_additional_properties(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    ssh:',
              '    - scope: global',
              '      username: user2',
              '      private_key: /home/user/.ssh/id_rsa',
              '      test: test'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "Additional properties are not allowed ('test' was unexpected)"

    def test_validation_fail_for_file_additional_properties(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    file:',
              '    - scope: global',
              '      id: secret-key',
              '      file: /home/user/secret_file',
              '      test: test'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "Additional properties are not allowed ('test' was unexpected)"

    def test_validation_fail_for_token_additional_properties(self):
        self.mfs.add_entries({jenkins_yaml_path: '\n'.join(
            [
              '    token:',
              '    - scope: global',
              '      username: user',
              '      password: passwd',
              '      description: test token credentials',
              '      id: this-is-token-credentials-id'
            ])
        })
        repo_data = yaml_reader.read(jenkins_yaml_path)
        with pytest.raises(jsonschema.ValidationError) as excinfo:
            jsonschema.validate(repo_data, self.schema)
        assert excinfo.value.message == "Additional properties are not allowed ('password' was unexpected)"
