"use client";

import { Fragment, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import GlassHero from '@/components/GlassHero';
import { StatCard, SliderStatCard } from '@/components/ui/StatCard';
import { statRow, statCard } from '@/components/about/motion';
import type { AboutHeroSection } from '@/lib/strapi-about-types';

type AboutHeroProps = Omit<AboutHeroSection, '__component'>;

/**
 * Card themes are bespoke styling with no CMS field: the CMS `stats[]` array
 * controls which cards render and in what order, this table supplies their look.
 * Cards beyond the table fall back to the last entry.
 */
const STAT_THEMES = [
  { theme: 'light' as const, accentColor: '#00A788', flat: true },
  { theme: 'cyan' as const, accentColor: '#009FD4', flat: false },
];

/**
 * The CMS stores the hero body as plain text, but the design bolds the
 * institution names. Kept in code for the same reason as the card themes.
 */
const BOLD_PHRASES = [
  'UK Foreign, Commonwealth & Development Office (FCDO)',
  'British International Investment (BII)',
  'InfraCredit',
];

function withBoldPhrases(text: string): ReactNode {
  const pattern = new RegExp(
    `(${BOLD_PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`
  );

  return text.split(pattern).map((part, index) =>
    BOLD_PHRASES.includes(part) ? (
      <strong key={index} className="text-white">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}

export default function AboutHero({
  breadcrumbLabel,
  eyebrow,
  headingPartOne,
  headingHighlight,
  headingPartTwo,
  headingItalic,
  bodyPartOne,
  bodyPartTwo,
  backgroundImage,
  statImage,
  statImage_alt_text,
  stats,
  sliderStats,
}: AboutHeroProps) {
  const heroStats = stats ?? [];
  const heroSliderStats = (sliderStats ?? []).map((stat) => ({
    value: stat.value ?? '',
    label: stat.label ?? '',
    sub: stat.sub,
  }));

  return (
    <GlassHero
      title={
        <>
          {headingPartOne}
          <span className="text-brand-accent">{headingHighlight}</span>
          {headingPartTwo}
          <span className="italic font-serif text-[#9BB7B1]">{headingItalic}</span>
        </>
      }
      subtitle={eyebrow}
      currentPage={breadcrumbLabel ?? 'about'}
      bgImage={backgroundImage ?? ''}
      description={
        bodyPartOne || bodyPartTwo ? (
          <>
            {bodyPartOne && <p>{withBoldPhrases(bodyPartOne)}</p>}
            {bodyPartTwo && <p>{withBoldPhrases(bodyPartTwo)}</p>}
          </>
        ) : undefined
      }
    >
      {/* Hero stats cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
        variants={statRow}
        initial="hidden"
        animate="show"
      >
        {statImage && (
          <motion.div
            variants={statCard}
            className="rounded-[6px] overflow-hidden min-h-[200px] lg:min-h-0 relative group"
            whileHover={{ scale: 1.01 }}
          >
            <img
              src={statImage}
              alt={statImage_alt_text ?? ''}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
          </motion.div>
        )}

        {heroStats.map((stat, index) => {
          const style = STAT_THEMES[index] ?? STAT_THEMES[STAT_THEMES.length - 1];
          return (
            <motion.div key={stat.id ?? index} variants={statCard} whileHover={{ y: -4 }}>
              <StatCard
                theme={style.theme}
                flat={style.flat}
                accentColor={style.accentColor}
                number={stat.cardNumber}
                value={stat.value ?? ''}
                label={stat.label ?? ''}
                sub={stat.sub}
                className="h-full"
              />
            </motion.div>
          );
        })}

        {heroSliderStats.length > 0 && (
          <motion.div variants={statCard} whileHover={{ y: -4 }}>
            <SliderStatCard
              theme="green"
              number={String(heroStats.length + 1).padStart(2, '0')}
              stats={heroSliderStats}
              accentColor="#81C34D"
              className="h-full"
            />
          </motion.div>
        )}
      </motion.div>
    </GlassHero>
  );
}
