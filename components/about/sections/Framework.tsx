"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Briefcase, ArrowUpRight } from 'lucide-react';
import { EASE, fadeUp } from '@/components/about/motion';
import type { FrameworkSection } from '@/lib/strapi-about-types';

type FrameworkProps = Omit<FrameworkSection, '__component'>;

/**
 * Accent colour and watermark icon per card slot — bespoke styling with no CMS
 * field, so it stays in code and is keyed by position. Extra cards added by an
 * editor cycle back through the list.
 */
const CARD_STYLES = [
  { color: '#009FD4', Icon: Briefcase },
  { color: '#00A788', Icon: ShieldCheck },
  { color: '#81C34D', Icon: Globe },
];

export default function Framework({
  eyebrow,
  headingPrimary,
  headingSecondary,
  intro,
  cards,
}: FrameworkProps) {
  return (
    <section id="framework" className="pt-24 bg-white relative z-10">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid md:grid-cols-2 gap-10 xl:gap-20 items-end mb-16">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono">
                {eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark font-sans tracking-tight leading-[1.1]">
              {headingPrimary}
              <span className="text-[#7C9590]">{headingSecondary}</span>
            </h2>
          </motion.div>
          <motion.p {...fadeUp(0.08)} className="text-gray-500 leading-relaxed font-sans pb-2">
            {intro}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(cards ?? []).map((card, index) => {
            const style = CARD_STYLES[index % CARD_STYLES.length];

            return (
              <motion.div
                key={card.id ?? index}
                {...fadeUp(index * 0.07)}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative rounded-[6px] overflow-hidden flex flex-col justify-between h-[360px] sm:h-[400px] group border border-white/10 transition-all duration-300 cursor-default"
              >
                {card.bgImage && (
                  <img
                    src={card.bgImage}
                    alt={card.bgImage_alt_text ?? card.title ?? ''}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-[#051F1A]/92 group-hover:bg-[#051F1A]/85 transition-colors duration-300" />

                {/* Top bar & Fixed Header (always in place) */}
                <div className="relative z-10 p-8 pt-12 sm:pt-16 pb-0 flex flex-col justify-start h-full text-left">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-light font-mono text-white/30 leading-none">
                      {card.cardNumber}
                    </span>
                    <ArrowUpRight size={14} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <h3
                    className="text-xl font-bold font-sans group-hover:!text-white transition-colors duration-300"
                    style={{ color: style.color }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Static gradient background overlay under text */}
                <div className="absolute bottom-0 left-0 right-0 h-[220px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />

                {/* Bottom sliding block wrapper (description & tag) */}
                <div className="absolute bottom-8 left-8 right-8 overflow-hidden h-[180px] z-10">
                  <div className="translate-y-[134px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] flex flex-col text-left">
                    <p className="text-gray-300 text-sm leading-relaxed font-sans font-light mb-6">{card.body}</p>
                    {card.tag && (
                      <div>
                        <span
                          className="inline-flex text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-[6px] border bg-white/5"
                          style={{ color: style.color, borderColor: `${style.color}30` }}
                        >
                          {card.tag}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
