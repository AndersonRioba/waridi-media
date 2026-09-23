import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { CTASection } from '@/Components/public/CTASection';
import { PaginatedData, ProjectMedia, Tag } from '@/types';
import { Maximize2, X, Sparkles, RotateCcw } from 'lucide-react';

interface GalleryProps {
    media: PaginatedData<ProjectMedia & { project?: { title: string; slug: string } }>;
    tags: Tag[];
    filters: {
        tag?: string;
    };
}

export default function Gallery({ media, tags, filters }: GalleryProps) {
    const [lightboxItem, setLightboxItem] = useState<{ url: string; caption?: string | null; title?: string } | null>(null);

    const handleTagClick = (tagSlug?: string) => {
        router.get(
            '/gallery',
            { tag: tagSlug || undefined },
            { preserveState: true }
        );
    };

    const clearFilters = () => {
        router.get('/gallery');
    };

    return (
        <PublicLayout title="Visual Gallery — High-Resolution Stills Archive">
            {/* Header */}
            <section className="bg-[#FBF6EC] py-20 border-b border-[#E8DFC8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <GoldDivider label="STILLS ARCHIVE" diamondSize={5} className="mb-3" />
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] tracking-tight">
                        Curated Photo Gallery
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#5C5850] max-w-2xl mx-auto font-light leading-relaxed">
                        A dedicated visual collection of fine-art portraits, wedding celebrations, and architectural stills. Click any frame to inspect high-resolution details.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="bg-white/95 backdrop-blur-md border-b border-[#E8DFC8] sticky top-20 z-30 shadow-[0_4px_20px_-4px_rgba(20,20,20,0.04)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-1">
                            <button
                                onClick={() => handleTagClick(undefined)}
                                className={`px-4 py-2 rounded-none text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 border ${
                                    !filters.tag
                                        ? 'bg-[#141414] text-[#FAF6EC] border-[#141414] shadow-sm -translate-y-0.5'
                                        : 'bg-white text-[#5C5850] border-[#E8DFC8] hover:border-[#C9A227] hover:text-[#1A1A1A]'
                                }`}
                            >
                                All Stills
                            </button>
                            {tags.map((tag) => {
                                const isSelected = filters.tag === tag.slug;
                                return (
                                    <button
                                        key={tag.id}
                                        onClick={() => handleTagClick(isSelected ? undefined : tag.slug)}
                                        className={`px-4 py-2 rounded-none text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 border ${
                                            isSelected
                                                ? 'bg-[#FAF3E0] text-[#8A6A16] border-[#C9A227] shadow-sm -translate-y-0.5'
                                                : 'bg-white text-[#5C5850] border-[#E8DFC8] hover:border-[#C9A227] hover:text-[#1A1A1A]'
                                        }`}
                                    >
                                        {tag.name}
                                    </button>
                                );
                            })}
                        </div>

                        {filters.tag && (
                            <button
                                onClick={clearFilters}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs text-[#8A6A16] border border-[#E8DFC8] hover:border-[#C9A227] bg-white hover:bg-[#FAF6EC] shrink-0"
                            >
                                <RotateCcw size={12} />
                                <span>Reset</span>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Masonry Image Gallery */}
            <section className="py-16 bg-white min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {media.data.length > 0 ? (
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            {media.data.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() =>
                                        setLightboxItem({
                                            url: item.path_or_url,
                                            caption: item.caption,
                                            title: item.project?.title,
                                        })
                                    }
                                    className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-[#FBF6EC] border border-[#E8DFC8] cursor-pointer shadow-xs hover:shadow-xl hover:border-[#C9A227] transition-all duration-300"
                                >
                                    <img
                                        src={item.path_or_url}
                                        alt={item.caption || item.project?.title || 'Waridi Photo Studio'}
                                        loading="lazy"
                                        className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-500"
                                    />
                                    {/* Soft gold tint scrim on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <div className="flex items-center justify-between text-white">
                                            <div>
                                                {item.project && (
                                                    <span className="text-[10px] uppercase tracking-wider text-[#E8C766] font-semibold block">
                                                        {item.project.title}
                                                    </span>
                                                )}
                                                {item.caption && (
                                                    <p className="text-xs text-[#FAF6EC] mt-0.5 line-clamp-2">
                                                        {item.caption}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 ml-2">
                                                <Maximize2 size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#FBF6EC] rounded-3xl border border-[#E8DFC8]">
                            <p className="font-serif text-2xl text-[#1A1A1A]">No gallery stills found</p>
                            <p className="text-sm text-[#5C5850] mt-2">Try clearing your discipline filter.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-none text-xs font-semibold uppercase tracking-wider bg-[#141414] text-white hover:bg-[#C9A227] transition-colors"
                            >
                                View All Stills
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {media.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-16">
                            {media.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`px-4 py-2 rounded-none text-xs font-semibold uppercase tracking-wider transition-all border ${
                                        link.active
                                            ? 'bg-[#141414] text-[#FAF6EC] border-[#141414] shadow-sm'
                                            : !link.url
                                            ? 'opacity-30 cursor-not-allowed text-[#A8A49C] border-transparent'
                                            : 'bg-white text-[#5C5850] border-[#E8DFC8] hover:border-[#C9A227] hover:text-[#1A1A1A]'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxItem && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setLightboxItem(null)}
                >
                    <button
                        onClick={() => setLightboxItem(null)}
                        className="absolute top-6 right-6 text-white hover:text-[#E8C766] p-2 cursor-pointer z-10"
                        aria-label="Close Lightbox"
                    >
                        <X size={32} />
                    </button>
                    <div
                        className="max-h-[90vh] max-w-[90vw] flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={lightboxItem.url}
                            alt={lightboxItem.caption || 'Enlarged photo'}
                            className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl"
                        />
                        {(lightboxItem.caption || lightboxItem.title) && (
                            <div className="mt-3 text-center text-white">
                                {lightboxItem.title && (
                                    <span className="text-[11px] uppercase tracking-wider text-[#E8C766] font-semibold block">
                                        {lightboxItem.title}
                                    </span>
                                )}
                                {lightboxItem.caption && (
                                    <p className="text-xs text-[#D6D2C8] mt-1 max-w-xl">
                                        {lightboxItem.caption}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CTA */}
            <CTASection
                title="Book a Session for Similar Imagery"
                subtitle="From intimate portrait sittings to commercial campaigns, our studio and production team are ready to realize your vision."
                buttonText="Book a Shoot"
                buttonLink="/contact"
            />
        </PublicLayout>
    );
}
