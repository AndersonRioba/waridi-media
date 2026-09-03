import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { SiteHeader } from '@/Components/public/SiteHeader';
import { SiteFooter } from '@/Components/public/SiteFooter';
import { CustomCursor } from '@/Components/public/CustomCursor';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { PageProps } from '@/types';

interface PublicLayoutProps {
    title?: string;
    description?: string;
}

export const PublicLayout: React.FC<PropsWithChildren<PublicLayoutProps>> = ({
    children,
    title,
    description,
}) => {
    const { flash, siteSettings } = usePage<PageProps>().props;
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (flash?.error) {
            setToast({ message: flash.error, type: 'error' });
        }
    }, [flash]);

    const defaultTitle = siteSettings?.seo_default_title || 'Waridi Photo Studio — Where Moments Become Memories';
    const pageTitle = title ? `${title} | Waridi Photo Studio` : defaultTitle;
    const metaDesc = description || siteSettings?.seo_default_description || 'Nairobi premier photography studio & media production.';

    return (
        <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#E8C766]/30 selection:text-[#8A6A16]">
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDesc} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={metaDesc} />
            </Head>

            {/* Custom Cursor */}
            <CustomCursor />

            {/* Global Header */}
            <SiteHeader />

            {/* Toast Flash Notification */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
                    <div
                        className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border max-w-md ${
                            toast.type === 'success'
                                ? 'bg-[#FFFFFF] border-[#C9A227] text-[#1A1A1A]'
                                : 'bg-[#FFFFFF] border-red-500 text-red-900'
                        }`}
                    >
                        {toast.type === 'success' ? (
                            <CheckCircle2 size={20} className="text-[#C9A227] shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                        )}
                        <p className="text-sm font-medium leading-relaxed pr-2">{toast.message}</p>
                        <button
                            onClick={() => setToast(null)}
                            className="text-[#5C5850] hover:text-[#1A1A1A] p-0.5"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-grow pt-20">
                {children}
            </main>

            {/* Global Footer */}
            <SiteFooter />
        </div>
    );
};
