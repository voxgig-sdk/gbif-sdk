# Gbif SDK feature factory

from feature.base_feature import GbifBaseFeature
from feature.test_feature import GbifTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GbifBaseFeature(),
        "test": lambda: GbifTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
