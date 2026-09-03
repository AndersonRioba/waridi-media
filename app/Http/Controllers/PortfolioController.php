<?php

namespace App\Http\Controllers;

use App\Enums\ProjectCategory;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(Request $request): Response
    {
        $selectedCategory = $request->query('category');
        $selectedTag = $request->query('tag');

        $query = Project::with(['tags', 'media'])->published();

        if ($selectedCategory && in_array($selectedCategory, array_column(ProjectCategory::cases(), 'value'))) {
            $query->where('category', $selectedCategory);
        }

        if ($selectedTag) {
            $query->whereHas('tags', function ($q) use ($selectedTag) {
                $q->where('slug', $selectedTag);
            });
        }

        $projects = $query->paginate(12)->withQueryString();
        $tags = Tag::has('projects')->orderBy('name')->get();

        return Inertia::render('Public/Portfolio/Index', [
            'projects' => $projects,
            'tags' => $tags,
            'filters' => [
                'category' => $selectedCategory,
                'tag' => $selectedTag,
            ],
            'categories' => [
                ['value' => 'photography', 'label' => 'Photography'],
                ['value' => 'media_production', 'label' => 'Media Production'],
                ['value' => 'print_creative', 'label' => 'Print & Creative'],
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::with(['media', 'tags', 'testimonials'])
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedProjects = Inertia::defer(function () use ($project) {
            return Project::with('tags')
                ->published()
                ->where('id', '!=', $project->id)
                ->where('category', $project->category)
                ->take(3)
                ->get();
        });

        return Inertia::render('Public/Portfolio/Show', [
            'project' => $project,
            'relatedProjects' => $relatedProjects,
        ]);
    }
}
