import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Testimonial } from '@/types';
import { Plus, Edit3, Trash2 } from 'lucide-react';

interface TestimonialsIndexProps {
    testimonials: Testimonial[];
}

export default function TestimonialsIndex({ testimonials }: TestimonialsIndexProps) {
    const handleDelete = (t: Testimonial) => {
        if (confirm(`Delete testimonial by ${t.client_name}?`)) {
            router.delete(`/admin/testimonials/${t.id}`);
        }
    };

    return (
        <AdminLayout title="Client Testimonials">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Testimonials & Reviews
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Manage client endorsements featured on the homepage and project showcases.
                    </p>
                </div>

                <Link
                    href="/admin/testimonials/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-colors shadow-sm"
                >
                    <Plus size={15} />
                    <span>Add Review</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Client</th>
                            <th className="py-3.5 px-4">Role / Organization</th>
                            <th className="py-3.5 px-4">Quote</th>
                            <th className="py-3.5 px-4">Related Work</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {testimonials.map((t) => (
                            <tr key={t.id} className="hover:bg-[#FBF6EC]/40">
                                <td className="py-3 px-4 font-semibold text-sm text-[#1A1A1A]">
                                    {t.client_name}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {t.client_role || '—'}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850] max-w-xs truncate">
                                    "{t.quote}"
                                </td>
                                <td className="py-3 px-4 text-[#8A6A16]">
                                    {t.project?.title || '—'}
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/testimonials/${t.id}/edit`}
                                            className="p-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit3 size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(t)}
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
