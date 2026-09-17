# frozen_string_literal: true

# Typed models for the Gbif SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Enumeration entity data model.
class Enumeration
end

# Request payload for Enumeration#load.
#
# @!attribute [rw] enumeration
#   @return [String]
EnumerationLoadMatch = Struct.new(
  :enumeration,
  keyword_init: true
)

# Request payload for Enumeration#list.
class EnumerationListMatch
end

# Literature entity data model.
class Literature
end

# Request payload for Literature#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
LiteratureListMatch = Struct.new(
  :limit,
  :offset,
  :q,
  :year,
  keyword_init: true
)

# Occurrence entity data model.
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] notificationAddresses
#   @return [Array, nil]
#
# @!attribute [rw] predicate
#   @return [Hash, nil]
Occurrence = Struct.new(
  :creator,
  :format,
  :notificationAddresses,
  :predicate,
  keyword_init: true
)

# Request payload for Occurrence#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] year
#   @return [String, nil]
OccurrenceListMatch = Struct.new(
  :country,
  :limit,
  :offset,
  :year,
  keyword_init: true
)

# Request payload for Occurrence#create.
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] notificationAddresses
#   @return [Array, nil]
#
# @!attribute [rw] predicate
#   @return [Hash, nil]
OccurrenceCreateData = Struct.new(
  :creator,
  :format,
  :notificationAddresses,
  :predicate,
  keyword_init: true
)

# Registry entity data model.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] publishingOrganizationKey
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Registry = Struct.new(
  :country,
  :key,
  :publishingOrganizationKey,
  :title,
  :type,
  keyword_init: true
)

# Request payload for Registry#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
RegistryListMatch = Struct.new(
  :country,
  :limit,
  :offset,
  :q,
  keyword_init: true
)

# Species entity data model.
class Species
end

# Request payload for Species#load.
#
# @!attribute [rw] kingdom
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
SpeciesLoadMatch = Struct.new(
  :kingdom,
  :name,
  keyword_init: true
)

# Request payload for Species#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
SpeciesListMatch = Struct.new(
  :limit,
  :offset,
  :q,
  keyword_init: true
)

# Vocabulary entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Vocabulary = Struct.new(
  :description,
  :name,
  keyword_init: true
)

# Request payload for Vocabulary#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
VocabularyListMatch = Struct.new(
  :description,
  :name,
  keyword_init: true
)

