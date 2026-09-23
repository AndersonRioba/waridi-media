import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Faq } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';

interface FaqsEditProps {
    faq: Faq;
}

export default function FaqsEdit({ faq }: FaqsEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        question: faq.question || '',
        answer: faq.answer || '',
        sort_order: faq.sort_order ?? 0,
        is_active: faq.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/faqs/${faq.id}`);
    };

    return (
        <AdminLayout title="Edit FAQ">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/admin/faqs"
                        className="p-2 rounded-xl border border-[#E8DFC8] bg-white text-[#5C5850] hover:text-[#1A1A1A]"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                            Edit FAQ
                        </h1>
                        <p className="text-xs text-[#5C5850] mt-0.5">
                            Update the question or answer wording.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-6 shadow-xs">
                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Question *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.question}
                            onChange={(e) => setData('question', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                        {errors.question && <p className="text-xs text-red-600 mt-1">{errors.question}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-semibold text-[#1A1A1A] mb-2">
                            Answer *
                        </label>
                        <textarea
                            rows={5}
                            required
                            value={data.answer}
                            onChange={(e) => setData('answer', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-sm focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                        />
                        {errors.answer && <p className="text-xs text-red-600 mt-1">{errors.answer}</p>}
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
                                Active on Contact Page
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
                        <Link
                            href="/admin/faqs"
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
                            <span>Update Question</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
