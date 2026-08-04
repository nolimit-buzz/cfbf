"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';

import type { EligibilityCtaSection } from '@/lib/strapi-projects-types';

type EligibilityCtaProps = Omit<EligibilityCtaSection, '__component'>;

export default function EligibilityCta({
  eyebrow,
  headingPartOne,
  headingHighlight,
  headingPartTwo,
  body,
  ctaLabel,
  ctaHref,
  backgroundImage,
  backgroundImage_alt_text,
}: EligibilityCtaProps) {
  return (
    <div className="container mx-auto px-6 pt-0 pb-0 relative z-10 text-left">
      <div className="relative z-10 w-full mt-24 border-t border-white/10 pt-20">
        <div className="min-h-[400px] relative flex items-center justify-center group overflow-hidden rounded-[8px] border border-white/5 shadow-2xl">
          {/* Background image */}
          <img
            src={backgroundImage}
            alt={backgroundImage_alt_text ?? ''}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02] pointer-events-none select-none"
          />
          {/* Dark overlay matching about page */}
          <div className="absolute inset-0 bg-[#051F1A]/70 group-hover:bg-[#051F1A]/65 transition-colors pointer-events-none z-10" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 text-center max-w-3xl px-6 flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#81C34D]/10 border border-[#81C34D]/20 flex items-center justify-center mb-6 text-[#81C34D]">
              <ShieldCheck size={24} />
            </div>

            <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">{eyebrow}</span>
            <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
              {headingPartOne}<span className="text-brand-accent">{headingHighlight}</span>{headingPartTwo}
            </h3>

            <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl font-light">
              {body}
            </p>

            <Link
              href={ctaHref ?? '#'}
              className="inline-flex items-center justify-center gap-2 bg-[#81C34D] text-[#051F1A] hover:bg-white hover:text-brand-dark px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans shadow-lg focus:outline-none"
            >
              {ctaLabel} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
