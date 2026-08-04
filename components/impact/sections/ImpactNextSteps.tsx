"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import type { ImpactNextStepsSection } from '@/lib/strapi-impact-types';

type ImpactNextStepsProps = Omit<ImpactNextStepsSection, '__component'>;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

export default function ImpactNextSteps({
  eyebrow,
  headingPartOne,
  headingItalic,
  links,
}: ImpactNextStepsProps) {
  return (
    <>
      <section className="pt-12 pb-6 bg-[#051F1A] text-white relative z-10 border-t border-white/5">
        <motion.div {...fadeUp(0)} className="container mx-auto px-6 max-w-[1280px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-accent" />
            <span className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase font-mono">{eyebrow}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {headingPartOne}<span className="text-[#9BB7B1] italic font-serif">{headingItalic}</span>
          </h2>
        </motion.div>
      </section>

      <section className="bg-[#3da58a] relative z-10">
        <motion.div {...fadeUp(0.08)} className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {(links ?? []).map((link, i) => (
              <Link
                key={link.id ?? i}
                href={link.href ?? '#'}
                className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">
                    {link.eyebrow}
                  </span>
                  <div className="h-8 w-px bg-white/25" />
                  <div>
                    <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">
                      {link.title}
                    </h4>
                    <p className="text-white/65 text-xs font-light mt-0.5 font-sans">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
