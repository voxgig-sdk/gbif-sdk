

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


describe('LiteratureEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GBIF_TEST_LIVE=TRUE.
  afterEach(liveDelay('GBIF_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GbifSDK.test()
    const ent = testsdk.Literature()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GBIF_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'literature.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"authors","req":false,"short":"List of authors","type":"`$ARRAY`","index$":0},{"active":true,"name":"id","req":false,"short":"Literature identifier","type":"`$STRING`","index$":1},{"active":true,"name":"title","req":false,"short":"Publication title","type":"`$STRING`","index$":2},{"active":true,"name":"year","req":false,"short":"Publication year","type":"`$INTEGER`","index$":3}],"id":{"field":"id","name":"id"},"name":"literature","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"year","orig":"year","reqd":false,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /literature/search","json":"{\"operationId\":\"searchLiterature\",\"parameters\":[{\"description\":\"Search query string\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Publication year\",\"in\":\"query\",\"name\":\"year\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"endOfRecords\":{\"type\":\"boolean\"},\"limit\":{\"type\":\"integer\"},\"offset\":{\"type\":\"integer\"},\"results\":{\"items\":{\"properties\":{\"authors\":{\"description\":\"List of authors\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Literature identifier\",\"type\":\"string\"},\"title\":{\"description\":\"Publication title\",\"type\":\"string\"},\"year\":{\"description\":\"Publication year\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with literature search results\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/literature/search","segments":[{"lit":"literature"},{"lit":"search"}],"select":{"$action":"search","exist":["limit","offset","q","year"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"literature","name__orig":"literature","Name":"Literature","name_":"literature","name-":"literature","NAME":"LITERATURE","index$":1}, {"active":true,"entity":"literature","key$":"BasicLiteratureFlow","kind":"basic","name":"BasicLiteratureFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"literature_ref01"}}],"index$":0}]}, 'Literature')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let literature_ref01_data = Object.values(setup.data.existing.literature)[0] as any

    // LIST
    const literature_ref01_ent = client.Literature()
    const literature_ref01_match: any = {}

    const literature_ref01_list = (await literature_ref01_ent.list(literature_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/literature/LiteratureTestData.json')

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
    ['literature01','literature02','literature03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GBIF_TEST_LITERATURE_ENTID': idmap,
    'GBIF_TEST_LIVE': 'FALSE',
    'GBIF_TEST_EXPLAIN': 'FALSE',
    'GBIF_APIKEY': '',
    'GBIF_SECRET': '',
  })

  idmap = env['GBIF_TEST_LITERATURE_ENTID']

  const live = 'TRUE' === env.GBIF_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GBIF_TEST_LITERATURE_ENTID']
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
  
