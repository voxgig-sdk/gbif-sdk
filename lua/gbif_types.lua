-- Typed models for the Gbif SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Enumeration
---@field iso2? string
---@field name? string
---@field title? string
---@field url? string

---@class EnumerationLoadMatch
---@field enumeration string

---@class EnumerationListMatch
---@field iso2? string
---@field name? string
---@field title? string
---@field url? string

---@class Literature
---@field authors? table
---@field id? string
---@field title? string
---@field year? number

---@class LiteratureListMatch
---@field authors? table
---@field id? string
---@field title? string
---@field year? number

---@class Occurrence
---@field country? string
---@field creator? string
---@field decimalLatitude? number
---@field decimalLongitude? number
---@field format? string
---@field key? number
---@field notificationAddresses? table
---@field predicate? table
---@field scientificName? string
---@field year? number

---@class OccurrenceListMatch
---@field country? string
---@field creator? string
---@field decimalLatitude? number
---@field decimalLongitude? number
---@field format? string
---@field key? number
---@field notificationAddresses? table
---@field predicate? table
---@field scientificName? string
---@field year? number

---@class OccurrenceCreateData
---@field country? string
---@field creator? string
---@field decimalLatitude? number
---@field decimalLongitude? number
---@field format? string
---@field key? number
---@field notificationAddresses? table
---@field predicate? table
---@field scientificName? string
---@field year? number

---@class Registry
---@field country? string
---@field key? string
---@field publishingOrganizationKey? string
---@field title? string
---@field type? string

---@class RegistryListMatch
---@field country? string
---@field key? string
---@field publishingOrganizationKey? string
---@field title? string
---@field type? string

---@class Species
---@field canonicalName? string
---@field confidence? number
---@field key? number
---@field matchType? string
---@field rank? string
---@field scientificName? string
---@field usageKey? number

---@class SpeciesLoadMatch
---@field canonicalName? string
---@field confidence? number
---@field key? number
---@field matchType? string
---@field rank? string
---@field scientificName? string
---@field usageKey? number

---@class SpeciesListMatch
---@field canonicalName? string
---@field confidence? number
---@field key? number
---@field matchType? string
---@field rank? string
---@field scientificName? string
---@field usageKey? number

---@class Vocabulary
---@field description? string
---@field name? string

---@class VocabularyListMatch
---@field description? string
---@field name? string

local M = {}

return M
