import React from 'react';
import { Link } from '@inertiajs/react';

interface BrandLogoProps {
    variant?: 'light' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    showTagline?: boolean;
    className?: string;
}

export const BrandRoseIcon: React.FC<{ className?: string; size?: number }> = ({
    className = '',
    size = 42,
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="roseGold" x1="10%" y1="10%" x2="90%" y2="90%">
                    <stop offset="0%" stopColor="#E8C766" />
                    <stop offset="50%" stopColor="#C9A227" />
                    <stop offset="100%" stopColor="#8A6A16" />
                </linearGradient>
                <linearGradient id="roseGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5D98B" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#997A1E" />
                </linearGradient>
            </defs>

            {/* Outer Ring */}
            <circle cx="50" cy="50" r="46" stroke="url(#roseGold)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
            <circle cx="50" cy="50" r="43" stroke="url(#roseGold)" strokeWidth="2" />

            {/* Camera Lens Outer Rim */}
            <circle cx="50" cy="50" r="28" stroke="url(#roseGold)" strokeWidth="2" fill="rgba(201, 162, 39, 0.04)" />

            {/* Aperture Blades */}
            <path d="M50 28 L59 43 L45 48 Z" fill="url(#roseGold)" opacity="0.75" />
            <path d="M68 40 L58 53 L51 40 Z" fill="url(#roseGold)" opacity="0.85" />
            <path d="M68 58 L52 62 L55 49 Z" fill="url(#roseGold)" opacity="0.75" />
            <path d="M50 72 L41 57 L55 52 Z" fill="url(#roseGold)" opacity="0.85" />
            <path d="M32 60 L42 47 L49 60 Z" fill="url(#roseGold)" opacity="0.75" />
            <path d="M32 42 L48 38 L45 51 Z" fill="url(#roseGold)" opacity="0.85" />

            {/* Center Aperture Iris */}
            <circle cx="50" cy="50" r="6" fill="#141414" stroke="url(#roseGold)" strokeWidth="1" />

            {/* Swirling Rose Petals encircling the lens */}
            <path
                d="M26 30 C 35 16, 65 14, 76 28 C 84 38, 85 58, 75 70 C 66 81, 40 85, 27 75 C 16 64, 15 42, 26 30"
                stroke="url(#roseGold)"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
            <path
                d="M20 46 C 18 33, 32 20, 50 20 C 70 20, 82 35, 80 52 C 78 68, 64 80, 48 80 C 36 80, 24 73, 20 62"
                stroke="url(#roseGold)"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.9"
            />

            {/* Elegant Leaf Accent */}
            <path
                d="M74 24 C 84 18, 92 20, 93 26 C 94 32, 86 36, 76 33 Z"
                fill="url(#roseGold)"
                opacity="0.95"
            />
            <path d="M75 28 C 83 26, 88 25, 91 26" stroke="#141414" strokeWidth="0.8" opacity="0.6" />
        </svg>
    );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
    variant = 'light',
    size = 'md',
    showTagline = false,
    className = '',
}) => {
    const isDark = variant === 'dark';

    const iconSizes = {
        sm: 34,
        md: 44,
        lg: 56,
    };

    const textSizes = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
    };

    const subSizes = {
        sm: 'text-[9px] tracking-[0.25em]',
        md: 'text-[11px] tracking-[0.3em]',
        lg: 'text-xs tracking-[0.35em]',
    };

    return (
        <Link href="/" className={`inline-flex items-center gap-3.5 group text-left ${className}`}>
            <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
                <BrandRoseIcon size={iconSizes[size]} />
            </div>

            <div className="flex flex-col">
                <span
                    className={`font-serif font-bold uppercase tracking-wider leading-none transition-opacity ${textSizes[size]} ${
                        isDark ? 'text-[#E8C766]' : 'gold-gradient-text'
                    }`}
                >
                    WARIDI
                </span>
                <span
                    className={`font-sans font-semibold uppercase leading-tight mt-1 ${subSizes[size]} ${
                        isDark ? 'text-[#F5EFE1]' : 'text-[#141414]'
                    }`}
                >
                    PHOTO STUDIO
                </span>
                {showTagline && (
                    <span className="font-script text-base text-[#C9A227] mt-0.5 leading-tight">
                        Where Moments Become Memories
                    </span>
                )}
            </div>
        </Link>
    );
};
