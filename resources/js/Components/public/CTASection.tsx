import React from 'react';
import { Link } from '@inertiajs/react';
import { GoldDivider } from './GoldDivider';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
    variant?: 'cream' | 'dark';
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
    variant = 'cream',
    title = 'Ready to Immortalize Your Moments?',
    subtitle = 'Book your luxury studio session, wedding coverage, or cinematic production consultation today.',
    buttonText = 'Reserve Your Session',
    buttonLink = '/contact',
}) => {
    const isDark = variant === 'dark';

    return (
        <section
            className={`py-24 relative overflow-hidden text-center ${
                isDark
                    ? 'bg-[#141414] text-[#FBF6EC] border-y border-[#2A2A2A]'
                    : 'bg-[#FBF6EC] text-[#1A1A1A] border-y border-[#E8DFC8]'
            }`}
        >
            {/* Ambient Background Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <GoldDivider diamondSize={5} className="mb-4" />

                <h2
                    className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
                        isDark ? 'text-[#FBF6EC]' : 'text-[#1A1A1A]'
                    }`}
                >
                    {title}
                </h2>

                <p
                    className={`text-base sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed ${
                        isDark ? 'text-[#A8A49C]' : 'text-[#5C5850]'
                    }`}
                >
                    {subtitle}
                </p>

                <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={buttonLink}
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-none font-semibold uppercase tracking-[0.16em] text-xs text-white bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#8A6A16] hover:opacity-95 transition-all shadow-[0_4px_14px_rgba(201,162,39,0.25)] hover:shadow-[0_6px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5"
                    >
                        <Sparkles size={16} />
                        <span>{buttonText}</span>
                        <ArrowRight size={16} />
                    </Link>

                    <Link
                        href="/portfolio"
                        className={`inline-flex items-center gap-2 px-7 py-4 rounded-none font-semibold uppercase tracking-[0.16em] text-xs transition-all border shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 ${
                            isDark
                                ? 'text-[#FBF6EC] border-[#A8A49C]/40 hover:border-[#E8C766]'
                                : 'text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#C9A227] bg-white'
                        }`}
                    >
                        <span>Explore Our Work</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
