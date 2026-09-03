<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $selectedCategory = $request->query('category');

        $query = BlogPost::with(['author', 'category'])->published();

        if ($selectedCategory) {
            $query->whereHas('category', function ($q) use ($selectedCategory) {
                $q->where('slug', $selectedCategory);
            });
        }

        $posts = $query->paginate(9)->withQueryString();
        $categories = BlogCategory::withCount('posts')->get();

        return Inertia::render('Public/Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'selectedCategory' => $selectedCategory,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::with(['author', 'category'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $recentPosts = BlogPost::with('author')
            ->published()
            ->where('id', '!=', $post->id)
            ->take(3)
            ->get();

        return Inertia::render('Public/Blog/Show', [
            'post' => $post,
            'recentPosts' => $recentPosts,
        ]);
    }
}
