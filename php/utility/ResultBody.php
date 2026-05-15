<?php
declare(strict_types=1);

// Gbif SDK utility: result_body

class GbifResultBody
{
    public static function call(GbifContext $ctx): ?GbifResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
