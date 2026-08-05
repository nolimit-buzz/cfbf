"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ContactNextStepsSection } from '@/lib/strapi-contact-types';

type ContactNextStepsProps = Omit<ContactNextStepsSection, '__component' | 'id'>;

export default function ContactNextSteps({ eyebrow, headingPartOne, headingItalic }: ContactNextStepsProps) {
  return (
    <>
      <section className="mt-24 pt-12 pb-6 bg-[#051F1A] text-white relative z-10 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6 max-w-[1280px]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#81C34D]" />
            <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-mono">{eyebrow}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {headingPartOne}
            <span className="text-[#9BB7B1] italic font-serif">{headingItalic}</span>
          </h2>
        </motion.div>
      </section>

      <section className="bg-[#3da58a] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="max-w-[1280px] mx-auto px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            <Link
              href="/projects"
              className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">
                  Portfolio
                </span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">
                    Browse portfolio
                  </h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">
                    Discover how our credit wraps support developers
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>

            <Link
              href="/how-it-works"
              className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">
                  Architecture
                </span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">
                    Learn how it works
                  </h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">
                    Understand our blending process & structures
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>

            <Link
              href="/impact"
              className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">
                  Impact
                </span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">
                    View our impact
                  </h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">
                    Explore carbon targets and video stories
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
