import React from 'react';
import { Link } from '@inertiajs/react';

interface BrandLogoProps {
    variant?: 'light' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    showTagline?: boolean;
    className?: string;
}

/**
 * BrandRoseIcon — kept for backward-compatibility if any file imports it directly.
 * Now simply renders the real logo at icon scale.
 */
export const BrandRoseIcon: React.FC<{ className?: string; size?: number }> = ({
    className = '',
    size = 42,
}) => {
    return (
        <img
            src="/images/waridi-logo.jpg"
            alt="Waridi Media"
            width={size}
            height={size}
            className={`object-contain ${className}`}
            style={{ width: size, height: 'auto' }}
        />
    );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
    variant = 'light',
    size = 'md',
    showTagline = false,
    className = '',
}) => {
    /* Height of the logo image scales with size prop */
    const heights: Record<string, number> = {
        sm: 38,
        md: 52,
        lg: 68,
    };

    const imgEl = (
        <img
            src="/images/waridi-logo.jpg"
            alt="Waridi Media — Where Moments Become Memories"
            height={heights[size]}
            className="object-contain transition-opacity duration-300 group-hover:opacity-90"
            style={{ height: heights[size], width: 'auto' }}
        />
    );

    return (
        <Link href="/" className={`inline-flex items-center group ${className}`}>
            {variant === 'dark' ? (
                /* On dark surfaces give the white-bg logo a subtle dark pill/frame */
                <div
                    className="rounded-sm overflow-hidden bg-[#1E1E1E] ring-1 ring-[#C9A227]/30 px-2 py-0.5"
                    style={{ lineHeight: 0 }}
                >
                    {imgEl}
                </div>
            ) : (
                imgEl
            )}
        </Link>
    );
};
