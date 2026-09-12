# Gbif SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Gbif",
            "slug": "gbif",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.gbif.org/v1",
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "enumeration": {},
                "literature": {},
                "occurrence": {},
                "registry": {},
                "species": {},
                "vocabulary": {},
            },
        },
        "entity": {
      "enumeration": {
        "fields": [
          {
            "name": "iso2",
            "short": "ISO 3166-1 alpha-2 country code",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "License name",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Country or area name",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "short": "License URL",
            "type": "`$STRING`",
          },
        ],
        "name": "enumeration",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/enumeration/basic",
                "segments": [
                  {
                    "lit": "enumeration",
                  },
                  {
                    "lit": "basic",
                  },
                ],
                "select": {
                  "$action": "basic",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "enumeration",
                  "basic",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/enumeration/country",
                "segments": [
                  {
                    "lit": "enumeration",
                  },
                  {
                    "lit": "country",
                  },
                ],
                "select": {
                  "$action": "country",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "enumeration",
                  "country",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/enumeration/license",
                "segments": [
                  {
                    "lit": "enumeration",
                  },
                  {
                    "lit": "license",
                  },
                ],
                "select": {
                  "$action": "license",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "enumeration",
                  "license",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "enumeration",
                      "orig": "enumeration",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/enumeration/basic/{enumeration}",
                "segments": [
                  {
                    "lit": "enumeration",
                  },
                  {
                    "lit": "basic",
                  },
                  {
                    "var": "enumeration",
                  },
                ],
                "select": {
                  "exist": [
                    "enumeration",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "enumeration",
                  "basic",
                  "{enumeration}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "basic",
            ],
          ],
        },
      },
      "literature": {
        "fields": [
          {
            "name": "authors",
            "short": "List of authors",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "Literature identifier",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Publication title",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "short": "Publication year",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "literature",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "year",
                      "orig": "year",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/literature/search",
                "segments": [
                  {
                    "lit": "literature",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "select": {
                  "$action": "search",
                  "exist": [
                    "limit",
                    "offset",
                    "q",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "literature",
                  "search",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "occurrence": {
        "fields": [
          {
            "name": "country",
            "short": "Country code",
            "type": "`$STRING`",
          },
          {
            "name": "creator",
            "short": "Username of the download creator",
            "type": "`$STRING`",
          },
          {
            "format": "double",
            "name": "decimalLatitude",
            "short": "Latitude in decimal degrees",
            "type": "`$NUMBER`",
          },
          {
            "format": "double",
            "name": "decimalLongitude",
            "short": "Longitude in decimal degrees",
            "type": "`$NUMBER`",
          },
          {
            "name": "format",
            "short": "Download format",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "short": "Unique GBIF identifier for the occurrence",
            "type": "`$INTEGER`",
          },
          {
            "name": "notificationAddresses",
            "short": "Email addresses for download notification",
            "type": "`$ARRAY`",
          },
          {
            "name": "predicate",
            "short": "Download filter predicate",
            "type": "`$OBJECT`",
          },
          {
            "name": "scientificName",
            "short": "Scientific name of the species",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "short": "Year of occurrence",
            "type": "`$INTEGER`",
          },
        ],
        "name": "occurrence",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/occurrence/download/request",
                "segments": [
                  {
                    "lit": "occurrence",
                  },
                  {
                    "lit": "download",
                  },
                  {
                    "lit": "request",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "occurrence",
                  "download",
                  "request",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "GB",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "2000",
                      "kind": "query",
                      "name": "year",
                      "orig": "year",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/occurrence/search",
                "segments": [
                  {
                    "lit": "occurrence",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "select": {
                  "$action": "search",
                  "exist": [
                    "country",
                    "limit",
                    "offset",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "occurrence",
                  "search",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "registry": {
        "fields": [
          {
            "name": "country",
            "short": "Country code",
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "key",
            "short": "Organization UUID",
            "type": "`$STRING`",
          },
          {
            "format": "uuid",
            "name": "publishingOrganizationKey",
            "short": "Publishing organization UUID",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Organization name",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Dataset type",
            "type": "`$STRING`",
          },
        ],
        "name": "registry",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/organization/search",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "select": {
                  "exist": [
                    "country",
                    "limit",
                    "offset",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "organization",
                  "search",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/dataset/search",
                "segments": [
                  {
                    "lit": "dataset",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "q",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "dataset",
                  "search",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "species": {
        "fields": [
          {
            "name": "canonicalName",
            "short": "Canonical name",
            "type": "`$STRING`",
          },
          {
            "name": "confidence",
            "short": "Confidence score of the match",
            "type": "`$INTEGER`",
          },
          {
            "name": "key",
            "short": "Unique GBIF species key",
            "type": "`$INTEGER`",
          },
          {
            "name": "matchType",
            "short": "Type of match",
            "type": "`$STRING`",
          },
          {
            "name": "rank",
            "short": "Taxonomic rank",
            "type": "`$STRING`",
          },
          {
            "name": "scientificName",
            "short": "Matched scientific name",
            "type": "`$STRING`",
          },
          {
            "name": "usageKey",
            "short": "GBIF taxon key",
            "type": "`$INTEGER`",
          },
        ],
        "name": "species",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/species/search",
                "segments": [
                  {
                    "lit": "species",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "select": {
                  "$action": "search",
                  "exist": [
                    "limit",
                    "offset",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "species",
                  "search",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "kingdom",
                      "orig": "kingdom",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/species/match",
                "segments": [
                  {
                    "lit": "species",
                  },
                  {
                    "lit": "match",
                  },
                ],
                "select": {
                  "$action": "match",
                  "exist": [
                    "kingdom",
                    "name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "species",
                  "match",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "vocabulary": {
        "fields": [
          {
            "name": "description",
            "short": "Vocabulary description",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Vocabulary name",
            "type": "`$STRING`",
          },
        ],
        "name": "vocabulary",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/vocabulary",
                "segments": [
                  {
                    "lit": "vocabulary",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "vocabulary",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
