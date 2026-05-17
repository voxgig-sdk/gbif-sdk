package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/gbif-sdk/go"
	"github.com/voxgig-sdk/gbif-sdk/go/core"

	vs "github.com/voxgig-sdk/gbif-sdk/go/utility/struct"
)

func TestOccurrenceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Occurrence(nil)
		if ent == nil {
			t.Fatal("expected non-nil OccurrenceEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := occurrenceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "occurrence." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GBIF_TEST_OCCURRENCE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		occurrenceRef01Ent := client.Occurrence(nil)
		occurrenceRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "occurrence"}, setup.data), "occurrence_ref01"))

		occurrenceRef01DataResult, err := occurrenceRef01Ent.Create(occurrenceRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		occurrenceRef01Data = core.ToMapAny(occurrenceRef01DataResult)
		if occurrenceRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		occurrenceRef01Match := map[string]any{}

		occurrenceRef01ListResult, err := occurrenceRef01Ent.List(occurrenceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		occurrenceRef01List, occurrenceRef01ListOk := occurrenceRef01ListResult.([]any)
		if !occurrenceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", occurrenceRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(occurrenceRef01List), map[string]any{"id": occurrenceRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func occurrenceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "occurrence", "OccurrenceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read occurrence test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse occurrence test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"occurrence01", "occurrence02", "occurrence03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GBIF_TEST_OCCURRENCE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GBIF_TEST_OCCURRENCE_ENTID": idmap,
		"GBIF_TEST_LIVE":      "FALSE",
		"GBIF_TEST_EXPLAIN":   "FALSE",
		"GBIF_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GBIF_TEST_OCCURRENCE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GBIF_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["GBIF_APIKEY"],
			},
			extra,
		})
		client = sdk.NewGbifSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GBIF_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GBIF_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
