# Gbif SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GbifUtility.registrar = ->(u) {
  u.clean = GbifUtilities::Clean
  u.done = GbifUtilities::Done
  u.make_error = GbifUtilities::MakeError
  u.feature_add = GbifUtilities::FeatureAdd
  u.feature_hook = GbifUtilities::FeatureHook
  u.feature_init = GbifUtilities::FeatureInit
  u.fetcher = GbifUtilities::Fetcher
  u.make_fetch_def = GbifUtilities::MakeFetchDef
  u.make_context = GbifUtilities::MakeContext
  u.make_options = GbifUtilities::MakeOptions
  u.make_request = GbifUtilities::MakeRequest
  u.make_response = GbifUtilities::MakeResponse
  u.make_result = GbifUtilities::MakeResult
  u.make_point = GbifUtilities::MakePoint
  u.make_spec = GbifUtilities::MakeSpec
  u.make_url = GbifUtilities::MakeUrl
  u.param = GbifUtilities::Param
  u.prepare_auth = GbifUtilities::PrepareAuth
  u.prepare_body = GbifUtilities::PrepareBody
  u.prepare_headers = GbifUtilities::PrepareHeaders
  u.prepare_method = GbifUtilities::PrepareMethod
  u.prepare_params = GbifUtilities::PrepareParams
  u.prepare_path = GbifUtilities::PreparePath
  u.prepare_query = GbifUtilities::PrepareQuery
  u.result_basic = GbifUtilities::ResultBasic
  u.result_body = GbifUtilities::ResultBody
  u.result_headers = GbifUtilities::ResultHeaders
  u.transform_request = GbifUtilities::TransformRequest
  u.transform_response = GbifUtilities::TransformResponse
}
