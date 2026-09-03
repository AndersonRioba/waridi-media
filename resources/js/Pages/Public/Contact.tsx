import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { Service } from '@/types';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface ContactProps {
    services: Service[];
    settings: Record<string, any>;
}

export default function Contact({ services, settings }: ContactProps) {
    const email = settings?.contact_email || 'info@waridimedia.com';
    const phone = settings?.contact_phone || '+254 700 123 456';
    const address = settings?.address || 'Nairobi, Kenya';
    const hours = settings?.opening_hours || 'Mon - Sat: 8:30 AM - 6:30 PM';

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        service_group_interest: 'photography',
        service_interest: '',
        event_date: '',
        message: '',
    });

    const filteredServices = services.filter(
        (s) => s.service_group === data.service_group_interest
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout title="Contact & Studio Booking">
            {/* Header */}
            <section className="bg-[#FBF6EC] py-20 border-b border-[#E8DFC8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <GoldDivider label="COMMISSION OUR ARTISTRY" diamondSize={5} className="mb-3" />
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] tracking-tight">
                        Connect with Waridi Photo Studio
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#5C5850] max-w-2xl mx-auto font-light leading-relaxed">
                        We invite you to discuss your upcoming portraits, wedding celebrations, commercial media production, or archival print projects.
                    </p>
                </div>
            </section>

            {/* Main Contact Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Details */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <GoldDivider label="REACH OUT" diamondSize={4} className="mb-2" />
                                <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">
                                    Studio Sanctuary & Offices
                                </h2>
                                <p className="text-sm text-[#5C5850] leading-relaxed font-light">
                                    Our daylight and darkroom suites are located on Ngong Road, Nairobi. Drop in during studio hours or schedule a private consultation.
                                </p>
                            </div>

                            <div className="space-y-6 pt-2">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FBF6EC] border border-[#E8DFC8]">
                                    <div className="w-10 h-10 rounded-full bg-white border border-[#C9A227] flex items-center justify-center text-[#8A6A16] shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Location</h4>
                                        <p className="text-xs text-[#5C5850] mt-0.5 leading-relaxed">{address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FBF6EC] border border-[#E8DFC8]">
                                    <div className="w-10 h-10 rounded-full bg-white border border-[#C9A227] flex items-center justify-center text-[#8A6A16] shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Telephone & WhatsApp</h4>
                                        <a href={`tel:${phone}`} className="text-xs text-[#8A6A16] font-semibold hover:underline mt-0.5 block">
                                            {phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FBF6EC] border border-[#E8DFC8]">
                                    <div className="w-10 h-10 rounded-full bg-white border border-[#C9A227] flex items-center justify-center text-[#8A6A16] shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Electronic Mail</h4>
                                        <a href={`mailto:${email}`} className="text-xs text-[#8A6A16] font-semibold hover:underline mt-0.5 block">
                                            {email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FBF6EC] border border-[#E8DFC8]">
                                    <div className="w-10 h-10 rounded-full bg-white border border-[#C9A227] flex items-center justify-center text-[#8A6A16] shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Hours of Operation</h4>
                                        <p className="text-xs text-[#5C5850] mt-0.5 leading-relaxed">{hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Inquiry Form */}
                        <div className="lg:col-span-7 bg-[#FBF6EC] rounded-3xl p-8 sm:p-12 border border-[#E8DFC8] shadow-sm">
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2">
                                Send an Inquiry
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5C5850] mb-8 font-light">
                                Fill out the form below and our studio director will reply within 24 hours.
                            </p>

                            {recentlySuccessful && (
                                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-300 text-green-800 flex items-center gap-3 text-sm">
                                    <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                                    <span>Thank you! Your inquiry has been logged. We will contact you shortly.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                                            Your Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g. Brenda Mwangi"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                                        />
                                        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="brenda@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                                        />
                                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                                            Telephone / WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+254 7..."
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                                        />
                                        {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                                            Target Event Date (Optional)
                                        </label>
                                        <input
                                            type="date"
                                            value={data.event_date}
                                            onChange={(e) => setData('event_date', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                                        />
                                        {errors.event_date && <p className="text-xs text-red-600 mt-1">{errors.event_date}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                                            Discipline / Group *
                                        </label>
                                        <select
                                            value={data.service_group_interest}
                                            onChange={(e) => {
                                                setData('service_group_interest', e.target.value as any);
                                                setData('service_interest', '');
                                            }}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                                        >
                                            <option value="photography">Photography</option>
                                            <option value="media_production">Media Production</option>
                                            <option value="print_creative">Print & Creative</option>
                                            <option value="other">Other / General Inquiry</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                                            Specific Service
                                        </label>
                                        <select
                                            value={data.service_interest}
                                            onChange={(e) => setData('service_interest', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                                        >
                                            <option value="">Select a specific service...</option>
                                            {filteredServices.map((s) => (
                                                <option key={s.id} value={s.title}>
                                                    {s.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                                        Your Message & Vision *
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tell us about the session you envision, guest count, location preferences, or specific deliverables..."
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                                    />
                                    {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#8A6A16] hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Send size={15} />
                                    <span>{processing ? 'Transmitting...' : 'Submit Inquiry'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
