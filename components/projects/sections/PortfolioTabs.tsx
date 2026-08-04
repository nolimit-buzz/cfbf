"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, LayoutGrid, MapPin } from 'lucide-react';

import type {
  AnalysisTabSection,
  PipelineTabSection,
  PortfolioTabsSection,
} from '@/lib/strapi-projects-types';
import AnalysisTab from './AnalysisTab';
import PipelineTab from './PipelineTab';

/**
 * Owns the tab state, so the two tab bodies are rendered from here rather than
 * as siblings in the dynamiczone. The analysis tab also needs the project list,
 * which is authored on the pipeline tab section — this component is where the
 * two meet.
 */
type PortfolioTabsProps = Omit<PortfolioTabsSection, '__component'> & {
  analysis?: Omit<AnalysisTabSection, '__component'>;
  pipeline?: Omit<PipelineTabSection, '__component'>;
};

export default function PortfolioTabs({
  eyebrow,
  headingPartOne,
  headingHighlight,
  body,
  tabs,
  analysis,
  pipeline,
}: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState<'analysis' | 'pipeline'>('pipeline');
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  // Three authored tabs: pipeline, analysis, and a third that is a scroll
  // shortcut to the footprint map rather than a panel of its own.
  const pipelineLabel = tabs?.[0]?.label;
  const analysisLabel = tabs?.[1]?.label;
  const footprintLabel = tabs?.[2]?.label;

  return (
    <div
      ref={projectsSectionRef}
      data-rag-chunk="projects-portfolio-container"
      className="container mx-auto px-6 pt-20 pb-0 relative z-10 text-left"
    >
      {/* Page Section Title & Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-accent"></div>
            <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-sans">{eyebrow}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight tracking-tight">
            {headingPartOne}<span className="text-[#9BB7B1]">{headingHighlight}</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mt-3 max-w-xl font-sans font-light">
            {body}
          </p>
        </div>

        {/* Page Tabs */}
        <div className="flex gap-8 mt-6 md:mt-0 border-b border-white/10 md:border-b-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none ${
              activeTab === 'pipeline' ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
            }`}
          >
            <LayoutGrid size={16} />
            {pipelineLabel}
            {activeTab === 'pipeline' && (
              <motion.div layoutId="projectsPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none ${
              activeTab === 'analysis' ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
            }`}
          >
            <BarChart3 size={16} />
            {analysisLabel}
            {activeTab === 'analysis' && (
              <motion.div layoutId="projectsPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
            )}
          </button>
          <button
            onClick={() => {
              document.getElementById('national-footprint')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none text-gray-400 hover:text-gray-300 font-normal whitespace-nowrap"
          >
            <MapPin size={16} />
            {footprintLabel}
          </button>
        </div>
      </motion.div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'analysis' ? (
          <AnalysisTab {...analysis} projects={pipeline?.projects ?? []} />
        ) : (
          <PipelineTab {...pipeline} />
        )}
      </AnimatePresence>
    </div>
  );
}
