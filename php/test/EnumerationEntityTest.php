<?php
declare(strict_types=1);

// Enumeration entity test

require_once __DIR__ . '/../gbif_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EnumerationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GbifSDK::test(null, null);
        $ent = $testsdk->Enumeration(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = enumeration_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "enumeration." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GBIF_TEST_ENUMERATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $enumeration_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.enumeration")));
        $enumeration_ref01_data = null;
        if (count($enumeration_ref01_data_raw) > 0) {
            $enumeration_ref01_data = Helpers::to_map($enumeration_ref01_data_raw[0][1]);
        }

        // LIST
        $enumeration_ref01_ent = $client->Enumeration(null);
        $enumeration_ref01_match = [];

        $enumeration_ref01_list_result = $enumeration_ref01_ent->list($enumeration_ref01_match, null);
        $this->assertIsArray($enumeration_ref01_list_result);

        // LOAD
        $enumeration_ref01_match_dt0 = [];
        $enumeration_ref01_data_dt0_loaded = $enumeration_ref01_ent->load($enumeration_ref01_match_dt0, null);
        $this->assertNotNull($enumeration_ref01_data_dt0_loaded);

    }
}

function enumeration_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/enumeration/EnumerationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GbifSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["enumeration01", "enumeration02", "enumeration03", "basic01", "basic02", "basic03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GBIF_TEST_ENUMERATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GBIF_TEST_ENUMERATION_ENTID" => $idmap,
        "GBIF_TEST_LIVE" => "FALSE",
        "GBIF_TEST_EXPLAIN" => "FALSE",
        "GBIF_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GBIF_TEST_ENUMERATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GBIF_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["GBIF_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new GbifSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["GBIF_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GBIF_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
