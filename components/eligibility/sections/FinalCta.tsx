'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Download, FolderCheck } from 'lucide-react';
import type { EligibilityFinalCtaSection } from '@/lib/strapi-eligibility-types';

type Props = Omit<EligibilityFinalCtaSection, '__component'>;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function FinalCta(props: Props) {
  const router = useRouter();

  const handlePrimaryClick = () => {
    if (props.primaryCtaHref) {
      router.push(props.primaryCtaHref);
    }
  };

  return (
    <div className="relative z-10 w-full">
      <div className="min-h-[460px] relative flex items-center justify-center group overflow-hidden">
        <img
          src={props.backgroundImage}
          alt={props.backgroundImage_alt_text || 'Background'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-brand-dark/70 group-hover:bg-brand-dark/65 transition-colors z-10" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-20 text-center max-w-3xl px-6 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#81C34D]/10 border border-[#81C34D]/20 flex items-center justify-center mb-6 text-[#81C34D]">
            <FolderCheck size={24} />
          </div>

          <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">
            {props.eyebrow}
          </span>
          <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
            {props.headingPartOne} <span className="text-brand-accent">{props.headingHighlight}</span>
          </h3>

          <p className="text-white/75 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            {props.body}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <button
              onClick={handlePrimaryClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#81C34D] text-brand-dark hover:bg-white hover:text-brand-dark px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans shadow-lg cursor-pointer select-none focus:outline-none"
            >
              {props.primaryCtaLabel} <ArrowRight size={16} />
            </button>
            <a
              href={props.downloadCtaHref}
              download={props.downloadFileName}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-[#81C34D] hover:bg-[#81C34D] hover:text-brand-dark text-white px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans shrink-0 focus:outline-none"
            >
              <Download size={14} /> {props.downloadCtaLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
