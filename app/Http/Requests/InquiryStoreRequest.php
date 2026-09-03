<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InquiryStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'service_group_interest' => ['required', 'string', 'in:photography,media_production,print_creative,other'],
            'service_interest' => ['nullable', 'string', 'max:255'],
            'event_date' => ['nullable', 'date'],
            'message' => ['required', 'string', 'max:5000'],
        ];
    }
}
