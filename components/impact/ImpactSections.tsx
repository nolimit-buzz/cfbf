// NOTE: deliberately does not import from "@/lib/strapi" — that module is
// server-only. The data is fetched in app/impact/page.tsx and passed in.
import type {
  ImpactSection,
  ImpactSectionComponent,
} from '@/lib/strapi-impact-types';

// Statically imported so every section server-renders; the leaf components are
// each "use client" but client components still server-render.
import ImpactHero from '@/components/impact/sections/ImpactHero';
import ImpactPhilosophy from '@/components/impact/sections/ImpactPhilosophy';
import ImpactConsole from '@/components/impact/sections/ImpactConsole';
import ImpactNextSteps from '@/components/impact/sections/ImpactNextSteps';

/**
 * Renders the CMS dynamiczone in the order Strapi returns it. Sections absent
 * from the response are simply not rendered, and an empty response leaves the
 * page as its bare shell — the CMS is the only source of this page's copy.
 *
 * Six sections do not map one-to-one onto a component, because their state or
 * markup is shared:
 *   - the four tab sections are panels inside ImpactConsole, which owns the
 *     active-tab state;
 *   - video-modal is opened from a story card inside the stories tab;
 *   - structured-data is page-level metadata, handled in page.tsx.
 * Those cases return null here and are passed as props instead.
 */
export default function ImpactSections({ sections }: { sections: ImpactSection[] }) {
  // Local lookup rather than the shared findSection(), which lives in the
  // server-only strapi module.
  const find = <C extends ImpactSectionComponent>(component: C) =>
    sections.find((section) => section.__component === component) as
      | Extract<ImpactSection, { __component: C }>
      | undefined;

  const stories = find('impact-page.stories-tab-section');
  const numbers = find('impact-page.numbers-tab-section');
  const investments = find('impact-page.investments-tab-section');
  const assets = find('impact-page.assets-tab-section');
  const videoModal = find('impact-page.video-modal-section');

  return (
    <>
      {sections.map((section, index) => {
        const key = `${section.__component}-${section.id ?? index}`;

        switch (section.__component) {
          case 'impact-page.hero-section':
            return <ImpactHero key={key} {...section} />;
          case 'impact-page.philosophy-section':
            return <ImpactPhilosophy key={key} {...section} />;
          case 'impact-page.impact-console-section':
            return (
              <ImpactConsole
                key={key}
                {...section}
                stories={stories}
                numbers={numbers}
                investments={investments}
                assets={assets}
                videoModal={videoModal}
              />
            );
          case 'impact-page.next-steps-section':
            return <ImpactNextSteps key={key} {...section} />;

          // Rendered from inside the console, or page-level metadata.
          case 'impact-page.stories-tab-section':
          case 'impact-page.numbers-tab-section':
          case 'impact-page.investments-tab-section':
          case 'impact-page.assets-tab-section':
          case 'impact-page.video-modal-section':
          case 'impact-page.structured-data-section':
            return null;
          default:
            return null;
        }
      })}
    </>
  );
}
