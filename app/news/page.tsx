import { Suspense } from 'react';
import NewsArchiveClient from '@/components/news/NewsArchiveClient';
import { findSection, getNewsSections } from '@/lib/strapi';
import type { NewsStructuredDataSection } from '@/lib/strapi-news-types';

function buildJsonLd(structuredData: NewsStructuredDataSection) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": structuredData?.schemaName,
    "description": structuredData?.schemaDescription,
    "url": structuredData?.schemaUrl,
    "parentOrganization": {
      "@type": "Organization",
      "name": structuredData?.parentOrganizationName
    }
  };
}

async function NewsContent() {
  const sections = await getNewsSections();
  const structuredData = findSection(sections, 'news-page.structured-data-section');
  const hero = findSection(sections, 'news-page.hero-section');
  const listing = findSection(sections, 'news-page.listing-section');
  const articlesSection = findSection(sections, 'news-page.articles-section');
  const nextSteps = findSection(sections, 'news-page.next-steps-section');

  return (
    <>
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

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(structuredData)) }}
          />
        </>
      )}

      <NewsArchiveClient
        hero={hero}
        listing={listing}
        articlesSection={articlesSection}
        nextSteps={nextSteps}
      />
    </>
  );
}

export default function NewsArchivePage() {
  // The boundary has to stay: `cacheComponents` (next.config.ts) requires
  // uncached data to sit inside Suspense, and getNewsSections() is uncached.
  return (
    <Suspense
      fallback={
        <div className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        </div>
      }
    >
      <NewsContent />
    </Suspense>
  );
}
