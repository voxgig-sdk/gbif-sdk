# Gbif SDK feature factory

from gbif_sdk.feature.base_feature import GbifBaseFeature
from gbif_sdk.feature.ratelimit_feature import GbifRatelimitFeature
from gbif_sdk.feature.retry_feature import GbifRetryFeature
from gbif_sdk.feature.test_feature import GbifTestFeature
from gbif_sdk.feature.timeout_feature import GbifTimeoutFeature


_FEATURES = {
    "base": lambda: GbifBaseFeature(),
    "ratelimit": lambda: GbifRatelimitFeature(),
    "retry": lambda: GbifRetryFeature(),
    "test": lambda: GbifTestFeature(),
    "timeout": lambda: GbifTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
