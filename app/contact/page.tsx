import { Suspense } from 'react';
import ContactSections from '@/components/contact/ContactSections';
import { findSection, getContactSections } from '@/lib/strapi';
import type { ContactStructuredDataSection } from '@/lib/strapi-contact-types';

function buildJsonLd(data: ContactStructuredDataSection) {
  return {
    '@context': 'https://schema.org',
    '@type': data.jsonLdType,
    name: data.jsonLdName,
    description: data.jsonLdDescription,
    publisher: { '@type': 'Organization', name: data.jsonLdPublisherName },
  };
}

async function ContactContent() {
  const sections = await getContactSections();
  const structuredData = findSection(sections, 'contact-page.structured-data-section');

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative overflow-hidden">
      {structuredData && (
        <>
          <title>{structuredData.pageTitle}</title>
          <meta name="description" content={structuredData.metaDescription ?? ''} />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(structuredData)) }}
          />
        </>
      )}

      <ContactSections sections={sections} />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FAFDFB] text-[#051F1A] min-h-screen flex items-center justify-center font-mono text-sm">
          Loading connection portal...
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
