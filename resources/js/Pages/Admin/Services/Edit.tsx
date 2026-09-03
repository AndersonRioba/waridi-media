import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Service } from '@/types';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface ServicesEditProps {
    service: Service;
}

export default function ServicesEdit({ service }: ServicesEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: service.title || '',
        slug: service.slug || '',
        service_group: service.service_group || 'photography',
        icon: service.icon || 'Camera',
        description: service.description || '',
        deliverables: (service.deliverables && service.deliverables.length > 0) ? service.deliverables : [''],
        starting_price: service.starting_price || '',
        sort_order: service.sort_order || 0,
        is_active: !!service.is_active,
    });

    const addDeliverable = () => {
        setData('deliverables', [...data.deliverables, '']);
    };

    const updateDeliverable = (index: number, val: string) => {
        const updated = [...data.deliverables];
        updated[index] = val;
        setData('deliverables', updated);
    };

    const removeDeliverable = (index: number) => {
        setData('deliverables', data.deliverables.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/services/${service.id}`);
    };

    return (
        <AdminLayout title={`Edit Service: ${service.title}`}>
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/services"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6A16] hover:text-[#141414] mb-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Services</span>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Edit: {service.title}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Service Title *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Service Group *
                            </label>
                            <select
                                value={data.service_group}
                                onChange={(e) => setData('service_group', e.target.value as any)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm bg-white"
                            >
                                <option value="photography">Photography</option>
                                <option value="media_production">Media Production</option>
                                <option value="print_creative">Print & Creative</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Icon Key *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Starting Price
                            </label>
                            <input
                                type="text"
                                value={data.starting_price}
                                onChange={(e) => setData('starting_price', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A]">
                                Sample Deliverables
                            </label>
                            <button
                                type="button"
                                onClick={addDeliverable}
                                className="text-xs text-[#8A6A16] font-semibold flex items-center gap-1"
                            >
                                <Plus size={13} /> Add Deliverable
                            </button>
                        </div>
                        <div className="space-y-2">
                            {data.deliverables.map((deliv, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={deliv}
                                        onChange={(e) => updateDeliverable(idx, e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFC8] text-xs"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeDeliverable(idx)}
                                        className="p-1 text-red-600"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E8DFC8]">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="activeCheck"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded text-[#C9A227]"
                            />
                            <label htmlFor="activeCheck" className="text-xs font-semibold text-[#1A1A1A]">
                                Active in Public Catalog
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/admin/services" className="text-xs font-semibold text-[#5C5850]">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-all"
                            >
                                Update Service
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
