import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { PaginatedData, Service } from '@/types';
import { Plus, Edit3, Trash2, CheckCircle2, XCircle } from 'lucide-react';

interface ServicesIndexProps {
    services: PaginatedData<Service>;
    selectedGroup?: string;
}

export default function ServicesIndex({ services, selectedGroup }: ServicesIndexProps) {
    const handleDelete = (service: Service) => {
        if (confirm(`Are you sure you want to delete service "${service.title}"?`)) {
            router.delete(`/admin/services/${service.id}`);
        }
    };

    return (
        <AdminLayout title="Services Catalog">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Services Catalog
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Manage studio offerings across Photography, Media Production, and Print & Creative.
                    </p>
                </div>

                <Link
                    href="/admin/services/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-colors shadow-sm"
                >
                    <Plus size={15} />
                    <span>Add Service</span>
                </Link>
            </div>

            {/* Filter */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] mb-6 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A6A16]">Filter:</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.get('/admin/services')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            !selectedGroup ? 'bg-[#141414] text-white' : 'bg-[#FBF6EC] text-[#5C5850]'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => router.get('/admin/services', { group: 'photography' })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            selectedGroup === 'photography' ? 'bg-[#8A6A16] text-white' : 'bg-[#FBF6EC] text-[#5C5850]'
                        }`}
                    >
                        Photography
                    </button>
                    <button
                        onClick={() => router.get('/admin/services', { group: 'media_production' })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            selectedGroup === 'media_production' ? 'bg-[#8A6A16] text-white' : 'bg-[#FBF6EC] text-[#5C5850]'
                        }`}
                    >
                        Media Production
                    </button>
                    <button
                        onClick={() => router.get('/admin/services', { group: 'print_creative' })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            selectedGroup === 'print_creative' ? 'bg-[#8A6A16] text-white' : 'bg-[#FBF6EC] text-[#5C5850]'
                        }`}
                    >
                        Print & Creative
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Service</th>
                            <th className="py-3.5 px-4">Group</th>
                            <th className="py-3.5 px-4">Icon Key</th>
                            <th className="py-3.5 px-4">Starting Price</th>
                            <th className="py-3.5 px-4">Active</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {services.data.map((service) => (
                            <tr key={service.id} className="hover:bg-[#FBF6EC]/40">
                                <td className="py-3 px-4 font-semibold text-sm text-[#1A1A1A]">
                                    {service.title}
                                </td>
                                <td className="py-3 px-4 capitalize text-[#5C5850]">
                                    {service.service_group.replace('_', ' ')}
                                </td>
                                <td className="py-3 px-4 text-[#8A6A16]">
                                    {service.icon}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {service.starting_price || '—'}
                                </td>
                                <td className="py-3 px-4">
                                    {service.is_active ? (
                                        <span className="text-green-700 font-semibold flex items-center gap-1">
                                            <CheckCircle2 size={14} /> Yes
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 flex items-center gap-1">
                                            <XCircle size={14} /> No
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/services/${service.id}/edit`}
                                            className="p-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit3 size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service)}
                                            className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
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
