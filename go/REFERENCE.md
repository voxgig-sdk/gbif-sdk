# Gbif Golang SDK Reference

Complete API reference for the Gbif Golang SDK.


## GbifSDK

### Constructor

```go
func NewGbifSDK(options map[string]any) *GbifSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *GbifSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *GbifSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Enumeration(data map[string]any) GbifEntity`

Create a new `Enumeration` entity instance. Pass `nil` for no initial data.

#### `Literature(data map[string]any) GbifEntity`

Create a new `Literature` entity instance. Pass `nil` for no initial data.

#### `Occurrence(data map[string]any) GbifEntity`

Create a new `Occurrence` entity instance. Pass `nil` for no initial data.

#### `Registry(data map[string]any) GbifEntity`

Create a new `Registry` entity instance. Pass `nil` for no initial data.

#### `Species(data map[string]any) GbifEntity`

Create a new `Species` entity instance. Pass `nil` for no initial data.

#### `Vocabulary(data map[string]any) GbifEntity`

Create a new `Vocabulary` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## EnumerationEntity

```go
enumeration := client.Enumeration(nil)
fmt.Println(enumeration.GetName()) // "enumeration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso2` | `string` | No | ISO 3166-1 alpha-2 country code |
| `name` | `string` | No | License name |
| `title` | `string` | No | Country or area name |
| `url` | `string` | No | License URL |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Enumeration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Enumeration(nil).Load(map[string]any{"enumeration": "enumeration"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EnumerationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LiteratureEntity

```go
literature := client.Literature(nil)
fmt.Println(literature.GetName()) // "literature"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `[]any` | No | List of authors |
| `id` | `string` | No | Literature identifier |
| `title` | `string` | No | Publication title |
| `year` | `int` | No | Publication year |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Literature(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LiteratureEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OccurrenceEntity

```go
occurrence := client.Occurrence(nil)
fmt.Println(occurrence.GetName()) // "occurrence"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No | Country code |
| `creator` | `string` | No | Username of the download creator |
| `decimalLatitude` | `float64` | No | Latitude in decimal degrees |
| `decimalLongitude` | `float64` | No | Longitude in decimal degrees |
| `format` | `string` | No | Download format |
| `key` | `int` | No | Unique GBIF identifier for the occurrence |
| `notificationAddresses` | `[]any` | No | Email addresses for download notification |
| `predicate` | `map[string]any` | No | Download filter predicate |
| `scientificName` | `string` | No | Scientific name of the species |
| `year` | `int` | No | Year of occurrence |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Occurrence(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Occurrence(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OccurrenceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegistryEntity

```go
registry := client.Registry(nil)
fmt.Println(registry.GetName()) // "registry"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No | Country code |
| `key` | `string` | No | Organization UUID |
| `publishingOrganizationKey` | `string` | No | Publishing organization UUID |
| `title` | `string` | No | Organization name |
| `type` | `string` | No | Dataset type |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Registry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegistryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SpeciesEntity

```go
species := client.Species(nil)
fmt.Println(species.GetName()) // "species"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonicalName` | `string` | No | Canonical name |
| `confidence` | `int` | No | Confidence score of the match |
| `key` | `int` | No | Unique GBIF species key |
| `matchType` | `string` | No | Type of match |
| `rank` | `string` | No | Taxonomic rank |
| `scientificName` | `string` | No | Matched scientific name |
| `usageKey` | `int` | No | GBIF taxon key |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Species(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Species(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VocabularyEntity

```go
vocabulary := client.Vocabulary(nil)
fmt.Println(vocabulary.GetName()) // "vocabulary"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Vocabulary description |
| `name` | `string` | No | Vocabulary name |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Vocabulary(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VocabularyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewGbifSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

