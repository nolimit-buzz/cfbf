/**
 * Shapes returned by the IMPACT single type's `sections` dynamiczone.
 *
 * Same conventions as strapi-types.ts, strapi-about-types.ts and
 * strapi-projects-types.ts:
 * - every field is optional, because Strapi returns null for anything an editor
 *   has cleared and the components render around the gaps;
 * - media are plain URL strings with a sibling `*_alt_text`, not Strapi media
 *   objects — the seed points at Cloudinary URLs;
 * - purely visual choices (SDG brand colours, hero card surfaces, tab icons,
 *   the net-zero wheel geometry) have no CMS field and stay in the components
 *   as design tokens.
 */

export interface StrapiEntity {
  id?: number;
}

/* ------------------------------------------------------------------ leaves */

export interface LabelItem extends StrapiEntity {
  label?: string;
}

export interface TabItem extends StrapiEntity {
  /** "stories" | "numbers" | "investments" | "assets" — drives the active panel. */
  tabId?: string;
  label?: string;
}

export interface HeroStatItem extends StrapiEntity {
  category?: string;
  value?: string;
  label?: string;
  description?: string;
  /** Written as "SDG 7"; the badge colour comes from the digits. */
  sdgBadge?: string;
}

export interface PillarItem extends StrapiEntity {
  /** "01".."04" — rendered as `/ 01`. */
  number?: string;
  title?: string;
  description?: string;
}

export interface StoryItem extends StrapiEntity {
  title?: string;
  role?: string;
  location?: string;
  type?: string;
  badge?: string;
  excerpt?: string;
  duration?: string;
  image?: string;
  image_alt_text?: string;
  /** Plays in the modal; the ?play=<index> param opens it on load. */
  video?: string;
}

export interface MetricItem extends StrapiEntity {
  label?: string;
  value?: string;
  unit?: string;
  description?: string;
}

export interface TimelinePointItem extends StrapiEntity {
  year?: string;
  label?: string;
}

export interface SdgCardItem extends StrapiEntity {
  /** "07".."13" — the large watermark number on the card. */
  number?: string;
  title?: string;
  /** Written as "SDG 7"; the card's brand colour comes from the digits. */
  badgeLabel?: string;
  description?: string;
  image?: string;
  image_alt_text?: string;
}

export interface AssetItem extends StrapiEntity {
  assetId?: string;
  title?: string;
  location?: string;
  category?: string;
  capacity?: string;
  connections?: string;
  jobs?: string;
  ghg?: string;
  capital?: string;
  year?: string;
  status?: string;
}

export interface PortalLinkItem extends StrapiEntity {
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
}

/* ---------------------------------------------------------------- sections */

export interface ImpactStructuredDataSection extends StrapiEntity {
  __component: 'impact-page.structured-data-section';
  pageTitle?: string;
  metaDescription?: string;
  loadingLabel?: string;
}

export interface ImpactHeroSection extends StrapiEntity {
  __component: 'impact-page.hero-section';
  breadcrumbLabel?: string;
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  descriptionPrimary?: string;
  descriptionSecondary?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  stats?: HeroStatItem[];
}

export interface PhilosophySection extends StrapiEntity {
  __component: 'impact-page.philosophy-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  bodyPartOne?: string;
  bodyPartTwo?: string;
  pillars?: PillarItem[];
}

export interface ImpactConsoleSection extends StrapiEntity {
  __component: 'impact-page.impact-console-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  tabs?: TabItem[];
}

export interface StoriesTabSection extends StrapiEntity {
  __component: 'impact-page.stories-tab-section';
  /** "Showing {n} of {n} community case studies" split around the two counts. */
  countPrefix?: string;
  countMiddle?: string;
  countSuffix?: string;
  viewMoreLabel?: string;
  roleLabel?: string;
  locationLabel?: string;
  typeLabel?: string;
  stories?: StoryItem[];
}

export interface NumbersTabSection extends StrapiEntity {
  __component: 'impact-page.numbers-tab-section';
  metrics?: MetricItem[];
  wheelCenterYear?: string;
  wheelCenterLabel?: string;
  wheelProgressLabel?: string;
  timelinePoints?: TimelinePointItem[];
  etpLabel?: string;
  etpBody?: string;
  pensionLabel?: string;
  pensionTargetValue?: string;
  pensionCurrentLabel?: string;
  pensionTargetLabel?: string;
}

export interface InvestmentsTabSection extends StrapiEntity {
  __component: 'impact-page.investments-tab-section';
  pillarsHeading?: string;
  /** Authored separately from the philosophy pillars, so both can diverge. */
  pillars?: PillarItem[];
  sdgHeading?: string;
  sdgCards?: SdgCardItem[];
}

export interface AssetsTabSection extends StrapiEntity {
  __component: 'impact-page.assets-tab-section';
  columns?: LabelItem[];
  assets?: AssetItem[];
}

export interface ImpactNextStepsSection extends StrapiEntity {
  __component: 'impact-page.next-steps-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingItalic?: string;
  links?: PortalLinkItem[];
}

export interface VideoModalSection extends StrapiEntity {
  __component: 'impact-page.video-modal-section';
  nowPlayingLabel?: string;
}

export type ImpactSection =
  | ImpactStructuredDataSection
  | ImpactHeroSection
  | PhilosophySection
  | ImpactConsoleSection
  | StoriesTabSection
  | NumbersTabSection
  | InvestmentsTabSection
  | AssetsTabSection
  | ImpactNextStepsSection
  | VideoModalSection;

export type ImpactSectionComponent = ImpactSection['__component'];
