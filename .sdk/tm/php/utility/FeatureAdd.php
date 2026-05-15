<?php
declare(strict_types=1);

// Gbif SDK utility: feature_add

class GbifFeatureAdd
{
    public static function call(GbifContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
