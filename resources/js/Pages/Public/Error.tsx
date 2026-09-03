import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { BrandLogo } from '@/Components/public/BrandLogo';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { ArrowLeft, Home, Compass, PhoneCall, Sparkles } from 'lucide-react';

interface ErrorProps {
    status?: number;
}

export default function Error({ status = 404 }: ErrorProps) {
    const is404 = status === 404;

    const errorDetails: Record<number, { title: string; subtitle: string; description: string }> = {
        404: {
            title: '404',
            subtitle: 'Page Lost in Focus',
            description: 'The page, project case study, or media gallery you are searching for might have been archived, renamed, or temporarily relocated.',
        },
        403: {
            title: '403',
            subtitle: 'Access Restricted',
            description: 'You do not have the required credentials to access this private studio section or admin route.',
        },
        500: {
            title: '500',
            subtitle: 'Studio Technical Interruption',
            description: 'Our servers encountered an unexpected issue while processing your request. Our technical team has been notified.',
        },
        503: {
            title: '503',
            subtitle: 'Studio Maintenance in Progress',
            description: 'We are currently enhancing our digital gallery systems. Please check back in a few moments.',
        },
    };

    const current = errorDetails[status] || {
        title: String(status),
        subtitle: 'Unexpected Error',
        description: 'An unexpected error occurred while loading this page. Please try again.',
    };

    return (
        <PublicLayout title={`${current.title} — ${current.subtitle}`}>
            <Head>
                <title>{`${current.title} — ${current.subtitle} | Waridi Photo Studio`}</title>
            </Head>

            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#FAF7F0] py-20 px-4 sm:px-6 lg:px-8">
                {/* Subtle Background Glows & Ambient Photography Lighting Circles */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#E8C766]/15 rounded-full blur-3xl pointer-events-none" />

                {/* Decorative Camera Lens Focal Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <div className="w-[320px] sm:w-[460px] md:w-[620px] aspect-square rounded-full border border-[#C9A227]/20 flex items-center justify-center animate-pulse">
                        <div className="w-3/4 aspect-square rounded-full border border-dashed border-[#C9A227]/30" />
                    </div>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    {/* Brand Emblem */}
                    <div className="inline-flex items-center justify-center mb-6">
                        <BrandLogo size="md" />
                    </div>

                    {/* Dramatic Gold 404 Watermark Number */}
                    <div className="relative mb-2">
                        <span className="font-serif text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#C9A227]/60 via-[#E8C766]/40 to-transparent select-none leading-none block">
                            {current.title}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="px-4 py-1.5 rounded-full bg-[#FAF7F0]/90 backdrop-blur-md border border-[#C9A227]/40 text-[#8A6A16] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] shadow-sm">
                                {is404 ? 'Framing Error' : 'System Notice'}
                            </span>
                        </div>
                    </div>

                    <GoldDivider diamondSize={5} className="mb-6 max-w-xs mx-auto" />

                    {/* Subtitle & Descriptive Message */}
                    <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#141414] mb-4 tracking-tight">
                        {current.subtitle}
                    </h1>

                    <p className="text-sm sm:text-base text-[#5C5850] max-w-lg mx-auto font-light leading-relaxed mb-10">
                        {current.description}
                    </p>

                    {/* Quick Interactive Actions */}
                    <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white bg-gradient-to-r from-[#141414] to-[#2B2B2B] hover:from-[#C9A227] hover:to-[#8A6A16] transition-all duration-300 shadow-[0_4px_16px_rgba(20,20,20,0.2)] hover:shadow-[0_6px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 group cursor-pointer"
                        >
                            <Home size={15} />
                            <span>Return to Home</span>
                        </Link>

                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#141414] bg-white border border-[#C9A227]/60 hover:bg-[#FAF7F0] hover:border-[#C9A227] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group cursor-pointer"
                        >
                            <Compass size={15} className="text-[#8A6A16] group-hover:rotate-45 transition-transform duration-300" />
                            <span>Explore Portfolio</span>
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#8A6A16] hover:text-[#141414] transition-colors duration-200"
                        >
                            <PhoneCall size={14} />
                            <span>Contact Studio</span>
                        </Link>
                    </div>

                    {/* Helpful Shortcut Links Strip */}
                    <div className="pt-8 border-t border-[#E8DFC8]/70">
                        <p className="text-xs uppercase font-semibold text-[#8A6A16] tracking-widest mb-3 flex items-center justify-center gap-1.5">
                            <Sparkles size={13} />
                            <span>Popular Destinations</span>
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-[#5C5850]">
                            <Link href="/services" className="hover:text-[#C9A227] transition-colors underline-offset-4 hover:underline">
                                Our Services
                            </Link>
                            <span className="text-[#D3C7AB]">•</span>
                            <Link href="/about" className="hover:text-[#C9A227] transition-colors underline-offset-4 hover:underline">
                                About Waridi
                            </Link>
                            <span className="text-[#D3C7AB]">•</span>
                            <Link href="/livestream" className="hover:text-[#C9A227] transition-colors underline-offset-4 hover:underline">
                                Live Broadcasts
                            </Link>
                            <span className="text-[#D3C7AB]">•</span>
                            <Link href="/journal" className="hover:text-[#C9A227] transition-colors underline-offset-4 hover:underline">
                                Journal & Stories
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
