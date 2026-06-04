# Gbif SDK

Query global biodiversity records — species, occurrences, datasets and supporting literature from GBIF.org

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About GBIF API

[GBIF](https://www.gbif.org) — the Global Biodiversity Information Facility — is an international network and data infrastructure funded by the world's governments, providing open access to data about all types of life on Earth. The v1 web services at `https://api.gbif.org/v1` are the same REST endpoints that power GBIF.org and allow advanced queries beyond what the website exposes.

What you get from the API:

- Search and retrieval of occurrence records (where and when species were observed or collected) with filtering by taxon, location, date, dataset, basis of record and more.
- A taxonomic backbone for species lookup, name parsing and matching against the GBIF taxonomy.
- A registry of datasets, publishing organizations, installations and network endpoints.
- Indexed literature that cites GBIF-mediated data, controlled vocabularies for interpreted terms (life stage, sex, etc.), and enumerations of the codes used throughout the API.

Operational notes: most GET endpoints are unauthenticated; modifying calls (POST/PUT/DELETE) require HTTP Basic auth with a GBIF account. Rapid scripted searches can trigger HTTP 429 responses, so GBIF recommends the asynchronous Occurrence Download API for large extractions (up to 100,000 parameters, with a citable DOI).

## Try it

**TypeScript**
```bash
npm install gbif
```

**Python**
```bash
pip install gbif-sdk
```

**PHP**
```bash
composer require voxgig/gbif-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/gbif-sdk/go
```

**Ruby**
```bash
gem install gbif-sdk
```

**Lua**
```bash
luarocks install gbif-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GbifSDK } from 'gbif'

const client = new GbifSDK({})

// List all enumerations
const enumerations = await client.Enumeration().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o gbif-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "gbif": {
      "command": "/abs/path/to/gbif-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Enumeration** | Enumerated value lists used across the API — country codes, basis-of-record values, threat statuses and similar controlled vocabularies served under `/enumeration`. | `/enumeration/basic` |
| **Literature** | Index of peer-reviewed papers and grey literature that cite GBIF-mediated data, searchable under `/literature`. | `/literature/search` |
| **Occurrence** | Individual records of organisms observed, collected or otherwise recorded at a place and time, searchable and downloadable under `/occurrence` and `/occurrence/search`. | `/occurrence/download/request` |
| **Registry** | Metadata registry of datasets, publishing organizations, installations, networks and nodes that mobilise data to GBIF, exposed under `/dataset`, `/organization`, `/installation` and related paths. | `/organization/search` |
| **Species** | Taxonomic backbone services for species discovery, name matching, parsing and identifier lookups under `/species` and `/species/match`. | `/species/search` |
| **Vocabulary** | Standardised vocabularies and concepts (e.g. Life Stage) used to interpret occurrence and species fields, served under `/vocabularies`. | `/vocabulary` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from gbif_sdk import GbifSDK

client = GbifSDK({})

# List all enumerations
enumerations, err = client.Enumeration(None).list(None, None)

# Load a specific enumeration
enumeration, err = client.Enumeration(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'gbif_sdk.php';

$client = new GbifSDK([]);

// List all enumerations
[$enumerations, $err] = $client->Enumeration(null)->list(null, null);

// Load a specific enumeration
[$enumeration, $err] = $client->Enumeration(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/gbif-sdk/go"

client := sdk.NewGbifSDK(map[string]any{})

// List all enumerations
enumerations, err := client.Enumeration(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Gbif_sdk"

client = GbifSDK.new({})

# List all enumerations
enumerations, err = client.Enumeration(nil).list(nil, nil)

# Load a specific enumeration
enumeration, err = client.Enumeration(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("gbif_sdk")

local client = sdk.new({})

-- List all enumerations
local enumerations, err = client:Enumeration(nil):list(nil, nil)

-- Load a specific enumeration
local enumeration, err = client:Enumeration(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GbifSDK.test()
const result = await client.Enumeration().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GbifSDK.test(None, None)
result, err = client.Enumeration(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GbifSDK::test(null, null);
[$result, $err] = $client->Enumeration(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Enumeration(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GbifSDK.test(nil, nil)
result, err = client.Enumeration(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Enumeration(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the GBIF API

- Upstream: [https://www.gbif.org](https://www.gbif.org)
- API docs: [https://techdocs.gbif.org/en/openapi/](https://techdocs.gbif.org/en/openapi/)

- This SDK is distributed under the Apache 2.0 licence.
- Biodiversity data returned by the API is published under per-dataset licences — typically CC0, CC BY, or CC BY-NC — surfaced on each record.
- Users are expected to cite GBIF and the contributing datasets; for large extractions the GBIF download API issues a DOI to support citation.
- Most read endpoints are open and require no authentication; write operations use HTTP Basic auth tied to a GBIF user account.

---

Generated from the GBIF API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
