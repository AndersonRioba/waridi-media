import React from 'react';
import { Link, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { PortfolioCard } from '@/Components/public/PortfolioCard';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { PaginatedData, Project, Tag } from '@/types';
import { Filter, X } from 'lucide-react';

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
            <section className="bg-white border-b border-[#E8DFC8] sticky top-20 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Categories Pill Buttons */}
                        <div className="flex items-center flex-wrap gap-2">
                            <button
                                onClick={() => handleCategoryClick(undefined)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                                    !filters.category
                                        ? 'bg-[#141414] text-[#FBF6EC] shadow-sm'
                                        : 'bg-[#FBF6EC] text-[#5C5850] hover:text-[#1A1A1A] border border-[#E8DFC8]'
                                }`}
                            >
                                All Disciplines
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => handleCategoryClick(cat.value)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                                        filters.category === cat.value
                                            ? 'bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#8A6A16] text-white shadow-sm'
                                            : 'bg-[#FBF6EC] text-[#5C5850] hover:text-[#1A1A1A] border border-[#E8DFC8]'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Tag Filter & Clear */}
                        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 md:pb-0">
                            {(filters.category || filters.tag) && (
                                <button
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                                >
                                    <X size={12} />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Specific Subservice Tags */}
                    {tags.length > 0 && (
                        <div className="flex items-center gap-2 pt-3 overflow-x-auto no-scrollbar">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A6A16] shrink-0">
                                Filter by Service:
                            </span>
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => handleTagClick(filters.tag === tag.slug ? undefined : tag.slug)}
                                    className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
                                        filters.tag === tag.slug
                                            ? 'bg-[#8A6A16] text-white font-semibold'
                                            : 'bg-[#F5EFE1] text-[#5C5850] hover:text-[#1A1A1A]'
                                    }`}
                                >
                                    {tag.name}
                                </button>
                            ))}
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
                                className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C9A227] text-white"
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
                                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                                        link.active
                                            ? 'bg-[#C9A227] text-white'
                                            : !link.url
                                            ? 'opacity-40 cursor-not-allowed text-[#A8A49C]'
                                            : 'bg-[#FBF6EC] text-[#1A1A1A] hover:bg-[#F5EFE1]'
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
