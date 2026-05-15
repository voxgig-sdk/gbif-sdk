<?php
declare(strict_types=1);

// Gbif SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GbifMakeContext
{
    public static function call(array $ctxmap, ?GbifContext $basectx): GbifContext
    {
        return new GbifContext($ctxmap, $basectx);
    }
}
