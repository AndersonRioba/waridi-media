<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestimonialRequest;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        $testimonials = Testimonial::with('project')->orderBy('sort_order', 'asc')->get();

        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    public function create(): Response
    {
        $projects = Project::orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/Testimonials/Create', [
            'projects' => $projects,
        ]);
    }

    public function store(TestimonialRequest $request): RedirectResponse
    {
        Testimonial::create($request->validated());

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial added.');
    }

    public function edit(Testimonial $testimonial): Response
    {
        $projects = Project::orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial,
            'projects' => $projects,
        ]);
    }

    public function update(TestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update($request->validated());

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted.');
    }
}
