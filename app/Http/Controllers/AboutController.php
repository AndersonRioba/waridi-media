<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __invoke(): Response
    {
        $team = TeamMember::active()->get();
        $settings = Setting::getAll();

        return Inertia::render('Public/About', [
            'team' => $team,
            'settings' => $settings,
        ]);
    }
}
