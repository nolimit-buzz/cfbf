"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Zap, Leaf, Users, Wifi } from 'lucide-react';

import type { AnalysisTabSection, ProjectItem } from '@/lib/strapi-projects-types';

type AnalysisTabProps = Omit<AnalysisTabSection, '__component'> & {
  /** Lives on the pipeline tab section — both tabs render the same portfolio. */
  projects: ProjectItem[];
};

/** Icon + accent per stat box, in the authored order of `statBoxes`. */
const STAT_CHROME = [
  { icon: <Zap />, iconColor: '#FDB713' },
  { icon: <Leaf />, iconColor: '#56C36A' },
  { icon: <Users />, iconColor: '#FF4A6B' },
  { icon: <Wifi />, iconColor: '#81C34D' },
];

function IconStatBox({
  icon,
  label,
  value,
  unit,
  description,
  iconColor,
  delay = 0,
}: {
  icon: React.ReactNode;
  label?: string;
  value?: string;
  unit?: string;
  description?: string;
  iconColor: string;
  delay?: number;
}) {
  return (
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
        <div style={{ color: iconColor }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 [&>svg]:w-5 [&>svg]:h-5">
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

      <p className="text-gray-300 text-[10px] leading-relaxed font-sans font-light mt-auto">
        {description}
      </p>
    </motion.div>
  );
}

export default function AnalysisTab({
  tableHeading,
  downloadLabel,
  downloadHref,
  totalsRowLabel,
  totalsConnectionsSuffix,
  capacityUnit,
  ghgUnit,
  statusOperationalLabel,
  statBoxes,
  columnHeads,
  projects,
}: AnalysisTabProps) {
  // Every metric is authored as a display string with its unit baked in, so the
  // totals are recovered by stripping non-numeric characters back out.
  const totalCapacity = projects.reduce((sum, p) => {
    const num = parseFloat((p.capacity ?? '').replace(/[^0-9.]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const totalCapital = projects.reduce((sum, p) => {
    const isMillion = (p.capital ?? '').toLowerCase().includes('m');
    const num = parseFloat((p.capital ?? '').replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return sum;
    return sum + (isMillion ? num / 1000 : num);
  }, 0);

  const totalJobs = projects.reduce((sum, p) => {
    const num = parseInt((p.jobs ?? '').replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const totalGHG = projects.reduce((sum, p) => {
    const num = parseFloat((p.ghg ?? '').replace(/[^0-9.]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  // Telecom sites are counted separately — they are masts, not connections.
  const totalConnections = projects.reduce((sum, p) => {
    if ((p.connections ?? '').toLowerCase().includes('site')) return sum;
    const num = parseInt((p.connections ?? '').replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <motion.div
      key="analysis-tab"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-12"
    >
      {/* Icon Stat Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {(statBoxes ?? []).map((box, i) => (
          <IconStatBox
            key={box.id ?? i}
            icon={STAT_CHROME[i]?.icon}
            iconColor={STAT_CHROME[i]?.iconColor ?? '#81C34D'}
            label={box.label}
            value={box.value}
            unit={box.unit}
            description={box.description}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Performance Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="bg-white/[0.02] backdrop-blur-md rounded-[6px] border border-white/10 overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-lg font-sans text-white">{tableHeading}</h3>
          <a
            href={downloadHref}
            download
            className="flex items-center gap-2 text-xs font-bold text-brand-accent uppercase tracking-wider hover:text-white transition-colors interactive font-sans"
          >
            <Download size={14} /> {downloadLabel}
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                {(columnHeads ?? []).map((head, idx) => (
                  <th
                    key={head.id ?? idx}
                    className={
                      idx === 0
                        ? 'p-4 pl-6'
                        : idx === (columnHeads?.length ?? 0) - 1
                          ? 'p-4 pr-6'
                          : 'p-4'
                    }
                  >
                    {head.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm font-sans text-gray-300 divide-y divide-white/5">
              {projects.map((p, idx) => (
                <tr key={p.projectId ?? idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 font-semibold">
                    <Link
                      href={`/projects/${p.projectId}`}
                      className="text-white hover:text-[#81C34D] transition-colors font-semibold text-left focus:outline-none interactive"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="p-4">{p.capacity}</td>
                  <td className="p-4 font-mono font-medium text-brand-accent">{p.capital}</td>
                  <td className="p-4">{p.connections}</td>
                  <td className="p-4">{p.jobs}</td>
                  <td className="p-4">{p.ghg}/yr</td>
                  <td className="p-4 pr-6">
                    <span className={`px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wide border ${
                      p.status === statusOperationalLabel
                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-white/10 bg-white/[0.02] text-xs font-mono font-bold text-white uppercase tracking-wider">
              <tr>
                <td className="p-4 pl-6 text-gray-400 font-sans normal-case">{totalsRowLabel}</td>
                <td className="p-4 text-[#81C34D]">{totalCapacity.toLocaleString()} {capacityUnit}</td>
                <td className="p-4 text-[#81C34D]">₦{totalCapital.toFixed(2)}b</td>
                <td className="p-4 text-[#81C34D]">
                  {totalConnections.toLocaleString()} {totalsConnectionsSuffix}
                </td>
                <td className="p-4 text-[#81C34D]">{totalJobs.toLocaleString()}</td>
                <td className="p-4 text-[#81C34D]">
                  {totalGHG.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })} {ghgUnit}
                </td>
                <td className="p-4 pr-6"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
