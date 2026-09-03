# AGENTS.md — Waridi Media

This file is the source of truth for any AI coding agent (Claude Code, Cursor, Windsurf, Codex, etc.) working in this repository. Read this fully before writing code. Companion docs live in `/docs` — read the relevant one before starting work on that area.

## 1. What we're building

**Waridi Photo Studio** ("Waridi Media" is the umbrella project/repo name) is a photography and media production studio, brand tagline: **"Where Moments Become Memories."** It offers three service groups:
- **Photography** — Studio Portraits, Family Photography, Graduation Photography, Maternity Photography, Wedding Photography, Passport Photos, Real Estate Photography, Corporate Headshots, Product Photography
- **Media Production** — TV & Film Production, Documentary Production, Event Coverage, Livestreaming, Drone Services, Podcast Production
- **Print & Creative** — Graphic Design, Photo Mounting, Canvas Prints, Photo Restoration & Retouching

The brand mark is a gold rose wrapped around a camera lens, paired with an elegant gold serif "WARIDI" wordmark and a smaller "PHOTO STUDIO" subline — see `docs/DESIGN_SYSTEM.md` for full logo usage and color tokens. The full service list above (drawn directly from client-provided brand collateral) is the source of truth for the Services module and portfolio category/tag structure — see `docs/PROJECT_SPEC.md`.

We are building a single Laravel app that serves both:
1. A **public marketing/portfolio site** — elegant, gold-and-cream, photography-led, built to sell the studio's work.
2. An **admin panel** — where staff manage portfolio work, bookings/inquiries, blog, team, and livestream schedules, with zero separate API layer (Inertia handles the wire format).

Layout/interaction inspiration (do not copy assets/text — use only for structural/interaction patterns; the actual visual identity — colors, typography, logo — comes from the client's brand collateral, not these sites):
- Qode Interactive "Pelicula" (video production theme) — fullscreen hero treatment, interactive portfolio sliders, custom cursor, parallax — adapt to a light/gold palette rather than its native dark theme.
- Envato "Foturo" (photography portfolio) — clean masonry galleries, elegant serif/sans pairing, generous whitespace, minimal chrome. This is the closest tonal match to the actual brand.
- ThemeForest drone/aerial media theme — full-bleed imagery, bold section breaks, dynamic full-viewport sections — used sparingly, for Media Production sections only.

Full functional scope is in `docs/PROJECT_SPEC.md`. Database shape is in `docs/DATABASE_SCHEMA.md`.

## 2. Tech stack (do not deviate without asking)

- **Laravel 12** (PHP 8.3+)
- **Inertia.js v2.0** (server-driven SPA — no separate REST/JSON API for the frontend; use Inertia responses from controllers)
- **React 19** (function components + hooks only, no class components)
- **Vite** for asset bundling (Laravel's default Vite plugin)
- **Tailwind CSS v4** for styling — utility-first, no CSS-in-JS
- **Inertia v2 features to actually use**: deferred props (`Deferred`), polling (`usePoll`) for admin dashboards/livestream status, prefetching (`<Link prefetch>`), form component (`<Form>`) where it simplifies things, and `WhenVisible` for lazy-loading heavy portfolio sections.
- **Auth**: Laravel Breeze (Inertia + React starter kit) as the base for admin auth. Public site has no auth.
- **Authorization**: Laravel policies + a lightweight `role` column on `users` (`admin`, `editor`) — no need for a full package like Spatie unless the project grows.
- **Media/uploads**: Laravel's local/`public` disk in dev; write storage code so switching to S3-compatible disk (e.g. for video-heavy uploads) is a config change, not a rewrite. Use image optimization (e.g. `spatie/laravel-medialibrary` is allowed if it meaningfully simplifies gallery/cover-image/video-thumbnail handling — check with the human before adding it since it's a bigger dependency).
- **Icons**: `lucide-react`
- **Animation**: `framer-motion` for React-driven transitions/reveals; native CSS/Tailwind for simple transitions. Consider `lenis` for smooth scroll (matches the Pelicula-style feel) — optional, don't let it fight React lifecycle.
- **Testing**: Pest for backend (Laravel 12 default), no frontend test suite required for v1 unless requested.
- **Database**: MySQL/MariaDB assumed for production; SQLite is fine for local dev.

## 3. Project structure

```
app/
  Http/
    Controllers/
      Admin/          # Admin panel controllers (namespaced, prefixed /admin)
      ...              # Public site controllers (Home, Portfolio, Project, Services, About, Blog, Contact, Livestream)
    Requests/          # Form Request validation classes — one per create/update action
    Middleware/
  Models/
  Policies/
  Enums/               # ProjectCategory, InquiryStatus, etc. as native PHP enums
resources/
  js/
    Pages/
      Public/          # Home.tsx, Portfolio/Index.tsx, Portfolio/Show.tsx, Services.tsx, About.tsx, Blog/Index.tsx, Blog/Show.tsx, Contact.tsx, Livestream.tsx
      Admin/           # Dashboard.tsx, Projects/{Index,Create,Edit}.tsx, Inquiries/Index.tsx, Blog/*, Team/*, Testimonials/*, Livestream/*, Settings.tsx
      Auth/            # Breeze-generated
    Layouts/           # PublicLayout.tsx, AdminLayout.tsx
    Components/
      public/          # Hero, PortfolioGrid, PortfolioCard, ServiceCard, TestimonialSlider, CTASection, SiteHeader, SiteFooter, CustomCursor
      admin/           # DataTable, MediaUploader, StatCard, Sidebar, Topbar
      ui/              # small shared primitives (Button, Badge, Modal, Input) if not using shadcn
    lib/                # helpers (formatters, cn())
    types/              # shared TS types mirroring Inertia page props
  css/
    app.css
routes/
  web.php              # public routes
  admin.php            # admin routes, grouped + auth:admin middleware, included from web.php
database/
  migrations/
  factories/
  seeders/
docs/                  # planning docs — keep updated as scope evolves
```

## 4. Conventions

**Backend**
- Thin controllers. Validation lives in `FormRequest` classes. Business logic that's more than a few lines lives in a small service class or an Action class under `app/Actions/`, not in the controller.
- Every Inertia response uses named routes and `Inertia::render('Public/Home', [...])` — page component path matches the `Pages/` folder exactly.
- Eager-load relationships explicitly; never let Inertia pages trigger N+1s. Use `Inertia::defer()` for expensive/optional data (e.g. related-projects, testimonial counts).
- Use Laravel policies for admin authorization checks (`$this->authorize(...)` in controllers), not ad-hoc `if ($user->role === ...)` scattered around.
- Migrations are the schema source of truth — see `docs/DATABASE_SCHEMA.md` for the target shape, but let migrations be the real spec once written.

**Frontend**
- TypeScript for all new `.tsx` files. Define prop types per page from what the controller actually passes.
- No inline styles except for truly dynamic values (e.g. a computed background-position). Everything else is Tailwind classes.
- Shared visual primitives go in `Components/ui`; don't duplicate a button/card implementation across pages.
- Keep public-site components presentational; keep data-fetching/mutation logic (forms, `router.post`, etc.) in the `Pages/` component or a small hook, not buried in a deeply nested child.
- Respect `prefers-reduced-motion` for all parallax/cursor/reveal animations (accessibility non-negotiable given how animation-heavy the design direction is).
- Admin panel: build a real, boring, fast CRUD UI first (table + drawer/page form). Polish visuals later — the public site is where design budget goes.

**Naming**
- DB tables: snake_case, plural (`projects`, `project_media`, `blog_posts`, `inquiries`).
- Routes: kebab-case URIs, dot-notation names (`portfolio.show`, `admin.projects.edit`).
- React components: PascalCase files matching the exported component name.

## 5. Commands

```bash
composer install
npm install
cp .env.example .env && php artisan key:generate
php artisan migrate --seed
composer run dev        # runs php artisan serve + queue listener + vite concurrently (Laravel 12 default script)
```

Run `php artisan test` (Pest) before considering backend work done. Run `npm run build` to confirm the frontend compiles clean before considering frontend work done.

## 6. Working style for the agent

- Before generating a new page or admin module, check `docs/PROJECT_SPEC.md` for the intended fields/behavior — don't invent scope.
- Before styling anything, check `docs/DESIGN_SYSTEM.md` for tokens (colors, type scale, spacing, motion rules) — don't introduce new colors/fonts ad hoc.
- Build vertically (one full feature: migration → model → controller → Inertia page → nav link) rather than horizontally (all migrations, then all controllers, then all pages) — it's easier to review and keeps the app runnable at each step.
- Seed the database with realistic placeholder content (sample projects, services, team members, blog posts) using factories/seeders so every page looks real during development, not empty.
- Ask before adding a new major dependency not listed in Section 2.

## 7. Read order for a fresh session

1. This file — stack, structure, conventions, build order (below).
2. `docs/PROJECT_SPEC.md` — pages, admin modules, functional scope.
3. `docs/DATABASE_SCHEMA.md` — tables/columns/relationships.
4. `docs/DESIGN_SYSTEM.md` — colors, type, spacing, motion, component patterns.

Skim all four before writing code on a new feature; re-read the relevant one before touching an area you haven't worked in yet this session.

## 8. Suggested build order

1. Scaffold: `laravel new waridi-media`, install Breeze with the Inertia + React starter kit, add Tailwind v4, `lucide-react`, `framer-motion`.
2. Migrations + models for the core schema (`docs/DATABASE_SCHEMA.md`) + factories/seeders with realistic sample content.
3. Admin panel CRUD first (Projects, Services, Team, Blog, Testimonials, Inquiries, Livestream Events, Settings) — this is what proves the data model works, and the public site depends on it having real content to render.
4. Public site pages, in order: Home → Portfolio index/show → Services → About → Blog → Contact → Livestream.
5. Design pass: hero interactions, custom cursor, scroll reveals, portfolio filtering/transitions — apply `docs/DESIGN_SYSTEM.md` once structure/content is real.
6. Polish: SEO meta per page (Inertia head management via `<Head>`), sitemap, contact form email notification, image optimization pass.

## 9. Repo-specific guardrails

- Don't invent portfolio/company copy as if it were real Waridi Media history — use clearly placeholder text (e.g. "Sample corporate shoot for [Client]") until the human supplies real copy/assets.
- Don't pull real images/copy from the three inspiration sites (Pelicula, Foturo, the drone theme) — they're licensed commercial themes. Use them only for layout/interaction ideas as described in `docs/DESIGN_SYSTEM.md`, and use placeholder or stock-safe imagery in scaffolding.
- Keep the admin panel and public site sharing one Laravel app/one Inertia setup — no separate SPA build, no separate API project.
- When a spec detail isn't covered in `docs/PROJECT_SPEC.md`, pick the most reasonable option, note the assumption in your response, and keep moving rather than stalling on a clarifying question.
