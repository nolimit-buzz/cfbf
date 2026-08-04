/**
 * Shapes returned by the ELIGIBILITY single type's `sections` dynamiczone.
 *
 * Same conventions as strapi-types.ts, strapi-about-types.ts and
 * strapi-impact-types.ts:
 * - every field is optional, because Strapi returns null for anything an editor
 *   has cleared and the components render around the gaps;
 * - media are plain URL strings with a sibling `*_alt_text`, not Strapi media
 *   objects — the seed points at Cloudinary URLs;
 * - purely visual choices (SDG brand colours, hero card surfaces, step icons,
 *   the ordering, etc.) have no CMS field and stay in the components as design
 *   tokens.
 */

export interface StrapiEntity {
  id?: number;
}

/* ────────────────────────────────────────────────────────── leaf components */

/** Sector category appearing in the hero carousel. */
export interface SectorItem extends StrapiEntity {
  title?: string;
  description?: string;
  sdgBadge?: string;
}

/** Single list item within a criteria card. */
export interface CriteriaListItem extends StrapiEntity {
  text?: string;
}

/** Single stat row within a criteria card (capacity, customers, etc). */
export interface CriteriaStatItem extends StrapiEntity {
  value?: string;
  label?: string;
}

/** One of the 4 criteria cards in the bento grid. */
export interface CriteriaCardItem extends StrapiEntity {
  heading?: string;
  body?: string;
  subNote?: string;
  listItems?: CriteriaListItem[];
  stats?: CriteriaStatItem[];
  footerTag?: string;
}

/** One step in the 9-step funding timeline. */
export interface TimelineStepItem extends StrapiEntity {
  stepNumber?: string;
  title?: string;
  description?: string;
}

/** One link in the next-steps portal strip. */
export interface PortalLinkItem extends StrapiEntity {
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
}

/** One assessment step (1-4 in the wizard). */
export interface AssessmentStepItem extends StrapiEntity {
  stepNumber?: string;
  title?: string;
  description?: string;
}

/** One answer option in a multi-choice question. */
export interface AssessmentOptionItem extends StrapiEntity {
  label?: string;
  value?: string;
}

/** One assessment question from the 4-step wizard. */
export interface AssessmentQuestionItem extends StrapiEntity {
  stepNumber?: string;
  label?: string;
  requiredMarker?: string;
  helperText?: string;
  options?: AssessmentOptionItem[];
}

/** One outcome path (qualified / technical-assistance / excluded). */
export interface AssessmentOutcomeItem extends StrapiEntity {
  status?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
}

/** One row in the alignment framework log (displayed in results). */
export interface AssessmentLogRowItem extends StrapiEntity {
  label?: string;
  passLabel?: string;
  failLabel?: string;
}

/* ────────────────────────────────────────────────────────── sections */

/** Metadata, SEO, and JSON-LD for the page. */
export interface EligibilityStructuredDataSection extends StrapiEntity {
  __component: 'eligibility-page.structured-data-section';
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
  schemaPublisherName?: string;
}

/** Hero banner with heading, description, and sector carousel. */
export interface EligibilityHeroSection extends StrapiEntity {
  __component: 'eligibility-page.hero-section';
  breadcrumbLabel?: string;
  currentPageLabel?: string;
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  descriptionPrimary?: string;
  descriptionSecondaryPrefix?: string;
  descriptionSecondaryLinkLabel?: string;
  descriptionSecondaryLinkHref?: string;
  descriptionSecondarySuffix?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  sectorsLabel?: string;
  sectors?: SectorItem[];
}

/** 4-card bento grid showing eligibility criteria pillars. */
export interface EligibilityCriteriaPillarsSection extends StrapiEntity {
  __component: 'eligibility-page.criteria-pillars-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  cards?: CriteriaCardItem[];
}

/** 9-step funding timeline workflow. */
export interface EligibilityTimelineWorkflowSection extends StrapiEntity {
  __component: 'eligibility-page.timeline-workflow-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  stepLabelPrefix?: string;
  steps?: TimelineStepItem[];
}

/** Next steps bar and portal link strip. */
export interface EligibilityNextStepsSection extends StrapiEntity {
  __component: 'eligibility-page.next-steps-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingItalic?: string;
  links?: PortalLinkItem[];
}

/** Assessment & factsheet CTA panel. */
export interface EligibilityFinalCtaSection extends StrapiEntity {
  __component: 'eligibility-page.final-cta-section';
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  body?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  downloadCtaLabel?: string;
  downloadCtaHref?: string;
  downloadFileName?: string;
}

/** Wizard header/footer labels for the assessment page. */
export interface EligibilityAssessmentChromeSection extends StrapiEntity {
  __component: 'eligibility-page.assessment-chrome-section';
  backLabel?: string;
  cancelLabel?: string;
  nextLabel?: string;
  stepCounterPrefix?: string;
  stepCounterMiddle?: string;
  stepCounterTotal?: string;
  summaryBadge?: string;
}

/** Assessment step headers and all 15 quiz questions. */
export interface EligibilityAssessmentStepsSection extends StrapiEntity {
  __component: 'eligibility-page.assessment-steps-section';
  steps?: AssessmentStepItem[];
  questions?: AssessmentQuestionItem[];
}

/** Outcome paths and alignment log rows for the results screen. */
export interface EligibilityAssessmentResultSection extends StrapiEntity {
  __component: 'eligibility-page.assessment-result-section';
  readinessLabel?: string;
  logHeading?: string;
  outcomes?: AssessmentOutcomeItem[];
  logRows?: AssessmentLogRowItem[];
  excludedCtaLabel?: string;
  restartLabel?: string;
}

/* ────────────────────────────────────────────────────────── unions */

export type EligibilitySection =
  | EligibilityStructuredDataSection
  | EligibilityHeroSection
  | EligibilityCriteriaPillarsSection
  | EligibilityTimelineWorkflowSection
  | EligibilityNextStepsSection
  | EligibilityFinalCtaSection
  | EligibilityAssessmentChromeSection
  | EligibilityAssessmentStepsSection
  | EligibilityAssessmentResultSection;

export type EligibilitySectionComponent = EligibilitySection['__component'];
