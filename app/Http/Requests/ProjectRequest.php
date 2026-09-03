<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $projectId = $this->route('project')?->id ?? $this->route('project');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:projects,slug,' . $projectId],
            'category' => ['required', 'string', 'in:photography,media_production,print_creative'],
            'client' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'project_date' => ['nullable', 'date'],
            'cover_image' => ['required', 'string'],
            'video_url' => ['nullable', 'string', 'url'],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'body' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'status' => ['required', 'string', 'in:draft,published'],
            'sort_order' => ['integer'],
            'tag_ids' => ['nullable', 'array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
            'media' => ['nullable', 'array'],
            'media.*.type' => ['required', 'string', 'in:image,video'],
            'media.*.path_or_url' => ['required', 'string'],
            'media.*.caption' => ['nullable', 'string', 'max:255'],
            'media.*.sort_order' => ['nullable', 'integer'],
        ];
    }
}
