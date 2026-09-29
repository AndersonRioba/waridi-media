import React from 'react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { CTASection } from '@/Components/public/CTASection';
import { BrandRoseIcon } from '@/Components/public/BrandLogo';
import { TeamMember } from '@/types';
import { CheckCircle } from 'lucide-react';

interface AboutProps {
    team: TeamMember[];
    settings: Record<string, any>;
}

export default function About({ team, settings }: AboutProps) {
    // Hero
    const heroEyebrow   = settings?.about_hero_eyebrow  || 'OUR HERITAGE';
    const heroTitle     = settings?.about_hero_title     || 'Where Moments Become Memories';
    const heroSubtitle  = settings?.about_hero_subtitle  || 'Named after the Swahili word for rose, Waridi embodies elegance, enduring beauty, and photographic mastery.';

    // Story
    const storyEyebrow  = settings?.about_story_eyebrow || 'THE STUDIO STORY';
    const storyTitle    = settings?.about_story_title    || 'Capturing the Soul in Every Silhouette';
    const storyP1       = settings?.about_story_p1      || 'Founded in Nairobi, Waridi Photo Studio was born out of a desire to break away from rushed, sterile photographic sessions. We believe that true portraiture is a collaborative dance between light, human emotion, and patience.';
    const storyP2       = settings?.about_story_p2      || 'Over the years, our studio has expanded organically into commercial cinematography, live broadcast coverage, and fine-art printing—yet our core ethos remains unwavering: every moment captured must stand the test of generations.';
    const storyImage    = settings?.about_story_image   || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80';

    // Values cards
    const values: { title: string; desc: string }[] = settings?.about_values?.length
        ? settings.about_values
        : [
              { title: 'Authentic Connection', desc: 'We prioritize genuine comfort so your inner grace shines effortlessly.' },
              { title: 'Archival Preservation', desc: 'Every print and digital negative is treated with museum-grade preservation standards.' },
          ];

    // Equipment / capabilities
    const equipment: { title: string; desc: string }[] = settings?.about_equipment?.length
        ? settings.about_equipment
        : [
              { title: 'Cameras & Optics', desc: 'Hasselblad medium format, Sony FX6 & FX3 cinema cameras, GM prime master lenses' },
              { title: 'Studio Illumination', desc: 'Profoto D2 & B10X monoblocks, Broncolor parabolic reflectors, Matthews C-stands' },
              { title: 'Broadcast & Streaming', desc: 'Blackmagic ATEM Constellation 4K, LiveU bonded cellular transmitters, Shure wireless audio' },
              { title: 'Aerial Fleet', desc: 'DJI Inspire 3 & Mavic 3 Pro Cine with KCAA authorized commercial airspace licenses' },
              { title: 'Archival Giclée Lab', desc: 'Epson SureColor 12-color archival pigment printer, museum rag & Hahnemühle papers' },
          ];

    // CTA
    const ctaTitle    = settings?.about_cta_title    || 'Visit Our Studio Sanctuary';
    const ctaSubtitle = settings?.about_cta_subtitle || 'Book an exploratory tour of our studios or schedule a creative consultation with our team.';

    return (
        <PublicLayout title="About Waridi Photo Studio">
            {/* Hero Header */}
            <section className="bg-[#FBF6EC] py-20 border-b border-[#E8DFC8]">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <GoldDivider label={heroEyebrow} diamondSize={5} className="mb-3" />
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] tracking-tight">
                        {heroTitle}
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#5C5850] max-w-2xl mx-auto font-light leading-relaxed">
                        {heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Story & Philosophy */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F5EFE1]">
                                <img
                                    src={storyImage}
                                    alt="Waridi Studio Photographer at work"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating Gold Badge */}
                            <div className="absolute -bottom-8 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-[#E8DFC8] flex items-center gap-4 max-w-xs">
                                <BrandRoseIcon size={46} />
                                <div>
                                    <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Rooted in Artistry</h4>
                                    <p className="text-xs text-[#5C5850]">Crafting heirloom visual stories since 2018</p>
                                </div>
                            </div>
                        </div>

                        {/* Story Text */}
                        <div className="space-y-6">
                            <GoldDivider label={storyEyebrow} diamondSize={5} />
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-tight">
                                {storyTitle}
                            </h2>
                            <p className="text-sm sm:text-base text-[#5C5850] leading-relaxed font-light">
                                {storyP1}
                            </p>
                            <p className="text-sm sm:text-base text-[#5C5850] leading-relaxed font-light">
                                {storyP2}
                            </p>

                            {values.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {values.map((v, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-[#FBF6EC] border border-[#E8DFC8]">
                                            <h4 className="font-serif font-bold text-base text-[#1A1A1A] mb-1">{v.title}</h4>
                                            <p className="text-xs text-[#5C5850]">{v.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24 bg-[#FBF6EC] border-t border-[#E8DFC8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <GoldDivider label="THE MASTERS" diamondSize={5} className="mb-2" />
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                            Meet Our Creative Directors & Artisans
                        </h2>
                        <p className="text-sm text-[#5C5850] mt-3">
                            A collective of passionate visual storytellers, lighting sculptors, and certified cinematographers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-3xl p-6 text-center border border-[#E8DFC8] shadow-xs hover:shadow-lg transition-all group"
                            >
                                <div className="relative w-36 h-36 mx-auto mb-6">
                                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C9A227] animate-[spin_30s_linear_infinite]" />
                                    <div className="w-full h-full rounded-full p-1.5 overflow-hidden">
                                        <img
                                            src={member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                                            alt={member.name}
                                            className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-xs uppercase tracking-wider font-semibold text-[#8A6A16] mt-1 mb-3">
                                    {member.role_title}
                                </p>
                                {member.bio && (
                                    <p className="text-xs text-[#5C5850] leading-relaxed line-clamp-3 font-light">
                                        {member.bio}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment & Capabilities */}
            {equipment.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <GoldDivider label="TECHNICAL EXCELLENCE" diamondSize={5} className="mb-2" />
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                                Studio Capabilities & Gear
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {equipment.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl bg-[#FBF6EC] border border-[#E8DFC8] flex items-start gap-4"
                                >
                                    <div className="w-9 h-9 rounded-full bg-white border border-[#C9A227] flex items-center justify-center text-[#8A6A16] shrink-0 mt-0.5">
                                        <CheckCircle size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-base text-[#1A1A1A] mb-1">{item.title}</h4>
                                        <p className="text-xs text-[#5C5850] leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <CTASection title={ctaTitle} subtitle={ctaSubtitle} />
        </PublicLayout>
    );
}
