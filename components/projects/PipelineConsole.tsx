"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Leaf, Users, MapPin, Landmark, Wifi, Check } from 'lucide-react';
import {
  parseSdgs,
  type PipelineConsoleSection,
  type PipelineStageMetrics,
} from '@/lib/strapi-projects-types';

type PipelineConsoleProps = Omit<PipelineConsoleSection, '__component'>;

/**
 * SDG brand colours, keyed by goal number. These are UN brand tokens, not copy,
 * so they stay in code — the CMS supplies each goal's number, name and image.
 */
const SDG_STYLES: Record<number, { color: string; borderClass: string; colorHex: string }> = {
  7: { color: 'bg-[#FDB713]', borderClass: 'border-[#FDB713]/15 hover:border-[#FDB713]/35', colorHex: '#FDB713' },
  8: { color: 'bg-[#8F1838]', borderClass: 'border-[#8F1838]/15 hover:border-[#8F1838]/35', colorHex: '#8F1838' },
  9: { color: 'bg-[#F36D25]', borderClass: 'border-[#F36D25]/15 hover:border-[#F36D25]/35', colorHex: '#F36D25' },
  11: { color: 'bg-[#FD9D24]', borderClass: 'border-[#FD9D24]/15 hover:border-[#FD9D24]/35', colorHex: '#FD9D24' },
  13: { color: 'bg-[#3F7E44]', borderClass: 'border-[#3F7E44]/15 hover:border-[#3F7E44]/35', colorHex: '#3F7E44' },
  17: { color: 'bg-[#19486A]', borderClass: 'border-[#19486A]/15 hover:border-[#19486A]/35', colorHex: '#19486A' },
};

/**
 * Metric card chrome, in the fixed order the six `metricLabels` are authored in:
 * connections, capacity, communities, jobs, GHG, capital.
 */
const METRIC_CHROME = [
  { icon: <Wifi className="w-5 h-5" />, iconColor: '#81C34D' },
  { icon: <Zap className="w-5 h-5" />, iconColor: '#FDB713' },
  { icon: <MapPin className="w-5 h-5" />, iconColor: '#009FD4' },
  { icon: <Users className="w-5 h-5" />, iconColor: '#FF4A6B' },
  { icon: <Leaf className="w-5 h-5" />, iconColor: '#56C36A' },
  { icon: <Landmark className="w-5 h-5" />, iconColor: '#F36D25' },
];


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export default function PipelineConsole({
  eyebrow,
  headingPartOne,
  headingHighlight,
  body,
  selectStageLabel,
  usdUnitLabel,
  sdgFrameworksLabel,
  toggleTotalLabel,
  toggleMandatedLabel,
  metricsHeader,
  businessModelsHeader,
  metricsSubcopy,
  businessModelsSubcopy,
  tableHeadSector,
  tableHeadProjects,
  tableHeadPipelineNgn,
  tableHeadMandatedNgn,
  tableHeadDealSize,
  footerLabel,
  footerProjects,
  footerTotalPipeline,
  footerTotalMandated,
  footerPercent,
  businessModelsMandatedUsd,
  businessModelsMandatedNgn,
  leftBackgroundImage,
  leftBackgroundImage_alt_text,
  rightBackgroundImage,
  rightBackgroundImage_alt_text,
  metricLabels,
  stages,
  sdgFrameworks,
  totalPipelineRows,
  mandatedDealRows,
}: PipelineConsoleProps) {
  const allStages = stages ?? [];
  // The console opens on the second stage (Project Pipeline) because it is the
  // headline figure; Business Models is a table, not metrics.
  const [activeStageId, setActiveStageId] = useState<string>(
    allStages[1]?.stageId ?? allStages[0]?.stageId ?? ''
  );
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [businessModelView, setBusinessModelView] = useState<'total-pipeline' | 'mandated-deals'>('total-pipeline');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeStage =
    allStages.find((s) => s.stageId === activeStageId) ?? allStages[1] ?? allStages[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Nothing to render without stages — and the markup below dereferences
  // activeStage unconditionally.
  if (!activeStage) return null;

  const isBusinessModels = activeStage.stageId === 'business-models';

  // The Business Models stage is the only one whose headline figures follow the
  // total/mandated toggle rather than the stage's own values.
  const getStageValues = () => {
    if (isBusinessModels) {
      if (businessModelView === 'total-pipeline') {
        return { usd: activeStage.usdVal, ngn: activeStage.ngnVal };
      }
      return { usd: businessModelsMandatedUsd, ngn: businessModelsMandatedNgn };
    }
    return { usd: activeStage.usdVal, ngn: activeStage.ngnVal };
  };

  const currentValues = getStageValues();

  /**
   * Six cards in a fixed order, matched positionally against `metricLabels`.
   * A stage may override the connections/communities labels; those two fields
   * are seeded as "" where the default applies, so test with `||`, not `??`.
   */
  const metricCards = (metrics: PipelineStageMetrics) => [
    { label: metrics.connectionsLabel || metricLabels?.[0]?.label, value: metrics.connections, unit: metricLabels?.[0]?.unit, description: metricLabels?.[0]?.description },
    { label: metricLabels?.[1]?.label, value: metrics.capacity, unit: metricLabels?.[1]?.unit, description: metricLabels?.[1]?.description },
    { label: metrics.communitiesLabel || metricLabels?.[2]?.label, value: metrics.communities, unit: metricLabels?.[2]?.unit, description: metricLabels?.[2]?.description },
    { label: metricLabels?.[3]?.label, value: metrics.jobs, unit: metricLabels?.[3]?.unit, description: metricLabels?.[3]?.description },
    { label: metricLabels?.[4]?.label, value: metrics.ghg, unit: metricLabels?.[4]?.unit, description: metricLabels?.[4]?.description },
    // The capital card's unit is the stage's own USD equivalent, not a label.
    { label: metricLabels?.[5]?.label, value: metrics.capital, unit: metrics.capitalSub, description: metricLabels?.[5]?.description },
  ].map((card, i) => ({ ...card, ...METRIC_CHROME[i] }));

  return (
    <section className="relative z-10 w-full mt-24 pt-20" id="facility-pipeline">
      {/* Title & description wrapper to align with the standard page layout */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-brand-accent"></div>
          <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-mono">{eyebrow}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight tracking-tight mb-4 text-left">
          {headingPartOne}<span className="text-[#9BB7B1]">{headingHighlight}</span>
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl font-light font-sans text-left">
          {body}
        </p>
      </div>

      {/* Main Console Box - Full Width Section Wrapper */}
      <div className="w-full relative border-y border-white/10 bg-[#02100d] overflow-hidden">
        
        {/* Split container for content alignment */}
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 relative text-left">
            
            {/* Left Column (Dropdown, Title, SDG Grid) */}
            <div className="lg:col-span-5 py-8 md:py-10 pl-0 pr-0 lg:pr-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 text-left relative z-20">
              
              {/* Background Layer with light-blue logo overlay, bleeding to the left screen edge on desktop */}
              <div className="absolute inset-y-0 left-0 w-full lg:left-auto lg:right-0 lg:w-[100vw] z-0 pointer-events-none select-none overflow-hidden">
                <img
                  src={leftBackgroundImage}
                  alt={leftBackgroundImage_alt_text ?? ''}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-[#009FD4]/80" />
              </div>

              {/* Content wrapper */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                {/* Top Row: Dropdown selector (Height matched with top right row) */}
                <div className="h-[84px] flex flex-col justify-end relative" ref={dropdownRef}>
                  <span className="text-[9px] font-bold tracking-[0.25em] text-[#81C34D] uppercase font-mono block mb-2">
                    {selectStageLabel}
                  </span>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between bg-[#051F1A]/90 hover:bg-[#051F1A]/80 border border-white/10 text-white rounded-[6px] px-4 py-3 text-sm font-semibold tracking-wide transition-all focus:outline-none interactive select-none"
                  >
                    <span>{activeStage.label}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-[#051F1A] border border-white/15 rounded-[6px] overflow-hidden shadow-2xl z-50 divide-y divide-white/5"
                      >
                        {allStages.map((stage, idx) => (
                          <button
                            key={stage.stageId ?? idx}
                            onClick={() => {
                              setActiveStageId(stage.stageId ?? '');
                              setDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-xs md:text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-between"
                          >
                            <span className={activeStageId === stage.stageId ? 'text-[#81C34D] font-semibold' : ''}>
                              {stage.label}
                            </span>
                            {activeStageId === stage.stageId && <Check className="w-4 h-4 text-[#81C34D]" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Middle Row: Stage Title & stats (Height matched with top right expected metrics title) */}
                <div className="mt-8 mb-8 flex-grow">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase font-mono block mb-1">
                    {activeStage.title}
                  </span>
                  
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl md:text-5xl font-light text-white tracking-tight leading-none font-sans font-bold">
                      {currentValues.usd}
                    </span>
                    <span className="text-xl text-white font-light ml-1">{usdUnitLabel}</span>
                  </div>
                  <div className="text-[#81C34D] text-xs font-mono font-bold tracking-wider mt-2.5 uppercase">
                    {currentValues.ngn}
                  </div>

                  <p className="text-gray-300 text-xs md:text-sm font-sans font-light mt-5 leading-relaxed">
                    {activeStage.desc}
                  </p>
                </div>

                {/* Bottom Row: SDG Aligned Grid (Enlarged SDG boxes & font sizes) */}
                <div className="border-t border-white/10 pt-6">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#81C34D] uppercase font-mono block mb-4">
                    {sdgFrameworksLabel}
                  </span>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {parseSdgs(activeStage.sdgs).map((sdgNum) => {
                      const style = SDG_STYLES[sdgNum];
                      const framework = sdgFrameworks?.find((f) => f.number === String(sdgNum));
                      if (!style || !framework) return null;
                      return (
                        <motion.div
                          key={sdgNum}
                          variants={cardVariants}
                          className={`relative rounded-[6px] overflow-hidden p-4 flex flex-col justify-between text-left min-h-[135px] group border transition-all duration-300 ${style.borderClass}`}
                          title={`SDG ${sdgNum}: ${framework.name}`}
                        >
                          <img
                            src={framework.image}
                            alt={framework.image_alt_text ?? framework.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none select-none"
                          />
                          <div className="absolute inset-0 bg-[#02100d]/92 group-hover:bg-[#02100d]/85 transition-colors duration-300 pointer-events-none" />
                          
                          <div className="relative z-10 flex justify-between items-start">
                            <span className="text-base font-light font-mono text-white/30 leading-none">
                              {sdgNum < 10 ? `0${sdgNum}` : sdgNum}
                            </span>
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: style.colorHex }} />
                          </div>

                          <div className="relative z-10 mt-auto">
                            <span className={`inline-block text-[10px] font-bold text-white font-mono ${style.color} px-2 py-0.5 rounded-full mb-2 leading-none`}>
                              SDG {sdgNum}
                            </span>
                            <h4 className="font-bold text-xs md:text-sm text-white font-sans leading-tight line-clamp-2">{framework.name}</h4>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Column (Metrics Grid or Data Table) */}
            <div className="lg:col-span-7 py-8 md:py-10 pl-0 lg:pl-10 pr-0 flex flex-col justify-between text-left relative z-20">
              
              {/* Background Layer with deep blue hero overlay, bleeding to the right screen edge on desktop */}
              <div className="absolute inset-y-0 left-0 w-full lg:w-[100vw] z-0 pointer-events-none select-none overflow-hidden">
                <img
                  src={rightBackgroundImage}
                  alt={rightBackgroundImage_alt_text ?? ''}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#00314b]/75" />
              </div>

              {/* Content wrapper */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                {/* Top Row: Spacing or Business Model toggle selector (Height matched with top left dropdown) */}
                <div className="h-[84px] flex flex-col justify-end items-end">
                  {isBusinessModels && (
                    <div className="flex rounded-full p-0.5 bg-white/5 border border-white/10 shrink-0 mb-[5px]">
                      <button
                        onClick={() => setBusinessModelView('total-pipeline')}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          businessModelView === 'total-pipeline'
                            ? 'bg-[#81C34D] text-[#02100d]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {toggleTotalLabel}
                      </button>
                      <button
                        onClick={() => setBusinessModelView('mandated-deals')}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          businessModelView === 'mandated-deals'
                            ? 'bg-[#81C34D] text-[#02100d]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {toggleMandatedLabel}
                      </button>
                    </div>
                  )}
                </div>

                {/* Middle Row: Content header aligned horizontally with left stage titles */}
                <div className="mt-8 mb-8 flex-grow">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-[#81C34D] block m-0 mt-0">
                    {activeStage.metrics ? metricsHeader : businessModelsHeader}
                  </h3>
                  <p className="text-gray-300 text-base font-sans font-light mt-4 leading-relaxed max-w-xl">
                    {activeStage.metrics ? metricsSubcopy : businessModelsSubcopy}
                  </p>
                </div>

                {/* Bottom Row: Metrics Grid or Data Table (with top border to align with Left Column SDG bottom row) */}
                <div className="border-t border-white/10 pt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={(activeStage.stageId ?? '') + (isBusinessModels ? businessModelView : '')}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {activeStage.metrics ? (
                        /* EXPECTED IMPACT METRICS GRID */
                        <motion.div 
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, margin: "-40px" }}
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                          {metricCards(activeStage.metrics).map((card, i) => {
                            const cleanValue = card.value;
                            const displaysUnit = card.unit || "";

                            return (
                              <motion.div
                                key={i}
                                variants={cardVariants}
                                whileHover={{ y: -4, scale: 1.01 }}
                                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 backdrop-blur-md rounded-[6px] p-5.5 min-h-[240px] flex flex-col justify-between transition-all duration-300 group cursor-default relative shadow-lg will-change-transform"
                              >
                                <div className="flex justify-between items-start gap-4">
                                  <span className="text-gray-300 text-[11px] font-bold uppercase tracking-[0.2em] font-mono block min-h-[2.2rem] line-clamp-2">
                                    {card.label}
                                  </span>
                                  <div style={{ color: card.iconColor }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 [&>svg]:w-4 [&>svg]:h-4">
                                    {card.icon}
                                  </div>
                                </div>

                                <div className="my-3 flex items-baseline flex-wrap">
                                  <span className="text-3xl md:text-4xl font-light text-white font-sans tracking-tight">
                                    {cleanValue}
                                  </span>
                                  {displaysUnit && (
                                    <span className="text-xs text-gray-400 ml-1.5 font-light font-sans">{displaysUnit}</span>
                                  )}
                                </div>

                                <p className="text-gray-300 text-xs leading-relaxed font-sans font-light mt-auto">
                                  {card.description}
                                </p>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      ) : (
                        /* BUSINESS MODELS DATA TABLE VIEW */
                        <div className="w-full">
                          {/* Sector Table */}
                          <div className="overflow-hidden border border-white/10 rounded-[8px] bg-[#02100d]/90">
                            <div className="max-h-[460px] overflow-y-auto overflow-x-auto no-scrollbar">
                              <table className="w-full text-left border-collapse text-xs md:text-sm">
                                <thead>
                                  <tr className="border-b border-white/10 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                                    <th className="py-4 px-6 sticky top-0 bg-[#02100d] z-30">{tableHeadSector}</th>
                                    <th className="py-4 px-6 text-center sticky top-0 bg-[#02100d] z-30">{tableHeadProjects}</th>
                                    <th className="py-4 px-6 text-right sticky top-0 bg-[#02100d] z-30">
                                      {businessModelView === 'total-pipeline' ? tableHeadPipelineNgn : tableHeadMandatedNgn}
                                    </th>
                                    <th className="py-4 px-6 text-right sticky top-0 bg-[#02100d] z-30">{tableHeadDealSize}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-300 font-sans">
                                  {((businessModelView === 'total-pipeline' ? totalPipelineRows : mandatedDealRows) ?? []).map((row, index) => (
                                    <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                                      <td className="py-3.5 px-6 font-medium text-white">{row.sector}</td>
                                      <td className="py-3.5 px-6 text-center font-mono">{row.projectsCount}</td>
                                      <td className="py-3.5 px-6 text-right font-mono text-[#81C34D] font-semibold">{(row.valueNgn ?? 0).toFixed(2)}</td>
                                      <td className="py-3.5 px-6 text-right font-mono text-gray-400">{row.percentage}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="border-t border-white/10 bg-[#02100d] text-[10px] font-mono font-bold text-white uppercase tracking-wider sticky bottom-0 z-20">
                                  <tr>
                                    <td className="py-3 px-5">{footerLabel}</td>
                                    <td className="py-3 px-5 text-center">{footerProjects}</td>
                                    <td className="py-3 px-5 text-right text-[#81C34D]">
                                      {businessModelView === 'total-pipeline' ? footerTotalPipeline : footerTotalMandated}
                                    </td>
                                    <td className="py-3 px-5 text-right">{footerPercent}</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
