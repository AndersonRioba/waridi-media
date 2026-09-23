import React, { useEffect, useState } from 'react';

interface ServiceWordRotatorProps {
    words?: string[];
    intervalMs?: number;
    className?: string;
}

const defaultWords = [
    'Wedding Photography',
    'Broadcast 4K Livestreaming',
    'Fine Art Studio Portraits',
    'Aerial Drone Cinematography',
    'Documentary Film Production',
    'Archival Canvas Prints',
    'Maternity & Family Heirlooms',
    'Corporate Executive Headshots',
];

export const ServiceWordRotator: React.FC<ServiceWordRotatorProps> = ({
    words = defaultWords,
    intervalMs = 2600,
    className = '',
}) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
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

    useEffect(() => {
        if (prefersReducedMotion || words.length <= 1) return;

        const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setFade(true);
            }, 300);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [prefersReducedMotion, words, intervalMs]);

    if (prefersReducedMotion) {
        return (
            <div className={`text-center py-1 ${className}`}>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#8A6A16]">
                    {words.slice(0, 4).join(' · ')}
                </span>
            </div>
        );
    }

    return (
        <div className={`h-7 flex items-center justify-center overflow-hidden ${className}`}>
            <span
                className={`text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#8A6A16] transition-all duration-300 transform ${
                    fade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
                }`}
            >
                ✦ {words[index]} ✦
            </span>
        </div>
    );
};
