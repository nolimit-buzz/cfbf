"use client";

import React from 'react';
import { motion } from 'framer-motion';

import type {
  FootprintMapSection,
  LgaModalSection,
} from '@/lib/strapi-projects-types';
import FootprintMap from '@/components/projects/FootprintMap';

/**
 * Section chrome around the interactive map. The map widget owns its own header
 * and the LGA modal, so this only supplies the anchor the "National Footprint"
 * tab scrolls to, plus the scroll-in animation.
 */
type FootprintSectionProps = Omit<FootprintMapSection, '__component'> & {
  lgaModal?: Omit<LgaModalSection, '__component'>;
};

export default function FootprintSection(props: FootprintSectionProps) {
  return (
    <div className="container mx-auto px-6 pt-0 pb-0 relative z-10 text-left">
      <motion.section
        id="national-footprint"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 border-t border-white/10 pt-16"
      >
        <FootprintMap {...props} />
      </motion.section>
    </div>
  );
}
