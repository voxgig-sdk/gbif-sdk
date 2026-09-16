"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OccurrenceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GBIF_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GBIF_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GbifSDK.test();
        const ent = testsdk.Occurrence();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GBIF_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'occurrence.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "country", "req": false, "short": "Country code", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "creator", "req": false, "short": "Username of the download creator", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "double", "name": "decimalLatitude", "req": false, "short": "Latitude in decimal degrees", "type": "`$NUMBER`", "index$": 2 }, { "active": true, "format": "double", "name": "decimalLongitude", "req": false, "short": "Longitude in decimal degrees", "type": "`$NUMBER`", "index$": 3 }, { "active": true, "name": "format", "req": false, "short": "Download format", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "key", "req": false, "short": "Unique GBIF identifier for the occurrence", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "notificationAddresses", "req": false, "short": "Email addresses for download notification", "type": "`$ARRAY`", "index$": 6 }, { "active": true, "name": "predicate", "req": false, "short": "Download filter predicate", "type": "`$OBJECT`", "index$": 7 }, { "active": true, "name": "scientificName", "req": false, "short": "Scientific name of the species", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "year", "req": false, "short": "Year of occurrence", "type": "`$INTEGER`", "index$": 9 }], "name": "occurrence", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /occurrence/download/request", "json": "{\"operationId\":\"requestOccurrenceDownload\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"creator\":{\"description\":\"Username of the download creator\",\"type\":\"string\"},\"format\":{\"description\":\"Download format\",\"enum\":[\"DWCA\",\"SIMPLE_CSV\",\"SPECIES_LIST\"],\"type\":\"string\"},\"notificationAddresses\":{\"description\":\"Email addresses for download notification\",\"items\":{\"format\":\"email\",\"type\":\"string\"},\"type\":\"array\"},\"predicate\":{\"description\":\"Download filter predicate\",\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Download request filter in JSON format\",\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Download key/identifier\",\"type\":\"string\"}}},\"description\":\"Download request created successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Authentication required\"}},\"security\":[{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/occurrence/download/request", "segments": [{ "lit": "occurrence" }, { "lit": "download" }, { "lit": "request" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "GB", "kind": "query", "name": "country", "orig": "country", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": "2000", "kind": "query", "name": "year", "orig": "year", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /occurrence/search", "json": "{\"operationId\":\"searchOccurrences\",\"parameters\":[{\"description\":\"The 2-letter country code (ISO 3166-1 alpha-2). Repeatable for multiple countries.\",\"example\":\"GB\",\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}},{\"description\":\"Year or year range (e.g., '2000' or '1800,1899' for range)\",\"example\":\"2000\",\"in\":\"query\",\"name\":\"year\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of results to return per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":300,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Offset for pagination (number of records to skip)\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Total number of results matching the query\",\"type\":\"integer\"},\"endOfRecords\":{\"description\":\"Indicates if this is the last page\",\"type\":\"boolean\"},\"limit\":{\"description\":\"Current page size limit\",\"type\":\"integer\"},\"offset\":{\"description\":\"Current offset\",\"type\":\"integer\"},\"results\":{\"description\":\"Array of occurrence records\",\"items\":{\"properties\":{\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"decimalLatitude\":{\"description\":\"Latitude in decimal degrees\",\"format\":\"double\",\"type\":\"number\"},\"decimalLongitude\":{\"description\":\"Longitude in decimal degrees\",\"format\":\"double\",\"type\":\"number\"},\"key\":{\"description\":\"Unique GBIF identifier for the occurrence\",\"type\":\"integer\"},\"scientificName\":{\"description\":\"Scientific name of the species\",\"type\":\"string\"},\"year\":{\"description\":\"Year of occurrence\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with occurrence search results\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded. Reduce query rate or use download API for large queries.\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/occurrence/search", "segments": [{ "lit": "occurrence" }, { "lit": "search" }], "select": { "$action": "search", "exist": ["country", "limit", "offset", "year"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "occurrence", "name__orig": "occurrence", "Name": "Occurrence", "name_": "occurrence", "name-": "occurrence", "NAME": "OCCURRENCE", "index$": 2 }, { "active": true, "entity": "occurrence", "key$": "BasicOccurrenceFlow", "kind": "basic", "name": "BasicOccurrenceFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "occurrence_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "occurrence_ref01" } }], "index$": 1 }] }, 'Occurrence');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const occurrence_ref01_ent = client.Occurrence();
        let occurrence_ref01_data = setup.data.new.occurrence['occurrence_ref01'];
        occurrence_ref01_data = (await occurrence_ref01_ent.create(occurrence_ref01_data)).data();
        (0, node_assert_1.default)(null != occurrence_ref01_data);
        // LIST
        const occurrence_ref01_match = {};
        const occurrence_ref01_list = (await occurrence_ref01_ent.list(occurrence_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/occurrence/OccurrenceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GbifSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['occurrence01', 'occurrence02', 'occurrence03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GBIF_TEST_OCCURRENCE_ENTID': idmap,
        'GBIF_TEST_LIVE': 'FALSE',
        'GBIF_TEST_EXPLAIN': 'FALSE',
        'GBIF_APIKEY': '',
        'GBIF_SECRET': '',
    });
    idmap = env['GBIF_TEST_OCCURRENCE_ENTID'];
    const live = 'TRUE' === env.GBIF_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GBIF_TEST_OCCURRENCE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GbifSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=OccurrenceEntity.test.js.map