"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Gbif',
        slug: "gbif",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.gbif.org/v1",
        auth: {
            prefix: 'Basic',
            basic: true,
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            enumeration: {},
            literature: {},
            occurrence: {},
            registry: {},
            species: {},
            vocabulary: {},
        }
    };
    entity = {
        "enumeration": {
            "fields": [
                {
                    "name": "iso2",
                    "short": "ISO 3166-1 alpha-2 country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "License name",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "short": "Country or area name",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "License URL",
                    "type": "`$STRING`"
                }
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
                                    "lit": "enumeration"
                                },
                                {
                                    "lit": "basic"
                                }
                            ],
                            "select": {
                                "$action": "basic"
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "enumeration",
                                "basic"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/enumeration/country",
                            "segments": [
                                {
                                    "lit": "enumeration"
                                },
                                {
                                    "lit": "country"
                                }
                            ],
                            "select": {
                                "$action": "country"
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "enumeration",
                                "country"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/enumeration/license",
                            "segments": [
                                {
                                    "lit": "enumeration"
                                },
                                {
                                    "lit": "license"
                                }
                            ],
                            "select": {
                                "$action": "license"
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "enumeration",
                                "license"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/enumeration/basic/{enumeration}",
                            "segments": [
                                {
                                    "lit": "enumeration"
                                },
                                {
                                    "lit": "basic"
                                },
                                {
                                    "var": "enumeration"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "enumeration"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "enumeration",
                                "basic",
                                "{enumeration}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "basic"
                    ]
                ]
            }
        },
        "literature": {
            "fields": [
                {
                    "name": "authors",
                    "short": "List of authors",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "short": "Literature identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "short": "Publication title",
                    "type": "`$STRING`"
                },
                {
                    "name": "year",
                    "short": "Publication year",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
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
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/literature/search",
                            "segments": [
                                {
                                    "lit": "literature"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "limit",
                                    "offset",
                                    "q",
                                    "year"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "literature",
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "occurrence": {
            "fields": [
                {
                    "name": "country",
                    "short": "Country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "creator",
                    "short": "Username of the download creator",
                    "type": "`$STRING`"
                },
                {
                    "format": "double",
                    "name": "decimalLatitude",
                    "short": "Latitude in decimal degrees",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "decimalLongitude",
                    "short": "Longitude in decimal degrees",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "format",
                    "short": "Download format",
                    "type": "`$STRING`"
                },
                {
                    "name": "key",
                    "short": "Unique GBIF identifier for the occurrence",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "notificationAddresses",
                    "short": "Email addresses for download notification",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "predicate",
                    "short": "Download filter predicate",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "scientificName",
                    "short": "Scientific name of the species",
                    "type": "`$STRING`"
                },
                {
                    "name": "year",
                    "short": "Year of occurrence",
                    "type": "`$INTEGER`"
                }
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
                                    "lit": "occurrence"
                                },
                                {
                                    "lit": "download"
                                },
                                {
                                    "lit": "request"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "occurrence",
                                "download",
                                "request"
                            ]
                        }
                    ]
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "2000",
                                        "kind": "query",
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/occurrence/search",
                            "segments": [
                                {
                                    "lit": "occurrence"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "country",
                                    "limit",
                                    "offset",
                                    "year"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "occurrence",
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "registry": {
            "fields": [
                {
                    "name": "country",
                    "short": "Country code",
                    "type": "`$STRING`"
                },
                {
                    "format": "uuid",
                    "name": "key",
                    "short": "Organization UUID",
                    "type": "`$STRING`"
                },
                {
                    "format": "uuid",
                    "name": "publishingOrganizationKey",
                    "short": "Publishing organization UUID",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "short": "Organization name",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "short": "Dataset type",
                    "type": "`$STRING`"
                }
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/organization/search",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "limit",
                                    "offset",
                                    "q"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "organization",
                                "search"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/dataset/search",
                            "segments": [
                                {
                                    "lit": "dataset"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "offset",
                                    "q",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "dataset",
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "species": {
            "fields": [
                {
                    "name": "canonicalName",
                    "short": "Canonical name",
                    "type": "`$STRING`"
                },
                {
                    "name": "confidence",
                    "short": "Confidence score of the match",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "key",
                    "short": "Unique GBIF species key",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "matchType",
                    "short": "Type of match",
                    "type": "`$STRING`"
                },
                {
                    "name": "rank",
                    "short": "Taxonomic rank",
                    "type": "`$STRING`"
                },
                {
                    "name": "scientificName",
                    "short": "Matched scientific name",
                    "type": "`$STRING`"
                },
                {
                    "name": "usageKey",
                    "short": "GBIF taxon key",
                    "type": "`$INTEGER`"
                }
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
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/species/search",
                            "segments": [
                                {
                                    "lit": "species"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "limit",
                                    "offset",
                                    "q"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "species",
                                "search"
                            ]
                        }
                    ]
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "name",
                                        "orig": "name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/species/match",
                            "segments": [
                                {
                                    "lit": "species"
                                },
                                {
                                    "lit": "match"
                                }
                            ],
                            "select": {
                                "$action": "match",
                                "exist": [
                                    "kingdom",
                                    "name"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "species",
                                "match"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "vocabulary": {
            "fields": [
                {
                    "name": "description",
                    "short": "Vocabulary description",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Vocabulary name",
                    "type": "`$STRING`"
                }
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
                                    "lit": "vocabulary"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "vocabulary"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map