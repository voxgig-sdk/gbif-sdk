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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso2` | `string` | No |  |
| `name` | `string` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Enumeration(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Enumeration(nil).Load(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `[]any` | No |  |
| `id` | `string` | No |  |
| `title` | `string` | No |  |
| `year` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Literature(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No |  |
| `creator` | `string` | No |  |
| `decimal_latitude` | `float64` | No |  |
| `decimal_longitude` | `float64` | No |  |
| `format` | `string` | No |  |
| `key` | `int` | No |  |
| `notification_address` | `[]any` | No |  |
| `predicate` | `map[string]any` | No |  |
| `scientific_name` | `string` | No |  |
| `year` | `int` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Occurrence(nil).Create(map[string]any{
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Occurrence(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No |  |
| `key` | `string` | No |  |
| `publishing_organization_key` | `string` | No |  |
| `title` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Registry(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_name` | `string` | No |  |
| `confidence` | `int` | No |  |
| `key` | `int` | No |  |
| `match_type` | `string` | No |  |
| `rank` | `string` | No |  |
| `scientific_name` | `string` | No |  |
| `usage_key` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Species(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Species(nil).Load(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Vocabulary(nil).List(nil, nil)
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

