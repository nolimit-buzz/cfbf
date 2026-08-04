import { Suspense } from 'react';
import EligibilitySections from '@/components/eligibility/EligibilitySections';
import { findSection, getEligibilitySections } from '@/lib/strapi';
import type { EligibilityStructuredDataSection } from '@/lib/strapi-eligibility-types';

function buildJsonLd(data: EligibilityStructuredDataSection) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.schemaName,
    description: data.schemaDescription,
    publisher: { '@type': 'Organization', name: data.schemaPublisherName },
  };
}

async function EligibilityContent() {
  const sections = await getEligibilitySections();
  const structuredData = findSection(sections, 'eligibility-page.structured-data-section');

  return (
    <div className="bg-brand-dark text-white min-h-screen relative font-sans antialiased text-left">
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

      <EligibilitySections sections={sections} />
    </div>
  );
}

export default function EligibilityPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
          
        </div>
      }
    >
      <EligibilityContent />
    </Suspense>
  );
}
