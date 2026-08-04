"use client";

import { useState, useEffect, type ComponentType } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Coins, Zap, ArrowRight } from 'lucide-react';
import { EASE, fadeUp } from '@/components/about/motion';
import type { CapitalStackSection } from '@/lib/strapi-about-types';

type CapitalStackProps = Omit<CapitalStackSection, '__component'>;

const MIN_SIZE = 5;
const MAX_SIZE = 30;

/** Icon + colour per stack layer — bespoke styling, keyed by position. */
const SEGMENT_STYLES: {
  Icon: ComponentType<{ size?: number }>;
  card: string;
  badge: string;
  title: string;
  amount: string;
}[] = [
  {
    Icon: ShieldCheck,
    card: 'border-gray-100/70 hover:border-gray-200/50',
    badge: 'bg-[#051F1A]/10 text-[#051F1A]',
    title: 'text-brand-dark',
    amount: 'text-brand-dark',
  },
  {
    Icon: Coins,
    card: 'border-brand-primary/10 hover:border-brand-primary/20',
    badge: 'bg-brand-primary/10 text-brand-primary',
    title: 'text-brand-primary',
    amount: 'text-brand-primary',
  },
  {
    Icon: Zap,
    card: 'border-[#009FD4]/10 hover:border-[#009FD4]/20',
    badge: 'bg-[#009FD4]/10 text-[#009FD4]',
    title: 'text-[#009FD4]',
    amount: 'text-brand-dark',
  },
];

/** Bar colours, top (senior) to bottom (equity). */
const BAR_STYLES = [
  { fill: 'bg-[#051F1A]', border: 'border-white/10', value: 'text-white', label: 'text-gray-300' },
  { fill: 'bg-[#00A788]', border: 'border-white/5', value: 'text-white', label: 'text-white/95' },
  { fill: 'bg-[#009FD4]', border: 'border-white/5', value: 'text-white', label: 'text-white/95' },
];

/** "60%" -> 0.6; anything unparseable contributes nothing to the stack. */
function toFraction(percent?: string): number {
  const parsed = parseFloat((percent ?? '').replace('%', ''));
  return Number.isNaN(parsed) ? 0 : parsed / 100;
}

export default function CapitalStack({
  eyebrow,
  headingPrimary,
  headingSecondary,
  collapsedBody,
  expandedBody,
  launchLabel,
  collapseLabel,
  sliderLabel,
  sliderUnitLabel,
  minLabel,
  maxLabel,
  wrapBadge,
  totalLabel,
  totalSuffix,
  segments,
  bars,
}: CapitalStackProps) {
  const searchParams = useSearchParams();
  const [projectSize, setProjectSize] = useState<number>(15);
  const [isSimulatorExpanded, setIsSimulatorExpanded] = useState(false);

  // Deep linking projectSize parameter
  useEffect(() => {
    const sizeParam = searchParams.get('projectSize');
    if (sizeParam) {
      const parsed = parseFloat(sizeParam);
      if (!isNaN(parsed) && parsed >= MIN_SIZE && parsed <= MAX_SIZE) {
        setProjectSize(parsed);
      }
    }
  }, [searchParams]);

  const stackBars = bars ?? [];
  const heading = (
    <h3 className="text-xl md:text-2xl font-bold text-brand-dark tracking-tight mb-2">
      {headingPrimary}
      <span className="text-[#7C9590] italic font-serif">{headingSecondary}</span>
    </h3>
  );

  return (
    <section className="pb-24 bg-white relative z-10">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Collapsible Simulator Call to Action Card */}
        <motion.div
          layout
          {...fadeUp(0.15)}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-16 bg-white border border-gray-100/70 rounded-[12px] p-6 md:p-8 text-left relative overflow-hidden"
        >
          {/* Background decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/[0.01] rounded-full blur-[80px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSimulatorExpanded ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-6 bg-brand-primary" />
                    <span className="text-brand-primary text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                      {eyebrow}
                    </span>
                  </div>
                  {heading}
                  <p className="text-gray-400 text-xs leading-relaxed font-sans font-light">{collapsedBody}</p>
                </div>
                <button
                  onClick={() => setIsSimulatorExpanded(true)}
                  className="shrink-0 inline-flex items-center justify-center gap-2 border border-gray-200/70 hover:border-brand-primary hover:bg-[#F3FAF6] text-brand-dark px-6 py-3 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans select-none focus:outline-none"
                >
                  {launchLabel} <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-gray-50 pb-6">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-px w-6 bg-brand-primary" />
                      <span className="text-brand-primary text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                        {eyebrow}
                      </span>
                    </div>
                    {heading}
                    <p className="text-gray-400 text-xs leading-relaxed font-sans font-light">{expandedBody}</p>
                  </div>
                  <button
                    onClick={() => setIsSimulatorExpanded(false)}
                    className="shrink-0 inline-flex items-center justify-center gap-2 border border-gray-200/70 hover:border-brand-primary hover:bg-[#FAFDFB] text-brand-dark px-6 py-3 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans select-none focus:outline-none"
                  >
                    {collapseLabel}
                  </button>
                </div>

                {/* Simulator Grid */}
                <div className="grid lg:grid-cols-12 gap-10 items-stretch">

                  {/* Controls & Metrics */}
                  <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                    <div>
                      {/* Slider Control */}
                      <div className="bg-white border border-gray-100/70 rounded-[6px] p-6 mb-6">
                        <div className="flex justify-between items-baseline mb-4">
                          <label className="text-xs font-bold font-mono text-gray-500 uppercase tracking-wider">
                            {sliderLabel}
                          </label>
                          <div className="text-3xl font-extrabold text-brand-dark tracking-tight">
                            ₦{projectSize.toFixed(1)}
                            <span className="text-lg font-medium text-gray-400">{sliderUnitLabel}</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min={MIN_SIZE}
                          max={MAX_SIZE}
                          step="1"
                          value={projectSize}
                          onChange={(e) => setProjectSize(Number(e.target.value))}
                          className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#00A788]"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-2">
                          <span>{minLabel}</span>
                          <span>{maxLabel}</span>
                        </div>
                      </div>

                      {/* Segment Explanations */}
                      <div className="space-y-4">
                        {(segments ?? []).map((segment, index) => {
                          const style = SEGMENT_STYLES[index % SEGMENT_STYLES.length];
                          const { Icon } = style;
                          const amount = projectSize * toFraction(stackBars[index]?.percent);

                          return (
                            <div
                              key={segment.id ?? index}
                              className={`flex items-start gap-4 p-4 rounded-[6px] border bg-white transition-all ${style.card}`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${style.badge}`}
                              >
                                <Icon size={16} />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-baseline mb-1">
                                  <h4 className={`text-xs font-bold uppercase tracking-wider ${style.title}`}>
                                    {segment.title}
                                  </h4>
                                  <span className={`text-xs font-bold font-mono ${style.amount}`}>
                                    ₦{amount.toFixed(1)}B
                                  </span>
                                </div>
                                <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                                  {segment.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Stack Visualization */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-[320px] aspect-[4/5] bg-white border border-gray-100/70 rounded-[12px] p-8 flex flex-col justify-end">

                      {/* InfraCredit AAA wrap boundary */}
                      <div className="absolute inset-x-4 top-10 bottom-20 border-2 border-dashed border-[#81C34D] rounded-[6px] pointer-events-none flex items-start justify-center">
                        <div className="bg-[#81C34D] text-[#051F1A] px-3 py-1 text-[8px] font-mono font-bold uppercase tracking-widest rounded-full -mt-2.5 shadow-md flex items-center gap-1">
                          <ShieldCheck size={10} />
                          {wrapBadge}
                        </div>
                      </div>

                      {/* Bar chart area */}
                      <div className="flex-grow flex items-end justify-center w-full relative pt-12 pb-2 h-[260px]">
                        <motion.div
                          layout
                          style={{ height: `${(projectSize / MAX_SIZE) * 100}%` }}
                          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                          className="w-24 flex flex-col justify-end gap-1.5 z-10"
                        >
                          {stackBars.map((bar, index) => {
                            const style = BAR_STYLES[index % BAR_STYLES.length];
                            return (
                              <motion.div
                                key={bar.id ?? index}
                                layout
                                style={{ height: bar.percent }}
                                className={`w-full rounded-[4px] flex flex-col justify-between p-3 cursor-pointer border ${style.fill} ${style.border}`}
                                whileHover={{ scale: 1.02 }}
                              >
                                <span className={`text-[10px] font-bold font-mono leading-none ${style.value}`}>
                                  {bar.percent}
                                </span>
                                <span
                                  className={`text-[8px] font-mono uppercase truncate tracking-wider ${style.label}`}
                                >
                                  {bar.label}
                                </span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </div>

                      {/* Dynamic Label */}
                      <div className="border-t border-gray-150 pt-4 mt-2 text-center">
                        <span className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-widest block">
                          {totalLabel}
                        </span>
                        <span className="text-xl font-bold font-sans text-brand-dark">
                          ₦{projectSize.toFixed(1)}
                          {totalSuffix}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
