# -*- coding: utf-8 -*-

import mock
import pytest
import takumi_config
import collections

from takumi_service.hook import hook_registry


class MockConfig(dict):
    __getattr__ = dict.__getitem__
    __setattr__ = dict.__setitem__

reserved = {
    'thrift_file': 'tests/test.thrift',
    'thrift_protocol_class': ''
}

config = MockConfig(reserved)


@pytest.fixture
def mock_config():
    with mock.patch.object(takumi_config, 'config', config):
        yield config
    config.clear()
    config.update(reserved)


@pytest.fixture
def mock_hook_registry():
    registry = collections.defaultdict(list)
    with mock.patch.object(hook_registry, '_registry', registry):
        yield
