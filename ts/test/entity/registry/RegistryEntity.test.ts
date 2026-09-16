

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


describe('RegistryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GBIF_TEST_LIVE=TRUE.
  afterEach(liveDelay('GBIF_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GbifSDK.test()
    const ent = testsdk.Registry()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GBIF_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'registry.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"country","req":false,"short":"Country code","type":"`$STRING`","index$":0},{"active":true,"format":"uuid","name":"key","req":false,"short":"Organization UUID","type":"`$STRING`","index$":1},{"active":true,"format":"uuid","name":"publishingOrganizationKey","req":false,"short":"Publishing organization UUID","type":"`$STRING`","index$":2},{"active":true,"name":"title","req":false,"short":"Organization name","type":"`$STRING`","index$":3},{"active":true,"name":"type","req":false,"short":"Dataset type","type":"`$STRING`","index$":4}],"name":"registry","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /organization/search","json":"{\"operationId\":\"searchOrganizations\",\"parameters\":[{\"description\":\"Search query string\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Country code filter\",\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"endOfRecords\":{\"type\":\"boolean\"},\"limit\":{\"type\":\"integer\"},\"offset\":{\"type\":\"integer\"},\"results\":{\"items\":{\"properties\":{\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"key\":{\"description\":\"Organization UUID\",\"format\":\"uuid\",\"type\":\"string\"},\"title\":{\"description\":\"Organization name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with organization search results\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/organization/search","segments":[{"lit":"organization"},{"lit":"search"}],"select":{"exist":["country","limit","offset","q"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /dataset/search","json":"{\"operationId\":\"searchDatasets\",\"parameters\":[{\"description\":\"Search query string\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dataset type filter\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"endOfRecords\":{\"type\":\"boolean\"},\"limit\":{\"type\":\"integer\"},\"offset\":{\"type\":\"integer\"},\"results\":{\"items\":{\"properties\":{\"key\":{\"description\":\"Dataset UUID\",\"format\":\"uuid\",\"type\":\"string\"},\"publishingOrganizationKey\":{\"description\":\"Publishing organization UUID\",\"format\":\"uuid\",\"type\":\"string\"},\"title\":{\"description\":\"Dataset title\",\"type\":\"string\"},\"type\":{\"description\":\"Dataset type\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with dataset search results\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/dataset/search","segments":[{"lit":"dataset"},{"lit":"search"}],"select":{"exist":["limit","offset","q","type"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"registry","name__orig":"registry","Name":"Registry","name_":"registry","name-":"registry","NAME":"REGISTRY","index$":3}, {"active":true,"entity":"registry","key$":"BasicRegistryFlow","kind":"basic","name":"BasicRegistryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"registry_ref01"}}],"index$":0}]}, 'Registry')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let registry_ref01_data = Object.values(setup.data.existing.registry)[0] as any

    // LIST
    const registry_ref01_ent = client.Registry()
    const registry_ref01_match: any = {}

    const registry_ref01_list = (await registry_ref01_ent.list(registry_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/registry/RegistryTestData.json')

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
    ['registry01','registry02','registry03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GBIF_TEST_REGISTRY_ENTID': idmap,
    'GBIF_TEST_LIVE': 'FALSE',
    'GBIF_TEST_EXPLAIN': 'FALSE',
    'GBIF_APIKEY': '',
    'GBIF_SECRET': '',
  })

  idmap = env['GBIF_TEST_REGISTRY_ENTID']

  const live = 'TRUE' === env.GBIF_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GBIF_TEST_REGISTRY_ENTID']
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
  
