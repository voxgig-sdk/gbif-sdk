# Gbif SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GbifFeatures
  def self.make_feature(name)
    case name
    when "base"
      GbifBaseFeature.new
    when "ratelimit"
      GbifRatelimitFeature.new
    when "retry"
      GbifRetryFeature.new
    when "test"
      GbifTestFeature.new
    when "timeout"
      GbifTimeoutFeature.new
    else
      GbifBaseFeature.new
    end
  end
end
