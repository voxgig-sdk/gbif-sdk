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


class Enumeration(TypedDict, total=False):
    iso2: str
    name: str
    title: str
    url: str


class EnumerationLoadMatch(TypedDict):
    enumeration: str


class EnumerationListMatch(TypedDict, total=False):
    iso2: str
    name: str
    title: str
    url: str


class Literature(TypedDict, total=False):
    author: list
    id: str
    title: str
    year: int


class LiteratureListMatch(TypedDict, total=False):
    author: list
    id: str
    title: str
    year: int


class Occurrence(TypedDict, total=False):
    country: str
    creator: str
    decimal_latitude: float
    decimal_longitude: float
    format: str
    key: int
    notification_address: list
    predicate: dict
    scientific_name: str
    year: int


class OccurrenceListMatch(TypedDict, total=False):
    country: str
    creator: str
    decimal_latitude: float
    decimal_longitude: float
    format: str
    key: int
    notification_address: list
    predicate: dict
    scientific_name: str
    year: int


class OccurrenceCreateData(TypedDict, total=False):
    country: str
    creator: str
    decimal_latitude: float
    decimal_longitude: float
    format: str
    key: int
    notification_address: list
    predicate: dict
    scientific_name: str
    year: int


class Registry(TypedDict, total=False):
    country: str
    key: str
    publishing_organization_key: str
    title: str
    type: str


class RegistryListMatch(TypedDict, total=False):
    country: str
    key: str
    publishing_organization_key: str
    title: str
    type: str


class Species(TypedDict, total=False):
    canonical_name: str
    confidence: int
    key: int
    match_type: str
    rank: str
    scientific_name: str
    usage_key: int


class SpeciesLoadMatch(TypedDict, total=False):
    canonical_name: str
    confidence: int
    key: int
    match_type: str
    rank: str
    scientific_name: str
    usage_key: int


class SpeciesListMatch(TypedDict, total=False):
    canonical_name: str
    confidence: int
    key: int
    match_type: str
    rank: str
    scientific_name: str
    usage_key: int


class Vocabulary(TypedDict, total=False):
    description: str
    name: str


class VocabularyListMatch(TypedDict, total=False):
    description: str
    name: str
