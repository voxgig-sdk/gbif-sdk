package voxgiggbifsdk

import (
	"github.com/voxgig-sdk/gbif-sdk/go/core"
	"github.com/voxgig-sdk/gbif-sdk/go/entity"
	"github.com/voxgig-sdk/gbif-sdk/go/feature"
	_ "github.com/voxgig-sdk/gbif-sdk/go/utility"
)

// Type aliases preserve external API.
type GbifSDK = core.GbifSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GbifEntity = core.GbifEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GbifError = core.GbifError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEnumerationEntityFunc = func(client *core.GbifSDK, entopts map[string]any) core.GbifEntity {
		return entity.NewEnumerationEntity(client, entopts)
	}
	core.NewLiteratureEntityFunc = func(client *core.GbifSDK, entopts map[string]any) core.GbifEntity {
		return entity.NewLiteratureEntity(client, entopts)
	}
	core.NewOccurrenceEntityFunc = func(client *core.GbifSDK, entopts map[string]any) core.GbifEntity {
		return entity.NewOccurrenceEntity(client, entopts)
	}
	core.NewRegistryEntityFunc = func(client *core.GbifSDK, entopts map[string]any) core.GbifEntity {
		return entity.NewRegistryEntity(client, entopts)
	}
	core.NewSpeciesEntityFunc = func(client *core.GbifSDK, entopts map[string]any) core.GbifEntity {
		return entity.NewSpeciesEntity(client, entopts)
	}
	core.NewVocabularyEntityFunc = func(client *core.GbifSDK, entopts map[string]any) core.GbifEntity {
		return entity.NewVocabularyEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGbifSDK = core.NewGbifSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewGbifSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *GbifSDK  { return NewGbifSDK(nil) }
func Test() *GbifSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
