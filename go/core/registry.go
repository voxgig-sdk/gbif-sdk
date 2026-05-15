package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEnumerationEntityFunc func(client *GbifSDK, entopts map[string]any) GbifEntity

var NewLiteratureEntityFunc func(client *GbifSDK, entopts map[string]any) GbifEntity

var NewOccurrenceEntityFunc func(client *GbifSDK, entopts map[string]any) GbifEntity

var NewRegistryEntityFunc func(client *GbifSDK, entopts map[string]any) GbifEntity

var NewSpeciesEntityFunc func(client *GbifSDK, entopts map[string]any) GbifEntity

var NewVocabularyEntityFunc func(client *GbifSDK, entopts map[string]any) GbifEntity

