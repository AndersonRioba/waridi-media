import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BrandLogo } from './BrandLogo';
import { Menu, X, ArrowRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TiktokIcon } from './SocialIcons';

export const SiteHeader: React.FC = () => {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Work', href: '/portfolio' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        { label: 'Livestream', href: '/livestream' },
        { label: 'Journal', href: '/journal' },
        { label: 'Contact', href: '/contact' },
    ];

    const isActive = (href: string) => {
        if (href === '/portfolio' && url.startsWith('/portfolio')) return true;
        if (href === '/journal' && url.startsWith('/journal')) return true;
        return url === href;
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgba(20,20,20,0.06)] border-b border-[#E8DFC8]/60 py-3.5'
                    : 'bg-white/80 md:bg-white/60 backdrop-blur-sm border-b border-[#E8DFC8]/40 py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <BrandLogo size="md" />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            prefetch
                            className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                                isActive(link.href)
                                    ? 'text-[#8A6A16] font-semibold'
                                    : 'text-[#1A1A1A] hover:text-[#C9A227]'
                            }`}
                        >
                            {link.label}
                            {isActive(link.href) && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A227] rounded-full" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Right CTA & Socials */}
                <div className="hidden lg:flex items-center gap-5">
                    <div className="flex items-center gap-2.5 border-r border-[#E8DFC8] pr-5">
                        <a
                            href="https://www.instagram.com/waridiphotostudioruiru?igsi=Y2sxang5bzZ6bGpu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#8A6A16] hover:bg-[#C9A227] hover:text-white transition-all duration-200"
                            aria-label="Waridi Instagram"
                            title="Instagram"
                        >
                            <InstagramIcon size={15} />
                        </a>
                        <a
                            href="https://web.facebook.com/waridimedia?rdid=mljn9jOGkTB2w8VX&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1GGKEBi2FN%2F%3F_rdc%3D1%26_rdr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#8A6A16] hover:bg-[#C9A227] hover:text-white transition-all duration-200"
                            aria-label="Waridi Facebook"
                            title="Facebook"
                        >
                            <FacebookIcon size={15} />
                        </a>
                        <a
                            href="https://www.tiktok.com/@waridistudio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#8A6A16] hover:bg-[#C9A227] hover:text-white transition-all duration-200"
                            aria-label="Waridi TikTok"
                            title="TikTok"
                        >
                            <TiktokIcon size={15} />
                        </a>
                    </div>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-[#141414] border border-[#C9A227] hover:bg-gradient-to-r hover:from-[#E8C766] hover:to-[#C9A227] hover:text-white hover:border-transparent transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(201,162,39,0.25)] hover:-translate-y-0.5 group"
                    >
                        <span>Book a Shoot</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-none text-[#1A1A1A] hover:text-[#C9A227] focus:outline-none"
                        aria-label="Toggle Navigation Menu"
                    >
                        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-x-0 top-full bg-white border-b border-[#E8DFC8] shadow-2xl px-6 py-6 animate-in slide-in-from-top-4 duration-200">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-base font-medium py-2 border-b border-[#E8DFC8]/40 ${
                                    isActive(link.href)
                                        ? 'text-[#8A6A16] font-semibold'
                                        : 'text-[#1A1A1A]'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setMobileOpen(false)}
                            className="mt-2 text-center py-3 rounded-none text-xs font-semibold uppercase tracking-[0.16em] bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#8A6A16] text-white shadow-[0_4px_12px_rgba(201,162,39,0.25)] hover:shadow-lg"
                        >
                            Book a Session
                        </Link>

                        <div className="flex items-center justify-center gap-4 pt-4 mt-2 border-t border-[#E8DFC8]">
                            <a
                                href="https://www.instagram.com/waridiphotostudioruiru?igsi=Y2sxang5bzZ6bGpu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#8A6A16] hover:bg-[#C9A227] hover:text-white transition-all"
                                aria-label="Waridi Instagram"
                            >
                                <InstagramIcon size={17} />
                            </a>
                            <a
                                href="https://web.facebook.com/waridimedia?rdid=mljn9jOGkTB2w8VX&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1GGKEBi2FN%2F%3F_rdc%3D1%26_rdr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#8A6A16] hover:bg-[#C9A227] hover:text-white transition-all"
                                aria-label="Waridi Facebook"
                            >
                                <FacebookIcon size={17} />
                            </a>
                            <a
                                href="https://www.tiktok.com/@waridistudio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#8A6A16] hover:bg-[#C9A227] hover:text-white transition-all"
                                aria-label="Waridi TikTok"
                            >
                                <TiktokIcon size={17} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
