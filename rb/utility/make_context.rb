# Gbif SDK utility: make_context
require_relative '../core/context'
module GbifUtilities
  MakeContext = ->(ctxmap, basectx) {
    GbifContext.new(ctxmap, basectx)
  }
end
