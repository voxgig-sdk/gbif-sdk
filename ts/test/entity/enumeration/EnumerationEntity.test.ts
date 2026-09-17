

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GbifSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('EnumerationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GBIF_TEST_LIVE=TRUE.
  afterEach(liveDelay('GBIF_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GbifSDK.test()
    const ent = testsdk.Enumeration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GBIF_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'enumeration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"enumeration","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /enumeration/basic","json":"{\"operationId\":\"listEnumerations\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"List of available enumerations\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/enumeration/basic","segments":[{"lit":"enumeration"},{"lit":"basic"}],"select":{"$action":"basic"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /enumeration/country","json":"{\"operationId\":\"listCountries\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"iso2\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"type\":\"string\"},\"title\":{\"description\":\"Country or area name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"List of countries and areas\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/enumeration/country","segments":[{"lit":"enumeration"},{"lit":"country"}],"select":{"$action":"country"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"GET /enumeration/license","json":"{\"operationId\":\"listLicenses\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"name\":{\"description\":\"License name\",\"type\":\"string\"},\"url\":{\"description\":\"License URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"List of supported licenses\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/enumeration/license","segments":[{"lit":"enumeration"},{"lit":"license"}],"select":{"$action":"license"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"enumeration","orig":"enumeration","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /enumeration/basic/{enumeration}","json":"{\"operationId\":\"getEnumerationValues\",\"parameters\":[{\"description\":\"Name of the enumeration\",\"in\":\"path\",\"name\":\"enumeration\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"List of enumeration values\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Enumeration not found\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/enumeration/basic/{enumeration}","segments":[{"lit":"enumeration"},{"lit":"basic"},{"var":"enumeration"}],"select":{"exist":["enumeration"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["basic"]]},"key$":"enumeration","name__orig":"enumeration","Name":"Enumeration","name_":"enumeration","name-":"enumeration","NAME":"ENUMERATION","index$":0}, {"active":true,"entity":"enumeration","key$":"BasicEnumerationFlow","kind":"basic","name":"BasicEnumerationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"enumeration_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"enumeration_ref01","srcdatavar":"enumeration_ref01_data","suffix":"_dt0"},"match":{"id":"enumeration01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-enumeration_ref01"}}],"index$":1}]}, 'Enumeration')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let enumeration_ref01_data = Object.values(setup.data.existing.enumeration)[0] as any

    // LIST
    const enumeration_ref01_ent = client.Enumeration()
    const enumeration_ref01_match: any = {}

    const enumeration_ref01_list = (await enumeration_ref01_ent.list(enumeration_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/enumeration/EnumerationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GbifSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['enumeration01','enumeration02','enumeration03','basic01','basic02','basic03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GBIF_TEST_ENUMERATION_ENTID': idmap,
    'GBIF_TEST_LIVE': 'FALSE',
    'GBIF_TEST_EXPLAIN': 'FALSE',
    'GBIF_APIKEY': '',
    'GBIF_SECRET': '',
  })

  idmap = env['GBIF_TEST_ENUMERATION_ENTID']

  const live = 'TRUE' === env.GBIF_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GBIF_TEST_ENUMERATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GbifSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.GBIF_APIKEY,
        secret: env.GBIF_SECRET,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GBIF_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
