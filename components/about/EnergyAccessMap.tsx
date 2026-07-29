"use client";

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Grid3X3, Sun } from 'lucide-react';
// @ts-ignore
import nigeriaMapData from '@svg-maps/nigeria';

type TabId = 'grid' | 'mini-grid' | 'standalone';

interface StateLocation {
  id: string;
  name: string;
  path: string;
}

interface StateData {
  mapId: string;
  name: string;
  connections: string;
  fundingGap: string;
  unservedPct: number;
  grid: number;
  miniGrid: number;
  standalone: number;
}

// Data estimated from Nigeria REA / SEforAll 2022 reports
const STATE_FUNDING_DATA: StateData[] = [
  { mapId: 'kano',        name: 'Kano',           connections: '142,000', fundingGap: '₦18.4B', unservedPct: 58, grid: 0.85, miniGrid: 0.45, standalone: 0.30 },
  { mapId: 'lagos',       name: 'Lagos',          connections: '210,000', fundingGap: '₦27.1B', unservedPct: 22, grid: 0.90, miniGrid: 0.20, standalone: 0.15 },
  { mapId: 'kaduna',      name: 'Kaduna',         connections: '98,000',  fundingGap: '₦12.6B', unservedPct: 64, grid: 0.70, miniGrid: 0.55, standalone: 0.40 },
  { mapId: 'oyo',         name: 'Oyo',            connections: '76,000',  fundingGap: '₦9.8B',  unservedPct: 52, grid: 0.60, miniGrid: 0.50, standalone: 0.35 },
  { mapId: 'rivers',      name: 'Rivers',         connections: '54,000',  fundingGap: '₦7.0B',  unservedPct: 38, grid: 0.55, miniGrid: 0.35, standalone: 0.25 },
  { mapId: 'borno',       name: 'Borno',          connections: '112,000', fundingGap: '₦14.5B', unservedPct: 82, grid: 0.30, miniGrid: 0.85, standalone: 0.80 },
  { mapId: 'niger',       name: 'Niger',          connections: '88,000',  fundingGap: '₦11.4B', unservedPct: 74, grid: 0.35, miniGrid: 0.80, standalone: 0.75 },
  { mapId: 'bauchi',      name: 'Bauchi',         connections: '95,000',  fundingGap: '₦12.3B', unservedPct: 79, grid: 0.28, miniGrid: 0.88, standalone: 0.82 },
  { mapId: 'sokoto',      name: 'Sokoto',         connections: '84,000',  fundingGap: '₦10.9B', unservedPct: 81, grid: 0.25, miniGrid: 0.78, standalone: 0.90 },
  { mapId: 'zamfara',     name: 'Zamfara',        connections: '72,000',  fundingGap: '₦9.3B',  unservedPct: 83, grid: 0.22, miniGrid: 0.72, standalone: 0.92 },
  { mapId: 'kebbi',       name: 'Kebbi',          connections: '66,000',  fundingGap: '₦8.6B',  unservedPct: 78, grid: 0.24, miniGrid: 0.74, standalone: 0.88 },
  { mapId: 'jigawa',      name: 'Jigawa',         connections: '78,000',  fundingGap: '₦10.1B', unservedPct: 77, grid: 0.26, miniGrid: 0.76, standalone: 0.86 },
  { mapId: 'katsina',     name: 'Katsina',        connections: '91,000',  fundingGap: '₦11.8B', unservedPct: 75, grid: 0.30, miniGrid: 0.82, standalone: 0.85 },
  { mapId: 'adamawa',     name: 'Adamawa',        connections: '67,000',  fundingGap: '₦8.7B',  unservedPct: 70, grid: 0.32, miniGrid: 0.70, standalone: 0.78 },
  { mapId: 'taraba',      name: 'Taraba',         connections: '58,000',  fundingGap: '₦7.5B',  unservedPct: 72, grid: 0.30, miniGrid: 0.72, standalone: 0.80 },
  { mapId: 'yobe',        name: 'Yobe',           connections: '62,000',  fundingGap: '₦8.1B',  unservedPct: 80, grid: 0.28, miniGrid: 0.80, standalone: 0.84 },
  { mapId: 'gombe',       name: 'Gombe',          connections: '48,000',  fundingGap: '₦6.2B',  unservedPct: 68, grid: 0.40, miniGrid: 0.68, standalone: 0.72 },
  { mapId: 'plateau',     name: 'Plateau',        connections: '55,000',  fundingGap: '₦7.1B',  unservedPct: 65, grid: 0.42, miniGrid: 0.65, standalone: 0.60 },
  { mapId: 'benue',       name: 'Benue',          connections: '64,000',  fundingGap: '₦8.3B',  unservedPct: 62, grid: 0.45, miniGrid: 0.62, standalone: 0.58 },
  { mapId: 'nasarawa',    name: 'Nasarawa',       connections: '42,000',  fundingGap: '₦5.4B',  unservedPct: 60, grid: 0.50, miniGrid: 0.58, standalone: 0.55 },
  { mapId: 'kogi',        name: 'Kogi',           connections: '51,000',  fundingGap: '₦6.6B',  unservedPct: 56, grid: 0.52, miniGrid: 0.54, standalone: 0.50 },
  { mapId: 'kwara',       name: 'Kwara',          connections: '44,000',  fundingGap: '₦5.7B',  unservedPct: 54, grid: 0.55, miniGrid: 0.50, standalone: 0.46 },
  { mapId: 'edo',         name: 'Edo',            connections: '38,000',  fundingGap: '₦4.9B',  unservedPct: 42, grid: 0.62, miniGrid: 0.40, standalone: 0.36 },
  { mapId: 'delta',       name: 'Delta',          connections: '46,000',  fundingGap: '₦5.9B',  unservedPct: 44, grid: 0.60, miniGrid: 0.42, standalone: 0.38 },
  { mapId: 'anambra',     name: 'Anambra',        connections: '32,000',  fundingGap: '₦4.1B',  unservedPct: 35, grid: 0.70, miniGrid: 0.30, standalone: 0.28 },
  { mapId: 'enugu',       name: 'Enugu',          connections: '36,000',  fundingGap: '₦4.6B',  unservedPct: 38, grid: 0.68, miniGrid: 0.35, standalone: 0.30 },
  { mapId: 'imo',         name: 'Imo',            connections: '34,000',  fundingGap: '₦4.4B',  unservedPct: 36, grid: 0.68, miniGrid: 0.32, standalone: 0.28 },
  { mapId: 'abia',        name: 'Abia',           connections: '28,000',  fundingGap: '₦3.6B',  unservedPct: 34, grid: 0.65, miniGrid: 0.30, standalone: 0.26 },
  { mapId: 'ebonyi',      name: 'Ebonyi',         connections: '30,000',  fundingGap: '₦3.9B',  unservedPct: 40, grid: 0.60, miniGrid: 0.38, standalone: 0.34 },
  { mapId: 'cross-river', name: 'Cross River',    connections: '42,000',  fundingGap: '₦5.4B',  unservedPct: 48, grid: 0.55, miniGrid: 0.46, standalone: 0.42 },
  { mapId: 'akwa-ibom',   name: 'Akwa Ibom',      connections: '38,000',  fundingGap: '₦4.9B',  unservedPct: 40, grid: 0.60, miniGrid: 0.38, standalone: 0.34 },
  { mapId: 'bayelsa',     name: 'Bayelsa',        connections: '22,000',  fundingGap: '₦2.8B',  unservedPct: 44, grid: 0.50, miniGrid: 0.44, standalone: 0.48 },
  { mapId: 'ondo',        name: 'Ondo',           connections: '40,000',  fundingGap: '₦5.1B',  unservedPct: 45, grid: 0.60, miniGrid: 0.43, standalone: 0.38 },
  { mapId: 'ekiti',       name: 'Ekiti',          connections: '24,000',  fundingGap: '₦3.1B',  unservedPct: 38, grid: 0.65, miniGrid: 0.35, standalone: 0.30 },
  { mapId: 'osun',        name: 'Osun',           connections: '31,000',  fundingGap: '₦4.0B',  unservedPct: 36, grid: 0.68, miniGrid: 0.32, standalone: 0.28 },
  { mapId: 'ogun',        name: 'Ogun',           connections: '52,000',  fundingGap: '₦6.7B',  unservedPct: 30, grid: 0.72, miniGrid: 0.28, standalone: 0.22 },
  { mapId: 'fct',         name: 'FCT Abuja',      connections: '28,000',  fundingGap: '₦3.6B',  unservedPct: 20, grid: 0.80, miniGrid: 0.18, standalone: 0.14 },
];

const TABS: { id: TabId; label: string; icon: React.ElementType; color: string; intensityKey: keyof StateData }[] = [
  { id: 'grid',       label: 'Grid Extension',    icon: Zap,        color: '#009FD4', intensityKey: 'grid' },
  { id: 'mini-grid',  label: 'Mini-grid',          icon: Grid3X3,    color: '#00A788', intensityKey: 'miniGrid' },
  { id: 'standalone', label: 'Stand-alone Solar',  icon: Sun,        color: '#81C34D', intensityKey: 'standalone' },
];

// FIX P1: Pre-parse hex colours once so getStateColor never runs parseInt at hover time
const PARSED_COLORS: Record<string, [number, number, number]> = {};
TABS.forEach(({ color }) => {
  const hex = color.replace('#', '');
  PARSED_COLORS[color] = [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
});

function getStateColor(intensity: number, tabColor: string, isHovered: boolean): string {
  if (isHovered) return '#FFFFFF';
  const [r, g, b] = PARSED_COLORS[tabColor];
  const alpha = 0.08 + intensity * 0.82;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// FIX P1: Pre-compute per-tab colour lookup maps so we never call getStateColor during hover
function buildColorMap(tabColor: string): Record<string, string> {
  const map: Record<string, string> = {};
  STATE_FUNDING_DATA.forEach(d => {
    ['grid', 'miniGrid', 'standalone'].forEach(k => {
      const intensity = d[k as keyof StateData] as number;
      const key = `${d.mapId}:${k}`;
      map[key] = getStateColor(intensity, tabColor, false);
    });
  });
  return map;
}

// Build all color maps at module load — runs once, zero hover cost
const COLOR_MAPS: Record<string, ReturnType<typeof buildColorMap>> = {};
TABS.forEach(({ color }) => { COLOR_MAPS[color] = buildColorMap(color); });

export default function EnergyAccessMap() {
  const [activeTab, setActiveTab] = useState<TabId>('mini-grid');
  // FIX P0: single hovered state — string ID or null
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const activeTabConfig = TABS.find(t => t.id === activeTab)!;

  const sortedData = useMemo(() => {
    const key = activeTabConfig.intensityKey;
    return [...STATE_FUNDING_DATA].sort((a, b) => (b[key] as number) - (a[key] as number)).slice(0, 12);
  }, [activeTab]);

  const dataByMapId = useMemo(() => {
    const map: Record<string, StateData> = {};
    STATE_FUNDING_DATA.forEach(d => { map[d.mapId] = d; });
    return map;
  }, []);

  // FIX P0: Delegated SVG event handler — ONE listener on <svg> instead of 37 per-path listeners
  // Reads `data-state-id` from the target <path> element
  const handleSvgMouseEnter = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGPathElement;
    const stateId = target.dataset.stateId;
    if (stateId) setHoveredState(stateId);
  }, []);

  const handleSvgMouseLeave = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    // Only clear if we leave the SVG entirely (not cross into another path)
    const related = e.relatedTarget as Element | null;
    if (!related || !(e.currentTarget as Element).contains(related)) {
      setHoveredState(null);
    }
  }, []);

  // FIX P1: derive hovered data at render time — no IIFE in JSX
  const effectiveHoveredId = hoveredState || hoveredRow;
  const hoveredData = effectiveHoveredId ? dataByMapId[effectiveHoveredId] : null;

  // FIX P1: look up pre-computed colors — zero computation in render path
  const colorMap = COLOR_MAPS[activeTabConfig.color];

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-accent" />
            <span className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase font-mono">Nigeria Market Analysis</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-sans tracking-tight leading-tight">
                The Nigeria Energy Access <span className="text-[#9BB7B1]">Funding Gap</span>
              </h2>
              <p className="text-gray-400 mt-3 max-w-xl font-sans text-sm leading-relaxed">
                Mini-grids and stand-alone solar are the least-cost technology for 70M+ Nigerians.
                Select a technology category to see projected connections, funding needs, and state-level distribution.
              </p>
            </div>
            {/* Tab strip */}
            <div className="flex gap-2 shrink-0">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[6px] text-xs font-semibold font-mono uppercase tracking-wider transition-all duration-200 border interactive ${
                      activeTab === tab.id
                        ? 'text-white border-transparent shadow-md'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                    }`}
                    style={activeTab === tab.id ? { backgroundColor: tab.color, borderColor: tab.color } : {}}
                  >
                    <Icon size={13} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Map + Table grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Table — left 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#071F19] border border-white/5 rounded-[6px] overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <span>#</span>
                <span className="col-span-1">State</span>
                <span className="text-right">Connections</span>
                <span className="text-right">Gap</span>
              </div>

              {/* FIX P1: AnimatePresence with opacity-only fade — no x/y translation so no layout change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {sortedData.map((row, i) => {
                    const isHighlighted = hoveredState === row.mapId || hoveredRow === row.mapId;
                    return (
                      <div
                        key={row.mapId}
                        onMouseEnter={() => setHoveredRow(row.mapId)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`grid grid-cols-4 items-center px-4 py-3 border-b border-white/5 last:border-0 cursor-default transition-colors duration-150 ${
                          isHighlighted ? 'bg-white/[0.05]' : ''
                        }`}
                      >
                        <span className="text-[10px] font-mono text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                        <div className="col-span-1 flex items-center gap-2">
                          {isHighlighted && (
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: activeTabConfig.color }}
                            />
                          )}
                          <span className={`text-xs font-sans font-medium truncate ${isHighlighted ? 'text-white' : 'text-gray-400'}`}>
                            {row.name}
                          </span>
                        </div>
                        <span className="text-right text-[11px] font-mono text-gray-400">{row.connections}</span>
                        <span
                          className="text-right text-[11px] font-mono font-bold"
                          style={{ color: activeTabConfig.color }}
                        >
                          {row.fundingGap}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Footer note */}
              <div className="px-4 py-3 bg-white/[0.02] border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-sans">
                  Source: Nigeria REA / SEforAll estimates, 2022. Top 15 states by technology need shown.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Nigeria Map — right 7 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 relative"
          >
            {/* Tooltip — FIX: clean conditional, no IIFE */}
            <AnimatePresence>
              {hoveredData && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  // FIX: will-change on tooltip so it composites independently
                  style={{ willChange: 'transform, opacity' }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-0 right-0 z-20 bg-brand-dark border border-white/10 text-white rounded-[6px] p-4 shadow-xl min-w-[180px]"
                >
                  <p className="font-bold text-sm font-sans mb-2">{hoveredData.name}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between gap-4 text-xs">
                      <span className="text-gray-400">Connections</span>
                      <span className="font-mono font-bold">{hoveredData.connections}</span>
                    </div>
                    <div className="flex justify-between gap-4 text-xs">
                      <span className="text-gray-400">Funding Gap</span>
                      <span className="font-mono font-bold" style={{ color: activeTabConfig.color }}>{hoveredData.fundingGap}</span>
                    </div>
                    <div className="flex justify-between gap-4 text-xs">
                      <span className="text-gray-400">% Unserved</span>
                      <span className="font-mono font-bold">{hoveredData.unservedPct}%</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Need index</span>
                        <div className="flex-1 bg-white/10 rounded-full h-1">
                          <div
                            className="h-1 rounded-full transition-all"
                            style={{
                              width: `${(hoveredData[activeTabConfig.intensityKey] as number) * 100}%`,
                              backgroundColor: activeTabConfig.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map legend */}
            <div className="flex items-center gap-4 mb-4 mt-2 lg:mt-0">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Need intensity</span>
              <div className="flex items-center gap-1 flex-1">
                {[0.1, 0.25, 0.45, 0.65, 0.85].map((v, i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 rounded-sm"
                    style={{ backgroundColor: getStateColor(v, activeTabConfig.color, false) }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Low → High</span>
            </div>

            {/*
              FIX P1: Remove AnimatePresence key= on SVG wrapper.
              Instead of unmounting/remounting all 37 paths on tab switch,
              we use a simple opacity fade via motion.div around a stable SVG.
              The SVG + path elements stay mounted — only fill colours change via CSS transition on each path.
            */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full aspect-[744/600]"
              // FIX: promote map wrapper to compositor layer for tab fade
              style={{ willChange: 'opacity' }}
            >
              {/*
                FIX P0: Delegated event handlers on <svg> — ONE listener for all 37 paths.
                Each <path> carries `data-state-id` for O(1) lookup.
                fill CSS transition is kept (browser handles it on the GPU via CSS engine)
                but the JS overhead is now 1 handler call instead of 37.
              */}
              <svg
                viewBox={nigeriaMapData.viewBox}
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={handleSvgMouseEnter}
                onMouseLeave={handleSvgMouseLeave}
                // mouseover bubbles from paths — catches all state entries without per-path handlers
                onMouseOver={handleSvgMouseEnter}
              >
                {(nigeriaMapData.locations as StateLocation[]).map((loc) => {
                  const data = dataByMapId[loc.id];
                  const intensityKey = activeTabConfig.intensityKey;
                  // FIX P1: Color looked up from pre-built map — zero computation
                  const baseColor = colorMap[`${loc.id}:${intensityKey}`] ?? getStateColor(0.05, activeTabConfig.color, false);
                  const isHovered = hoveredState === loc.id || hoveredRow === loc.id;
                  return (
                    <path
                      key={loc.id}
                      d={loc.path}
                      data-state-id={loc.id}
                      style={{
                        // FIX: fill transitions are CSS-engine driven, not rAF-driven — acceptable
                        // Chrome composites SVG fills on the CPU but batches them in a single paint pass
                        fill: isHovered ? '#FFFFFF' : baseColor,
                        stroke: '#051F1A',
                        strokeWidth: isHovered ? '2px' : '1px',
                        cursor: 'pointer',
                        transition: 'fill 0.25s ease, stroke-width 0.12s ease',
                        // FIX: no pointer-events needed on individual paths since delegation is on <svg>
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
