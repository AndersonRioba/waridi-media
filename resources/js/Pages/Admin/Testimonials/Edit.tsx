import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Testimonial } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface TestimonialsEditProps {
    testimonial: Testimonial;
    projects: { id: number; title: string }[];
}

export default function TestimonialsEdit({ testimonial, projects }: TestimonialsEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        client_name: testimonial.client_name || '',
        client_role: testimonial.client_role || '',
        quote: testimonial.quote || '',
        photo: testimonial.photo || '',
        project_id: testimonial.project_id || '',
        sort_order: testimonial.sort_order || 0,
        is_active: !!testimonial.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/testimonials/${testimonial.id}`);
    };

    return (
        <AdminLayout title={`Edit Testimonial: ${testimonial.client_name}`}>
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/testimonials"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6A16] hover:text-[#141414] mb-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Testimonials</span>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Edit: {testimonial.client_name}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Client Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.client_name}
                                onChange={(e) => setData('client_name', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                            {errors.client_name && <p className="text-xs text-red-600 mt-1">{errors.client_name}</p>}
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Client Role / Company
                            </label>
                            <input
                                type="text"
                                value={data.client_role}
                                onChange={(e) => setData('client_role', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Client Review Quote *
                        </label>
                        <textarea
                            rows={4}
                            required
                            value={data.quote}
                            onChange={(e) => setData('quote', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Client Photo URL
                            </label>
                            <input
                                type="text"
                                value={data.photo}
                                onChange={(e) => setData('photo', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Linked Portfolio Project
                            </label>
                            <select
                                value={data.project_id}
                                onChange={(e) => setData('project_id', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm bg-white"
                            >
                                <option value="">None / Standalone</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
                        <Link href="/admin/testimonials" className="text-xs font-semibold text-[#5C5850]">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-all"
                        >
                            Update Review
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
