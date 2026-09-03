import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { CTASection } from '@/Components/public/CTASection';
import { Service } from '@/types';
import {
    Camera,
    Users,
    Heart,
    GraduationCap,
    Sparkles,
    UserCheck,
    Building2,
    Briefcase,
    Package,
    Film,
    Clapperboard,
    Video,
    Radio,
    Compass,
    Mic,
    Palette,
    Maximize2,
    Image as ImageIcon,
    Sparkle,
    ChevronDown,
    ChevronUp,
    Check,
    ArrowRight,
} from 'lucide-react';

interface ServicesProps {
    photographyServices: Service[];
    mediaProductionServices: Service[];
    printCreativeServices: Service[];
    showPricing: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
    Camera: <Camera size={20} />,
    Users: <Users size={20} />,
    Heart: <Heart size={20} />,
    GraduationCap: <GraduationCap size={20} />,
    Sparkles: <Sparkles size={20} />,
    UserCheck: <UserCheck size={20} />,
    Building2: <Building2 size={20} />,
    Briefcase: <Briefcase size={20} />,
    Package: <Package size={20} />,
    Film: <Film size={20} />,
    Clapperboard: <Clapperboard size={20} />,
    Video: <Video size={20} />,
    Radio: <Radio size={20} />,
    Compass: <Compass size={20} />,
    Mic: <Mic size={20} />,
    Palette: <Palette size={20} />,
    Maximize2: <Maximize2 size={20} />,
    Image: <ImageIcon size={20} />,
    Sparkle: <Sparkle size={20} />,
};

export default function Services({
    photographyServices,
    mediaProductionServices,
    printCreativeServices,
    showPricing,
}: ServicesProps) {
    const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedServiceId((prev) => (prev === id ? null : id));
    };

    const renderServicePanel = (
        badge: string,
        title: string,
        description: string,
        services: Service[]
    ) => (
        <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
            {/* Panel Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-[#FBF6EC] border border-[#C9A227] text-[#8A6A16] mb-4">
                <span>{badge}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2">
                {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5850] mb-8 font-light leading-relaxed">
                {description}
            </p>

            {/* Two-Column Icon List with Gold Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {services.map((service) => {
                    const isExpanded = expandedServiceId === service.id;

                    return (
                        <div
                            key={service.id}
                            className="border-b border-[#E8DFC8]/60 pb-3 transition-colors hover:border-[#C9A227]"
                        >
                            <div
                                onClick={() => toggleExpand(service.id)}
                                className="flex items-center justify-between cursor-pointer py-2 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-[#141414] group-hover:text-[#8A6A16] transition-colors">
                                        {iconMap[service.icon] || <Camera size={20} />}
                                    </div>
                                    <span className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors">
                                        {service.title}
                                    </span>
                                </div>
                                <div className="text-[#8A6A16] transition-transform">
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                            </div>

                            {/* Expandable Details Drawer */}
                            {isExpanded && (
                                <div className="mt-2.5 p-4 rounded-xl bg-[#FBF6EC] text-xs text-[#5C5850] animate-in fade-in duration-200">
                                    {service.description && (
                                        <p className="leading-relaxed mb-3">{service.description}</p>
                                    )}

                                    {service.deliverables && service.deliverables.length > 0 && (
                                        <div className="mb-3 space-y-1">
                                            <span className="font-semibold text-[#8A6A16] uppercase tracking-wider text-[10px] block">
                                                Includes:
                                            </span>
                                            {service.deliverables.map((deliv, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <Check size={12} className="text-[#C9A227] shrink-0" />
                                                    <span>{deliv}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {showPricing && service.starting_price && (
                                        <div className="pt-2 border-t border-[#E8DFC8] flex items-center justify-between">
                                            <span className="text-[11px] text-[#5C5850]">Starting from</span>
                                            <span className="font-semibold text-[#8A6A16] text-sm">
                                                {service.starting_price}
                                            </span>
                                        </div>
                                    )}

                                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#E8DFC8]/60">
                                        <Link
                                            href={`/portfolio?category=${service.service_group}`}
                                            className="text-[11px] font-semibold text-[#8A6A16] hover:underline"
                                        >
                                            View Sample Work →
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="px-3 py-1 bg-[#C9A227] text-white rounded text-[11px] font-medium"
                                        >
                                            Inquire
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <PublicLayout title="Services & Disciplines">
            {/* Header */}
            <section className="bg-[#FBF6EC] py-20 border-b border-[#E8DFC8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <GoldDivider label="OUR CRAFT" diamondSize={5} className="mb-3" />
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] tracking-tight">
                        Comprehensive Studio Catalog
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#5C5850] max-w-2xl mx-auto font-light leading-relaxed">
                        Nineteen bespoke services across Photography, Cinema Media Production, and Archival Creative Printing.
                    </p>
                </div>
            </section>

            {/* Three Grouped Panels */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* 1. Photography */}
                    {renderServicePanel(
                        'PHOTOGRAPHY',
                        'Artistic & Commercial Photography',
                        'State-of-the-art studio and environmental portraiture utilizing sculptured illumination, vintage analog tones, and modern editorial finesse.',
                        photographyServices
                    )}

                    {/* 2. Media Production */}
                    {renderServicePanel(
                        'MEDIA PRODUCTION',
                        'Cinema, Broadcast & Aerial Cinematography',
                        'Turnkey visual storytelling from multi-camera 4K livestream broadcasts to aerial drone surveys and commercial documentaries.',
                        mediaProductionServices
                    )}

                    {/* 3. Print & Creative */}
                    {renderServicePanel(
                        'PRINT & CREATIVE',
                        'Archival Printing & Restoration Arts',
                        'Museum-grade giclée canvas wrapping, acrylic mounting, and digital photo restoration breathing eternal life into family memories.',
                        printCreativeServices
                    )}
                </div>
            </section>

            {/* CTA */}
            <CTASection
                title="Require a Custom Production Package?"
                subtitle="Whether arranging multi-day regional conference livestreaming or an intimate studio portrait series, our producers are available to build your custom rate card."
            />
        </PublicLayout>
    );
}
