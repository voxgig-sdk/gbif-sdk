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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
          'fields' => [],
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
                  'segments' => [
                    [
                      'lit' => 'enumeration',
                    ],
                    [
                      'lit' => 'basic',
                    ],
                  ],
                  'select' => [
                    '$action' => 'basic',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'enumeration',
                    'basic',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/enumeration/country',
                  'segments' => [
                    [
                      'lit' => 'enumeration',
                    ],
                    [
                      'lit' => 'country',
                    ],
                  ],
                  'select' => [
                    '$action' => 'country',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'enumeration',
                    'country',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/enumeration/license',
                  'segments' => [
                    [
                      'lit' => 'enumeration',
                    ],
                    [
                      'lit' => 'license',
                    ],
                  ],
                  'select' => [
                    '$action' => 'license',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'enumeration',
                    'license',
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
                  'segments' => [
                    [
                      'lit' => 'enumeration',
                    ],
                    [
                      'lit' => 'basic',
                    ],
                    [
                      'var' => 'enumeration',
                    ],
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
                  'parts' => [
                    'enumeration',
                    'basic',
                    '{enumeration}',
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
          'fields' => [],
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
                  'segments' => [
                    [
                      'lit' => 'literature',
                    ],
                    [
                      'lit' => 'search',
                    ],
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
                  'parts' => [
                    'literature',
                    'search',
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
              'name' => 'creator',
              'short' => 'Username of the download creator',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'format',
              'short' => 'Download format',
              'type' => '`$STRING`',
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
                  'segments' => [
                    [
                      'lit' => 'occurrence',
                    ],
                    [
                      'lit' => 'download',
                    ],
                    [
                      'lit' => 'request',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'occurrence',
                    'download',
                    'request',
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
                  'segments' => [
                    [
                      'lit' => 'occurrence',
                    ],
                    [
                      'lit' => 'search',
                    ],
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
                  'parts' => [
                    'occurrence',
                    'search',
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
              'format' => 'uuid',
              'name' => 'key',
              'short' => 'Organization UUID',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uuid',
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
                  'segments' => [
                    [
                      'lit' => 'organization',
                    ],
                    [
                      'lit' => 'search',
                    ],
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
                  'parts' => [
                    'organization',
                    'search',
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
                  'segments' => [
                    [
                      'lit' => 'dataset',
                    ],
                    [
                      'lit' => 'search',
                    ],
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
                  'parts' => [
                    'dataset',
                    'search',
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
          'fields' => [],
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
                  'segments' => [
                    [
                      'lit' => 'species',
                    ],
                    [
                      'lit' => 'search',
                    ],
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
                  'parts' => [
                    'species',
                    'search',
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
                  'segments' => [
                    [
                      'lit' => 'species',
                    ],
                    [
                      'lit' => 'match',
                    ],
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
                  'parts' => [
                    'species',
                    'match',
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
                  'segments' => [
                    [
                      'lit' => 'vocabulary',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'vocabulary',
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
