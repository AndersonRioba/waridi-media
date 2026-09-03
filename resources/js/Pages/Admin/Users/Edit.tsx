import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { User } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface UsersEditProps {
    user: User;
}

export default function UsersEdit({ user }: UsersEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'editor',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AdminLayout title={`Edit User: ${user.name}`}>
            <div className="max-w-xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/users"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6A16] hover:text-[#141414] mb-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to Staff</span>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Edit: {user.name}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6">
                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Reset Password (Leave blank to keep existing)
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm"
                        />
                        {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Role Assignment *
                        </label>
                        <select
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value as any)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm bg-white"
                        >
                            <option value="editor">Editor</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
                        <Link href="/admin/users" className="text-xs font-semibold text-[#5C5850]">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#141414] text-white hover:bg-[#C9A227] transition-all"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
