<?php

namespace App\Models;

use App\Enums\ServiceGroup;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'service_group',
        'icon',
        'description',
        'deliverables',
        'starting_price',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'service_group' => ServiceGroup::class,
            'deliverables' => 'array',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->orderBy('sort_order', 'asc');
    }

    public function scopeByGroup(Builder $query, ServiceGroup|string $group): Builder
    {
        $val = $group instanceof ServiceGroup ? $group->value : $group;
        return $query->where('service_group', $val);
    }
}
