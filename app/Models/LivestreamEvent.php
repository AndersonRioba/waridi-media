<?php

namespace App\Models;

use App\Enums\LivestreamStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LivestreamEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'client_name',
        'description',
        'scheduled_at',
        'status',
        'platform',
        'stream_url',
        'cover_image',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
            'status' => LivestreamStatus::class,
        ];
    }

    public function scopeLive(Builder $query): Builder
    {
        return $query->where('status', LivestreamStatus::LIVE->value);
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where('status', LivestreamStatus::UPCOMING->value)
            ->orderBy('scheduled_at', 'asc');
    }
}
