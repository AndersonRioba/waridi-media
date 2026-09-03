import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Inquiry } from '@/types';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Mail, Phone, Calendar, User, Save, CheckCircle2 } from 'lucide-react';

interface InquiryShowProps {
    inquiry: Inquiry;
}

export default function InquiryShow({ inquiry }: InquiryShowProps) {
    const [status, setStatus] = useState(inquiry.status);
    const [notes, setNotes] = useState(inquiry.internal_notes || '');
    const [isSavingNotes, setIsSavingNotes] = useState(false);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus as any);
        router.patch(`/admin/inquiries/${inquiry.id}/status`, { status: newStatus });
    };

    const handleSaveNotes = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingNotes(true);
        router.patch(
            `/admin/inquiries/${inquiry.id}/notes`,
            { internal_notes: notes },
            {
                onFinish: () => setIsSavingNotes(false),
            }
        );
    };

    return (
        <AdminLayout title={`Inquiry: ${inquiry.name}`}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/inquiries"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6A16] hover:text-[#141414] mb-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Inquiries</span>
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                            Inquiry from {inquiry.name}
                        </h1>

                        {/* Status Switcher */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs uppercase font-semibold text-[#5C5850]">Status:</span>
                            <select
                                value={status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                className="px-3 py-1.5 rounded-xl border border-[#E8DFC8] text-xs font-semibold uppercase tracking-wider bg-white focus:outline-none focus:border-[#C9A227]"
                            >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="booked">Booked</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Details & Message (2 cols) */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-4">
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] pb-3 border-b border-[#E8DFC8]">
                                Client Message
                            </h2>
                            <div className="p-4 bg-[#FBF6EC] rounded-xl text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-line border border-[#E8DFC8]">
                                {inquiry.message}
                            </div>
                        </div>

                        {/* Internal Studio Notes */}
                        <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8]">
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">
                                Internal Staff Notes
                            </h2>
                            <p className="text-xs text-[#5C5850] mb-4">
                                Notes written here are private to studio staff.
                            </p>

                            <form onSubmit={handleSaveNotes}>
                                <textarea
                                    rows={4}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add notes e.g., Sent proposal on WhatsApp, client preferred 2pm slot..."
                                    className="w-full p-3 rounded-xl border border-[#E8DFC8] text-xs focus:outline-none focus:border-[#C9A227]"
                                />
                                <div className="mt-3 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSavingNotes}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-all"
                                    >
                                        <Save size={13} />
                                        <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Metadata (1 col) */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] h-fit space-y-6">
                        <h2 className="font-serif text-base font-bold text-[#1A1A1A] pb-3 border-b border-[#E8DFC8]">
                            Contact Details
                        </h2>

                        <div className="space-y-4 text-xs">
                            <div>
                                <span className="font-semibold text-[#8A6A16] block uppercase tracking-wider text-[10px]">
                                    Email
                                </span>
                                <a href={`mailto:${inquiry.email}`} className="text-[#1A1A1A] hover:underline font-medium">
                                    {inquiry.email}
                                </a>
                            </div>

                            {inquiry.phone && (
                                <div>
                                    <span className="font-semibold text-[#8A6A16] block uppercase tracking-wider text-[10px]">
                                        Phone
                                    </span>
                                    <a href={`tel:${inquiry.phone}`} className="text-[#1A1A1A] hover:underline font-medium">
                                        {inquiry.phone}
                                    </a>
                                </div>
                            )}

                            <div>
                                <span className="font-semibold text-[#8A6A16] block uppercase tracking-wider text-[10px]">
                                    Discipline Group
                                </span>
                                <span className="capitalize text-[#1A1A1A]">
                                    {inquiry.service_group_interest.replace('_', ' ')}
                                </span>
                            </div>

                            {inquiry.service_interest && (
                                <div>
                                    <span className="font-semibold text-[#8A6A16] block uppercase tracking-wider text-[10px]">
                                        Specific Service
                                    </span>
                                    <span className="text-[#1A1A1A] font-medium">
                                        {inquiry.service_interest}
                                    </span>
                                </div>
                            )}

                            {inquiry.event_date && (
                                <div>
                                    <span className="font-semibold text-[#8A6A16] block uppercase tracking-wider text-[10px]">
                                        Desired Event Date
                                    </span>
                                    <span className="text-[#1A1A1A]">
                                        {formatDate(inquiry.event_date)}
                                    </span>
                                </div>
                            )}

                            <div>
                                <span className="font-semibold text-[#8A6A16] block uppercase tracking-wider text-[10px]">
                                    Submitted
                                </span>
                                <span className="text-[#5C5850]">
                                    {formatDate(inquiry.created_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
