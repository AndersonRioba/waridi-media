import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { TeamMember } from '@/types';
import { Plus, Edit3, Trash2, CheckCircle2, XCircle } from 'lucide-react';

interface TeamIndexProps {
    team: TeamMember[];
}

export default function TeamIndex({ team }: TeamIndexProps) {
    const handleDelete = (member: TeamMember) => {
        if (confirm(`Remove team member "${member.name}"?`)) {
            router.delete(`/admin/team/${member.id}`);
        }
    };

    return (
        <AdminLayout title="Studio Team">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Studio Team & Artisans
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Manage leadership, photographers, cinematographers, and print specialists.
                    </p>
                </div>

                <Link
                    href="/admin/team/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={15} />
                    <span>Add Member</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Member</th>
                            <th className="py-3.5 px-4">Role / Title</th>
                            <th className="py-3.5 px-4">Order</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {team.map((member) => (
                            <tr key={member.id} className="hover:bg-[#FBF6EC]/40">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                                            alt={member.name}
                                            className="w-10 h-10 rounded-full object-cover border border-[#C9A227]"
                                        />
                                        <span className="font-semibold text-sm text-[#1A1A1A]">
                                            {member.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 font-medium text-[#5C5850]">
                                    {member.role_title}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {member.sort_order}
                                </td>
                                <td className="py-3 px-4">
                                    {member.is_active ? (
                                        <span className="text-green-700 font-semibold flex items-center gap-1">
                                            <CheckCircle2 size={14} /> Active
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 flex items-center gap-1">
                                            <XCircle size={14} /> Hidden
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/team/${member.id}/edit`}
                                            className="p-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit3 size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member)}
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
