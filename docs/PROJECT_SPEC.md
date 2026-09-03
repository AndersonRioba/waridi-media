# Project Spec — Waridi Media

## Company snapshot
**Waridi Photo Studio** — tagline "Where Moments Become Memories" — offers three grouped service lines (per client brand collateral):

- **Photography**: Studio Portraits, Family Photography, Graduation Photography, Maternity Photography, Wedding Photography, Passport Photos, Real Estate Photography, Corporate Headshots, Product Photography
- **Media Production**: TV & Film Production, Documentary Production, Event Coverage, Livestreaming, Drone Services, Podcast Production
- **Print & Creative**: Graphic Design, Photo Mounting, Canvas Prints, Photo Restoration & Retouching

The site's job is to showcase work elegantly and convert visitors into inquiries/bookings across all three groups — photography is the studio's primary identity, with media production and print/creative as complementary offerings.

---

## Public site

### 1. Home
- Hero (image slideshow or single strong studio image, elegant gold/cream treatment per `docs/DESIGN_SYSTEM.md` — not a dark cinematic video hero) with eyebrow "Experience the Magic of", gold-gradient "WARIDI" headline, script tagline "Where Moments Become Memories", and a primary CTA ("View Our Work" / "Book a Session").
- Services icon strip: a single horizontal row of the most prominent services (Portraits, Family, Maternity, Graduation, Weddings, Product Photography, Printing — matching the brand collateral's icon strip), each linking into a filtered portfolio/services view. Full service breakdown lives on the Services page.
- Featured/selected work grid (curated subset, not the full portfolio) — 6–8 pieces, weighted toward photography since it's the primary identity, with a few media-production pieces mixed in.
- "By the numbers" strip (years active, sessions delivered, clients served) — content-editable via admin Settings.
- Client logos strip (optional, admin-manageable).
- Testimonials slider.
- Recent journal/blog posts (3 latest).
- CTA band → Contact.

### 2. Portfolio (Work)
- Filterable grid/masonry by top-level category (Photography / Media Production / Print & Creative) and by specific tag (e.g. "Wedding", "Maternity", "Drone", "Corporate Headshots") for finer filtering within a category.
- Each item shows a cover image (or, for Media Production items, a looping preview clip) on hover.
- Pagination or infinite scroll (prefer Inertia's `WhenVisible` for progressive loading).

### 3. Project detail (single portfolio item)
- Full-bleed hero (image or video embed depending on category).
- Project meta: client, category, specific service (e.g. "Wedding Photography", "Drone Services"), date, location.
- Media gallery (images and/or video clips).
- Short case-study text (challenge/approach/result — optional fields, not required).
- Related projects (same category/tag), CTA to contact.

### 4. Services
- Structured as three grouped panels — **Photography**, **Media Production**, **Print & Creative** — each a gold-badged panel listing its specific services with icon + name (directly modeled on the brand's "Our Services" graphic: two-column layout with icon rows and thin gold divider lines).
- Each individual service (e.g. "Wedding Photography") can optionally expand to a short description, sample deliverables, and a link to its filtered portfolio view.
- Optional packages/pricing table if the business wants public pricing (make this admin-toggleable — some studios prefer "request a quote" only).

### 5. About
- Studio story, mission/approach.
- Team grid (photo, name, role, optional social links) — sourced from admin Team module.
- Equipment/capabilities list (cameras, drones, streaming gear) — nice-to-have, editable content block.

### 6. Livestreaming
- Explains the livestream service offering.
- Upcoming/past livestream events list (title, client/event, date, status: upcoming/live/completed, and an embed link or platform link — e.g. YouTube/Vimeo/Facebook Live URL) sourced from admin Livestream Events module.
- If an event is currently "live," show a prominent live badge/embed on this page and optionally on Home.

### 7. Journal / Blog
- Standard index + single post view. Categories/tags optional. Cover image, author (team member), published date, rich content body.
- Purpose: SEO + behind-the-scenes content (styling should feel like an extension of the portfolio, not a generic blog).

### 8. Contact
- Contact/inquiry form: name, email, phone, service group interested in (select: Photography/Media Production/Print & Creative/Other) with a second optional dropdown for the specific service within that group, event date (optional), message.
- Submitting creates an `Inquiry` record visible in the admin panel and sends a notification email to studio staff.
- Studio contact details, map/location (optional), social links.

### 9. 404 / error pages
- Styled to match the cinematic theme, not default Laravel error pages.

---

## Admin panel (`/admin`, auth-protected)

### Roles
- **Admin**: full access including Settings and user management.
- **Editor**: manage content (Projects, Blog, Team, Testimonials, Livestream Events) but not Settings/Users.

### Modules
1. **Dashboard** — quick stats (published projects count, new inquiries this week, upcoming livestream events, latest blog post), recent inquiries list, quick-create shortcuts.
2. **Projects (Portfolio)** — CRUD. Fields: title, slug, category (enum: photography, media_production, print_creative), tags (specific service, e.g. "Wedding Photography", "Drone Services"), client, location, project date, cover image, gallery (multiple images/videos), video embed URL (optional), short excerpt, case-study body (rich text), featured flag (for Home), published/draft status, sort order.
3. **Services** — CRUD for the full service catalog (~19 individual services across the 3 groups: title, service_group enum, icon, description, sample deliverables list, optional starting price/package info, display order). Editable rather than hardcoded so new services can be added without a deploy.
4. **Team** — CRUD. Name, role/title, photo, bio (short), social links, display order, active flag.
5. **Testimonials** — CRUD. Client name, client company/role, quote, optional photo/logo, related project (optional), display order.
6. **Blog** — CRUD for posts (title, slug, cover image, author = team member, category/tags, body, published status, published_at) and lightweight category management.
7. **Livestream Events** — CRUD. Title, client/event name, description, scheduled datetime, status (upcoming/live/completed/cancelled), stream platform + embed/URL, cover image.
8. **Inquiries** — Read/manage list of contact-form submissions: filter by status (new/contacted/booked/closed), mark status, add internal notes, view full submission. No public-facing edit.
9. **Settings** — Site-wide content: company name/tagline, contact info, social links, "by the numbers" stats, footer content, SEO defaults (meta title/description, OG image), toggle for public pricing visibility.
10. **Users** (admin-only) — manage staff accounts and roles (admin/editor).

### Cross-cutting admin UX
- Consistent list-view pattern: searchable/sortable table, status badges, bulk-select where useful (e.g. bulk publish/unpublish projects).
- Media uploads: drag-and-drop uploader with image preview and progress; video fields accept either a file upload (for short clips) or an external URL (YouTube/Vimeo) for longer reels.
- Every create/edit form uses Inertia's shared validation-error handling (no full page reload feel).
- Toast/flash notifications on save/delete.

---

## Out of scope for v1 (note, don't build unless asked)
- Online payments/booking calendar (start with inquiry-based contact only).
- Multi-language support.
- Client-facing private galleries/proofing (common in photography businesses — worth flagging to the human as a compelling v2 feature, but don't build speculatively).
