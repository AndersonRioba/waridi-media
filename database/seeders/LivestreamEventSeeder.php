<?php

namespace Database\Seeders;

use App\Enums\LivestreamStatus;
use App\Models\LivestreamEvent;
use Illuminate\Database\Seeder;

class LivestreamEventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => 'Pan-African Climate & Renewable Energy Summit 2026',
                'client_name' => 'Ministry of Energy & Global Green Fund',
                'description' => 'Live multi-camera broadcast featuring keynote addresses from heads of state, panel discussions on geothermal transition, and live delegate Q&A.',
                'scheduled_at' => now()->addDays(3)->setTime(9, 0),
                'status' => LivestreamStatus::UPCOMING->value,
                'platform' => 'youtube',
                'stream_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'cover_image' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'title' => 'Nairobi Fashion Week Gala: Golden Runway Premiere',
                'client_name' => 'Nairobi Fashion Council',
                'description' => 'Experience the haute couture runway live with 4K multi-cam coverage, backstage interviews, and synchronized audio mixing.',
                'scheduled_at' => now()->setTime(18, 30),
                'status' => LivestreamStatus::LIVE->value,
                'platform' => 'youtube',
                'stream_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'cover_image' => 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'title' => 'East Africa Tech Ventures Demo Day 2025',
                'client_name' => 'Savannah Ventures Hub',
                'description' => 'High-stakes founder pitches to global angel investors with live interactive voting and hybrid audience feed.',
                'scheduled_at' => now()->subDays(45)->setTime(14, 0),
                'status' => LivestreamStatus::COMPLETED->value,
                'platform' => 'vimeo',
                'stream_url' => 'https://vimeo.com',
                'cover_image' => 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
            ],
        ];

        foreach ($events as $event) {
            LivestreamEvent::updateOrCreate(
                ['title' => $event['title']],
                $event
            );
        }
    }
}
