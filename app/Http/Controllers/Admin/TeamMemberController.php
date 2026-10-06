<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeamMemberRequest;
use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        $team = TeamMember::orderBy('sort_order', 'asc')->get();

        return Inertia::render('Admin/Team/Index', [
            'team' => $team,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Team/Create');
    }

    public function store(TeamMemberRequest $request): RedirectResponse
    {
        TeamMember::create($request->validated());

        return redirect()->route('admin.team.index')->with('success', 'Team member added successfully.');
    }

    // Route::resource('team') generates {team} — parameter name must match
    public function edit(TeamMember $team): Response
    {
        return Inertia::render('Admin/Team/Edit', [
            'member' => $team,
        ]);
    }

    public function update(TeamMemberRequest $request, TeamMember $team): RedirectResponse
    {
        $team->update($request->validated());

        return redirect()->route('admin.team.index')->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $team): RedirectResponse
    {
        $team->delete();

        return redirect()->route('admin.team.index')->with('success', 'Team member removed.');
    }
}
