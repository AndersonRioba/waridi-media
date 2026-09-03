<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Inquiry;
use App\Models\LivestreamEvent;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $stats = [
            'total_projects' => Project::count(),
            'published_projects' => Project::published()->count(),
            'new_inquiries' => Inquiry::new()->count(),
            'total_inquiries' => Inquiry::count(),
            'upcoming_streams' => LivestreamEvent::upcoming()->count(),
            'total_posts' => BlogPost::count(),
        ];

        $recentInquiries = Inquiry::orderBy('created_at', 'desc')->take(6)->get();
        $recentProjects = Project::orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentInquiries' => $recentInquiries,
            'recentProjects' => $recentProjects,
        ]);
    }
}
