import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { BlogPost, PaginatedData } from '@/types';
import { formatDate } from '@/lib/utils';
import { Plus, Edit3, Trash2, ExternalLink } from 'lucide-react';

interface BlogIndexProps {
    posts: PaginatedData<BlogPost>;
    selectedStatus?: string;
}

export default function BlogIndex({ posts, selectedStatus }: BlogIndexProps) {
    const handleDelete = (post: BlogPost) => {
        if (confirm(`Delete article "${post.title}"?`)) {
            router.delete(`/admin/blog/${post.id}`);
        }
    };

    return (
        <AdminLayout title="Journal Articles">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Studio Journal & Articles
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Publish behind-the-scenes insights, shoot preparation guides, and news.
                    </p>
                </div>

                <Link
                    href="/admin/blog/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={15} />
                    <span>New Article</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Article</th>
                            <th className="py-3.5 px-4">Category</th>
                            <th className="py-3.5 px-4">Author</th>
                            <th className="py-3.5 px-4">Published Date</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {posts.data.map((post) => (
                            <tr key={post.id} className="hover:bg-[#FBF6EC]/40">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.cover_image}
                                            alt={post.title}
                                            className="w-10 h-10 rounded-lg object-cover bg-[#E8DFC8] shrink-0"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-sm text-[#1A1A1A] line-clamp-1">
                                                {post.title}
                                            </h4>
                                            <span className="text-[10px] text-[#5C5850]">
                                                /{post.slug}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-[#8A6A16] font-medium">
                                    {post.category?.name || '—'}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {post.author?.name || '—'}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {post.published_at ? formatDate(post.published_at) : '—'}
                                </td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            post.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {post.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <a
                                            href={`/journal/${post.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1 text-[#5C5850] hover:text-[#8A6A16]"
                                        >
                                            <ExternalLink size={15} />
                                        </a>
                                        <Link
                                            href={`/admin/blog/${post.id}/edit`}
                                            className="p-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit3 size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post)}
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
