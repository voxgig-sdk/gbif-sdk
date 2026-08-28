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
| `options.secret` | `string` | API secret for authentication. |
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
| `iso2` | `string` | No | ISO 3166-1 alpha-2 country code |
| `name` | `string` | No | License name |
| `title` | `string` | No | Country or area name |
| `url` | `string` | No | License URL |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `basic` | `/enumeration/basic` | `client.Enumeration().list({ $action: 'basic', ... })` |
| `country` | `/enumeration/country` | `client.Enumeration().list({ $action: 'country', ... })` |
| `license` | `/enumeration/license` | `client.Enumeration().list({ $action: 'license', ... })` |

An action returns that action's OWN response, which is not necessarily a
Enumeration record — check the API definition for its shape.

```ts
const result = await client.Enumeration().list({
  $action: 'basic',
  /* ...the action's own arguments */
})
```

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
| `authors` | `any[]` | No | List of authors |
| `id` | `string` | No | Literature identifier |
| `title` | `string` | No | Publication title |
| `year` | `number` | No | Publication year |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `search` | `/literature/search` | `client.Literature().list({ $action: 'search', ... })` |

An action returns that action's OWN response, which is not necessarily a
Literature record — check the API definition for its shape.

```ts
const result = await client.Literature().list({
  $action: 'search',
  /* ...the action's own arguments */
})
```

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
| `country` | `string` | No | Country code |
| `creator` | `string` | No | Username of the download creator |
| `decimalLatitude` | `number` | No | Latitude in decimal degrees |
| `decimalLongitude` | `number` | No | Longitude in decimal degrees |
| `format` | `string` | No | Download format |
| `key` | `number` | No | Unique GBIF identifier for the occurrence |
| `notificationAddresses` | `any[]` | No | Email addresses for download notification |
| `predicate` | `Record<string, any>` | No | Download filter predicate |
| `scientificName` | `string` | No | Scientific name of the species |
| `year` | `number` | No | Year of occurrence |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `search` | `/occurrence/search` | `client.Occurrence().list({ $action: 'search', ... })` |

An action returns that action's OWN response, which is not necessarily a
Occurrence record — check the API definition for its shape.

```ts
const result = await client.Occurrence().list({
  $action: 'search',
  /* ...the action's own arguments */
})
```

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
| `country` | `string` | No | Country code |
| `key` | `string` | No | Organization UUID |
| `publishingOrganizationKey` | `string` | No | Publishing organization UUID |
| `title` | `string` | No | Organization name |
| `type` | `string` | No | Dataset type |

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
| `canonicalName` | `string` | No | Canonical name |
| `confidence` | `number` | No | Confidence score of the match |
| `key` | `number` | No | Unique GBIF species key |
| `matchType` | `string` | No | Type of match |
| `rank` | `string` | No | Taxonomic rank |
| `scientificName` | `string` | No | Matched scientific name |
| `usageKey` | `number` | No | GBIF taxon key |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `search` | `/species/search` | `client.Species().list({ $action: 'search', ... })` |
| `match` | `/species/match` | `client.Species().load({ $action: 'match', ... })` |

An action returns that action's OWN response, which is not necessarily a
Species record — check the API definition for its shape.

```ts
const result = await client.Species().list({
  $action: 'search',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Species().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Species().load({ name: 'name' })
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
| `description` | `string` | No | Vocabulary description |
| `name` | `string` | No | Vocabulary name |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

