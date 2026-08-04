"use client";

import { Fragment, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Building2, Users, Landmark, Briefcase } from 'lucide-react';
import { fadeUp } from '@/components/about/motion';
import type { MarketSection } from '@/lib/strapi-about-types';

type MarketOpportunityProps = Omit<MarketSection, '__component'>;

interface CardStyle {
  /** Grid placement + surface colours. */
  wrapper: string;
  value: string;
  eyebrow: string;
  description: string;
  /** Watermark icon behind the card. */
  Icon: ComponentType<{ size?: number }>;
  iconWrapper: string;
  iconSize: number;
}

/**
 * Bento styling has no CMS field — the CMS `cards[]` array supplies copy and
 * ordering, this table supplies the look of each slot. Extra cards added by an
 * editor reuse the last style.
 */
const CARD_STYLES: CardStyle[] = [
  {
    wrapper:
      'col-span-2 row-span-2 bg-[#009FD4] text-white p-6 md:p-8 border border-[#009FD4]/10 hover:shadow-[#009FD4]/10',
    value: 'text-5xl md:text-7xl mb-3',
    eyebrow: 'text-white/90',
    description: 'text-xs md:text-sm font-sans text-white/90 block leading-snug max-w-md',
    Icon: TrendingUp,
    iconWrapper: '-bottom-4 -right-4 opacity-[0.05] text-white',
    iconSize: 140,
  },
  {
    wrapper:
      'col-span-1 border border-gray-100 bg-white p-5 md:p-6 shadow-sm hover:border-brand-primary/10',
    value: 'text-3xl md:text-4xl text-brand-dark mb-4',
    eyebrow: 'text-[#7C9590]',
    description: 'text-xs text-gray-500 font-sans leading-snug',
    Icon: Building2,
    iconWrapper: '-bottom-2 -right-2 opacity-[0.03] text-brand-dark',
    iconSize: 80,
  },
  {
    wrapper: 'col-span-1 bg-[#00A788] text-white p-5 md:p-6 shadow-sm hover:shadow-[#00A788]/10',
    value: 'text-3xl md:text-4xl mb-4',
    eyebrow: 'text-white/90',
    description: 'text-xs font-sans text-white/90 block leading-snug',
    Icon: Users,
    iconWrapper: '-bottom-2 -right-2 opacity-[0.06] text-white',
    iconSize: 80,
  },
  {
    wrapper: 'col-span-1 bg-[#051F1A] text-white p-5 md:p-6 shadow-sm hover:shadow-[#051F1A]/20',
    value: 'text-3xl md:text-4xl mb-4',
    eyebrow: 'text-brand-accent',
    description: 'text-xs font-sans text-white/80 block leading-snug',
    Icon: Landmark,
    iconWrapper: '-bottom-2 -right-2 opacity-[0.06] text-white',
    iconSize: 80,
  },
  {
    wrapper: 'col-span-2 bg-[#051F1A] text-white p-5 md:p-6 shadow-sm hover:shadow-[#051F1A]/20',
    value: 'text-4xl md:text-5xl lg:text-6xl mb-4',
    eyebrow: 'text-brand-accent',
    description: 'text-xs font-sans text-white/80 block leading-snug max-w-xl',
    Icon: Briefcase,
    iconWrapper: '-bottom-4 -right-4 opacity-[0.06] text-white',
    iconSize: 100,
  },
  {
    wrapper:
      'col-span-2 bg-[#81C34D] text-[#051F1A] p-5 md:p-6 shadow-sm hover:shadow-[#81C34D]/20',
    value: 'text-4xl md:text-5xl lg:text-6xl mb-4',
    eyebrow: 'text-[#051F1A]/70',
    description: 'text-xs font-sans text-[#051F1A]/95 leading-snug max-w-xl',
    Icon: TrendingUp,
    iconWrapper: '-bottom-4 -right-4 opacity-[0.08] text-[#051F1A]',
    iconSize: 100,
  },
];

export default function MarketOpportunity({
  eyebrow,
  headingPrimary,
  headingSecondary,
  bodyOne,
  bodyTwo,
  bentoImage,
  bentoImage_alt_text,
  cards,
}: MarketOpportunityProps) {
  return (
    <section
      id="market"
      data-rag-chunk="about-market-thesis-v3"
      className="py-24 bg-white relative z-10 border-b border-gray-100 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-[1280px] relative z-10 w-full">
        {/* Header row */}
        <motion.div {...fadeUp(0)} className="text-left mb-12 space-y-4">
          <div>
            <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono block mb-2">
              {eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark font-sans tracking-tight leading-tight">
              {headingPrimary}
              <span className="text-[#7C9590] italic font-serif">{headingSecondary}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <p className="text-gray-500 text-sm leading-relaxed">{bodyOne}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{bodyTwo}</p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          {...fadeUp(0.08)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[minmax(150px,auto)] md:auto-rows-[160px]"
        >
          {(cards ?? []).map((card, index) => {
            const style = CARD_STYLES[index] ?? CARD_STYLES[CARD_STYLES.length - 1];
            const { Icon } = style;

            return (
              // The image-only slot lives on the section, not in `cards[]`, and
              // always sits between the first and second card.
              <Fragment key={card.id ?? index}>
                <div
                  className={`flex flex-col justify-between rounded-[8px] relative overflow-hidden group transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg text-left ${style.wrapper}`}
                >
                  <div
                    className={`absolute group-hover:scale-105 transition-transform duration-500 pointer-events-none ${style.iconWrapper}`}
                  >
                    <Icon size={style.iconSize} />
                  </div>
                  <div>
                    <span className={`font-bold font-mono leading-none tracking-tight block ${style.value}`}>
                      {card.value}
                    </span>
                    {card.eyebrow && (
                      <span
                        className={`text-[9px] font-bold font-mono uppercase tracking-widest block mb-1 ${style.eyebrow}`}
                      >
                        {card.eyebrow}
                      </span>
                    )}
                    {card.description && <span className={style.description}>{card.description}</span>}
                  </div>
                  {card.footer && (
                    <div className="pt-4 border-t border-white/20 text-[11px] md:text-xs text-white/75 font-sans leading-relaxed mt-4">
                      {card.footer}
                    </div>
                  )}
                </div>

                {index === 0 && bentoImage && (
                  <div
                    className="col-span-1 rounded-[8px] overflow-hidden border border-gray-100 shadow-sm h-full group relative transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg"
                  >
                    <img
                      src={bentoImage}
                      alt={bentoImage_alt_text ?? ''}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-brand-dark/10" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
