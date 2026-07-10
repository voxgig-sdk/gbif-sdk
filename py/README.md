# Gbif Python SDK



The Python SDK for the Gbif API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Enumeration()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/gbif-sdk/releases)) or
from a source checkout:

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

### 2. List enumeration records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    enumerations = client.Enumeration().list()
    for enumeration in enumerations:
        print(enumeration)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an enumeration

Enumeration is nested under enumeration, so provide the `enumeration`.
`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    enumeration = client.Enumeration().load({"enumeration": "example_enumeration"})
    print(enumeration)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    enumerations = client.Enumeration().list()
    print(enumerations)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = GbifSDK.test()

# Entity ops return the bare record and raise on error.
enumeration = client.Enumeration().list()
# enumeration contains the mock response record
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
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

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

Create an instance: `enumeration = client.Enumeration()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `iso2` | `str` |  |
| `name` | `str` |  |
| `title` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
enumeration = client.Enumeration().load({"enumeration": "enumeration"})
```

#### Example: List

```python
enumerations = client.Enumeration().list()
```


### Literature

Create an instance: `literature = client.Literature()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `list` |  |
| `id` | `str` |  |
| `title` | `str` |  |
| `year` | `int` |  |

#### Example: List

```python
literatures = client.Literature().list()
```


### Occurrence

Create an instance: `occurrence = client.Occurrence()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `str` |  |
| `creator` | `str` |  |
| `decimal_latitude` | `float` |  |
| `decimal_longitude` | `float` |  |
| `format` | `str` |  |
| `key` | `int` |  |
| `notification_address` | `list` |  |
| `predicate` | `dict` |  |
| `scientific_name` | `str` |  |
| `year` | `int` |  |

#### Example: List

```python
occurrences = client.Occurrence().list()
```

#### Example: Create

```python
occurrence = client.Occurrence().create({
})
```


### Registry

Create an instance: `registry = client.Registry()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `str` |  |
| `key` | `str` |  |
| `publishing_organization_key` | `str` |  |
| `title` | `str` |  |
| `type` | `str` |  |

#### Example: List

```python
registrys = client.Registry().list()
```


### Species

Create an instance: `species = client.Species()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canonical_name` | `str` |  |
| `confidence` | `int` |  |
| `key` | `int` |  |
| `match_type` | `str` |  |
| `rank` | `str` |  |
| `scientific_name` | `str` |  |
| `usage_key` | `int` |  |

#### Example: Load

```python
species = client.Species().load()
```

#### Example: List

```python
speciess = client.Species().list()
```


### Vocabulary

Create an instance: `vocabulary = client.Vocabulary()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `name` | `str` |  |

#### Example: List

```python
vocabularys = client.Vocabulary().list()
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
enumeration = client.Enumeration()
enumeration.list()

# enumeration.data_get() now returns the enumeration data from the last list
# enumeration.match_get() returns the last match criteria
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
