# Gbif TypeScript SDK

The TypeScript SDK for the Gbif API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install gbif
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { GbifSDK } from 'gbif'

const client = new GbifSDK({
  apikey: process.env.GBIF_APIKEY,
})
```

### 2. List enumerations

```ts
const result = await client.Enumeration().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a enumeration

```ts
const result = await client.Enumeration().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = GbifSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new GbifSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new GbifSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### GbifSDK

#### Constructor

```ts
new GbifSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Enumeration(data?)` | `EnumerationEntity` | Create a Enumeration entity instance. |
| `Literature(data?)` | `LiteratureEntity` | Create a Literature entity instance. |
| `Occurrence(data?)` | `OccurrenceEntity` | Create a Occurrence entity instance. |
| `Registry(data?)` | `RegistryEntity` | Create a Registry entity instance. |
| `Species(data?)` | `SpeciesEntity` | Create a Species entity instance. |
| `Vocabulary(data?)` | `VocabularyEntity` | Create a Vocabulary entity instance. |
| `tester(testopts?, sdkopts?)` | `GbifSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `GbifSDK.test(testopts?, sdkopts?)` | `GbifSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): GbifSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Enumeration

| Field | Description |
| --- | --- |
| `iso2` |  |
| `name` |  |
| `title` |  |
| `url` |  |

Operations: list, load.

API path: `/enumeration/basic`

#### Literature

| Field | Description |
| --- | --- |
| `author` |  |
| `id` |  |
| `title` |  |
| `year` |  |

Operations: list.

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

Operations: create, list.

API path: `/occurrence/download/request`

#### Registry

| Field | Description |
| --- | --- |
| `country` |  |
| `key` |  |
| `publishing_organization_key` |  |
| `title` |  |
| `type` |  |

Operations: list.

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

Operations: list, load.

API path: `/species/search`

#### Vocabulary

| Field | Description |
| --- | --- |
| `description` |  |
| `name` |  |

Operations: list.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
gbif/
├── src/
│   ├── GbifSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { GbifSDK } from 'gbif'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
