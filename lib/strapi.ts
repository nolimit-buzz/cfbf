// Server-only module. Client components must not import from here
// (see HomeSections.tsx).
import type { HomeSection, HomeSectionComponent } from "./strapi-types";
import type { AboutSection, AboutSectionComponent } from "./strapi-about-types";
import type {
  ProjectDetail,
  ProjectsSection,
  ProjectsSectionComponent,
} from "./strapi-projects-types";
import type {
  ImpactSection,
  ImpactSectionComponent,
} from "./strapi-impact-types";
import type {
  EligibilitySection,
  EligibilitySectionComponent,
} from "./strapi-eligibility-types";

export const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
).replace(/\/+$/, "");

export const STRAPI_API_TOKEN = process.env.NEXT_PRIVATE_STRAPI_API_TOKEN;
const STRAPI_HEADERS = STRAPI_API_TOKEN
  ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
  : undefined;

/**
 * Strapi v5 does not deep-populate dynamiczones. Each component in the zone has
 * to be named explicitly via `populate[sections][on][<component>]`, and nested
 * repeatable components need their own populate level below that.
 */
function buildHomeQuery(): string {
  const params = new URLSearchParams();

  const oneLevel: HomeSectionComponent[] = [
    "home-page.hero-section",
    "home-page.about-section",
    "home-page.impact-section",
    "home-page.projects-section",
    "home-page.map-section",
    "home-page.stories-section",
    "home-page.net-zero-section",
    "home-page.structured-data-section",
  ];

  for (const component of oneLevel) {
    params.set(`populate[sections][on][${component}][populate]`, "*");
  }

  // News articles carry their own repeatable children (themes, paragraphs),
  // so this branch needs two levels of populate.
  params.set(
    "populate[sections][on][home-page.news-section][populate][viewTabs][populate]",
    "*"
  );
  params.set(
    "populate[sections][on][home-page.news-section][populate][articles][populate]",
    "*"
  );

  return params.toString();
}

/**
 * Fetch of the HOME singleType. Deliberately uncached — every request hits
 * Strapi, so editors never wait on a stale window and the page always reflects
 * what is currently published. The cost is the full round trip (~1s for this
 * deep-populate query) on each render.
 *
 * Throws on a bad response *on purpose*, so a transient failure (Strapi
 * answering 401 while it is still booting, for instance) surfaces as an error
 * rather than being mistaken for an empty page. Handle failures in the wrapper
 * below.
 */
async function fetchHomeSections(): Promise<HomeSection[]> {
  const url = `${STRAPI_URL}/api/home?${buildHomeQuery()}`;

  const res = await fetch(url, { cache: "no-store", headers: STRAPI_HEADERS });

  if (!res.ok) {
    throw new Error(`GET /api/home failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const sections = json?.data?.sections;

  return Array.isArray(sections) ? (sections as HomeSection[]) : [];
}

/**
 * Error-handling wrapper. Returns an empty array when Strapi is unreachable or
 * the entry is missing, so the page renders no sections instead of crashing.
 */
export async function getHomeSections(): Promise<HomeSection[]> {
  try {
    return await fetchHomeSections();
  } catch (error) {
    // Next aborts in-flight fetches once the static shell is done prerendering.
    // That signal is control flow, not a failure — let React handle it.
    if (typeof (error as { digest?: unknown })?.digest === "string") {
      throw error;
    }
    console.error("[strapi] GET /api/home failed:", error);
    return [];
  }
}

/**
 * Strapi v5 does not deep-populate dynamiczones. Same rule as the home query:
 * every component in the zone is named explicitly. Three about components carry
 * repeatables that themselves hold repeatables (partner groups -> partners,
 * milestones -> events, personas -> questions), so those need a second level.
 */
function buildAboutQuery(): string {
  const params = new URLSearchParams();

  const oneLevel: AboutSectionComponent[] = [
    "about-page.structured-data-section",
    "about-page.hero-section",
    "about-page.sticky-nav-section",
    "about-page.mandate-section",
    "about-page.market-section",
    "about-page.energy-map-section",
    "about-page.framework-section",
    "about-page.capital-stack-section",
    "about-page.next-steps-section",
    "about-page.download-cta-section",
  ];

  for (const component of oneLevel) {
    params.set(`populate[sections][on][${component}][populate]`, "*");
  }

  params.set(
    "populate[sections][on][about-page.partners-section][populate][groups][populate][partners][populate]",
    "*"
  );
  params.set(
    "populate[sections][on][about-page.milestones-section][populate][milestones][populate][events][populate]",
    "*"
  );
  params.set(
    "populate[sections][on][about-page.milestones-section][populate][railYears][populate]",
    "*"
  );
  params.set(
    "populate[sections][on][about-page.audience-section][populate][personas][populate][questions][populate]",
    "*"
  );

  return params.toString();
}

/** Same contract as fetchHomeSections(), against the ABOUT singleType. */
async function fetchAboutSections(): Promise<AboutSection[]> {
  const url = `${STRAPI_URL}/api/about?${buildAboutQuery()}`;

  const res = await fetch(url, { cache: "no-store", headers: STRAPI_HEADERS });

  if (!res.ok) {
    throw new Error(`GET /api/about failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const sections = json?.data?.sections;

  return Array.isArray(sections) ? (sections as AboutSection[]) : [];
}

/** Error-handling wrapper — see getHomeSections(). */
export async function getAboutSections(): Promise<AboutSection[]> {
  try {
    return await fetchAboutSections();
  } catch (error) {
    if (typeof (error as { digest?: unknown })?.digest === "string") {
      throw error;
    }
    console.error("[strapi] GET /api/about failed:", error);
    return [];
  }
}

/**
 * Same rule again for the PROJECTS single type. Two of its ten components hold
 * repeatables that carry children of their own, so those need a second level:
 * the pipeline console's stages each own a `metrics` component, and each map
 * state owns a list of LGAs.
 *
 * Naming any field on a component opts that component out of `*` mode, so once
 * `stages` is spelled out its siblings have to be listed too.
 */
function buildProjectsQuery(): string {
  const params = new URLSearchParams();

  const oneLevel: ProjectsSectionComponent[] = [
    "projects-page.structured-data-section",
    "projects-page.hero-section",
    "projects-page.portfolio-tabs-section",
    "projects-page.analysis-tab-section",
    "projects-page.pipeline-tab-section",
    "projects-page.eligibility-cta-section",
    "projects-page.lga-modal-section",
    "projects-page.next-steps-section",
  ];

  for (const component of oneLevel) {
    params.set(`populate[sections][on][${component}][populate]`, "*");
  }

  const console_ =
    "populate[sections][on][projects-page.pipeline-console-section][populate]";
  params.set(`${console_}[stages][populate][metrics][populate]`, "*");
  params.set(`${console_}[metricLabels][populate]`, "*");
  params.set(`${console_}[sdgFrameworks][populate]`, "*");
  params.set(`${console_}[totalPipelineRows][populate]`, "*");
  params.set(`${console_}[mandatedDealRows][populate]`, "*");

  const map =
    "populate[sections][on][projects-page.footprint-map-section][populate]";
  params.set(`${map}[states][populate][lgas][populate]`, "*");
  params.set(`${map}[legend][populate]`, "*");
  params.set(`${map}[lgaProjects][populate]`, "*");

  return params.toString();
}

/** Same contract as fetchHomeSections(), against the PROJECTS singleType. */
async function fetchProjectsSections(): Promise<ProjectsSection[]> {
  const url = `${STRAPI_URL}/api/projects?${buildProjectsQuery()}`;

  const res = await fetch(url, { cache: "no-store", headers: STRAPI_HEADERS });

  if (!res.ok) {
    throw new Error(`GET /api/projects failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const sections = json?.data?.sections;

  return Array.isArray(sections) ? (sections as ProjectsSection[]) : [];
}

/** Error-handling wrapper — see getHomeSections(). */
export async function getProjectsSections(): Promise<ProjectsSection[]> {
  try {
    return await fetchProjectsSections();
  } catch (error) {
    if (typeof (error as { digest?: unknown })?.digest === "string") {
      throw error;
    }
    console.error("[strapi] GET /api/projects failed:", error);
    return [];
  }
}

/**
 * Same rule again for the IMPACT single type, but simpler: every one of its ten
 * components holds at most one level of repeatables (stats, pillars, tabs,
 * stories, metrics, timeline points, SDG cards, columns, assets, links), so a
 * single `[populate]=*` per component covers the whole zone.
 */
function buildImpactQuery(): string {
  const params = new URLSearchParams();

  const oneLevel: ImpactSectionComponent[] = [
    "impact-page.structured-data-section",
    "impact-page.hero-section",
    "impact-page.philosophy-section",
    "impact-page.impact-console-section",
    "impact-page.stories-tab-section",
    "impact-page.numbers-tab-section",
    "impact-page.investments-tab-section",
    "impact-page.assets-tab-section",
    "impact-page.next-steps-section",
    "impact-page.video-modal-section",
  ];

  for (const component of oneLevel) {
    params.set(`populate[sections][on][${component}][populate]`, "*");
  }

  return params.toString();
}

/** Same contract as fetchHomeSections(), against the IMPACT singleType. */
async function fetchImpactSections(): Promise<ImpactSection[]> {
  const url = `${STRAPI_URL}/api/impact?${buildImpactQuery()}`;

  const res = await fetch(url, { cache: "no-store", headers: STRAPI_HEADERS });

  if (!res.ok) {
    throw new Error(`GET /api/impact failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const sections = json?.data?.sections;

  return Array.isArray(sections) ? (sections as ImpactSection[]) : [];
}

/** Error-handling wrapper — see getHomeSections(). */
export async function getImpactSections(): Promise<ImpactSection[]> {
  try {
    return await fetchImpactSections();
  } catch (error) {
    if (typeof (error as { digest?: unknown })?.digest === "string") {
      throw error;
    }
    console.error("[strapi] GET /api/impact failed:", error);
    return [];
  }
}

/**
 * Same rule again for the ELIGIBILITY single type. Three components carry
 * repeatables that themselves hold repeatables, so those need a second level:
 * - criteria-pillars-section: cards -> listItems and stats
 * - assessment-steps-section: questions -> options
 * - assessment-result-section: outcomes and logRows are one level deep
 */
function buildEligibilityQuery(): string {
  const params = new URLSearchParams();

  const oneLevel: EligibilitySectionComponent[] = [
    "eligibility-page.structured-data-section",
    "eligibility-page.hero-section",
    "eligibility-page.timeline-workflow-section",
    "eligibility-page.next-steps-section",
    "eligibility-page.final-cta-section",
    "eligibility-page.assessment-chrome-section",
    "eligibility-page.assessment-result-section",
  ];

  for (const component of oneLevel) {
    params.set(`populate[sections][on][${component}][populate]`, "*");
  }

  // Criteria pillars: cards -> listItems and stats
  const criteria =
    "populate[sections][on][eligibility-page.criteria-pillars-section][populate]";
  params.set(`${criteria}[cards][populate][listItems][populate]`, "*");
  params.set(`${criteria}[cards][populate][stats][populate]`, "*");

  // Assessment steps: questions -> options
  const assessment =
    "populate[sections][on][eligibility-page.assessment-steps-section][populate]";
  params.set(`${assessment}[questions][populate][options][populate]`, "*");

  return params.toString();
}

/** Same contract as fetchHomeSections(), against the ELIGIBILITY singleType. */
async function fetchEligibilitySections(): Promise<EligibilitySection[]> {
  const url = `${STRAPI_URL}/api/eligibility?${buildEligibilityQuery()}`;

  const res = await fetch(url, { cache: "no-store", headers: STRAPI_HEADERS });

  if (!res.ok) {
    throw new Error(
      `GET /api/eligibility failed: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();
  const sections = json?.data?.sections;

  return Array.isArray(sections) ? (sections as EligibilitySection[]) : [];
}

/** Error-handling wrapper — see getHomeSections(). */
export async function getEligibilitySections(): Promise<EligibilitySection[]> {
  try {
    return await fetchEligibilitySections();
  } catch (error) {
    if (typeof (error as { digest?: unknown })?.digest === "string") {
      throw error;
    }
    console.error("[strapi] GET /api/eligibility failed:", error);
    return [];
  }
}

/**
 * One case-study record from the `project` collection, looked up by its
 * `projectId` ("01".."06") — the segment in /projects/[id].
 *
 * Returns null for an unknown id so the route can call notFound(). This is a
 * deliberate change from the old hardcoded lookup, which silently rendered
 * project 01 for any unrecognised segment.
 */
export async function getProjectDetail(
  projectId: string
): Promise<ProjectDetail | null> {
  const params = new URLSearchParams();
  params.set("filters[projectId][$eq]", projectId);
  params.set("populate[gallery][populate]", "*");
  params.set("populate[videos][populate]", "*");

  const url = `${STRAPI_URL}/api/project-records?${params.toString()}`;

  try {
    const res = await fetch(url, { cache: "no-store", headers: STRAPI_HEADERS });

    if (!res.ok) {
      throw new Error(
        `GET /api/project-records failed: ${res.status} ${res.statusText}`
      );
    }

    const json = await res.json();
    const [record] = Array.isArray(json?.data) ? json.data : [];

    return (record as ProjectDetail) ?? null;
  } catch (error) {
    if (typeof (error as { digest?: unknown })?.digest === "string") {
      throw error;
    }
    console.error("[strapi] GET /api/project-records failed:", error);
    return null;
  }
}

/**
 * Every case study, ordered by `projectId`. Used for the detail page's
 * prev/next navigation and its related-projects rail, both of which used to
 * read a hardcoded ["01".."06"] array — so a seventh record added in the admin
 * now shows up without a code change.
 */
export async function getProjectDetails(): Promise<ProjectDetail[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "projectId:asc");
  params.set("pagination[pageSize]", "100");
  params.set("populate[gallery][populate]", "*");
  params.set("populate[videos][populate]", "*");

  const url = `${STRAPI_URL}/api/project-records?${params.toString()}`;

  try {
    const res = await fetch(url, { cache: "no-store", headers: STRAPI_HEADERS });

    if (!res.ok) {
      throw new Error(
        `GET /api/project-records failed: ${res.status} ${res.statusText}`
      );
    }

    const json = await res.json();

    return Array.isArray(json?.data) ? (json.data as ProjectDetail[]) : [];
  } catch (error) {
    if (typeof (error as { digest?: unknown })?.digest === "string") {
      throw error;
    }
    console.error("[strapi] GET /api/project-records failed:", error);
    return [];
  }
}

/** Returns the first section matching `component`, narrowed to its type. */
export function findSection<
  S extends {
    __component:
      | HomeSectionComponent
      | AboutSectionComponent
      | ProjectsSectionComponent
      | ImpactSectionComponent
      | EligibilitySectionComponent;
  },
  C extends S["__component"]
>(sections: S[], component: C): Extract<S, { __component: C }> | undefined {
  return sections.find((section) => section.__component === component) as
    | Extract<S, { __component: C }>
    | undefined;
}
