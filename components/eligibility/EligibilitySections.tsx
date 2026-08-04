// NOTE: deliberately does not import from "@/lib/strapi" — that module is
// server-only. The data is fetched in app/eligibility/page.tsx and passed in.
import type { EligibilitySection } from '@/lib/strapi-eligibility-types';

// Statically imported so every section server-renders; the leaf components are
// each "use client" but client components still server-render.
import EligibilityHero from '@/components/eligibility/sections/EligibilityHero';
import CriteriaPillars from '@/components/eligibility/sections/CriteriaPillars';
import TimelineWorkflow from '@/components/eligibility/sections/TimelineWorkflow';
import NextSteps from '@/components/eligibility/sections/NextSteps';
import FinalCta from '@/components/eligibility/sections/FinalCta';

/**
 * Renders the CMS dynamiczone in the order Strapi returns it. Sections absent
 * from the response are simply not rendered.
 */
export default function EligibilitySections({ sections }: { sections: EligibilitySection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const key = `${section.__component}-${section.id ?? index}`;

        switch (section.__component) {
          case 'eligibility-page.structured-data-section':
            // Rendered as page metadata by app/eligibility/page.tsx.
            return null;
          case 'eligibility-page.hero-section':
            return <EligibilityHero key={key} {...section} />;
          case 'eligibility-page.criteria-pillars-section':
            return <CriteriaPillars key={key} {...section} />;
          case 'eligibility-page.timeline-workflow-section':
            return <TimelineWorkflow key={key} {...section} />;
          case 'eligibility-page.next-steps-section':
            return <NextSteps key={key} {...section} />;
          case 'eligibility-page.final-cta-section':
            return <FinalCta key={key} {...section} />;
          // Assessment sections belong to the assessment sub-page.
          case 'eligibility-page.assessment-chrome-section':
          case 'eligibility-page.assessment-steps-section':
          case 'eligibility-page.assessment-result-section':
            return null;
          default:
            return null;
        }
      })}
    </>
  );
}
