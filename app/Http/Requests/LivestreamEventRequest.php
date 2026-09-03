<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LivestreamEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'client_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'scheduled_at' => ['required', 'date'],
            'status' => ['required', 'string', 'in:upcoming,live,completed,cancelled'],
            'platform' => ['required', 'string', 'in:youtube,vimeo,facebook,other'],
            'stream_url' => ['required', 'string', 'url'],
            'cover_image' => ['nullable', 'string'],
        ];
    }
}
