import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Faq } from '@/types';
import { Plus, Edit3, Trash2, HelpCircle } from 'lucide-react';

interface FaqsIndexProps {
    faqs: Faq[];
}

export default function FaqsIndex({ faqs }: FaqsIndexProps) {
    const handleDelete = (faq: Faq) => {
        if (confirm(`Delete FAQ: "${faq.question}"?`)) {
            router.delete(`/admin/faqs/${faq.id}`);
        }
    };

    return (
        <AdminLayout title="Studio FAQs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Studio Frequently Asked Questions
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Manage questions and answers displayed in the accordion on the Contact page.
                    </p>
                </div>

                <Link
                    href="/admin/faqs/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={15} />
                    <span>Add Question</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-[#1A1A1A]">
                    <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                        <tr>
                            <th className="py-3.5 px-4">Question</th>
                            <th className="py-3.5 px-4">Answer Preview</th>
                            <th className="py-3.5 px-4">Order</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC8]/60">
                        {faqs.length > 0 ? (
                            faqs.map((faq) => (
                                <tr key={faq.id} className="hover:bg-[#FBF6EC]/40">
                                    <td className="py-3.5 px-4 font-semibold text-sm text-[#1A1A1A] max-w-sm">
                                        <div className="flex items-start gap-2">
                                            <HelpCircle size={16} className="text-[#C9A227] shrink-0 mt-0.5" />
                                            <span>{faq.question}</span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-4 text-[#5C5850] max-w-md">
                                        <p className="line-clamp-2 leading-relaxed">{faq.answer}</p>
                                    </td>
                                    <td className="py-3.5 px-4 text-[#5C5850]">
                                        {faq.sort_order}
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <span
                                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                                faq.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {faq.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right space-x-2">
                                        <Link
                                            href={`/admin/faqs/${faq.id}/edit`}
                                            className="p-1.5 text-[#5C5850] hover:text-[#8A6A16] inline-block"
                                            title="Edit FAQ"
                                        >
                                            <Edit3 size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(faq)}
                                            className="p-1.5 text-red-600 hover:text-red-800 inline-block cursor-pointer"
                                            title="Delete FAQ"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-[#5C5850]">
                                    No FAQs found. Add questions to help visitors on the Contact page!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
