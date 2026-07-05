# Gbif Ruby SDK Reference

Complete API reference for the Gbif Ruby SDK.


## GbifSDK

### Constructor

```ruby
require_relative 'Gbif_sdk'

client = GbifSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GbifSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = GbifSDK.test
```


### Instance Methods

#### `Enumeration(data = nil)`

Create a new `Enumeration` entity instance. Pass `nil` for no initial data.

#### `Literature(data = nil)`

Create a new `Literature` entity instance. Pass `nil` for no initial data.

#### `Occurrence(data = nil)`

Create a new `Occurrence` entity instance. Pass `nil` for no initial data.

#### `Registry(data = nil)`

Create a new `Registry` entity instance. Pass `nil` for no initial data.

#### `Species(data = nil)`

Create a new `Species` entity instance. Pass `nil` for no initial data.

#### `Vocabulary(data = nil)`

Create a new `Vocabulary` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## EnumerationEntity

```ruby
enumeration = client.Enumeration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso2` | `String` | No |  |
| `name` | `String` | No |  |
| `title` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Enumeration.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Enumeration.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnumerationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LiteratureEntity

```ruby
literature = client.Literature
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `Array` | No |  |
| `id` | `String` | No |  |
| `title` | `String` | No |  |
| `year` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Literature.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LiteratureEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OccurrenceEntity

```ruby
occurrence = client.Occurrence
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `String` | No |  |
| `creator` | `String` | No |  |
| `decimal_latitude` | `Float` | No |  |
| `decimal_longitude` | `Float` | No |  |
| `format` | `String` | No |  |
| `key` | `Integer` | No |  |
| `notification_address` | `Array` | No |  |
| `predicate` | `Hash` | No |  |
| `scientific_name` | `String` | No |  |
| `year` | `Integer` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Occurrence.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Occurrence.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OccurrenceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegistryEntity

```ruby
registry = client.Registry
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `String` | No |  |
| `key` | `String` | No |  |
| `publishing_organization_key` | `String` | No |  |
| `title` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Registry.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegistryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SpeciesEntity

```ruby
species = client.Species
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_name` | `String` | No |  |
| `confidence` | `Integer` | No |  |
| `key` | `Integer` | No |  |
| `match_type` | `String` | No |  |
| `rank` | `String` | No |  |
| `scientific_name` | `String` | No |  |
| `usage_key` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Species.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Species.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VocabularyEntity

```ruby
vocabulary = client.Vocabulary
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Vocabulary.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VocabularyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = GbifSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

