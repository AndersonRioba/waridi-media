import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

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
    const { siteSettings } = usePage<PageProps>().props;
    const logoSrc = siteSettings?.logo_url || '/images/waridi-logo.jpg';

    return (
        <img
            src={logoSrc}
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
    const { siteSettings } = usePage<PageProps>().props;
    const defaultLogo = '/images/waridi-logo.jpg';
    
    // Check if a dedicated dark logo is set when on dark backgrounds, else fallback to standard logo
    const logoSrc = (variant === 'dark' && siteSettings?.dark_logo_url)
        ? siteSettings.dark_logo_url
        : (siteSettings?.logo_url || defaultLogo);

    const heights: Record<string, number> = {
        sm: 38,
        md: 52,
        lg: 68,
    };

    const imgEl = (
        <img
            src={logoSrc}
            alt={siteSettings?.company_name || 'Waridi Photo Studio & Media'}
            height={heights[size]}
            className="object-contain transition-opacity duration-300 group-hover:opacity-90"
            style={{ height: heights[size], width: 'auto' }}
        />
    );

    return (
        <Link href="/" className={`inline-flex items-center group ${className}`}>
            {variant === 'dark' ? (
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

