export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'editor';
    avatar?: string | null;
    email_verified_at?: string;
    created_at?: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface ProjectMedia {
    id: number;
    project_id: number;
    type: 'image' | 'video';
    path_or_url: string;
    caption?: string | null;
    sort_order: number;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    category: 'photography' | 'media_production' | 'print_creative';
    client?: string | null;
    location?: string | null;
    project_date?: string | null;
    cover_image: string;
    video_url?: string | null;
    excerpt?: string | null;
    body?: string | null;
    is_featured: boolean;
    status: 'draft' | 'published';
    sort_order: number;
    created_at: string;
    tags?: Tag[];
    media?: ProjectMedia[];
}

export interface Service {
    id: number;
    title: string;
    slug: string;
    service_group: 'photography' | 'media_production' | 'print_creative';
    icon: string;
    description?: string | null;
    deliverables?: string[] | null;
    starting_price?: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface TeamMember {
    id: number;
    name: string;
    role_title: string;
    photo?: string | null;
    bio?: string | null;
    social_links?: Record<string, string> | null;
    sort_order: number;
    is_active: boolean;
}

export interface Testimonial {
    id: number;
    client_name: string;
    client_role?: string | null;
    quote: string;
    photo?: string | null;
    project_id?: number | null;
    sort_order: number;
    is_active: boolean;
    project?: Project | null;
}

export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    excerpt?: string | null;
    body: string;
    author_id?: number | null;
    blog_category_id?: number | null;
    status: 'draft' | 'published';
    published_at?: string | null;
    created_at: string;
    author?: TeamMember | null;
    category?: BlogCategory | null;
}

export interface LivestreamEvent {
    id: number;
    title: string;
    client_name?: string | null;
    description?: string | null;
    scheduled_at: string;
    status: 'upcoming' | 'live' | 'completed' | 'cancelled';
    platform: 'youtube' | 'vimeo' | 'facebook' | 'other';
    stream_url: string;
    cover_image?: string | null;
}

export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    service_group_interest: 'photography' | 'media_production' | 'print_creative' | 'other';
    service_interest?: string | null;
    event_date?: string | null;
    message: string;
    status: 'new' | 'contacted' | 'booked' | 'closed';
    internal_notes?: string | null;
    created_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
    flash?: {
        success?: string | null;
        error?: string | null;
    };
    siteSettings?: Record<string, any>;
};
