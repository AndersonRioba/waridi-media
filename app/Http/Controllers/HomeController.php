<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\LivestreamEvent;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $featuredProjects = Project::with(['tags'])
            ->published()
            ->featured()
            ->take(8)
            ->get();

        // If fewer than 6 featured, backfill with published projects
        if ($featuredProjects->count() < 6) {
            $extra = Project::with(['tags'])
                ->published()
                ->whereNotIn('id', $featuredProjects->pluck('id'))
                ->take(8 - $featuredProjects->count())
                ->get();
            $featuredProjects = $featuredProjects->concat($extra);
        }

        $iconStripServices = Service::active()
            ->whereIn('slug', [
                'studio-portraits',
                'family-photography',
                'maternity-photography',
                'graduation-photography',
                'wedding-photography',
                'product-photography',
                'canvas-prints',
                'drone-services'
            ])
            ->take(8)
            ->get();

        $testimonials = Testimonial::active()->take(5)->get();
        $recentPosts = BlogPost::with('author', 'category')->published()->take(3)->get();
        $activeLive = LivestreamEvent::live()->first();
        $settings = Setting::getAll();

        return Inertia::render('Public/Home', [
            'featuredProjects' => $featuredProjects,
            'iconStripServices' => $iconStripServices,
            'testimonials' => $testimonials,
            'recentPosts' => $recentPosts,
            'activeLive' => $activeLive,
            'settings' => $settings,
        ]);
    }
}
