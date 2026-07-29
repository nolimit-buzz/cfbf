"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Shared staggered-entrance variants for any hero card row (matches the about-v2 standard)
export const heroRowVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
};
export const heroCardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

interface GlassHeroProps {
  title: React.ReactNode;
  /** Mono uppercase label shown above the title. */
  subtitle?: string;
  /** Optional intro paragraph rendered beneath the title. */
  description?: React.ReactNode;
  bgImage: string;
  /** Active breadcrumb segment label (e.g. "eligibility"). */
  currentPage: string;
  /** Optional intermediate breadcrumb (e.g. projects → detail). */
  parent?: { label: string; href: string };
  /** Colour the hero fades into at the bottom — match the next section. */
  fade?: 'light' | 'dark' | 'none';
  /** Panel surface: frosted glass (default) or a solid white card (e.g. blog post). */
  panel?: 'glass' | 'white';
  /** Card row / custom hero content rendered below the header. */
  children?: React.ReactNode;
}

export default function GlassHero({
  title,
  subtitle,
  description,
  bgImage,
  currentPage,
  parent,
  fade = 'light',
  panel = 'glass',
  children,
}: GlassHeroProps) {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.08]);

  const isWhite = panel === 'white';

  // Theme tokens per panel surface
  const t = isWhite
    ? {
        panel: 'bg-white border border-gray-100',
        crumbBorder: 'border-gray-100',
        crumb: 'text-gray-400 hover:text-brand-primary',
        crumbSep: 'text-gray-300',
        crumbActive: 'text-brand-primary',
        rule: 'bg-brand-primary',
        label: 'text-brand-primary',
        title: 'text-brand-dark',
        desc: 'text-gray-500',
      }
    : {
        panel: 'bg-white/[0.04] backdrop-blur-2xl border border-white/10',
        crumbBorder: 'border-white/10',
        crumb: 'text-gray-300 hover:text-brand-accent',
        crumbSep: 'text-gray-500',
        crumbActive: 'text-brand-accent',
        rule: 'bg-brand-accent',
        label: 'text-brand-accent',
        title: 'text-white',
        desc: 'text-white/70',
      };

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden bg-brand-dark pt-56 md:pt-64 pb-40">

      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <motion.img
          src={bgImage}
          alt={typeof title === 'string' ? title : 'Hero banner'}
          className="w-full h-full object-cover"
          style={{ scale: bgScale }}
        />
        <div className="absolute inset-0 bg-[#00314b]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00314b]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Fade-out into the next section (colour-matched) */}
      {fade !== 'none' && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-b z-[2] pointer-events-none ${
            fade === 'dark' ? 'from-transparent via-[#051F1A]/40 to-[#051F1A]' : 'from-transparent via-white/40 to-white'
          }`}
        />
      )}

      {/* Panel — same width as nav slab (1280px band) */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
          className={`shadow-2xl rounded-[6px] px-8 md:px-12 pt-8 pb-10 ${t.panel}`}
        >
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 mb-7 pb-5 border-b text-xs font-mono uppercase tracking-widest ${t.crumbBorder}`}>
            <button
              onClick={() => router.push('/')}
              className={`transition-colors focus:outline-none interactive lowercase ${t.crumb}`}
            >
              home
            </button>
            <span className={t.crumbSep}>/</span>
            {parent && (
              <>
                <button
                  onClick={() => router.push(parent.href)}
                  className={`transition-colors focus:outline-none interactive lowercase ${t.crumb}`}
                >
                  {parent.label}
                </button>
                <span className={t.crumbSep}>/</span>
              </>
            )}
            <span className={`font-semibold lowercase ${t.crumbActive}`}>{currentPage}</span>
          </div>

          {/* Label */}
          {subtitle && (
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-px w-8 ${t.rule}`} />
              <span className={`text-xs font-semibold tracking-[0.2em] uppercase font-mono ${t.label}`}>{subtitle}</span>
            </div>
          )}

          {/* Title + description */}
          <div className={description ? 'grid lg:grid-cols-2 gap-8 xl:gap-16 items-end mb-10' : 'mb-10'}>
            <h1 className={`text-4xl md:text-5xl lg:text-[3rem] font-bold tracking-tight leading-[1.08] font-sans ${t.title}`}>
              {title}
            </h1>
            {description && (
              <div className={`pb-1 leading-relaxed font-sans space-y-4 ${t.desc}`}>
                {description}
              </div>
            )}
          </div>

          {/* Card row / custom content */}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
