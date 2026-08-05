/**
 * Shapes returned by the HOW-IT-WORKS single type's `sections` dynamiczone.
 *
 * Same conventions as strapi-eligibility-types.ts:
 * - every field is optional, because Strapi returns null for anything an editor
 *   has cleared and the components render around the gaps;
 * - media are plain URL strings with a sibling `*_alt_text`, not Strapi media
 *   objects — the seed points at Cloudinary URLs.
 */

export interface StrapiEntity {
  id?: number;
}

/* ────────────────────────────────────────────────────────── leaf components */

/** One of the 4 condensed hero phase cards. */
export interface HeroPhaseStepItem extends StrapiEntity {
  index?: string;
  range?: string;
  title?: string;
  desc?: string;
  theme?: string;
}

/** One overview checklist bullet. */
export interface OverviewBulletItem extends StrapiEntity {
  text?: string;
}

/** One anchor funder or TA provider logo. */
export interface AnchorFunderItem extends StrapiEntity {
  src?: string;
  alt?: string;
  href?: string;
  src_alt_text?: string;
}

/** Co-financing partner logo (white + colour variants). */
export interface CoFinancingPartnerItem extends StrapiEntity {
  srcWhite?: string;
  srcColour?: string;
  alt?: string;
  href?: string;
  srcWhite_alt_text?: string;
  srcColour_alt_text?: string;
}

export type TaProviderItem = AnchorFunderItem;

/** One step in the 9-step funding process timeline. */
export interface ProcessStepItem extends StrapiEntity {
  step?: string;
  title?: string;
  desc?: string;
}

/** One link in the next-steps portal strip. */
export interface PortalLinkItem extends StrapiEntity {
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
}

/* ────────────────────────────────────────────────────────── sections */

/** Metadata, SEO, and JSON-LD for the page. */
export interface HowItWorksStructuredDataSection extends StrapiEntity {
  __component: 'how-it-works-page.structured-data-section';
  schemaName?: string;
  schemaDescription?: string;
  publisherName?: string;
  pageTitle?: string;
  metaDescription?: string;
  dcTitle?: string;
  dcCreator?: string;
  dcSubject?: string;
  dcDescription?: string;
  dcLanguage?: string;
  dcType?: string;
}

/** Hero banner with 4 condensed phase cards. */
export interface HowItWorksHeroSection extends StrapiEntity {
  __component: 'how-it-works-page.hero-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  breadcrumbRootLabel?: string;
  breadcrumbLabel?: string;
  descriptionPrimary?: string;
  descriptionSecondaryPrefix?: string;
  descriptionSecondaryLinkLabel?: string;
  descriptionSecondaryLinkHref?: string;
  descriptionSecondarySuffix?: string;
  stepCardAriaSuffix?: string;
  stepCardHref?: string;
  steps?: HeroPhaseStepItem[];
}

/** Overview copy, checklist bullets, and partner logo panels. */
export interface HowItWorksFinancingStructureSection extends StrapiEntity {
  __component: 'how-it-works-page.financing-structure-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  bodyPrimary?: string;
  bodySecondary?: string;
  anchorFundersLabel?: string;
  coFinancingLabel?: string;
  taProvidersLabel?: string;
  taRotationMs?: string;
  bullets?: OverviewBulletItem[];
  anchorFunders?: AnchorFunderItem[];
  coFinancingPartner?: CoFinancingPartnerItem;
  taProviders?: TaProviderItem[];
}

/** Facility structure diagram section. */
export interface HowItWorksFacilityStructureSection extends StrapiEntity {
  __component: 'how-it-works-page.facility-structure-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  body?: string;
  diagramSrc?: string;
  diagramAlt?: string;
  diagramSrc_alt_text?: string;
}

/** 9-step funding process timeline. */
export interface HowItWorksProcessSection extends StrapiEntity {
  __component: 'how-it-works-page.process-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  intro?: string;
  steps?: ProcessStepItem[];
}

/** Next steps CTA bar and portal link strip. */
export interface HowItWorksNextStepsSection extends StrapiEntity {
  __component: 'how-it-works-page.next-steps-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingItalic?: string;
  links?: PortalLinkItem[];
}

/* ────────────────────────────────────────────────────────── unions */

export type HowItWorksSection =
  | HowItWorksStructuredDataSection
  | HowItWorksHeroSection
  | HowItWorksFinancingStructureSection
  | HowItWorksFacilityStructureSection
  | HowItWorksProcessSection
  | HowItWorksNextStepsSection;

export type HowItWorksSectionComponent = HowItWorksSection['__component'];
