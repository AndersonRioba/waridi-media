import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { ImageUploader } from '@/Components/admin/ImageUploader';
import { Client } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';

interface ClientsEditProps {
    client: Client;
}

export default function ClientsEdit({ client }: ClientsEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: client.name || '',
        logo: client.logo || '',
        website_url: client.website_url || '',
        sort_order: client.sort_order ?? 0,
        is_active: client.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/clients/${client.id}`);
    };

    return (
        <AdminLayout title={`Edit Partner — ${client.name}`}>
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/admin/clients"
                        className="p-2 rounded-xl border border-[#E8DFC8] bg-white text-[#5C5850] hover:text-[#1A1A1A]"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                            Edit Client Partner
                        </h1>
                        <p className="text-xs text-[#5C5850] mt-0.5">
                            Update partner details and brand logo.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6 shadow-xs">
                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Partner / Client Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <ImageUploader
                        label="Client Logo *"
                        description="Transparent PNG or crisp SVG format displays best against light surfaces"
                        value={data.logo}
                        onChange={(url) => setData('logo', url)}
                    />
                    {errors.logo && <p className="text-xs text-red-600 mt-1">{errors.logo}</p>}

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Website URL (Optional)
                        </label>
                        <input
                            type="url"
                            value={data.website_url}
                            onChange={(e) => setData('website_url', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                        {errors.website_url && <p className="text-xs text-red-600 mt-1">{errors.website_url}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                                Sort Order
                            </label>
                            <input
                                type="number"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-6">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded text-[#C9A227] focus:ring-[#C9A227]"
                            />
                            <label htmlFor="is_active" className="text-xs font-semibold text-[#1A1A1A] cursor-pointer">
                                Active in Trust Strip
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
                        <Link
                            href="/admin/clients"
                            className="px-5 py-2.5 rounded-none text-xs font-semibold uppercase tracking-wider text-[#5C5850] hover:text-[#1A1A1A] transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
                        >
                            <Save size={15} />
                            <span>Update Partner</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
