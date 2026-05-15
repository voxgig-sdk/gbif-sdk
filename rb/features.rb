# Gbif SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GbifFeatures
  def self.make_feature(name)
    case name
    when "base"
      GbifBaseFeature.new
    when "test"
      GbifTestFeature.new
    else
      GbifBaseFeature.new
    end
  end
end
