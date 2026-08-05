"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ContactFunStatsSection } from '@/lib/strapi-contact-types';

type FunStatsProps = Omit<ContactFunStatsSection, '__component' | 'id'>;

const stats = [
  {
    value: '₦7.86B+',
    label: 'Active Pipeline',
    desc: 'Mobilised from domestic institutional investors and pension funds into the real economy.',
  },
  {
    value: '7,500+ tCO₂e',
    label: 'Mitigated',
    desc: 'Tonnes of annual carbon emissions avoided across active clean energy installations.',
  },
  {
    value: '100% Green',
    label: 'Certified',
    desc: 'Project transactions fully certified under Climate Bonds Initiative (CBI) standards.',
  },
  {
    value: '39,438',
    label: 'Connections',
    desc: 'Projected household and SME clean energy connections powered across Nigeria.',
  },
];

export default function FunStats({
  eyebrow,
  backgroundImage,
  backgroundImage_alt_text,
  statIconSvg,
}: FunStatsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[#00A788]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00A788] animate-pulse"></span>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-mono">{eyebrow}</span>
      </div>

      <div className="relative w-full aspect-square sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-square xl:aspect-[16/10] min-h-[380px] rounded-[6px] overflow-hidden shadow-lg bg-[#02100d] flex items-center justify-center group">
        {backgroundImage && (
          <div
            role="img"
            aria-label={backgroundImage_alt_text ?? ''}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-105"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02100d]/90 via-[#042d24]/65 to-[#02100d]/90" />

        <div className="relative z-10 w-[85%] max-w-[420px] bg-[#021a15]/95 border border-[#043329] rounded-[6px] p-6 sm:p-8 shadow-2xl backdrop-blur-md min-h-[270px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {statIconSvg && (
                  <div className="mb-4" dangerouslySetInnerHTML={{ __html: statIconSvg }} />
                )}

                <h4 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-sans tracking-tight mb-2">
                  {stats[activeIndex].value} <br />
                  <span className="text-[#00A788]">{stats[activeIndex].label}</span>
                </h4>

                <div className="w-12 h-0.5 bg-[#00A788] my-4 rounded-full" />
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {stats[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-1.5 mt-6 items-center">
            {stats.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  i === activeIndex ? 'w-6 bg-[#00A788]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
