"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import CountUp from '@/components/ui/CountUp';
import type { ProjectsHeroSection } from '@/lib/strapi-projects-types';

type ProjectsHeroProps = Omit<ProjectsHeroSection, '__component'>;

/**
 * Card geometry is a layout decision, not copy, so it lives here rather than in
 * the CMS: the first three cards are two columns wide on the translucent
 * treatment, the last two are three columns wide on the solid dark one.
 * Anything past the fifth card falls back to the wide variant.
 */
const CARD_LAYOUT = [
  { span: 'md:col-span-2', surface: 'bg-white/[0.03] backdrop-blur-md border-white/10 hover:bg-white/[0.06] shadow-lg', labelClass: 'text-gray-300' },
  { span: 'md:col-span-2', surface: 'bg-white/[0.03] backdrop-blur-md border-white/10 hover:bg-white/[0.06] shadow-lg', labelClass: 'text-gray-300' },
  { span: 'md:col-span-2', surface: 'bg-white/[0.03] backdrop-blur-md border-white/10 hover:bg-white/[0.06] shadow-lg', labelClass: 'text-gray-300' },
  { span: 'md:col-span-3', surface: 'bg-[#02100d] border-white/15 hover:bg-[#02100d]/90 shadow-md', labelClass: 'text-[#81C34D]' },
  { span: 'md:col-span-3', surface: 'bg-[#02100d] border-white/15 hover:bg-[#02100d]/90 shadow-md', labelClass: 'text-[#81C34D]' },
];

/** SDG brand colours for the badge, keyed by goal number. */
const SDG_BADGE: Record<number, { border: string; dot: string }> = {
  7: { border: 'border-[#FDB713]/30 bg-[#FDB713]/10 text-[#FDB713]', dot: 'bg-[#FDB713]' },
  8: { border: 'border-[#FF4A6B]/30 bg-[#FF4A6B]/10 text-[#FF4A6B]', dot: 'bg-[#8F1838]' },
  9: { border: 'border-[#F36D25]/30 bg-[#F36D25]/10 text-[#F36D25]', dot: 'bg-[#F36D25]' },
  13: { border: 'border-[#56C36A]/30 bg-[#56C36A]/10 text-[#56C36A]', dot: 'bg-[#3F7E44]' },
};

export default function ProjectsHero({
  breadcrumbLabel,
  eyebrow,
  headingPartOne,
  headingHighlight,
  description,
  backgroundImage,
  stats,
}: ProjectsHeroProps) {
  return (
    <GlassHero
      title={<>{headingPartOne}<span className="text-[#9BB7B1]">{headingHighlight}</span></>}
      subtitle={eyebrow}
      currentPage={breadcrumbLabel ?? 'projects'}
      fade="dark"
      bgImage={backgroundImage ?? ''}
      description={<p>{description}</p>}
    >
      {/* Portfolio impact metrics — staggered entrance */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
        variants={heroRowVariants}
        initial="hidden"
        animate="show"
      >
        {(stats ?? []).map((stat, i) => {
          const layout = CARD_LAYOUT[i] ?? CARD_LAYOUT[4];
          // "SDG 7" -> 7
          const sdgNum = Number.parseInt((stat.sdgBadge ?? '').replace(/\D/g, ''), 10);
          const badge = SDG_BADGE[sdgNum];

          return (
            <motion.div
              key={stat.id ?? i}
              variants={heroCardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`border rounded-[6px] p-6 min-h-[220px] md:min-h-[240px] flex flex-col justify-between transition-all duration-300 group cursor-default relative will-change-transform ${layout.span} ${layout.surface}`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] font-mono block ${layout.labelClass}`}>
                  {stat.label}
                </span>
                <ArrowUpRight size={16} className="text-[#81C34D] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="my-4 flex items-baseline">
                <span className="text-4xl md:text-5xl lg:text-6xl font-light text-white font-sans tracking-tight">
                  <CountUp value={stat.value ?? ''} />
                </span>
                {stat.unit && (
                  <span className="text-xl md:text-2xl text-gray-400 ml-1 font-light font-sans">{stat.unit}</span>
                )}
              </div>

              <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans font-light">
                {stat.description}
              </p>

              {badge && (
                <div className={`mt-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider self-start font-sans ${badge.border}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                  {stat.sdgBadge}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </GlassHero>
  );
}
