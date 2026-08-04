"use client";

import { Fragment, useRef, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { AboutSection as AboutSectionData } from '@/lib/strapi-types';

type AboutProps = Omit<AboutSectionData, '__component'>;

/**
 * Partner logos are bespoke markup, so the CMS `partners` array only carries a
 * name — it controls which logos render and in what order.
 */
const PARTNER_LOGOS: Record<string, ReactNode> = {
  UKaid: (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        <div className="w-3 h-3 bg-[#00247D]"></div>
        <div className="w-3 h-3 bg-[#CC0000]"></div>
      </div>
      <span className="font-bold text-brand-dark text-lg tracking-tight font-sans">UKaid</span>
    </div>
  ),
  InfraCredit: <div className="font-bold text-gray-600 text-lg font-sans">InfraCredit</div>,
  AIICO: (
    <div className="flex items-center gap-1 font-bold text-[#002855]">
      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[10px] border-b-[#C8102E] border-r-[6px] border-r-transparent"></div>
      <span className="font-sans">AIICO</span>
    </div>
  ),
  "LINKAGE ASSURANCE": (
    <div className="flex flex-col leading-none font-bold text-gray-600 text-xs font-sans">
      <span>LINKAGE</span>
      <span>ASSURANCE</span>
    </div>
  ),
};

export default function AboutSection({
  eyebrow,
  headingPrimary,
  headingSecondary,
  body,
  ctaLabel,
  ctaHref,
  partnersHeading,
  statValue,
  statDescription,
  image,
  image_alt_text,
  partners,
}: AboutProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax: Image moves slower/faster than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-white relative overflow-hidden z-20">
      <div className="container mx-auto relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-brand-primary"></div>
                <span className="text-brand-primary text-xs font-normal tracking-[0.2em] uppercase font-sans">{eyebrow}</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-brand-dark mb-8 leading-tight font-sans tracking-tight"
            >
              {headingPrimary}<span className="text-[#7C9590]">{headingSecondary}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg font-sans"
            >
              {body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-16"
            >
              {ctaLabel && (
                <button
                  onClick={() => ctaHref && router.push(ctaHref)}
                  className="group flex items-center gap-3 text-brand-dark font-bold text-lg hover:text-brand-primary transition-colors font-sans interactive focus:outline-none"
                >
                  {ctaLabel}
                  <div className="w-8 h-8 rounded-[6px] border border-current flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
                    <ArrowRight size={16} />
                  </div>
                </button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-auto border-t border-gray-100 pt-10"
            >
              <h4 className="text-[10px] font-normal tracking-[0.2em] text-gray-400 uppercase mb-6 font-sans">{partnersHeading}</h4>
              <div className="flex flex-wrap items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {(partners ?? []).map((partner, index) => {
                  const logo = partner.name ? PARTNER_LOGOS[partner.name] : undefined;
                  if (!logo) return null;
                  return (
                    <Fragment key={partner.id ?? index}>
                      {index > 0 && <span className="h-6 w-px bg-gray-200"></span>}
                      {logo}
                    </Fragment>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="relative mt-12 lg:mt-0 lg:pl-10">
            <div className="absolute -top-12 -right-12 w-full h-full bg-[#051F1A] rounded-[6px] z-0 hidden lg:block"></div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full shadow-2xl animate-fade-in"
            >
              <div className="relative h-[600px] w-full bg-gray-100 overflow-hidden rounded-[6px] group">
                {image && (
                  <motion.img
                    style={{ y, scale: 1.1 }}
                    src={image}
                    alt={image_alt_text ?? ''}
                    className="w-full h-[120%] object-cover object-center"
                  />
                )}
              </div>

              <div className="absolute bottom-0 left-0 w-[85%] bg-[#051F1A] p-10 md:p-12 text-white shadow-2xl z-20 rounded-[6px]">
                <div className="text-5xl font-bold mb-6 font-sans">{statValue}</div>
                <div className="h-px w-full bg-white/20 mb-6"></div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
                  {statDescription}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
