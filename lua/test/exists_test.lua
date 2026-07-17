-- Gbif SDK exists test

local sdk = require("gbif_sdk")

describe("GbifSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
