import React from 'react';
import { useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { ImageUploader } from '@/Components/admin/ImageUploader';
import { Save, Plus, Trash2, Globe, Share2, Compass, LayoutTemplate } from 'lucide-react';

interface SettingsEditProps {
    settings: Record<string, any>;
}

export default function SettingsEdit({ settings }: SettingsEditProps) {
    const { data, setData, put, processing } = useForm({
        settings: {
            company_name: settings?.company_name || 'Waridi Photo Studio',
            tagline: settings?.tagline || 'Where Moments Become Memories',
            logo_url: settings?.logo_url || '/images/waridi-logo.jpg',
            dark_logo_url: settings?.dark_logo_url || '',
            contact_email: settings?.contact_email || 'info@waridimedia.com',
            contact_phone: settings?.contact_phone || '+254 700 123 456',
            address: settings?.address || 'Ngong Road, Nairobi, Kenya',
            opening_hours: settings?.opening_hours || 'Mon - Sat: 8:30 AM - 6:30 PM',
            show_public_pricing: settings?.show_public_pricing ?? true,
            stats: settings?.stats || [
                { label: 'Years Active', value: '8+' },
                { label: 'Sessions Delivered', value: '2,500+' },
                { label: 'Happy Clients', value: '1,800+' },
                { label: 'Media Productions', value: '320+' },
            ],
            social_links: {
                instagram: settings?.social_links?.instagram ?? 'https://www.instagram.com/waridiphotostudioruiru?igsi=Y2sxang5bzZ6bGpu',
                facebook: settings?.social_links?.facebook ?? 'https://web.facebook.com/waridimedia?rdid=mljn9jOGkTB2w8VX&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1GGKEBi2FN%2F%3F_rdc%3D1%26_rdr',
                tiktok: settings?.social_links?.tiktok ?? 'https://www.tiktok.com/@waridistudio',
                youtube: settings?.social_links?.youtube ?? '',
            },
            nav_links: settings?.nav_links || [
                { label: 'Work', href: '/portfolio' },
                { label: 'Services', href: '/services' },
                { label: 'About', href: '/about' },
                { label: 'Livestream', href: '/livestream' },
                { label: 'Journal', href: '/journal' },
                { label: 'Contact', href: '/contact' },
            ],
            footer_description: settings?.footer_description || 'Premier East African photography studio, cinema media production, and archival fine art printing. Crafting timeless visual memories with uncompromised artistic devotion.',
            footer_copyright: settings?.footer_copyright || 'Waridi Photo Studio & Media. All rights reserved.',
            seo_default_title: settings?.seo_default_title || 'Waridi Photo Studio & Media',
            seo_default_description: settings?.seo_default_description || 'Where Moments Become Memories',
            seo_default_og_image: settings?.seo_default_og_image || '',
        },
    });

    const updateField = (field: string, value: any) => {
        setData('settings', { ...data.settings, [field]: value });
    };

    const updateSocial = (network: string, value: string) => {
        setData('settings', {
            ...data.settings,
            social_links: {
                ...data.settings.social_links,
                [network]: value,
            },
        });
    };

    const updateStat = (index: number, key: 'label' | 'value', value: string) => {
        const stats = [...data.settings.stats];
        stats[index][key] = value;
        updateField('stats', stats);
    };

    const addStat = () => {
        updateField('stats', [...data.settings.stats, { label: 'New Metric', value: '100+' }]);
    };

    const removeStat = (index: number) => {
        updateField('stats', data.settings.stats.filter((_: any, i: number) => i !== index));
    };

    const updateNavLink = (index: number, key: 'label' | 'href', value: string) => {
        const links = [...data.settings.nav_links];
        links[index][key] = value;
        updateField('nav_links', links);
    };

    const addNavLink = () => {
        updateField('nav_links', [...data.settings.nav_links, { label: 'New Page', href: '/' }]);
    };

    const removeNavLink = (index: number) => {
        updateField('nav_links', data.settings.nav_links.filter((_: any, i: number) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/settings');
    };

    return (
        <AdminLayout title="Studio Settings">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                            Studio Settings & Brand Defaults
                        </h1>
                        <p className="text-xs text-[#5C5850] mt-1">
                            Configure site logos, navigation menus, footer copy, social media channels, contact details, and SEO.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_4px_14px_rgba(20,20,20,0.18)] hover:shadow-[0_6px_20px_rgba(20,20,20,0.25)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                    >
                        <Save size={15} />
                        <span>{processing ? 'Saving...' : 'Save Settings'}</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Brand Logos */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <LayoutTemplate size={18} className="text-[#C9A227]" />
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                Brand Logos (Header & Footer)
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ImageUploader
                                label="Main Brand Logo"
                                description="Displayed across the website header and navigation"
                                value={data.settings.logo_url}
                                onChange={(url) => updateField('logo_url', url)}
                            />

                            <ImageUploader
                                label="Dark Surface Logo (Optional)"
                                description="Used on dark backgrounds like footer. Defaults to main logo if empty"
                                value={data.settings.dark_logo_url}
                                onChange={(url) => updateField('dark_logo_url', url)}
                            />
                        </div>
                    </div>

                    {/* Brand Identity & Contact */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <Globe size={18} className="text-[#C9A227]" />
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                Brand & Contact Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Studio Company Name
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.company_name}
                                    onChange={(e) => updateField('company_name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Brand Tagline
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.tagline}
                                    onChange={(e) => updateField('tagline', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm font-script text-base text-[#8A6A16]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Primary Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={data.settings.contact_email}
                                    onChange={(e) => updateField('contact_email', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Primary Telephone / WhatsApp
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.contact_phone}
                                    onChange={(e) => updateField('contact_phone', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Studio Physical Address
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.address}
                                    onChange={(e) => updateField('address', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Operating Hours
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.opening_hours}
                                    onChange={(e) => updateField('opening_hours', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <Share2 size={18} className="text-[#C9A227]" />
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                Social Media Channels (Header, Footer, & Contact)
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Instagram Profile URL
                                </label>
                                <input
                                    type="url"
                                    value={data.settings.social_links.instagram}
                                    onChange={(e) => updateSocial('instagram', e.target.value)}
                                    placeholder="https://www.instagram.com/..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Facebook Page URL
                                </label>
                                <input
                                    type="url"
                                    value={data.settings.social_links.facebook}
                                    onChange={(e) => updateSocial('facebook', e.target.value)}
                                    placeholder="https://www.facebook.com/..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    TikTok Profile URL
                                </label>
                                <input
                                    type="url"
                                    value={data.settings.social_links.tiktok}
                                    onChange={(e) => updateSocial('tiktok', e.target.value)}
                                    placeholder="https://www.tiktok.com/@..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    YouTube Channel URL
                                </label>
                                <input
                                    type="url"
                                    value={data.settings.social_links.youtube}
                                    onChange={(e) => updateSocial('youtube', e.target.value)}
                                    placeholder="https://www.youtube.com/@..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu Management */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC8]">
                            <div className="flex items-center gap-2">
                                <Compass size={18} className="text-[#C9A227]" />
                                <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                    Header Navigation Menu
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={addNavLink}
                                className="inline-flex items-center gap-1 text-xs text-[#8A6A16] font-semibold hover:text-[#141414]"
                            >
                                <Plus size={14} /> Add Menu Item
                            </button>
                        </div>

                        <p className="text-xs text-[#5C5850]">
                            Reorder or edit the labels and destination URLs of your main site navigation bar.
                        </p>

                        <div className="space-y-3">
                            {data.settings.nav_links.map((link: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 p-3 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8]"
                                >
                                    <input
                                        type="text"
                                        value={link.label}
                                        onChange={(e) => updateNavLink(idx, 'label', e.target.value)}
                                        placeholder="Label e.g. Work"
                                        className="w-40 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-sm font-semibold bg-white"
                                    />
                                    <input
                                        type="text"
                                        value={link.href}
                                        onChange={(e) => updateNavLink(idx, 'href', e.target.value)}
                                        placeholder="URL path e.g. /portfolio"
                                        className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-sm bg-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNavLink(idx)}
                                        className="p-1 text-red-600 hover:text-red-800"
                                        title="Delete link"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Content & Copyright */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <LayoutTemplate size={18} className="text-[#C9A227]" />
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                Footer Copy & Copyright
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Footer Mission Statement / Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.settings.footer_description}
                                    onChange={(e) => updateField('footer_description', e.target.value)}
                                    placeholder="Enter footer brand summary paragraph..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Copyright Notice
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.footer_copyright}
                                    onChange={(e) => updateField('footer_copyright', e.target.value)}
                                    placeholder="e.g. Waridi Photo Studio & Media. All rights reserved."
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* By The Numbers / Stats Strip */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                "By The Numbers" Metrics
                            </h2>
                            <button
                                type="button"
                                onClick={addStat}
                                className="inline-flex items-center gap-1 text-xs text-[#8A6A16] font-semibold"
                            >
                                <Plus size={14} /> Add Metric
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data.settings.stats.map((stat: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 p-3 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8]"
                                >
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => updateStat(idx, 'value', e.target.value)}
                                        placeholder="Value e.g. 2,500+"
                                        className="w-28 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-sm font-bold bg-white text-[#8A6A16]"
                                    />
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => updateStat(idx, 'label', e.target.value)}
                                        placeholder="Label e.g. Sessions Delivered"
                                        className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeStat(idx)}
                                        className="p-1 text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Catalog Toggles & SEO */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                            Public Catalog & SEO Defaults
                        </h2>

                        <div className="flex items-center gap-3 pb-6 border-b border-[#E8DFC8]">
                            <input
                                type="checkbox"
                                id="pricingToggle"
                                checked={data.settings.show_public_pricing}
                                onChange={(e) => updateField('show_public_pricing', e.target.checked)}
                                className="w-4 h-4 rounded text-[#C9A227] focus:ring-[#C9A227]"
                            />
                            <label htmlFor="pricingToggle" className="text-xs font-semibold text-[#1A1A1A] cursor-pointer">
                                Enable Public Starting Prices on Services Page (Uncheck to make "Request Quote" only)
                            </label>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Default SEO Meta Title
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.seo_default_title}
                                    onChange={(e) => updateField('seo_default_title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Default SEO Meta Description
                                </label>
                                <textarea
                                    rows={2}
                                    value={data.settings.seo_default_description}
                                    onChange={(e) => updateField('seo_default_description', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_4px_14px_rgba(20,20,20,0.18)] hover:shadow-[0_6px_20px_rgba(20,20,20,0.25)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
