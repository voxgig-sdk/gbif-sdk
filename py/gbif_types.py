# Typed models for the Gbif SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Enumeration:
    iso2: Optional[str] = None
    name: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class EnumerationLoadMatch:
    enumeration: str


@dataclass
class EnumerationListMatch:
    iso2: Optional[str] = None
    name: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Literature:
    author: Optional[list] = None
    id: Optional[str] = None
    title: Optional[str] = None
    year: Optional[int] = None


@dataclass
class LiteratureListMatch:
    author: Optional[list] = None
    id: Optional[str] = None
    title: Optional[str] = None
    year: Optional[int] = None


@dataclass
class Occurrence:
    country: Optional[str] = None
    creator: Optional[str] = None
    decimal_latitude: Optional[float] = None
    decimal_longitude: Optional[float] = None
    format: Optional[str] = None
    key: Optional[int] = None
    notification_address: Optional[list] = None
    predicate: Optional[dict] = None
    scientific_name: Optional[str] = None
    year: Optional[int] = None


@dataclass
class OccurrenceListMatch:
    country: Optional[str] = None
    creator: Optional[str] = None
    decimal_latitude: Optional[float] = None
    decimal_longitude: Optional[float] = None
    format: Optional[str] = None
    key: Optional[int] = None
    notification_address: Optional[list] = None
    predicate: Optional[dict] = None
    scientific_name: Optional[str] = None
    year: Optional[int] = None


@dataclass
class OccurrenceCreateData:
    country: Optional[str] = None
    creator: Optional[str] = None
    decimal_latitude: Optional[float] = None
    decimal_longitude: Optional[float] = None
    format: Optional[str] = None
    key: Optional[int] = None
    notification_address: Optional[list] = None
    predicate: Optional[dict] = None
    scientific_name: Optional[str] = None
    year: Optional[int] = None


@dataclass
class Registry:
    country: Optional[str] = None
    key: Optional[str] = None
    publishing_organization_key: Optional[str] = None
    title: Optional[str] = None
    type: Optional[str] = None


@dataclass
class RegistryListMatch:
    country: Optional[str] = None
    key: Optional[str] = None
    publishing_organization_key: Optional[str] = None
    title: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Species:
    canonical_name: Optional[str] = None
    confidence: Optional[int] = None
    key: Optional[int] = None
    match_type: Optional[str] = None
    rank: Optional[str] = None
    scientific_name: Optional[str] = None
    usage_key: Optional[int] = None


@dataclass
class SpeciesLoadMatch:
    canonical_name: Optional[str] = None
    confidence: Optional[int] = None
    key: Optional[int] = None
    match_type: Optional[str] = None
    rank: Optional[str] = None
    scientific_name: Optional[str] = None
    usage_key: Optional[int] = None


@dataclass
class SpeciesListMatch:
    canonical_name: Optional[str] = None
    confidence: Optional[int] = None
    key: Optional[int] = None
    match_type: Optional[str] = None
    rank: Optional[str] = None
    scientific_name: Optional[str] = None
    usage_key: Optional[int] = None


@dataclass
class Vocabulary:
    description: Optional[str] = None
    name: Optional[str] = None


@dataclass
class VocabularyListMatch:
    description: Optional[str] = None
    name: Optional[str] = None

