import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { ArrowLeft } from 'lucide-react';

export default function UsersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'editor',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users');
    };

    return (
        <AdminLayout title="Create User Account">
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
                        Create Staff Account
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
                            Password *
                        </label>
                        <input
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="At least 8 characters"
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
                            <option value="editor">Editor (Manage content & inquiries)</option>
                            <option value="admin">Administrator (Full settings & user management)</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
                        <Link href="/admin/users" className="text-xs font-semibold text-[#5C5850]">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
