<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'type',
        'path_or_url',
        'caption',
        'featured_in_gallery',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'featured_in_gallery' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopeFeaturedInGallery($query)
    {
        return $query->where('featured_in_gallery', true);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
