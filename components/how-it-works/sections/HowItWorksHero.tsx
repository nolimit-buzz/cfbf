'use client';

import { motion } from 'framer-motion';
import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import StepCard, { StepTheme } from '@/components/ui/StepCard';
import type { HowItWorksHeroSection } from '@/lib/strapi-how-it-works-types';

type Props = Omit<HowItWorksHeroSection, '__component'>;

export default function HowItWorksHero(props: Props) {
  const steps = props.steps ?? [];

  return (
    <GlassHero
      title={
        <>
          {props.headingPartOne} <span className="text-[#9BB7B1]">{props.headingHighlight}</span>
        </>
      }
      subtitle={props.eyebrow ?? ''}
      bgImage={props.backgroundImage ?? ''}
      currentPage={props.breadcrumbLabel ?? 'how-it-works'}
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
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={heroRowVariants}
        initial="hidden"
        animate="show"
      >
        {steps.map((s, idx) => (
          <motion.a
            key={s.id ?? idx}
            href={props.stepCardHref ?? '#process'}
            variants={heroCardVariants}
            whileHover={{ y: -4 }}
            className="block h-full focus:outline-none"
            aria-label={`${s.title} ${props.stepCardAriaSuffix ?? ''}`}
          >
            <StepCard
              index={s.index ?? ''}
              range={s.range}
              title={s.title ?? ''}
              desc={s.desc ?? ''}
              theme={(s.theme as StepTheme) ?? 'light'}
              className="h-full"
            />
          </motion.a>
        ))}
      </motion.div>
    </GlassHero>
  );
}
