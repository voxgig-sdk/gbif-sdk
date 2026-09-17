# Typed models for the Gbif SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Enumeration(TypedDict):
    pass


class EnumerationLoadMatch(TypedDict):
    enumeration: str


class EnumerationListMatch(TypedDict):
    pass


class Literature(TypedDict):
    pass


class LiteratureListMatch(TypedDict, total=False):
    limit: int
    offset: int
    q: str
    year: int


class Occurrence(TypedDict, total=False):
    creator: str
    format: str
    notificationAddresses: list
    predicate: dict


class OccurrenceListMatch(TypedDict, total=False):
    country: str
    limit: int
    offset: int
    year: str


class OccurrenceCreateData(TypedDict, total=False):
    creator: str
    format: str
    notificationAddresses: list
    predicate: dict


class Registry(TypedDict, total=False):
    country: str
    key: str
    publishingOrganizationKey: str
    title: str
    type: str


class RegistryListMatch(TypedDict, total=False):
    country: str
    limit: int
    offset: int
    q: str


class Species(TypedDict):
    pass


class SpeciesLoadMatchRequired(TypedDict):
    name: str


class SpeciesLoadMatch(SpeciesLoadMatchRequired, total=False):
    kingdom: str


class SpeciesListMatch(TypedDict, total=False):
    limit: int
    offset: int
    q: str


class Vocabulary(TypedDict, total=False):
    description: str
    name: str


class VocabularyListMatch(TypedDict, total=False):
    description: str
    name: str
