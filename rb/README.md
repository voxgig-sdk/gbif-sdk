# Gbif Ruby SDK



The Ruby SDK for the Gbif API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Enumeration` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/gbif-sdk/releases](https://github.com/voxgig-sdk/gbif-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Gbif_sdk"

client = GbifSDK.new({
  "apikey" => ENV["GBIF_APIKEY"],
})
```

### 2. List enumeration records

```ruby
begin
  # list returns an Array of Enumeration records — iterate directly.
  enumerations = client.Enumeration.list
  enumerations.each do |item|
    puts "#{item["iso2"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an enumeration

```ruby
begin
  # load returns the bare Enumeration record (raises on error).
  enumeration = client.Enumeration.load()
  puts enumeration
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  enumerations = client.Enumeration.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = GbifSDK.test

# Entity ops return the bare mock record (raises on error).
enumeration = client.Enumeration.list()
puts enumeration
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = GbifSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GBIF_TEST_LIVE=TRUE
GBIF_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### GbifSDK

```ruby
require_relative "Gbif_sdk"
client = GbifSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = GbifSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GbifSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Enumeration` | `(data) -> EnumerationEntity` | Create an Enumeration entity instance. |
| `Literature` | `(data) -> LiteratureEntity` | Create a Literature entity instance. |
| `Occurrence` | `(data) -> OccurrenceEntity` | Create an Occurrence entity instance. |
| `Registry` | `(data) -> RegistryEntity` | Create a Registry entity instance. |
| `Species` | `(data) -> SpeciesEntity` | Create a Species entity instance. |
| `Vocabulary` | `(data) -> VocabularyEntity` | Create a Vocabulary entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `GbifError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Enumeration

| Field | Description |
| --- | --- |
| `iso2` |  |
| `name` |  |
| `title` |  |
| `url` |  |

Operations: List, Load.

API path: `/enumeration/basic`

#### Literature

| Field | Description |
| --- | --- |
| `author` |  |
| `id` |  |
| `title` |  |
| `year` |  |

Operations: List.

API path: `/literature/search`

#### Occurrence

| Field | Description |
| --- | --- |
| `country` |  |
| `creator` |  |
| `decimal_latitude` |  |
| `decimal_longitude` |  |
| `format` |  |
| `key` |  |
| `notification_address` |  |
| `predicate` |  |
| `scientific_name` |  |
| `year` |  |

Operations: Create, List.

API path: `/occurrence/download/request`

#### Registry

| Field | Description |
| --- | --- |
| `country` |  |
| `key` |  |
| `publishing_organization_key` |  |
| `title` |  |
| `type` |  |

Operations: List.

API path: `/organization/search`

#### Species

| Field | Description |
| --- | --- |
| `canonical_name` |  |
| `confidence` |  |
| `key` |  |
| `match_type` |  |
| `rank` |  |
| `scientific_name` |  |
| `usage_key` |  |

Operations: List, Load.

API path: `/species/search`

#### Vocabulary

| Field | Description |
| --- | --- |
| `description` |  |
| `name` |  |

Operations: List.

API path: `/vocabulary`



## Entities


### Enumeration

Create an instance: `enumeration = client.Enumeration`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `iso2` | `String` |  |
| `name` | `String` |  |
| `title` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Enumeration record (raises on error).
enumeration = client.Enumeration.load()
```

#### Example: List

```ruby
# list returns an Array of Enumeration records (raises on error).
enumerations = client.Enumeration.list
```


### Literature

Create an instance: `literature = client.Literature`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `Array` |  |
| `id` | `String` |  |
| `title` | `String` |  |
| `year` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Literature records (raises on error).
literatures = client.Literature.list
```


### Occurrence

Create an instance: `occurrence = client.Occurrence`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `String` |  |
| `creator` | `String` |  |
| `decimal_latitude` | `Float` |  |
| `decimal_longitude` | `Float` |  |
| `format` | `String` |  |
| `key` | `Integer` |  |
| `notification_address` | `Array` |  |
| `predicate` | `Hash` |  |
| `scientific_name` | `String` |  |
| `year` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Occurrence records (raises on error).
occurrences = client.Occurrence.list
```

#### Example: Create

```ruby
occurrence = client.Occurrence.create({
})
```


### Registry

Create an instance: `registry = client.Registry`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `String` |  |
| `key` | `String` |  |
| `publishing_organization_key` | `String` |  |
| `title` | `String` |  |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Registry records (raises on error).
registrys = client.Registry.list
```


### Species

Create an instance: `species = client.Species`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canonical_name` | `String` |  |
| `confidence` | `Integer` |  |
| `key` | `Integer` |  |
| `match_type` | `String` |  |
| `rank` | `String` |  |
| `scientific_name` | `String` |  |
| `usage_key` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Species record (raises on error).
species = client.Species.load()
```

#### Example: List

```ruby
# list returns an Array of Species records (raises on error).
speciess = client.Species.list
```


### Vocabulary

Create an instance: `vocabulary = client.Vocabulary`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Vocabulary records (raises on error).
vocabularys = client.Vocabulary.list
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Gbif_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Gbif_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
enumeration = client.Enumeration
enumeration.list()

# enumeration.data_get now returns the enumeration data from the last list
# enumeration.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
