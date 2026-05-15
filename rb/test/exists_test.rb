# Gbif SDK exists test

require "minitest/autorun"
require_relative "../Gbif_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GbifSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
