# Design System — Waridi Photo Studio

Source of truth for visual identity: **client-provided brand collateral** (logo lockup + services graphic), not the inspiration sites. The inspiration sites (Pelicula, Foturo, drone theme) inform *structure and interaction patterns only* — the actual palette, typography feel, and tone come from the brand assets below. Where the two conflict, brand assets win.

"Waridi" is Swahili for rose/flower. The brand is built around that: a gold rose wrapped around a camera lens as the logomark, an elegant gold serif wordmark, and a warm, luxury-photography-studio tone — closer to a high-end portrait/wedding studio than a gritty film-production house. Tagline: **"Where Moments Become Memories."**

## Logo & lockup
- **Mark**: a gold/champagne rose encircling a camera lens (aperture visible at the rose's center), with a small leaf accent. Renders well on white/cream.
- **Wordmark**: "WARIDI" in a bold gold serif (thick/thin contrast, small drop-shadow bevel in the source art — keep that gold "foil" feel via a subtle gradient, not flat gold fill, for hero/large uses), with "PHOTO STUDIO" beneath in a smaller, wide-tracked black sans-serif.
- **Tagline lockup**: "Where Moments Become Memories" set in a gold script/calligraphic face — use only in hero/footer/print contexts, never at small sizes or in UI chrome.
- Keep a clear-space margin around the mark at least the height of the rose icon. Never recolor the rose (always gold/champagne), never place it on a busy photo without a scrim behind it.

## Color tokens

```
--color-bg:            #FFFFFF   /* primary background — clean white */
--color-bg-cream:      #FBF6EC   /* warm cream — alt section background, matches brand collateral */
--color-surface:       #FFFFFF   /* cards */
--color-surface-alt:   #F5EFE1   /* subtle warm card/hover surface */
--color-text:          #1A1A1A   /* near-black, primary text */
--color-text-muted:    #5C5850   /* secondary text, warm-toned gray */
--color-gold:          #C9A227   /* base gold — primary brand accent */
--color-gold-light:    #E8C766   /* lighter gold, for gradients/hover */
--color-gold-deep:     #8A6A16   /* deep gold/bronze, for gradient shadow side and text-on-light emphasis */
--color-black:         #141414   /* true near-black, used in wordmark subline + dark UI accents */
--color-border:        #E8DFC8   /* warm hairline border on light backgrounds */
--color-border-dark:   #2A2A2A   /* border for dark sections (footer, dark CTA bands) */
--color-success:       #4C8A5E
--color-live:          #C9432E   /* "LIVE" badge — warm red, not a cold error-red, to stay in-palette */
```

Gold should render as a **gradient**, not a flat fill, anywhere it appears at display size (wordmark, big headlines, buttons' hover glow): `linear-gradient(135deg, var(--color-gold-light), var(--color-gold), var(--color-gold-deep))`. Flat `--color-gold` is fine for small UI (icons, badges, links, form focus rings).

Default posture is **light** (white/cream), gold as accent, near-black for text and grounding elements. Use a near-black section (`--color-black` background, cream/white text) sparingly for a footer or one dramatic full-bleed section break per page (e.g. a Media Production/drone/livestream showcase band on Home or Services) — this is where the Pelicula-style cinematic drama earns its place, as contrast to the otherwise light, airy studio feel, not as the default.

## Typography

- **Display / wordmark-style headings**: a bold, high-contrast serif for hero headlines and the brand wordmark itself — e.g. "Playfair Display" or "Cormorant" at a heavy weight, rendered in the gold gradient for hero moments, near-black for regular section headings.
- **Script accent**: a calligraphic/script face (e.g. "Alex Brush" or "Great Vibes") reserved strictly for tagline usage ("Where Moments Become Memories") in hero and footer — never for body copy, nav, or buttons.
- **Body / UI**: a clean, warm sans ("Inter", "Work Sans", or "Jost" for a slightly more editorial feel) for body copy, forms, nav, and all admin-panel UI.
- **Eyebrow labels** (e.g. "OUR SERVICES", category labels): small caps or all-caps, wide letter-tracking, thin weight, often gold, echoing the hairline-and-diamond divider motif seen in the brand collateral (a small ornamental divider — thin line + tiny diamond/dot — flanking short labels).
- **Scale**:
  - Eyebrow/label: 0.75rem, uppercase, tracking-[0.2em]
  - Body: 1rem / 1.65 line-height
  - Section heading: clamp(2rem, 4vw, 3rem), serif
  - Hero heading: clamp(2.75rem, 8vw, 6.5rem), serif, gold gradient
- Admin panel typography stays restrained/utilitarian — body sans only, no serif/script — for speed and clarity.

## Ornamental motifs (pull directly from the brand collateral)
- **Divider rule**: a thin horizontal gold line with a small centered diamond or dot — use to flank short eyebrow labels ("— OUR SERVICES —") and to separate hero title from subtitle.
- **Circular frame**: the logo's rose sits inside a thin gold ring — echo this as a circular image-crop treatment for team member photos or a "meet the studio" portrait.
- **Icon style**: thin-line/outline icons (camera, family, graduation cap, rings, drone, mic, paint roller, etc.) in gold or black, matching the two reference service graphics — use `lucide-react` icons but restyle stroke color to gold on hover/active.

## Spacing & layout
- Base unit 4px (Tailwind default scale). Public-site sections use generous, airy vertical rhythm: 96–140px section padding on desktop, 56–72px on mobile — the brand feels premium/uncluttered, not dense.
- Max content width ~1280px for most sections; ~1440px for full-bleed hero/gallery imagery; ~960px for text-heavy content (About story, blog post body) for readable line length.
- Services are presented in **three grouped panels** (Photography / Media Production / Print & Creative), each with a small gold pill/badge label and a bulleted icon list — mirror the two-column "Our Services" layout from the brand collateral directly on the Services page, and use a condensed single-row icon strip (matching the first image's horizontal service icons) on the Home page teaser.
- Portfolio grid: clean masonry, generous gutters, white/cream background between images (not edge-to-edge dark grid) — closer to Foturo's airy gallery than Pelicula's dense dark grid.

## Motion
- **Scroll reveals**: fade+rise (12–20px translate, 400–600ms ease-out), staggered for grid/icon-list items. Implement with `framer-motion`'s `whileInView`.
- **Hover on portfolio items**: subtle scale (1.0 → 1.03) plus a soft gold-tinted overlay and caption slide-up — no heavy dark scrim (keep the light, airy feel even on hover).
- **Hover on service icons**: icon stroke transitions from black/gold to full gold gradient; a thin gold underline draws in beneath the label.
- **Custom cursor**: optional, desktop-only, small gold ring cursor that expands slightly over interactive/portfolio elements. Must fully disable on touch devices and respect `prefers-reduced-motion`.
- **Parallax**: subtle (10–15%) on hero and full-bleed section-break imagery only.
- **Page transitions**: brief (150–200ms) fade on the main content container for Inertia navigation — keep it snappy.
- **"LIVE" badge**: pulsing dot in `--color-live`, static fallback under reduced-motion.

## Component patterns
- **SiteHeader**: white/transparent-over-hero, logo mark + "WARIDI" wordmark (small) on the left, primary nav (Work, Services, About, Livestream, Journal, Contact) centered/right, a gold-outline "Book a Shoot" CTA button. Transitions to a solid white header with a soft shadow on scroll.
- **Hero**: full-width (not necessarily 100svh — a strong 80–90vh works better for a lighter, editorial feel) hero image/slideshow of studio work, cream/white gradient scrim at the bottom third for text legibility, gold-gradient serif headline + script tagline + eyebrow "EXPERIENCE THE MAGIC OF" style label + one primary CTA.
- **ServiceGroupPanel**: gold pill badge (e.g. "PHOTOGRAPHY"), icon+label rows underneath with thin gold divider lines between rows — directly modeled on the brand's "Our Services" graphic.
- **PortfolioCard**: image preview, category eyebrow label, title, hover reveal of client/year, gold accent border on hover.
- **TestimonialSlider**: large serif quote typography, client name/role in gold small caps, autoplay with manual arrows.
- **CTASection**: either a cream band with centered gold-accented headline + button, or (sparingly) the one near-black dramatic band described above for Media Production/livestream promotion.
- **SiteFooter**: near-black (`--color-black`) background with cream text and gold accent links/icons — the one place the "dark cinematic" mode lives full-time, echoing the logo in reverse (gold on black, like the brand mark itself often appears on dark backers in print).
- **Admin shell**: clean light/neutral admin UI (white/light-gray surfaces, gold used only for primary buttons/active nav state and status accents) — do not use the script font or heavy gold gradients in the admin UI; keep it fast and legible.
- **Data tables (admin)**: sticky header, status badges (draft/published, new/contacted/booked/closed, upcoming/live/completed), gold-accented primary action buttons, row actions as icon buttons.

## Accessibility non-negotiables
- Gold text/gradient on white must be checked for WCAG AA contrast at body-copy sizes — reserve pure gold-on-white for large display type only; use `--color-text` (near-black) or `--color-gold-deep` for smaller gold-toned text to keep contrast safe.
- All motion (parallax, custom cursor, autoplay hero media, scroll reveals) must degrade gracefully under `prefers-reduced-motion: reduce`.
- Script/calligraphic tagline font is decorative only — never the sole carrier of essential information, and never used for interactive elements (buttons, links, form labels).
- Custom cursor never replaces default focus/keyboard interaction — all interactive elements remain fully keyboard-operable with a visible gold focus ring.
- Any autoplaying hero video is muted, has no essential audio content, and includes a visible pause control.
