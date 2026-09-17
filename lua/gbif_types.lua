-- Typed models for the Gbif SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Enumeration

---@class EnumerationLoadMatch
---@field enumeration string

---@class EnumerationListMatch

---@class Literature

---@class LiteratureListMatch
---@field limit? number
---@field offset? number
---@field q? string
---@field year? number

---@class Occurrence
---@field creator? string
---@field format? string
---@field notificationAddresses? table
---@field predicate? table

---@class OccurrenceListMatch
---@field country? string
---@field limit? number
---@field offset? number
---@field year? string

---@class OccurrenceCreateData
---@field creator? string
---@field format? string
---@field notificationAddresses? table
---@field predicate? table

---@class Registry
---@field country? string
---@field key? string
---@field publishingOrganizationKey? string
---@field title? string
---@field type? string

---@class RegistryListMatch
---@field country? string
---@field limit? number
---@field offset? number
---@field q? string

---@class Species

---@class SpeciesLoadMatch
---@field kingdom? string
---@field name string

---@class SpeciesListMatch
---@field limit? number
---@field offset? number
---@field q? string

---@class Vocabulary
---@field description? string
---@field name? string

---@class VocabularyListMatch
---@field description? string
---@field name? string

local M = {}

return M
