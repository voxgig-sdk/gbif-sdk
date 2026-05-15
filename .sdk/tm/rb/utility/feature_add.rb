# Gbif SDK utility: feature_add
module GbifUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
