/**
 * Shapes returned by the CONTACT single type's `sections` dynamiczone.
 *
 * Same conventions as strapi-eligibility-types.ts: every field is optional,
 * because Strapi returns null for anything an editor has cleared; none of
 * these components carry repeatable sub-fields.
 */

export interface StrapiEntity {
  id?: number;
}

export interface ContactStructuredDataSection extends StrapiEntity {
  __component: 'contact-page.structured-data-section';
  pageTitle?: string;
  metaDescription?: string;
  loadingLabel?: string;
  jsonLdType?: string;
  jsonLdName?: string;
  jsonLdDescription?: string;
  jsonLdPublisherName?: string;
}

export interface ContactHeroSection extends StrapiEntity {
  __component: 'contact-page.hero-section';
  breadcrumbLabel?: string;
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  description?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
}

export interface ContactFacilityContactsSection extends StrapiEntity {
  __component: 'contact-page.facility-contacts-section';
  heading?: string;
  officeLocationLabel?: string;
  officeAddressLineOne?: string;
  officeAddressLineTwo?: string;
  emailLabel?: string;
  emailAddress?: string;
  emailHref?: string;
  phoneLabel?: string;
  phoneNumber?: string;
  phoneHref?: string;
}

export interface ContactEligibilityReminderSection extends StrapiEntity {
  __component: 'contact-page.eligibility-reminder-section';
  eyebrow?: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ContactFunStatsSection extends StrapiEntity {
  __component: 'contact-page.fun-stats-section';
  eyebrow?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  statIconSvg?: string;
}

export interface ContactEnquiryFormSection extends StrapiEntity {
  __component: 'contact-page.enquiry-form-section';
  heading?: string;
  readinessAlertLabelPrefix?: string;
  readinessAlertLabelSuffix?: string;
  qualifiedAlertBody?: string;
  technicalAssistanceAlertBody?: string;
  fullNameLabel?: string;
  organizationLabel?: string;
  emailAddressLabel?: string;
  technologyTypeLabel?: string;
  capacityLabel?: string;
  institutionTypeLabel?: string;
  investmentTrancheLabel?: string;
  messageLabel?: string;
  prefillIntroTemplate?: string;
  prefillQualifiedBody?: string;
  prefillTechnicalAssistanceBody?: string;
  defaultTechnologyLabel?: string;
  submitLabel?: string;
}

export interface ContactSubmissionSuccessSection extends StrapiEntity {
  __component: 'contact-page.submission-success-section';
  heading?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
}

export interface ContactNextStepsSection extends StrapiEntity {
  __component: 'contact-page.next-steps-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingItalic?: string;
}

export interface ContactDownloadCtaSection extends StrapiEntity {
  __component: 'contact-page.download-cta-section';
  eyebrow?: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  fileHref?: string;
  downloadFileName?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
}

export type ContactSection =
  | ContactStructuredDataSection
  | ContactHeroSection
  | ContactFacilityContactsSection
  | ContactEligibilityReminderSection
  | ContactFunStatsSection
  | ContactEnquiryFormSection
  | ContactSubmissionSuccessSection
  | ContactNextStepsSection
  | ContactDownloadCtaSection;

export type ContactSectionComponent = ContactSection['__component'];
