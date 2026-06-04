# Gbif Golang SDK

The Golang SDK for the Gbif API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/gbif-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/gbif-sdk/go=../path/to/github.com/voxgig-sdk/gbif-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"

    sdk "github.com/voxgig-sdk/gbif-sdk/go"
    "github.com/voxgig-sdk/gbif-sdk/go/core"
)

func main() {
    client := sdk.NewGbifSDK(map[string]any{})
```

### 2. List enumerations

```go
    result, err := client.Enumeration(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a enumeration

```go
    result, err = client.Enumeration(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewGbifSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GBIF_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewGbifSDK

```go
func NewGbifSDK(options map[string]any) *GbifSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *GbifSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GbifSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Enumeration` | `(data map[string]any) GbifEntity` | Create a Enumeration entity instance. |
| `Literature` | `(data map[string]any) GbifEntity` | Create a Literature entity instance. |
| `Occurrence` | `(data map[string]any) GbifEntity` | Create a Occurrence entity instance. |
| `Registry` | `(data map[string]any) GbifEntity` | Create a Registry entity instance. |
| `Species` | `(data map[string]any) GbifEntity` | Create a Species entity instance. |
| `Vocabulary` | `(data map[string]any) GbifEntity` | Create a Vocabulary entity instance. |

### Entity interface (GbifEntity)

All entities implement the `GbifEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Enumeration

| Field | Description |
| --- | --- |
| `"iso2"` |  |
| `"name"` |  |
| `"title"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/enumeration/basic`

#### Literature

| Field | Description |
| --- | --- |
| `"author"` |  |
| `"id"` |  |
| `"title"` |  |
| `"year"` |  |

Operations: List.

API path: `/literature/search`

#### Occurrence

| Field | Description |
| --- | --- |
| `"country"` |  |
| `"creator"` |  |
| `"decimal_latitude"` |  |
| `"decimal_longitude"` |  |
| `"format"` |  |
| `"key"` |  |
| `"notification_address"` |  |
| `"predicate"` |  |
| `"scientific_name"` |  |
| `"year"` |  |

Operations: Create, List.

API path: `/occurrence/download/request`

#### Registry

| Field | Description |
| --- | --- |
| `"country"` |  |
| `"key"` |  |
| `"publishing_organization_key"` |  |
| `"title"` |  |
| `"type"` |  |

Operations: List.

API path: `/organization/search`

#### Species

| Field | Description |
| --- | --- |
| `"canonical_name"` |  |
| `"confidence"` |  |
| `"key"` |  |
| `"match_type"` |  |
| `"rank"` |  |
| `"scientific_name"` |  |
| `"usage_key"` |  |

Operations: List, Load.

API path: `/species/search`

#### Vocabulary

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"name"` |  |

Operations: List.

API path: `/vocabulary`



## Entities


### Enumeration

Create an instance: `enumeration := client.Enumeration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `iso2` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Enumeration(nil).Load(map[string]any{"id": "enumeration_id"}, nil)
```

#### Example: List

```go
results, err := client.Enumeration(nil).List(nil, nil)
```


### Literature

Create an instance: `literature := client.Literature(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

#### Example: List

```go
results, err := client.Literature(nil).List(nil, nil)
```


### Occurrence

Create an instance: `occurrence := client.Occurrence(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.Occurrence(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Occurrence(nil).Create(map[string]any{
}, nil)
```


### Registry

Create an instance: `registry := client.Registry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | ``$STRING`` |  |
| `key` | ``$STRING`` |  |
| `publishing_organization_key` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Registry(nil).List(nil, nil)
```


### Species

Create an instance: `species := client.Species(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Species(nil).Load(map[string]any{"id": "species_id"}, nil)
```

#### Example: List

```go
results, err := client.Species(nil).List(nil, nil)
```


### Vocabulary

Create an instance: `vocabulary := client.Vocabulary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Vocabulary(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/gbif-sdk/go/
├── gbif.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/gbif-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
