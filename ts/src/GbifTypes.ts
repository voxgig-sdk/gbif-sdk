// Typed models for the Gbif SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Enumeration {
}

export interface EnumerationLoadMatch {
  enumeration: string
}

export interface EnumerationListMatch {

  // Selects a custom action instead of the plain list:
  //   'basic' | 'country' | 'license'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Literature {
}

export interface LiteratureListMatch {
  limit?: number
  offset?: number
  q?: string
  year?: number

  // Selects a custom action instead of the plain list:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Occurrence {
  creator?: string
  format?: string
  notificationAddresses?: any[]
  predicate?: Record<string, any>
}

export interface OccurrenceListMatch {
  country?: string
  limit?: number
  offset?: number
  year?: string

  // Selects a custom action instead of the plain list:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OccurrenceCreateData {
  creator?: string
  format?: string
  notificationAddresses?: any[]
  predicate?: Record<string, any>
}

export interface Registry {
  country?: string
  key?: string
  publishingOrganizationKey?: string
  title?: string
  type?: string
}

export interface RegistryListMatch {
  country?: string
  limit?: number
  offset?: number
  q?: string
}

export interface Species {
}

export interface SpeciesLoadMatch {
  kingdom?: string
  name: string

  // Selects a custom action instead of the plain load:
  //   'match'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SpeciesListMatch {
  limit?: number
  offset?: number
  q?: string

  // Selects a custom action instead of the plain list:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Vocabulary {
  description?: string
  name?: string
}

export interface VocabularyListMatch {
  description?: string
  name?: string
}

