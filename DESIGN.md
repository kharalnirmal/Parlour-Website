# Design System — Scent Parlor

This project uses a luxury, minimalist fragrance-commerce visual system. The interface should feel like stepping into a high-end fragrance boutique: refined, editorial, and tactile — inspired by NEXAWEB's aesthetic but adapted for Scent Parlor's own identity.

---

## Stack

- **Framework:** Next.js App Router + React + TypeScript
- **Styling:** Tailwind CSS v4 via `@theme inline` in `app/globals.css`
- **Components:** shadcn-style primitives in `components/ui`
- **Icons:** Lucide React
- **Motion:** GSAP (ScrollTrigger for reveals, timelines for hero/product reveals), Lenis for smooth scroll
- **Fonts:** Cormorant Garamond (serif, display headings), DM Sans (sans, body/UI)
- **Font source:** Google Fonts
- **Dark mode:** not planned for v1 — storefront is light/warm by default
- **Utilities:** `cn()` from `@/lib/utils`

---

## Visual Direction

Scent Parlor is a luxury perfume storefront, not a generic e-commerce template.

- Use warm cream/beige backgrounds, deep charcoal/black for grounding text, and rose-gold/copper accents for luxury highlights.
- Treat product cards like precious fragrance displays: minimal, centered, with generous whitespace and elegant typography.
- The signature element is `.scent-panel`: a refined backdrop with subtle warm tones and generous padding, evoking a gallery space.
- Headings use Cormorant Garamond for an editorial, high-fashion luxury personality with elongated elegance; body and controls stay clean in DM Sans.
- Avoid: bold gradients, playful animations, stock photography, and generic SaaS components.

---

## Color Tokens (extracted from NEXAWEB reference)

**Brand colors locked:** Warm cream/beige + deep charcoal + rose-gold accents + burgundy (footer).

| Token                | Value (light)             | Usage                                  |
| -------------------- | ------------------------- | -------------------------------------- |
| `background`         | `oklch(0.97 0.01 65)`     | Warm cream/beige canvas                |
| `foreground`         | `oklch(0.1 0.01 0)`       | Deep charcoal/black text               |
| `card`               | `oklch(0.99 0.002 75)`    | Product card surface (near-white)      |
| `primary`            | `oklch(0.72 0.14 55)`     | Rose-gold/copper CTAs & accents        |
| `primary-foreground` | `oklch(0.99 0.01 75)`     | Text on rose-gold                      |
| `secondary`          | `oklch(0.55 0.05 35)`     | Muted taupe/tan (secondary text)       |
| `accent`             | `oklch(0.72 0.14 55)`     | Rose-gold highlights (same as primary) |
| `muted`              | `oklch(0.94 0.01 65)`     | Section backgrounds, soft dividers     |
| `muted-foreground`   | `oklch(0.5 0.03 35)`      | Supporting copy, secondary labels      |
| `border`             | `oklch(0.3 0.01 0 / 10%)` | Card and input borders                 |
| `ring`               | `oklch(0.72 0.14 55)`     | Focus rings (rose-gold)                |
| `destructive`        | `oklch(0.6 0.2 25)`       | Error states                           |
| `footer-bg`          | `oklch(0.25 0.04 30)`     | Deep burgundy footer background        |

---

## Typography

| Token            | Font               | Usage                                        |
| ---------------- | ------------------ | -------------------------------------------- |
| `--font-display` | Cormorant Garamond | Hero headings, section titles, product names |
| `--font-sans`    | DM Sans            | Body copy, nav, buttons, forms, UI           |

Guidelines:

- Hero heading: `font-display`, light-to-regular weight, large scale (`text-5xl` to `text-7xl`), elegant letterforms with generous letter-spacing for luxury editorial feel.
- Eyebrow label: `font-sans text-xs`, uppercase, tracked wide, muted color, medium weight — e.g. "CRAFTED TO INSPIRE", "OUR COLLECTION".
- Section titles: `font-display text-4xl md:text-5xl`, light-regular weight, paired with a subtle rose-gold underline or accent.
- Product name: `font-display text-lg md:text-xl font-light`, centered above price, elongated elegance.
- Price: `font-sans text-sm`, gray/muted color, regular weight.
- Body copy: `font-sans leading-7`, regular weight, comfortable measure, generous line height for luxury pacing.

---

## Core Utilities

Defined in `app/globals.css`:

- `.scent-panel`: refined card surface with subtle warm tone, generous padding, used for hero sections and feature rows.
- `.fragrance-card`: minimal product card — centered image, name, price below, "SHOP NOW" link in rose-gold.
- `.luxury-cta`: primary button — pill shape, rose-gold fill, dark text, minimal hover state (subtle lift).
- `.eyebrow-label`: uppercase, tracked, muted color, small size for section labels.
- `.feature-strip`: horizontal row of 4 feature icons + text, used for "Why Choose Scent Parlor" section.
- `.story-panel`: left-aligned image + right-aligned text, full-width, used for "Our Story" section.
- `.newsletter-banner`: dark burgundy banner with centered form, used for email signup section.

---

## Components

### Navigation

Sticky top nav with logo center, links spread across (HOME, ABOUT, COLLECTION, INGREDIENTS, CONTACT), search icon right, optional cart icon (can be added later).

### Cards

Product cards use `.fragrance-card`: centered product image, name (Playfair), price (gray), "SHOP NOW" link in rose-gold. Cards sit in a responsive grid (5 columns on desktop, 2–3 on tablet, 1 on mobile).

### Buttons

Primary: `.luxury-cta` — pill shape, rose-gold fill, dark text, no shadow, subtle hover lift.
Secondary: Outline in rose-gold with transparent background.

### Badges / Labels

Eyebrow labels use `.eyebrow-label` — uppercase, tracked, muted taupe color.

### Forms

Newsletter input: large rounded corners, cream background with muted border, focus ring in rose-gold. Subscribe button in rose-gold.

---

## Layout

Sections to build (from NEXAWEB reference, adapted):

1. **Hero banner** (eyebrow label, large headline, body copy, CTA button, hero perfume bottle image on right)
   - Can use static image or light carousel (optional)
2. **Our Collection** (section eyebrow, title, subtitle, product grid 5 columns with name/price/"SHOP NOW")
3. **Our Story** (section eyebrow, title, body copy on right, lifestyle image on left)
4. **Why Choose Scent Parlor** (4-column feature row: icons + title + description)
5. **Newsletter signup** (dark burgundy banner, centered, email input + subscribe button)
6. **Footer** (multi-column: Quick Links, Customer Care, Help, Contact Us + social icons)

Explicitly **excluded from v1**: cart flow (icon only, no functionality yet).

```tsx
<main className="bg-background min-h-screen">
  <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
```

---

## Motion (GSAP + Lenis)

- **Lenis** drives all scroll — no native scroll-snap competing.
- **GSAP ScrollTrigger** for section reveals: fade + subtle downward-to-normal translate as sections enter viewport.
- **Product grid**: staggered entrance (each card fades/lifts in sequence) as the collection grid scrolls into view.
- **Hero**: light entrance on load (eyebrow, headline, copy, image each stagger in gently) — restrained, luxury pacing.
- **Hover micro-interactions**: product card image slight scale, CTA button opacity change — CSS transitions fine, GSAP reserved for scroll-driven moments.
- Keep motion refined and slow (300–600ms ranges); this is a luxury storefront, not an entertainment site.

---

## Assets

All image assets stored in `public/`:

- `public/hero/` — hero banner image (luxury perfume bottle, lifestyle background)
- `public/products/` — individual perfume bottle images (5+ for collection grid)
- `public/story/` — lifestyle/editorial image for "Our Story" section
- `public/icons/` — feature icons for "Why Choose" section (leaf, bottle, diamond, heart, etc.)

Google Fonts to import:

- `Cormorant Garamond` (weights: 300, 400, 600) — display headings
- `DM Sans` (weights: 400, 500, 600) — body, UI, nav

---

## Accessibility

- Maintain visible focus rings (rose-gold) on all interactive elements.
- Ensure sufficient contrast on beige backgrounds (charcoal text passes AA).
- Motion: respect `prefers-reduced-motion` — disable/simplify GSAP reveals for users who request it.
- Product names and prices must be accessible text, not image-only.
- Newsletter form needs proper label/aria attributes.

---

## Open Questions (for discussion)

1. **Cart functionality** — include cart icon in nav for future, or skip entirely in v1? skip it
2. **Product data structure** — how many perfumes in collection grid? Are these hardcoded or pulled from a data file?
3. **Hero image** — single static image or light carousel (optional nice-to-have)?
4. **Social links** — which social platforms in footer (Instagram, Facebook, TikTok, Pinterest)?
5. **Contact form** — does "CONTACT" page need a form component, or just a contact info section?
