<?php

namespace App\Enums;

enum InquiryStatus: string
{
    case NEW = 'new';
    case CONTACTED = 'contacted';
    case BOOKED = 'booked';
    case CLOSED = 'closed';

    public function label(): string
    {
        return match ($this) {
            self::NEW => 'New',
            self::CONTACTED => 'Contacted',
            self::BOOKED => 'Booked',
            self::CLOSED => 'Closed',
        };
    }
}
