import React from 'react';

interface GoldDividerProps {
    label?: string;
    className?: string;
    diamondSize?: number;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
    label,
    className = '',
    diamondSize = 6,
}) => {
    return (
        <div className={`inline-flex items-center justify-center gap-3 ${className}`}>
            <span className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-[#C9A227] opacity-70" />
            <span
                className="rotate-45 bg-[#C9A227] shrink-0 inline-block shadow-[0_0_6px_rgba(201,162,39,0.5)]"
                style={{ width: diamondSize, height: diamondSize }}
            />
            {label && (
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#8A6A16] px-1">
                    {label}
                </span>
            )}
            {label && (
                <span
                    className="rotate-45 bg-[#C9A227] shrink-0 inline-block shadow-[0_0_6px_rgba(201,162,39,0.5)]"
                    style={{ width: diamondSize, height: diamondSize }}
                />
            )}
            <span className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-[#C9A227] via-[#C9A227] to-transparent opacity-70" />
        </div>
    );
};
