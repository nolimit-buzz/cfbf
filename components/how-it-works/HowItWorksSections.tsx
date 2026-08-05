// NOTE: deliberately does not import from "@/lib/strapi" — that module is
// server-only. The data is fetched in app/how-it-works/page.tsx and passed in.
import type { HowItWorksSection } from '@/lib/strapi-how-it-works-types';

// Statically imported so every section server-renders; the leaf components are
// each "use client" but client components still server-render.
import HowItWorksHero from '@/components/how-it-works/sections/HowItWorksHero';
import FinancingStructure from '@/components/how-it-works/sections/FinancingStructure';
import FacilityStructure from '@/components/how-it-works/sections/FacilityStructure';
import ProcessSection from '@/components/how-it-works/sections/ProcessSection';
import NextSteps from '@/components/how-it-works/sections/NextSteps';

/**
 * Renders the CMS dynamiczone in the order Strapi returns it. Sections absent
 * from the response are simply not rendered.
 */
export default function HowItWorksSections({ sections }: { sections: HowItWorksSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const key = `${section.__component}-${section.id ?? index}`;

        switch (section.__component) {
          case 'how-it-works-page.structured-data-section':
            // Rendered as page metadata by app/how-it-works/page.tsx.
            return null;
          case 'how-it-works-page.hero-section':
            return <HowItWorksHero key={key} {...section} />;
          case 'how-it-works-page.financing-structure-section':
            return <FinancingStructure key={key} {...section} />;
          case 'how-it-works-page.facility-structure-section':
            return <FacilityStructure key={key} {...section} />;
          case 'how-it-works-page.process-section':
            return <ProcessSection key={key} {...section} />;
          case 'how-it-works-page.next-steps-section':
            return <NextSteps key={key} {...section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
