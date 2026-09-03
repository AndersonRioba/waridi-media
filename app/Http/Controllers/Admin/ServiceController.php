<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $group = $request->query('group');
        $query = Service::orderBy('sort_order', 'asc');

        if ($group) {
            $query->where('service_group', $group);
        }

        $services = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
            'selectedGroup' => $group,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(ServiceRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = !empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($data['title']);

        Service::create($data);

        return redirect()->route('admin.services.index')->with('success', 'Service created successfully.');
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => $service,
        ]);
    }

    public function update(ServiceRequest $request, Service $service): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = !empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($data['title']);

        $service->update($data);

        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Service deleted successfully.');
    }
}
