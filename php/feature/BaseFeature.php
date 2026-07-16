<?php
declare(strict_types=1);

// Gbif SDK base feature

class GbifBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GbifContext $ctx, array $options): void {}
    public function PostConstruct(GbifContext $ctx): void {}
    public function PostConstructEntity(GbifContext $ctx): void {}
    public function SetData(GbifContext $ctx): void {}
    public function GetData(GbifContext $ctx): void {}
    public function GetMatch(GbifContext $ctx): void {}
    public function SetMatch(GbifContext $ctx): void {}
    public function PrePoint(GbifContext $ctx): void {}
    public function PreSpec(GbifContext $ctx): void {}
    public function PreRequest(GbifContext $ctx): void {}
    public function PreResponse(GbifContext $ctx): void {}
    public function PreResult(GbifContext $ctx): void {}
    public function PreDone(GbifContext $ctx): void {}
    public function PreUnexpected(GbifContext $ctx): void {}
}
