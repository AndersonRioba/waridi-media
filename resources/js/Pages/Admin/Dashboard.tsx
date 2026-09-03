import React from 'react';
import { Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Inquiry, Project } from '@/types';
import { formatDate } from '@/lib/utils';
import {
    FolderKanban,
    MessageSquare,
    Radio,
    FileText,
    Plus,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    Eye,
} from 'lucide-react';

interface DashboardProps {
    stats: {
        total_projects: number;
        published_projects: number;
        new_inquiries: number;
        total_inquiries: number;
        upcoming_streams: number;
        total_posts: number;
    };
    recentInquiries: Inquiry[];
    recentProjects: Project[];
}

export default function Dashboard({
    stats,
    recentInquiries,
    recentProjects,
}: DashboardProps) {
    const statCards = [
        {
            label: 'Published Projects',
            value: `${stats.published_projects} / ${stats.total_projects}`,
            icon: FolderKanban,
            color: 'bg-amber-50 text-[#8A6A16] border-amber-200',
            href: '/admin/projects',
        },
        {
            label: 'New Inquiries',
            value: stats.new_inquiries,
            icon: MessageSquare,
            color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            href: '/admin/inquiries',
        },
        {
            label: 'Upcoming Streams',
            value: stats.upcoming_streams,
            icon: Radio,
            color: 'bg-rose-50 text-rose-700 border-rose-200',
            href: '/admin/livestream',
        },
        {
            label: 'Journal Articles',
            value: stats.total_posts,
            icon: FileText,
            color: 'bg-blue-50 text-blue-700 border-blue-200',
            href: '/admin/blog',
        },
    ];

    return (
        <AdminLayout title="Studio Dashboard">
            {/* Header Title & Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Studio Operations
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Live overview of inquiries, published portfolio items, and upcoming livestream productions.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/projects/create"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-colors shadow-sm"
                    >
                        <Plus size={15} />
                        <span>Add Project</span>
                    </Link>

                    <Link
                        href="/admin/livestream/create"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E8DFC8] text-[#1A1A1A] hover:border-[#C9A227] transition-colors shadow-sm"
                    >
                        <Radio size={14} className="text-[#C9432E]" />
                        <span>Schedule Stream</span>
                    </Link>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={idx}
                            href={card.href}
                            className="bg-white p-6 rounded-2xl border border-[#E8DFC8] hover:border-[#C9A227] shadow-xs hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#5C5850]">
                                    {card.label}
                                </span>
                                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.color}`}>
                                    <Icon size={18} />
                                </div>
                            </div>
                            <div className="font-serif text-3xl font-bold text-[#1A1A1A] group-hover:text-[#8A6A16] transition-colors">
                                {card.value}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Recent Inquiries & Projects Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Inquiries (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8DFC8] p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8DFC8]">
                        <div>
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                Recent Inquiries
                            </h2>
                            <p className="text-[11px] text-[#5C5850]">
                                Latest client inquiries awaiting or in contact
                            </p>
                        </div>
                        <Link
                            href="/admin/inquiries"
                            className="text-xs font-semibold text-[#8A6A16] hover:underline"
                        >
                            View All →
                        </Link>
                    </div>

                    {recentInquiries.length > 0 ? (
                        <div className="divide-y divide-[#E8DFC8]/60">
                            {recentInquiries.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#FBF6EC]/50 px-2 rounded-xl transition-colors"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-sm text-[#1A1A1A]">
                                                {inquiry.name}
                                            </span>
                                            <span
                                                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                                    inquiry.status === 'new'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : inquiry.status === 'contacted'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : inquiry.status === 'booked'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}
                                            >
                                                {inquiry.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#5C5850] mt-0.5">
                                            {inquiry.service_interest || inquiry.service_group_interest} • {inquiry.email}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <Link
                                            href={`/admin/inquiries/${inquiry.id}`}
                                            className="p-1.5 rounded-lg text-[#8A6A16] hover:bg-[#F5EFE1] inline-flex items-center"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-[#5C5850] py-8 text-center">No inquiries logged yet.</p>
                    )}
                </div>

                {/* Recent Projects (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8DFC8] p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8DFC8]">
                        <div>
                            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
                                Recent Work
                            </h2>
                            <p className="text-[11px] text-[#5C5850]">
                                Newly created or updated portfolio pieces
                            </p>
                        </div>
                        <Link
                            href="/admin/projects"
                            className="text-xs font-semibold text-[#8A6A16] hover:underline"
                        >
                            View All →
                        </Link>
                    </div>

                    {recentProjects.length > 0 ? (
                        <div className="divide-y divide-[#E8DFC8]/60">
                            {recentProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="py-3 flex items-center justify-between gap-3"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <img
                                            src={project.cover_image}
                                            alt={project.title}
                                            className="w-10 h-10 rounded-lg object-cover bg-[#E8DFC8] shrink-0"
                                        />
                                        <div className="truncate">
                                            <h4 className="font-serif font-bold text-sm text-[#1A1A1A] truncate">
                                                {project.title}
                                            </h4>
                                            <span className="text-[10px] uppercase font-semibold text-[#8A6A16]">
                                                {project.category.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>

                                    <span
                                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                            project.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-[#5C5850] py-8 text-center">No projects added yet.</p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
