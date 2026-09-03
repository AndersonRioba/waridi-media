# Database Schema — Waridi Media

This is the target shape. Migrations are the real source of truth once written — update this doc if the schema drifts meaningfully.

### `users`
| column | type | notes |
|---|---|---|
| id | bigint pk | |
| name | string | |
| email | string unique | |
| password | string | |
| role | enum: admin, editor | default `editor` |
| avatar | string, nullable | |
| timestamps | | |

### `projects` (portfolio items)
| column | type | notes |
|---|---|---|
| id | bigint pk | |
| title | string | |
| slug | string unique | |
| category | enum: photography, media_production, print_creative | top-level group; specific service (e.g. "Wedding Photography") lives in `tags` |
| client | string, nullable | |
| location | string, nullable | |
| project_date | date, nullable | |
| cover_image | string | path/URL |
| video_url | string, nullable | external embed (YouTube/Vimeo) |
| excerpt | text, nullable | |
| body | longtext, nullable | rich case-study content |
| is_featured | boolean | default false |
| status | enum: draft, published | default draft |
| sort_order | integer | default 0 |
| timestamps | | |

### `project_media` (gallery items)
| column | type | notes |
|---|---|---|
| id | bigint pk | |
| project_id | fk → projects | |
| type | enum: image, video | |
| path_or_url | string | |
| caption | string, nullable | |
| sort_order | integer | |

### `tags` + `project_tag` (pivot)
| tags: id, name, slug |
| project_tag: project_id, tag_id |

### `services`
| id, title, slug, service_group (enum: photography, media_production, print_creative), icon (string key), description (text, nullable), deliverables (json array of strings, nullable), starting_price (nullable string, display only), sort_order, is_active |

Seed data (from client brand collateral):
- **photography**: Studio Portraits, Family Photography, Graduation Photography, Maternity Photography, Wedding Photography, Passport Photos, Real Estate Photography, Corporate Headshots, Product Photography
- **media_production**: TV & Film Production, Documentary Production, Event Coverage, Livestreaming, Drone Services, Podcast Production
- **print_creative**: Graphic Design, Photo Mounting, Canvas Prints, Photo Restoration & Retouching

### `team_members`
| id, name, role_title, photo, bio (text, nullable), social_links (json, nullable), sort_order, is_active |

### `testimonials`
| id, client_name, client_role, quote (text), photo (nullable), project_id (fk, nullable), sort_order, is_active |

### `blog_categories`
| id, name, slug |

### `blog_posts`
| id, title, slug, cover_image, excerpt (text, nullable), body (longtext), author_id (fk → team_members, nullable), blog_category_id (fk, nullable), status (draft/published), published_at (nullable), timestamps |

### `livestream_events`
| id, title, client_name (nullable), description (text, nullable), scheduled_at (datetime), status (enum: upcoming, live, completed, cancelled), platform (enum/string: youtube, vimeo, facebook, other), stream_url, cover_image (nullable), timestamps |

### `inquiries`
| id, name, email, phone (nullable), service_group_interest (enum: photography, media_production, print_creative, other), service_interest (nullable string — specific service name, free-select from the `services` table options for the chosen group), event_date (nullable date), message (text), status (enum: new, contacted, booked, closed), internal_notes (text, nullable), timestamps |

### `settings`
Single-row (or key/value) table for site-wide content:
| key | value (text/json) |
|---|---|
company_name, tagline, contact_email, contact_phone, address, social_links (json), stats (json — years/projects/clients/hours), show_public_pricing (bool), seo_default_title, seo_default_description, seo_default_og_image, footer_text

A simple `settings` key-value table (`key` string unique, `value` text/json) is the least-friction approach — avoids a migration every time a new setting is needed.

### Relationships summary
- `projects` 1—N `project_media`
- `projects` N—N `tags` via `project_tag`
- `testimonials` N—1 `projects` (optional)
- `blog_posts` N—1 `team_members` (author), N—1 `blog_categories`
- All content tables are otherwise independent of `users` except for admin authorship/audit if later needed (not required for v1 — keep it simple).
