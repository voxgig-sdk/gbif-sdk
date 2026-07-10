# Gbif TypeScript SDK Reference

Complete API reference for the Gbif TypeScript SDK.


## GbifSDK

### Constructor

```ts
new GbifSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GbifSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GbifSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GbifSDK` instance in test mode.


### Instance Methods

#### `Enumeration(data?: object)`

Create a new `Enumeration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnumerationEntity` instance.

#### `Literature(data?: object)`

Create a new `Literature` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LiteratureEntity` instance.

#### `Occurrence(data?: object)`

Create a new `Occurrence` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OccurrenceEntity` instance.

#### `Registry(data?: object)`

Create a new `Registry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegistryEntity` instance.

#### `Species(data?: object)`

Create a new `Species` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpeciesEntity` instance.

#### `Vocabulary(data?: object)`

Create a new `Vocabulary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VocabularyEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GbifSDK.test()`.

**Returns:** `GbifSDK` instance in test mode.


---

## EnumerationEntity

```ts
const enumeration = client.Enumeration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso2` | `string` | No |  |
| `name` | `string` | No |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Enumeration().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Enumeration().load({ enumeration: 'enumeration' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnumerationEntity` instance with the same client and
options.

#### `client()`

Return the parent `GbifSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LiteratureEntity

```ts
const literature = client.Literature()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `any[]` | No |  |
| `id` | `string` | No |  |
| `title` | `string` | No |  |
| `year` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Literature().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LiteratureEntity` instance with the same client and
options.

#### `client()`

Return the parent `GbifSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OccurrenceEntity

```ts
const occurrence = client.Occurrence()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | No |  |
| `creator` | `string` | No |  |
| `decimal_latitude` | `number` | No |  |
| `decimal_longitude` | `number` | No |  |
| `format` | `string` | No |  |
| `key` | `number` | No |  |
| `notification_address` | `any[]` | No |  |
| `predicate` | `Record<string, any>` | No |  |
| `scientific_name` | `string` | No |  |
| `year` | `number` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Occurrence().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Occurrence().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OccurrenceEntity` instance with the same client and
options.

#### `client()`

Return the parent `GbifSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegistryEntity

```ts
const registry = client.Registry()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Registry().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegistryEntity` instance with the same client and
options.

#### `client()`

Return the parent `GbifSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpeciesEntity

```ts
const species = client.Species()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_name` | `string` | No |  |
| `confidence` | `number` | No |  |
| `key` | `number` | No |  |
| `match_type` | `string` | No |  |
| `rank` | `string` | No |  |
| `scientific_name` | `string` | No |  |
| `usage_key` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Species().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Species().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `client()`

Return the parent `GbifSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VocabularyEntity

```ts
const vocabulary = client.Vocabulary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Vocabulary().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VocabularyEntity` instance with the same client and
options.

#### `client()`

Return the parent `GbifSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new GbifSDK({
  feature: {
    test: { active: true },
  }
})
```

