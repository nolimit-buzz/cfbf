/**
 * TypeScript mirrors of the Strapi `about` singleType dynamiczone.
 *
 * Source of truth: cms/src/api/about/content-types/about/schema.json and
 * cms/src/components/about-page/*.json
 *
 * Same conventions as strapi-types.ts: every field is optional, because an
 * editor can clear any field in the Content Manager. Media fields are plain
 * strings (a URL plus a sibling `*_alt_text`), not Strapi media objects.
 */

import type { StrapiEntity } from "./strapi-types";

export type { StrapiEntity };

/* ------------------------------------------------------------------ */
/* Leaf items                                                          */
/* ------------------------------------------------------------------ */

export interface HeroStatItem extends StrapiEntity {
  cardNumber?: string;
  value?: string;
  label?: string;
  sub?: string;
}

export interface HeroSliderStatItem extends StrapiEntity {
  value?: string;
  label?: string;
  sub?: string;
}

export interface NavLinkItem extends StrapiEntity {
  sectionId?: string;
  label?: string;
}

export interface MandateParagraphItem extends StrapiEntity {
  text?: string;
}

export interface MandateNumberItem extends StrapiEntity {
  value?: string;
  label?: string;
}

export interface BentoCaptionItem extends StrapiEntity {
  label?: string;
  image?: string;
  image_alt_text?: string;
}

export interface MarketBentoCardItem extends StrapiEntity {
  value?: string;
  eyebrow?: string;
  description?: string;
  footer?: string;
}

export interface MapTabItem extends StrapiEntity {
  tabId?: string;
  label?: string;
}

export interface MapStateItem extends StrapiEntity {
  mapId?: string;
  name?: string;
  connections?: string;
  fundingGap?: string;
  unservedPct?: number;
  grid?: number;
  miniGrid?: number;
  standalone?: number;
}

export interface FrameworkCardItem extends StrapiEntity {
  cardNumber?: string;
  title?: string;
  body?: string;
  tag?: string;
  bgImage?: string;
  bgImage_alt_text?: string;
}

export interface StackSegmentItem extends StrapiEntity {
  title?: string;
  description?: string;
}

export interface StackBarItem extends StrapiEntity {
  percent?: string;
  label?: string;
}

export interface AboutPartnerItem extends StrapiEntity {
  name?: string;
  role?: string;
  logoText?: string;
  logo?: string;
  logo_alt_text?: string;
  logoColour?: string;
  logoColour_alt_text?: string;
}

export interface PartnerGroupItem extends StrapiEntity {
  category?: string;
  description?: string;
  partners?: AboutPartnerItem[];
}

export interface RailYearItem extends StrapiEntity {
  label?: string;
}

export interface MilestoneEventItem extends StrapiEntity {
  date?: string;
  text?: string;
}

export interface MilestoneItem extends StrapiEntity {
  period?: string;
  year?: string;
  label?: string;
  image?: string;
  image_alt_text?: string;
  events?: MilestoneEventItem[];
}

export interface PersonaQaItem extends StrapiEntity {
  question?: string;
  answer?: string;
}

export interface PersonaItem extends StrapiEntity {
  tabLabel?: string;
  title?: string;
  tagline?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  questions?: PersonaQaItem[];
}

export interface PortalLinkItem extends StrapiEntity {
  kicker?: string;
  title?: string;
  sub?: string;
  href?: string;
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export interface AboutStructuredDataSection extends StrapiEntity {
  __component: "about-page.structured-data-section";
  pageTitle?: string;
  metaDescription?: string;
  dcTitle?: string;
  dcCreator?: string;
  dcSubject?: string;
  dcDescription?: string;
  dcPublisher?: string;
  dcLanguage?: string;
  dcType?: string;
  jsonLdType?: string;
  jsonLdName?: string;
  jsonLdDescription?: string;
  jsonLdPublisherName?: string;
  loadingLabel?: string;
}

export interface AboutHeroSection extends StrapiEntity {
  __component: "about-page.hero-section";
  breadcrumbLabel?: string;
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  headingPartTwo?: string;
  headingItalic?: string;
  bodyPartOne?: string;
  bodyPartTwo?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  statImage?: string;
  statImage_alt_text?: string;
  stats?: HeroStatItem[];
  sliderStats?: HeroSliderStatItem[];
}

export interface StickyNavSection extends StrapiEntity {
  __component: "about-page.sticky-nav-section";
  links?: NavLinkItem[];
}

export interface MandateSection extends StrapiEntity {
  __component: "about-page.mandate-section";
  eyebrow?: string;
  heading?: string;
  body?: string;
  mandateHeading?: string;
  numbersLabel?: string;
  bentoVideo?: string;
  paragraphs?: MandateParagraphItem[];
  numbers?: MandateNumberItem[];
  captions?: BentoCaptionItem[];
}

export interface MarketSection extends StrapiEntity {
  __component: "about-page.market-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  bodyOne?: string;
  bodyTwo?: string;
  bentoImage?: string;
  bentoImage_alt_text?: string;
  cards?: MarketBentoCardItem[];
}

export interface EnergyMapSection extends StrapiEntity {
  __component: "about-page.energy-map-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  body?: string;
  colHeaderRank?: string;
  colHeaderState?: string;
  colHeaderConnections?: string;
  colHeaderGap?: string;
  sourceNote?: string;
  tooltipConnectionsLabel?: string;
  tooltipFundingGapLabel?: string;
  tooltipUnservedLabel?: string;
  tooltipNeedIndexLabel?: string;
  legendLabel?: string;
  legendScaleLabel?: string;
  /** Raw Nigeria SVG. Unused: the map geometry comes from @svg-maps/nigeria. */
  mapSvg?: string;
  tabs?: MapTabItem[];
  states?: MapStateItem[];
}

export interface FrameworkSection extends StrapiEntity {
  __component: "about-page.framework-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  intro?: string;
  cards?: FrameworkCardItem[];
}

export interface CapitalStackSection extends StrapiEntity {
  __component: "about-page.capital-stack-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  collapsedBody?: string;
  expandedBody?: string;
  launchLabel?: string;
  collapseLabel?: string;
  sliderLabel?: string;
  sliderUnitLabel?: string;
  minLabel?: string;
  maxLabel?: string;
  wrapBadge?: string;
  totalLabel?: string;
  totalSuffix?: string;
  segments?: StackSegmentItem[];
  bars?: StackBarItem[];
}

export interface PartnersSection extends StrapiEntity {
  __component: "about-page.partners-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaHoverLabel?: string;
  groups?: PartnerGroupItem[];
}

export interface MilestonesSection extends StrapiEntity {
  __component: "about-page.milestones-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  railYears?: RailYearItem[];
  milestones?: MilestoneItem[];
}

export interface AudienceSection extends StrapiEntity {
  __component: "about-page.audience-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  journeySuffix?: string;
  questionsHeading?: string;
  personas?: PersonaItem[];
}

export interface NextStepsSection extends StrapiEntity {
  __component: "about-page.next-steps-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  links?: PortalLinkItem[];
}

export interface DownloadCtaSection extends StrapiEntity {
  __component: "about-page.download-cta-section";
  eyebrow?: string;
  heading?: string;
  body?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  downloadFileName?: string;
}

export type AboutSection =
  | AboutStructuredDataSection
  | AboutHeroSection
  | StickyNavSection
  | MandateSection
  | MarketSection
  | EnergyMapSection
  | FrameworkSection
  | CapitalStackSection
  | PartnersSection
  | MilestonesSection
  | AudienceSection
  | NextStepsSection
  | DownloadCtaSection;

export type AboutSectionComponent = AboutSection["__component"];
