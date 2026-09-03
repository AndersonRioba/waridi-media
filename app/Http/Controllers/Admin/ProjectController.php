<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\ProjectMedia;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $category = $request->query('category');
        $status = $request->query('status');
        $search = $request->query('search');

        $query = Project::with('tags')->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc');

        if ($category) {
            $query->where('category', $category);
        }

        if ($status) {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('client', 'like', "%{$search}%");
            });
        }

        $projects = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'filters' => [
                'category' => $category,
                'status' => $status,
                'search' => $search,
            ],
        ]);
    }

    public function create(): Response
    {
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Admin/Projects/Create', [
            'tags' => $tags,
        ]);
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = !empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($data['title']);

        $tagIds = $data['tag_ids'] ?? [];
        $mediaItems = $data['media'] ?? [];
        unset($data['tag_ids'], $data['media']);

        $project = Project::create($data);

        if (!empty($tagIds)) {
            $project->tags()->sync($tagIds);
        }

        if (!empty($mediaItems)) {
            foreach ($mediaItems as $i => $item) {
                ProjectMedia::create([
                    'project_id' => $project->id,
                    'type' => $item['type'],
                    'path_or_url' => $item['path_or_url'],
                    'caption' => $item['caption'] ?? null,
                    'sort_order' => $i + 1,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        $project->load(['tags', 'media']);
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
            'tags' => $tags,
        ]);
    }

    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = !empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($data['title']);

        $tagIds = $data['tag_ids'] ?? [];
        $mediaItems = $data['media'] ?? [];
        unset($data['tag_ids'], $data['media']);

        $project->update($data);

        $project->tags()->sync($tagIds);

        if (isset($request['media'])) {
            ProjectMedia::where('project_id', $project->id)->delete();
            foreach ($mediaItems as $i => $item) {
                ProjectMedia::create([
                    'project_id' => $project->id,
                    'type' => $item['type'],
                    'path_or_url' => $item['path_or_url'],
                    'caption' => $item['caption'] ?? null,
                    'sort_order' => $i + 1,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
