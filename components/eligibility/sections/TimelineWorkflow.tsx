'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, ArrowLeft, FileText, Activity, UserCheck, FolderCheck, Search, Clock, ShieldCheck, Check, Zap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import type { EligibilityTimelineWorkflowSection } from '@/lib/strapi-eligibility-types';

type Props = Omit<EligibilityTimelineWorkflowSection, '__component'>;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

const STEP_ICONS = [FileText, Activity, UserCheck, FolderCheck, Search, Clock, ShieldCheck, Check, Zap];

const orderClasses = [
  'md:order-1',
  'md:order-2',
  'md:order-3',
  'md:order-6',
  'md:order-5',
  'md:order-4',
  'md:order-7',
  'md:order-8',
  'md:order-9',
];

function renderDesktopArrow(idx: number) {
  const baseArrowClass =
    'hidden md:flex absolute items-center justify-center text-[#81C34D] z-20 pointer-events-none';
  if (idx === 0 || idx === 1 || idx === 6 || idx === 7) {
    return (
      <div className={`${baseArrowClass} top-1/2 -right-7 -translate-y-1/2`}>
        <ArrowRight size={20} />
      </div>
    );
  }
  if (idx === 2 || idx === 5) {
    return (
      <div className={`${baseArrowClass} left-1/2 -bottom-10 -translate-x-1/2`}>
        <ArrowDown size={20} />
      </div>
    );
  }
  if (idx === 3 || idx === 4) {
    return (
      <div className={`${baseArrowClass} top-1/2 -left-7 -translate-y-1/2`}>
        <ArrowLeft size={20} />
      </div>
    );
  }
  return null;
}

export default function TimelineWorkflow(props: Props) {
  const steps = props.steps ?? [];

  return (
    <div
      id="process"
      data-rag-chunk="eligibility-timeline-workflow"
      className="bg-brand-dark text-white py-24 relative z-10 border-t border-white/5 scroll-mt-24"
    >
      <div className="absolute top-[10vh] right-0 w-1/4 h-1/4 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1280px]">
        <motion.div {...fadeUp(0)} className="mb-28">
          <SectionHeader
            sub={props.eyebrow ?? ''}
            title={
              <>
                {props.headingPartOne} <span className="text-[#9BB7B1]">{props.headingHighlight}</span>
              </>
            }
            dark={true}
          />
        </motion.div>

        {/* Serpentine 3x3 Grid flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-x-12 md:gap-y-12 relative mt-16">
          {steps.map((step: any, idx: number) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length] ?? FileText;
            const orderClass = orderClasses[idx] ?? '';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className={`relative flex flex-col justify-between ${orderClass}`}
              >
                <div className="bg-[#031411] border border-white/10 p-6 rounded-[6px] hover:border-white/20 hover:bg-[#06241e] transition-all duration-300 shadow-md h-full flex gap-4 items-start text-left group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-brand-primary group-hover:text-[#81C34D] group-hover:border-[#81C34D] transition-colors duration-300">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#81C34D]/70 font-semibold tracking-wider block">
                      {props.stepLabelPrefix} {step.stepNumber}
                    </span>
                    <h4 className="font-bold text-sm text-white font-sans">{step.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Desktop Serpentine Arrows */}
                {renderDesktopArrow(idx)}

                {/* Mobile Down Arrows */}
                {idx < steps.length - 1 && (
                  <div className="flex md:hidden justify-center my-2 text-[#81C34D]">
                    <ArrowDown size={18} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
