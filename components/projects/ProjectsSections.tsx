// NOTE: deliberately does not import from "@/lib/strapi" — that module is
// server-only. The data is fetched in app/projects/page.tsx and passed in.
import type {
  ProjectsSection,
  ProjectsSectionComponent,
} from '@/lib/strapi-projects-types';

// Statically imported so every section server-renders; the leaf components are
// each "use client" but client components still server-render.
import ProjectsHero from '@/components/projects/sections/ProjectsHero';
import PortfolioTabs from '@/components/projects/sections/PortfolioTabs';
import PipelineConsole from '@/components/projects/PipelineConsole';
import EligibilityCta from '@/components/projects/sections/EligibilityCta';
import FootprintSection from '@/components/projects/sections/FootprintSection';
import ProjectsNextSteps from '@/components/projects/sections/ProjectsNextSteps';

/**
 * Renders the CMS dynamiczone in the order Strapi returns it. Sections absent
 * from the response are simply not rendered, and an empty response leaves the
 * page as its bare shell — the CMS is the only source of this page's copy.
 *
 * Three sections do not map one-to-one onto a component, because their state or
 * markup is shared:
 *   - analysis-tab / pipeline-tab are panels inside PortfolioTabs, which owns
 *     the active-tab state;
 *   - lga-modal is opened from inside the footprint map;
 *   - structured-data is page-level metadata, handled in page.tsx.
 * Those cases return null here and are passed as props instead.
 */
export default function ProjectsSections({ sections }: { sections: ProjectsSection[] }) {
  // Local lookup rather than the shared findSection(), which lives in the
  // server-only strapi module.
  const find = <C extends ProjectsSectionComponent>(component: C) =>
    sections.find((section) => section.__component === component) as
      | Extract<ProjectsSection, { __component: C }>
      | undefined;

  const analysis = find('projects-page.analysis-tab-section');
  const pipeline = find('projects-page.pipeline-tab-section');
  const lgaModal = find('projects-page.lga-modal-section');

  return (
    <>
      {sections.map((section, index) => {
        const key = `${section.__component}-${section.id ?? index}`;

        switch (section.__component) {
          case 'projects-page.hero-section':
            return <ProjectsHero key={key} {...section} />;
          case 'projects-page.portfolio-tabs-section':
            return (
              <PortfolioTabs key={key} {...section} analysis={analysis} pipeline={pipeline} />
            );
          case 'projects-page.pipeline-console-section':
            return <PipelineConsole key={key} {...section} />;
          case 'projects-page.eligibility-cta-section':
            return <EligibilityCta key={key} {...section} />;
          case 'projects-page.footprint-map-section':
            return <FootprintSection key={key} {...section} lgaModal={lgaModal} />;
          case 'projects-page.next-steps-section':
            return <ProjectsNextSteps key={key} {...section} />;

          // Rendered from inside another section, or page-level metadata.
          case 'projects-page.analysis-tab-section':
          case 'projects-page.pipeline-tab-section':
          case 'projects-page.lga-modal-section':
          case 'projects-page.structured-data-section':
            return null;
          default:
            return null;
        }
      })}
    </>
  );
}
