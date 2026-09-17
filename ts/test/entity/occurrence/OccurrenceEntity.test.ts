

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


describe('OccurrenceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GBIF_TEST_LIVE=TRUE.
  afterEach(liveDelay('GBIF_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GbifSDK.test()
    const ent = testsdk.Occurrence()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GBIF_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'occurrence.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"creator","req":false,"short":"Username of the download creator","type":"`$STRING`","index$":0},{"active":true,"name":"format","req":false,"short":"Download format","type":"`$STRING`","index$":1},{"active":true,"name":"notificationAddresses","req":false,"short":"Email addresses for download notification","type":"`$ARRAY`","index$":2},{"active":true,"name":"predicate","req":false,"short":"Download filter predicate","type":"`$OBJECT`","index$":3}],"name":"occurrence","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /occurrence/download/request","json":"{\"operationId\":\"requestOccurrenceDownload\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"creator\":{\"description\":\"Username of the download creator\",\"type\":\"string\"},\"format\":{\"description\":\"Download format\",\"enum\":[\"DWCA\",\"SIMPLE_CSV\",\"SPECIES_LIST\"],\"type\":\"string\"},\"notificationAddresses\":{\"description\":\"Email addresses for download notification\",\"items\":{\"format\":\"email\",\"type\":\"string\"},\"type\":\"array\"},\"predicate\":{\"description\":\"Download filter predicate\",\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Download request filter in JSON format\",\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Download key/identifier\",\"type\":\"string\"}}},\"description\":\"Download request created successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Authentication required\"}},\"security\":[{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/occurrence/download/request","segments":[{"lit":"occurrence"},{"lit":"download"},{"lit":"request"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"GB","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":"2000","kind":"query","name":"year","orig":"year","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /occurrence/search","json":"{\"operationId\":\"searchOccurrences\",\"parameters\":[{\"description\":\"The 2-letter country code (ISO 3166-1 alpha-2). Repeatable for multiple countries.\",\"example\":\"GB\",\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}},{\"description\":\"Year or year range (e.g., '2000' or '1800,1899' for range)\",\"example\":\"2000\",\"in\":\"query\",\"name\":\"year\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of results to return per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":300,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Offset for pagination (number of records to skip)\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Total number of results matching the query\",\"type\":\"integer\"},\"endOfRecords\":{\"description\":\"Indicates if this is the last page\",\"type\":\"boolean\"},\"limit\":{\"description\":\"Current page size limit\",\"type\":\"integer\"},\"offset\":{\"description\":\"Current offset\",\"type\":\"integer\"},\"results\":{\"description\":\"Array of occurrence records\",\"items\":{\"properties\":{\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"decimalLatitude\":{\"description\":\"Latitude in decimal degrees\",\"format\":\"double\",\"type\":\"number\"},\"decimalLongitude\":{\"description\":\"Longitude in decimal degrees\",\"format\":\"double\",\"type\":\"number\"},\"key\":{\"description\":\"Unique GBIF identifier for the occurrence\",\"type\":\"integer\"},\"scientificName\":{\"description\":\"Scientific name of the species\",\"type\":\"string\"},\"year\":{\"description\":\"Year of occurrence\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with occurrence search results\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded. Reduce query rate or use download API for large queries.\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/occurrence/search","segments":[{"lit":"occurrence"},{"lit":"search"}],"select":{"$action":"search","exist":["country","limit","offset","year"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"occurrence","name__orig":"occurrence","Name":"Occurrence","name_":"occurrence","name-":"occurrence","NAME":"OCCURRENCE","index$":2}, {"active":true,"entity":"occurrence","key$":"BasicOccurrenceFlow","kind":"basic","name":"BasicOccurrenceFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"occurrence_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"occurrence_ref01"}}],"index$":1}]}, 'Occurrence')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const occurrence_ref01_ent = client.Occurrence()
    let occurrence_ref01_data = setup.data.new.occurrence['occurrence_ref01']

    occurrence_ref01_data = (await occurrence_ref01_ent.create(occurrence_ref01_data)).data()
    assert(null != occurrence_ref01_data)


    // LIST
    const occurrence_ref01_match: any = {}

    const occurrence_ref01_list = (await occurrence_ref01_ent.list(occurrence_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/occurrence/OccurrenceTestData.json')

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
    ['occurrence01','occurrence02','occurrence03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GBIF_TEST_OCCURRENCE_ENTID': idmap,
    'GBIF_TEST_LIVE': 'FALSE',
    'GBIF_TEST_EXPLAIN': 'FALSE',
    'GBIF_APIKEY': '',
    'GBIF_SECRET': '',
  })

  idmap = env['GBIF_TEST_OCCURRENCE_ENTID']

  const live = 'TRUE' === env.GBIF_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GBIF_TEST_OCCURRENCE_ENTID']
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
  
