import React from 'react';
import { useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { ImageUploader } from '@/Components/admin/ImageUploader';
import { Save, Plus, Trash2, Globe, Share2, Compass, LayoutTemplate, Sparkles, Layers, Image as ImageIcon, BookOpen } from 'lucide-react';

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
            // Hero section settings
            hero_eyebrow: settings?.hero_eyebrow || 'EXPERIENCE THE MAGIC OF',
            hero_title: settings?.hero_title || 'WARIDI',
            hero_subline: settings?.hero_subline || 'PHOTO STUDIO & MEDIA',
            hero_bg_image: (settings?.hero_bg_image && !settings.hero_bg_image.includes('images.unsplash.com/photo-1534528741775'))
                ? settings.hero_bg_image
                : '/images/front-banner.webp',
            hero_cta_primary_text: settings?.hero_cta_primary_text || 'View Our Work',
            hero_cta_primary_link: settings?.hero_cta_primary_link || '/portfolio',
            hero_cta_secondary_text: settings?.hero_cta_secondary_text || 'Book a Session',
            hero_cta_secondary_link: settings?.hero_cta_secondary_link || '/contact',
            // Offerings Strip settings
            offerings_title: settings?.offerings_title || 'SIGNATURE STUDIO & PRODUCTION OFFERINGS',
            offerings_items: settings?.offerings_items || [
                { title: 'Studio Portraits', category: 'photography' },
                { title: 'Family Photography', category: 'photography' },
                { title: 'Graduation Photography', category: 'photography' },
                { title: 'Maternity Photography', category: 'photography' },
                { title: 'Wedding Photography', category: 'photography' },
                { title: 'Product Photography', category: 'photography' },
                { title: 'Drone Services', category: 'media_production' },
                { title: 'Canvas Prints', category: 'print_creative' },
            ],
            trust_strip_title: settings?.trust_strip_title || 'TRUSTED BY LEADING INSTITUTIONS, BRANDS & FAMILIES',
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
            why_choose_us: settings?.why_choose_us || [
                {
                    headline: 'Artistic Direction & Precision',
                    blurb: 'Masterful studio illumination, vintage analog tones, and editorial refinement honoring every subject with effortless grace.',
                },
                {
                    headline: 'Tailored to Your Vision',
                    blurb: 'Personalized pre-shoot consultations ensuring every milestone, from intimate maternity portraits to major summits, reflects your identity.',
                },
                {
                    headline: 'Archival Master Delivery',
                    blurb: 'Museum-grade pigment canvas printing and cinema-grade 4K delivery crafted to endure across generations as family heirlooms.',
                },
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
            // About Page
            about_hero_eyebrow: settings?.about_hero_eyebrow || 'OUR HERITAGE',
            about_hero_title: settings?.about_hero_title || 'Where Moments Become Memories',
            about_hero_subtitle: settings?.about_hero_subtitle || 'Named after the Swahili word for rose, Waridi embodies elegance, enduring beauty, and photographic mastery.',
            about_story_eyebrow: settings?.about_story_eyebrow || 'THE STUDIO STORY',
            about_story_title: settings?.about_story_title || 'Capturing the Soul in Every Silhouette',
            about_story_p1: settings?.about_story_p1 || 'Founded in Nairobi, Waridi Photo Studio was born out of a desire to break away from rushed, sterile photographic sessions. We believe that true portraiture is a collaborative dance between light, human emotion, and patience.',
            about_story_p2: settings?.about_story_p2 || 'Over the years, our studio has expanded organically into commercial cinematography, live broadcast coverage, and fine-art printing—yet our core ethos remains unwavering: every moment captured must stand the test of generations.',
            about_story_image: settings?.about_story_image || '',
            about_values: settings?.about_values || [
                { title: 'Authentic Connection', desc: 'We prioritize genuine comfort so your inner grace shines effortlessly.' },
                { title: 'Archival Preservation', desc: 'Every print and digital negative is treated with museum-grade preservation standards.' },
            ],
            about_equipment: settings?.about_equipment || [
                { title: 'Cameras & Optics', desc: 'Hasselblad medium format, Sony FX6 & FX3 cinema cameras, GM prime master lenses' },
                { title: 'Studio Illumination', desc: 'Profoto D2 & B10X monoblocks, Broncolor parabolic reflectors, Matthews C-stands' },
                { title: 'Broadcast & Streaming', desc: 'Blackmagic ATEM Constellation 4K, LiveU bonded cellular transmitters, Shure wireless audio' },
                { title: 'Aerial Fleet', desc: 'DJI Inspire 3 & Mavic 3 Pro Cine with KCAA authorized commercial airspace licenses' },
                { title: 'Archival Giclée Lab', desc: 'Epson SureColor 12-color archival pigment printer, museum rag & Hahnemühle papers' },
            ],
            about_cta_title: settings?.about_cta_title || 'Visit Our Studio Sanctuary',
            about_cta_subtitle: settings?.about_cta_subtitle || 'Book an exploratory tour of our studios or schedule a creative consultation with our team.',
            // Homepage Who We Are & Mission / Vision
            who_we_are_title: settings?.who_we_are_title || 'Who We Are',
            who_we_are_eyebrow: settings?.who_we_are_eyebrow || 'OUR ESSENCE & PURPOSE',
            who_we_are_p1: settings?.who_we_are_p1 || 'Waridi Photo Studio & Media is an independent, premier media production and creative studio offering a comprehensive suite of creative and technical solutions. Over the years, we have built a reputation for reliability, artistic innovation, and unmatched production quality across Kenya and East Africa.',
            who_we_are_p2: settings?.who_we_are_p2 || 'Our work spans fine-art studio photography, multi-camera live streaming, corporate events coverage, documentary films, aerial cinematography, and archival fine art printing. We combine cutting-edge cinema equipment with a passionate, highly skilled crew to bring vision to life — beautifully and efficiently.',
            who_we_are_mission_title: settings?.who_we_are_mission_title || 'Our Mission',
            who_we_are_mission_text: settings?.who_we_are_mission_text || 'To deliver innovative, cinema-grade media production and studio solutions that elevate brands, capture authentic emotion, and shape meaningful visual memories across Africa.',
            who_we_are_vision_title: settings?.who_we_are_vision_title || 'Our Vision',
            who_we_are_vision_text: settings?.who_we_are_vision_text || 'To be Africa’s pre-eminent media production house and photography sanctuary, celebrated for artistic excellence, technological leadership, and lasting cultural impact.',
            who_we_are_image: settings?.who_we_are_image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
            who_we_are_values: settings?.who_we_are_values || ['Reliability', 'Quality', 'Integrity', 'Affordable Rates'],
            // Homepage Featured Portfolio Header
            featured_work_eyebrow: settings?.featured_work_eyebrow || 'CURATED PORTFOLIO',
            featured_work_title: settings?.featured_work_title || 'Selected Masterpieces',
            featured_work_subtitle: settings?.featured_work_subtitle || 'A curated showcase of fine-art studio portraits, high-fashion editorials, heartfelt weddings, and cinematic commercial reels.',
            featured_work_cta_text: settings?.featured_work_cta_text || 'Explore Full Portfolio',
            // Homepage Media Production & Broadcast Division Showcase
            media_prod_badge: settings?.media_prod_badge || 'Media & Broadcast Division',
            media_prod_title: settings?.media_prod_title || 'Cinema-Grade 4K Production & Hybrid Livestreaming',
            media_prod_description: settings?.media_prod_description || 'Beyond the photographic darkroom, Waridi operates a high-capacity media division specializing in multi-camera live broadcasts, documentary storytelling, and KCAA-certified drone cinematography for regional summits and global brands.',
            media_prod_image: settings?.media_prod_image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
            media_prod_primary_text: settings?.media_prod_primary_text || 'View Livestreams',
            media_prod_primary_link: settings?.media_prod_primary_link || '/livestream',
            media_prod_secondary_text: settings?.media_prod_secondary_text || 'Production Specs',
            media_prod_secondary_link: settings?.media_prod_secondary_link || '/services',
            // Homepage Testimonials & Journal Headers
            testimonials_eyebrow: settings?.testimonials_eyebrow || 'PATRON WORDS',
            testimonials_title: settings?.testimonials_title || 'Words from Our Cherished Clients',
            journal_eyebrow: settings?.journal_eyebrow || 'THE JOURNAL',
            journal_title: settings?.journal_title || 'Behind the Lens & Studio Stories',
            journal_cta_text: settings?.journal_cta_text || 'Read All Articles',
            // Homepage CTA Section Customizer
            cta_title: settings?.cta_title || 'Ready to Immortalize Your Moments?',
            cta_subtitle: settings?.cta_subtitle || 'Book your luxury studio session, wedding coverage, or cinematic production consultation today.',
            cta_button_text: settings?.cta_button_text || 'Reserve Your Session',
            cta_button_link: settings?.cta_button_link || '/contact',
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

    const updateWhyChooseUs = (index: number, key: 'headline' | 'blurb', value: string) => {
        const list = [...(data.settings.why_choose_us || [])];
        list[index][key] = value;
        updateField('why_choose_us', list);
    };

    const addWhyChooseUs = () => {
        updateField('why_choose_us', [
            ...(data.settings.why_choose_us || []),
            { headline: 'New Value Proposition', blurb: 'Description of studio capability or customer commitment.' },
        ]);
    };

    const removeWhyChooseUs = (index: number) => {
        updateField(
            'why_choose_us',
            (data.settings.why_choose_us || []).filter((_: any, i: number) => i !== index)
        );
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

    const updateOfferingItem = (index: number, key: 'title' | 'category', value: string) => {
        const items = [...data.settings.offerings_items];
        items[index][key] = value;
        updateField('offerings_items', items);
    };

    const addOfferingItem = () => {
        updateField('offerings_items', [...data.settings.offerings_items, { title: 'New Service', category: 'photography' }]);
    };

    const removeOfferingItem = (index: number) => {
        updateField('offerings_items', data.settings.offerings_items.filter((_: any, i: number) => i !== index));
    };

    // About page helpers
    const updateAboutValue = (index: number, key: 'title' | 'desc', value: string) => {
        const list = [...(data.settings.about_values || [])];
        list[index][key] = value;
        updateField('about_values', list);
    };
    const addAboutValue = () => {
        updateField('about_values', [...(data.settings.about_values || []), { title: 'New Value', desc: 'Description.' }]);
    };
    const removeAboutValue = (index: number) => {
        updateField('about_values', (data.settings.about_values || []).filter((_: any, i: number) => i !== index));
    };

    const updateEquipment = (index: number, key: 'title' | 'desc', value: string) => {
        const list = [...(data.settings.about_equipment || [])];
        list[index][key] = value;
        updateField('about_equipment', list);
    };
    const addEquipment = () => {
        updateField('about_equipment', [...(data.settings.about_equipment || []), { title: 'New Capability', desc: 'Details about this capability.' }]);
    };
    const removeEquipment = (index: number) => {
        updateField('about_equipment', (data.settings.about_equipment || []).filter((_: any, i: number) => i !== index));
    };

    const updateWhoWeAreValue = (index: number, val: string) => {
        const values = [...(data.settings.who_we_are_values || [])];
        values[index] = val;
        updateField('who_we_are_values', values);
    };
    const addWhoWeAreValue = () => {
        updateField('who_we_are_values', [...(data.settings.who_we_are_values || []), 'New Value']);
    };
    const removeWhoWeAreValue = (index: number) => {
        updateField('who_we_are_values', (data.settings.who_we_are_values || []).filter((_: any, i: number) => i !== index));
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
                            Configure site logos, homepage hero banner, signature offerings, navigation menus, footer copy, social media channels, contact details, and SEO.
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
                    {/* Homepage Hero Section Customizer */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <Sparkles size={18} className="text-[#C9A227]" />
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                Homepage Hero Banner
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Eyebrow Ribbon Text
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.hero_eyebrow}
                                    onChange={(e) => updateField('hero_eyebrow', e.target.value)}
                                    placeholder="e.g. EXPERIENCE THE MAGIC OF"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Main Hero Title
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.hero_title}
                                    onChange={(e) => updateField('hero_title', e.target.value)}
                                    placeholder="e.g. WARIDI"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm font-serif font-bold text-[#8A6A16]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Hero Subline
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.hero_subline}
                                    onChange={(e) => updateField('hero_subline', e.target.value)}
                                    placeholder="e.g. PHOTO STUDIO & MEDIA"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>
                        </div>

                        <ImageUploader
                            label="Homepage Hero Banner Image"
                            description="Main studio banner graphic (defaults to /images/front-banner.webp)"
                            value={data.settings.hero_bg_image}
                            onChange={(url) => updateField('hero_bg_image', url)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3">
                                <h3 className="text-xs uppercase font-semibold text-[#8A6A16]">Primary Button (Gold CTA)</h3>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#5C5850] mb-1">Button Label</label>
                                    <input
                                        type="text"
                                        value={data.settings.hero_cta_primary_text}
                                        onChange={(e) => updateField('hero_cta_primary_text', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#5C5850] mb-1">Destination URL</label>
                                    <input
                                        type="text"
                                        value={data.settings.hero_cta_primary_link}
                                        onChange={(e) => updateField('hero_cta_primary_link', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3">
                                <h3 className="text-xs uppercase font-semibold text-[#8A6A16]">Secondary Button (Outline CTA)</h3>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#5C5850] mb-1">Button Label</label>
                                    <input
                                        type="text"
                                        value={data.settings.hero_cta_secondary_text}
                                        onChange={(e) => updateField('hero_cta_secondary_text', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#5C5850] mb-1">Destination URL</label>
                                    <input
                                        type="text"
                                        value={data.settings.hero_cta_secondary_link}
                                        onChange={(e) => updateField('hero_cta_secondary_link', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Homepage Signature Offerings Strip Customizer */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC8]">
                            <div className="flex items-center gap-2">
                                <Layers size={18} className="text-[#C9A227]" />
                                <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                    Homepage Signature Offerings Strip
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={addOfferingItem}
                                className="inline-flex items-center gap-1 text-xs text-[#8A6A16] font-semibold hover:text-[#141414]"
                            >
                                <Plus size={14} /> Add Offering Item
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Offerings Strip Header Ribbon
                            </label>
                            <input
                                type="text"
                                value={data.settings.offerings_title}
                                onChange={(e) => updateField('offerings_title', e.target.value)}
                                placeholder="e.g. SIGNATURE STUDIO & PRODUCTION OFFERINGS"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm uppercase tracking-wider text-[#8A6A16]"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A]">
                                Circular Offerings Items (Displays icon + title on homepage)
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {data.settings.offerings_items.map((item: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 p-2.5 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8]"
                                    >
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => updateOfferingItem(idx, 'title', e.target.value)}
                                            placeholder="Service title e.g. Studio Portraits"
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs font-semibold bg-white"
                                        />
                                        <select
                                            value={item.category}
                                            onChange={(e) => updateOfferingItem(idx, 'category', e.target.value)}
                                            className="px-2 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                        >
                                            <option value="photography">Photography</option>
                                            <option value="media_production">Media Production</option>
                                            <option value="print_creative">Print & Creative</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => removeOfferingItem(idx)}
                                            className="p-1 text-red-600 hover:text-red-800"
                                            title="Delete offering"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-3 border-t border-[#E8DFC8]">
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Client Logo Marquee Strip Headline
                            </label>
                            <input
                                type="text"
                                value={data.settings.trust_strip_title}
                                onChange={(e) => updateField('trust_strip_title', e.target.value)}
                                placeholder="e.g. TRUSTED BY LEADING INSTITUTIONS, BRANDS & FAMILIES"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm uppercase tracking-wider text-[#8A6A16]"
                            />
                        </div>
                    </div>

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

                    {/* Why Choose Us (3-Column Value Props) */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC8]">
                            <div>
                                <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                    "Why Choose Us" Value Propositions
                                </h2>
                                <p className="text-xs text-[#5C5850] mt-0.5">
                                    Clean 3-column value proposition section displayed on the homepage.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addWhyChooseUs}
                                className="inline-flex items-center gap-1 text-xs text-[#8A6A16] font-semibold hover:text-[#141414]"
                            >
                                <Plus size={14} /> Add Proposition
                            </button>
                        </div>

                        <div className="space-y-4">
                            {(data.settings.why_choose_us || []).map((item: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <input
                                            type="text"
                                            value={item.headline}
                                            onChange={(e) => updateWhyChooseUs(idx, 'headline', e.target.value)}
                                            placeholder="Headline e.g. Artistic Direction & Precision"
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-sm font-serif font-bold text-[#1A1A1A] bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeWhyChooseUs(idx)}
                                            className="p-1.5 text-red-600 hover:text-red-800"
                                            title="Delete Proposition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <textarea
                                        rows={2}
                                        value={item.blurb}
                                        onChange={(e) => updateWhyChooseUs(idx, 'blurb', e.target.value)}
                                        placeholder="One-line blurb explaining this commitment to clients..."
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs text-[#5C5850] bg-white leading-relaxed"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Homepage Who We Are & Mission / Vision Section Customizer */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <Sparkles size={18} className="text-[#C9A227]" />
                            <div>
                                <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                    Homepage "Who We Are", Mission & Vision Section
                                </h2>
                                <p className="text-xs text-[#5C5850] mt-0.5">
                                    Cinematic dark band on the homepage displaying studio narrative, mission, vision, and core values.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Eyebrow Label
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.who_we_are_eyebrow}
                                    onChange={(e) => updateField('who_we_are_eyebrow', e.target.value)}
                                    placeholder="e.g. OUR ESSENCE & PURPOSE"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.who_we_are_title}
                                    onChange={(e) => updateField('who_we_are_title', e.target.value)}
                                    placeholder="e.g. Who We Are"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm font-serif font-bold text-[#8A6A16]"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    First Narrative Paragraph
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.settings.who_we_are_p1}
                                    onChange={(e) => updateField('who_we_are_p1', e.target.value)}
                                    placeholder="Paragraph 1 about the studio history, reputation, and reach..."
                                    className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm leading-relaxed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Second Narrative Paragraph
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.settings.who_we_are_p2}
                                    onChange={(e) => updateField('who_we_are_p2', e.target.value)}
                                    placeholder="Paragraph 2 about cutting-edge equipment, passionate team, and multi-disciplinary services..."
                                    className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Mission & Vision */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#8A6A16] mb-1">
                                        Mission Card Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.settings.who_we_are_mission_title}
                                        onChange={(e) => updateField('who_we_are_mission_title', e.target.value)}
                                        placeholder="Our Mission"
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-sm font-serif font-bold text-[#1A1A1A] bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#5C5850] mb-1">
                                        Mission Statement
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.settings.who_we_are_mission_text}
                                        onChange={(e) => updateField('who_we_are_mission_text', e.target.value)}
                                        placeholder="To deliver innovative, cinema-grade media..."
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs text-[#5C5850] bg-white leading-relaxed"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#8A6A16] mb-1">
                                        Vision Card Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.settings.who_we_are_vision_title}
                                        onChange={(e) => updateField('who_we_are_vision_title', e.target.value)}
                                        placeholder="Our Vision"
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-sm font-serif font-bold text-[#1A1A1A] bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#5C5850] mb-1">
                                        Vision Statement
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.settings.who_we_are_vision_text}
                                        onChange={(e) => updateField('who_we_are_vision_text', e.target.value)}
                                        placeholder="To be Africa’s leading media production and events company..."
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs text-[#5C5850] bg-white leading-relaxed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Uploader */}
                        <ImageUploader
                            label="Production & Studio Behind-the-Scenes Photo"
                            description="Portrait or square photo depicting crew, broadcast gear, or studio camera rig"
                            value={data.settings.who_we_are_image}
                            onChange={(url) => updateField('who_we_are_image', url)}
                        />

                        {/* Core Values */}
                        <div className="space-y-3 pt-2 border-t border-[#E8DFC8]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A]">
                                        Core Values Badges
                                    </label>
                                    <p className="text-xs text-[#5C5850]">
                                        Badges displayed in the Core Values block at the bottom of the section.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addWhoWeAreValue}
                                    className="inline-flex items-center gap-1 text-xs text-[#8A6A16] font-semibold hover:text-[#141414]"
                                >
                                    <Plus size={14} /> Add Value
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                {(data.settings.who_we_are_values || []).map((val: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 p-2 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8]"
                                    >
                                        <input
                                            type="text"
                                            value={val}
                                            onChange={(e) => updateWhoWeAreValue(idx, e.target.value)}
                                            placeholder="e.g. Reliability"
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs font-semibold bg-white text-[#1A1A1A]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeWhoWeAreValue(idx)}
                                            className="p-1 text-red-600 hover:text-red-800"
                                            title="Delete value"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Homepage Curated Portfolio Header Customizer */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <ImageIcon size={18} className="text-[#C9A227]" />
                            <div>
                                <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                    Homepage Curated Portfolio Showcase
                                </h2>
                                <p className="text-xs text-[#5C5850] mt-0.5">
                                    Headings and link text for the featured masterpieces gallery on the landing page.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Eyebrow Label
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.featured_work_eyebrow}
                                    onChange={(e) => updateField('featured_work_eyebrow', e.target.value)}
                                    placeholder="e.g. CURATED PORTFOLIO"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Main Section Headline
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.featured_work_title}
                                    onChange={(e) => updateField('featured_work_title', e.target.value)}
                                    placeholder="e.g. Selected Masterpieces"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm font-serif font-bold text-[#1A1A1A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Description Subtitle
                            </label>
                            <textarea
                                rows={2}
                                value={data.settings.featured_work_subtitle}
                                onChange={(e) => updateField('featured_work_subtitle', e.target.value)}
                                placeholder="A curated showcase of fine-art studio portraits..."
                                className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Bottom "View Full Portfolio" Button Label
                            </label>
                            <input
                                type="text"
                                value={data.settings.featured_work_cta_text}
                                onChange={(e) => updateField('featured_work_cta_text', e.target.value)}
                                placeholder="e.g. Explore Full Portfolio"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm font-semibold"
                            />
                        </div>
                    </div>

                    {/* Homepage Media Production & Broadcast Division Customizer */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <Layers size={18} className="text-[#C9A227]" />
                            <div>
                                <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                    Homepage Media Production & Broadcast Showcase
                                </h2>
                                <p className="text-xs text-[#5C5850] mt-0.5">
                                    Cinematic dark banner dedicated to broadcast gear, 4K livestreams, and drone cinematography.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Badge Ribbon
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.media_prod_badge}
                                    onChange={(e) => updateField('media_prod_badge', e.target.value)}
                                    placeholder="e.g. Media & Broadcast Division"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                    Headline
                                </label>
                                <input
                                    type="text"
                                    value={data.settings.media_prod_title}
                                    onChange={(e) => updateField('media_prod_title', e.target.value)}
                                    placeholder="e.g. Cinema-Grade 4K Production & Hybrid Livestreaming"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm font-serif font-bold text-[#1A1A1A]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Narrative Description
                            </label>
                            <textarea
                                rows={3}
                                value={data.settings.media_prod_description}
                                onChange={(e) => updateField('media_prod_description', e.target.value)}
                                placeholder="Beyond the photographic darkroom, Waridi operates..."
                                className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm leading-relaxed"
                            />
                        </div>

                        <ImageUploader
                            label="Media Production Feature Image"
                            description="High-resolution cinema, broadcast rig, or live control room photograph"
                            value={data.settings.media_prod_image}
                            onChange={(url) => updateField('media_prod_image', url)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3">
                                <h3 className="text-xs uppercase font-semibold text-[#8A6A16]">Primary Button</h3>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Text</label>
                                    <input
                                        type="text"
                                        value={data.settings.media_prod_primary_text}
                                        onChange={(e) => updateField('media_prod_primary_text', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Link URL</label>
                                    <input
                                        type="text"
                                        value={data.settings.media_prod_primary_link}
                                        onChange={(e) => updateField('media_prod_primary_link', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3">
                                <h3 className="text-xs uppercase font-semibold text-[#8A6A16]">Secondary Button</h3>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Text</label>
                                    <input
                                        type="text"
                                        value={data.settings.media_prod_secondary_text}
                                        onChange={(e) => updateField('media_prod_secondary_text', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Link URL</label>
                                    <input
                                        type="text"
                                        value={data.settings.media_prod_secondary_link}
                                        onChange={(e) => updateField('media_prod_secondary_link', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Homepage Testimonials & Journal Headers Customizer */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <Sparkles size={18} className="text-[#C9A227]" />
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                Testimonials, Journal & Global CTA Section Headers
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3">
                                <h3 className="text-xs uppercase font-semibold text-[#8A6A16]">Testimonials Header</h3>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Eyebrow</label>
                                    <input
                                        type="text"
                                        value={data.settings.testimonials_eyebrow}
                                        onChange={(e) => updateField('testimonials_eyebrow', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Headline</label>
                                    <input
                                        type="text"
                                        value={data.settings.testimonials_title}
                                        onChange={(e) => updateField('testimonials_title', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs font-serif font-bold bg-white"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-3">
                                <h3 className="text-xs uppercase font-semibold text-[#8A6A16]">Blog / Journal Header</h3>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Eyebrow</label>
                                    <input
                                        type="text"
                                        value={data.settings.journal_eyebrow}
                                        onChange={(e) => updateField('journal_eyebrow', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Headline</label>
                                    <input
                                        type="text"
                                        value={data.settings.journal_title}
                                        onChange={(e) => updateField('journal_title', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs font-serif font-bold bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">Button Text</label>
                                    <input
                                        type="text"
                                        value={data.settings.journal_cta_text}
                                        onChange={(e) => updateField('journal_cta_text', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8] space-y-4">
                            <h3 className="text-xs uppercase font-semibold text-[#8A6A16]">Global Pre-Footer Call to Action (CTA) Banner</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">CTA Headline</label>
                                    <input
                                        type="text"
                                        value={data.settings.cta_title}
                                        onChange={(e) => updateField('cta_title', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs font-serif font-bold bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">CTA Button Text</label>
                                    <input
                                        type="text"
                                        value={data.settings.cta_button_text}
                                        onChange={(e) => updateField('cta_button_text', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">CTA Subtitle</label>
                                    <textarea
                                        rows={2}
                                        value={data.settings.cta_subtitle}
                                        onChange={(e) => updateField('cta_subtitle', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white leading-relaxed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-1">CTA Button Link URL</label>
                                    <input
                                        type="text"
                                        value={data.settings.cta_button_link}
                                        onChange={(e) => updateField('cta_button_link', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs bg-white"
                                    />
                                </div>
                            </div>
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

                    {/* ── About Page Content ─────────────────────────────── */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFC8]">
                            <BookOpen size={18} className="text-[#C9A227]" />
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">About Page Content</h2>
                        </div>

                        {/* Hero block */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6A16] mb-3">Hero Block</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">Eyebrow Label</label>
                                    <input type="text" value={data.settings.about_hero_eyebrow}
                                        onChange={(e) => updateField('about_hero_eyebrow', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">Hero Headline</label>
                                    <input type="text" value={data.settings.about_hero_title}
                                        onChange={(e) => updateField('about_hero_title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">Hero Subtitle</label>
                                <textarea rows={2} value={data.settings.about_hero_subtitle}
                                    onChange={(e) => updateField('about_hero_subtitle', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm resize-none" />
                            </div>
                        </div>

                        {/* Story block */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6A16] mb-3">Studio Story Section</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">Section Eyebrow</label>
                                    <input type="text" value={data.settings.about_story_eyebrow}
                                        onChange={(e) => updateField('about_story_eyebrow', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">Section Headline</label>
                                    <input type="text" value={data.settings.about_story_title}
                                        onChange={(e) => updateField('about_story_title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm" />
                                </div>
                            </div>
                            <div className="mt-4 space-y-3">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">Paragraph 1</label>
                                    <textarea rows={3} value={data.settings.about_story_p1}
                                        onChange={(e) => updateField('about_story_p1', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm resize-none" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">Paragraph 2</label>
                                    <textarea rows={3} value={data.settings.about_story_p2}
                                        onChange={(e) => updateField('about_story_p2', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm resize-none" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">Story Section Image</label>
                                    <ImageUploader
                                        value={data.settings.about_story_image}
                                        onChange={(url) => updateField('about_story_image', url)}
                                        label="Story Image"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Values cards */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6A16]">Studio Values Cards</p>
                                <button type="button" onClick={addAboutValue}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-[#C9A227] text-[#8A6A16] hover:bg-[#FBF6EC] transition-colors">
                                    <Plus size={13} /> Add Value
                                </button>
                            </div>
                            <div className="space-y-3">
                                {(data.settings.about_values || []).map((item: any, idx: number) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8]">
                                        <div>
                                            <label className="block text-xs text-[#5C5850] mb-1">Title</label>
                                            <input type="text" value={item.title}
                                                onChange={(e) => updateAboutValue(idx, 'title', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-[#E8DFC8] text-sm" />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block text-xs text-[#5C5850] mb-1">Description</label>
                                                <input type="text" value={item.desc}
                                                    onChange={(e) => updateAboutValue(idx, 'desc', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-[#E8DFC8] text-sm" />
                                            </div>
                                            <button type="button" onClick={() => removeAboutValue(idx)}
                                                className="mt-5 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Equipment list */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6A16]">Capabilities & Equipment</p>
                                <button type="button" onClick={addEquipment}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-[#C9A227] text-[#8A6A16] hover:bg-[#FBF6EC] transition-colors">
                                    <Plus size={13} /> Add Item
                                </button>
                            </div>
                            <div className="space-y-3">
                                {(data.settings.about_equipment || []).map((item: any, idx: number) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[#FBF6EC] rounded-xl border border-[#E8DFC8]">
                                        <div>
                                            <label className="block text-xs text-[#5C5850] mb-1">Category Title</label>
                                            <input type="text" value={item.title}
                                                onChange={(e) => updateEquipment(idx, 'title', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-[#E8DFC8] text-sm" />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block text-xs text-[#5C5850] mb-1">Description</label>
                                                <input type="text" value={item.desc}
                                                    onChange={(e) => updateEquipment(idx, 'desc', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-[#E8DFC8] text-sm" />
                                            </div>
                                            <button type="button" onClick={() => removeEquipment(idx)}
                                                className="mt-5 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA block */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6A16] mb-3">Page CTA Block</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">CTA Headline</label>
                                    <input type="text" value={data.settings.about_cta_title}
                                        onChange={(e) => updateField('about_cta_title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">CTA Subtitle</label>
                                    <input type="text" value={data.settings.about_cta_subtitle}
                                        onChange={(e) => updateField('about_cta_subtitle', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm" />
                                </div>
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
