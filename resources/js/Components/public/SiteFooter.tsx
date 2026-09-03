import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BrandLogo } from './BrandLogo';
import { GoldDivider } from './GoldDivider';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from './SocialIcons';
import { PageProps } from '@/types';

export const SiteFooter: React.FC = () => {
    const { siteSettings } = usePage<PageProps>().props;

    const email = siteSettings?.contact_email || 'info@waridimedia.com';
    const phone = siteSettings?.contact_phone || '+254 700 123 456';
    const address = siteSettings?.address || 'Nairobi, Kenya';
    const tagline = siteSettings?.tagline || 'Where Moments Become Memories';
    const footerDescription = siteSettings?.footer_description || 'Premier East African photography studio, cinema media production, and archival fine art printing. Crafting timeless visual memories with uncompromised artistic devotion.';
    const footerCopyright = siteSettings?.footer_copyright || 'Waridi Photo Studio & Media. All rights reserved.';

    const socials = {
        instagram: siteSettings?.social_links?.instagram || 'https://www.instagram.com/waridiphotostudioruiru?igsi=Y2sxang5bzZ6bGpu',
        facebook: siteSettings?.social_links?.facebook || 'https://web.facebook.com/waridimedia?rdid=mljn9jOGkTB2w8VX&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1GGKEBi2FN%2F%3F_rdc%3D1%26_rdr',
        tiktok: siteSettings?.social_links?.tiktok || 'https://www.tiktok.com/@waridistudio',
        youtube: siteSettings?.social_links?.youtube || '',
    };

    return (
        <footer className="bg-[#141414] text-[#FBF6EC] pt-20 pb-12 border-t border-[#2A2A2A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#2A2A2A]">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <BrandLogo variant="dark" size="lg" />
                        <p className="font-script text-2xl text-[#E8C766] pt-2">
                            "{tagline}"
                        </p>
                        <p className="text-sm text-[#A8A49C] max-w-md leading-relaxed">
                            {footerDescription}
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            {socials.instagram && (
                                <a
                                    href={socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#E8C766] hover:bg-[#C9A227] hover:text-[#141414] transition-all"
                                    aria-label="Waridi Instagram"
                                    title="Instagram"
                                >
                                    <InstagramIcon size={17} />
                                </a>
                            )}
                            {socials.facebook && (
                                <a
                                    href={socials.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#E8C766] hover:bg-[#C9A227] hover:text-[#141414] transition-all"
                                    aria-label="Waridi Facebook"
                                    title="Facebook"
                                >
                                    <FacebookIcon size={17} />
                                </a>
                            )}
                            {socials.tiktok && (
                                <a
                                    href={socials.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#E8C766] hover:bg-[#C9A227] hover:text-[#141414] transition-all"
                                    aria-label="Waridi TikTok"
                                    title="TikTok"
                                >
                                    <TiktokIcon size={17} />
                                </a>
                            )}
                            {socials.youtube && (
                                <a
                                    href={socials.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#E8C766] hover:bg-[#C9A227] hover:text-[#141414] transition-all"
                                    aria-label="Waridi YouTube"
                                    title="YouTube"
                                >
                                    <YoutubeIcon size={17} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E8C766] mb-5">
                            Studio
                        </h4>
                        <ul className="space-y-3 text-sm text-[#A8A49C]">
                            <li>
                                <Link href="/portfolio" className="hover:text-[#E8C766] transition-colors">
                                    Selected Work
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-[#E8C766] transition-colors">
                                    Service Catalogue
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#E8C766] transition-colors">
                                    Our Story & Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/livestream" className="hover:text-[#E8C766] transition-colors">
                                    Livestream Broadcasts
                                </Link>
                            </li>
                            <li>
                                <Link href="/journal" className="hover:text-[#E8C766] transition-colors">
                                    Journal & Articles
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E8C766] mb-5">
                            Specialities
                        </h4>
                        <ul className="space-y-3 text-sm text-[#A8A49C]">
                            <li>
                                <Link href="/portfolio?category=photography" className="hover:text-[#E8C766] transition-colors">
                                    Portrait & Family
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio?category=photography&tag=wedding-photography" className="hover:text-[#E8C766] transition-colors">
                                    Weddings & Milestones
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio?category=media_production" className="hover:text-[#E8C766] transition-colors">
                                    Film & Drone Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio?category=print_creative" className="hover:text-[#E8C766] transition-colors">
                                    Canvas & Fine Mounting
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-[#E8C766] transition-colors">
                                    Photo Restoration
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E8C766] mb-5">
                            Connect
                        </h4>
                        <ul className="space-y-3.5 text-sm text-[#A8A49C]">
                            <li className="flex items-start gap-2.5">
                                <MapPin size={16} className="text-[#E8C766] shrink-0 mt-0.5" />
                                <span>{address}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={16} className="text-[#E8C766] shrink-0" />
                                <a href={`tel:${phone}`} className="hover:text-[#E8C766] transition-colors">
                                    {phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={16} className="text-[#E8C766] shrink-0" />
                                <a href={`mailto:${email}`} className="hover:text-[#E8C766] transition-colors">
                                    {email}
                                </a>
                            </li>
                            <li className="pt-2">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#E8C766] hover:text-white transition-colors"
                                >
                                    <span>Inquire Now</span>
                                    <ArrowUpRight size={14} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Strip */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A766E]">
                    <p>© {new Date().getFullYear()} {footerCopyright}</p>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="hover:text-[#E8C766] transition-colors">
                            Staff Portal
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
