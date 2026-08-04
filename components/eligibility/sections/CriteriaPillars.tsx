'use client';

import { motion } from 'framer-motion';
import { Zap, ScrollText, ShieldCheck, Building2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import type { EligibilityCriteriaPillarsSection } from '@/lib/strapi-eligibility-types';

type Props = Omit<EligibilityCriteriaPillarsSection, '__component'>;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

const CARD_ICONS = [Zap, ScrollText, ShieldCheck, Building2];

export default function CriteriaPillars(props: Props) {
  const cards = props.cards ?? [];

  const renderCardIcon = (idx: number) => {
    const Icon = CARD_ICONS[idx] ?? Zap;
    return <Icon size={18} />;
  };

  return (
    <div data-rag-chunk="eligibility-criteria-pillars" className="bg-[#FAFDFB] text-[#051F1A] py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <motion.div {...fadeUp(0)} className="mb-8">
          <SectionHeader
            sub={props.eyebrow ?? ''}
            title={
              <>
                {props.headingPartOne} <span className="text-[#7C9590]">{props.headingHighlight}</span>
              </>
            }
            dark={false}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {/* Card 0: Technologies & Sectors (Col-span 2) - always dark */}
          {cards[0] && (
            <motion.div
              {...fadeUp(0.04)}
              whileHover={{ y: -4 }}
              className="bg-[#02100d] border border-[#144D3F] text-white p-8 rounded-[6px] shadow-lg flex flex-col justify-between lg:col-span-2 min-h-[260px] relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#81C34D]/5 to-transparent opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#81C34D]/10 border border-[#81C34D]/20 flex items-center justify-center mb-6 text-[#81C34D]">
                  {renderCardIcon(0)}
                </div>
                <h4 className="font-bold text-lg font-sans mb-3">01. {cards[0].heading}</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans max-w-2xl">
                  {cards[0].body}
                </p>
                {cards[0].subNote && (
                  <>
                    <div className="h-px bg-white/10 my-4" />
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">{cards[0].subNote}</p>
                  </>
                )}
              </div>
              {cards[0].footerTag && (
                <span className="text-[9px] font-bold text-brand-primary uppercase tracking-wider font-mono mt-6 relative z-10">
                  {cards[0].footerTag}
                </span>
              )}
            </motion.div>
          )}

          {/* Card 1: Infrastructure Criteria (Col-span 1) - light */}
          {cards[1] && (
            <motion.div
              {...fadeUp(0.08)}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 p-8 rounded-[6px] shadow-sm flex flex-col justify-between min-h-[260px] hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#00A788]/10 border border-[#00A788]/20 flex items-center justify-center mb-6 text-[#00A788]">
                  {renderCardIcon(1)}
                </div>
                <h4 className="font-bold text-base font-sans text-[#051F1A] mb-3">02. {cards[1].heading}</h4>
                {cards[1].listItems && cards[1].listItems.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-gray-500 font-sans list-decimal pl-4 leading-normal">
                    {cards[1].listItems.map((item: any, i: number) => (
                      <li key={i}>{item.text}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">{cards[1].body}</p>
                )}
              </div>
              {cards[1].footerTag && (
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mt-6">
                  {cards[1].footerTag}
                </span>
              )}
            </motion.div>
          )}

          {/* Card 2: Compliance & Scale (Col-span 1) - light */}
          {cards[2] && (
            <motion.div
              {...fadeUp(0.12)}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 p-8 rounded-[6px] shadow-sm flex flex-col justify-between min-h-[260px] hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#009FD4]/10 border border-[#009FD4]/20 flex items-center justify-center mb-6 text-[#009FD4]">
                  {renderCardIcon(2)}
                </div>
                <h4 className="font-bold text-base font-sans text-[#051F1A] mb-3">03. {cards[2].heading}</h4>
                {cards[2].listItems && cards[2].listItems.length > 0 ? (
                  <ul className="space-y-2 text-xs text-gray-500 font-sans">
                    {cards[2].listItems.map((item: any, i: number) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#009FD4] font-bold">•</span> {item.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">{cards[2].body}</p>
                )}
              </div>
              {cards[2].footerTag && (
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mt-6">
                  {cards[2].footerTag}
                </span>
              )}
            </motion.div>
          )}

          {/* Card 3: Capacity & Scale (Col-span 2) - light */}
          {cards[3] && (
            <motion.div
              {...fadeUp(0.16)}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 p-8 rounded-[6px] shadow-sm flex flex-col justify-between lg:col-span-2 min-h-[260px] hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#00A788]/10 border border-[#00A788]/20 flex items-center justify-center mb-6 text-[#00A788]">
                  {renderCardIcon(3)}
                </div>
                <h4 className="font-bold text-base font-sans text-[#051F1A] mb-6">04. {cards[3].heading}</h4>

                {cards[3].stats && cards[3].stats.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
                    {cards[3].stats.map((stat: any, i: number) => (
                      <div key={i}>
                        <span className="text-2xl md:text-3xl font-bold font-mono text-[#051F1A] block">
                          {stat.value}
                        </span>
                        <span className="text-[10px] text-gray-400 font-sans block mt-1">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">{cards[3].body}</p>
                )}
              </div>
              {cards[3].footerTag && (
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mt-6">
                  {cards[3].footerTag}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
