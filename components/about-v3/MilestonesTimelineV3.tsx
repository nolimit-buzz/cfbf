"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MilestonesSection } from '@/lib/strapi-about-types';

type MilestonesTimelineProps = Omit<MilestonesSection, '__component'>;

/**
 * Milestone accent colours are bespoke styling with no CMS field, so they stay
 * here and are cycled by position.
 */
const MILESTONE_COLORS = ['#009FD4', '#00A788', '#81C34D', '#009FD4'];

export default function MilestonesTimelineV3({
  eyebrow,
  headingPrimary,
  headingSecondary,
  railYears,
  milestones,
}: MilestonesTimelineProps) {
  const [active, setActive] = useState(0);

  const years = useMemo(
    () =>
      (railYears ?? [])
        .map((item) => Number(item.label))
        .filter((year) => !Number.isNaN(year)),
    [railYears]
  );

  const firstYear = years[0] ?? 0;
  const lastYear = years[years.length - 1] ?? firstYear;
  const yearSpan = lastYear - firstYear;

  /** 0..1 position of a year along the rail. */
  const positionOf = (year: number) => (yearSpan === 0 ? 0 : (year - firstYear) / yearSpan);

  // Monthly ticks between the year labels; recomputed only when the rail changes.
  const tickMarks = useMemo(() => {
    const totalMonths = yearSpan * 12;
    return Array.from({ length: totalMonths + 1 }, (_, mi) => {
      if (mi % 12 === 0) return null;
      return { mi, pct: mi / totalMonths, height: mi % 3 === 0 ? 8 : 4 };
    }).filter(Boolean) as { mi: number; pct: number; height: number }[];
  }, [yearSpan]);

  const items = milestones ?? [];
  const current = items[active];
  const currentColor = MILESTONE_COLORS[active % MILESTONE_COLORS.length];

  const handleMilestoneClick = (index: number) => {
    setActive(index);
  };

  return (
    <div className="relative py-24 bg-[#FAFDFB] overflow-hidden">
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(5,31,26,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(5,31,26,0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

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
            <div className="h-px w-8 bg-brand-primary" />
            <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono">{eyebrow}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark font-sans tracking-tight leading-tight">
            {headingPrimary}
            <span className="text-[#7C9590]">{headingSecondary}</span>
          </h2>
        </motion.div>

        {/* Content card */}
        {current && (
          <div className="mb-10" style={{ minHeight: 280 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                // FIX: all motion uses transform (x) — compositor-eligible, no layout thrash
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="grid md:grid-cols-5 rounded-[6px] overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(5,31,26,0.015)]"
              >
                {/* Text side */}
                <div className="md:col-span-3 bg-white p-8 md:p-10 flex flex-col">
                  <span
                    className="inline-flex self-start text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1.5 rounded-[6px] mb-5"
                    style={{ color: currentColor, backgroundColor: `${currentColor}10`, border: `1px solid ${currentColor}20` }}
                  >
                    {current.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-dark font-sans leading-snug mb-6">
                    {current.label}
                  </h3>
                  <ul className="space-y-3 mt-auto">
                    {(current.events ?? []).map((ev, i) => (
                      <li key={ev.id ?? i} className="flex items-start gap-3">
                        <span className="text-[10px] font-mono font-bold pt-0.5 shrink-0 w-10" style={{ color: currentColor }}>
                          {ev.date}
                        </span>
                        <span className="text-gray-600 text-sm font-sans leading-relaxed">{ev.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Image side — FIX P1: explicit dimensions prevent CLS */}
                <div className="md:col-span-2 relative min-h-[180px]">
                  {current.image && (
                    <img
                      src={current.image}
                      alt={current.image_alt_text ?? current.label ?? ''}
                      width={480}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-[#051F1A]/5" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Timeline rail */}
        <div className="relative h-16 mb-6">
          {/* Base line */}
          <div className="absolute inset-x-0 top-6 h-px bg-gray-250/80" />

          {/* Monthly ticks */}
          {tickMarks.map(({ mi, pct, height }) => (
            <div
              key={mi}
              className="absolute bg-gray-200 top-6"
              style={{
                left: `${pct * 100}%`,
                width: 1,
                height,
                // FIX: use translateX(-50%) translateY(-50%) — compositor-friendly, no layout read
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            />
          ))}

          {/* Year labels */}
          {years.map((yr) => (
            <div
              key={yr}
              className="absolute flex flex-col items-center"
              style={{ left: `${positionOf(yr) * 100}%`, transform: 'translateX(-50%)', top: 16 }}
            >
              <div className="w-px h-5 bg-gray-200" />
              <span className="text-xs font-mono text-gray-400 mt-1 select-none">{yr}</span>
            </div>
          ))}

          {/* Milestone dots
            FIX P0: removed `layoutId="dropLine"` — replaced with plain animate scaleY
            layoutId forces getBoundingClientRect() on every animation frame which causes layout thrash.
          */}
          {items.map((ms, i) => {
            const pct = positionOf(Number(ms.year));
            const isActive = i === active;
            const color = MILESTONE_COLORS[i % MILESTONE_COLORS.length];
            return (
              <button
                key={ms.id ?? i}
                onClick={() => handleMilestoneClick(i)}
                className="absolute focus:outline-none interactive"
                style={{ left: `${pct * 100}%`, top: 24, transform: 'translate(-50%, -50%)' }}
                aria-label={ms.period}
              >
                {/* Drop line — FIX: plain animate, no layoutId, origin-bottom for scale */}
                <motion.div
                  animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 w-px origin-bottom"
                  style={{
                    bottom: '100%',
                    height: 28,
                    backgroundColor: color,
                    marginBottom: 4,
                    // FIX: will-change promotes to compositor layer
                    willChange: 'transform, opacity',
                  }}
                />
                {/* Dot */}
                <div
                  className="w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? color : 'transparent',
                    borderColor: isActive ? color : 'rgba(5,31,26,0.15)',
                    // FIX: box-shadow is paint, but limited to 14x14px dot — acceptable
                    boxShadow: isActive ? `0 0 10px ${color}40` : 'none',
                    // FIX: promote dot to its own layer during active state to isolate repaints
                    willChange: isActive ? 'box-shadow' : 'auto',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Nav row */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => handleMilestoneClick(Math.max(0, active - 1))}
            disabled={active === 0}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all interactive focus:outline-none ${
              active === 0
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-gray-250/80 text-brand-dark hover:border-brand-primary hover:text-brand-primary bg-white shadow-sm'
            }`}
          >
            <ChevronLeft size={17} />
          </button>

          <div className="flex gap-2.5">
            {items.map((ms, i) => (
              <button
                key={ms.id ?? i}
                onClick={() => handleMilestoneClick(i)}
                className="w-2 h-2 rounded-full transition-all interactive focus:outline-none"
                style={{
                  backgroundColor:
                    i === active ? MILESTONE_COLORS[i % MILESTONE_COLORS.length] : 'rgba(5,31,26,0.15)',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => handleMilestoneClick(Math.min(items.length - 1, active + 1))}
            disabled={active === items.length - 1}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all interactive focus:outline-none ${
              active === items.length - 1
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-gray-250/80 text-brand-dark hover:border-brand-primary hover:text-brand-primary bg-white shadow-sm'
            }`}
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
