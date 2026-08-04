import { Suspense } from 'react';
import ProjectsSections from '@/components/projects/ProjectsSections';
import { findSection, getProjectsSections } from '@/lib/strapi';
import type {
  ProjectItem,
  ProjectsStructuredDataSection,
} from '@/lib/strapi-projects-types';

/**
 * The portfolio's JSON-LD is an ItemList of the projects in the pipeline tab,
 * so it needs both the structured-data section and the pipeline section.
 */
function buildJsonLd(data: ProjectsStructuredDataSection, projects: ProjectItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': data.jsonLdType,
    name: data.jsonLdName,
    description: data.jsonLdDescription,
    url: data.jsonLdUrl,
    about: { '@type': 'Organization', name: data.jsonLdPublisherName },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Project',
          name: p.title,
          description: p.desc,
          location: p.location,
          category: p.category,
          status: p.status,
        },
      })),
    },
  };
}

async function ProjectsContent() {
  const sections = await getProjectsSections();
  const structuredData = findSection(sections, 'projects-page.structured-data-section');
  const pipeline = findSection(sections, 'projects-page.pipeline-tab-section');

  return (
    <div className="bg-[#051F1A] text-white min-h-screen relative overflow-hidden pb-0 font-sans">
      {structuredData && (
        <>
          <title>{structuredData.pageTitle}</title>
          <meta name="description" content={structuredData.metaDescription ?? ''} />

          {/* Dublin Core Hoisting */}
          <meta name="DC.title" content={structuredData.dcTitle ?? ''} />
          <meta name="DC.creator" content={structuredData.dcCreator ?? ''} />
          <meta name="DC.subject" content={structuredData.dcSubject ?? ''} />
          <meta name="DC.description" content={structuredData.dcDescription ?? ''} />
          <meta name="DC.publisher" content={structuredData.dcPublisher ?? ''} />
          <meta name="DC.language" content={structuredData.dcLanguage ?? ''} />
          <meta name="DC.coverage.spatial" content={structuredData.dcCoverageSpatial ?? ''} />
          <meta name="DC.type" content={structuredData.dcType ?? ''} />

          {/* Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildJsonLd(structuredData, pipeline?.projects ?? [])),
            }}
          />
        </>
      )}

      {/* Decorative radial glows */}
      <div className="absolute top-[80vh] right-0 w-1/3 h-1/3 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <ProjectsSections sections={sections} />
    </div>
  );
}

export default function ProjectsPage() {
  // The boundary has to stay: `cacheComponents` (next.config.ts) requires
  // uncached data to sit inside Suspense, and getProjectsSections() is uncached.
  return (
    <Suspense
      fallback={
        <div className="bg-[#051F1A] text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
          Loading projects...
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
