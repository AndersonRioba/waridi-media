<?php

namespace App\Http\Controllers;

use App\Models\ProjectMedia;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $selectedTag = $request->query('tag');

        $query = ProjectMedia::with(['project.tags'])
            ->where('type', 'image')
            ->whereHas('project', function ($q) {
                $q->published();
            });

        // If tag filter is provided, filter by project tag
        if ($selectedTag) {
            $query->whereHas('project.tags', function ($q) use ($selectedTag) {
                $q->where('slug', $selectedTag);
            });
        }

        // Prioritize items explicitly flagged for gallery
        $items = $query->orderBy('featured_in_gallery', 'desc')
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->paginate(24)
            ->withQueryString();

        $tags = Tag::has('projects')->orderBy('name')->get();

        return Inertia::render('Public/Gallery', [
            'media' => $items,
            'tags' => $tags,
            'filters' => [
                'tag' => $selectedTag,
            ],
        ]);
    }
}
