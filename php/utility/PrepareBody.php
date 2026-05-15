<?php
declare(strict_types=1);

// Gbif SDK utility: prepare_body

class GbifPrepareBody
{
    public static function call(GbifContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
