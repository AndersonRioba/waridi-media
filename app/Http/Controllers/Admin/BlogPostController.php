<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogPostRequest;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status');
        $query = BlogPost::with(['author', 'category'])->orderBy('created_at', 'desc');

        if ($status) {
            $query->where('status', $status);
        }

        $posts = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Blog/Index', [
            'posts' => $posts,
            'selectedStatus' => $status,
        ]);
    }

    public function create(): Response
    {
        $categories = BlogCategory::orderBy('name')->get();
        $authors = TeamMember::active()->get();

        return Inertia::render('Admin/Blog/Create', [
            'categories' => $categories,
            'authors' => $authors,
        ]);
    }

    public function store(BlogPostRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = !empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($data['title']);

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        BlogPost::create($data);

        return redirect()->route('admin.blog.index')->with('success', 'Article created successfully.');
    }

    public function edit(BlogPost $post): Response
    {
        $categories = BlogCategory::orderBy('name')->get();
        $authors = TeamMember::active()->get();

        return Inertia::render('Admin/Blog/Edit', [
            'post' => $post,
            'categories' => $categories,
            'authors' => $authors,
        ]);
    }

    public function update(BlogPostRequest $request, BlogPost $post): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = !empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($data['title']);

        if ($data['status'] === 'published' && empty($post->published_at) && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post->update($data);

        return redirect()->route('admin.blog.index')->with('success', 'Article updated.');
    }

    public function destroy(BlogPost $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Article removed.');
    }
}
