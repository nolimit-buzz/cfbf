"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import CountUp from '@/components/ui/CountUp';
import type { ImpactHeroSection } from '@/lib/strapi-impact-types';

type ImpactHeroProps = Omit<ImpactHeroSection, '__component'>;

/**
 * Each hero card gets its own surface colour, in the authored order. This is a
 * layout decision rather than copy, so it stays here; a seventh card would fall
 * back to the last treatment.
 */
const CARD_SURFACE = [
  { bgClass: 'bg-brand-primary text-white border-brand-primary/20', arrowColor: '#81C34D' },
  { bgClass: 'bg-brand-cyan text-white border-brand-cyan/20', arrowColor: '#81C34D' },
  { bgClass: 'bg-brand-accent text-brand-dark border-brand-accent/20', arrowColor: '#051F1A' },
  { bgClass: 'bg-[#E6F0EA] text-brand-dark border-[#E6F0EA]/20', arrowColor: '#00A788' },
  { bgClass: 'bg-[#D1E5F8] text-brand-dark border-[#D1E5F8]/20', arrowColor: '#009FD4' },
  { bgClass: 'bg-brand-dark text-white border-brand-dark/20', arrowColor: '#81C34D' },
];

/** SDG brand colours for the badge, keyed by goal number. */
const SDG_BADGE: Record<number, { color: string; bg: string; text: string; border: string }> = {
  5: { color: '#FF4A6B', bg: 'bg-[#FF4A6B]/10', text: 'text-[#FF4A6B]', border: 'border-[#FF4A6B]/20' },
  7: { color: '#FDB713', bg: 'bg-[#FDB713]/10', text: 'text-[#FDB713]', border: 'border-[#FDB713]/20' },
  8: { color: '#FF4A6B', bg: 'bg-[#FF4A6B]/10', text: 'text-[#FF4A6B]', border: 'border-[#FF4A6B]/20' },
  9: { color: '#F36D25', bg: 'bg-[#F36D25]/10', text: 'text-[#F36D25]', border: 'border-[#F36D25]/20' },
  11: { color: '#FD9D24', bg: 'bg-[#FD9D24]/10', text: 'text-[#FD9D24]', border: 'border-[#FD9D24]/20' },
  13: { color: '#56C36A', bg: 'bg-[#56C36A]/10', text: 'text-[#56C36A]', border: 'border-[#56C36A]/20' },
  17: { color: '#19486A', bg: 'bg-[#19486A]/10', text: 'text-[#19486A]', border: 'border-[#19486A]/20' },
};

export default function ImpactHero({
  breadcrumbLabel,
  eyebrow,
  headingPartOne,
  headingHighlight,
  descriptionPrimary,
  descriptionSecondary,
  backgroundImage,
  stats,
}: ImpactHeroProps) {
  return (
    <GlassHero
      title={<>{headingPartOne}<span className="text-[#9BB7B1]">{headingHighlight}</span></>}
      subtitle={eyebrow}
      currentPage={breadcrumbLabel ?? 'impact'}
      bgImage={backgroundImage ?? ''}
      description={
        <>
          <p className="text-base">{descriptionPrimary}</p>
          <p className="text-white/50 text-base">{descriptionSecondary}</p>
        </>
      }
    >
      {/* Top metrics inside Hero */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={heroRowVariants}
        initial="hidden"
        animate="show"
      >
        {(stats ?? []).map((stat, i) => {
          const surface = CARD_SURFACE[i] ?? CARD_SURFACE[CARD_SURFACE.length - 1];
          // "SDG 7" -> 7
          const sdgNum = Number.parseInt((stat.sdgBadge ?? '').replace(/\D/g, ''), 10);
          const badge = SDG_BADGE[sdgNum];

          return (
            <motion.div
              key={stat.id ?? i}
              variants={heroCardVariants}
              whileHover={{ y: -4, scale: 1.01, borderColor: surface.arrowColor + '40' }}
              className={`rounded-[6px] border ${surface.bgClass} p-6 flex flex-col justify-between h-full min-h-[220px] md:min-h-[240px] shadow-lg transition-all duration-300 group cursor-default relative will-change-transform`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono block opacity-60">
                  {stat.category}
                </span>
                <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: surface.arrowColor }} />
              </div>

              <div className="my-4 flex items-baseline">
                <span className="text-4xl md:text-5xl font-light font-sans tracking-tight">
                  <CountUp value={stat.value ?? ''} />
                </span>
              </div>

              <p className="text-xs md:text-sm leading-relaxed font-sans font-light opacity-90 mb-4">
                {stat.description}
              </p>

              {/* SDG badge */}
              {badge && (
                <div className="flex flex-wrap gap-1 mt-auto">
                  <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded border ${badge.border} ${badge.bg} ${badge.text} text-[9px] font-bold uppercase tracking-wider self-start font-sans`}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.color }} />
                    {stat.sdgBadge}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </GlassHero>
  );
}
