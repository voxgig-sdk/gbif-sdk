# Gbif SDK exists test

import pytest
from gbif_sdk import GbifSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GbifSDK.test(None, None)
        assert testsdk is not None
