"use client";

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import type { ContactDownloadCtaSection } from '@/lib/strapi-contact-types';

type ContactDownloadCtaProps = Omit<ContactDownloadCtaSection, '__component' | 'id'>;

export default function ContactDownloadCta({
  eyebrow,
  heading,
  description,
  ctaLabel,
  fileHref,
  downloadFileName,
  backgroundImage,
  backgroundImage_alt_text,
}: ContactDownloadCtaProps) {
  return (
    <div className="relative z-10 w-full">
      <div className="min-h-[460px] relative flex items-center justify-center group overflow-hidden">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt={backgroundImage_alt_text ?? ''}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          />
        )}
        <div className="absolute inset-0 bg-brand-dark/70 group-hover:bg-brand-dark/65 transition-colors z-10" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 text-center max-w-2xl px-6 flex flex-col items-center"
        >
          <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">
            {eyebrow}
          </span>
          <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">{heading}</h3>
          <p className="text-white/75 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl">{description}</p>
          {ctaLabel && fileHref && (
            <motion.a
              href={fileHref}
              download={downloadFileName}
              whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#051F1A' }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-accent text-brand-dark px-8 py-4 rounded-[6px] flex items-center gap-3 font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-accent/25 transition-all duration-300 font-sans cursor-pointer focus:outline-none"
            >
              <Download size={16} />
              {ctaLabel}
            </motion.a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
