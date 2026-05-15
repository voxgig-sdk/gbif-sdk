-- Gbif SDK error

local GbifError = {}
GbifError.__index = GbifError


function GbifError.new(code, msg, ctx)
  local self = setmetatable({}, GbifError)
  self.is_sdk_error = true
  self.sdk = "Gbif"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GbifError:error()
  return self.msg
end


function GbifError:__tostring()
  return self.msg
end


return GbifError
