"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

import type { InvestmentsTabSection } from '@/lib/strapi-impact-types';

type InvestmentsTabProps = Omit<InvestmentsTabSection, '__component'>;

/** Official UN SDG brand colours, keyed by goal number. */
const SDG_COLOR: Record<number, string> = {
  7: '#FCC30B',
  8: '#A21942',
  9: '#FD6925',
  13: '#3F7E44',
};

export default function InvestmentsTab({
  pillarsHeading,
  pillars,
  sdgHeading,
  sdgCards,
}: InvestmentsTabProps) {
  return (
    <div>
      {/* 4 Pillars Grid */}
      <h3 className="text-sm font-bold font-mono uppercase tracking-[0.25em] text-[#81C34D] mb-6 block text-left">
        {pillarsHeading}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {(pillars ?? []).map((pillar, idx) => (
          <div
            key={pillar.id ?? idx}
            className="group relative bg-[#051F1A] border border-white/10 p-6 pt-10 sm:pt-12 rounded-[8px] flex flex-col justify-between h-[220px] overflow-hidden hover:border-white/20 transition-all duration-300 text-left cursor-default"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-mono font-bold text-brand-accent block mb-3">/ {pillar.number}</span>
              <h4 className="text-sm font-bold text-white font-sans mb-2">{pillar.title}</h4>
            </div>

            {/* Static gradient background overlay under text */}
            <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />

            {/* Text wrapper to restrict clipping above bottom margin */}
            <div className="absolute bottom-6 left-6 right-6 overflow-hidden h-[75px] z-10">
              <div className="translate-y-[52px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                <p className="text-[14px] text-gray-300 font-sans font-light leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SDG Integration Cards */}
      <h3 className="text-sm font-bold font-mono uppercase tracking-[0.25em] text-[#81C34D] mb-6 block text-left">
        {sdgHeading}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(sdgCards ?? []).map((card, idx) => {
          // "SDG 7" -> 7
          const sdgNum = Number.parseInt((card.badgeLabel ?? '').replace(/\D/g, ''), 10);
          const color = SDG_COLOR[sdgNum] ?? '#81C34D';

          // The card border and arrow keep the SDG's own colour (15%, 30% on
          // hover), so they are driven by custom properties rather than static
          // Tailwind classes.
          return (
            <div
              key={card.id ?? idx}
              style={{ '--sdg-color': color, '--sdg-border': `${color}26`, '--sdg-border-hover': `${color}4D` } as React.CSSProperties}
              className="relative rounded-[6px] overflow-hidden flex flex-col justify-between h-[320px] sm:h-[350px] group border border-(--sdg-border) hover:border-(--sdg-border-hover) transition-all duration-300 cursor-default text-left"
            >
              <img
                src={card.image}
                alt={card.image_alt_text ?? card.title ?? ''}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#051F1A]/92 group-hover:bg-[#051F1A]/85 transition-colors duration-300" />

              {/* Top bar & Fixed Header */}
              <div className="relative z-10 p-6 pt-10 sm:pt-12 flex flex-col justify-start h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-light font-mono text-white/30 leading-none">{card.number}</span>
                  <ArrowUpRight size={14} className="text-white/60 transition-colors group-hover:text-(--sdg-color)" />
                </div>
                <h4 className="font-bold text-sm text-white font-sans mb-1.5">{card.title}</h4>
                <div>
                  <span
                    style={{ backgroundColor: color }}
                    className="inline-block text-[8px] font-bold text-white font-mono px-2 py-0.5 rounded-full"
                  >
                    {card.badgeLabel}
                  </span>
                </div>
              </div>

              {/* Static gradient background overlay under text */}
              <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />

              {/* Bottom sliding description wrapper */}
              <div className="absolute bottom-6 left-6 right-6 overflow-hidden h-[95px] z-10">
                <div className="translate-y-[55px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                  <p className="text-[14px] text-gray-300 font-sans leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
