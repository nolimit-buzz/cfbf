"use client";

import { motion } from 'framer-motion';
import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import StepCard, { StepTheme } from '@/components/ui/StepCard';
import type { ContactHeroSection } from '@/lib/strapi-contact-types';

type ContactHeroProps = Omit<ContactHeroSection, '__component' | 'id'>;

const heroCards: { index: string; title: string; desc: string; theme: StepTheme }[] = [
  {
    index: '01',
    title: 'Developer Intake',
    desc: 'Submit off-grid mini-grid, telecom, or agri-processing project profiles.',
    theme: 'light',
  },
  {
    index: '02',
    title: 'Investor Relations',
    desc: 'Co-finance green tranches and explore local currency credit enhancements.',
    theme: 'cyan',
  },
  {
    index: '03',
    title: 'Donor Partnership',
    desc: 'Blend concessional funds to de-risk sustainable clean energy projects.',
    theme: 'green',
  },
];

export default function ContactHero({
  breadcrumbLabel,
  eyebrow,
  headingPartOne,
  headingHighlight,
  description,
  backgroundImage,
}: ContactHeroProps) {
  return (
    <GlassHero
      title={
        <>
          {headingPartOne}
          <span className="text-[#9BB7B1]">{headingHighlight}</span>
        </>
      }
      subtitle={eyebrow}
      bgImage={backgroundImage ?? ''}
      currentPage={breadcrumbLabel ?? 'contact'}
      description={<p>{description}</p>}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={heroRowVariants}
        initial="hidden"
        animate="show"
      >
        {heroCards.map((card) => (
          <motion.div key={card.index} variants={heroCardVariants} whileHover={{ y: -4 }}>
            <StepCard index={card.index} title={card.title} desc={card.desc} theme={card.theme} className="h-full" />
          </motion.div>
        ))}
      </motion.div>
    </GlassHero>
  );
}
