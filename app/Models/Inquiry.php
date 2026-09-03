<?php

namespace App\Models;

use App\Enums\InquiryStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'service_group_interest',
        'service_interest',
        'event_date',
        'message',
        'status',
        'internal_notes',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'status' => InquiryStatus::class,
        ];
    }

    public function scopeNew(Builder $query): Builder
    {
        return $query->where('status', InquiryStatus::NEW->value);
    }
}
