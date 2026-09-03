import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { PaginatedData, User } from '@/types';
import { formatDate } from '@/lib/utils';
import { Plus, Edit3, Trash2, ShieldCheck, User as UserIcon } from 'lucide-react';

interface UsersIndexProps {
    users: PaginatedData<User>;
}

export default function UsersIndex({ users }: UsersIndexProps) {
    const handleDelete = (u: User) => {
        if (confirm(`Delete user account "${u.name}"?`)) {
            router.delete(`/admin/users/${u.id}`);
        }
    };

    return (
        <AdminLayout title="Staff Accounts">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Staff User Accounts
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Manage administrative and editor credentials.
                    </p>
                </div>

                <Link
                    href="/admin/users/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-colors shadow-sm"
                >
                    <Plus size={15} />
                    <span>Create User</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Name</th>
                            <th className="py-3.5 px-4">Email</th>
                            <th className="py-3.5 px-4">Role</th>
                            <th className="py-3.5 px-4">Created Date</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {users.data.map((u) => (
                            <tr key={u.id} className="hover:bg-[#FBF6EC]/40">
                                <td className="py-3 px-4 font-semibold text-sm text-[#1A1A1A]">
                                    {u.name}
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {u.email}
                                </td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            u.role === 'admin'
                                                ? 'bg-[#FBF6EC] text-[#8A6A16] border border-[#C9A227]'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {u.role === 'admin' && <ShieldCheck size={12} />}
                                        <span>{u.role}</span>
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-[#5C5850]">
                                    {formatDate(u.created_at)}
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/users/${u.id}/edit`}
                                            className="p-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit3 size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(u)}
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
