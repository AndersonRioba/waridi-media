import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { BrandRoseIcon } from '@/Components/public/BrandLogo';
import {
    LayoutDashboard,
    FolderKanban,
    Layers,
    MessageSquare,
    Radio,
    Users,
    Quote,
    FileText,
    Settings,
    Shield,
    LogOut,
    ExternalLink,
    Menu,
    X,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';

interface AdminLayoutProps {
    title: string;
}

export const AdminLayout: React.FC<PropsWithChildren<AdminLayoutProps>> = ({
    children,
    title,
}) => {
    const { auth, flash, siteSettings } = usePage<PageProps>().props;
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (flash?.error) {
            setToast({ message: flash.error, type: 'error' });
        }
    }, [flash]);

    const user = auth.user;
    const isAdmin = user?.role === 'admin';

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
        { label: 'Portfolio Projects', href: '/admin/projects', icon: FolderKanban },
        { label: 'Services Catalog', href: '/admin/services', icon: Layers },
        { label: 'Client Inquiries', href: '/admin/inquiries', icon: MessageSquare },
        { label: 'Livestream Events', href: '/admin/livestream', icon: Radio },
        { label: 'Studio Team', href: '/admin/team', icon: Users },
        { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
        { label: 'Journal Articles', href: '/admin/blog', icon: FileText },
        ...(isAdmin
            ? [
                  { label: 'Studio Settings', href: '/admin/settings', icon: Settings },
                  { label: 'User Accounts', href: '/admin/users', icon: Shield },
              ]
            : []),
    ];

    const isCurrent = (item: { href: string; exact?: boolean }) => {
        if (item.exact) return url === item.href;
        return url.startsWith(item.href);
    };

    return (
        <div className="min-h-screen bg-[#F8F6F0] flex">
            <Head title={`${title} — Studio Admin`} />

            {/* Toast Flash Alert */}
            {toast && (
                <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-4 duration-300">
                    <div
                        className={`flex items-start gap-3 px-5 py-3.5 rounded-xl shadow-xl border ${
                            toast.type === 'success'
                                ? 'bg-white border-[#C9A227] text-[#1A1A1A]'
                                : 'bg-white border-red-500 text-red-900'
                        }`}
                    >
                        {toast.type === 'success' ? (
                            <CheckCircle2 size={18} className="text-[#C9A227] shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                        )}
                        <span className="text-xs font-medium pr-2">{toast.message}</span>
                        <button onClick={() => setToast(null)} className="text-[#5C5850]">
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#141414] text-white flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div>
                    {/* Brand Head */}
                    <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between">
                        <Link href="/admin" className="flex items-center gap-3">
                            <BrandRoseIcon size={34} />
                            <div>
                                <span className="font-serif font-bold text-lg text-[#E8C766] block leading-none">
                                    WARIDI
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.25em] text-[#A8A49C] block mt-0.5">
                                    CMS STUDIO
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-[#A8A49C] lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1">
                        {navItems.map((item) => {
                            const active = isCurrent(item);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                                        active
                                            ? 'bg-gradient-to-r from-[#C9A227] to-[#8A6A16] text-white font-semibold shadow-md'
                                            : 'text-[#A8A49C] hover:bg-white/5 hover:text-[#FBF6EC]'
                                    }`}
                                >
                                    <Icon size={16} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom User Area */}
                <div className="p-4 border-t border-[#2A2A2A]">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 mb-3">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-[#C9A227] text-[#141414] font-serif font-bold flex items-center justify-center text-xs shrink-0">
                                {user?.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                                <span className="text-[10px] text-[#C9A227] uppercase tracking-wider font-semibold block">
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#A8A49C] px-1">
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white flex items-center gap-1"
                        >
                            <ExternalLink size={13} />
                            <span>Live Site</span>
                        </a>

                        <button
                            onClick={() => router.post('/logout')}
                            className="hover:text-red-400 flex items-center gap-1 cursor-pointer"
                        >
                            <LogOut size={13} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Pane */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="bg-white border-b border-[#E8DFC8] px-6 py-4 flex items-center justify-between lg:justify-end">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 rounded-lg text-[#1A1A1A] lg:hidden"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#8A6A16] bg-[#FBF6EC] hover:bg-[#F5EFE1] border border-[#E8DFC8] transition-colors"
                        >
                            <span>View Public Site</span>
                            <ExternalLink size={13} />
                        </Link>
                    </div>
                </header>

                {/* Page Canvas */}
                <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
