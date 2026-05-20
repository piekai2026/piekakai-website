# PiekAI — Design System & Brand

> **The site itself is the demo of the product's craft.** A potential mid-market customer's first impression of PiekAI is the landing page; it must communicate seriousness, precision, and quality within 5 seconds.

This document gives Claude Code complete creative direction. No further input from M is required for design execution; M reserves the right to override any specific choice after seeing it built.

---

## Brand strategic positioning

- **Audience**: Dutch and EU growth-stage to mid-market business owners (€500k-5M revenue typically), marketing managers, and SEO/marketing professionals at agencies considering white-label reselling.
- **Emotional register**: confident, precise, premium, slightly understated. NOT bro-y. NOT scrappy. NOT corporate-stiff.
- **Reference brands**: Linear, Mercury, Vercel, Stripe, Raycast, Anthropic, Arc Browser, Pitch. We are closer to these than to any SEO tool's typical design.
- **Counter-references** (do NOT look like): Klusio (too playful), Ahrefs (data-dense and busy), SEMrush (corporate-blue), HubSpot (orange-and-bubbly).

A useful test: if a Linear or Mercury designer looked at `piekai.nl`, would they recognize it as belonging to their aesthetic family? If yes, we hit the mark.

---

## Color palette

Warm-neutral monochromatic base with a single decisive accent.

### Base palette

```
--bone-50:  #FAFAF7   (page background, light areas)
--bone-100: #F2F1EC   (card backgrounds)
--bone-200: #E8E6DE   (subtle borders, dividers)
--bone-300: #D4D1C6   (disabled states)
--bone-400: #A8A498   (placeholder text)
--bone-500: #6B6860   (secondary text)
--bone-600: #4A4842   (body text on light)
--bone-700: #2E2D28   (headings on light)
--bone-800: #1A1917   (primary text, near-black)
--bone-900: #0E0E0C   (deepest, used sparingly)
```

### Accent: forest green

PiekAI's accent is a deep forest green — evokes growth, longevity, peak. NOT corporate green; deeper, almost botanical.

```
--accent-50:  #E8EFE9
--accent-100: #C5D6C9
--accent-300: #6F9479
--accent-500: #3E6D4E   (primary accent, buttons, links)
--accent-700: #2A4D37   (hover states, deeper)
--accent-900: #1A3023   (deepest, rare use)
```

### Semantic colors (used sparingly)

```
--success: #3E6D4E    (same as accent — success and PiekAI are one)
--warning: #B8923D    (warm amber, never bright yellow)
--danger:  #A23E3E    (muted brick red, never alarm red)
--info:    #4A5E7A    (slate, for neutral info)
```

### Dark mode

For Phase 0, light mode only. Dark mode planned for Phase 2 (the dashboard especially benefits from it). Token system designed for easy dark mode flip later via CSS variables.

---

## Typography

Editorial-quality pairing: a refined serif for display, a high-craft sans for everything else.

### Type stack

```css
/* Display & headlines */
--font-display: "GT Sectra", "Tiempos Headline", "Cormorant Garamond", Georgia, serif;

/* Body & UI */
--font-body: "GT America", "Söhne", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

/* Monospace (code, technical, metrics) */
--font-mono: "Berkeley Mono", "JetBrains Mono", "SF Mono", Menlo, monospace;
```

**Reality check**: GT Sectra and GT America are licensed fonts. If budget is constrained, the fallback stack is excellent:
- Display: **Cormorant Garamond** (free, Google Fonts) — used by Klaas & Daams already, M is familiar
- Body: **Inter** (free, Google Fonts) — industry standard, exceptional
- Mono: **JetBrains Mono** (free) — beautiful, monospace

For Phase 0 we use the free fallbacks. License GT Sectra/GT America in Phase 3 once revenue justifies (~€500-1500/yr).

### Type scale

Major Third scale (1.25 ratio):

```
--text-xs:   12px / 16px line-height   (captions, meta)
--text-sm:   14px / 20px               (UI, secondary body)
--text-base: 16px / 26px               (body — generous leading)
--text-lg:   18px / 28px               (lead paragraphs)
--text-xl:   22px / 30px               (small headings, H4)
--text-2xl:  28px / 36px               (H3)
--text-3xl:  36px / 44px               (H2)
--text-4xl:  48px / 56px               (H1 on internal pages)
--text-5xl:  64px / 72px               (Hero headline desktop)
--text-6xl:  84px / 92px               (Hero headline desktop, dramatic only)
```

### Type rules

- **Headlines use serif** (`--font-display`) with `font-weight: 400` (NOT bold — refined, editorial). Use `letter-spacing: -0.02em` for tighter tracking.
- **Body uses sans** at `font-weight: 400` with `letter-spacing: -0.01em`. Body line-height is **always generous** (1.6-1.7) — premium feel.
- **UI elements** use sans at `font-weight: 500` for buttons, `font-weight: 400` for inputs and standard UI.
- **Numbers and metrics** in mono — adds a technical premium feel. E.g., "+47%" or "€12.847,00" or "1.4s response time" in mono.
- **NEVER use ALL CAPS for body or headlines.** Reserved only for tiny labels with letter-spacing.
- **NEVER use italic for emphasis.** Use weight or color instead.

### Headline examples

✅ *"Word de standaard. In Google. In ChatGPT. Overal."* (display serif, 64px, weight 400)
✅ *"40% van je klanten begint nu in ChatGPT. Niet in Google."* (display serif, 48px)
❌ "DOMINATE YOUR MARKET 🚀" (caps + emoji + bro-marketing)
❌ "**REVOLUTIONIZE YOUR SEO STRATEGY**" (bold + caps + cliché)

---

## Spacing & layout

### Spacing scale (multiples of 4)

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  96px
--space-10: 128px
--space-11: 192px
--space-12: 256px
```

### Layout grid

- Marketing site: max-width `1200px` on desktop, centered
- Reading width for body text: max `720px` (75-character measure)
- Generous gutters: `--space-7` minimum on desktop, `--space-5` on mobile
- Vertical rhythm: section gaps `--space-10` to `--space-11` on desktop

### Border radius

Restrained — premium products don't have huge rounded corners.

```
--radius-sm: 4px    (inputs, small buttons)
--radius-md: 6px    (cards, large buttons, default)
--radius-lg: 8px    (modals, large surfaces)
--radius-full: 9999px  (avatars only)
```

### Borders & dividers

Use hairlines, not heavy borders.

```
--border-color: var(--bone-200);
--border-width: 1px;
```

Almost everything that could have a "box" should instead have a **hairline border** + generous padding. No heavy shadows or 3D effects.

### Shadows

Used sparingly. Mostly avoided — prefer borders + spacing for separation.

```
--shadow-sm: 0 1px 2px 0 rgba(14, 14, 12, 0.04);
--shadow-md: 0 4px 12px -2px rgba(14, 14, 12, 0.08);
--shadow-lg: 0 16px 48px -8px rgba(14, 14, 12, 0.12);
```

Hover states may lift with `--shadow-md`. Modal overlays may use `--shadow-lg`. Otherwise: don't.

---

## Components

### Buttons

Three variants. Sizes: sm (32px height), md (40px, default), lg (48px), xl (56px, hero only).

**Primary** — solid forest accent:
```
background: var(--accent-500);
color: var(--bone-50);
border: 1px solid var(--accent-700);
font-weight: 500;
border-radius: var(--radius-md);
padding: 12px 24px;
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

hover: background var(--accent-700), translateY(-1px), shadow-md
active: translateY(0), shadow-none
```

**Secondary** — outline:
```
background: transparent;
color: var(--bone-800);
border: 1px solid var(--bone-300);

hover: border-color var(--bone-500), background var(--bone-50)
```

**Ghost** — text-only with hairline on hover:
```
background: transparent;
color: var(--bone-700);
border: 1px solid transparent;

hover: background var(--bone-100)
```

### Inputs

- Generous padding (12px vertical, 16px horizontal)
- Hairline border `--bone-300`, focus border `--accent-500`
- NO inset shadows. NO heavy box-shadows on focus. Use border + subtle outline ring.
- Placeholder color: `--bone-400`
- Label above input, weight 500, sans, 14px

### Cards

```
background: var(--bone-50);
border: 1px solid var(--bone-200);
border-radius: var(--radius-md);
padding: var(--space-6) to var(--space-7);
```

Cards never have shadows by default. Hover lifts with `--shadow-md` only if card is clickable.

### Code blocks

For Journal posts with code examples:
```
background: var(--bone-900);
color: var(--bone-100);
font-family: var(--font-mono);
font-size: 14px;
padding: var(--space-5);
border-radius: var(--radius-md);
```

Syntax highlighting via Shiki with `vesper` theme (warm, low-contrast).

---

## Logo

For Phase 0, M can use a simple wordmark while design freelance work happens in parallel. Specification:

### Wordmark (Phase 0 placeholder)

- Text: "PiekAI"
- Font: GT Sectra (or Cormorant Garamond fallback)
- Weight: 400 (NOT bold)
- Tracking: -0.04em (tight)
- Color: `--bone-800`
- Optional micro-mark: a small forest-green dot or triangle after the wordmark hinting at a peak

Build this as an inline SVG component, not an image — sharp at any resolution.

### Full identity (Phase 1)

In Phase 1, commission a proper logo from a designer:
- Mountain/peak motif abstracted (not literal mountain)
- Works at 16px (favicon) and 480px (hero)
- Light and dark variants
- Available on Dribbble/Behance designers: budget €500-1500 for one-off project

---

## Animation & motion

### Principles

- Restrained. Animations exist to **guide attention**, never to entertain.
- Default duration: 150-200ms for UI interactions, 400-600ms for entrance animations
- Default easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard easing)
- **Respect `prefers-reduced-motion`**: all non-essential animations disabled

### Approved motion patterns

1. **Hover lifts**: button or card translates `-1px` on Y, shadow grows subtly
2. **Fade-in on scroll**: sections fade in when entering viewport (Intersection Observer + Framer Motion)
3. **Hero subtle motion**: small SVG illustration that has perpetual gentle movement (e.g., a slowly drawing line representing a graph)
4. **Number counter animations**: numbers in hero/metrics count up from 0 once visible (only on first view, not on every scroll)
5. **Form feedback**: input border smoothly transitions on focus, error states slide-fade

### Banned motion patterns

- Spinning loaders larger than 24px (use skeleton screens)
- Bouncing or wobbling elements
- Parallax (cliché, slows the site)
- Auto-playing video
- Animated cursors / mouse trails
- Anything Lottie that takes >2 seconds to play
- Cursor-following elements (over-engineered)

---

## Imagery & illustration

### No stock photography

Stock photos signal "we don't have a real product yet." PiekAI uses:

1. **Custom abstract illustrations** — geometric, monochromatic with accent, evoking concepts (network, peak, growth, conversation) without literal imagery
2. **Live screenshots of PiekAI itself** — once dashboard exists in Phase 2, these become the primary imagery
3. **Diagrams** — clean, hand-drawn-feeling architecture or flow diagrams (use Excalidraw-style for Journal posts)
4. **Text-as-art** — large typographic statements as visual elements

### Tool stack for illustrations

- **Excalidraw** for Journal post diagrams (hand-drawn aesthetic, fast)
- **Figma + custom geometric shapes** for landing page illustrations
- **Real product screenshots** in Phases 2-3 once dashboard exists

For Phase 0 landing page, hero illustration is a custom SVG of:
- A subtle line graph climbing from bottom-left to top-right
- Hairline strokes in `--bone-400`
- Final point highlighted in `--accent-500` with a soft glow
- Optional: small typewriter-effect text overlay simulating a ChatGPT response mentioning a brand

This SVG should be coded directly (not exported from Figma) — keeps it lightweight, animatable, theme-able.

---

## Voice & tone

### Voice principles

PiekAI speaks as a confident, technical, but warm specialist. Like a senior consultant who knows the field deeply but explains things clearly.

- **Confidence without arrogance.** "PiekAI brengt je naar #1" not "We might be able to help you rank higher."
- **Specific over generic.** "12 citations gewonnen deze maand" not "vergrote zichtbaarheid."
- **Show the mechanism.** PiekAI's customers care about HOW it works. Be open about methodology.
- **Use Dutch idiomatically**, not translated. Native NL copy preferred.
- **Numbers in copy**: use `12,3%` not `12.3%` (Dutch decimal), `€12.847,00` (NL currency format).

### Tone register

- **Marketing site**: confident, slightly formal-aspirational, technical-warm
- **Dashboard**: clear, technical, action-oriented
- **Email**: friendly-professional ("je" not "u" for MKB; reassess for enterprise)
- **Error messages**: human, honest, action-oriented ("Iets ging mis bij het opslaan. We hebben het gemeld en kijken ernaar.")
- **Journal posts**: M's personal voice, first-person, build-in-public spirit

### Forbidden phrases

These phrases auto-fail copy review:
- "10x your business"
- "Dominate Google"
- "Skyrocket your traffic"
- "Game-changer"
- "Revolutionary"
- "Cutting-edge"
- "Synergize"
- "Crush the competition"
- Anything bro-marketing
- Emoji in marketing copy (use sparingly in Journal only)

### Approved phrasings

- "Naar de top. En daar blijven."
- "PiekAI is geen rapport. Het is een operatie."
- "Word de standaard."
- "Voor wie het serieus meent."
- "Gebouwd in Rotterdam. Werkt in heel Europa."
- "AI doet het werk. Wij meten de omzet."

---

## Accessibility (WCAG 2.2 AA minimum)

All Phase 0 work must pass:

- Color contrast: 4.5:1 minimum for body text, 3:1 for large text
- Focus indicators: visible, not removed, 2px outline using `--accent-500`
- Keyboard navigation: all interactive elements reachable, logical tab order
- Screen reader: semantic HTML, proper ARIA labels where needed, skip-to-content link
- Reduced motion: `prefers-reduced-motion: reduce` respected
- Form labels: always present and associated
- Image alts: descriptive (decorative images get `alt=""`)
- Headings: hierarchical (no skipping levels)

Verification:
- axe-core in dev mode
- Lighthouse accessibility 95+
- Manual screen reader test (VoiceOver on macOS) on landing page before launch

---

## Performance budget (Phase 0)

- LCP (Largest Contentful Paint): < 1.5s
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.05
- Total JS bundle: < 100KB compressed (before route-level chunks)
- Total CSS: < 30KB compressed
- Total page weight (landing): < 500KB
- Lighthouse score: 95+ on all four metrics

Achieve this by:
- Server components by default; client components only where interactive
- No client-side analytics in Phase 0
- Self-hosted fonts via `next/font` (downloaded at build time — zero runtime Google Fonts requests)
- SVG over PNG for all icons/illustrations
- No unused Tailwind classes (Tailwind 4 automatic content detection)

---

## File: `packages/design-tokens/tokens.css`

Claude Code creates this file at the start of landing page work. Contains all CSS variables defined above. Tailwind config extends from these. Single source of truth for the design system.

---

## What this design system is NOT (yet)

- It's not a full dashboard design — Phase 1 work expands this
- It's not a dark mode spec — Phase 2
- It's not finalized — M can override any token after seeing the first build
- It's not a logo — placeholder wordmark for Phase 0; proper logo Phase 1

---

*End of Design System. Claude Code has full creative authority within this framework. If a decision falls outside this document, Claude Code chooses what aligns with the reference brands (Linear, Mercury, Vercel) and asks M only when stuck.*
