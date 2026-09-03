<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_name' => ['required', 'string', 'max:255'],
            'client_role' => ['nullable', 'string', 'max:255'],
            'quote' => ['required', 'string'],
            'photo' => ['nullable', 'string'],
            'project_id' => ['nullable', 'exists:projects,id'],
            'sort_order' => ['integer'],
            'is_active' => ['boolean'],
        ];
    }
}
