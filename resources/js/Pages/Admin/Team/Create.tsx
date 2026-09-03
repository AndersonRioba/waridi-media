import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { ArrowLeft } from 'lucide-react';

export default function TeamCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        role_title: '',
        photo: '',
        bio: '',
        social_links: { instagram: '', linkedin: '', vimeo: '', youtube: '' },
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/team');
    };

    return (
        <AdminLayout title="Add Team Member">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/team"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6A16] hover:text-[#141414] mb-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Team</span>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Add Studio Member
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Role / Title *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.role_title}
                                onChange={(e) => setData('role_title', e.target.value)}
                                placeholder="e.g. Lead Portrait Photographer"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                            {errors.role_title && <p className="text-xs text-red-600 mt-1">{errors.role_title}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Photo URL
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
                            Short Biography
                        </label>
                        <textarea
                            rows={3}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Instagram Profile URL
                            </label>
                            <input
                                type="url"
                                value={data.social_links.instagram}
                                onChange={(e) =>
                                    setData('social_links', { ...data.social_links, instagram: e.target.value })
                                }
                                placeholder="https://instagram.com/..."
                                className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                LinkedIn Profile URL
                            </label>
                            <input
                                type="url"
                                value={data.social_links.linkedin}
                                onChange={(e) =>
                                    setData('social_links', { ...data.social_links, linkedin: e.target.value })
                                }
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-xs"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E8DFC8]">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="activeCheck"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded text-[#C9A227]"
                            />
                            <label htmlFor="activeCheck" className="text-xs font-semibold text-[#1A1A1A]">
                                Visible on About Page
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/admin/team" className="text-xs font-semibold text-[#5C5850]">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                            >
                                Save Member
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
