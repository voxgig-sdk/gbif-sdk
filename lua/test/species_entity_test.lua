-- Species entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("gbif_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("SpeciesEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Species(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = species_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "species." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set GBIF_TEST_SPECIES_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local species_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.species")))
    local species_ref01_data = nil
    if #species_ref01_data_raw > 0 then
      species_ref01_data = helpers.to_map(species_ref01_data_raw[1][2])
    end

    -- LIST
    local species_ref01_ent = client:Species(nil)
    local species_ref01_match = {}

    local species_ref01_list_result, err = species_ref01_ent:list(species_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(species_ref01_list_result)

    -- LOAD
    local species_ref01_match_dt0 = {}
    local species_ref01_data_dt0_loaded, err = species_ref01_ent:load(species_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(species_ref01_data_dt0_loaded)

  end)
end)

function species_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/species/SpeciesTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read species test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "species01", "species02", "species03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("GBIF_TEST_SPECIES_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GBIF_TEST_SPECIES_ENTID"] = idmap,
    ["GBIF_TEST_LIVE"] = "FALSE",
    ["GBIF_TEST_EXPLAIN"] = "FALSE",
    ["GBIF_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["GBIF_TEST_SPECIES_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["GBIF_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["GBIF_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["GBIF_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["GBIF_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
