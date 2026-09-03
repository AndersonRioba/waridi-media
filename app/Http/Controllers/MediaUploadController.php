<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaUploadController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:jpeg,png,jpg,webp,mp4,mov', 'max:51200'], // 50MB max
        ]);

        $file = $request->file('file');
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('uploads', $fileName, 'public');

        return response()->json([
            'url' => Storage::disk('public')->url($path),
            'type' => Str::startsWith($file->getMimeType(), 'video') ? 'video' : 'image',
        ]);
    }
}
