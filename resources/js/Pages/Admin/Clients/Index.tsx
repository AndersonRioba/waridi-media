import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Client } from '@/types';
import { Plus, Edit3, Trash2, ExternalLink } from 'lucide-react';

interface ClientsIndexProps {
    clients: Client[];
}

export default function ClientsIndex({ clients }: ClientsIndexProps) {
    const handleDelete = (client: Client) => {
        if (confirm(`Delete client "${client.name}"?`)) {
            router.delete(`/admin/clients/${client.id}`);
        }
    };

    return (
        <AdminLayout title="Clients & Partners">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Clients & Brand Partners
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Manage corporate logos displayed on the homepage "Trusted by" trust-strip marquee.
                    </p>
                </div>

                <Link
                    href="/admin/clients/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={15} />
                    <span>Add Partner Logo</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Logo</th>
                            <th className="py-3.5 px-4">Client Name</th>
                            <th className="py-3.5 px-4">Website</th>
                            <th className="py-3.5 px-4">Order</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {clients.length > 0 ? (
                            clients.map((client) => (
                                <tr key={client.id} className="hover:bg-[#FBF6EC]/40">
                                    <td className="py-3 px-4">
                                        <div className="w-16 h-10 rounded border border-[#E8DFC8] bg-[#FBF6EC] flex items-center justify-center p-1 overflow-hidden">
                                            <img
                                                src={client.logo}
                                                alt={client.name}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 font-semibold text-sm text-[#1A1A1A]">
                                        {client.name}
                                    </td>
                                    <td className="py-3 px-4 text-[#5C5850]">
                                        {client.website_url ? (
                                            <a
                                                href={client.website_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 text-[#8A6A16] hover:underline"
                                            >
                                                <span>Visit</span>
                                                <ExternalLink size={12} />
                                            </a>
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-[#5C5850]">
                                        {client.sort_order}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                                client.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {client.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right space-x-2">
                                        <Link
                                            href={`/admin/clients/${client.id}/edit`}
                                            className="p-1.5 text-[#5C5850] hover:text-[#8A6A16] inline-block"
                                            title="Edit Client"
                                        >
                                            <Edit3 size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(client)}
                                            className="p-1.5 text-red-600 hover:text-red-800 inline-block cursor-pointer"
                                            title="Delete Client"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-[#5C5850]">
                                    No client partner logos registered yet. Add one to activate the homepage trust strip!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
