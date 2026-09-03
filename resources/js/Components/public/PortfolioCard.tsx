import React from 'react';
import { Link } from '@inertiajs/react';
import { Project } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioCardProps {
    project: Project;
    className?: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, className = '' }) => {
    return (
        <Link
            href={`/portfolio/${project.slug}`}
            className={`portfolio-card group block relative rounded-2xl overflow-hidden bg-[#FBF6EC] border border-[#E8DFC8]/70 hover:border-[#C9A227] transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 ${className}`}
        >
            {/* Image Container with Hover Scale */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#E8DFC8]">
                <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                />

                {/* Soft Gold Tint Scrim on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-[#141414]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6 text-white" />

                {/* Category Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-none text-[11px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#8A6A16] border border-[#E8DFC8] shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
                        {project.category.replace('_', ' ')}
                    </span>
                </div>

                {/* Floating Arrow on Hover */}
                <div className="absolute top-4 left-4 z-10 w-9 h-9 rounded-none bg-white/95 backdrop-blur-md flex items-center justify-center text-[#8A6A16] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.12)] -translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight size={18} />
                </div>
            </div>

            {/* Content Bottom Bar */}
            <div className="p-5 bg-white">
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag.id}
                                className="text-[10px] font-medium uppercase tracking-wider text-[#8A6A16] bg-[#FBF6EC] px-2 py-0.5 rounded-none border border-[#E8DFC8]/60"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors line-clamp-1">
                    {project.title}
                </h3>
                {project.client && (
                    <p className="text-xs text-[#5C5850] mt-1 line-clamp-1">
                        Client: {project.client}
                    </p>
                )}
            </div>
        </Link>
    );
};
