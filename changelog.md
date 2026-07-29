# Changelog

## 2026-06-09

### Contact polish + Media mega-menu

- `app/contact/page.tsx` — moved the "Whether you are a clean energy developer…" copy into the hero `description`; removed the duplicate body "Contact us" title/description so the body starts at the form/contact boxes; removed `shadow-sm` from the contact + form panels.
- `components/Navbar.tsx` — renamed **News → Media** with a hover **mega menu** (Latest News from `newsData`, Latest Impact Stories from `projectsData`). New `solid = scrolled || mediaOpen` state: hovering Media on a dark/transparent page morphs the whole nav to the white scrolled state (full-width, dark logo/menu) and drops the white mega panel; closes on leave with a 140ms bridge timer; closes on route change.

### Blog hero, count-up numbers, immersive section animations

- `components/GlassHero.tsx` — added `panel` prop (`glass`/`white`) with theme tokens so the hero can render a solid white card at the standard placement.
- `app/news/[id]/page.tsx` — single blog hero migrated to `GlassHero panel="white"` (tag → subtitle, metadata row as children, breadcrumb home/news/tag); standard placement + entrance.
- `components/ui/CountUp.tsx` — rewritten to parse `"£10M" / "7,500+" / "₦7.86B+" / "48%"` style strings (prefix/number/suffix, commas, decimals) and count up **each time in view**; keeps the legacy numeric `to` prop for `components/home/Impact.tsx`.
- Count-up wired into `components/ui/StatCard.tsx` (StatCard + SliderStatCard), `components/ui/ProjectBentoMetric.tsx`, `app/projects/page.tsx` (5 bento stats), and `app/about/page.tsx` + `app/about-v2/page.tsx` (market-opportunity bento + stat strips).
- `components/ui/ProjectBentoMetric.tsx` — now a `motion.div` using `heroCardVariants`; `app/projects/[id]/page.tsx` metrics grid is a stagger container so single-project stats stagger in (matching the listing page).
- Inner pages (`about`, `about-v2`, `eligibility`, `how-it-works`, `contact`, `news`, `projects`, `projects/[id]`) — flipped 33 `viewport once:true → once:false` so sections re-animate on enter **and** exit.
- **Deviations:** count-up applied to the prominent stat displays (shared components + page bentos), not every numeral (SVG chart labels left static); section enter/exit achieved by enabling re-animation on existing `whileInView` sections.

### Portfolio + slider follow-ups (GlassHero rollout to projects, carousel polish)

- `components/GlassHero.tsx` — added `fade` (`light`/`dark`/`none`) and `parent` breadcrumb props.
- `app/projects/page.tsx` — listing hero migrated to `GlassHero` (`fade="dark"`); 5 impact bento cards now stagger in via `heroRowVariants`/`heroCardVariants`.
- `app/projects/[id]/page.tsx` — single-project hero migrated to `GlassHero` (`fade="dark"`, parent breadcrumb home/projects/title); bento metrics get an entrance animation; removed dead `heroCards`; `InnerPageHero` no longer used by any route.
- `app/news/page.tsx` — hero carousel now shows 3 cards (responsive 1/2/3) via computed widths; added carousel entrance animation; cards get more padding (`p-5`), title-forward styling, single-line excerpt.
- `app/eligibility/page.tsx` — `SectorScroller` gains an entrance animation.
- `app/how-it-works/page.tsx` — hero step cards link to the 9-step section (`#process`, `scroll-mt-24`); "full nine-step process" text linked.
- **Deviations:** single-project bento metrics use a container-level entrance (not per-card stagger) because `ProjectBentoMetric` carries its own `col-span` classes.

### Plan Implemented: Adopt the about-v2 Glass Hero as the Inner-Page Standard

- **Plan file:** `plans/2026-06-09-inner-page-glass-hero-standard.md`
- Created `components/GlassHero.tsx` — reusable about-v2 hero (placement, glass panel, white fade-out, breadcrumb/label/title/description, children slot, exported `heroRowVariants`/`heroCardVariants`).
- Created `components/ui/StepCard.tsx` — light/cyan/green/dark step card (`min-h-[220px]`) for compressed summaries.
- Modified `app/eligibility/page.tsx` — `InnerPageHero` → `GlassHero`; description moved into hero (body duplicate removed); `SectorScroller` cards enlarged to `p-8 min-h-[220px]` (ProjectBentoMetric dims) with light-on-dark slider; white/cyan/green retained.
- Modified `app/news/page.tsx` — `InnerPageHero` → `GlassHero`; hero carousel cards restyled to white background + dark text + brand-primary accents.
- Modified `app/how-it-works/page.tsx` — `InnerPageHero` → `GlassHero`; added generated description + 4 staggered `StepCard`s (last dark) condensing the 9 steps; full 9-step timeline kept.
- Modified `app/contact/page.tsx` — `InnerPageHero` → `GlassHero`; 3 partnership cards rendered as a staggered light/cyan/green `StepCard` row.
- Swapped `app/about/page.tsx` (now the glass hero design) and `app/about-v2/page.tsx` (now the white-panel design); function names realigned to routes.
- **Deviations:** `/copywriter` and `/frontend-carousel-slides` (plan Steps 6–7) executed inline rather than as nested skill runs; about ↔ about-v2 swap added per the accompanying request; `InnerPageHero` keeps its now-unused `lightPanel` prop (still consumed only by `app/projects/[id]/page.tsx`).
