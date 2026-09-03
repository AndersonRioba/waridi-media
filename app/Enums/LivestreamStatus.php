<?php

namespace App\Enums;

enum LivestreamStatus: string
{
    case UPCOMING = 'upcoming';
    case LIVE = 'live';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::UPCOMING => 'Upcoming',
            self::LIVE => 'Live Now',
            self::COMPLETED => 'Completed',
            self::CANCELLED => 'Cancelled',
        };
    }
}
