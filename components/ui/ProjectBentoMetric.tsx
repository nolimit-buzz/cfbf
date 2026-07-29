"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { heroCardVariants } from '@/components/GlassHero';
import CountUp from '@/components/ui/CountUp';

interface ProjectBentoMetricProps {
  label: string;
  value: string;
  desc: string;
  isDark?: boolean;
  colSpan?: string;
}

export default function ProjectBentoMetric({
  label,
  value,
  desc,
  isDark = false,
  colSpan = "md:col-span-2"
}: ProjectBentoMetricProps) {
  return (
    <motion.div
      variants={heroCardVariants}
      className={`group relative border p-8 flex flex-col justify-between min-h-[220px] overflow-hidden transition-all duration-500 hover:-translate-y-0.5 rounded-[6px] ${
      isDark
        ? 'bg-[#02100d] border-[#144D3F] hover:border-[#81C34D] text-white hover:shadow-[0_8px_30px_rgba(129,195,77,0.06)]'
        : 'bg-white border-[#E8F2FF] hover:border-[#009FD4] hover:shadow-[0_8px_30px_rgba(0,167,136,0.04)] text-brand-dark'
    } ${colSpan}`}>
      {/* Corner dynamic gradient */}
      {isDark ? (
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=600')] opacity-10 bg-cover mix-blend-overlay pointer-events-none" />
      ) : (
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#E8F2FF]/60 to-transparent opacity-50 pointer-events-none" />
      )}
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-6">
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] font-mono ${
            isDark ? 'text-white/50' : 'text-gray-400'
          }`}>
            {label}
          </span>
          <ArrowRight className={`w-5 h-5 shrink-0 -rotate-45 transition-all duration-500 ${
            isDark 
              ? 'text-white/50 group-hover:text-[#81C34D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5' 
              : 'text-gray-300 group-hover:text-[#009FD4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
          }`} />
        </div>
        
        <div>
          <h3 className={`text-4xl md:text-5xl font-light tracking-tight ${
            isDark ? 'text-white font-semibold' : 'text-[#051F1A]'
          }`}>
            <CountUp value={value} />
          </h3>
          <p className={`text-xs md:text-sm leading-relaxed pr-6 mt-4 ${
            isDark ? 'text-white/60' : 'text-gray-500'
          }`}>
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
