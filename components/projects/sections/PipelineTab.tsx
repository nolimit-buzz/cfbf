"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, MapPin } from 'lucide-react';

import {
  parseSdgs,
  type PipelineTabSection,
  type ProjectItem,
} from '@/lib/strapi-projects-types';

type PipelineTabProps = Omit<PipelineTabSection, '__component'>;

/** UN SDG brand colours for the per-project chips, keyed by goal number. */
const SDG_COLOURS: Record<number, { color: string; textClass: string }> = {
  7: { color: '#FDB713', textClass: 'text-[#FDB713] border-[#FDB713]/25 bg-[#FDB713]/5' },
  8: { color: '#8F1838', textClass: 'text-[#FF4A6B] border-[#FF4A6B]/25 bg-[#FF4A6B]/5' },
  9: { color: '#F36D25', textClass: 'text-[#F36D25] border-[#F36D25]/25 bg-[#F36D25]/5' },
  13: { color: '#3F7E44', textClass: 'text-[#56C36A] border-[#56C36A]/25 bg-[#56C36A]/5' },
};

export default function PipelineTab({
  filterBannerPrefix,
  stateSuffix,
  clearFilterLabel,
  projectIdPrefix,
  challengeLabel,
  financialCloseLabel,
  privateCapitalLabel,
  sdgGoalsLabel,
  detailsLinkLabel,
  categories,
  projects,
  sdgDefinitions,
  stateProjects,
}: PipelineTabProps) {
  const allProjects = useMemo(() => projects ?? [], [projects]);
  // The first category is the "show everything" pseudo-filter.
  const allCategoryLabel = categories?.[0]?.label;

  const [filter, setFilter] = useState<string | undefined>(allCategoryLabel);
  const [expandedProject, setExpandedProject] = useState<string | null>(
    allProjects[0]?.projectId ?? null
  );
  /**
   * Region filtering is reachable only from a caller that selects a state.
   * Nothing wires that up today — the footprint map below is a separate,
   * self-contained widget — so this stays null in practice. Kept because the
   * banner and highlight styling below are built around it.
   */
  const [selectedState] = useState<string | null>(null);

  const projectsByState = useMemo(() => {
    const grouped = new Map<string, typeof stateProjects>();
    for (const entry of stateProjects ?? []) {
      if (!entry.stateMapId) continue;
      const bucket = grouped.get(entry.stateMapId);
      if (bucket) bucket.push(entry);
      else grouped.set(entry.stateMapId, [entry]);
    }
    return grouped;
  }, [stateProjects]);

  const selectedStateName = selectedState
    ? projectsByState.get(selectedState)?.[0]?.stateMapId
    : undefined;

  /** A project belongs to the selected state if that state lists its developer. */
  const isProjectInSelectedState = (project: ProjectItem) => {
    if (!selectedState) return true;
    const stateProjs = projectsByState.get(selectedState);
    if (!stateProjs || stateProjs.length === 0) return false;
    return stateProjs.some((sp) =>
      (project.title ?? '').toLowerCase().includes((sp.projectName ?? '').toLowerCase())
    );
  };

  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory = filter === allCategoryLabel ? true : p.category === filter;
    const matchesState = selectedState ? isProjectInSelectedState(p) : true;
    return matchesCategory && matchesState;
  });

  return (
    <motion.div
      key="pipeline-tab"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {selectedState && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-white/[0.02] border border-[#81C34D]/30 p-4 rounded-[6px] mb-4 text-xs md:text-sm font-sans"
        >
          <div className="flex items-center gap-2">
            <MapPin className="text-[#81C34D]" size={16} />
            <span>
              {filterBannerPrefix} <strong className="text-white">{selectedStateName} {stateSuffix}</strong>
            </span>
          </div>
          <button
            className="text-[10px] font-bold text-[#81C34D] uppercase tracking-wider hover:text-white transition-colors border-b border-[#81C34D] hover:border-white pb-0.5 focus:outline-none"
          >
            {clearFilterLabel}
          </button>
        </motion.div>
      )}

      {/* Category Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
      >
        {(categories ?? []).map((cat, idx) => (
          <button
            key={cat.label ?? idx}
            onClick={() => setFilter(cat.label)}
            className={`px-6 py-2 rounded-[6px] border text-xs tracking-wide transition-all duration-300 font-sans whitespace-nowrap focus:outline-none ${
              filter === cat.label
                ? 'bg-[#81C34D] text-[#051F1A] border-[#81C34D] font-semibold'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-brand-accent hover:text-white font-light'
            }`}
          >
            {(cat.label ?? '').toUpperCase()}
          </button>
        ))}
      </motion.div>

      {/* Interactive Accordion List */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        {filteredProjects.map((p, idx) => {
          const isHighlighted = selectedState && isProjectInSelectedState(p);
          const isExpanded = expandedProject === p.projectId;
          return (
            <div
              key={p.projectId ?? idx}
              className={`bg-white/[0.02] backdrop-blur-md rounded-[6px] border transition-all duration-300 overflow-hidden shadow-lg ${
                isHighlighted
                  ? 'border-[#81C34D]/40 shadow-[0_0_15px_rgba(113,181,81,0.15)] ring-1 ring-[#81C34D]/30'
                  : isExpanded
                    ? 'ring-1 ring-brand-accent/20 shadow-xl border-brand-accent/20'
                    : 'border-white/10 hover:border-brand-accent/30'
              }`}
            >

              {/* Header Row */}
              <div
                onClick={() => setExpandedProject(isExpanded ? null : p.projectId ?? null)}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 cursor-pointer interactive group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-xs text-brand-accent font-mono bg-brand-accent/10 px-2.5 py-1 rounded-[6px]">{projectIdPrefix} {p.projectId}</span>
                  <h3 className={`text-lg md:text-xl font-bold transition-colors ${isExpanded ? 'text-brand-accent' : 'text-white group-hover:text-brand-accent'}`}>
                    {p.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 mt-4 md:mt-0 font-sans text-xs uppercase tracking-wider text-gray-400">
                  <span>{p.location}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{p.capacity}</span>
                  <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#81C34D] group-hover:text-[#051F1A] transition-colors duration-300`}>
                    {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>
              </div>

              {/* Expandable Section Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="border-t border-white/5 bg-[#02100d]/30"
                  >
                    <div className="p-6 md:p-8">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <img src={p.image} alt={p.image_alt_text ?? p.title} className="w-full h-56 object-cover rounded-[6px] border border-white/10 shadow-md" />
                        </div>
                        <div className="flex flex-col justify-center space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-[#81C34D] uppercase tracking-widest mb-1.5">{challengeLabel}</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{p.problem}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 bg-white/[0.02] p-4 rounded-[6px] border border-white/5 shadow-md text-xs">
                            <div>
                              <span className="font-semibold text-gray-500 block mb-1">{financialCloseLabel}</span>
                              <span className="text-white font-bold font-mono">{p.year}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-500 block mb-1">{privateCapitalLabel}</span>
                              <span className="text-brand-accent font-bold font-mono">{p.capital}</span>
                            </div>
                          </div>

                          {/* Aligned SDG Goals */}
                          <div>
                            <span className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wider">{sdgGoalsLabel}</span>
                            <div className="flex flex-wrap gap-2">
                              {parseSdgs(p.sdgs).map(sdgNum => {
                                const style = SDG_COLOURS[sdgNum];
                                if (!style) return null;
                                return (
                                  <div
                                    key={sdgNum}
                                    title={sdgDefinitions?.find(d => d.number === String(sdgNum))?.name}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border text-[10px] font-bold uppercase tracking-wider ${style.textClass}`}
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.color }} />
                                    SDG {sdgNum}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <Link
                            href={`/projects/${p.projectId}`}
                            className="self-start flex items-center gap-1.5 text-xs font-bold text-brand-accent border-b border-brand-accent pb-0.5 hover:text-white hover:border-white transition-colors interactive font-sans uppercase tracking-wider mt-2"
                          >
                            {detailsLinkLabel} <ArrowUpRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
