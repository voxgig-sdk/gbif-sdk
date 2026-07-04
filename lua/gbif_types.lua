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

---@class Literature
---@field author? table
---@field id? string
---@field title? string
---@field year? number

---@class LiteratureListMatch

---@class Occurrence
---@field country? string
---@field creator? string
---@field decimal_latitude? number
---@field decimal_longitude? number
---@field format? string
---@field key? number
---@field notification_address? table
---@field predicate? table
---@field scientific_name? string
---@field year? number

---@class OccurrenceListMatch

---@class OccurrenceCreateData

---@class Registry
---@field country? string
---@field key? string
---@field publishing_organization_key? string
---@field title? string
---@field type? string

---@class RegistryListMatch

---@class Species
---@field canonical_name? string
---@field confidence? number
---@field key? number
---@field match_type? string
---@field rank? string
---@field scientific_name? string
---@field usage_key? number

---@class SpeciesLoadMatch

---@class SpeciesListMatch

---@class Vocabulary
---@field description? string
---@field name? string

---@class VocabularyListMatch

local M = {}

return M
