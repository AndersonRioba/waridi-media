import React, { useState } from 'react';
import { Faq } from '@/types';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { GoldDivider } from './GoldDivider';

interface FAQAccordionProps {
    faqs: Faq[];
    title?: string;
    subtitle?: string;
    className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
    faqs = [],
    title = 'Frequently Inquired Questions',
    subtitle = 'Key answers regarding studio bookings, live broadcasting capabilities, turnaround timelines, and fine-art print materials.',
    className = '',
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

    if (!faqs || faqs.length === 0) {
        return null;
    }

    const toggle = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <div className={`space-y-8 ${className}`}>
            <div className="text-center max-w-2xl mx-auto">
                <GoldDivider label="STUDIO INQUIRIES" diamondSize={5} className="mb-2" />
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-xs sm:text-sm text-[#5C5850] mt-2 font-light leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="bg-[#FBF6EC] rounded-3xl p-6 sm:p-10 border border-[#E8DFC8] divide-y divide-[#E8DFC8]">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div key={faq.id} className="py-5 first:pt-0 last:pb-0">
                            <button
                                onClick={() => toggle(idx)}
                                className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none cursor-pointer"
                                aria-expanded={isOpen}
                            >
                                <span className="font-serif text-base sm:text-lg font-bold text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors leading-snug">
                                    {faq.question}
                                </span>
                                <span className="w-7 h-7 rounded-full bg-white border border-[#C9A227]/60 group-hover:border-[#C9A227] flex items-center justify-center text-[#8A6A16] shrink-0 transition-all shadow-xs mt-0.5">
                                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                                </span>
                            </button>

                            {isOpen && (
                                <div className="mt-3.5 pr-8 text-xs sm:text-sm text-[#5C5850] leading-relaxed animate-in fade-in duration-200">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
