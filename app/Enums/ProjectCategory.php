<?php

namespace App\Enums;

enum ProjectCategory: string
{
    case PHOTOGRAPHY = 'photography';
    case MEDIA_PRODUCTION = 'media_production';
    case PRINT_CREATIVE = 'print_creative';

    public function label(): string
    {
        return match ($this) {
            self::PHOTOGRAPHY => 'Photography',
            self::MEDIA_PRODUCTION => 'Media Production',
            self::PRINT_CREATIVE => 'Print & Creative',
        };
    }
}
