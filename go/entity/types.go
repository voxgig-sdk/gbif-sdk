// Typed models for the Gbif SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/gbif-sdk/go/core"
)

// Enumeration is the typed data model for the enumeration entity.
type Enumeration struct {
	Iso2 *string `json:"iso2,omitempty"`
	Name *string `json:"name,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// EnumerationLoadMatch is the typed request payload for Enumeration.LoadTyped.
type EnumerationLoadMatch struct {
	Enumeration string `json:"enumeration"`
}

// EnumerationListMatch is the typed request payload for Enumeration.ListTyped.
type EnumerationListMatch struct {
	Iso2 *string `json:"iso2,omitempty"`
	Name *string `json:"name,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Literature is the typed data model for the literature entity.
type Literature struct {
	Authors *[]any `json:"authors,omitempty"`
	Id *string `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	Year *int `json:"year,omitempty"`
}

// LiteratureListMatch is the typed request payload for Literature.ListTyped.
type LiteratureListMatch struct {
	Authors *[]any `json:"authors,omitempty"`
	Id *string `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Occurrence is the typed data model for the occurrence entity.
type Occurrence struct {
	Country *string `json:"country,omitempty"`
	Creator *string `json:"creator,omitempty"`
	DecimalLatitude *float64 `json:"decimalLatitude,omitempty"`
	DecimalLongitude *float64 `json:"decimalLongitude,omitempty"`
	Format *string `json:"format,omitempty"`
	Key *int `json:"key,omitempty"`
	NotificationAddresses *[]any `json:"notificationAddresses,omitempty"`
	Predicate *map[string]any `json:"predicate,omitempty"`
	ScientificName *string `json:"scientificName,omitempty"`
	Year *int `json:"year,omitempty"`
}

// OccurrenceListMatch is the typed request payload for Occurrence.ListTyped.
type OccurrenceListMatch struct {
	Country *string `json:"country,omitempty"`
	Creator *string `json:"creator,omitempty"`
	DecimalLatitude *float64 `json:"decimalLatitude,omitempty"`
	DecimalLongitude *float64 `json:"decimalLongitude,omitempty"`
	Format *string `json:"format,omitempty"`
	Key *int `json:"key,omitempty"`
	NotificationAddresses *[]any `json:"notificationAddresses,omitempty"`
	Predicate *map[string]any `json:"predicate,omitempty"`
	ScientificName *string `json:"scientificName,omitempty"`
	Year *int `json:"year,omitempty"`
}

// OccurrenceCreateData is the typed request payload for Occurrence.CreateTyped.
type OccurrenceCreateData struct {
	Country *string `json:"country,omitempty"`
	Creator *string `json:"creator,omitempty"`
	DecimalLatitude *float64 `json:"decimalLatitude,omitempty"`
	DecimalLongitude *float64 `json:"decimalLongitude,omitempty"`
	Format *string `json:"format,omitempty"`
	Key *int `json:"key,omitempty"`
	NotificationAddresses *[]any `json:"notificationAddresses,omitempty"`
	Predicate *map[string]any `json:"predicate,omitempty"`
	ScientificName *string `json:"scientificName,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Registry is the typed data model for the registry entity.
type Registry struct {
	Country *string `json:"country,omitempty"`
	Key *string `json:"key,omitempty"`
	PublishingOrganizationKey *string `json:"publishingOrganizationKey,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
}

// RegistryListMatch is the typed request payload for Registry.ListTyped.
type RegistryListMatch struct {
	Country *string `json:"country,omitempty"`
	Key *string `json:"key,omitempty"`
	PublishingOrganizationKey *string `json:"publishingOrganizationKey,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Species is the typed data model for the species entity.
type Species struct {
	CanonicalName *string `json:"canonicalName,omitempty"`
	Confidence *int `json:"confidence,omitempty"`
	Key *int `json:"key,omitempty"`
	MatchType *string `json:"matchType,omitempty"`
	Rank *string `json:"rank,omitempty"`
	ScientificName *string `json:"scientificName,omitempty"`
	UsageKey *int `json:"usageKey,omitempty"`
}

// SpeciesLoadMatch is the typed request payload for Species.LoadTyped.
type SpeciesLoadMatch struct {
	CanonicalName *string `json:"canonicalName,omitempty"`
	Confidence *int `json:"confidence,omitempty"`
	Key *int `json:"key,omitempty"`
	MatchType *string `json:"matchType,omitempty"`
	Rank *string `json:"rank,omitempty"`
	ScientificName *string `json:"scientificName,omitempty"`
	UsageKey *int `json:"usageKey,omitempty"`
}

// SpeciesListMatch is the typed request payload for Species.ListTyped.
type SpeciesListMatch struct {
	CanonicalName *string `json:"canonicalName,omitempty"`
	Confidence *int `json:"confidence,omitempty"`
	Key *int `json:"key,omitempty"`
	MatchType *string `json:"matchType,omitempty"`
	Rank *string `json:"rank,omitempty"`
	ScientificName *string `json:"scientificName,omitempty"`
	UsageKey *int `json:"usageKey,omitempty"`
}

// Vocabulary is the typed data model for the vocabulary entity.
type Vocabulary struct {
	Description *string `json:"description,omitempty"`
	Name *string `json:"name,omitempty"`
}

// VocabularyListMatch is the typed request payload for Vocabulary.ListTyped.
type VocabularyListMatch struct {
	Description *string `json:"description,omitempty"`
	Name *string `json:"name,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
