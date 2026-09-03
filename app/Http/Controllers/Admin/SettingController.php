<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingUpdateRequest;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(): Response
    {
        $settings = Setting::getAll();

        return Inertia::render('Admin/Settings/Edit', [
            'settings' => $settings,
        ]);
    }

    public function update(SettingUpdateRequest $request): RedirectResponse
    {
        $data = $request->validated()['settings'];

        foreach ($data as $key => $val) {
            Setting::set($key, $val);
        }

        return back()->with('success', 'Studio settings updated successfully.');
    }
}
