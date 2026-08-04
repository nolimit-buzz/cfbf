"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  MapPin,
  ChevronRight,
  Sun,
  Briefcase,
  Download,
  BookOpen,
  Users,
  Camera,
  Play,
  Leaf,
  Info
} from 'lucide-react';
import CountUp from '@/components/ui/CountUp';
import type {
  GallerySlideItem,
  ImpactSection,
  ReportItem,
  StatItem,
  TheoryCardItem,
} from '@/lib/strapi-types';

type ImpactProps = Omit<ImpactSection, '__component'>;

type MetricVariant = 'dark' | 'primary' | 'blue' | 'light' | 'image';

/**
 * Presentation only — icon, colour variant and grid span are not editable in the
 * CMS, so they are applied positionally to whatever metricCards Strapi returns.
 */
const METRIC_PRESETS: {
  icon: React.ElementType;
  variant: MetricVariant;
  span: string;
}[] = [
  { icon: TrendingUp, variant: 'primary', span: 'md:col-span-6 lg:col-span-5' },
  { icon: MapPin, variant: 'image', span: 'md:col-span-6 lg:col-span-3' },
  { icon: Users, variant: 'blue', span: 'md:col-span-12 lg:col-span-4' },
  { icon: Sun, variant: 'image', span: 'md:col-span-6 lg:col-span-4' },
  { icon: Briefcase, variant: 'light', span: 'md:col-span-6 lg:col-span-5' },
  { icon: Leaf, variant: 'dark', span: 'md:col-span-12 lg:col-span-3' },
];

const DEFAULT_METRIC_PRESET = {
  icon: TrendingUp,
  variant: 'dark' as MetricVariant,
  span: 'md:col-span-6 lg:col-span-4',
};

/** Icons for `solid` theory cards — keyed by the CMS cardId. */
const THEORY_ICONS: Record<string, React.ElementType> = {
  step2: TrendingUp,
  step4: Leaf,
};

type CapacityProps = {
  description?: string;
  ctaLabel?: string;
  statsCardEyebrow?: string;
  galleryCtaLabel?: string;
  knowledgeHubTitle?: string;
  knowledgeHubSubtitle?: string;
  stats?: StatItem[];
  gallerySlides?: GallerySlideItem[];
  reports?: ReportItem[];
};

const CapacityBuildingContent = ({
  description,
  ctaLabel,
  statsCardEyebrow,
  galleryCtaLabel,
  knowledgeHubTitle,
  knowledgeHubSubtitle,
  stats = [],
  gallerySlides = [],
  reports = [],
}: CapacityProps) => {
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    if (stats.length === 0) return;
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [stats.length]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);

  useEffect(() => {
    if (isGalleryPaused || gallerySlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallerySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isGalleryPaused, gallerySlides.length]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const activeStat = stats[currentStat] ?? stats[0];
  const activeSlide = gallerySlides[currentSlide] ?? gallerySlides[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-12">
        <div className="lg:w-1/3 pt-2">
          <p className="text-gray-500 mb-8 font-sans leading-relaxed text-sm lg:text-base">
            {description}
          </p>
          {ctaLabel && (
            <button className="group flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider text-sm border-b border-brand-primary/20 pb-1 hover:text-brand-dark hover:border-brand-dark transition-all interactive">
              {ctaLabel} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[400px]">
          <div className="bg-brand-dark rounded-[6px] p-8 flex flex-col justify-between text-white relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingUp size={120} />
            </div>

            <div className="z-10">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                <Users className="text-brand-accent" size={24} />
              </div>
              <h4 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">{statsCardEyebrow}</h4>
            </div>

            <div className="z-10 h-32 relative">
              <AnimatePresence mode="wait">
                {activeStat && (
                  <motion.div
                    key={currentStat}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-0"
                  >
                    <div className="text-6xl font-bold mb-2 tracking-tight">{activeStat.value}</div>
                    <div className="text-xl text-gray-400 font-light">{activeStat.label}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-2 mt-4 z-10">
              {stats.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-500 ${idx === currentStat ? "w-8 bg-brand-accent" : "w-2 bg-white/10"}`}
                />
              ))}
            </div>
          </div>

          <div
            className="bg-gray-900 rounded-[6px] relative overflow-hidden group cursor-pointer shadow-lg interactive flex flex-col"
            onMouseEnter={() => setIsGalleryPaused(true)}
            onMouseLeave={() => setIsGalleryPaused(false)}
          >
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeSlide?.image && (
                  <motion.img
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    src={activeSlide.image}
                    alt={activeSlide.image_alt_text ?? ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 border border-white/30 hover:bg-white hover:text-brand-dark transition-all">
                  <Play size={18} fill="currentColor" /> {galleryCtaLabel}
                </div>
              </div>
            </div>

            <div className="bg-brand-primary p-6 relative z-30 flex items-start gap-4 h-[120px]">
              <div className="mt-1 shrink-0">
                <Camera size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white text-sm font-sans leading-relaxed"
                  >
                    {activeSlide?.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F5F7] rounded-[6px] p-8 flex flex-col relative group overflow-hidden border border-gray-100 shadow-lg">
            <div className="mb-auto">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                <BookOpen className="text-brand-dark" size={24} />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark mb-2 font-sans">{knowledgeHubTitle}</h4>
              <p className="text-gray-500 text-sm font-sans">{knowledgeHubSubtitle}</p>
            </div>

            <div className="flex flex-col gap-3 mt-8 relative z-10">
              {reports.map((report, idx) => {
                const reportKey = report.reportId ?? String(report.id ?? idx);
                return (
                  <div
                    key={reportKey}
                    onMouseEnter={() => setActiveTag(reportKey)}
                    onMouseLeave={() => setActiveTag(null)}
                    className="relative group/item interactive"
                  >
                    <div className={`
                        px-4 py-3 rounded-[6px] border transition-all duration-300 cursor-pointer flex justify-between items-center
                        ${activeTag === reportKey ? 'bg-white border-brand-accent shadow-md translate-x-1' : 'bg-white border-transparent hover:border-gray-200'}
                     `}>
                      <span className={`text-sm font-medium transition-colors ${activeTag === reportKey ? 'text-brand-dark' : 'text-gray-500'}`}>
                        {report.tag}
                      </span>
                      {activeTag === reportKey && (
                        <motion.div layoutId="downloadIcon" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Download size={16} className="text-brand-accent" />
                        </motion.div>
                      )}
                    </div>

                    <AnimatePresence>
                      {activeTag === reportKey && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 py-2 text-xs text-gray-500 flex justify-between items-center bg-gray-50/50 rounded-b-[6px] mx-1">
                            <span className="truncate max-w-[70%] font-medium">{report.title}</span>
                            <span className="font-mono text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">{report.size}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ImpactVisualCard = ({
  icon: Icon,
  value,
  suffix,
  label,
  variant = 'dark',
  image = undefined,
  imageAlt = "",
  className = "",
  delay = 0
}: {
  icon: React.ElementType,
  value: number,
  suffix: string,
  label: string,
  variant?: MetricVariant,
  image?: string,
  imageAlt?: string,
  className?: string,
  delay?: number
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const styles = {
    dark: "bg-[#051F1A] text-white border-white/5",
    primary: "bg-[#71B551] text-white border-transparent",
    blue: "bg-[#D1E5F8] text-brand-dark border-transparent",
    light: "bg-[#E6F0EA] text-brand-dark border-transparent",
    image: "text-white border-white/10"
  };

  const isImage = variant === 'image';
  const isDark = variant === 'dark' || variant === 'image';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.3 }}
      className={`group relative rounded-[6px] overflow-hidden ${styles[variant]} ${className} flex flex-col justify-between p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent/5 interactive`}
    >
      {(isDark) && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
          }}
        />
      )}

      {isImage && image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-80" />
        </div>
      )}

      <div className="relative z-20 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-8">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${isDark
              ? "bg-white/10 text-brand-accent backdrop-blur-md border border-white/10 group-hover:bg-brand-accent group-hover:text-brand-dark"
              : "bg-white/40 text-current backdrop-blur-sm"
            }`}>
            <Icon size={28} />
          </div>
          {isDark && (
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
          )}
        </div>

        <div>
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className={`text-5xl lg:text-7xl font-bold tracking-tighter ${isDark ? "text-white" : "text-current"}`}>
              <CountUp to={value} />
            </span>
            <span className={`text-2xl font-medium ${isDark ? "text-brand-accent" : "opacity-60"}`}>{suffix}</span>
          </div>
          <div className={`mt-6 pt-6 border-t ${isDark ? "border-white/10 group-hover:border-brand-accent/50" : "border-black/5"} transition-colors`}>
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${isDark ? "text-gray-400 group-hover:text-white" : "opacity-70"}`}>
              {label}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function HowWeDriveImpact({
  eyebrow,
  headingPrimary,
  headingSecondary,
  numbersCtaLabel,
  reportCtaLabel,
  reportFileName,
  reportFileHref,
  capacityCtaLabel,
  statsCardEyebrow,
  galleryCtaLabel,
  knowledgeHubTitle,
  knowledgeHubSubtitle,
  theoryEyebrow,
  theoryHeadingPrimary,
  theoryHeadingSecondary,
  theoryFooterLabel,
  tabs = [],
  metricCards = [],
  capacityStats = [],
  gallerySlides = [],
  reports = [],
  theoryCards = [],
}: ImpactProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.tabId ?? 'numbers');

  const findTab = (tabId: string) => tabs.find(t => t.tabId === tabId);

  return (
    <section id="impact" className="py-24 bg-white relative z-20 min-h-screen">
      <div className="container mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div className="mb-6 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-px w-8 bg-brand-primary"></div>
              <span className="text-brand-primary text-xs font-normal tracking-[0.2em] uppercase font-sans">{eyebrow}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-brand-dark font-sans tracking-tight leading-tight"
            >
              {headingPrimary}<span className="text-[#7C9590]">{headingSecondary}</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-8 overflow-x-auto pb-2 md:pb-0 no-scrollbar"
          >
            {tabs.map(tab => (
              <button
                key={tab.tabId ?? tab.id}
                onClick={() => tab.tabId && setActiveTab(tab.tabId)}
                className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 whitespace-nowrap ${activeTab === tab.tabId
                    ? 'text-brand-dark font-medium'
                    : 'text-gray-400 hover:text-gray-600 font-normal'
                  }`}
              >
                {tab.label}
                {activeTab === tab.tabId && (
                  <motion.div
                    layoutId="activeTabLine"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent"
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'numbers' && (
            <motion.div
              key="numbers"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-12">
                <div className="lg:w-1/3 pt-2">
                  <p className="text-gray-500 mb-8 font-sans leading-relaxed text-sm lg:text-base">
                    {findTab('numbers')?.description}
                  </p>
                  {numbersCtaLabel && (
                    <button
                      onClick={() => setActiveTab('capacity')}
                      className="group flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider text-sm border-b border-brand-primary/20 pb-1 hover:text-brand-dark hover:border-brand-dark transition-all interactive"
                    >
                      {numbersCtaLabel} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>

                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 auto-rows-[360px]">
                    {metricCards.map((card, idx) => {
                      const preset = METRIC_PRESETS[idx] ?? DEFAULT_METRIC_PRESET;
                      return (
                        <div key={card.id ?? idx} className={preset.span}>
                          <ImpactVisualCard
                            className="h-full"
                            icon={preset.icon}
                            value={Number(card.value ?? 0)}
                            suffix={card.suffix ?? ''}
                            label={card.label ?? ''}
                            variant={preset.variant}
                            image={card.image ?? undefined}
                            imageAlt={card.image_alt_text ?? ''}
                            delay={0.1 * (idx + 1)}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {reportCtaLabel && (
                    <div className="flex justify-center mt-20">
                      <a
                        href={reportFileHref}
                        download={reportFileName}
                        className="flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-primary transition-all shadow-xl hover:shadow-brand-primary/20 group font-sans interactive"
                      >
                        <Download size={20} />
                        {reportCtaLabel}
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'capacity' && (
            <CapacityBuildingContent
              description={findTab('capacity')?.description}
              ctaLabel={capacityCtaLabel}
              statsCardEyebrow={statsCardEyebrow}
              galleryCtaLabel={galleryCtaLabel}
              knowledgeHubTitle={knowledgeHubTitle}
              knowledgeHubSubtitle={knowledgeHubSubtitle}
              stats={capacityStats}
              gallerySlides={gallerySlides}
              reports={reports}
            />
          )}

          {activeTab === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#F8F9FA] rounded-[6px] p-8 md:p-12 lg:p-16 text-brand-dark relative overflow-hidden shadow-sm border border-gray-100">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-brand-primary/5 blur-[100px] pointer-events-none rounded-full"></div>

                <div className="text-center mb-16 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4 font-sans">{theoryEyebrow}</h4>
                    <h2 className="text-4xl md:text-5xl font-medium font-sans leading-tight">{theoryHeadingPrimary}<br /><span className="text-brand-primary">{theoryHeadingSecondary}</span></h2>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {theoryCards.map((card: TheoryCardItem, idx) => {
                    const CardIcon = card.cardId ? THEORY_ICONS[card.cardId] : undefined;
                    return (
                      <motion.a
                        key={card.cardId ?? card.id ?? idx}
                        href={card.link}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className={`group relative rounded-[6px] overflow-hidden h-[420px] cursor-pointer interactive shadow-sm border border-gray-200 transition-transform duration-500 hover:-translate-y-2 hover:shadow-lg flex flex-col justify-between ${card.cardType === 'solid' ? 'bg-white p-6' : 'bg-gray-100'}`}
                      >
                        {card.cardType === 'image' && card.image && (
                          <>
                            <img
                              src={card.image}
                              alt={card.image_alt_text ?? ''}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          </>
                        )}

                        {card.cardType === 'solid' ? (
                          <div className="flex flex-col h-full items-center justify-between text-center z-10 py-2">
                            <div className="w-14 h-14 rounded-full bg-brand-light border border-brand-light flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                              {CardIcon && <CardIcon size={26} />}
                            </div>
                            <div className="my-auto">
                              <h3 className="text-lg font-bold leading-snug font-sans text-brand-dark mb-2">{card.title}</h3>
                              <p className="text-xs text-gray-500 leading-relaxed font-sans">{card.description}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-brand-primary transition-colors">
                              {card.linkLabel} <ArrowRight size={14} />
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-2 font-sans">{card.subtitle}</div>
                              <h3 className="text-lg font-bold leading-snug font-sans text-white mb-2">{card.title}</h3>
                              <p className="text-xs text-gray-200/90 leading-relaxed font-sans">{card.description}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-white/30 pb-1 w-fit group-hover:border-brand-accent group-hover:text-brand-accent transition-colors">
                              {card.linkLabel} <ArrowRight size={14} />
                            </div>
                          </div>
                        )}
                      </motion.a>
                    );
                  })}
                </div>

                {theoryFooterLabel && (
                  <div className="mt-16 flex justify-center relative z-10">
                    <button className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 px-8 py-3 rounded-full text-sm font-sans text-gray-600 hover:text-brand-primary transition-all interactive shadow-sm">
                      <Info size={16} className="text-brand-primary" />
                      {theoryFooterLabel}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
