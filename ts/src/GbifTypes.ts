// Typed models for the Gbif SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Enumeration {
  iso2?: string
  name?: string
  title?: string
  url?: string
}

export interface EnumerationLoadMatch {
  enumeration: string
}

export interface EnumerationListMatch {
  iso2?: string
  name?: string
  title?: string
  url?: string
}

export interface Literature {
  author?: any[]
  id?: string
  title?: string
  year?: number
}

export interface LiteratureListMatch {
  author?: any[]
  id?: string
  title?: string
  year?: number
}

export interface Occurrence {
  country?: string
  creator?: string
  decimal_latitude?: number
  decimal_longitude?: number
  format?: string
  key?: number
  notification_address?: any[]
  predicate?: Record<string, any>
  scientific_name?: string
  year?: number
}

export interface OccurrenceListMatch {
  country?: string
  creator?: string
  decimal_latitude?: number
  decimal_longitude?: number
  format?: string
  key?: number
  notification_address?: any[]
  predicate?: Record<string, any>
  scientific_name?: string
  year?: number
}

export interface OccurrenceCreateData {
  country?: string
  creator?: string
  decimal_latitude?: number
  decimal_longitude?: number
  format?: string
  key?: number
  notification_address?: any[]
  predicate?: Record<string, any>
  scientific_name?: string
  year?: number
}

export interface Registry {
  country?: string
  key?: string
  publishing_organization_key?: string
  title?: string
  type?: string
}

export interface RegistryListMatch {
  country?: string
  key?: string
  publishing_organization_key?: string
  title?: string
  type?: string
}

export interface Species {
  canonical_name?: string
  confidence?: number
  key?: number
  match_type?: string
  rank?: string
  scientific_name?: string
  usage_key?: number
}

export interface SpeciesLoadMatch {
  canonical_name?: string
  confidence?: number
  key?: number
  match_type?: string
  rank?: string
  scientific_name?: string
  usage_key?: number
}

export interface SpeciesListMatch {
  canonical_name?: string
  confidence?: number
  key?: number
  match_type?: string
  rank?: string
  scientific_name?: string
  usage_key?: number
}

export interface Vocabulary {
  description?: string
  name?: string
}

export interface VocabularyListMatch {
  description?: string
  name?: string
}

