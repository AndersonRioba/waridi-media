import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { PortfolioCard } from '@/Components/public/PortfolioCard';
import { TestimonialSlider } from '@/Components/public/TestimonialSlider';
import { CTASection } from '@/Components/public/CTASection';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { BrandRoseIcon } from '@/Components/public/BrandLogo';
import { Project, Service, Testimonial, BlogPost, LivestreamEvent } from '@/types';
import {
    ArrowRight,
    Camera,
    Users,
    Heart,
    GraduationCap,
    Sparkles,
    Package,
    Image as ImageIcon,
    Compass,
    Radio,
    Play,
    Calendar,
    ChevronRight,
} from 'lucide-react';

interface HomeProps {
    featuredProjects: Project[];
    iconStripServices: Service[];
    testimonials: Testimonial[];
    recentPosts: BlogPost[];
    activeLive: LivestreamEvent | null;
    settings: Record<string, any>;
}

// Icon mapping helper
const serviceIcons: Record<string, React.ReactNode> = {
    'studio-portraits': <Camera size={22} />,
    'family-photography': <Users size={22} />,
    'maternity-photography': <Heart size={22} />,
    'graduation-photography': <GraduationCap size={22} />,
    'wedding-photography': <Sparkles size={22} />,
    'product-photography': <Package size={22} />,
    'canvas-prints': <ImageIcon size={22} />,
    'drone-services': <Compass size={22} />,
};

export default function Home({
    featuredProjects,
    iconStripServices,
    testimonials,
    recentPosts,
    activeLive,
    settings,
}: HomeProps) {
    const stats = settings?.stats || [
        { label: 'Years of Excellence', value: '8+' },
        { label: 'Sessions Delivered', value: '2,500+' },
        { label: 'Happy Clients', value: '1,800+' },
        { label: 'Media Productions', value: '320+' },
    ];

    return (
        <PublicLayout title="Where Moments Become Memories">
            {/* 1. HERO SECTION */}
            <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#FBF6EC]">
                {/* Background Imagery with Editorial Scrim */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=85"
                        alt="Waridi Studio Luxury Portraiture"
                        className="w-full h-full object-cover object-center opacity-35 filter contrast-[1.05]"
                    />
                    {/* Cream Gradients for visual hierarchy & text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FBF6EC] via-[#FBF6EC]/70 to-[#FBF6EC]/40" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#FBF6EC]/40 to-[#FBF6EC]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
                    {/* Live Broadcast Pill (If currently Live) */}
                    {activeLive && (
                        <Link
                            href="/livestream"
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C9432E]/40 text-[#C9432E] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm animate-pulse"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-[#C9432E]" />
                            <span>Live Now: {activeLive.title}</span>
                            <ChevronRight size={14} />
                        </Link>
                    )}

                    {/* Rose Emblem Accent */}
                    <div className="mb-4">
                        <BrandRoseIcon size={52} />
                    </div>

                    {/* Eyebrow Label */}
                    <GoldDivider label="EXPERIENCE THE MAGIC OF" diamondSize={5} className="mb-3" />

                    {/* Display Serif Headline */}
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none text-[#141414]">
                        <span className="gold-gradient-text drop-shadow-sm">WARIDI</span>
                    </h1>

                    {/* Subline */}
                    <div className="text-sm sm:text-base font-semibold uppercase tracking-[0.35em] text-[#141414] mt-3">
                        PHOTO STUDIO & MEDIA
                    </div>

                    {/* Calligraphic Script Tagline */}
                    <p className="font-script text-3xl sm:text-4xl md:text-5xl text-[#C9A227] mt-4 mb-8">
                        Where Moments Become Memories
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="/portfolio"
                            className="w-full sm:w-auto px-8 py-4 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-white bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#8A6A16] hover:opacity-95 shadow-[0_4px_14px_rgba(201,162,39,0.25)] hover:shadow-[0_6px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <span>View Our Work</span>
                            <ArrowRight size={15} />
                        </Link>

                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-4 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-[#141414] bg-white/95 backdrop-blur-md border border-[#C9A227]/80 hover:bg-[#F5EFE1] shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                        >
                            Book a Session
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. SERVICES ICON STRIP (Faithful to Brand Collateral) */}
            <section className="bg-white border-y border-[#E8DFC8] py-8 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8A6A16] mb-6">
                        SIGNATURE STUDIO & PRODUCTION OFFERINGS
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
                        {iconStripServices.map((service) => (
                            <Link
                                key={service.id}
                                href={`/portfolio?category=${service.service_group}`}
                                className="group flex flex-col items-center p-3 rounded-xl hover:bg-[#FBF6EC] transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-full border border-[#E8DFC8] group-hover:border-[#C9A227] flex items-center justify-center text-[#141414] group-hover:text-[#8A6A16] bg-[#FFFFFF] group-hover:bg-[#F5EFE1] transition-all shadow-sm mb-2.5">
                                    {serviceIcons[service.slug] || <Camera size={20} />}
                                </div>
                                <span className="text-xs font-medium text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors leading-tight">
                                    {service.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. FEATURED WORK GRID */}
            <section className="py-24 bg-[#FFFFFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <GoldDivider label="CURATED PORTFOLIO" diamondSize={5} className="mb-3" />
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                            Selected Masterpieces
                        </h2>
                        <p className="text-sm sm:text-base text-[#5C5850] mt-3">
                            A curated showcase of fine-art studio portraits, high-fashion editorials, heartfelt weddings, and cinematic commercial reels.
                        </p>
                    </div>

                    {/* Work Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.slice(0, 6).map((project) => (
                            <PortfolioCard key={project.id} project={project} />
                        ))}
                    </div>

                    {/* View Full Portfolio Link */}
                    <div className="text-center mt-16">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-[#141414] bg-white border border-[#C9A227] hover:bg-gradient-to-r hover:from-[#E8C766] hover:to-[#C9A227] hover:text-white transition-all shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(201,162,39,0.25)] hover:-translate-y-0.5 group"
                        >
                            <span>Explore Full Portfolio</span>
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. BY THE NUMBERS STRIP (Content-editable via Admin Settings) */}
            <section className="bg-[#FBF6EC] py-16 border-y border-[#E8DFC8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#E8DFC8]">
                        {stats.map((item: any, index: number) => (
                            <div key={index} className="px-4 py-4">
                                <div className="font-serif text-4xl sm:text-5xl font-bold gold-gradient-text mb-2">
                                    {item.value}
                                </div>
                                <div className="text-xs uppercase tracking-wider font-semibold text-[#5C5850]">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. DRAMATIC SECTION BREAK: Media Production & Livestream Focus */}
            <section className="bg-[#141414] text-white py-24 relative overflow-hidden border-y border-[#2A2A2A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8C766]/15 border border-[#E8C766]/30 text-[#E8C766] text-xs uppercase tracking-wider font-medium mb-4">
                                <Radio size={14} className="text-[#C9432E]" />
                                <span>Media & Broadcast Division</span>
                            </div>
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                                Cinema-Grade 4K Production & Hybrid Livestreaming
                            </h2>
                            <p className="text-sm sm:text-base text-[#A8A49C] leading-relaxed mb-6 font-light">
                                Beyond the photographic darkroom, Waridi operates a high-capacity media division specializing in multi-camera live broadcasts, documentary storytelling, and KCAA-certified drone cinematography for regional summits and global brands.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/livestream"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-[#141414] bg-[#E8C766] hover:bg-[#C9A227] shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_16px_rgba(232,199,102,0.4)] hover:-translate-y-0.5 transition-all"
                                >
                                    <Play size={14} fill="currentColor" />
                                    <span>View Livestreams</span>
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-white border border-[#E8C766]/40 hover:border-[#E8C766] shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:shadow-md hover:-translate-y-0.5 transition-all"
                                >
                                    <span>Production Specs</span>
                                </Link>
                            </div>
                        </div>

                        {/* Media Video Graphic */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2A2A2A] aspect-video group">
                            <img
                                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                                alt="Livestreaming control setup"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-[#141414]/40 flex items-center justify-center">
                                <Link
                                    href="/livestream"
                                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-[#E8C766] flex items-center justify-center text-[#E8C766] hover:scale-110 transition-all shadow-lg"
                                >
                                    <Play size={24} fill="currentColor" className="ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. TESTIMONIALS SLIDER */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-4">
                        <GoldDivider label="PATRON WORDS" diamondSize={5} className="mb-2" />
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                            Words from Our Cherished Clients
                        </h2>
                    </div>

                    <TestimonialSlider testimonials={testimonials} />
                </div>
            </section>

            {/* 7. RECENT JOURNAL ARTICLES */}
            {recentPosts.length > 0 && (
                <section className="py-20 bg-[#FBF6EC] border-t border-[#E8DFC8]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                            <div>
                                <GoldDivider label="THE JOURNAL" diamondSize={5} className="mb-2" />
                                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                                    Behind the Lens & Studio Stories
                                </h2>
                            </div>
                            <Link
                                href="/journal"
                                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8A6A16] hover:text-[#141414]"
                            >
                                <span>Read All Articles</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recentPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/journal/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <div className="aspect-[16/10] overflow-hidden bg-[#E8DFC8]">
                                        <img
                                            src={post.cover_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8A6A16] mb-2">
                                            {post.category?.name || 'Journal'}
                                        </div>
                                        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors line-clamp-2 mb-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-[#5C5850] line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. CTA SECTION */}
            <CTASection />
        </PublicLayout>
    );
}
