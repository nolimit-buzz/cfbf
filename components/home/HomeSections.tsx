// NOTE: deliberately does not import from "@/lib/strapi" — that module is
// server-only. The data is fetched in app/page.tsx and passed in.
import type { HomeSection, NewsSection } from "@/lib/strapi-types";

// All sections are imported statically so they render on the server. The leaf
// components are each "use client", but client components still server-render;
// what mattered was dropping the old `next/dynamic({ ssr: false })` wrappers,
// which sent placeholders instead of markup and made real content wait on a
// separate JS chunk per section.
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/About";
import HowWeDriveImpact from "@/components/home/Impact";
import Projects from "@/components/home/Projects";
import MapSection from "@/components/home/Map";
import FeaturedStories from "@/components/home/Stories";
import LatestNews from "@/components/home/News";
import NetZeroSection from "@/components/home/NetZero";

/**
 * Renders the CMS dynamiczone in the order Strapi returns it. Sections absent
 * from the response are simply not rendered.
 */
export default function HomeSections({ sections }: { sections: HomeSection[] }) {
  // The hero's news slider has no articles field of its own; it reuses the
  // articles managed on the news section.
  const newsArticles =
    sections.find(
      (s): s is NewsSection => s.__component === "home-page.news-section"
    )?.articles ?? [];

  return (
    <>
      {sections.map((section, index) => {
        const key = `${section.__component}-${section.id ?? index}`;

        switch (section.__component) {
          case "home-page.hero-section":
            return <Hero key={key} {...section} articles={newsArticles} />;
          case "home-page.about-section":
            return <AboutSection key={key} {...section} />;
          case "home-page.impact-section":
            return <HowWeDriveImpact key={key} {...section} />;
          case "home-page.projects-section":
            return <Projects key={key} {...section} />;
          case "home-page.map-section":
            return <MapSection key={key} {...section} />;
          case "home-page.stories-section":
            return <FeaturedStories key={key} {...section} />;
          case "home-page.news-section":
            return <LatestNews key={key} {...section} />;
          case "home-page.net-zero-section":
            return <NetZeroSection key={key} {...section} />;
          // Rendered as JSON-LD by app/page.tsx, not as visible markup.
          case "home-page.structured-data-section":
            return null;
          default:
            return null;
        }
      })}
    </>
  );
}
