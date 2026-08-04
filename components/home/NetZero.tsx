"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Zap, BarChart3 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import type { NetZeroSection as NetZeroSectionData } from '@/lib/strapi-types';

type NetZeroProps = Omit<NetZeroSectionData, '__component'>;

/** Feature-card icons are presentational; the CMS supplies title + description. */
const FEATURE_ICONS: React.ElementType[] = [Zap, BarChart3];

export default function NetZeroSection({
  cardTitle,
  cardSubtitle,
  cardBody,
  eyebrow,
  heading,
  body,
  image,
  image_alt_text,
  features = [],
}: NetZeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={sectionRef} className="relative text-white overflow-hidden min-h-[800px] flex items-center bg-[#051F1A]">
      {/* Background with Parallax */}
      <motion.div
        style={{ y: bgY, scale: 1.1 }}
        className="absolute inset-0 z-0"
      >
        {image && (
          <img
            src={image}
            alt={image_alt_text ?? ''}
            className="w-full h-full object-cover"
          />
        )}

        {/* Layer 1: Green Tint to match brand identity */}
        <div className="absolute inset-0 bg-[#051F1A]/80 mix-blend-multiply" />

        {/* Layer 2: Gradient Overlay for smooth transition to footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#051F1A]/60 via-[#051F1A]/80 to-[#02100d]" />
      </motion.div>

      <div className="py-24 container mx-auto relative z-10 px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Card Section */}
          <div className="lg:w-1/3 order-1 lg:order-2 w-full max-w-[280px] mx-auto lg:max-w-none">
            <motion.div
              style={{ y: cardY }}
              className="bg-gradient-to-br from-[#0f3d32] to-[#051F1A] p-1 rounded-[6px] rotate-3 shadow-2xl border border-white/5"
            >
              <div className="bg-[#051F1A]/90 rounded-[6px] overflow-hidden p-8 min-h-[280px] max-h-[320px] lg:aspect-[3/4] lg:max-h-none flex flex-col justify-between backdrop-blur-md relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                  <Leaf className="text-brand-accent" size={24} />
                </div>

                <div>
                  <div className="text-5xl font-bold mb-3 font-sans tracking-tighter text-white">{cardTitle}</div>
                  <div className="text-xl text-brand-accent font-sans tracking-wide">{cardSubtitle}</div>
                  <p className="text-xs text-gray-400 mt-4 leading-relaxed border-t border-white/10 pt-4">
                    {cardBody}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="lg:w-2/3 order-2 lg:order-1">
            <SectionHeader sub={eyebrow ?? ""} title={heading ?? ""} dark />
            <p className="text-gray-300 text-lg leading-relaxed mb-12 max-w-2xl font-sans">
              {body}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, idx) => {
                const FeatureIcon = FEATURE_ICONS[idx] ?? Leaf;
                return (
                  <div key={feature.id ?? idx} className="group bg-white/5 p-8 rounded-[6px] border border-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm interactive hover:-translate-y-1">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-[6px] flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors text-brand-accent">
                      <FeatureIcon size={24} />
                    </div>
                    <h4 className="font-bold text-xl mb-3 font-sans text-white">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-sans">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
