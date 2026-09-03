import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { ImageUploader } from '@/Components/admin/ImageUploader';
import { ArrowLeft } from 'lucide-react';

export default function LivestreamCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        client_name: '',
        description: '',
        scheduled_at: '',
        status: 'upcoming',
        platform: 'youtube',
        stream_url: '',
        cover_image: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/livestream');
    };

    return (
        <AdminLayout title="Schedule Livestream">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/livestream"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6A16] hover:text-[#141414] mb-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Livestream Schedule</span>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Schedule Broadcast Event
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Broadcast Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Kenya Energy Transition Summit 2026"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                        {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Client / Host Name
                            </label>
                            <input
                                type="text"
                                value={data.client_name}
                                onChange={(e) => setData('client_name', e.target.value)}
                                placeholder="e.g. Ministry of ICT"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Scheduled Date & Time *
                            </label>
                            <input
                                type="datetime-local"
                                required
                                value={data.scheduled_at}
                                onChange={(e) => setData('scheduled_at', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                            {errors.scheduled_at && <p className="text-xs text-red-600 mt-1">{errors.scheduled_at}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Platform *
                            </label>
                            <select
                                value={data.platform}
                                onChange={(e) => setData('platform', e.target.value as any)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm bg-white"
                            >
                                <option value="youtube">YouTube</option>
                                <option value="vimeo">Vimeo</option>
                                <option value="facebook">Facebook Live</option>
                                <option value="other">Other / Custom CDN</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Broadcast Status *
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as any)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm bg-white"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="live">Live Now (Featured Banner)</option>
                                <option value="completed">Completed / Archive</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Stream URL / Embed Link *
                        </label>
                        <input
                            type="url"
                            required
                            value={data.stream_url}
                            onChange={(e) => setData('stream_url', e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                        {errors.stream_url && <p className="text-xs text-red-600 mt-1">{errors.stream_url}</p>}
                    </div>

                    <div>
                        <ImageUploader
                            label="Cover Image / Poster"
                            description="Thumbnail/banner image for the livestream"
                            value={data.cover_image}
                            onChange={(url) => setData('cover_image', url)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Event Description
                        </label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
                        <Link href="/admin/livestream" className="text-xs font-semibold text-[#5C5850]">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                        >
                            Schedule Broadcast
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
