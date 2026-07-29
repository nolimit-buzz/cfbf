"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import CountUp from '@/components/ui/CountUp';

export interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

export type StatTheme = 'light' | 'glass' | 'cyan' | 'green';

interface StatCardProps {
  number?: string;
  value: string;
  label: string;
  sub?: string;
  accentColor?: string;
  className?: string;
  flat?: boolean;
  theme?: StatTheme;
}

interface SliderStatCardProps {
  number?: string;
  stats: StatItem[];
  accentColor?: string;
  className?: string;
  flat?: boolean;
  theme?: StatTheme;
}

const SURFACE: Record<StatTheme, string> = {
  light: 'bg-gradient-to-br from-white to-[#F3FAF6] border border-gray-200 hover:border-brand-primary/25',
  glass: 'bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-white/30 hover:bg-white/[0.1]',
  cyan: 'bg-brand-cyan border border-white/10 hover:border-white/30 shadow-md',
  green: 'bg-brand-primary border border-white/10 hover:border-white/30 shadow-md',
};

const TEXT: Record<StatTheme, { number: string; value: string; label: string; sub: string }> = {
  light: { number: 'text-gray-300', value: 'text-brand-dark', label: 'text-brand-dark', sub: 'text-gray-400' },
  glass: { number: 'text-white/40', value: 'text-white', label: 'text-white', sub: 'text-white/50' },
  cyan: { number: 'text-white/50', value: 'text-white', label: 'text-white', sub: 'text-white/70' },
  green: { number: 'text-white/50', value: 'text-white', label: 'text-white', sub: 'text-white/70' },
};

const DOT_INACTIVE: Record<StatTheme, string> = {
  light: '#E5E7EB',
  glass: 'rgba(255,255,255,0.15)',
  cyan: 'rgba(255,255,255,0.3)',
  green: 'rgba(255,255,255,0.3)',
};

const baseCard = (theme: StatTheme, flat: boolean) =>
  `relative overflow-hidden flex flex-col rounded-[6px] p-6 will-change-transform transition-all duration-300 cursor-default hover:-translate-y-1 ${SURFACE[theme]} ${
    theme === 'light' && !flat ? 'shadow-sm hover:shadow-md' : ''
  }`;

export function StatCard({ number, value, label, sub, accentColor = '#00A788', className = '', flat = false, theme = 'light' }: StatCardProps) {
  const c = TEXT[theme];
  const onColor = theme === 'cyan' || theme === 'green';
  const arrowColor = onColor ? '#ffffff' : accentColor;
  const lineColor = onColor ? 'rgba(255,255,255,0.3)' : `${accentColor}30`;

  return (
    <div className={`${baseCard(theme, flat)} ${className}`}>
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-white/[0.06] to-transparent pointer-events-none rounded-bl-full" />

      <div className="flex items-start justify-between mb-4">
        {number && (
          <span className={`text-[10px] font-bold font-mono uppercase tracking-widest transition-colors ${c.number}`}>
            {number}
          </span>
        )}
        <ArrowUpRight
          size={13}
          className="ml-auto transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
          style={{ color: arrowColor }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className={`text-3xl md:text-4xl font-bold font-mono leading-none mb-3 ${c.value}`}>
          <CountUp value={value} />
        </div>
        <div className={`text-sm font-bold font-sans mb-0.5 ${c.label}`}>{label}</div>
        {sub && <div className={`text-[10px] font-mono uppercase tracking-wider ${c.sub}`}>{sub}</div>}
      </div>

      {/* Bottom accent line */}
      <div className="h-px w-full mt-4" style={{ backgroundColor: lineColor }} />
    </div>
  );
}

export function SliderStatCard({ number, stats, accentColor = '#00A788', className = '', flat = false, theme = 'light' }: SliderStatCardProps) {
  const [idx, setIdx] = useState(0);
  const c = TEXT[theme];
  const onColor = theme === 'cyan' || theme === 'green';
  const arrowColor = onColor ? '#ffffff' : accentColor;
  const lineColor = onColor ? 'rgba(255,255,255,0.3)' : `${accentColor}30`;
  const dotActive = onColor ? '#ffffff' : accentColor;

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % stats.length), 3200);
    return () => clearInterval(timer);
  }, [stats.length]);

  const current = stats[idx];

  return (
    <div className={`${baseCard(theme, flat)} ${className}`}>
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-white/[0.06] to-transparent pointer-events-none rounded-bl-full" />

      <div className="flex items-start justify-between mb-4">
        {number && (
          <span className={`text-[10px] font-bold font-mono uppercase tracking-widest ${c.number}`}>
            {number}
          </span>
        )}
        <ArrowUpRight size={13} className="ml-auto" style={{ color: arrowColor }} />
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`text-3xl md:text-4xl font-bold font-mono leading-none mb-3 ${c.value}`}>
              <CountUp value={current.value} />
            </div>
            <div className={`text-sm font-bold font-sans mb-0.5 ${c.label}`}>{current.label}</div>
            {current.sub && (
              <div className={`text-[10px] font-mono uppercase tracking-wider ${c.sub}`}>{current.sub}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mt-4 mb-1">
        {stats.map((_, i) => (
          <motion.div
            key={i}
            className="h-0.5 flex-1 rounded-full"
            animate={{ backgroundColor: i === idx ? dotActive : DOT_INACTIVE[theme] }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="h-px w-full mt-1" style={{ backgroundColor: lineColor }} />
    </div>
  );
}
