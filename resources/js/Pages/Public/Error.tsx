import React from 'react';
import { Link } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { BrandRoseIcon } from '@/Components/public/BrandLogo';
import { GoldDivider } from '@/Components/public/GoldDivider';
import { ArrowLeft, Home } from 'lucide-react';

interface ErrorProps {
    status?: number;
}

export default function Error({ status = 404 }: ErrorProps) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status] || 'An Error Occurred';

    const description = {
        503: 'Sorry, we are doing some maintenance on our studios. Please check back soon.',
        500: 'Whoops, something went wrong on our studio servers.',
        404: 'The page or portfolio archive you are seeking has been moved, renamed, or does not exist.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || 'An unexpected error occurred.';

    return (
        <PublicLayout title={title}>
            <section className="py-24 min-h-[70vh] flex items-center justify-center bg-[#FBF6EC]">
                <div className="max-w-xl mx-auto px-6 text-center">
                    <div className="mb-6 flex justify-center">
                        <BrandRoseIcon size={64} />
                    </div>
                    <GoldDivider diamondSize={5} className="mb-4" />
                    <h1 className="font-serif text-5xl sm:text-6xl font-bold gold-gradient-text mb-4">
                        {status}
                    </h1>
                    <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-3">
                        {title}
                    </h2>
                    <p className="text-sm text-[#5C5850] max-w-md mx-auto mb-8 font-light leading-relaxed">
                        {description}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-white bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#8A6A16] shadow-[0_4px_14px_rgba(201,162,39,0.25)] hover:shadow-[0_6px_20px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 transition-all"
                        >
                            <Home size={15} />
                            <span>Return to Home</span>
                        </Link>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1A1A] bg-white border border-[#E8DFC8] shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
                        >
                            <span>Browse Work</span>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
