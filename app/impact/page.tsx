import { Suspense } from 'react';
import ImpactSections from '@/components/impact/ImpactSections';
import { findSection, getImpactSections } from '@/lib/strapi';

async function ImpactContent() {
  const sections = await getImpactSections();
  const structuredData = findSection(sections, 'impact-page.structured-data-section');

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative font-sans antialiased text-left selection:bg-brand-accent selection:text-brand-dark">
      {structuredData && (
        <>
          <title>{structuredData.pageTitle}</title>
          <meta name="description" content={structuredData.metaDescription ?? ''} />
        </>
      )}

      <ImpactSections sections={sections} />
    </div>
  );
}

export default function ImpactPage() {
  // The boundary has to stay: `cacheComponents` (next.config.ts) requires
  // uncached data to sit inside Suspense, and getImpactSections() is uncached.
  // The fallback renders before the fetch resolves, so its label is the one
  // string on this page that cannot come from the CMS.
  return (
    <Suspense
      fallback={
       <div className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
          
        </div>
      }
    >
      <ImpactContent />
    </Suspense>
  );
}
