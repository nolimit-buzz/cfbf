// NOTE: deliberately does not import from "@/lib/strapi" — that module is
// server-only. The data is fetched in app/about/page.tsx and passed in.
import type { AboutSection } from '@/lib/strapi-about-types';

// Statically imported so every section server-renders; the leaf components are
// each "use client" but client components still server-render.
import AboutHero from '@/components/about/sections/AboutHero';
import StickyAboutNav from '@/components/ui/StickyAboutNav';
import Mandate from '@/components/about/sections/Mandate';
import MarketOpportunity from '@/components/about/sections/MarketOpportunity';
import EnergyAccessMap from '@/components/about/EnergyAccessMap';
import Framework from '@/components/about/sections/Framework';
import CapitalStack from '@/components/about/sections/CapitalStack';
import PartnerShowcase from '@/components/about-v3/PartnerShowcase';
import MilestonesTimelineV3 from '@/components/about-v3/MilestonesTimelineV3';
import AudienceConsole from '@/components/about-v3/AudienceConsole';
import NextSteps from '@/components/about/sections/NextSteps';
import DownloadCta from '@/components/about/sections/DownloadCta';

/**
 * Renders the CMS dynamiczone in the order Strapi returns it. Sections absent
 * from the response are simply not rendered.
 */
export default function AboutSections({ sections }: { sections: AboutSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const key = `${section.__component}-${section.id ?? index}`;

        switch (section.__component) {
          case 'about-page.hero-section':
            return <AboutHero key={key} {...section} />;
          case 'about-page.sticky-nav-section':
            return <StickyAboutNav key={key} {...section} />;
          case 'about-page.mandate-section':
            return <Mandate key={key} {...section} />;
          case 'about-page.market-section':
            return <MarketOpportunity key={key} {...section} />;
          case 'about-page.energy-map-section':
            return (
              <div key={key} data-rag-chunk="about-energy-gap-map" className="relative z-10">
                <EnergyAccessMap {...section} />
              </div>
            );
          case 'about-page.framework-section':
            return <Framework key={key} {...section} />;
          case 'about-page.capital-stack-section':
            return <CapitalStack key={key} {...section} />;
          case 'about-page.partners-section':
            return (
              <div key={key} id="partners" data-rag-chunk="about-partner-ecosystem" className="relative z-10">
                <PartnerShowcase {...section} />
              </div>
            );
          case 'about-page.milestones-section':
            return (
              <div key={key} id="milestones" data-rag-chunk="about-milestones" className="relative z-10 bg-white">
                <MilestonesTimelineV3 {...section} />
              </div>
            );
          case 'about-page.audience-section':
            return (
              <div key={key} id="audience" data-rag-chunk="about-audience-console" className="relative z-10 bg-white">
                <AudienceConsole {...section} />
              </div>
            );
          case 'about-page.next-steps-section':
            return <NextSteps key={key} {...section} />;
          case 'about-page.download-cta-section':
            return <DownloadCta key={key} {...section} />;
          // Rendered as page metadata / JSON-LD by app/about/page.tsx.
          case 'about-page.structured-data-section':
            return null;
          default:
            return null;
        }
      })}
    </>
  );
}
