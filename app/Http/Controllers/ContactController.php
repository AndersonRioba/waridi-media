<?php

namespace App\Http\Controllers;

use App\Enums\InquiryStatus;
use App\Http\Requests\InquiryStoreRequest;
use App\Models\Inquiry;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function show(): Response
    {
        $services = Service::active()->get(['id', 'title', 'service_group', 'slug']);
        $settings = Setting::getAll();

        return Inertia::render('Public/Contact', [
            'services' => $services,
            'settings' => $settings,
        ]);
    }

    public function store(InquiryStoreRequest $request): RedirectResponse
    {
        Inquiry::create(array_merge($request->validated(), [
            'status' => InquiryStatus::NEW->value,
        ]));

        return back()->with('success', 'Thank you for reaching out to Waridi Photo Studio. Our team will review your inquiry and get back to you shortly.');
    }
}
