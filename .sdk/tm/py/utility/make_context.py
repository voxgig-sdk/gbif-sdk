# Gbif SDK utility: make_context

from core.context import GbifContext


def make_context_util(ctxmap, basectx):
    return GbifContext(ctxmap, basectx)
