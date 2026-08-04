'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Radio,
  Sprout,
  Flame,
  Home,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import GlassHero from '@/components/GlassHero';
import SectionHeader from '@/components/ui/SectionHeader';
import type { EligibilityHeroSection } from '@/lib/strapi-eligibility-types';

type Props = Omit<EligibilityHeroSection, '__component'>;

const SECTOR_ICONS = [Sun, Radio, Sprout, Flame, Home];

const CARD_STYLES = [
  {
    wrapper: 'bg-[#FAFDFB] border border-gray-200 shadow-sm',
    title: 'text-[#051F1A]',
    desc: 'text-[#051F1A]/70',
    iconBg: 'bg-[#051F1A]/8 border-[#051F1A]/10',
    iconColor: 'text-[#051F1A]',
    sdg: 'text-[#051F1A]/50',
  },
  {
    wrapper: 'bg-brand-cyan shadow-md',
    title: 'text-white',
    desc: 'text-white/90',
    iconBg: 'bg-white/20 border-white/20',
    iconColor: 'text-white',
    sdg: 'text-white/70',
  },
  {
    wrapper: 'bg-brand-primary shadow-md',
    title: 'text-white',
    desc: 'text-white/85',
    iconBg: 'bg-white/20 border-white/20',
    iconColor: 'text-white',
    sdg: 'text-white/70',
  },
] as const;

function SectorScroller({
  sectors = [],
  sectorsLabel = '',
}: {
  sectors?: Array<{ title?: string; description?: string; sdgBadge?: string }>;
  sectorsLabel?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    function update() {
      const vc = window.innerWidth >= 1024 ? 3 : 1;
      setVisibleCount(vc);
      setActiveIndex((i) => Math.min(i, Math.max(0, sectors.length - vc)));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [sectors.length]);

  const maxIndex = Math.max(0, sectors.length - visibleCount);
  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(maxIndex, i + 1));
  const translatePct = (activeIndex * (100 / visibleCount)).toFixed(4);

  return (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
    >
      {/* Sub-heading */}
      <div className="flex items-center gap-2 mb-3 px-1.5">
        <div className="h-px w-4 bg-white/30" />
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase font-mono text-white/50">
          {sectorsLabel}
        </span>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${translatePct}%)` }}
        >
          {sectors.map((sector, idx) => {
            const Icon = SECTOR_ICONS[idx % SECTOR_ICONS.length] ?? Sun;
            const style = CARD_STYLES[idx % 3];
            return (
              <div key={idx} className="flex-shrink-0 w-full lg:w-1/3 px-1.5">
                <div
                  className={`${style.wrapper} rounded-[6px] p-8 min-h-[220px] h-full flex flex-col justify-between cursor-default group`}
                >
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 ${style.iconBg}`}
                  >
                    <Icon size={20} className={style.iconColor} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold leading-tight font-sans mb-2 ${style.title}`}>
                      {sector.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed font-sans line-clamp-3 ${style.desc}`}
                    >
                      {sector.description}
                    </p>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider font-mono mt-3 block ${style.sdg}`}
                    >
                      {sector.sdgBadge}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 px-1.5">
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-200 rounded-full focus:outline-none ${
                i === activeIndex
                  ? 'w-4 h-1.5 bg-[#81C34D]'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#81C34D] hover:text-[#81C34D] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            onClick={next}
            disabled={activeIndex >= maxIndex}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#81C34D] hover:text-[#81C34D] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function EligibilityHero(props: Props) {
  return (
    <GlassHero
      title={
        <>
          {props.headingPartOne} <span className="text-[#9BB7B1]">{props.headingHighlight}</span>
        </>
      }
      subtitle={props.eyebrow ?? ''}
      bgImage={props.backgroundImage ?? ''}
      currentPage="eligibility"
      description={
        <>
          <p>{props.descriptionPrimary}</p>
          <p className="text-white/50 text-sm mt-3">
            {props.descriptionSecondaryPrefix}{' '}
            <a
              href={props.descriptionSecondaryLinkHref}
              className="text-[#81C34D] underline underline-offset-2 hover:text-white transition-colors"
            >
              {props.descriptionSecondaryLinkLabel}
            </a>{' '}
            {props.descriptionSecondarySuffix}
          </p>
        </>
      }
    >
      <SectorScroller sectors={props.sectors} sectorsLabel={props.sectorsLabel} />
    </GlassHero>
  );
}
