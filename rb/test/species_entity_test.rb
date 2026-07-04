# Species entity test

require "minitest/autorun"
require "json"
require_relative "../Gbif_sdk"
require_relative "runner"

class SpeciesEntityTest < Minitest::Test
  def test_create_instance
    testsdk = GbifSDK.test(nil, nil)
    ent = testsdk.Species(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = species_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "species." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set GBIF_TEST_SPECIES_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    species_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.species")))
    species_ref01_data = nil
    if species_ref01_data_raw.length > 0
      species_ref01_data = Helpers.to_map(species_ref01_data_raw[0][1])
    end

    # LIST
    species_ref01_ent = client.Species(nil)
    species_ref01_match = {}

    species_ref01_list_result = species_ref01_ent.list(species_ref01_match, nil)
    assert species_ref01_list_result.is_a?(Array)

    # LOAD
    species_ref01_match_dt0 = {}
    species_ref01_data_dt0_loaded = species_ref01_ent.load(species_ref01_match_dt0, nil)
    assert !species_ref01_data_dt0_loaded.nil?

  end
end

def species_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "species", "SpeciesTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GbifSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["species01", "species02", "species03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["GBIF_TEST_SPECIES_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GBIF_TEST_SPECIES_ENTID" => idmap,
    "GBIF_TEST_LIVE" => "FALSE",
    "GBIF_TEST_EXPLAIN" => "FALSE",
    "GBIF_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["GBIF_TEST_SPECIES_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["GBIF_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["GBIF_APIKEY"],
      },
      extra || {},
    ])
    client = GbifSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GBIF_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GBIF_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
