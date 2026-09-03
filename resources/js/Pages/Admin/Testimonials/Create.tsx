import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { ArrowLeft } from 'lucide-react';

interface TestimonialsCreateProps {
    projects: { id: number; title: string }[];
}

export default function TestimonialsCreate({ projects }: TestimonialsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        client_name: '',
        client_role: '',
        quote: '',
        photo: '',
        project_id: '' as string | number,
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/testimonials');
    };

    return (
        <AdminLayout title="Add Testimonial">
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
                        Add Client Testimonial
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
                                placeholder="e.g. Sarah Mwangi"
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
                                placeholder="e.g. Bride, Destination Wedding"
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
                            placeholder="Quote text..."
                            className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                        {errors.quote && <p className="text-xs text-red-600 mt-1">{errors.quote}</p>}
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
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Linked Portfolio Project (Optional)
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
                            className="px-6 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                        >
                            Save Review
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
