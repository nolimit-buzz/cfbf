import { Suspense } from 'react';
import HowItWorksSections from '@/components/how-it-works/HowItWorksSections';
import { findSection, getHowItWorksSections } from '@/lib/strapi';
import type { HowItWorksStructuredDataSection } from '@/lib/strapi-how-it-works-types';

function buildJsonLd(data: HowItWorksStructuredDataSection) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.schemaName,
    description: data.schemaDescription,
    publisher: { '@type': 'Organization', name: data.publisherName },
  };
}

async function HowItWorksContent() {
  const sections = await getHowItWorksSections();
  const structuredData = findSection(sections, 'how-it-works-page.structured-data-section');

  return (
    <div className="bg-[#051F1A] text-white min-h-screen font-sans text-left">
      {structuredData && (
        <>
          <title>{structuredData.pageTitle}</title>
          <meta name="description" content={structuredData.metaDescription ?? ''} />

          {/* Dublin Core Hoisting */}
          <meta name="DC.title" content={structuredData.dcTitle ?? ''} />
          <meta name="DC.creator" content={structuredData.dcCreator ?? ''} />
          <meta name="DC.subject" content={structuredData.dcSubject ?? ''} />
          <meta name="DC.description" content={structuredData.dcDescription ?? ''} />
          <meta name="DC.language" content={structuredData.dcLanguage ?? ''} />
          <meta name="DC.type" content={structuredData.dcType ?? ''} />

          {/* Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(structuredData)) }}
          />
        </>
      )}

      <HowItWorksSections sections={sections} />
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#051F1A] text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest" />
      }
    >
      <HowItWorksContent />
    </Suspense>
  );
}
