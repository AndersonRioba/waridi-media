<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['required', 'string'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'sort_order' => ['integer'],
            'is_active' => ['boolean'],
        ];
    }
}
