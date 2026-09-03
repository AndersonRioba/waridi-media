import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // Disable on touch devices or if reduced motion is preferred
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isTouch || prefersReducedMotion) {
            setIsDisabled(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const interactive = target.closest('a, button, [role="button"], input, select, textarea, .portfolio-card, [data-interactive="true"]');
            setIsHovering(!!interactive);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleElementHover);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleElementHover);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    if (isDisabled || !isVisible) {
        return null;
    }

    return (
        <div
            className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
            }}
        >
            <div
                className={`rounded-full border border-[#C9A227] transition-all duration-200 ease-out flex items-center justify-center ${
                    isHovering
                        ? 'w-12 h-12 bg-[#C9A227]/15 scale-110 border-[#8A6A16]'
                        : 'w-7 h-7 bg-transparent border-[#C9A227]'
                }`}
            >
                <div
                    className={`rounded-full bg-[#C9A227] transition-all duration-150 ${
                        isHovering ? 'w-2 h-2 opacity-90' : 'w-1.5 h-1.5 opacity-60'
                    }`}
                />
            </div>
        </div>
    );
};
