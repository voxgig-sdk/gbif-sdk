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
(0, node_test_1.describe)('EnumerationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GBIF_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GBIF_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GbifSDK.test();
        const ent = testsdk.Enumeration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GBIF_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'enumeration.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "enumeration", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /enumeration/basic", "json": "{\"operationId\":\"listEnumerations\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"List of available enumerations\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/enumeration/basic", "segments": [{ "lit": "enumeration" }, { "lit": "basic" }], "select": { "$action": "basic" }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "GET /enumeration/country", "json": "{\"operationId\":\"listCountries\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"iso2\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"type\":\"string\"},\"title\":{\"description\":\"Country or area name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"List of countries and areas\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/enumeration/country", "segments": [{ "lit": "enumeration" }, { "lit": "country" }], "select": { "$action": "country" }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": {}, "contract": { "id": "GET /enumeration/license", "json": "{\"operationId\":\"listLicenses\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"name\":{\"description\":\"License name\",\"type\":\"string\"},\"url\":{\"description\":\"License URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"List of supported licenses\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/enumeration/license", "segments": [{ "lit": "enumeration" }, { "lit": "license" }], "select": { "$action": "license" }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "enumeration", "orig": "enumeration", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /enumeration/basic/{enumeration}", "json": "{\"operationId\":\"getEnumerationValues\",\"parameters\":[{\"description\":\"Name of the enumeration\",\"in\":\"path\",\"name\":\"enumeration\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"List of enumeration values\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Enumeration not found\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"HTTP Basic Authentication using GBIF user credentials\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/enumeration/basic/{enumeration}", "segments": [{ "lit": "enumeration" }, { "lit": "basic" }, { "var": "enumeration" }], "select": { "exist": ["enumeration"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["basic"]] }, "key$": "enumeration", "name__orig": "enumeration", "Name": "Enumeration", "name_": "enumeration", "name-": "enumeration", "NAME": "ENUMERATION", "index$": 0 }, { "active": true, "entity": "enumeration", "key$": "BasicEnumerationFlow", "kind": "basic", "name": "BasicEnumerationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "enumeration_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "enumeration_ref01", "srcdatavar": "enumeration_ref01_data", "suffix": "_dt0" }, "match": { "id": "enumeration01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-enumeration_ref01" } }], "index$": 1 }] }, 'Enumeration');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let enumeration_ref01_data = Object.values(setup.data.existing.enumeration)[0];
        // LIST
        const enumeration_ref01_ent = client.Enumeration();
        const enumeration_ref01_match = {};
        const enumeration_ref01_list = (await enumeration_ref01_ent.list(enumeration_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/enumeration/EnumerationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GbifSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['enumeration01', 'enumeration02', 'enumeration03', 'basic01', 'basic02', 'basic03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GBIF_TEST_ENUMERATION_ENTID': idmap,
        'GBIF_TEST_LIVE': 'FALSE',
        'GBIF_TEST_EXPLAIN': 'FALSE',
        'GBIF_APIKEY': '',
        'GBIF_SECRET': '',
    });
    idmap = env['GBIF_TEST_ENUMERATION_ENTID'];
    const live = 'TRUE' === env.GBIF_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GBIF_TEST_ENUMERATION_ENTID'];
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
//# sourceMappingURL=EnumerationEntity.test.js.map