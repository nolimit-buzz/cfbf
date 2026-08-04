import { Suspense } from "react";
import HomeSections from "@/components/home/HomeSections";
import { findSection, getHomeSections } from "@/lib/strapi";
import type { StructuredDataSection } from "@/lib/strapi-types";

function buildJsonLd(data: StructuredDataSection) {
  const orgId = `${data.url ?? ""}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: data.organizationName,
        url: data.url,
        logo: {
          "@type": "ImageObject",
          url: data.logoUrl,
        },
        description: data.description,
        sponsor: (data.sponsors ?? []).map((sponsor) => ({
          "@type": "Organization",
          name: sponsor.name,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${data.url ?? ""}/#website`,
        url: data.url,
        name: data.siteName,
        publisher: {
          "@id": orgId,
        },
      },
    ],
  };
}

async function HomeContent() {
  const sections = await getHomeSections();
  const structuredData = findSection(sections, "home-page.structured-data-section");

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(structuredData)),
          }}
        />
      )}
      <HomeSections sections={sections} />
    </>
  );
}

export default function Home() {
  // No placeholder UI: the page streams nothing until the CMS responds, then
  // paints the real sections in one pass. The boundary itself has to stay —
  // `cacheComponents` (next.config.ts) requires uncached data to sit inside a
  // Suspense boundary, and getHomeSections() is deliberately uncached.
  return (
      <Suspense
          fallback={
           <div className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
          
            </div>
          }
        >
      <HomeContent />
    </Suspense>
  );
}
