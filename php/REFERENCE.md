# Gbif PHP SDK Reference

Complete API reference for the Gbif PHP SDK.


## GbifSDK

### Constructor

```php
require_once __DIR__ . '/gbif_sdk.php';

$client = new GbifSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GbifSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = GbifSDK::test();
```


### Instance Methods

#### `Enumeration($data = null)`

Create a new `EnumerationEntity` instance. Pass `null` for no initial data.

#### `Literature($data = null)`

Create a new `LiteratureEntity` instance. Pass `null` for no initial data.

#### `Occurrence($data = null)`

Create a new `OccurrenceEntity` instance. Pass `null` for no initial data.

#### `Registry($data = null)`

Create a new `RegistryEntity` instance. Pass `null` for no initial data.

#### `Species($data = null)`

Create a new `SpeciesEntity` instance. Pass `null` for no initial data.

#### `Vocabulary($data = null)`

Create a new `VocabularyEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## EnumerationEntity

```php
$enumeration = $client->enumeration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `iso2` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->enumeration()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->enumeration()->load(["id" => "enumeration_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EnumerationEntity`

Create a new `EnumerationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LiteratureEntity

```php
$literature = $client->literature();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `year` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->literature()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LiteratureEntity`

Create a new `LiteratureEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## OccurrenceEntity

```php
$occurrence = $client->occurrence();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$STRING`` | No |  |
| `creator` | ``$STRING`` | No |  |
| `decimal_latitude` | ``$NUMBER`` | No |  |
| `decimal_longitude` | ``$NUMBER`` | No |  |
| `format` | ``$STRING`` | No |  |
| `key` | ``$INTEGER`` | No |  |
| `notification_address` | ``$ARRAY`` | No |  |
| `predicate` | ``$OBJECT`` | No |  |
| `scientific_name` | ``$STRING`` | No |  |
| `year` | ``$INTEGER`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->occurrence()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->occurrence()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OccurrenceEntity`

Create a new `OccurrenceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RegistryEntity

```php
$registry = $client->registry();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `publishing_organization_key` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->registry()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RegistryEntity`

Create a new `RegistryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SpeciesEntity

```php
$species = $client->species();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canonical_name` | ``$STRING`` | No |  |
| `confidence` | ``$INTEGER`` | No |  |
| `key` | ``$INTEGER`` | No |  |
| `match_type` | ``$STRING`` | No |  |
| `rank` | ``$STRING`` | No |  |
| `scientific_name` | ``$STRING`` | No |  |
| `usage_key` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->species()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->species()->load(["id" => "species_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SpeciesEntity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## VocabularyEntity

```php
$vocabulary = $client->vocabulary();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->vocabulary()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): VocabularyEntity`

Create a new `VocabularyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new GbifSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

