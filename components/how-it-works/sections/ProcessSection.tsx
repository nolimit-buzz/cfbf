'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import type { HowItWorksProcessSection } from '@/lib/strapi-how-it-works-types';

type Props = Omit<HowItWorksProcessSection, '__component'>;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

export default function ProcessSection(props: Props) {
  const steps = props.steps ?? [];

  return (
    <div
      id="process"
      data-rag-chunk="how-it-works-timeline-process"
      className="scroll-mt-24 bg-[#051F1A] text-white py-24 relative z-10 border-t border-white/5"
    >
      <div className="absolute top-[10vh] right-0 w-1/4 h-1/4 bg-[#81C34D]/4 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-[#00A788]/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        <motion.div {...fadeUp(0)}>
          <SectionHeader
            sub={props.eyebrow ?? ''}
            title={
              <>
                {props.headingPartOne} <span className="text-[#9BB7B1]">{props.headingHighlight}</span>
              </>
            }
            dark={true}
          />
          <p className="text-gray-400 text-base leading-relaxed font-light max-w-2xl mt-4">{props.intro}</p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 mt-16 pl-6 md:pl-10 space-y-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id ?? idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative group text-left"
            >
              <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#051F1A] border-2 border-white/20 group-hover:border-[#81C34D] transition-colors duration-300 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-400 group-hover:text-white font-mono">
                {step.step}
              </div>
              <div className="bg-white/[0.01] border border-white/5 p-5 md:p-6 rounded-[6px] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300">
                <h4 className="font-bold text-base md:text-lg text-white font-sans mb-2 group-hover:text-[#81C34D] transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
