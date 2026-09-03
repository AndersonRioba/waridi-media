import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Inquiry, PaginatedData } from '@/types';
import { formatDate } from '@/lib/utils';
import { Eye, Trash2, Mail, Phone, Calendar } from 'lucide-react';

interface InquiriesIndexProps {
    inquiries: PaginatedData<Inquiry>;
    selectedStatus?: string;
}

export default function InquiriesIndex({ inquiries, selectedStatus }: InquiriesIndexProps) {
    const handleStatusFilter = (status?: string) => {
        router.get('/admin/inquiries', { status: status || undefined }, { preserveState: true });
    };

    const handleDelete = (inquiry: Inquiry) => {
        if (confirm(`Delete inquiry from ${inquiry.name}?`)) {
            router.delete(`/admin/inquiries/${inquiry.id}`);
        }
    };

    return (
        <AdminLayout title="Client Inquiries">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Client Inquiries
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Review submissions from the public website contact form.
                    </p>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] mb-6 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A6A16]">
                    Status:
                </span>
                <div className="flex gap-2 flex-wrap">
                    {['', 'new', 'contacted', 'booked', 'closed'].map((st) => (
                        <button
                            key={st}
                            onClick={() => handleStatusFilter(st || undefined)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                                (selectedStatus || '') === st
                                    ? 'bg-[#141414] text-white'
                                    : 'bg-[#FBF6EC] text-[#5C5850] hover:text-[#1A1A1A]'
                            }`}
                        >
                            {st === '' ? 'All Inquiries' : st}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Contact</th>
                            <th className="py-3.5 px-4">Interest / Service</th>
                            <th className="py-3.5 px-4">Event Date</th>
                            <th className="py-3.5 px-4">Received</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {inquiries.data.map((inq) => (
                            <tr key={inq.id} className="hover:bg-[#FBF6EC]/40">
                                <td className="py-3 px-4">
                                    <div className="font-semibold text-sm text-[#1A1A1A]">
                                        {inq.name}
                                    </div>
                                    <div className="text-xs text-[#5C5850] flex items-center gap-2 mt-0.5">
                                        <span className="flex items-center gap-1">
                                            <Mail size={12} /> {inq.email}
                                        </span>
                                        {inq.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone size={12} /> {inq.phone}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="font-medium text-[#1A1A1A]">
                                        {inq.service_interest || 'General'}
                                    </span>
                                    <span className="text-[10px] uppercase text-[#8A6A16] block">
                                        {inq.service_group_interest.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {inq.event_date ? formatDate(inq.event_date) : '—'}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {formatDate(inq.created_at)}
                                </td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            inq.status === 'new'
                                                ? 'bg-amber-100 text-amber-800'
                                                : inq.status === 'contacted'
                                                ? 'bg-blue-100 text-blue-800'
                                                : inq.status === 'booked'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {inq.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/inquiries/${inq.id}`}
                                            className="px-2.5 py-1 bg-[#FBF6EC] hover:bg-[#F5EFE1] border border-[#E8DFC8] rounded-lg text-xs font-semibold text-[#8A6A16] inline-flex items-center gap-1"
                                        >
                                            <Eye size={13} />
                                            <span>Review</span>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(inq)}
                                            className="p-1 text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
