/**
 * TypeScript mirrors of the Strapi `news` singleType dynamiczone.
 *
 * Source of truth: cms/src/api/news/content-types/news/schema.json and
 * cms/src/components/news-page/*.json
 *
 * Same conventions as strapi-about-types.ts: every field is optional, because
 * an editor can clear any field in the Content Manager. Media fields are
 * plain strings (a URL plus a sibling `*_alt_text`), not Strapi media objects.
 */

import type { StrapiEntity, ViewTabItem, CategoryItem } from "./strapi-types";

export type { StrapiEntity };

/* ------------------------------------------------------------------ */
/* Leaf items                                                          */
/* ------------------------------------------------------------------ */

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
  authorAvatar_alt_text?: string;
  image?: string;
  image_alt_text?: string;
  keyContext?: string;
  themes?: NewsThemeItem[];
  paragraphs?: NewsParagraphItem[];
}

/* ------------------------------------------------------------------ */
/* Sections (dynamiczone members)                                      */
/* ------------------------------------------------------------------ */

export interface NewsStructuredDataSection extends StrapiEntity {
  __component: "news-page.structured-data-section";
  pageTitle?: string;
  metaDescription?: string;
  dcTitle?: string;
  dcCreator?: string;
  dcSubject?: string;
  dcDescription?: string;
  dcPublisher?: string;
  dcLanguage?: string;
  dcType?: string;
  schemaName?: string;
  schemaDescription?: string;
  schemaUrl?: string;
  parentOrganizationName?: string;
}

export interface NewsHeroSection extends StrapiEntity {
  __component: "news-page.hero-section";
  subtitle?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  bgImage?: string;
  bgImage_alt_text?: string;
  breadcrumbHomeLabel?: string;
  breadcrumbCurrentPage?: string;
  cardCtaLabel?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
}

export interface NewsListingSection extends StrapiEntity {
  __component: "news-page.listing-section";
  sectionSub?: string;
  sectionTitle?: string;
  viewTabs?: ViewTabItem[];
  categories?: CategoryItem[];
}

export interface NewsArticlesSection extends StrapiEntity {
  __component: "news-page.articles-section";
  gridCtaLabel?: string;
  articles?: NewsArticleItem[];
}

export interface NewsArticleDetailSection extends StrapiEntity {
  __component: "news-page.article-detail-section";
  loadingLabel?: string;
  notFoundTitle?: string;
  notFoundBody?: string;
  notFoundCtaLabel?: string;
  copyLinkAlert?: string;
  titleSuffix?: string;
  publisherName?: string;
  publisherLogoUrl?: string;
  dcPublisher?: string;
  dcLanguage?: string;
  dcType?: string;
  breadcrumbParentLabel?: string;
  breadcrumbPrefix?: string;
  backLabel?: string;
  postedByLabel?: string;
  themesLabel?: string;
  contextLabel?: string;
  shareLabel?: string;
  shareLinkedinAriaLabel?: string;
  shareTwitterAriaLabel?: string;
  shareFacebookAriaLabel?: string;
  copyLinkAriaLabel?: string;
  publishedInPrefix?: string;
  previousArticleLabel?: string;
  firstArticleLabel?: string;
  nextArticleLabel?: string;
  latestArticleLabel?: string;
  relatedHeadingPartOne?: string;
  relatedHeadingHighlight?: string;
  relatedCtaLabel?: string;
}

export interface NewsNextStepsSection extends StrapiEntity {
  __component: "news-page.next-steps-section";
  eyebrow?: string;
  headingPartOne?: string;
  headingItalic?: string;
}

export type NewsSection =
  | NewsStructuredDataSection
  | NewsHeroSection
  | NewsListingSection
  | NewsArticlesSection
  | NewsArticleDetailSection
  | NewsNextStepsSection;

export type NewsSectionComponent = NewsSection["__component"];
