"use client";

import React from 'react';

import type { PhilosophySection } from '@/lib/strapi-impact-types';

type ImpactPhilosophyProps = Omit<PhilosophySection, '__component'>;

export default function ImpactPhilosophy({
  eyebrow,
  headingPartOne,
  headingHighlight,
  bodyPartOne,
  bodyPartTwo,
  pillars,
}: ImpactPhilosophyProps) {
  return (
    <section className="py-20 bg-white relative z-10 border-b border-gray-100/40">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 text-left">
            <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono block mb-2">
              {eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark font-sans tracking-tight leading-tight mb-6">
              {headingPartOne}<span className="text-[#7C9590]">{headingHighlight}</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6 font-light font-sans">
              {bodyPartOne}
            </p>
            <p className="text-gray-500 text-base leading-relaxed font-light font-sans">
              {bodyPartTwo}
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {(pillars ?? []).map((pillar, idx) => (
              <div
                key={pillar.id ?? idx}
                className="bg-[#FAFDFB] border border-gray-100/70 p-6 rounded-[6px] text-left flex flex-col justify-between min-h-[160px] hover:border-brand-primary/20 transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-primary/40 block mb-3">/ {pillar.number}</span>
                  <h4 className="text-sm font-bold text-brand-dark font-sans mb-2">{pillar.title}</h4>
                  <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
