<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status');
        $query = Inquiry::orderBy('created_at', 'desc');

        if ($status) {
            $query->where('status', $status);
        }

        $inquiries = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries,
            'selectedStatus' => $status,
        ]);
    }

    public function show(Inquiry $inquiry): Response
    {
        return Inertia::render('Admin/Inquiries/Show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function updateStatus(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:new,contacted,booked,closed'],
        ]);

        $inquiry->update($validated);

        return back()->with('success', 'Inquiry status updated to ' . $validated['status']);
    }

    public function updateNotes(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'internal_notes' => ['nullable', 'string'],
        ]);

        $inquiry->update($validated);

        return back()->with('success', 'Internal notes saved.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $this->authorize('delete', $inquiry);

        $inquiry->delete();

        return redirect()->route('admin.inquiries.index')->with('success', 'Inquiry removed.');
    }
}
