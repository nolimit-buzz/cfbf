// Server-only module. Client components must not import from here
// (see HomeSections.tsx).
import type { HomeSection, HomeSectionComponent } from "./strapi-types";

export const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
).replace(/\/+$/, "");

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

  const res = await fetch(url, { cache: "no-store" });

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

/** Returns the first section matching `component`, narrowed to its type. */
export function findSection<C extends HomeSectionComponent>(
  sections: HomeSection[],
  component: C
): Extract<HomeSection, { __component: C }> | undefined {
  return sections.find((section) => section.__component === component) as
    | Extract<HomeSection, { __component: C }>
    | undefined;
}
