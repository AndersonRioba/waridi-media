import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { PortfolioCard } from '@/Components/public/PortfolioCard';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils';
import {
    Calendar,
    MapPin,
    Building2,
    Tag as TagIcon,
    ArrowLeft,
    Sparkles,
    Play,
    Maximize2,
    X,
} from 'lucide-react';

interface ProjectShowProps {
    project: Project;
    relatedProjects?: Project[];
}

export default function ProjectShow({ project, relatedProjects = [] }: ProjectShowProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    return (
        <PublicLayout title={project.title} description={project.excerpt || undefined}>
            {/* Back to Work Link */}
            <div className="bg-[#FBF6EC] border-b border-[#E8DFC8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6A16] hover:text-[#141414] transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to All Work</span>
                    </Link>
                </div>
            </div>

            {/* Hero Banner with Cover */}
            <section className="relative bg-[#141414] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8C766]/15 border border-[#E8C766]/30 text-[#E8C766] text-xs uppercase tracking-wider font-semibold mb-4">
                            <span>{project.category.replace('_', ' ')}</span>
                        </div>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] mb-6">
                            {project.title}
                        </h1>
                        {project.excerpt && (
                            <p className="text-base sm:text-lg text-[#D6D2C8] leading-relaxed font-light">
                                {project.excerpt}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Project Meta Details Bar */}
            <section className="bg-white border-b border-[#E8DFC8] py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        {project.client && (
                            <div>
                                <span className="text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold block mb-1">
                                    Client
                                </span>
                                <span className="font-medium text-[#1A1A1A]">{project.client}</span>
                            </div>
                        )}
                        {project.location && (
                            <div>
                                <span className="text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold block mb-1">
                                    Location
                                </span>
                                <span className="font-medium text-[#1A1A1A]">{project.location}</span>
                            </div>
                        )}
                        {project.project_date && (
                            <div>
                                <span className="text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold block mb-1">
                                    Date
                                </span>
                                <span className="font-medium text-[#1A1A1A]">{formatDate(project.project_date)}</span>
                            </div>
                        )}
                        {project.tags && project.tags.length > 0 && (
                            <div>
                                <span className="text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold block mb-1">
                                    Disciplines
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {project.tags.map((tag) => (
                                        <span key={tag.id} className="text-xs bg-[#FBF6EC] text-[#8A6A16] px-2 py-0.5 rounded">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content & Gallery */}
            <section className="py-16 bg-[#FFFFFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Primary Hero Media */}
                    <div className="mb-16 rounded-2xl overflow-hidden shadow-xl border border-[#E8DFC8]">
                        {project.video_url ? (
                            <div className="aspect-video bg-black flex items-center justify-center relative">
                                <iframe
                                    src={project.video_url.replace('watch?v=', 'embed/')}
                                    title={project.title}
                                    className="w-full h-full"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <img
                                src={project.cover_image}
                                alt={project.title}
                                className="w-full max-h-[750px] object-cover"
                            />
                        )}
                    </div>

                    {/* Case Study Body */}
                    {project.body && (
                        <div className="max-w-3xl mx-auto mb-20">
                            <GoldDivider label="CASE STUDY" diamondSize={5} className="mb-4" />
                            <div
                                className="prose prose-lg prose-headings:font-serif prose-headings:text-[#1A1A1A] prose-p:text-[#5C5850] prose-p:leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: project.body }}
                            />
                        </div>
                    )}

                    {/* Project Gallery Items */}
                    {project.media && project.media.length > 0 && (
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <GoldDivider label="IMAGE ARCHIVE" diamondSize={5} className="mb-2" />
                                <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                                    Project Gallery
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {project.media.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setLightboxImage(item.path_or_url)}
                                        className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-[#FBF6EC] border border-[#E8DFC8] cursor-pointer shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <img
                                            src={item.path_or_url}
                                            alt={item.caption || project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-10 h-10 rounded-none bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-[#8A6A16]">
                                                <Maximize2 size={18} />
                                            </div>
                                        </div>
                                        {item.caption && (
                                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white text-xs">
                                                {item.caption}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Book This Style CTA */}
                    <div className="bg-[#FBF6EC] rounded-3xl p-10 md:p-16 border border-[#E8DFC8] text-center max-w-4xl mx-auto my-16 shadow-xs">
                        <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-3">
                            Envisioning a Similar Visual Masterpiece?
                        </h3>
                        <p className="text-sm sm:text-base text-[#5C5850] max-w-xl mx-auto mb-6">
                            Let us collaborate to produce timeless photography or cinematic media tailored to your milestone.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-white bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#8A6A16] shadow-[0_4px_14px_rgba(201,162,39,0.25)] hover:shadow-[0_6px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 transition-all"
                        >
                            <Sparkles size={16} />
                            <span>Inquire for This Service</span>
                        </Link>
                    </div>

                    {/* Related Projects */}
                    {relatedProjects && relatedProjects.length > 0 && (
                        <div className="pt-16 border-t border-[#E8DFC8]">
                            <div className="text-center mb-10">
                                <GoldDivider label="DISCOVER MORE" diamondSize={5} className="mb-2" />
                                <h3 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                                    Related Work
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {relatedProjects.map((rel) => (
                                    <PortfolioCard key={rel.id} project={rel} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-6 right-6 text-white hover:text-[#E8C766] p-2"
                        aria-label="Close Lightbox"
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Enlarged view"
                        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                    />
                </div>
            )}
        </PublicLayout>
    );
}
