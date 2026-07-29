"use client";

import { ArrowUpRight } from 'lucide-react';

export type StepTheme = 'light' | 'cyan' | 'green' | 'dark';

interface StepCardProps {
  index: string;
  title: string;
  desc: string;
  range?: string;
  theme?: StepTheme;
  className?: string;
}

const SURFACE: Record<StepTheme, string> = {
  light: 'bg-gradient-to-br from-white to-[#F3FAF6] border border-gray-200 hover:border-brand-primary/25',
  cyan: 'bg-brand-cyan border border-white/10 hover:border-white/30 shadow-md',
  green: 'bg-brand-primary border border-white/10 hover:border-white/30 shadow-md',
  dark: 'bg-[#02100d] border border-[#144D3F] hover:border-brand-accent/40 shadow-md',
};

const TEXT: Record<StepTheme, { index: string; title: string; desc: string; line: string; arrow: string }> = {
  light: { index: 'text-gray-300', title: 'text-brand-dark', desc: 'text-gray-500', line: 'rgba(0,167,136,0.3)', arrow: '#00A788' },
  cyan: { index: 'text-white/50', title: 'text-white', desc: 'text-white/70', line: 'rgba(255,255,255,0.3)', arrow: '#ffffff' },
  green: { index: 'text-white/50', title: 'text-white', desc: 'text-white/70', line: 'rgba(255,255,255,0.3)', arrow: '#ffffff' },
  dark: { index: 'text-white/40', title: 'text-white', desc: 'text-white/60', line: 'rgba(129,195,77,0.4)', arrow: '#81C34D' },
};

export default function StepCard({ index, title, desc, range, theme = 'light', className = '' }: StepCardProps) {
  const c = TEXT[theme];
  return (
    <div className={`relative overflow-hidden flex flex-col rounded-[6px] p-6 min-h-[220px] will-change-transform transition-all duration-300 cursor-default hover:-translate-y-1 ${SURFACE[theme]} ${className}`}>
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-white/[0.06] to-transparent pointer-events-none rounded-bl-full" />

      <div className="flex items-start justify-between mb-4">
        <span className={`text-[10px] font-bold font-mono uppercase tracking-widest ${c.index}`}>
          {index}{range && <span className="ml-1 opacity-70">· {range}</span>}
        </span>
        <ArrowUpRight size={13} className="ml-auto" style={{ color: c.arrow }} />
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <h3 className={`text-lg font-bold font-sans leading-tight mb-2 ${c.title}`}>{title}</h3>
        <p className={`text-sm leading-relaxed font-sans ${c.desc}`}>{desc}</p>
      </div>

      <div className="h-px w-full mt-4" style={{ backgroundColor: c.line }} />
    </div>
  );
}
