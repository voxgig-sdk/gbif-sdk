<?php
declare(strict_types=1);

// Gbif SDK utility: result_headers

class GbifResultHeaders
{
    public static function call(GbifContext $ctx): ?GbifResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
