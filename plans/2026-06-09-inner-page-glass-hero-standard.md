# Plan: Adopt the about-v2 Glass Hero as the Inner-Page Standard

**Created:** 2026-06-09
**Status:** Implemented
**Request:** Rework Eligibility, How It Works, and News to use the about-v2 transparent-glassmorphism hero (panel + card row) at a consistent start placement; enlarge eligibility sector cards to single-project-page dimensions; make news hero cards white; compress the 9 how-it-works steps into 4 brand-coloured cards (last dark).

---

## Overview

### What This Plan Accomplishes

Establishes the about-v2 hero (transparent frosted-glass panel sitting in the 1280px band, breadcrumb + label + title + optional description, a staggered card row, and a white fade-out into the next section) as the **shared standard** for inner pages. Eligibility, How It Works, and News are migrated onto it via a new reusable `GlassHero` component, while Projects and single-project pages are explicitly left on the existing `InnerPageHero`.

### Why This Matters

The site currently has two hero idioms: the new about/about-v2 glass treatment and the older `InnerPageHero` glassmorphism with inconsistent placement (`pt-44`, `min-h-[80vh]`). Unifying inner pages on one hero component gives consistent vertical placement ("all cards start at the same point"), a single source of truth for the hero look, and a cleaner editorial entry into each page.

---

## Current State

### Relevant Existing Structure

- `app/about-v2/page.tsx` — the **reference hero** to standardise on. Key specs:
  - Section: `relative w-full overflow-hidden bg-brand-dark pt-56 md:pt-64 pb-40`
  - Parallax bg `<motion.img>` + `bg-[#00314b]/75` + `bg-gradient-to-b from-[#00314b]/30 via-transparent to-transparent`
  - White fade: `absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-b from-transparent via-white/40 to-white z-[2]`
  - Panel wrapper: `relative z-10 max-w-[1280px] mx-auto w-full px-6 lg:px-0`
  - Panel: `bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[6px] px-8 md:px-12 pt-8 pb-10`
  - Breadcrumb (light: `text-gray-300`, active `text-brand-accent`), label row (`bg-brand-accent` rule + `text-brand-accent` mono), `h1` white with `text-brand-accent` / `text-[#9BB7B1]` accents, intro `text-white/70`
  - Card row: `statRow`/`statCard` Framer variants (staggerChildren 0.12, delayChildren 0.55)
- `components/InnerPageHero.tsx` — legacy hero used by eligibility, news, how-it-works, contact, and `projects/[id]`. Has `lightPanel` prop. Placement: `min-h-[80vh] lg:min-h-[85vh] pt-44 pb-20`, container `container mx-auto px-6`.
- `components/ui/StatCard.tsx` — `StatCard` / `SliderStatCard` with `theme: 'light' | 'glass' | 'cyan' | 'green'` and `flat`.
- `components/ui/ProjectBentoMetric.tsx` — the single-project hero card the eligibility sectors must match: **`border p-8 min-h-[220px] rounded-[6px]`**, value `text-4xl md:text-5xl`, label `text-[10px] uppercase tracking-[0.2em]`, dark variant `bg-[#02100d] border-[#144D3F]`.
- `app/eligibility/page.tsx` — `SectorScroller` (cards `h-36 p-5`, `CARD_STYLES` white→cyan→green), passes `<InnerPageHero lightPanel>`, description currently lives in the body section (`max-w-4xl mb-24`).
- `app/news/page.tsx` — hero carousel cards are glass (`bg-white/[0.04]`, white text, `h-40 md:h-44`); listing grid cards already white.
- `app/how-it-works/page.tsx` — `InnerPageHero` with `heroCards`; `FUNDING_STEPS` (9 steps); detailed sections below.
- `components/Navbar.tsx` — `isWhite = scrolled` (transparent-at-top default already in place for all pages).

### Gaps or Problems Being Addressed

- Two competing hero treatments and inconsistent hero start placement across inner pages.
- Eligibility sector cards are small (`h-36`) — requested to match the larger single-project bento cards.
- News hero cards are glass/dark instead of white.
- How It Works hero uses 3 generic `heroCards`; the 9-step process is only shown as a long timeline, not a compact 4-card summary.

---

## Proposed Changes

### Summary of Changes

- Create a reusable **`GlassHero`** component replicating the about-v2 hero (placement, glass panel, white fade-out, breadcrumb/label/title/description, children card-row slot, optional staggered entrance).
- Migrate **Eligibility**, **News**, **How It Works** heroes to `GlassHero`.
- **Eligibility:** title unchanged, add the provided description, enlarge `SectorScroller` cards to `p-8 min-h-[220px]` (ProjectBentoMetric dims), keep white→cyan→green + slider.
- **News:** convert hero carousel cards to **white** background with dark text; keep existing subtitle/description.
- **How It Works:** add a generated description (via `/copywriter`); add a 4-card compressed-steps row in the hero (brand colours; last card dark) generated from the 9 steps.
- Leave **`InnerPageHero`**, **Projects listing**, and **`projects/[id]`** unchanged.

### New Files to Create

| File Path | Purpose |
| --------- | ------- |
| `components/GlassHero.tsx` | Reusable about-v2-style transparent glass hero (placement, panel, white fade-out, breadcrumb/label/title/description, children slot, optional stagger). |
| `components/ui/StepCard.tsx` | Compressed how-it-works step card matching the about-v2 stat-card row (themes incl. dark), used for the 4-card hero summary. |

### Files to Modify

| File Path | Changes |
| --------- | ------- |
| `app/eligibility/page.tsx` | Replace `InnerPageHero` with `GlassHero`; move the provided description into the hero under the title; enlarge `SectorScroller` cards to `p-8 min-h-[220px]` and adapt internals; keep slider + white/cyan/green. |
| `app/news/page.tsx` | Replace `InnerPageHero` with `GlassHero` (keep current subtitle/title); restyle the hero carousel cards to white bg + dark text; keep carousel logic/nav. |
| `app/how-it-works/page.tsx` | Replace `InnerPageHero` with `GlassHero`; add generated description; add 4 `StepCard`s (compressed from `FUNDING_STEPS`) in the hero card row; **keep** the lower 9-step timeline unchanged. |
| `app/contact/page.tsx` | Replace `InnerPageHero` with `GlassHero` (keep current title/subtitle and any hero children); recolour hero content for the glass panel as needed. |
| `components/ui/StatCard.tsx` | (Optional) add a `dark` theme if `StepCard` is implemented as a `StatCard` theme instead of a separate component. |

### Files to Delete (if any)

None. `InnerPageHero` remains for Projects/Contact/single-project.

---

## Design Decisions

### Key Decisions Made

1. **New `GlassHero` component instead of extending `InnerPageHero`** — `InnerPageHero` must stay byte-identical for `projects/[id]` (different placement, breadcrumb logic, `project-detail` handling). A separate component avoids regressions and gives the migrated pages the exact about-v2 placement.
2. **`GlassHero` exposes a `children` card-row slot** — each page supplies its own row (eligibility sectors, news carousel, how-it-works step cards), exactly like about-v2 supplies its stat row.
3. **Eligibility cards match `ProjectBentoMetric` dimensions (`p-8 min-h-[220px] rounded-[6px]`)** — per the explicit "exact dimension" request; keep the existing `CARD_STYLES` colour cycle and slider.
4. **News hero cards → white** — reuse the listing grid card aesthetic (white, `border-gray-200/50`, dark text, brand-accent meta) adapted to the horizontal carousel layout.
5. **How It Works 4-card summary derived from the 9 steps** — grouped into 4 phases; copy generated by `/copywriter`; rendered with brand colours (white → cyan → green → dark) like the about-v2 row.
6. **Description text comes from `/copywriter`** for How It Works; Eligibility uses the user-provided paragraph verbatim; News keeps its current subtitle.

### Alternatives Considered

- **Extend `InnerPageHero` with a `variant="glass-v2"`** — rejected: branching placement/breadcrumb/children logic inside one component is error-prone and risks the project pages.
- **Make `StepCard` a 4th `StatCard` theme (`dark`)** — viable and DRY; chosen as a fallback if `StepCard` proves redundant. Default plan keeps a small dedicated `StepCard` for step number + title + desc semantics.

### Open Questions

1. **How It Works lower timeline:** ✅ CONFIRMED — **keep** the full 9-step timeline section below the hero; the hero adds the 4-card summary.
2. **Eligibility body description duplication:** ✅ CONFIRMED — **move the paragraph to the hero and remove the body duplicate.**
3. **Contact page:** ✅ CONFIRMED — **migrate Contact to `GlassHero` too** for full inner-page consistency.

> All open questions resolved — plan is ready to implement.

---

## Step-by-Step Tasks

### Step 1: Create `components/GlassHero.tsx`

Build a reusable hero from the about-v2 markup.

**Actions:**

- Props: `title: React.ReactNode`, `subtitle?: string` (mono label), `description?: React.ReactNode`, `bgImage: string`, `currentPage: string` (breadcrumb active label), `children?: React.ReactNode` (card row), `accentClass?` (default `text-brand-accent`).
- Reproduce about-v2 section shell: `bg-brand-dark pt-56 md:pt-64 pb-40`, parallax `useScroll`/`useTransform` bg, `bg-[#00314b]/75` overlay, top gradient, and the **white fade-out** `absolute bottom-0 h-56 from-transparent via-white/40 to-white z-[2]`.
- Panel wrapper `max-w-[1280px] mx-auto w-full px-6 lg:px-0`; panel `bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[6px] px-8 md:px-12 pt-8 pb-10` with the entrance `motion.div`.
- Breadcrumb: `home / <currentPage>` (light theme, `useRouter().push` like InnerPageHero); label row; `h1` white; render `description` as `text-white/70` paragraph when provided.
- Render `children` below the header for the card row.

**Files affected:** `components/GlassHero.tsx`

---

### Step 2: Migrate Eligibility hero + enlarge sector cards

**Actions:**

- Replace the `<InnerPageHero lightPanel …>` usage with `<GlassHero title={…unchanged…} subtitle="Pre-qualification standards" description={<the provided paragraph>} bgImage={…} currentPage="eligibility">` wrapping `<SectorScroller />`.
- Provided description (verbatim): "We believe in promoting sustainable and innovative projects that will help reduce the impacts of climate change, and to achieve this goal, we have established a set of eligibility criteria that must be met before applying for funding. By reviewing this page, you will gain a better understanding of what we are looking for in a project and whether your initiative is a good fit for our facility."
- Enlarge `SectorScroller` cards: wrapper `rounded-[6px] p-8 min-h-[220px]` (was `h-36 p-5`); bump title to `text-lg`, desc to `text-sm`, icon to `w-10 h-10`; keep 3-visible slider and `CARD_STYLES` (white/cyan/green). Card text colours already light-on-colour; ensure the white card (`CARD_STYLES[0]`) reads on the glass panel (keep `bg-[#FAFDFB] border border-gray-200`).
- Remove the now-duplicated description paragraph from the body "Pre-qualification" block (per Open Q3 default).

**Files affected:** `app/eligibility/page.tsx`

---

### Step 3: Migrate News hero + white carousel cards

**Actions:**

- Replace `<InnerPageHero …>` with `<GlassHero title={News & media center} subtitle="Stay updated on the green transition" bgImage={…} currentPage="news">` wrapping the existing carousel block (keep subtitle; no new description).
- Restyle carousel card: `bg-white hover:bg-white border border-gray-200/50 hover:border-brand-primary/30` ; text → dark (`text-brand-dark`, meta `text-gray-400`, excerpt `text-gray-500`), tag `text-brand-primary`; keep `h-40 md:h-44`, thumbnail, and "Read Article" affordance (switch its colour to brand-primary).
- Keep carousel state, `translateValue`, progress bar, and prev/next buttons; recolour nav buttons for contrast on the glass panel if needed.

**Files affected:** `app/news/page.tsx`

---

### Step 4: Create `components/ui/StepCard.tsx` (compressed how-it-works card)

**Actions:**

- Props: `index: string` (e.g., "01"), `title`, `desc`, `theme: 'light' | 'cyan' | 'green' | 'dark'`.
- Match about-v2 stat-card surface system: light = white gradient; cyan = `bg-brand-cyan`; green = `bg-brand-primary`; dark = `bg-[#02100d] border-[#144D3F]` (per ProjectBentoMetric dark). White text on coloured/dark; dark text on light.
- Layout mirrors the stat card: index (mono), title (`text-lg font-bold`), desc (`text-sm`), bottom accent line; `min-h` consistent with the about-v2 row.

**Files affected:** `components/ui/StepCard.tsx`

---

### Step 5: Migrate How It Works hero + 4-card summary

**Actions:**

- Replace `<InnerPageHero cards={heroCards} …>` with `<GlassHero title={How it Works} subtitle="Financing structure" description={<generated>} bgImage={…} currentPage="how-it-works">` wrapping a 4-col `motion.div` row of `StepCard`s using the about-v2 `statRow`/`statCard` stagger.
- The 4 cards are generated by `/copywriter` from `FUNDING_STEPS` (9→4 phases). Suggested grouping for copywriter input:
  - **Card 1 (white):** steps 01–02 — "Apply & Pre-qualify" (checklist, request letter, origination/eligibility check).
  - **Card 2 (cyan):** steps 03–04 — "Mandate & Credit Approval" (KYC, mandate letter, credit committee).
  - **Card 3 (green):** steps 05–07 — "Due Diligence & Structuring" (ESG/technical/legal DD, investment review, facility approval).
  - **Card 4 (dark):** steps 08–09 — "Conditions & Financial Close" (CP satisfaction, guarantee execution, disbursement).
- Description: generated by `/copywriter` (1–2 sentences summarising the blended-finance pathway).
- Lower sections: per Open Q1 default, **keep** Section 1 (financing structure), Section 2 (capital-flow diagram), and Section 3 (full 9-step timeline) unchanged.

**Files affected:** `app/how-it-works/page.tsx`

---

### Step 5b: Migrate Contact hero

**Actions:**

- Replace Contact's `<InnerPageHero …>` with `<GlassHero title={…current…} subtitle={…current…} bgImage={…current…} currentPage="contact">`, preserving any existing hero children (cards/form intro).
- Recolour any hero content that assumed the old panel so it reads on the transparent glass (light text, brand-accent labels), matching about-v2.

**Files affected:** `app/contact/page.tsx`

---

### Step 6: Copy generation (`/copywriter`)

**Actions:**

- Run `/copywriter` to produce: (a) the How It Works hero description, (b) the four step-card titles + 1–2 line descriptions using the Step 5 groupings, in the site's institutional voice.
- Feed results into Step 5.

**Files affected:** `app/how-it-works/page.tsx`

---

### Step 7: Carousel/slide polish (`/frontend-carousel-slides`)

**Actions:**

- Run `/frontend-carousel-slides` to validate/upgrade the News hero carousel and the Eligibility `SectorScroller` against best-practice slide UX (equal heights, snapping, a11y of prev/next, progress indicator) after the resize/restyle.

**Files affected:** `app/news/page.tsx`, `app/eligibility/page.tsx`

---

### Step 8: Validation

**Actions:**

- `cd .../V23 && npx tsc --noEmit` → clean.
- `curl` 200 for `/eligibility`, `/news`, `/how-it-works`, `/contact`, `/about-v2`, `/projects`, a `/projects/{id}`.
- Visual: hero panels start at identical placement across eligibility/news/how-it-works/contact/about-v2; Projects + single project unchanged; nav transparent→white on scroll on all.

**Files affected:** n/a (verification)

---

## Connections & Dependencies

### Files That Reference This Area

- `components/Navbar.tsx` — already transparent-at-top everywhere; relies on all heroes being dark at the top. `GlassHero` keeps the dark `bg-brand-dark` top, so the light logo stays visible.
- `components/InnerPageHero.tsx` — after this work, consumed **only** by `app/projects/[id]/page.tsx`; must remain unchanged for it.

### Updates Needed for Consistency

- If `StepCard` is folded into `StatCard` as a `dark` theme, update `StatTheme` and the `SURFACE`/`TEXT`/`DOT_INACTIVE` maps.
- Update memory `project_cfbf.md` with the new `GlassHero` standard and which pages use it vs `InnerPageHero`.

### Impact on Existing Workflows

- Eligibility body loses its duplicated description paragraph (moved to hero).
- How It Works gains a hero summary; the long timeline remains as the authoritative detail.

---

## Validation Checklist

- [ ] `GlassHero` renders identically-placed heroes on eligibility, news, how-it-works (matches about-v2).
- [ ] Eligibility sector cards are `p-8 min-h-[220px]`, 3 visible, white/cyan/green, slider works.
- [ ] Eligibility description appears in hero; body duplicate removed.
- [ ] News hero carousel cards are white with dark text; carousel nav/progress intact.
- [ ] How It Works hero shows 4 brand-coloured step cards (last dark) with staggered entrance + generated copy.
- [ ] Contact hero migrated to `GlassHero` and reads correctly on the glass panel.
- [ ] Projects listing and `projects/[id]` are visually unchanged (still `InnerPageHero` / custom).
- [ ] `npx tsc --noEmit` clean; all routes return 200.

---

## Success Criteria

1. Eligibility, News, and How It Works share the about-v2 hero placement and glass treatment via a single `GlassHero` component.
2. Eligibility sectors match the single-project card dimensions exactly; News hero cards are white; How It Works hero compresses the 9-step flow into 4 brand-coloured cards (last dark) with copywriter-generated text.
3. Projects and single-project pages remain untouched; typecheck clean; all pages load.

---

## Notes

- Reuse the about-v2 `statRow`/`statCard` variants (export them from a shared module or redefine inside `GlassHero`) so every migrated card row shares the same staggered entrance.
- Consider extracting the white→cyan→green→dark surface tokens into one place (`StatCard` theme map) to keep eligibility sectors, about-v2 stats, and how-it-works step cards visually in lockstep.
- Defer Contact-page migration unless requested; capture as a follow-up.


---

## Implementation Notes

**Implemented:** 2026-06-09

### Summary

- Created `components/GlassHero.tsx` (reusable about-v2 hero: placement, glass panel, white fade-out, breadcrumb/label/title/description, children slot, exported `heroRowVariants`/`heroCardVariants`).
- Created `components/ui/StepCard.tsx` (light/cyan/green/dark themes, `min-h-[220px]`).
- Migrated `app/eligibility/page.tsx`, `app/news/page.tsx`, `app/how-it-works/page.tsx`, `app/contact/page.tsx` from `InnerPageHero` to `GlassHero`.
- Eligibility: description moved into hero (body duplicate removed); sector cards enlarged to `p-8 min-h-[220px]` (ProjectBentoMetric dims) with light-on-dark slider, white/cyan/green kept.
- News: hero carousel cards restyled to white background + dark text.
- How It Works: generated description + 4 staggered StepCards (last dark) condensing the 9 steps; full 9-step timeline kept.
- Contact: 3 partnership cards rendered as a staggered light/cyan/green StepCard row.
- Extra request: swapped `/about` (now the glass hero) and `/about-v2` (now the white-panel version).

### Deviations from Plan

- `/copywriter` (Step 6) and `/frontend-carousel-slides` (Step 7) were executed inline during implementation (copy authored directly per the planned groupings; carousel best-practices applied during the restyle) rather than as separate nested skill runs.
- Added the about <-> about-v2 page swap, requested alongside `/implement`.
- `InnerPageHero` retains its now-unused `lightPanel` prop (harmless; left for the single-project page which still consumes the component).

### Issues Encountered

None — `npx tsc --noEmit` clean; all routes (`/about`, `/about-v2`, `/eligibility`, `/news`, `/how-it-works`, `/contact`, `/projects`, `/projects/{id}`, `/`) return 200.
