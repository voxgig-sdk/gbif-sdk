# Gbif Lua SDK



The Lua SDK for the Gbif API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Enumeration()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/gbif-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("gbif_sdk")

local client = sdk.new({
  apikey = os.getenv("GBIF_APIKEY"),
})
```

### 2. List enumeration records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local enumerations, err = client:Enumeration():list()
if err then error(err) end

for _, item in ipairs(enumerations) do
  print(item["iso2"])
end
```

### 3. Load an enumeration

Enumeration is nested under enumeration, so provide the `enumeration`.

```lua
local enumeration, err = client:Enumeration():load({ enumeration = "example_enumeration" })
if err then error(err) end
print(enumeration)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local literatures, err = client:Literature():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Literature():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### GbifSDK

```lua
local sdk = require("gbif_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GbifSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local enumeration, err = client:Enumeration():load()
    if err then error(err) end
    -- enumeration is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Enumeration

| Field | Description |
| --- | --- |
| `iso2` | ISO 3166-1 alpha-2 country code |
| `name` | License name |
| `title` | Country or area name |
| `url` | License URL |

Operations: List, Load.

API path: `/enumeration/basic`

#### Literature

| Field | Description |
| --- | --- |
| `authors` | List of authors |
| `id` | Literature identifier |
| `title` | Publication title |
| `year` | Publication year |

Operations: List.

API path: `/literature/search`

#### Occurrence

| Field | Description |
| --- | --- |
| `country` | Country code |
| `creator` | Username of the download creator |
| `decimalLatitude` | Latitude in decimal degrees |
| `decimalLongitude` | Longitude in decimal degrees |
| `format` | Download format |
| `key` | Unique GBIF identifier for the occurrence |
| `notificationAddresses` | Email addresses for download notification |
| `predicate` | Download filter predicate |
| `scientificName` | Scientific name of the species |
| `year` | Year of occurrence |

Operations: Create, List.

API path: `/occurrence/download/request`

#### Registry

| Field | Description |
| --- | --- |
| `country` | Country code |
| `key` | Organization UUID |
| `publishingOrganizationKey` | Publishing organization UUID |
| `title` | Organization name |
| `type` | Dataset type |

Operations: List.

API path: `/organization/search`

#### Species

| Field | Description |
| --- | --- |
| `canonicalName` | Canonical name |
| `confidence` | Confidence score of the match |
| `key` | Unique GBIF species key |
| `matchType` | Type of match |
| `rank` | Taxonomic rank |
| `scientificName` | Matched scientific name |
| `usageKey` | GBIF taxon key |

Operations: List, Load.

API path: `/species/search`

#### Vocabulary

| Field | Description |
| --- | --- |
| `description` | Vocabulary description |
| `name` | Vocabulary name |

Operations: List.

API path: `/vocabulary`



## Entities


### Enumeration

Create an instance: `local enumeration = client:Enumeration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `iso2` | `string` | ISO 3166-1 alpha-2 country code |
| `name` | `string` | License name |
| `title` | `string` | Country or area name |
| `url` | `string` | License URL |

#### Example: Load

```lua
local enumeration, err = client:Enumeration():load({ enumeration = "enumeration" })
```

#### Example: List

```lua
local enumerations, err = client:Enumeration():list()
```


### Literature

Create an instance: `local literature = client:Literature(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authors` | `table` | List of authors |
| `id` | `string` | Literature identifier |
| `title` | `string` | Publication title |
| `year` | `number` | Publication year |

#### Example: List

```lua
local literatures, err = client:Literature():list()
```


### Occurrence

Create an instance: `local occurrence = client:Occurrence(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` | Country code |
| `creator` | `string` | Username of the download creator |
| `decimalLatitude` | `number` | Latitude in decimal degrees |
| `decimalLongitude` | `number` | Longitude in decimal degrees |
| `format` | `string` | Download format |
| `key` | `number` | Unique GBIF identifier for the occurrence |
| `notificationAddresses` | `table` | Email addresses for download notification |
| `predicate` | `table` | Download filter predicate |
| `scientificName` | `string` | Scientific name of the species |
| `year` | `number` | Year of occurrence |

#### Example: List

```lua
local occurrences, err = client:Occurrence():list()
```

#### Example: Create

```lua
local occurrence, err = client:Occurrence():create({
})
```


### Registry

Create an instance: `local registry = client:Registry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` | Country code |
| `key` | `string` | Organization UUID |
| `publishingOrganizationKey` | `string` | Publishing organization UUID |
| `title` | `string` | Organization name |
| `type` | `string` | Dataset type |

#### Example: List

```lua
local registrys, err = client:Registry():list()
```


### Species

Create an instance: `local species = client:Species(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canonicalName` | `string` | Canonical name |
| `confidence` | `number` | Confidence score of the match |
| `key` | `number` | Unique GBIF species key |
| `matchType` | `string` | Type of match |
| `rank` | `string` | Taxonomic rank |
| `scientificName` | `string` | Matched scientific name |
| `usageKey` | `number` | GBIF taxon key |

#### Example: Load

```lua
local species, err = client:Species():load({ name = "name" })
```

#### Example: List

```lua
local speciess, err = client:Species():list()
```


### Vocabulary

Create an instance: `local vocabulary = client:Vocabulary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Vocabulary description |
| `name` | `string` | Vocabulary name |

#### Example: List

```lua
local vocabularys, err = client:Vocabulary():list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── gbif_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`gbif_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local literature = client:Literature()
literature:list()

-- literature:data_get() now returns the literature data from the last list
-- literature:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
