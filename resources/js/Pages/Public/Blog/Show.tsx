import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

interface BlogShowProps {
    post: BlogPost;
    recentPosts?: BlogPost[];
}

export default function BlogShow({ post, recentPosts = [] }: BlogShowProps) {
    return (
        <PublicLayout title={post.title} description={post.excerpt || undefined}>
            {/* Back link */}
            <div className="bg-[#FBF6EC] border-b border-[#E8DFC8]">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link
                        href="/journal"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6A16] hover:text-[#141414]"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Journal</span>
                    </Link>
                </div>
            </div>

            {/* Header */}
            <article className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    {post.category && (
                        <span className="text-xs uppercase tracking-widest font-semibold text-[#8A6A16] block mb-3">
                            {post.category.name}
                        </span>
                    )}
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-xs text-[#5C5850] pb-8 border-b border-[#E8DFC8]">
                        {post.author && (
                            <div className="flex items-center gap-2">
                                {post.author.photo ? (
                                    <img
                                        src={post.author.photo}
                                        alt={post.author.name}
                                        className="w-7 h-7 rounded-full object-cover border border-[#C9A227]"
                                    />
                                ) : (
                                    <User size={15} />
                                )}
                                <span className="font-semibold text-[#1A1A1A]">{post.author.name}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{formatDate(post.published_at || post.created_at)}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="my-10 rounded-2xl overflow-hidden shadow-xl border border-[#E8DFC8]">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full max-h-[500px] object-cover"
                        />
                    </div>

                    {/* Body */}
                    <div
                        className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#1A1A1A] prose-p:text-[#5C5850] prose-p:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                </div>
            </article>

            {/* Related Articles */}
            {recentPosts.length > 0 && (
                <section className="py-16 bg-[#FBF6EC] border-t border-[#E8DFC8]">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-10">
                            <GoldDivider label="CONTINUE READING" diamondSize={5} className="mb-2" />
                            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                                More from the Journal
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentPosts.map((rPost) => (
                                <Link
                                    key={rPost.id}
                                    href={`/journal/${rPost.slug}`}
                                    className="bg-white rounded-xl overflow-hidden border border-[#E8DFC8] p-4 group"
                                >
                                    <h4 className="font-serif font-bold text-sm text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors line-clamp-2 mb-2">
                                        {rPost.title}
                                    </h4>
                                    <p className="text-[11px] text-[#8A6A16]">
                                        {formatDate(rPost.published_at || rPost.created_at)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
