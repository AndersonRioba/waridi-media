<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'role_title' => ['required', 'string', 'max:255'],
            'photo' => ['nullable', 'string'],
            'bio' => ['nullable', 'string'],
            'social_links' => ['nullable', 'array'],
            'sort_order' => ['integer'],
            'is_active' => ['boolean'],
        ];
    }
}
