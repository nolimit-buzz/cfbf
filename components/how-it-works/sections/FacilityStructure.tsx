'use client';

import { motion } from 'framer-motion';
import type { HowItWorksFacilityStructureSection } from '@/lib/strapi-how-it-works-types';

type Props = Omit<HowItWorksFacilityStructureSection, '__component'>;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

export default function FacilityStructure(props: Props) {
  return (
    <div data-rag-chunk="how-it-works-facility-architecture" className="bg-[#FAFDFB] text-[#051F1A] py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <motion.div {...fadeUp(0)}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#00A788]" />
            <span className="text-[#00A788] text-xs font-semibold tracking-[0.2em] uppercase font-mono">
              {props.eyebrow}
            </span>
          </div>
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight tracking-tight mb-4">
              {props.headingPartOne} <span className="text-[#7C9590]">{props.headingHighlight}</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed font-light">{props.body}</p>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.12)} className="bg-white rounded-[8px] border border-gray-100 shadow-lg p-6 md:p-10 overflow-x-auto">
          <div className="flex justify-center">
            <img
              src={props.diagramSrc}
              alt={props.diagramAlt ?? props.diagramSrc_alt_text ?? ''}
              className="w-full max-w-4xl h-auto"
              loading="lazy"
              style={{ minWidth: 360 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
