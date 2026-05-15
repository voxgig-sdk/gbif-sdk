<?php
declare(strict_types=1);

// Gbif SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GbifFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GbifBaseFeature();
            case "test":
                return new GbifTestFeature();
            default:
                return new GbifBaseFeature();
        }
    }
}
