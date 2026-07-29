"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Search, X } from 'lucide-react';
// @ts-ignore
import nigeriaMapData from '@svg-maps/nigeria';

import {
  ALL_STATES,
  STATE_LGAS,
  LGA_PROJECTS,
  PROJECT_TYPE_LEGEND,
  StateInfo,
  LGAProjectEntry,
  getProjectTypeColor,
  getStateByMapId,
  getLGAsForState,
} from '@/lib/mapData';
import LGAModal from './LGAModal';

interface NigeriaStateLocation {
  id: string;
  name: string;
  path: string;
}

// State centroid map (approx. centre points in the 744×600 SVG viewBox)
// Used for the state name tooltip on the map
const STATE_CENTROIDS: Record<string, { x: number; y: number }> = {
  abia:          { x: 430, y: 500 },
  adamawa:       { x: 570, y: 270 },
  'akwa-ibom':   { x: 400, y: 540 },
  anambra:       { x: 380, y: 480 },
  bauchi:        { x: 480, y: 195 },
  bayelsa:       { x: 310, y: 545 },
  benue:         { x: 455, y: 380 },
  borno:         { x: 600, y: 145 },
  'cross-river': { x: 490, y: 480 },
  delta:         { x: 295, y: 495 },
  ebonyi:        { x: 470, y: 455 },
  edo:           { x: 280, y: 460 },
  ekiti:         { x: 225, y: 425 },
  enugu:         { x: 435, y: 440 },
  fct:           { x: 345, y: 315 },
  gombe:         { x: 535, y: 210 },
  imo:           { x: 390, y: 505 },
  jigawa:        { x: 470, y: 120 },
  kaduna:        { x: 345, y: 195 },
  kano:          { x: 400, y: 120 },
  katsina:       { x: 360, y: 70 },
  kebbi:         { x: 200, y: 115 },
  kogi:          { x: 350, y: 390 },
  kwara:         { x: 265, y: 350 },
  lagos:         { x: 148, y: 500 },
  nasarawa:      { x: 390, y: 320 },
  niger:         { x: 255, y: 265 },
  ogun:          { x: 172, y: 470 },
  ondo:          { x: 210, y: 455 },
  osun:          { x: 210, y: 415 },
  oyo:           { x: 185, y: 380 },
  plateau:       { x: 450, y: 290 },
  rivers:        { x: 340, y: 530 },
  sokoto:        { x: 215, y: 65 },
  taraba:        { x: 570, y: 345 },
  yobe:          { x: 560, y: 145 },
  zamfara:       { x: 270, y: 105 },
};

export default function FootprintMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedLGA, setSelectedLGA] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');

  const selectedStateInfo = useMemo(
    () => (selectedState ? getStateByMapId(selectedState) : null),
    [selectedState]
  );

  const currentLGAs = useMemo(
    () => (selectedState ? getLGAsForState(selectedState) : []),
    [selectedState]
  );

  const modalProjects: LGAProjectEntry[] = useMemo(
    () => (selectedLGA ? LGA_PROJECTS[selectedLGA] ?? [] : []),
    [selectedLGA]
  );

  const filteredStates = useMemo(() => {
    const q = stateSearch.toLowerCase().trim();
    if (!q) return ALL_STATES;
    return ALL_STATES.filter(s => s.name.toLowerCase().includes(q));
  }, [stateSearch]);

  const handleStateSelect = useCallback((mapId: string) => {
    setSelectedState(prev => (prev === mapId ? null : mapId));
    setSelectedLGA(null);
  }, []);

  const handleLGAClick = useCallback((lga: string) => {
    setSelectedLGA(lga);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const getPathStyle = (loc: NigeriaStateLocation) => {
    const isSelected = selectedState === loc.id;
    const isHovered = hoveredState === loc.id;
    const stateInfo = getStateByMapId(loc.id);
    const hasProjects = stateInfo?.hasProjects ?? false;

    if (isSelected) {
      return { fill: '#81C34D', stroke: '#4a9a2a', strokeWidth: 1.5 };
    }
    if (isHovered && hasProjects) {
      return { fill: 'rgba(129, 195, 77, 0.55)', stroke: '#81C34D', strokeWidth: 1.2 };
    }
    if (isHovered && !hasProjects) {
      return { fill: 'rgba(255,255,255,0.06)', stroke: 'rgba(255,255,255,0.25)', strokeWidth: 1 };
    }
    if (hasProjects && stateInfo?.projectType) {
      return {
        fill: getProjectTypeColor(stateInfo.projectType),
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 0.8,
      };
    }
    return { fill: 'rgba(255,255,255,0.03)', stroke: 'rgba(255,255,255,0.10)', strokeWidth: 0.7 };
  };

  const totalStates = ALL_STATES.filter(s => s.hasProjects && s.mapId !== 'fct').length;
  const totalCommunities = Object.values(LGA_PROJECTS).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <>
      {/* Section Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        {/* Left: label + title + description */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#81C34D]" />
            <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-mono">National Footprint</span>
          </div>
          <h2 className="text-3xl font-bold font-sans tracking-tight mb-3">
            Geographical <span className="text-[#9BB7B1]">Distribution</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg font-sans font-light">
            Off-grid renewable energy and rural telephony projects located across the
            six geo-political zones in Nigeria, approved for co-financing by the Facility.
          </p>
        </div>
        {/* Right: stats */}
        <div className="flex gap-8 sm:flex-col sm:items-end sm:gap-4 shrink-0">
          <div className="sm:text-right">
            <span className="text-4xl font-extrabold text-[#81C34D] font-sans">{totalStates}</span>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-mono mt-0.5">States</p>
          </div>
          <div className="sm:text-right">
            <span className="text-4xl font-extrabold text-[#81C34D] font-sans">{totalCommunities}+</span>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-mono mt-0.5">Communities</p>
          </div>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[10px] border border-white/10 overflow-hidden shadow-2xl bg-white/[0.01] backdrop-blur-md min-h-[520px]">

        {/* ── Column 1: States List ── */}
        <div className="lg:col-span-3 border-r border-white/8 flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/8 bg-white/[0.02] flex-shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 font-mono mb-2">States</h3>
            {/* Search */}
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
              <input
                type="text"
                value={stateSearch}
                onChange={e => setStateSearch(e.target.value)}
                placeholder="Search states…"
                className="w-full bg-white/[0.03] border border-white/8 rounded-[6px] pl-7 pr-3 py-1.5 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#81C34D]/40 font-sans transition-colors"
              />
              {stateSearch && (
                <button onClick={() => setStateSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
                  <X size={11} />
                </button>
              )}
            </div>
          </div>

          {/* State rows */}
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: 440 }}>
            <ul className="divide-y divide-white/[0.04]">
              {filteredStates.map(state => {
                const isActive = selectedState === state.mapId;
                const hasProj = state.hasProjects;
                return (
                  <li key={state.mapId}>
                    <button
                      onClick={() => hasProj && handleStateSelect(state.mapId)}
                      disabled={!hasProj}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between group transition-all duration-200 focus:outline-none ${
                        isActive
                          ? 'bg-[#81C34D]/10 border-l-2 border-[#81C34D]'
                          : hasProj
                          ? 'hover:bg-white/[0.03] border-l-2 border-transparent hover:border-[#81C34D]/30 cursor-pointer'
                          : 'opacity-35 cursor-default border-l-2 border-transparent'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span
                        className={`text-sm font-sans transition-colors ${
                          isActive
                            ? 'text-[#81C34D] font-semibold'
                            : hasProj
                            ? 'text-gray-300 group-hover:text-white'
                            : 'text-gray-600'
                        }`}
                      >
                        {state.name}
                      </span>
                      {isActive && <ChevronRight size={12} className="text-[#81C34D] flex-shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Column 2: Nigeria SVG Map ── */}
        <div className="lg:col-span-6 border-r border-white/8 flex flex-col relative">
          {/* Map label */}
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono">
              Interactive Map
            </span>
          </div>

          {/* Hint */}
          {!selectedState && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-700 font-mono hidden md:block">
                Click a state
              </span>
            </div>
          )}

          <div className="flex-1 flex items-center justify-center p-6 pt-10 relative">
            <div className="relative w-full">
              <svg
                viewBox={nigeriaMapData.viewBox}
                className="w-full max-h-[420px] select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {(nigeriaMapData.locations as NigeriaStateLocation[]).map(loc => {
                  const style = getPathStyle(loc);
                  const stateInfo = getStateByMapId(loc.id);
                  const hasProjects = stateInfo?.hasProjects ?? false;

                  return (
                    <path
                      key={loc.id}
                      d={loc.path}
                      id={`map-state-${loc.id}`}
                      role={hasProjects ? 'button' : undefined}
                      tabIndex={hasProjects ? 0 : undefined}
                      aria-label={hasProjects ? `${loc.name} State — click to explore` : loc.name}
                      aria-pressed={selectedState === loc.id}
                      className={`transition-all duration-200 ${hasProjects ? 'cursor-pointer focus:outline-none' : 'cursor-default'}`}
                      style={style}
                      onMouseEnter={() => setHoveredState(loc.id)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => hasProjects && handleStateSelect(loc.id)}
                      onKeyDown={e => {
                        if ((e.key === 'Enter' || e.key === ' ') && hasProjects) {
                          e.preventDefault();
                          handleStateSelect(loc.id);
                        }
                      }}
                    />
                  );
                })}

                {/* State name tooltip — shows on hover or selected */}
                {(hoveredState || selectedState) && (() => {
                  const targetId = hoveredState ?? selectedState!;
                  const centroid = STATE_CENTROIDS[targetId];
                  const stateName = (nigeriaMapData.locations as NigeriaStateLocation[]).find(
                    l => l.id === targetId
                  )?.name ?? targetId;
                  if (!centroid) return null;
                  return (
                    <g key={`tooltip-${targetId}`} className="pointer-events-none">
                      {/* Speech bubble background */}
                      <rect
                        x={centroid.x - 32}
                        y={centroid.y - 22}
                        width={64}
                        height={18}
                        rx={9}
                        ry={9}
                        fill="white"
                        opacity={0.92}
                      />
                      {/* Bubble tail */}
                      <polygon
                        points={`${centroid.x - 5},${centroid.y - 5} ${centroid.x + 5},${centroid.y - 5} ${centroid.x},${centroid.y + 2}`}
                        fill="white"
                        opacity={0.92}
                      />
                      <text
                        x={centroid.x}
                        y={centroid.y - 8}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="7"
                        fontWeight="700"
                        fill="#051F1A"
                        fontFamily="sans-serif"
                        letterSpacing="0.3"
                      >
                        {stateName}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-3">
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {PROJECT_TYPE_LEGEND.map(item => (
                <div key={item.type} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-[3px] flex-shrink-0"
                    style={{ backgroundColor: item.color, opacity: 0.85 }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Column 3: LGA Panel ── */}
        <div className="lg:col-span-3 flex flex-col relative min-h-[280px] lg:min-h-0">
          <AnimatePresence mode="wait">
            {selectedState && selectedStateInfo ? (
              <motion.div
                key={selectedState}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full"
              >
                {/* LGA Column Header */}
                <div className="px-4 py-3 border-b border-white/8 bg-white/[0.02] flex-shrink-0">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 font-mono">
                    {selectedStateInfo.name} State (LGA's)
                  </p>
                </div>

                {/* LGA List */}
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: 440 }}>
                  {currentLGAs.length > 0 ? (
                    <ul className="divide-y divide-white/[0.04]">
                      {currentLGAs.map((lga, idx) => {
                        const hasData = Boolean(LGA_PROJECTS[lga] && LGA_PROJECTS[lga].length > 0);
                        return (
                          <li key={idx}>
                            <button
                              onClick={() => handleLGAClick(lga)}
                              className={`w-full text-left px-4 py-3 flex items-center justify-between group transition-all duration-200 focus:outline-none cursor-pointer ${
                                idx % 2 === 0
                                  ? 'bg-white/[0.015]'
                                  : 'bg-transparent'
                              } hover:bg-[#81C34D]/10`}
                            >
                              <span className="text-sm text-gray-300 group-hover:text-white font-sans transition-colors">
                                {lga}
                              </span>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                {hasData && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#81C34D]" />
                                )}
                                <ChevronRight
                                  size={11}
                                  className="text-gray-600 group-hover:text-[#81C34D] transition-colors"
                                />
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center px-4">
                      <MapPin size={24} className="text-gray-600 mb-2" />
                      <p className="text-gray-500 text-xs font-sans">No LGA data found for this state.</p>
                    </div>
                  )}
                </div>

                {/* Clear selection */}
                <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-3">
                  <button
                    onClick={() => setSelectedState(null)}
                    className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-wider font-mono transition-colors flex items-center gap-1 focus:outline-none"
                  >
                    <X size={10} /> Clear Selection
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="lga-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/8 flex items-center justify-center mb-1">
                  <MapPin size={20} className="text-gray-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-400 font-sans">Select a State</h4>
                <p className="text-xs text-gray-600 leading-relaxed font-sans max-w-[180px]">
                  Click a state from the list or on the map to view its Local Government Areas.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* LGA Project Details Modal */}
      <LGAModal
        isOpen={modalOpen}
        lga={selectedLGA ?? ''}
        stateName={selectedStateInfo?.name ?? ''}
        projects={modalProjects}
        onClose={handleCloseModal}
      />
    </>
  );
}
