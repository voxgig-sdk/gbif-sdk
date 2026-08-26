package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Gbif",
			"slug": "gbif",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.gbif.org/v1",
			"auth": map[string]any{
				"prefix": "Basic",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"enumeration": map[string]any{},
				"literature": map[string]any{},
				"occurrence": map[string]any{},
				"registry": map[string]any{},
				"species": map[string]any{},
				"vocabulary": map[string]any{},
			},
		},
		"entity": map[string]any{
			"enumeration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "iso2",
						"short": "ISO 3166-1 alpha-2 country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "License name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Country or area name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "License URL",
						"type": "`$STRING`",
					},
				},
				"name": "enumeration",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/enumeration/basic",
								"parts": []any{
									"enumeration",
									"basic",
								},
								"select": map[string]any{
									"$action": "basic",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/enumeration/country",
								"parts": []any{
									"enumeration",
									"country",
								},
								"select": map[string]any{
									"$action": "country",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/enumeration/license",
								"parts": []any{
									"enumeration",
									"license",
								},
								"select": map[string]any{
									"$action": "license",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "enumeration",
											"orig": "enumeration",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/enumeration/basic/{enumeration}",
								"parts": []any{
									"enumeration",
									"basic",
									"{enumeration}",
								},
								"select": map[string]any{
									"exist": []any{
										"enumeration",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"basic",
						},
					},
				},
			},
			"literature": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "authors",
						"short": "List of authors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "Literature identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Publication title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"short": "Publication year",
						"type": "`$INTEGER`",
					},
				},
				"name": "literature",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/literature/search",
								"parts": []any{
									"literature",
									"search",
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"limit",
										"offset",
										"q",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"occurrence": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creator",
						"short": "Username of the download creator",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "decimalLatitude",
						"short": "Latitude in decimal degrees",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "decimalLongitude",
						"short": "Longitude in decimal degrees",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "format",
						"short": "Download format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"short": "Unique GBIF identifier for the occurrence",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "notificationAddresses",
						"short": "Email addresses for download notification",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "predicate",
						"short": "Download filter predicate",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "scientificName",
						"short": "Scientific name of the species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"short": "Year of occurrence",
						"type": "`$INTEGER`",
					},
				},
				"name": "occurrence",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/occurrence/download/request",
								"parts": []any{
									"occurrence",
									"download",
									"request",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "GB",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "2000",
											"kind": "query",
											"name": "year",
											"orig": "year",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/occurrence/search",
								"parts": []any{
									"occurrence",
									"search",
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"country",
										"limit",
										"offset",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"registry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"short": "Organization UUID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "publishingOrganizationKey",
						"short": "Publishing organization UUID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Organization name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Dataset type",
						"type": "`$STRING`",
					},
				},
				"name": "registry",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/organization/search",
								"parts": []any{
									"organization",
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"limit",
										"offset",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/dataset/search",
								"parts": []any{
									"dataset",
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"q",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"species": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "canonicalName",
						"short": "Canonical name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "confidence",
						"short": "Confidence score of the match",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "key",
						"short": "Unique GBIF species key",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "matchType",
						"short": "Type of match",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"short": "Taxonomic rank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scientificName",
						"short": "Matched scientific name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "usageKey",
						"short": "GBIF taxon key",
						"type": "`$INTEGER`",
					},
				},
				"name": "species",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/species/search",
								"parts": []any{
									"species",
									"search",
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"limit",
										"offset",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "kingdom",
											"orig": "kingdom",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/species/match",
								"parts": []any{
									"species",
									"match",
								},
								"select": map[string]any{
									"$action": "match",
									"exist": []any{
										"kingdom",
										"name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vocabulary": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Vocabulary description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Vocabulary name",
						"type": "`$STRING`",
					},
				},
				"name": "vocabulary",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/vocabulary",
								"parts": []any{
									"vocabulary",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
