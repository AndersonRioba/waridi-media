import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { LivestreamEvent, PaginatedData } from '@/types';
import { formatDate } from '@/lib/utils';
import { Plus, Radio, Edit3, Trash2, ExternalLink } from 'lucide-react';

interface LivestreamIndexProps {
    events: PaginatedData<LivestreamEvent>;
}

export default function LivestreamIndex({ events }: LivestreamIndexProps) {
    const handleDelete = (event: LivestreamEvent) => {
        if (confirm(`Delete livestream event "${event.title}"?`)) {
            router.delete(`/admin/livestream/${event.id}`);
        }
    };

    return (
        <AdminLayout title="Livestream Events">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Livestream Events
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Schedule upcoming broadcasts or manage active and archived live streams.
                    </p>
                </div>

                <Link
                    href="/admin/livestream/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={15} />
                    <span>Schedule Event</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Event Title</th>
                            <th className="py-3.5 px-4">Client</th>
                            <th className="py-3.5 px-4">Scheduled Date</th>
                            <th className="py-3.5 px-4">Platform</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {events.data.map((event) => (
                            <tr key={event.id} className="hover:bg-[#FBF6EC]/40">
                                <td className="py-3 px-4 font-semibold text-sm text-[#1A1A1A]">
                                    {event.title}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {event.client_name || '—'}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {formatDate(event.scheduled_at)}
                                </td>
                                <td className="py-3 px-4 uppercase text-[#8A6A16] font-medium">
                                    {event.platform}
                                </td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            event.status === 'live'
                                                ? 'bg-red-100 text-red-700 animate-pulse'
                                                : event.status === 'upcoming'
                                                ? 'bg-amber-100 text-amber-800'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {event.status === 'live' && <Radio size={12} />}
                                        <span>{event.status}</span>
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <a
                                            href={event.stream_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1 text-[#5C5850] hover:text-[#8A6A16]"
                                        >
                                            <ExternalLink size={15} />
                                        </a>
                                        <Link
                                            href={`/admin/livestream/${event.id}/edit`}
                                            className="p-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit3 size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(event)}
                                            className="p-1 text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
