import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { CTASection } from '@/Components/public/CTASection';
import { LivestreamEvent } from '@/types';
import { formatDate } from '@/lib/utils';
import { Radio, Calendar, ExternalLink, Play, Clock, CheckCircle2 } from 'lucide-react';

interface LivestreamProps {
    liveEvents: LivestreamEvent[];
    upcomingEvents: LivestreamEvent[];
    pastEvents: LivestreamEvent[];
}

export default function Livestream({
    liveEvents,
    upcomingEvents,
    pastEvents,
}: LivestreamProps) {
    const hasLive = liveEvents.length > 0;

    return (
        <PublicLayout title="Live Broadcasts & Streaming">
            {/* Hero */}
            <section className="bg-[#141414] text-white py-20 border-b border-[#2A2A2A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9432E]/20 border border-[#C9432E]/50 text-[#F57362] text-xs uppercase tracking-widest font-semibold mb-4">
                        <Radio size={14} className={hasLive ? 'animate-pulse text-[#C9432E]' : ''} />
                        <span>{hasLive ? 'Broadcast Live Now' : 'Broadcast Schedule'}</span>
                    </div>
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                        Hybrid Events & 4K Livestreaming
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#A8A49C] max-w-2xl mx-auto font-light leading-relaxed">
                        Broadcast-grade multi-camera coverage with redundant cellular bonding, real-time lower-thirds, and pristine multi-channel audio.
                    </p>
                </div>
            </section>

            {/* Currently Live Stream Feature (If Active) */}
            {hasLive && (
                <section className="bg-black py-12 border-b border-[#2A2A2A]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {liveEvents.map((event) => (
                            <div key={event.id} className="bg-[#1C1C1C] rounded-3xl overflow-hidden border border-[#C9432E]/50 shadow-2xl p-4 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-3 h-3 rounded-full bg-[#C9432E] animate-ping" />
                                        <span className="text-xs uppercase tracking-widest font-bold text-[#F57362]">
                                            STREAMING LIVE
                                        </span>
                                    </div>
                                    <span className="text-xs text-[#A8A49C]">
                                        Platform: {event.platform.toUpperCase()}
                                    </span>
                                </div>

                                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 shadow-inner">
                                    <iframe
                                        src={event.stream_url.replace('watch?v=', 'embed/')}
                                        title={event.title}
                                        className="w-full h-full"
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>

                                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                                    {event.title}
                                </h2>
                                {event.description && (
                                    <p className="text-sm text-[#A8A49C] leading-relaxed mb-4">
                                        {event.description}
                                    </p>
                                )}
                                {event.client_name && (
                                    <p className="text-xs text-[#E8C766]">
                                        Client: {event.client_name}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Upcoming Streams Schedule */}
            <section className="py-16 bg-[#FFFFFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <GoldDivider label="UPCOMING SCHEDULE" diamondSize={5} className="mb-2" />
                        <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                            Scheduled Broadcasts
                        </h2>
                    </div>

                    {upcomingEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-[#FBF6EC] rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] flex flex-col justify-between hover:border-[#C9A227] transition-all"
                                >
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-[#8A6A16] mb-3">
                                            <Clock size={15} />
                                            <span>{formatDate(event.scheduled_at)}</span>
                                        </div>
                                        <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
                                            {event.title}
                                        </h3>
                                        {event.description && (
                                            <p className="text-sm text-[#5C5850] line-clamp-3 mb-4 leading-relaxed">
                                                {event.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-between">
                                        <span className="text-xs text-[#5C5850]">
                                            Host: {event.client_name || 'Waridi Media'}
                                        </span>
                                        <a
                                            href={event.stream_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-semibold uppercase tracking-wider text-[#8A6A16] bg-white hover:bg-[#F5EFE1] border border-[#E8DFC8] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm hover:-translate-y-0.5 transition-all"
                                        >
                                            <span>Stream Portal</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-[#FBF6EC] rounded-2xl border border-[#E8DFC8] max-w-xl mx-auto">
                            <p className="font-serif text-xl text-[#1A1A1A]">No public streams scheduled at this time.</p>
                            <p className="text-xs text-[#5C5850] mt-1">Inquire below to book a live broadcast setup.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Past Completed Broadcasts */}
            {pastEvents.length > 0 && (
                <section className="py-16 bg-[#FBF6EC] border-t border-[#E8DFC8]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-xl mx-auto mb-12">
                            <GoldDivider label="ARCHIVE" diamondSize={5} className="mb-2" />
                            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                                Completed Stream Recordings
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pastEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white rounded-xl overflow-hidden border border-[#E8DFC8] shadow-xs"
                                >
                                    <div className="aspect-video bg-[#141414] relative">
                                        {event.cover_image ? (
                                            <img
                                                src={event.cover_image}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/30">
                                                <Radio size={36} />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-none text-[10px] uppercase font-bold text-white flex items-center gap-1.5 shadow-sm border border-white/10">
                                            <CheckCircle2 size={12} className="text-green-400" />
                                            <span>Archived</span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-serif font-bold text-base text-[#1A1A1A] line-clamp-1 mb-1">
                                            {event.title}
                                        </h4>
                                        <p className="text-xs text-[#8A6A16] mb-3">
                                            {formatDate(event.scheduled_at)}
                                        </p>
                                        <a
                                            href={event.stream_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] bg-[#FBF6EC] hover:bg-[#F5EFE1] border border-[#E8DFC8] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm hover:-translate-y-0.5 transition-all"
                                        >
                                            <span>Watch Recording</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Book Livestream CTA */}
            <CTASection
                variant="dark"
                title="Planning a Hybrid Conference or Live Launch?"
                subtitle="Book our multi-camera OB van and broadcast switching engineers to deliver a flawless live viewing experience."
                buttonText="Request Livestream Quote"
                buttonLink="/contact"
            />
        </PublicLayout>
    );
}
