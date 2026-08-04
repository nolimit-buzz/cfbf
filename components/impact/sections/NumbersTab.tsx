"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Zap, Leaf, Wifi } from 'lucide-react';

import type { NumbersTabSection } from '@/lib/strapi-impact-types';

type NumbersTabProps = Omit<NumbersTabSection, '__component'>;

// SVG Wheel polar and arc helpers for Net Zero display
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arc(cx: number, cy: number, r: number, a1: number, a2: number) {
  const s = polar(cx, cy, r, a1);
  const e = polar(cx, cy, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

const AX = 180, AY = 170, AR = 135;
const A_START = -135, A_END = 135;
const PROGRESS = 0.16;
const wp2022 = polar(AX, AY, AR, A_START + 270 * 0.156);
const wp2030 = polar(AX, AY, AR, A_START + 270 * 0.333);
const wp2060 = polar(AX, AY, AR, A_END);

/**
 * Icon and accent colour per metric tile, in authored order — presentation, not
 * copy. The wheel's three timeline points use the same ordered treatment.
 */
const METRIC_STYLE = [
  { icon: <Zap />, color: '#00A788' },
  { icon: <Leaf />, color: '#81C34D' },
  { icon: <Users />, color: '#FF4A6B' },
  { icon: <Wifi />, color: '#009FD4' },
];

const TIMELINE_STYLE = [
  { point: wp2022, color: '#00A788', filled: true },
  { point: wp2030, color: '#009FD4', filled: false },
  { point: wp2060, color: '#81C34D', filled: false },
];

const IconStatBox: React.FC<{
  icon: React.ReactNode;
  label?: string;
  value?: string;
  unit?: string;
  description?: string;
  iconColor: string;
  delay?: number;
}> = ({ icon, label, value, unit, description, iconColor, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-60px" }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    whileHover={{ y: -4, scale: 1.01 }}
    className="relative flex flex-col justify-between p-5 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[6px] min-h-[180px] group cursor-default will-change-transform transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] shadow-lg text-left"
  >
    <div className="flex justify-between items-start">
      <span className="text-gray-300 text-[9px] font-bold uppercase tracking-[0.2em] font-mono block truncate max-w-[80%]">
        {label}
      </span>
      <div style={{ color: iconColor }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 [&>svg]:w-5 [&>svg]:h-5 animate-none">
        {icon}
      </div>
    </div>

    <div className="my-3 flex items-baseline flex-wrap">
      <span className="text-2xl md:text-3xl font-light text-white font-sans tracking-tight">
        {value}
      </span>
      {unit && (
        <span className="text-xs text-gray-400 ml-1 font-light font-sans">{unit}</span>
      )}
    </div>

    <p className="text-gray-300 text-[14px] leading-relaxed font-sans font-light mt-auto">
      {description}
    </p>
  </motion.div>
);

export default function NumbersTab({
  metrics,
  wheelCenterYear,
  wheelCenterLabel,
  wheelProgressLabel,
  timelinePoints,
  etpLabel,
  etpBody,
  pensionLabel,
  pensionTargetValue,
  pensionCurrentLabel,
  pensionTargetLabel,
}: NumbersTabProps) {
  const points = timelinePoints ?? [];

  return (
    <div>
      {/* Metric Box Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {(metrics ?? []).map((metric, i) => {
          const style = METRIC_STYLE[i] ?? METRIC_STYLE[METRIC_STYLE.length - 1];
          return (
            <IconStatBox
              key={metric.id ?? i}
              icon={style.icon}
              iconColor={style.color}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              description={metric.description}
              delay={0.05 * (i + 1)}
            />
          );
        })}
      </div>

      {/* Transition Dial & Penetrability indicator row */}
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">

        {/* Left Column: Progress Wheel */}
        <div className="flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-[12px] p-8 text-center md:text-left">
          <div className="relative mb-6">
            <svg viewBox="0 0 360 300" className="w-full max-w-sm mx-auto md:mx-0" style={{ overflow: 'visible' }}>
              {[-90, -45, 0, 45, 90].map(a => {
                const inner = polar(AX, AY, 40, a);
                const outer = polar(AX, AY, 148, a);
                return <line key={a} x1={inner.x.toFixed(1)} y1={inner.y.toFixed(1)} x2={outer.x.toFixed(1)} y2={outer.y.toFixed(1)} stroke="#00A788" strokeWidth="1" opacity="0.15" />;
              })}
              {[50, 90, 130].map(r => <circle key={r} cx={AX} cy={AY} r={r} fill="none" stroke="#00A788" strokeWidth="1" opacity="0.1" />)}
              <path d={arc(AX, AY, AR, A_START, A_END)} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="14" strokeLinecap="round" />
              <motion.path d={arc(AX, AY, AR, A_START, A_END)} fill="none" stroke="#00A788" strokeWidth="14" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: PROGRESS }} viewport={{ once: false, margin: '-50px' }} transition={{ duration: 2.2, ease: 'easeOut', delay: 0.4 }} />
              <circle cx={wp2022.x.toFixed(1)} cy={wp2022.y.toFixed(1)} r="7" fill="#00A788" />
              <circle cx={wp2022.x.toFixed(1)} cy={wp2022.y.toFixed(1)} r="12" fill="none" stroke="#00A788" strokeWidth="1.5" opacity="0.5" />
              <circle cx={wp2030.x.toFixed(1)} cy={wp2030.y.toFixed(1)} r="6" fill="none" stroke="#009FD4" strokeWidth="2" />
              <circle cx={wp2030.x.toFixed(1)} cy={wp2030.y.toFixed(1)} r="2" fill="#009FD4" />
              <circle cx={wp2060.x.toFixed(1)} cy={wp2060.y.toFixed(1)} r="6" fill="none" stroke="#81C34D" strokeWidth="2" />
              <circle cx={wp2060.x.toFixed(1)} cy={wp2060.y.toFixed(1)} r="2" fill="#81C34D" />
              <text x={(wp2022.x - 18).toFixed(1)} y={(wp2022.y + 20).toFixed(1)} fill="#00A788" fontSize="9" fontFamily="monospace" fontWeight="bold">{points[0]?.year}</text>
              <text x={(wp2030.x - 10).toFixed(1)} y={(wp2030.y - 14).toFixed(1)} fill="#009FD4" fontSize="9" fontFamily="monospace">{points[1]?.year}</text>
              <text x={(wp2060.x + 6).toFixed(1)} y={(wp2060.y + 6).toFixed(1)} fill="#81C34D" fontSize="9" fontFamily="monospace">{points[2]?.year}</text>
              <text x={AX} y={AY - 10} textAnchor="middle" fill="white" fontSize="48" fontFamily="monospace" fontWeight="bold" className="fill-white">{wheelCenterYear}</text>
              <text x={AX} y={AY + 16} textAnchor="middle" fill="#7C9590" fontSize="11" fontFamily="sans-serif" className="fill-gray-400">{wheelCenterLabel}</text>
              <text x={AX} y={AY + 38} textAnchor="middle" fill="#00A788" fontSize="10" fontFamily="monospace" fontWeight="bold" className="fill-[#00A788]">{wheelProgressLabel}</text>
            </svg>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
              {points.map((w, i) => {
                const style = TIMELINE_STYLE[i] ?? TIMELINE_STYLE[TIMELINE_STYLE.length - 1];
                return (
                  <div key={w.id ?? i} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full border-2" style={{ backgroundColor: style.filled ? style.color : 'transparent', borderColor: style.color }} />
                    <span className="text-[10px] font-mono text-gray-400">{w.year} — {w.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed parameters */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-[6px] p-6 flex-1 flex flex-col justify-center text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-[6px] bg-[#00A788]/10 flex items-center justify-center"><Globe size={14} className="text-[#00A788]" /></div>
              <span className="text-[10px] font-mono text-[#00A788] uppercase tracking-widest font-bold">{etpLabel}</span>
            </div>
            <p className="text-gray-355 font-sans text-xs leading-relaxed font-light">
              {etpBody}
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-[6px] p-6 flex-1 flex flex-col justify-center text-left">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-mono text-[#009FD4] uppercase tracking-widest font-bold">{pensionLabel}</span>
              <span className="text-[#009FD4] font-bold font-mono text-sm">{pensionTargetValue}</span>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-1.5">
              <motion.div initial={{ width: 0 }} whileInView={{ width: '30%' }} viewport={{ once: false }} transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }} className="absolute inset-y-0 left-0 bg-[#009FD4] rounded-full" />
              <div className="absolute inset-y-0 left-[6.67%] w-px bg-white/30" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-gray-400">
              <span>{pensionCurrentLabel}</span>
              <span>{pensionTargetLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
