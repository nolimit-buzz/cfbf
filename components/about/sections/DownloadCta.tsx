"use client";

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { fadeUp } from '@/components/about/motion';
import type { DownloadCtaSection } from '@/lib/strapi-about-types';

type DownloadCtaProps = Omit<DownloadCtaSection, '__component'>;

export default function DownloadCta({
  eyebrow,
  heading,
  body,
  backgroundImage,
  backgroundImage_alt_text,
  buttonLabel,
  buttonHref,
  downloadFileName,
}: DownloadCtaProps) {
  return (
    <div data-rag-chunk="about-download-cta" className="relative z-10">
      <div className="min-h-[460px] relative flex items-center justify-center group overflow-hidden">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt={backgroundImage_alt_text ?? ''}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          />
        )}
        <div className="absolute inset-0 bg-brand-dark/70 group-hover:bg-brand-dark/65 transition-colors z-10" />
        <motion.div {...fadeUp(0)} className="relative z-20 text-center max-w-2xl px-6 flex flex-col items-center">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">
            {eyebrow}
          </span>
          <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">{heading}</h3>
          <p className="text-white/75 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl">{body}</p>
          {buttonLabel && buttonHref && (
            <motion.a
              href={buttonHref}
              download={downloadFileName}
              whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#051F1A' }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-accent text-brand-dark px-8 py-4 rounded-[6px] flex items-center gap-3 font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-accent/25 transition-all duration-300 font-sans cursor-pointer"
            >
              <Download size={16} />
              {buttonLabel}
            </motion.a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
