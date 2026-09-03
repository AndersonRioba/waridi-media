<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LivestreamEventRequest;
use App\Models\LivestreamEvent;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LivestreamEventController extends Controller
{
    public function index(): Response
    {
        $events = LivestreamEvent::orderBy('scheduled_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Livestream/Index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Livestream/Create');
    }

    public function store(LivestreamEventRequest $request): RedirectResponse
    {
        LivestreamEvent::create($request->validated());

        return redirect()->route('admin.livestream.index')->with('success', 'Livestream event scheduled.');
    }

    public function edit(LivestreamEvent $event): Response
    {
        return Inertia::render('Admin/Livestream/Edit', [
            'event' => $event,
        ]);
    }

    public function update(LivestreamEventRequest $request, LivestreamEvent $event): RedirectResponse
    {
        $event->update($request->validated());

        return redirect()->route('admin.livestream.index')->with('success', 'Livestream event updated.');
    }

    public function destroy(LivestreamEvent $event): RedirectResponse
    {
        $event->delete();

        return redirect()->route('admin.livestream.index')->with('success', 'Livestream event deleted.');
    }
}
