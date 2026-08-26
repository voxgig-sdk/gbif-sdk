<?php
declare(strict_types=1);

// Gbif SDK configuration

class GbifConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Gbif",
                "slug" => "gbif",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.gbif.org/v1",
                "auth" => [
                    "prefix" => "Basic",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "enumeration" => [],
                    "literature" => [],
                    "occurrence" => [],
                    "registry" => [],
                    "species" => [],
                    "vocabulary" => [],
                ],
            ],
            "entity" => [
        'enumeration' => [
          'fields' => [
            [
              'name' => 'iso2',
              'short' => 'ISO 3166-1 alpha-2 country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'License name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Country or area name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'License URL',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'enumeration',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/enumeration/basic',
                  'parts' => [
                    'enumeration',
                    'basic',
                  ],
                  'select' => [
                    '$action' => 'basic',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/enumeration/country',
                  'parts' => [
                    'enumeration',
                    'country',
                  ],
                  'select' => [
                    '$action' => 'country',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/enumeration/license',
                  'parts' => [
                    'enumeration',
                    'license',
                  ],
                  'select' => [
                    '$action' => 'license',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'enumeration',
                        'orig' => 'enumeration',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/enumeration/basic/{enumeration}',
                  'parts' => [
                    'enumeration',
                    'basic',
                    '{enumeration}',
                  ],
                  'select' => [
                    'exist' => [
                      'enumeration',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'basic',
              ],
            ],
          ],
        ],
        'literature' => [
          'fields' => [
            [
              'name' => 'authors',
              'short' => 'List of authors',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'short' => 'Literature identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Publication title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'year',
              'short' => 'Publication year',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'literature',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/literature/search',
                  'parts' => [
                    'literature',
                    'search',
                  ],
                  'select' => [
                    '$action' => 'search',
                    'exist' => [
                      'limit',
                      'offset',
                      'q',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'occurrence' => [
          'fields' => [
            [
              'name' => 'country',
              'short' => 'Country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'creator',
              'short' => 'Username of the download creator',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'decimalLatitude',
              'short' => 'Latitude in decimal degrees',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'decimalLongitude',
              'short' => 'Longitude in decimal degrees',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'format',
              'short' => 'Download format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'short' => 'Unique GBIF identifier for the occurrence',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'notificationAddresses',
              'short' => 'Email addresses for download notification',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'predicate',
              'short' => 'Download filter predicate',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'scientificName',
              'short' => 'Scientific name of the species',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'year',
              'short' => 'Year of occurrence',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'occurrence',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/occurrence/download/request',
                  'parts' => [
                    'occurrence',
                    'download',
                    'request',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'GB',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => '2000',
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/occurrence/search',
                  'parts' => [
                    'occurrence',
                    'search',
                  ],
                  'select' => [
                    '$action' => 'search',
                    'exist' => [
                      'country',
                      'limit',
                      'offset',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'registry' => [
          'fields' => [
            [
              'name' => 'country',
              'short' => 'Country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'short' => 'Organization UUID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'publishingOrganizationKey',
              'short' => 'Publishing organization UUID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Organization name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Dataset type',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'registry',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/organization/search',
                  'parts' => [
                    'organization',
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'limit',
                      'offset',
                      'q',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/dataset/search',
                  'parts' => [
                    'dataset',
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                      'q',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'species' => [
          'fields' => [
            [
              'name' => 'canonicalName',
              'short' => 'Canonical name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'confidence',
              'short' => 'Confidence score of the match',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'key',
              'short' => 'Unique GBIF species key',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'matchType',
              'short' => 'Type of match',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rank',
              'short' => 'Taxonomic rank',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'scientificName',
              'short' => 'Matched scientific name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'usageKey',
              'short' => 'GBIF taxon key',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'species',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/species/search',
                  'parts' => [
                    'species',
                    'search',
                  ],
                  'select' => [
                    '$action' => 'search',
                    'exist' => [
                      'limit',
                      'offset',
                      'q',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'kingdom',
                        'orig' => 'kingdom',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'name',
                        'orig' => 'name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/species/match',
                  'parts' => [
                    'species',
                    'match',
                  ],
                  'select' => [
                    '$action' => 'match',
                    'exist' => [
                      'kingdom',
                      'name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'vocabulary' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Vocabulary description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Vocabulary name',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'vocabulary',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/vocabulary',
                  'parts' => [
                    'vocabulary',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GbifFeatures::make_feature($name);
    }
}
