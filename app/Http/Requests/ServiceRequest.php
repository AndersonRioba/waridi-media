<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $serviceId = $this->route('service')?->id ?? $this->route('service');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:services,slug,' . $serviceId],
            'service_group' => ['required', 'string', 'in:photography,media_production,print_creative'],
            'icon' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string'],
            'deliverables' => ['nullable', 'array'],
            'deliverables.*' => ['string'],
            'starting_price' => ['nullable', 'string', 'max:50'],
            'sort_order' => ['integer'],
            'is_active' => ['boolean'],
        ];
    }
}
