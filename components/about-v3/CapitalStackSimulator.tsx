"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ShieldCheck, Zap, Coins } from 'lucide-react';

function CapitalStackSimulatorContent() {
  const searchParams = useSearchParams();
  const [projectSize, setProjectSize] = useState<number>(15); // in NGN Billions

  // Deep linking projectSize parameter
  useEffect(() => {
    const sizeParam = searchParams.get('projectSize');
    if (sizeParam) {
      const parsed = parseFloat(sizeParam);
      if (!isNaN(parsed) && parsed >= 5 && parsed <= 30) {
        setProjectSize(parsed);
      }
    }
  }, [searchParams]);

  // Stack breakdown calculation
  const seniorDebt = projectSize * 0.6;
  const subordinatedDebt = projectSize * 0.2;
  const developerEquity = projectSize * 0.2;

  return (
    <section className="py-24 bg-[#FAFDFB] relative overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-[1280px]">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-primary" />
            <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono">
              Blended Finance in Action
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-tight mb-4">
            Interactive <span className="text-[#7C9590] italic font-serif">capital stack simulator</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[70ch]">
            Adjust the slider to scale a sample green infrastructure project. See how the facility uses FCDO concessional seed capital to absorb risk, wrapping the capital structure to unlock local currency pension funding.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls & Metrics (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Slider Control */}
            <div className="bg-white border border-gray-200/60 rounded-[6px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
              <div className="flex justify-between items-baseline mb-4">
                <label className="text-xs font-bold font-mono text-gray-500 uppercase tracking-wider">Project Size (NGN)</label>
                <div className="text-3xl font-extrabold text-brand-dark font-sans tracking-tight">
                  ₦{projectSize.toFixed(1)}<span className="text-lg font-medium text-gray-400"> Billion</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={projectSize}
                onChange={(e) => setProjectSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#00A788]"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-2">
                <span>Min: ₦5.0B</span>
                <span>Max: ₦30.0B</span>
              </div>
            </div>

            {/* Segment Explanations */}
            <div className="space-y-4">
              
              {/* Senior Debt */}
              <div className="flex items-start gap-4 p-4 rounded-[6px] border border-gray-200/50 bg-white transition-all hover:shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#051F1A]/10 border border-[#051F1A]/10 flex items-center justify-center text-[#051F1A] shrink-0 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Senior PFA Debt (60%)</h4>
                    <span className="text-xs font-bold font-mono text-brand-dark">₦{seniorDebt.toFixed(1)}B</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                    Secured, long-term debt funded by domestic Pension Fund Administrators (PFAs). Wrapped under the <span className="font-semibold text-brand-primary">InfraCredit AAA guarantee</span> to meet statutory safety regulations.
                  </p>
                </div>
              </div>

              {/* Subordinated Debt */}
              <div className="flex items-start gap-4 p-4 rounded-[6px] border border-brand-primary/10 bg-white transition-all hover:shadow-sm">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                  <Coins size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">CFBF Blended Layer (20%)</h4>
                    <span className="text-xs font-bold font-mono text-brand-primary">₦{subordinatedDebt.toFixed(1)}B</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                    Subordinated, first-loss concessional debt funded via FCDO seed capital. Absorbs developer risk and lowers the overall financing cost to attract private commercial participants.
                  </p>
                </div>
              </div>

              {/* Developer Equity */}
              <div className="flex items-start gap-4 p-4 rounded-[6px] border border-brand-cyan/10 bg-white transition-all hover:shadow-sm">
                <div className="w-8 h-8 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                  <Zap size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold text-brand-cyan uppercase tracking-wider">Developer Equity (20%)</h4>
                    <span className="text-xs font-bold font-mono text-brand-cyan">₦{developerEquity.toFixed(1)}B</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                    Sponsor/developer commitment layer. Demonstrates alignment of interests and operational responsibility for active green asset sites.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Stack Visualization (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Visual Box */}
            <div className="relative w-full max-w-[320px] aspect-[2/3] bg-white border border-gray-150 rounded-[8px] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] flex flex-col justify-end">
              
              {/* Stack wrapper representing InfraCredit AAA Guarantee */}
              <div className="absolute inset-x-4 top-14 bottom-22 border-2 border-dashed border-[#81C34D] rounded-[6px] pointer-events-none flex items-start justify-center transition-all">
                <div className="bg-[#81C34D] text-brand-dark px-3 py-1 text-[8px] font-mono font-bold uppercase tracking-widest rounded-full -mt-2.5 shadow-md flex items-center gap-1">
                  <ShieldCheck size={10} />
                  InfraCredit AAA Guarantee Wrap
                </div>
              </div>

              {/* Dynamic Stack Columns */}
              <div className="flex-grow flex items-end justify-center w-full relative pt-12 pb-2">
                <div className="w-24 h-full flex flex-col justify-end gap-1.5 z-10">
                  
                  {/* Senior Debt Block */}
                  <motion.div
                    layout
                    style={{ height: `${60}%` }}
                    className="w-full bg-[#051F1A] rounded-[4px] relative group cursor-pointer flex flex-col justify-between p-3 border border-white/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-[10px] font-bold text-white font-mono leading-none">60%</span>
                    <span className="text-[8px] text-gray-300 font-mono tracking-wider font-medium truncate uppercase">Senior</span>
                  </motion.div>

                  {/* Subordinated Debt Block */}
                  <motion.div
                    layout
                    style={{ height: `${20}%` }}
                    className="w-full bg-[#00A788] rounded-[4px] relative group cursor-pointer flex flex-col justify-between p-3 border border-white/5"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-[10px] font-bold text-white font-mono leading-none">20%</span>
                    <span className="text-[8px] text-white/90 font-mono tracking-wider font-medium truncate uppercase">Blended</span>
                  </motion.div>

                  {/* Developer Equity Block */}
                  <motion.div
                    layout
                    style={{ height: `${20}%` }}
                    className="w-full bg-[#009FD4] rounded-[4px] relative group cursor-pointer flex flex-col justify-between p-3 border border-white/5"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-[10px] font-bold text-white font-mono leading-none">20%</span>
                    <span className="text-[8px] text-white/90 font-mono tracking-wider font-medium truncate uppercase">Equity</span>
                  </motion.div>

                </div>
              </div>

              {/* Total Project Value Label */}
              <div className="border-t border-gray-150 pt-4 mt-2 text-center">
                <span className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-widest block">Total De-risked Stack</span>
                <span className="text-xl font-bold font-sans text-brand-dark">₦{projectSize.toFixed(1)}B NGN</span>
              </div>

            </div>

            {/* Note */}
            <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-400 max-w-[280px] text-center">
              <Info size={12} className="shrink-0" />
              <span>Yield & structure are optimized dynamically to meet statutory PFA limits under CBN regulations.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default function CapitalStackSimulator() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center font-mono text-xs uppercase tracking-widest text-gray-400">
        Loading simulator...
      </div>
    }>
      <CapitalStackSimulatorContent />
    </Suspense>
  );
}
