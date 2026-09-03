import React, { useState } from 'react';
import { Testimonial } from '@/types';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!testimonials || testimonials.length === 0) return null;

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    return (
        <div className="relative max-w-4xl mx-auto px-6 py-12">
            {/* Large Decorative Quote */}
            <div className="text-center mb-6">
                <Quote size={48} className="mx-auto text-[#C9A227]/40 rotate-180" />
            </div>

            {/* Testimonial Quote */}
            <div className="text-center min-h-[160px] flex flex-col justify-center transition-all duration-300">
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] leading-relaxed italic">
                    "{current.quote}"
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    {current.photo ? (
                        <img
                            src={current.photo}
                            alt={current.client_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#C9A227]"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-[#F5EFE1] border-2 border-[#C9A227] flex items-center justify-center text-[#8A6A16] font-bold font-serif text-lg">
                            {current.client_name.charAt(0)}
                        </div>
                    )}
                    <div className="text-left">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                            {current.client_name}
                        </h4>
                        {current.client_role && (
                            <p className="text-xs text-[#8A6A16] font-medium">
                                {current.client_role}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
                <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-[#E8DFC8] bg-white hover:border-[#C9A227] hover:text-[#8A6A16] flex items-center justify-center transition-colors shadow-sm"
                    aria-label="Previous Testimonial"
                >
                    <ChevronLeft size={18} />
                </button>
                <div className="flex gap-1.5">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all ${
                                idx === currentIndex ? 'w-6 bg-[#C9A227]' : 'w-2 bg-[#E8DFC8]'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-[#E8DFC8] bg-white hover:border-[#C9A227] hover:text-[#8A6A16] flex items-center justify-center transition-colors shadow-sm"
                    aria-label="Next Testimonial"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};
