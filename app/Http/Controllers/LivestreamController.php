<?php

namespace App\Http\Controllers;

use App\Enums\LivestreamStatus;
use App\Models\LivestreamEvent;
use Inertia\Inertia;
use Inertia\Response;

class LivestreamController extends Controller
{
    public function __invoke(): Response
    {
        $liveEvents = LivestreamEvent::live()->get();
        $upcomingEvents = LivestreamEvent::upcoming()->get();
        $pastEvents = LivestreamEvent::where('status', LivestreamStatus::COMPLETED->value)
            ->orderBy('scheduled_at', 'desc')
            ->take(6)
            ->get();

        return Inertia::render('Public/Livestream', [
            'liveEvents' => $liveEvents,
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
        ]);
    }
}
