import React, { useEffect, useState } from 'react';
import { Client } from '@/types';

interface TrustStripProps {
    clients?: Client[];
    title?: string;
}

export const TrustStrip: React.FC<TrustStripProps> = ({
    clients = [],
    title = 'TRUSTED BY LEADING INSTITUTIONS, BRANDS & FAMILIES',
}) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    if (!clients || clients.length === 0) {
        return null;
    }

    // Duplicate client list to create seamless infinite loop for marquee
    const marqueeItems = [...clients, ...clients, ...clients];

    return (
        <section className="bg-white border-y border-[#E8DFC8] py-8 overflow-hidden relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center">
                <div className="inline-flex items-center gap-3">
                    <span className="w-8 sm:w-16 h-[1px] bg-[#E8DFC8]" />
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A227]" />
                    <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8A6A16]">
                        {title}
                    </p>
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A227]" />
                    <span className="w-8 sm:w-16 h-[1px] bg-[#E8DFC8]" />
                </div>
            </div>

            {prefersReducedMotion ? (
                /* Static wrapped row for reduced motion */
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="group h-12 flex items-center justify-center p-2"
                            title={client.name}
                        >
                            {client.website_url ? (
                                <a
                                    href={client.website_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block"
                                >
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className="h-8 max-w-[140px] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    />
                                </a>
                            ) : (
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="h-8 max-w-[140px] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                /* Smooth continuous horizontal marquee */
                <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                    <div className="animate-marquee items-center gap-12 sm:gap-16">
                        {marqueeItems.map((client, idx) => (
                            <div
                                key={`${client.id}-${idx}`}
                                className="group shrink-0 h-14 flex items-center justify-center px-4"
                                title={client.name}
                            >
                                {client.website_url ? (
                                    <a
                                        href={client.website_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block"
                                    >
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="h-8 sm:h-9 max-w-[160px] object-contain filter grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                        />
                                    </a>
                                ) : (
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className="h-8 sm:h-9 max-w-[160px] object-contain filter grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};
