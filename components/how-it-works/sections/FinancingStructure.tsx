'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type {
  HowItWorksFinancingStructureSection,
  TaProviderItem,
} from '@/lib/strapi-how-it-works-types';

type Props = Omit<HowItWorksFinancingStructureSection, '__component'>;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

function TaSlider({
  providers,
  rotationMs,
}: {
  providers: TaProviderItem[];
  rotationMs: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (providers.length === 0) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % providers.length), rotationMs);
    return () => clearInterval(t);
  }, [providers.length, rotationMs]);

  if (providers.length === 0) return null;

  const item = providers[current];

  return (
    <div className="relative h-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.a
          key={item.id ?? current}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center group/ta"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <img
            src={item.src}
            alt={item.alt ?? item.src_alt_text ?? ''}
            className="h-7 w-auto object-contain brightness-0 invert opacity-70 group-hover/ta:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        </motion.a>
      </AnimatePresence>
      <div className="absolute -bottom-4 left-0 flex gap-1.5">
        {providers.map((p, i) => (
          <button
            key={p.id ?? i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-200 rounded-full ${
              i === current ? 'w-3 h-1.5 bg-[#81C34D]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function FinancingStructure(props: Props) {
  const bullets = props.bullets ?? [];
  const anchorFunders = props.anchorFunders ?? [];
  const taProviders = props.taProviders ?? [];
  const coFinancingPartner = props.coFinancingPartner;
  const rotationMs = Number(props.taRotationMs) || 2800;

  return (
    <div
      data-rag-chunk="how-it-works-financing-structure"
      className="bg-[#051F1A] text-white py-24 relative z-10 border-t border-white/5"
    >
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#81C34D]/4 blur-[140px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        <motion.div {...fadeUp(0)}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#81C34D]" />
            <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-mono">
              {props.eyebrow}
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight tracking-tight mb-6">
                {props.headingPartOne} <span className="text-[#9BB7B1]">{props.headingHighlight}</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">{props.bodyPrimary}</p>
              <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">{props.bodySecondary}</p>
              <ul className="space-y-3">
                {bullets.map((point, i) => (
                  <motion.li
                    key={point.id ?? i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-3 text-sm text-gray-300 font-sans"
                  >
                    <CheckCircle2 size={16} className="text-[#81C34D] mt-0.5 shrink-0" />
                    {point.text}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: Three partner logo blocks */}
            <div className="space-y-6">
              {/* Anchor Funders */}
              <motion.div {...fadeUp(0.05)} className="bg-white/[0.03] border border-white/8 rounded-[8px] p-6">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono mb-5">
                  {props.anchorFundersLabel}
                </p>
                <div className="flex items-center gap-8 flex-wrap">
                  {anchorFunders.map((f) => (
                    <a
                      key={f.id ?? f.alt}
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/logo relative"
                    >
                      <img
                        src={f.src}
                        alt={f.alt ?? f.src_alt_text ?? ''}
                        className="h-8 w-auto object-contain brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Co-Financing Partner */}
              {coFinancingPartner && (
                <motion.div {...fadeUp(0.1)} className="bg-white/[0.03] border border-white/8 rounded-[8px] p-6">
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono mb-5">
                    {props.coFinancingLabel}
                  </p>
                  <a
                    href={coFinancingPartner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block group/ic relative"
                  >
                    <img
                      src={coFinancingPartner.srcWhite}
                      alt={coFinancingPartner.alt ?? coFinancingPartner.srcWhite_alt_text ?? ''}
                      className="h-7 w-auto object-contain absolute transition-all duration-300 group-hover/ic:opacity-0 group-hover/ic:scale-95"
                      loading="lazy"
                    />
                    <img
                      src={coFinancingPartner.srcColour}
                      alt=""
                      aria-hidden="true"
                      className="h-7 w-auto object-contain opacity-0 scale-95 transition-all duration-300 group-hover/ic:opacity-100 group-hover/ic:scale-100"
                      loading="lazy"
                    />
                    <span className="invisible text-white text-xs font-bold">{coFinancingPartner.alt}</span>
                  </a>
                </motion.div>
              )}

              {/* Technical Assistance Providers */}
              <motion.div {...fadeUp(0.15)} className="bg-white/[0.03] border border-white/8 rounded-[8px] p-6 pb-10">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono mb-5">
                  {props.taProvidersLabel}
                </p>
                <TaSlider providers={taProviders} rotationMs={rotationMs} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
