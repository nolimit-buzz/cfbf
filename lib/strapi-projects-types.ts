/**
 * Shapes returned by the PROJECTS single type's `sections` dynamiczone, plus the
 * `project` collection behind /projects/[id].
 *
 * Same conventions as strapi-types.ts and strapi-about-types.ts:
 * - every field is optional, because Strapi returns null for anything an editor
 *   has cleared and the components render around the gaps;
 * - media are plain URL strings with a sibling `*_alt_text`, not Strapi media
 *   objects — the seed points at external image URLs;
 * - purely visual choices (SDG brand colours, card icons, map path fills) have
 *   no CMS field and stay in the components as design tokens.
 */

export interface StrapiEntity {
  id?: number;
}

/* ------------------------------------------------------------------ leaves */

export interface LabelItem extends StrapiEntity {
  label?: string;
}

export type TabItem = LabelItem;

export interface SdgItem extends StrapiEntity {
  /** Strapi stores this as a string ("7"), so compare against String(n). */
  number?: string;
  name?: string;
  image?: string;
  image_alt_text?: string;
}

export interface ProjectItem extends StrapiEntity {
  /** "01".."06" — the segment /projects/[id] resolves against. */
  projectId?: string;
  title?: string;
  location?: string;
  year?: string;
  /** Metric values keep their units baked in and are regex-parsed for totals. */
  capital?: string;
  capacity?: string;
  category?: string;
  connections?: string;
  jobs?: string;
  ghg?: string;
  status?: string;
  image?: string;
  image_alt_text?: string;
  desc?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  /** Comma-separated goal numbers, e.g. "7, 13" — see parseSdgs(). */
  sdgs?: string;
}

export interface StateProjectItem extends StrapiEntity {
  stateMapId?: string;
  projectName?: string;
  capacity?: string;
  funding?: string;
  sdgs?: string;
  category?: string;
  status?: string;
}

export interface HeroStatItem extends StrapiEntity {
  label?: string;
  value?: string;
  unit?: string;
  description?: string;
  /** Written as "SDG 7"; the badge colour comes from the digits. */
  sdgBadge?: string;
}

export interface StatBoxItem extends StrapiEntity {
  label?: string;
  value?: string;
  unit?: string;
  description?: string;
}

export interface MetricCardItem extends StrapiEntity {
  label?: string;
  unit?: string;
  description?: string;
}

export interface PipelineStageMetrics extends StrapiEntity {
  connections?: string;
  /** Seeded as "" on stages that use the default label — test with `||`. */
  connectionsLabel?: string;
  capacity?: string;
  communities?: string;
  communitiesLabel?: string;
  jobs?: string;
  ghg?: string;
  capital?: string;
  capitalSub?: string;
}

export interface PipelineStageItem extends StrapiEntity {
  stageId?: string;
  label?: string;
  title?: string;
  usdVal?: string;
  ngnVal?: string;
  desc?: string;
  sdgs?: string;
  metrics?: PipelineStageMetrics;
}

export interface SectorRowItem extends StrapiEntity {
  sector?: string;
  projectsCount?: number;
  valueNgn?: number;
  percentage?: string;
}

export interface MapLegendItem extends StrapiEntity {
  label?: string;
  color?: string;
  /** Matches map-state-item.projectType; the row typed "default" is the fallback. */
  type?: string;
}

export interface LgaItem extends StrapiEntity {
  name?: string;
}

export interface MapStateItem extends StrapiEntity {
  mapId?: string;
  name?: string;
  hasProjects?: boolean;
  projectType?: string;
  lgas?: LgaItem[];
}

export interface LgaProjectItem extends StrapiEntity {
  developer?: string;
  community?: string;
  state?: string;
  lga?: string;
  projectType?: string;
  puePotential?: number;
  enumerators?: number;
}

export interface ProjectTypeIconItem extends StrapiEntity {
  projectType?: string;
  icon?: string;
}

export interface LgaHeroImageItem extends StrapiEntity {
  projectType?: string;
  image?: string;
  image_alt_text?: string;
}

/**
 * Distinct from the about page's PortalLinkItem, which uses kicker/title/sub.
 * Same visual block, different field names — do not share the type.
 */
export interface ProjectsPortalLinkItem extends StrapiEntity {
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
}

/* ---------------------------------------------------------------- sections */

export interface ProjectsStructuredDataSection extends StrapiEntity {
  __component: 'projects-page.structured-data-section';
  pageTitle?: string;
  metaDescription?: string;
  dcTitle?: string;
  dcCreator?: string;
  dcSubject?: string;
  dcDescription?: string;
  dcPublisher?: string;
  dcLanguage?: string;
  dcCoverageSpatial?: string;
  dcType?: string;
  jsonLdType?: string;
  jsonLdName?: string;
  jsonLdDescription?: string;
  jsonLdUrl?: string;
  jsonLdPublisherName?: string;
}

export interface ProjectsHeroSection extends StrapiEntity {
  __component: 'projects-page.hero-section';
  breadcrumbLabel?: string;
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  description?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
  stats?: HeroStatItem[];
}

export interface PortfolioTabsSection extends StrapiEntity {
  __component: 'projects-page.portfolio-tabs-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  body?: string;
  /** [0] pipeline, [1] analysis, [2] scrolls to the footprint map. */
  tabs?: TabItem[];
}

export interface AnalysisTabSection extends StrapiEntity {
  __component: 'projects-page.analysis-tab-section';
  tableHeading?: string;
  downloadLabel?: string;
  downloadHref?: string;
  totalsRowLabel?: string;
  totalsConnectionsSuffix?: string;
  capacityUnit?: string;
  ghgUnit?: string;
  statusOperationalLabel?: string;
  statusUnderConstructionLabel?: string;
  statBoxes?: StatBoxItem[];
  columnHeads?: LabelItem[];
}

export interface PipelineTabSection extends StrapiEntity {
  __component: 'projects-page.pipeline-tab-section';
  filterBannerPrefix?: string;
  stateSuffix?: string;
  clearFilterLabel?: string;
  projectIdPrefix?: string;
  challengeLabel?: string;
  financialCloseLabel?: string;
  privateCapitalLabel?: string;
  sdgGoalsLabel?: string;
  detailsLinkLabel?: string;
  categories?: LabelItem[];
  /** Also feeds the analysis tab's table and totals. */
  projects?: ProjectItem[];
  sdgDefinitions?: SdgItem[];
  stateProjects?: StateProjectItem[];
}

export interface PipelineConsoleSection extends StrapiEntity {
  __component: 'projects-page.pipeline-console-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  body?: string;
  selectStageLabel?: string;
  usdUnitLabel?: string;
  sdgFrameworksLabel?: string;
  toggleTotalLabel?: string;
  toggleMandatedLabel?: string;
  metricsHeader?: string;
  businessModelsHeader?: string;
  metricsSubcopy?: string;
  businessModelsSubcopy?: string;
  tableHeadSector?: string;
  tableHeadProjects?: string;
  tableHeadPipelineNgn?: string;
  tableHeadMandatedNgn?: string;
  tableHeadDealSize?: string;
  footerLabel?: string;
  footerProjects?: string;
  footerTotalPipeline?: string;
  footerTotalMandated?: string;
  footerPercent?: string;
  businessModelsMandatedUsd?: string;
  businessModelsMandatedNgn?: string;
  leftBackgroundImage?: string;
  leftBackgroundImage_alt_text?: string;
  rightBackgroundImage?: string;
  rightBackgroundImage_alt_text?: string;
  /** Positional: 0 connections, 1 capacity, 2 communities, 3 jobs, 4 ghg, 5 capital. */
  metricLabels?: MetricCardItem[];
  stages?: PipelineStageItem[];
  sdgFrameworks?: SdgItem[];
  totalPipelineRows?: SectorRowItem[];
  mandatedDealRows?: SectorRowItem[];
}

export interface EligibilityCtaSection extends StrapiEntity {
  __component: 'projects-page.eligibility-cta-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  headingPartTwo?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;
  backgroundImage_alt_text?: string;
}

export interface FootprintMapSection extends StrapiEntity {
  __component: 'projects-page.footprint-map-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingHighlight?: string;
  body?: string;
  statesStatLabel?: string;
  communitiesStatLabel?: string;
  statesColumnLabel?: string;
  searchPlaceholder?: string;
  mapLabel?: string;
  mapHint?: string;
  lgaPanelSuffix?: string;
  lgaEmptyMessage?: string;
  clearSelectionLabel?: string;
  placeholderTitle?: string;
  placeholderBody?: string;
  /**
   * Seeded but unused: the map renders @svg-maps/nigeria's viewBox + locations,
   * so there is no place to inject raw SVG markup. Left in the schema rather
   * than dropped, to keep the seed and component schemas in step.
   */
  mapSvg?: string;
  legend?: MapLegendItem[];
  states?: MapStateItem[];
  lgaProjects?: LgaProjectItem[];
}

export interface LgaModalSection extends StrapiEntity {
  __component: 'projects-page.lga-modal-section';
  subtitlePrefix?: string;
  subtitleStateSuffix?: string;
  statLabelDevelopers?: string;
  statLabelCommunities?: string;
  statLabelPuePotential?: string;
  emptyTitle?: string;
  emptyBody?: string;
  sourceLabel?: string;
  closeLabel?: string;
  fallbackIcon?: string;
  columnHeads?: LabelItem[];
  projectTypeIcons?: ProjectTypeIconItem[];
  heroImages?: LgaHeroImageItem[];
}

export interface ProjectsNextStepsSection extends StrapiEntity {
  __component: 'projects-page.next-steps-section';
  eyebrow?: string;
  headingPartOne?: string;
  headingItalic?: string;
  links?: ProjectsPortalLinkItem[];
}

export type ProjectsSection =
  | ProjectsStructuredDataSection
  | ProjectsHeroSection
  | PortfolioTabsSection
  | AnalysisTabSection
  | PipelineTabSection
  | PipelineConsoleSection
  | EligibilityCtaSection
  | FootprintMapSection
  | LgaModalSection
  | ProjectsNextStepsSection;

export type ProjectsSectionComponent = ProjectsSection['__component'];

/* ------------------------------------------- project collection (/[id]) */

export interface GalleryItem extends StrapiEntity {
  image?: string;
  image_alt_text?: string;
  caption?: string;
}

export interface VideoItem extends StrapiEntity {
  videoId?: string;
  title?: string;
  category?: string;
  youtubeId?: string;
}

/** One record of the `project` collection — the case study at /projects/[id]. */
export interface ProjectDetail extends StrapiEntity {
  documentId?: string;
  projectId?: string;
  slug?: string;
  title?: string;
  location?: string;
  year?: string;
  capital?: string;
  capacity?: string;
  category?: string;
  connections?: string;
  jobs?: string;
  ghg?: string;
  status?: string;
  image?: string;
  image_alt_text?: string;
  desc?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  financing?: string;
  impact_desc?: string;
  /** Was a `category === 'Telecoms' ? … : id === '03' ? …` ternary in the page. */
  financingInstrument?: string;
  /** Was getExpectedImpactText(), a template with hardcoded '02'/'04' branches. */
  expectedImpactText?: string;
  introTitle?: string;
  sdgs?: string;
  /** Comma-separated @svg-maps/nigeria ids, e.g. "rivers, abia". */
  states?: string;
  gallery?: GalleryItem[];
  videos?: VideoItem[];
}

/* ----------------------------------------------------------------- helpers */

/** "7, 13" -> [7, 13]. Tolerates undefined, blanks and stray separators. */
export function parseSdgs(value?: string): number[] {
  return (value ?? '')
    .split(',')
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((n) => Number.isFinite(n));
}

/** "rivers, abia" -> ["rivers", "abia"]. Same tolerance as parseSdgs(). */
export function parseCsv(value?: string): string[] {
  return (value ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}
