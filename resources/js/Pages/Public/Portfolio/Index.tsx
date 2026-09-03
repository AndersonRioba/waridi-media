import React from 'react';
import { Link, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { PortfolioCard } from '@/Components/public/PortfolioCard';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { PaginatedData, Project, Tag } from '@/types';
import { RotateCcw } from 'lucide-react';

interface PortfolioIndexProps {
    projects: PaginatedData<Project>;
    tags: Tag[];
    filters: {
        category?: string;
        tag?: string;
    };
    categories: { value: string; label: string }[];
}

export default function PortfolioIndex({
    projects,
    tags,
    filters,
    categories,
}: PortfolioIndexProps) {
    const handleCategoryClick = (categoryVal?: string) => {
        router.get(
            '/portfolio',
            {
                category: categoryVal || undefined,
                tag: filters.tag || undefined,
            },
            { preserveState: true }
        );
    };

    const handleTagClick = (tagSlug?: string) => {
        router.get(
            '/portfolio',
            {
                category: filters.category || undefined,
                tag: tagSlug || undefined,
            },
            { preserveState: true }
        );
    };

    const clearFilters = () => {
        router.get('/portfolio');
    };

    return (
        <PublicLayout title="Selected Work & Portfolio">
            {/* Page Hero */}
            <section className="bg-[#FBF6EC] py-20 border-b border-[#E8DFC8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <GoldDivider label="OUR PORTFOLIO" diamondSize={5} className="mb-3" />
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] tracking-tight">
                        Timeless Imagery, Cinematic Vision
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#5C5850] max-w-2xl mx-auto font-light leading-relaxed">
                        Explore our curated archives across portraiture, milestone celebrations, television production, drone cinematography, and fine art mounting.
                    </p>
                </div>
            </section>

            {/* Filter Controls */}
            <section className="bg-white/95 backdrop-blur-md border-b border-[#E8DFC8] sticky top-20 z-30 shadow-[0_4px_20px_-4px_rgba(20,20,20,0.04)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                        {/* Categories Square Button Bar */}
                        <div className="flex items-center flex-wrap gap-2.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full">
                            <button
                                onClick={() => handleCategoryClick(undefined)}
                                className={`px-5 py-2.5 rounded-none text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 shrink-0 flex items-center gap-2 border ${
                                    !filters.category
                                        ? 'bg-[#141414] text-[#FAF6EC] border-[#141414] shadow-[0_4px_14px_rgba(20,20,20,0.16)] ring-1 ring-[#C9A227]/40 -translate-y-0.5'
                                        : 'bg-white text-[#666053] border-[#E8DFC8] shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:border-[#C9A227] hover:text-[#141414] hover:-translate-y-0.5'
                                }`}
                            >
                                {!filters.category && (
                                    <span className="w-1.5 h-1.5 bg-[#E8C766] shadow-[0_0_6px_rgba(232,199,102,0.9)]" />
                                )}
                                <span>All Disciplines</span>
                            </button>
                            {categories.map((cat) => {
                                const isActive = filters.category === cat.value;
                                return (
                                    <button
                                        key={cat.value}
                                        onClick={() => handleCategoryClick(cat.value)}
                                        className={`px-5 py-2.5 rounded-none text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 shrink-0 flex items-center gap-2 border ${
                                            isActive
                                                ? 'bg-[#141414] text-[#FAF6EC] border-[#141414] shadow-[0_4px_14px_rgba(20,20,20,0.16)] ring-1 ring-[#C9A227]/40 -translate-y-0.5'
                                                : 'bg-white text-[#666053] border-[#E8DFC8] shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:border-[#C9A227] hover:text-[#141414] hover:-translate-y-0.5'
                                        }`}
                                    >
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 bg-[#E8C766] shadow-[0_0_6px_rgba(232,199,102,0.9)]" />
                                        )}
                                        <span>{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Reset Filters CTA (if filters active) */}
                        {(filters.category || filters.tag) && (
                            <div className="flex items-center shrink-0 self-end md:self-auto">
                                <button
                                    onClick={clearFilters}
                                    className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none text-xs font-medium text-[#8A6A16] hover:text-[#141414] bg-white border border-[#E8DFC8] hover:border-[#C9A227] hover:bg-[#FAF6EC] transition-all shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
                                >
                                    <RotateCcw size={12} className="transition-transform duration-300 group-hover:-rotate-90" />
                                    <span>Reset Filters</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Specific Subservice Tags */}
                    {tags.length > 0 && (
                        <div className="pt-3.5 mt-3 border-t border-[#E8DFC8]/50 flex items-center gap-3">
                            <div className="flex items-center gap-2 shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A6A16]">
                                <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A227]" />
                                <span>Filter by Service</span>
                                <span className="text-[#E8DFC8] font-light">|</span>
                            </div>

                            <div className="flex-1 overflow-hidden relative">
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                    {tags.map((tag) => {
                                        const isSelected = filters.tag === tag.slug;
                                        return (
                                            <button
                                                key={tag.id}
                                                onClick={() => handleTagClick(isSelected ? undefined : tag.slug)}
                                                className={`px-3.5 py-1.5 rounded-none text-xs transition-all duration-200 shrink-0 flex items-center gap-1.5 border ${
                                                    isSelected
                                                        ? 'bg-[#FAF3E0] text-[#8A6A16] border-[#C9A227] font-medium shadow-[0_2px_8px_rgba(201,162,39,0.2)] ring-1 ring-[#C9A227]/30'
                                                        : 'bg-white text-[#5C5850] border-[#E8DFC8] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_3px_6px_rgba(0,0,0,0.08)] hover:border-[#C9A227] hover:text-[#1A1A1A] hover:bg-[#FDFBF7]'
                                                }`}
                                            >
                                                {isSelected && (
                                                    <span className="w-1.5 h-1.5 bg-[#C9A227]" />
                                                )}
                                                <span>{tag.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Portfolio Grid Section */}
            <section className="py-16 bg-[#FFFFFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {projects.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.data.map((project) => (
                                <PortfolioCard key={project.id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#FBF6EC] rounded-3xl border border-[#E8DFC8]">
                            <p className="font-serif text-2xl text-[#1A1A1A]">No projects found</p>
                            <p className="text-sm text-[#5C5850] mt-2">Try clearing your filters to view more work.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-5 inline-flex items-center gap-2 px-7 py-3 rounded-none text-xs font-semibold uppercase tracking-[0.16em] bg-[#141414] text-[#FAF6EC] border border-[#C9A227]/60 shadow-[0_4px_14px_rgba(20,20,20,0.16)] hover:bg-gradient-to-r hover:from-[#E8C766] hover:via-[#C9A227] hover:to-[#8A6A16] hover:text-white transition-all hover:-translate-y-0.5"
                            >
                                View All Work
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {projects.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-16">
                            {projects.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`px-4 py-2 rounded-none text-xs font-semibold uppercase tracking-wider transition-all border ${
                                        link.active
                                            ? 'bg-[#141414] text-[#FAF6EC] border-[#141414] shadow-[0_4px_10px_rgba(20,20,20,0.14)] ring-1 ring-[#C9A227]/40 -translate-y-0.5'
                                            : !link.url
                                            ? 'opacity-30 cursor-not-allowed text-[#A8A49C] border-transparent'
                                            : 'bg-white text-[#5C5850] border-[#E8DFC8] shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:border-[#C9A227] hover:text-[#1A1A1A] hover:bg-[#FDFBF7] hover:-translate-y-0.5'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
