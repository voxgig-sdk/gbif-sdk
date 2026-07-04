<?php
declare(strict_types=1);

// Typed models for the Gbif SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Enumeration entity data model. */
class Enumeration
{
    public ?string $iso2 = null;
    public ?string $name = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Request payload for Enumeration#load. */
class EnumerationLoadMatch
{
    public string $enumeration;
}

/** Match filter for Enumeration#list (any subset of Enumeration fields). */
class EnumerationListMatch
{
    public ?string $iso2 = null;
    public ?string $name = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Literature entity data model. */
class Literature
{
    public ?array $author = null;
    public ?string $id = null;
    public ?string $title = null;
    public ?int $year = null;
}

/** Match filter for Literature#list (any subset of Literature fields). */
class LiteratureListMatch
{
    public ?array $author = null;
    public ?string $id = null;
    public ?string $title = null;
    public ?int $year = null;
}

/** Occurrence entity data model. */
class Occurrence
{
    public ?string $country = null;
    public ?string $creator = null;
    public ?float $decimal_latitude = null;
    public ?float $decimal_longitude = null;
    public ?string $format = null;
    public ?int $key = null;
    public ?array $notification_address = null;
    public ?array $predicate = null;
    public ?string $scientific_name = null;
    public ?int $year = null;
}

/** Match filter for Occurrence#list (any subset of Occurrence fields). */
class OccurrenceListMatch
{
    public ?string $country = null;
    public ?string $creator = null;
    public ?float $decimal_latitude = null;
    public ?float $decimal_longitude = null;
    public ?string $format = null;
    public ?int $key = null;
    public ?array $notification_address = null;
    public ?array $predicate = null;
    public ?string $scientific_name = null;
    public ?int $year = null;
}

/** Match filter for Occurrence#create (any subset of Occurrence fields). */
class OccurrenceCreateData
{
    public ?string $country = null;
    public ?string $creator = null;
    public ?float $decimal_latitude = null;
    public ?float $decimal_longitude = null;
    public ?string $format = null;
    public ?int $key = null;
    public ?array $notification_address = null;
    public ?array $predicate = null;
    public ?string $scientific_name = null;
    public ?int $year = null;
}

/** Registry entity data model. */
class Registry
{
    public ?string $country = null;
    public ?string $key = null;
    public ?string $publishing_organization_key = null;
    public ?string $title = null;
    public ?string $type = null;
}

/** Match filter for Registry#list (any subset of Registry fields). */
class RegistryListMatch
{
    public ?string $country = null;
    public ?string $key = null;
    public ?string $publishing_organization_key = null;
    public ?string $title = null;
    public ?string $type = null;
}

/** Species entity data model. */
class Species
{
    public ?string $canonical_name = null;
    public ?int $confidence = null;
    public ?int $key = null;
    public ?string $match_type = null;
    public ?string $rank = null;
    public ?string $scientific_name = null;
    public ?int $usage_key = null;
}

/** Match filter for Species#load (any subset of Species fields). */
class SpeciesLoadMatch
{
    public ?string $canonical_name = null;
    public ?int $confidence = null;
    public ?int $key = null;
    public ?string $match_type = null;
    public ?string $rank = null;
    public ?string $scientific_name = null;
    public ?int $usage_key = null;
}

/** Match filter for Species#list (any subset of Species fields). */
class SpeciesListMatch
{
    public ?string $canonical_name = null;
    public ?int $confidence = null;
    public ?int $key = null;
    public ?string $match_type = null;
    public ?string $rank = null;
    public ?string $scientific_name = null;
    public ?int $usage_key = null;
}

/** Vocabulary entity data model. */
class Vocabulary
{
    public ?string $description = null;
    public ?string $name = null;
}

/** Match filter for Vocabulary#list (any subset of Vocabulary fields). */
class VocabularyListMatch
{
    public ?string $description = null;
    public ?string $name = null;
}

