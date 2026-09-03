import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Tag } from '@/types';
import { ArrowLeft, Plus, Trash2, Upload, Sparkles } from 'lucide-react';

interface ProjectsCreateProps {
    tags: Tag[];
}

export default function ProjectsCreate({ tags }: ProjectsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        category: 'photography',
        client: '',
        location: '',
        project_date: '',
        cover_image: '',
        video_url: '',
        excerpt: '',
        body: '',
        is_featured: false,
        status: 'published',
        sort_order: 0,
        tag_ids: [] as number[],
        media: [] as { type: 'image' | 'video'; path_or_url: string; caption: string }[],
    });

    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isCover = true) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/admin/media/upload', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                body: formData,
            });
            const result = await res.json();
            if (result.url) {
                if (isCover) {
                    setData('cover_image', result.url);
                } else {
                    setData('media', [
                        ...data.media,
                        { type: result.type, path_or_url: result.url, caption: '' },
                    ]);
                }
            }
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setIsUploading(false);
        }
    };

    const toggleTag = (id: number) => {
        setData(
            'tag_ids',
            data.tag_ids.includes(id)
                ? data.tag_ids.filter((tId) => tId !== id)
                : [...data.tag_ids, id]
        );
    };

    const addMediaItem = () => {
        setData('media', [
            ...data.media,
            { type: 'image', path_or_url: '', caption: '' },
        ]);
    };

    const updateMediaItem = (index: number, field: string, value: string) => {
        const updated = [...data.media];
        updated[index] = { ...updated[index], [field]: value };
        setData('media', updated);
    };

    const removeMediaItem = (index: number) => {
        setData('media', data.media.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/projects');
    };

    return (
        <AdminLayout title="Add New Project">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/projects"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6A16] hover:text-[#141414] mb-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Projects</span>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Create New Portfolio Project
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Information Card */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                            General Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Project Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Royal Wedding in Naivasha"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                                />
                                {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Slug (URL identifier)
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="Leave empty to auto-generate"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                                />
                                {errors.slug && <p className="text-xs text-red-600 mt-1">{errors.slug}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Discipline Category *
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value as any)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm bg-white focus:outline-none focus:border-[#C9A227]"
                                >
                                    <option value="photography">Photography</option>
                                    <option value="media_production">Media Production</option>
                                    <option value="print_creative">Print & Creative</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Client Name
                                </label>
                                <input
                                    type="text"
                                    value={data.client}
                                    onChange={(e) => setData('client', e.target.value)}
                                    placeholder="e.g. Sarah & Brian"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Shoot Location
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="e.g. Enashipai, Naivasha"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Project Date
                                </label>
                                <input
                                    type="date"
                                    value={data.project_date}
                                    onChange={(e) => setData('project_date', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Video Embed URL (YouTube/Vimeo)
                                </label>
                                <input
                                    type="url"
                                    value={data.video_url}
                                    onChange={(e) => setData('video_url', e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Short Excerpt
                            </label>
                            <textarea
                                rows={2}
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                placeholder="A brief 1-2 sentence teaser summary..."
                                className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Case Study Content (HTML supported)
                            </label>
                            <textarea
                                rows={5}
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                placeholder="<p>Full case-study text, creative background, deliverables and technical setup details...</p>"
                                className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                            />
                        </div>
                    </div>

                    {/* Media & Cover Image Card */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                            Cover & Gallery Media
                        </h2>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Cover Image URL *
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    required
                                    value={data.cover_image}
                                    onChange={(e) => setData('cover_image', e.target.value)}
                                    placeholder="https://images.unsplash.com/... or upload"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:outline-none focus:border-[#C9A227]"
                                />
                                <label className="cursor-pointer px-4 py-2.5 bg-[#F5EFE1] hover:bg-[#E8DFC8] text-[#1A1A1A] rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0">
                                    <Upload size={14} />
                                    <span>Upload</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, true)}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {errors.cover_image && <p className="text-xs text-red-600 mt-1">{errors.cover_image}</p>}

                            {data.cover_image && (
                                <div className="mt-3 w-40 aspect-[4/3] rounded-xl overflow-hidden border border-[#E8DFC8]">
                                    <img src={data.cover_image} alt="Cover preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Gallery Media Items */}
                        <div className="pt-4 border-t border-[#E8DFC8]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs uppercase font-semibold text-[#1A1A1A]">
                                    Project Gallery Images / Videos
                                </span>
                                <button
                                    type="button"
                                    onClick={addMediaItem}
                                    className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#FBF6EC] border border-[#C9A227] text-[#8A6A16] rounded-none text-xs font-semibold uppercase tracking-wider hover:bg-[#F5EFE1] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm hover:-translate-y-0.5 transition-all"
                                >
                                    <Plus size={13} />
                                    <span>Add Media Row</span>
                                </button>
                            </div>

                            <div className="space-y-3">
                                {data.media.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8]">
                                        <select
                                            value={item.type}
                                            onChange={(e) => updateMediaItem(idx, 'type', e.target.value)}
                                            className="px-2 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                        >
                                            <option value="image">Image</option>
                                            <option value="video">Video</option>
                                        </select>
                                        <input
                                            type="text"
                                            value={item.path_or_url}
                                            onChange={(e) => updateMediaItem(idx, 'path_or_url', e.target.value)}
                                            placeholder="Image/Video URL or upload"
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={item.caption}
                                            onChange={(e) => updateMediaItem(idx, 'caption', e.target.value)}
                                            placeholder="Caption"
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeMediaItem(idx)}
                                            className="p-1.5 text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tags, Status & Visibility */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                            Tags & Publishing Options
                        </h2>

                        <div>
                            <span className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Specific Service Tags
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <button
                                        type="button"
                                        key={tag.id}
                                        onClick={() => toggleTag(tag.id)}
                                        className={`px-3.5 py-1.5 rounded-none text-xs font-medium transition-all border ${
                                            data.tag_ids.includes(tag.id)
                                                ? 'bg-[#141414] text-[#FAF6EC] border-[#141414] shadow-sm ring-1 ring-[#C9A227]/40'
                                                : 'bg-white border-[#E8DFC8] text-[#5C5850] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#C9A227] hover:text-[#1A1A1A]'
                                        }`}
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8DFC8]">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Publishing Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as any)}
                                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFC8] text-sm bg-white"
                                >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Sort Order
                                </label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-6">
                                <input
                                    type="checkbox"
                                    id="featuredCheck"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="w-4 h-4 rounded text-[#C9A227] focus:ring-[#C9A227]"
                                />
                                <label htmlFor="featuredCheck" className="text-xs font-semibold text-[#1A1A1A] cursor-pointer">
                                    Feature on Homepage Grid
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/admin/projects"
                            className="px-6 py-2.5 rounded-none border border-[#E8DFC8] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F5EFE1] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm hover:-translate-y-0.5 transition-all"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_4px_14px_rgba(20,20,20,0.18)] hover:shadow-[0_6px_20px_rgba(20,20,20,0.25)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                        >
                            {processing ? 'Saving...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
