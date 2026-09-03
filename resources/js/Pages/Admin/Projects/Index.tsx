import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { PaginatedData, Project } from '@/types';
import { formatDate } from '@/lib/utils';
import { Plus, Search, Edit3, Trash2, ExternalLink, Star } from 'lucide-react';

interface ProjectsIndexProps {
    projects: PaginatedData<Project>;
    filters: {
        category?: string;
        status?: string;
        search?: string;
    };
}

export default function ProjectsIndex({ projects, filters }: ProjectsIndexProps) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const search = (form.elements.namedItem('search') as HTMLInputElement).value;
        router.get('/admin/projects', { ...filters, search: search || undefined });
    };

    const handleDelete = (project: Project) => {
        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            router.delete(`/admin/projects/${project.id}`);
        }
    };

    return (
        <AdminLayout title="Manage Projects">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                        Portfolio Projects
                    </h1>
                    <p className="text-xs text-[#5C5850] mt-1">
                        Catalog of all photography, cinematography, and print works.
                    </p>
                </div>

                <Link
                    href="/admin/projects/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-[0.14em] bg-[#141414] text-white hover:bg-[#C9A227] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_10px_rgba(20,20,20,0.2)] hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={15} />
                    <span>Create New Project</span>
                </Link>
            </div>

            {/* Filters bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-80">
                    <div className="relative w-full">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C5850]" />
                        <input
                            type="text"
                            name="search"
                            defaultValue={filters.search}
                            placeholder="Search by title or client..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E8DFC8] text-xs focus:outline-none focus:border-[#C9A227]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-3.5 py-2 bg-[#F5EFE1] text-[#1A1A1A] rounded-none text-xs font-semibold uppercase tracking-wider hover:bg-[#E8DFC8] border border-[#E8DFC8] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm hover:-translate-y-0.5 transition-all"
                    >
                        Search
                    </button>
                </form>

                {/* Status and Category Filter Dropdowns */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        value={filters.category || ''}
                        onChange={(e) =>
                            router.get('/admin/projects', {
                                ...filters,
                                category: e.target.value || undefined,
                            })
                        }
                        className="px-3 py-2 rounded-xl border border-[#E8DFC8] text-xs bg-white text-[#1A1A1A] focus:outline-none focus:border-[#C9A227]"
                    >
                        <option value="">All Categories</option>
                        <option value="photography">Photography</option>
                        <option value="media_production">Media Production</option>
                        <option value="print_creative">Print & Creative</option>
                    </select>

                    <select
                        value={filters.status || ''}
                        onChange={(e) =>
                            router.get('/admin/projects', {
                                ...filters,
                                status: e.target.value || undefined,
                            })
                        }
                        className="px-3 py-2 rounded-xl border border-[#E8DFC8] text-xs bg-white text-[#1A1A1A] focus:outline-none focus:border-[#C9A227]"
                    >
                        <option value="">All Statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#1A1A1A]">
                        <thead className="bg-[#FBF6EC] border-b border-[#E8DFC8] text-[11px] uppercase tracking-wider text-[#8A6A16] font-semibold">
                            <tr>
                                <th className="py-3.5 px-4">Project</th>
                                <th className="py-3.5 px-4">Category</th>
                                <th className="py-3.5 px-4">Client</th>
                                <th className="py-3.5 px-4">Date</th>
                                <th className="py-3.5 px-4">Featured</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DFC8]/60">
                            {projects.data.map((project) => (
                                <tr key={project.id} className="hover:bg-[#FBF6EC]/40 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={project.cover_image}
                                                alt={project.title}
                                                className="w-11 h-11 rounded-lg object-cover bg-[#E8DFC8] shrink-0"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-sm text-[#1A1A1A] line-clamp-1">
                                                    {project.title}
                                                </h4>
                                                <span className="text-[10px] text-[#5C5850]">
                                                    /{project.slug}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="capitalize font-medium text-[#5C5850]">
                                            {project.category.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-[#5C5850]">
                                        {project.client || '—'}
                                    </td>
                                    <td className="py-3 px-4 text-[#5C5850]">
                                        {project.project_date ? formatDate(project.project_date) : '—'}
                                    </td>
                                    <td className="py-3 px-4">
                                        {project.is_featured ? (
                                            <span className="inline-flex items-center gap-1 text-[#8A6A16] font-semibold text-[11px]">
                                                <Star size={13} fill="currentColor" /> Yes
                                            </span>
                                        ) : (
                                            <span className="text-[#A8A49C]">No</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                project.status === 'published'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={`/portfolio/${project.slug}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1 text-[#5C5850] hover:text-[#8A6A16]"
                                                title="View Live"
                                            >
                                                <ExternalLink size={15} />
                                            </a>
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Edit"
                                            >
                                                <Edit3 size={15} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project)}
                                                className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                                                title="Delete"
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

                {/* Pagination */}
                {projects.last_page > 1 && (
                    <div className="p-4 border-t border-[#E8DFC8] flex items-center justify-between">
                        <span className="text-xs text-[#5C5850]">
                            Showing {projects.data.length} of {projects.total} items
                        </span>
                        <div className="flex items-center gap-1">
                            {projects.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded text-xs font-semibold ${
                                        link.active
                                            ? 'bg-[#C9A227] text-white'
                                            : !link.url
                                            ? 'opacity-40 cursor-not-allowed'
                                            : 'bg-[#FBF6EC] hover:bg-[#F5EFE1]'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
