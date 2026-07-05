# Gbif Python SDK Reference

Complete API reference for the Gbif Python SDK.


## GbifSDK

### Constructor

```python
from gbif_sdk import GbifSDK

client = GbifSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GbifSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = GbifSDK.test()
```


### Instance Methods

#### `Enumeration(data=None)`

Create a new `EnumerationEntity` instance. Pass `None` for no initial data.

#### `Literature(data=None)`

Create a new `LiteratureEntity` instance. Pass `None` for no initial data.

#### `Occurrence(data=None)`

Create a new `OccurrenceEntity` instance. Pass `None` for no initial data.

#### `Registry(data=None)`

Create a new `RegistryEntity` instance. Pass `None` for no initial data.

#### `Species(data=None)`

Create a new `SpeciesEntity` instance. Pass `None` for no initial data.

#### `Vocabulary(data=None)`

Create a new `VocabularyEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## EnumerationEntity

```python
enumeration = client.Enumeration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso2` | `str` | No |  |
| `name` | `str` | No |  |
| `title` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Enumeration().list()
for enumeration in results:
    print(enumeration)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Enumeration().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnumerationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LiteratureEntity

```python
literature = client.Literature()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `list` | No |  |
| `id` | `str` | No |  |
| `title` | `str` | No |  |
| `year` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Literature().list()
for literature in results:
    print(literature)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LiteratureEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OccurrenceEntity

```python
occurrence = client.Occurrence()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `str` | No |  |
| `creator` | `str` | No |  |
| `decimal_latitude` | `float` | No |  |
| `decimal_longitude` | `float` | No |  |
| `format` | `str` | No |  |
| `key` | `int` | No |  |
| `notification_address` | `list` | No |  |
| `predicate` | `dict` | No |  |
| `scientific_name` | `str` | No |  |
| `year` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Occurrence().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Occurrence().list()
for occurrence in results:
    print(occurrence)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OccurrenceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegistryEntity

```python
registry = client.Registry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `str` | No |  |
| `key` | `str` | No |  |
| `publishing_organization_key` | `str` | No |  |
| `title` | `str` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Registry().list()
for registry in results:
    print(registry)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpeciesEntity

```python
species = client.Species()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_name` | `str` | No |  |
| `confidence` | `int` | No |  |
| `key` | `int` | No |  |
| `match_type` | `str` | No |  |
| `rank` | `str` | No |  |
| `scientific_name` | `str` | No |  |
| `usage_key` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Species().list()
for species in results:
    print(species)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Species().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpeciesEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VocabularyEntity

```python
vocabulary = client.Vocabulary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No |  |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Vocabulary().list()
for vocabulary in results:
    print(vocabulary)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VocabularyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = GbifSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

