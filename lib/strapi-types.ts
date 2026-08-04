/**
 * TypeScript mirrors of the Strapi `home` singleType dynamiczone.
 *
 * Source of truth: cms/src/api/home/content-types/home/schema.json and
 * cms/src/components/home-page/*.json
 *
 * Every field is optional — an editor can clear any field in the Content Manager,
 * so consumers must guard before rendering.
 */

/* ------------------------------------------------------------------ */
/* Leaf items                                                          */
/* ------------------------------------------------------------------ */

export interface StrapiEntity {
  id?: number;
}

export interface StatItem extends StrapiEntity {
  value?: string;
  label?: string;
}

export interface PartnerItem extends StrapiEntity {
  name?: string;
}

export interface SponsorItem extends StrapiEntity {
  name?: string;
}

export interface CategoryItem extends StrapiEntity {
  label?: string;
}

export interface ViewTabItem extends StrapiEntity {
  tabId?: string;
  label?: string;
}

export interface TabItem extends StrapiEntity {
  tabId?: string;
  label?: string;
  title?: string;
  description?: string;
}

export interface MetricCardItem extends StrapiEntity {
  value?: string;
  suffix?: string;
  label?: string;
  image?: string;
  image_alt_text?: string;
}

export interface GallerySlideItem extends StrapiEntity {
  image?: string;
  image_alt_text?: string;
  description?: string;
}

export interface ReportItem extends StrapiEntity {
  reportId?: string;
  tag?: string;
  title?: string;
  size?: string;
}

export interface TheoryCardItem extends StrapiEntity {
  cardId?: string;
  cardType?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  image?: string;
  image_alt_text?: string;
  link?: string;
  linkLabel?: string;
}

export interface ProjectItem extends StrapiEntity {
  projectId?: string;
  title?: string;
  location?: string;
  year?: string;
  capital?: string;
  capacity?: string;
  category?: string;
  image?: string;
  imageOne?: string;
  imageTwo?: string;
  image_alt_text?: string;
  imageOne_alt_text?: string;
  imageTwo_alt_text?: string;
  description?: string;
  problem?: string;
  solution?: string;
  impact?: string;
}

export interface MapMarkerItem extends StrapiEntity {
  name?: string;
  x?: string;
  y?: string;
}

export interface MapStateItem extends StrapiEntity {
  stateId?: string;
}

export interface StoryItem extends StrapiEntity {
  title?: string;
  role?: string;
  location?: string;
  storyType?: string;
  badge?: string;
  image?: string;
  image_alt_text?: string;
  excerpt?: string;
  duration?: string;
}

export interface NewsThemeItem extends StrapiEntity {
  label?: string;
}

export interface NewsParagraphItem extends StrapiEntity {
  blockType?: string;
  text?: string;
  caption?: string;
  url?: string;
  url_alt_text?: string;
}

export interface NewsArticleItem extends StrapiEntity {
  articleId?: string;
  tag?: string;
  date?: string;
  readTime?: string;
  title?: string;
  excerpt?: string;
  author?: string;
  authorAvatar?: string;
  image?: string;
  authorAvatar_alt_text?: string;
  image_alt_text?: string;
  keyContext?: string;
  themes?: NewsThemeItem[];
  paragraphs?: NewsParagraphItem[];
}

export interface FeatureCardItem extends StrapiEntity {
  title?: string;
  description?: string;
}

/* ------------------------------------------------------------------ */
/* Sections (dynamiczone members)                                      */
/* ------------------------------------------------------------------ */

export interface HeroSection extends StrapiEntity {
  __component: "home-page.hero-section";
  headingPrimary?: string;
  headingSecondary?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  newsCtaLabel?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  backgroundVideo?: string;
  certificationBadge?: string;
  certificationBadge_alt_text?: string;
  stats?: StatItem[];
}

export interface AboutSection extends StrapiEntity {
  __component: "home-page.about-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  partnersHeading?: string;
  statValue?: string;
  statDescription?: string;
  image?: string;
  image_alt_text?: string;
  partners?: PartnerItem[];
}

export interface ImpactSection extends StrapiEntity {
  __component: "home-page.impact-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  numbersCtaLabel?: string;
  reportCtaLabel?: string;
  reportFileName?: string;
  reportFileHref?: string;
  capacityCtaLabel?: string;
  statsCardEyebrow?: string;
  galleryCtaLabel?: string;
  knowledgeHubTitle?: string;
  knowledgeHubSubtitle?: string;
  theoryEyebrow?: string;
  theoryHeadingPrimary?: string;
  theoryHeadingSecondary?: string;
  theoryFooterLabel?: string;
  tabs?: TabItem[];
  metricCards?: MetricCardItem[];
  capacityStats?: StatItem[];
  gallerySlides?: GallerySlideItem[];
  reports?: ReportItem[];
  theoryCards?: TheoryCardItem[];
}

export interface ProjectsSection extends StrapiEntity {
  __component: "home-page.projects-section";
  eyebrow?: string;
  heading?: string;
  capitalLabel?: string;
  capacityLabel?: string;
  challengeLabel?: string;
  solutionLabel?: string;
  impactLabel?: string;
  detailCtaLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  viewTabs?: ViewTabItem[];
  categories?: CategoryItem[];
  projects?: ProjectItem[];
}

export interface MapSection extends StrapiEntity {
  __component: "home-page.map-section";
  eyebrow?: string;
  headingPrimary?: string;
  headingSecondary?: string;
  statValue?: string;
  statLabel?: string;
  body?: string;
  ctaLabel?: string;
  fsdAfricaLogoSvg?: string;
  categories?: CategoryItem[];
  markers?: MapMarkerItem[];
  activeStates?: MapStateItem[];
}

export interface StoriesSection extends StrapiEntity {
  __component: "home-page.stories-section";
  eyebrow?: string;
  heading?: string;
  roleLabel?: string;
  locationLabel?: string;
  typeLabel?: string;
  viewTabs?: ViewTabItem[];
  stories?: StoryItem[];
}

export interface NewsSection extends StrapiEntity {
  __component: "home-page.news-section";
  eyebrow?: string;
  heading?: string;
  readArticleLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  viewTabs?: ViewTabItem[];
  articles?: NewsArticleItem[];
}

export interface NetZeroSection extends StrapiEntity {
  __component: "home-page.net-zero-section";
  cardTitle?: string;
  cardSubtitle?: string;
  cardBody?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  image?: string;
  image_alt_text?: string;
  features?: FeatureCardItem[];
}

export interface StructuredDataSection extends StrapiEntity {
  __component: "home-page.structured-data-section";
  organizationName?: string;
  url?: string;
  logoUrl?: string;
  logoUrl_alt_text?: string;
  description?: string;
  siteName?: string;
  sponsors?: SponsorItem[];
}

export type HomeSection =
  | HeroSection
  | AboutSection
  | ImpactSection
  | ProjectsSection
  | MapSection
  | StoriesSection
  | NewsSection
  | NetZeroSection
  | StructuredDataSection;

export type HomeSectionComponent = HomeSection["__component"];
