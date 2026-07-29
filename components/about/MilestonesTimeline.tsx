"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MILESTONES = [
  {
    period: 'Q4 2022',
    year: 2022,
    color: '#009FD4',
    label: 'Fund seeded & framework certified',
    events: [
      { date: '10.22', text: 'Clean Energy Transition Strategy & Framework formally issued' },
      { date: '11.22', text: 'USD21.3M concessional capital committed by UK FCDO & BII to the Facility' },
      { date: '12.22', text: 'Guarantees framework certified under Climate Bonds Initiative criteria' },
      { date: '12.22', text: 'InfraCredit appointed as Facility administrator' },
    ],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=900&auto=format&fit=crop',
  },
  {
    period: 'Q4 2023',
    year: 2023,
    color: '#00A788',
    label: 'Deployment phase — first portfolio closed',
    events: [
      { date: '03.23', text: 'Initial portfolios closed; first local currency guarantee issued' },
      { date: '06.23', text: '120 telecom base stations solarised across 24 states' },
      { date: '09.23', text: 'Dedicated financial products developed for mini-grid developers' },
      { date: '12.23', text: 'USD 21.3M total concessional capital deployed to active pipeline' },
    ],
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=900&auto=format&fit=crop',
  },
  {
    period: 'Q4 2024',
    year: 2024,
    color: '#81C34D',
    label: 'Portfolio consolidation — institutional co-financing expanded',
    events: [
      { date: 'Q1.24', text: 'BII second tranche of co-investment committed to active pipeline' },
      { date: 'Q2.24', text: 'Two additional insurance companies onboarded as co-financiers' },
      { date: 'Q3.24', text: 'Green bond issuance framework aligned to ICMA Green Bond Principles' },
      { date: 'Q4.24', text: 'Pipeline at ₦5.2B; 5% renewable investment target achieved ahead of schedule' },
    ],
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=900&auto=format&fit=crop',
  },
  {
    period: 'Q4 2025',
    year: 2025,
    color: '#009FD4',
    label: 'Scale-out — ₦7.86B+ pipeline mobilised',
    events: [
      { date: 'Q1.25', text: '5% renewable/cleaner energy investments target achieved in portfolio' },
      { date: 'Q2.25', text: 'Pipeline expanded to ₦7.86B+ across 32 states' },
      { date: 'Q3.25', text: 'Additional capital mobilised from PFAs and international DFIs' },
      { date: 'Q4.25', text: 'Full national footprint across all six geo-political zones' },
    ],
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=900&auto=format&fit=crop',
  },
];

// Timeline rail: 2022 → 2025 (36 months total)
const RAIL_YEARS = [2022, 2023, 2024, 2025];
const TOTAL_MONTHS = 36;

function getMilestonePosition(year: number) {
  return (year - RAIL_YEARS[0]) / (RAIL_YEARS[RAIL_YEARS.length - 1] - RAIL_YEARS[0]);
}

export default function MilestonesTimeline() {
  const [active, setActive] = useState(0);
  const current = MILESTONES[active];

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-accent" />
            <span className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase font-mono">Progress indicator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-sans tracking-tight leading-tight">
            Facility milestones <span className="text-[#9BB7B1]">&amp; growth timeline</span>
          </h2>
        </motion.div>

        {/* Content card */}
        <div className="mb-10" style={{ minHeight: 280 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              className="grid md:grid-cols-5 rounded-[6px] overflow-hidden border border-white/5"
            >
              {/* Text side */}
              <div className="md:col-span-3 bg-[#071F19] p-8 md:p-10 flex flex-col">
                <span
                  className="inline-flex self-start text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1.5 rounded-[6px] mb-5"
                  style={{ color: current.color, backgroundColor: `${current.color}1A` }}
                >
                  {current.period}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans leading-snug mb-6">
                  {current.label}
                </h3>
                <ul className="space-y-3 mt-auto">
                  {current.events.map((ev, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[10px] font-mono font-bold pt-0.5 shrink-0 w-10" style={{ color: current.color }}>
                        {ev.date}
                      </span>
                      <span className="text-gray-300 text-sm font-sans leading-relaxed">{ev.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Image side */}
              <div className="md:col-span-2 relative min-h-[180px]">
                <img
                  src={current.image}
                  alt={current.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-dark/25" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline rail */}
        <div className="relative h-16 mb-6">
          {/* Base line */}
          <div className="absolute inset-x-0 top-6 h-px bg-white/10" />

          {/* Monthly ticks */}
          {Array.from({ length: TOTAL_MONTHS + 1 }).map((_, mi) => {
            const pct = mi / TOTAL_MONTHS;
            const isYear = mi % 12 === 0;
            if (isYear) return null;
            return (
              <div
                key={mi}
                className="absolute bg-white/10 top-6"
                style={{
                  left: `${pct * 100}%`,
                  width: 1,
                  height: mi % 3 === 0 ? 8 : 4,
                  transform: 'translateX(-50%) translateY(-50%)',
                }}
              />
            );
          })}

          {/* Year labels */}
          {RAIL_YEARS.map((yr) => {
            const pct = getMilestonePosition(yr);
            return (
              <div
                key={yr}
                className="absolute flex flex-col items-center"
                style={{ left: `${pct * 100}%`, transform: 'translateX(-50%)', top: 16 }}
              >
                <div className="w-px h-5 bg-white/20" />
                <span className="text-xs font-mono text-gray-500 mt-1 select-none">{yr}</span>
              </div>
            );
          })}

          {/* Milestone dots + active drop-line */}
          {MILESTONES.map((ms, i) => {
            const pct = getMilestonePosition(ms.year);
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="absolute focus:outline-none interactive"
                style={{ left: `${pct * 100}%`, top: 24, transform: 'translate(-50%, -50%)' }}
                aria-label={ms.period}
              >
                {/* Drop line above dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="dropLine"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 w-px origin-bottom"
                      style={{
                        bottom: '100%',
                        height: 28,
                        backgroundColor: ms.color,
                        marginBottom: 4,
                      }}
                    />
                  )}
                </AnimatePresence>
                <div
                  className="w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? ms.color : 'transparent',
                    borderColor: isActive ? ms.color : 'rgba(255,255,255,0.25)',
                    boxShadow: isActive ? `0 0 10px ${ms.color}80` : 'none',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Nav row */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setActive(i => Math.max(0, i - 1))}
            disabled={active === 0}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all interactive focus:outline-none ${
              active === 0
                ? 'border-white/10 text-white/20 cursor-not-allowed'
                : 'border-white/20 text-white hover:border-brand-accent hover:text-brand-accent'
            }`}
          >
            <ChevronLeft size={17} />
          </button>

          <div className="flex gap-2.5">
            {MILESTONES.map((ms, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-2 h-2 rounded-full transition-all interactive focus:outline-none"
                style={{ backgroundColor: i === active ? ms.color : 'rgba(255,255,255,0.15)' }}
              />
            ))}
          </div>

          <button
            onClick={() => setActive(i => Math.min(MILESTONES.length - 1, i + 1))}
            disabled={active === MILESTONES.length - 1}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all interactive focus:outline-none ${
              active === MILESTONES.length - 1
                ? 'border-white/10 text-white/20 cursor-not-allowed'
                : 'border-white/20 text-white hover:border-brand-accent hover:text-brand-accent'
            }`}
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
