# Gbif Python SDK



The Python SDK for the Gbif API — an entity-oriented client following Pythonic conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
pip install voxgig-sdk-gbif
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from gbif_sdk import GbifSDK

client = GbifSDK({
    "apikey": os.environ.get("GBIF_APIKEY"),
})
```

### 2. List enumerations

```python
result, err = client.Enumeration().list()
if err:
    raise Exception(err)

if isinstance(result, list):
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
```

### 3. Load a enumeration

```python
result, err = client.Enumeration().load({"id": "example_id"})
if err:
    raise Exception(err)
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = GbifSDK.test()

result, err = client.Gbif().load({"id": "test01"})
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = GbifSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### GbifSDK

```python
from gbif_sdk import GbifSDK

client = GbifSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = GbifSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### GbifSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Enumeration` | `(data) -> EnumerationEntity` | Create a Enumeration entity instance. |
| `Literature` | `(data) -> LiteratureEntity` | Create a Literature entity instance. |
| `Occurrence` | `(data) -> OccurrenceEntity` | Create a Occurrence entity instance. |
| `Registry` | `(data) -> RegistryEntity` | Create a Registry entity instance. |
| `Species` | `(data) -> SpeciesEntity` | Create a Species entity instance. |
| `Vocabulary` | `(data) -> VocabularyEntity` | Create a Vocabulary entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `const enumeration = client.Enumeration()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `iso2` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const enumeration = await client.Enumeration().load({ id: 'enumeration_id' })
```

#### Example: List

```ts
const enumerations = await client.Enumeration().list()
```


### Literature

Create an instance: `const literature = client.Literature()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

#### Example: List

```ts
const literatures = await client.Literature().list()
```


### Occurrence

Create an instance: `const occurrence = client.Occurrence()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | ``$STRING`` |  |
| `creator` | ``$STRING`` |  |
| `decimal_latitude` | ``$NUMBER`` |  |
| `decimal_longitude` | ``$NUMBER`` |  |
| `format` | ``$STRING`` |  |
| `key` | ``$INTEGER`` |  |
| `notification_address` | ``$ARRAY`` |  |
| `predicate` | ``$OBJECT`` |  |
| `scientific_name` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

#### Example: List

```ts
const occurrences = await client.Occurrence().list()
```

#### Example: Create

```ts
const occurrence = await client.Occurrence().create({
})
```


### Registry

Create an instance: `const registry = client.Registry()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | ``$STRING`` |  |
| `key` | ``$STRING`` |  |
| `publishing_organization_key` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: List

```ts
const registrys = await client.Registry().list()
```


### Species

Create an instance: `const species = client.Species()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canonical_name` | ``$STRING`` |  |
| `confidence` | ``$INTEGER`` |  |
| `key` | ``$INTEGER`` |  |
| `match_type` | ``$STRING`` |  |
| `rank` | ``$STRING`` |  |
| `scientific_name` | ``$STRING`` |  |
| `usage_key` | ``$INTEGER`` |  |

#### Example: Load

```ts
const species = await client.Species().load({ id: 'species_id' })
```

#### Example: List

```ts
const speciess = await client.Species().list()
```


### Vocabulary

Create an instance: `const vocabulary = client.Vocabulary()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```ts
const vocabularys = await client.Vocabulary().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── gbif_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`gbif_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
