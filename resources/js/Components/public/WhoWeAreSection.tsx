import React from 'react';
import { Check } from 'lucide-react';
import { GoldDivider } from './GoldDivider';

export interface WhoWeAreProps {
    settings?: Record<string, any>;
    darkSection?: boolean;
}

export const WhoWeAreSection: React.FC<WhoWeAreProps> = ({
    settings,
    darkSection = true,
}) => {
    const title = settings?.who_we_are_title || 'Who We Are';
    const eyebrow = settings?.who_we_are_eyebrow || 'OUR ESSENCE & PURPOSE';
    const p1 = settings?.who_we_are_p1 || 'Waridi Photo Studio & Media is an independent, premier media production and creative studio offering a comprehensive suite of creative and technical solutions. Over the years, we have built a reputation for reliability, artistic innovation, and unmatched production quality across Kenya and East Africa.';
    const p2 = settings?.who_we_are_p2 || 'Our work spans fine-art studio photography, multi-camera live streaming, corporate events coverage, documentary films, aerial cinematography, and archival fine art printing. We combine cutting-edge cinema equipment with a passionate, highly skilled crew to bring vision to life — beautifully and efficiently.';

    const missionTitle = settings?.who_we_are_mission_title || 'Our Mission';
    const missionText = settings?.who_we_are_mission_text || 'To deliver innovative, cinema-grade media production and studio solutions that elevate brands, capture authentic emotion, and shape meaningful visual memories across Africa.';

    const visionTitle = settings?.who_we_are_vision_title || 'Our Vision';
    const visionText = settings?.who_we_are_vision_text || 'To be Africa’s pre-eminent media production house and photography sanctuary, celebrated for artistic excellence, technological leadership, and lasting cultural impact.';

    const image = settings?.who_we_are_image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80';

    const coreValues: string[] = settings?.who_we_are_values && settings.who_we_are_values.length > 0
        ? settings.who_we_are_values
        : ['Reliability', 'Quality', 'Integrity', 'Affordable Rates'];

    return (
        <section className="bg-[#141414] text-white py-20 sm:py-28 relative overflow-hidden border-y border-[#2A2A2A]">
            {/* Ambient gold glow elements */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Top Grid: Who We Are text + image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column (7 cols): Heading, accent bar, narrative, and Mission/Vision */}
                    <div className="lg:col-span-7 flex flex-col">
                        {/* Eyebrow */}
                        <div className="mb-2">
                            <GoldDivider label={eyebrow} diamondSize={4} />
                        </div>

                        {/* Title & Brand Accent Bar */}
                        <div className="mb-6">
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FBF6EC]">
                                {title}
                            </h2>
                            {/* Signature accent underline */}
                            <div className="w-16 h-1 bg-gradient-to-r from-[#E8C766] to-[#C9A227] rounded-full mt-3" />
                        </div>

                        {/* Story Paragraphs */}
                        <div className="space-y-4 text-sm sm:text-base text-[#D4CEB8] font-light leading-relaxed mb-10">
                            <p>{p1}</p>
                            <p>{p2}</p>
                        </div>

                        {/* Mission & Vision Columns with vertical gold accent bars */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#262626]">
                            {/* Mission */}
                            <div className="relative pl-5 border-l-2 border-[#C9A227]">
                                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF6EC] mb-2.5">
                                    {missionTitle}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#BDB7A4] font-light leading-relaxed">
                                    {missionText}
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="relative pl-5 border-l-2 border-[#C9A227]">
                                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF6EC] mb-2.5">
                                    {visionTitle}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#BDB7A4] font-light leading-relaxed">
                                    {visionText}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (5 cols): Studio & Production Behind-the-Scenes Photo */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-none">
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#2A2A2A] group relative bg-[#1B1B1B]">
                                <img
                                    src={image}
                                    alt="Waridi Media Production & Camera Setup"
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92] contrast-[1.05]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Soft corner border accent */}
                            <div className="absolute -inset-1 rounded-3xl border border-[#C9A227]/20 pointer-events-none -z-10" />
                        </div>
                    </div>
                </div>

                {/* Bottom Card: Core Values Container */}
                <div className="mt-14 sm:mt-16 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-6 sm:p-8 shadow-xl">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF6EC] mb-5">
                        Core Values
                    </h3>

                    {/* Value Pill Badges */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        {coreValues.map((val, idx) => (
                            <div
                                key={idx}
                                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#242424] border border-[#333333] hover:border-[#C9A227]/60 transition-colors shadow-inner"
                            >
                                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E8C766] to-[#C9A227] flex items-center justify-center text-[#141414] shadow-sm shrink-0">
                                    <Check size={12} strokeWidth={3} />
                                </span>
                                <span className="text-xs sm:text-sm font-medium tracking-wide text-[#FBF6EC]">
                                    {val}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
