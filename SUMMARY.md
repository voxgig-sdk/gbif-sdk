# GBIF API

The GBIF API provides a programmatic interface to query and publish biodiversity data on GBIF.org, enabling advanced queries not supported by the website. Users can integrate GBIF data into scripts, workflows, or analyses, ensuring reliable and automated results.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 12 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Enumeration

Results: List of available enumerations; List of countries and areas; List of supported licenses; List of enumeration values.

SDK operations: `list`, `load`.

Key fields to recognise:

- `iso2`: ISO 3166-1 alpha-2 country code
- `name`: License name
- `title`: Country or area name
- `url`: License URL

### Literature

Results: Successful response with literature search results.

SDK operations: `list`.

Key fields to recognise:

- `authors`: List of authors
- `id`: Literature identifier
- `title`: Publication title
- `year`: Publication year

### Occurrence

Results: Download request created successfully; Successful response with occurrence search results.

SDK operations: `create`, `list`.

Key fields to recognise:

- `country`: Country code
- `creator`: Username of the download creator
- `decimalLatitude`: Latitude in decimal degrees
- `decimalLongitude`: Longitude in decimal degrees
- `format`: Download format

### Registry

Results: Successful response with organization search results; Successful response with dataset search results.

SDK operations: `list`.

Key fields to recognise:

- `country`: Country code
- `key`: Organization UUID
- `publishingOrganizationKey`: Publishing organization UUID
- `title`: Organization name
- `type`: Dataset type

### Species

Results: Successful response with species search results; Successful species match.

SDK operations: `list`, `load`.

Key fields to recognise:

- `canonicalName`: Canonical name
- `confidence`: Confidence score of the match
- `key`: Unique GBIF species key
- `matchType`: Type of match
- `rank`: Taxonomic rank

### Vocabulary

Results: List of available vocabularies.

SDK operations: `list`.

Key fields to recognise:

- `description`: Vocabulary description
- `name`: Vocabulary name

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Enumeration | `list` | `GET /enumeration/basic` | See reference |
| Enumeration | `list` | `GET /enumeration/country` | See reference |
| Enumeration | `list` | `GET /enumeration/license` | See reference |
| Enumeration | `load` | `GET /enumeration/basic/{enumeration}` | See reference |
| Literature | `list` | `GET /literature/search` | See reference |
| Occurrence | `create` | `POST /occurrence/download/request` | Required |
| Occurrence | `list` | `GET /occurrence/search` | See reference |
| Registry | `list` | `GET /organization/search` | See reference |
| Registry | `list` | `GET /dataset/search` | See reference |
| Species | `list` | `GET /species/search` | See reference |
| Species | `load` | `GET /species/match` | See reference |
| Vocabulary | `list` | `GET /vocabulary` | See reference |

## Connect to the API

- GBIF API Production Server: `https://api.gbif.org/v1`

The default credential is sent in the `Authorization` header with the `Basic` prefix.

HTTP Basic Authentication using GBIF user credentials

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `gbif_list`: List records for an entity. Supported entities: `enumeration`, `literature`, `occurrence`, `registry`, `species`, `vocabulary`.
- `gbif_load`: Load one record for an entity. Supported entities: `enumeration`, `species`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

