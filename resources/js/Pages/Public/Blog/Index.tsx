import React from 'react';
import { Link, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { BlogCategory, BlogPost, PaginatedData } from '@/types';
import { formatDate } from '@/lib/utils';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogIndexProps {
    posts: PaginatedData<BlogPost>;
    categories: BlogCategory[];
    selectedCategory?: string;
}

export default function BlogIndex({ posts, categories, selectedCategory }: BlogIndexProps) {
    const handleCategoryFilter = (slug?: string) => {
        router.get('/journal', { category: slug || undefined }, { preserveState: true });
    };

    return (
        <PublicLayout title="The Studio Journal">
            {/* Hero */}
            <section className="bg-[#FBF6EC] py-20 border-b border-[#E8DFC8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <GoldDivider label="STORIES & INSIGHTS" diamondSize={5} className="mb-3" />
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] tracking-tight">
                        The Waridi Journal
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#5C5850] max-w-2xl mx-auto font-light leading-relaxed">
                        Behind-the-scenes techniques, lighting theory, client preparation guides, and stories from the darkroom.
                    </p>
                </div>
            </section>

            {/* Category Pills */}
            <section className="bg-white border-b border-[#E8DFC8] py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-wrap gap-2">
                    <button
                        onClick={() => handleCategoryFilter(undefined)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                            !selectedCategory
                                ? 'bg-[#141414] text-white'
                                : 'bg-[#FBF6EC] text-[#5C5850] hover:text-[#1A1A1A] border border-[#E8DFC8]'
                        }`}
                    >
                        All Categories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryFilter(cat.slug)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                                selectedCategory === cat.slug
                                    ? 'bg-[#8A6A16] text-white'
                                    : 'bg-[#FBF6EC] text-[#5C5850] hover:text-[#1A1A1A] border border-[#E8DFC8]'
                            }`}
                        >
                            {cat.name} ({cat.posts_count ?? 0})
                        </button>
                    ))}
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-16 bg-[#FFFFFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.data.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/journal/${post.slug}`}
                                    className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8DFC8] hover:border-[#C9A227] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="aspect-[16/10] overflow-hidden bg-[#E8DFC8]">
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            {post.category && (
                                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A6A16] block mb-2">
                                                    {post.category.name}
                                                </span>
                                            )}
                                            <h2 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors line-clamp-2 mb-3">
                                                {post.title}
                                            </h2>
                                            {post.excerpt && (
                                                <p className="text-xs text-[#5C5850] line-clamp-3 leading-relaxed mb-4">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0 border-t border-[#E8DFC8]/50 flex items-center justify-between text-xs text-[#7A766E]">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={13} />
                                            <span>{formatDate(post.published_at || post.created_at)}</span>
                                        </div>
                                        <span className="font-semibold text-[#8A6A16] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            Read Article <ArrowRight size={13} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#FBF6EC] rounded-2xl border border-[#E8DFC8] max-w-xl mx-auto">
                            <p className="font-serif text-2xl text-[#1A1A1A]">No journal entries found</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
