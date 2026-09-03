import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { BlogCategory, TeamMember } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface BlogCreateProps {
    categories: BlogCategory[];
    authors: TeamMember[];
}

export default function BlogCreate({ categories, authors }: BlogCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        cover_image: '',
        excerpt: '',
        body: '',
        author_id: '',
        blog_category_id: '',
        status: 'published',
        published_at: new Date().toISOString().substring(0, 10),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/blog');
    };

    return (
        <AdminLayout title="Create Article">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/blog"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6A16] hover:text-[#141414] mb-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Journal</span>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Write Journal Article
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Article Title *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="Leave empty to auto-slug"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Cover Image URL *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.cover_image}
                            onChange={(e) => setData('cover_image', e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                        {errors.cover_image && <p className="text-xs text-red-600 mt-1">{errors.cover_image}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Category
                            </label>
                            <select
                                value={data.blog_category_id}
                                onChange={(e) => setData('blog_category_id', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-[#E8DFC8] text-sm bg-white"
                            >
                                <option value="">Select Category...</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Author (Team Member)
                            </label>
                            <select
                                value={data.author_id}
                                onChange={(e) => setData('author_id', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-[#E8DFC8] text-sm bg-white"
                            >
                                <option value="">Select Author...</option>
                                {authors.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name} ({a.role_title})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Status
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
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Excerpt
                        </label>
                        <textarea
                            rows={2}
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Article Body (HTML supported) *
                        </label>
                        <textarea
                            rows={8}
                            required
                            value={data.body}
                            onChange={(e) => setData('body', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm font-mono text-xs"
                        />
                        {errors.body && <p className="text-xs text-red-600 mt-1">{errors.body}</p>}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
                        <Link href="/admin/blog" className="text-xs font-semibold text-[#5C5850]">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-all"
                        >
                            Publish Article
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
