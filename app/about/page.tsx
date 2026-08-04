import { Suspense } from 'react';
import AboutSections from '@/components/about/AboutSections';
import { findSection, getAboutSections } from '@/lib/strapi';
import type { AboutStructuredDataSection } from '@/lib/strapi-about-types';

function buildJsonLd(data: AboutStructuredDataSection) {
  return {
    '@context': 'https://schema.org',
    '@type': data.jsonLdType,
    name: data.jsonLdName,
    description: data.jsonLdDescription,
    publisher: { '@type': 'Organization', name: data.jsonLdPublisherName },
  };
}

async function AboutContent() {
  const sections = await getAboutSections();
  const structuredData = findSection(sections, 'about-page.structured-data-section');

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative font-sans antialiased text-left selection:bg-brand-accent selection:text-brand-dark">
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
          <meta name="DC.type" content={structuredData.dcType ?? ''} />

          {/* Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(structuredData)) }}
          />
        </>
      )}

      <AboutSections sections={sections} />
    </div>
  );
}

export default function AboutPage() {
  // The boundary has to stay: `cacheComponents` (next.config.ts) requires
  // uncached data to sit inside Suspense, and getAboutSections() is uncached.
  return (
    <Suspense
      fallback={
       <div className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
       
        </div>
      }
    >
      <AboutContent />
    </Suspense>
  );
}
