"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { PlusIcon, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// --- Easing ---
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const up = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20px' },
  transition: { duration: 0.5, ease: EASE, delay },
});

const BASE = "https://infracredit.ng/climate-facility/wp-content/uploads";

// Reusable: white by default → full colour on hover
function LogoImg({
  src,
  alt,
  className = "h-8 w-auto",
  colourSrc,
}: {
  src: string;
  alt: string;
  className?: string;
  colourSrc?: string; // if a separate coloured version exists
}) {
  const colour = colourSrc ?? src;
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* White version */}
      <img
        src={src}
        alt={alt}
        className={`object-contain brightness-0 invert transition-all duration-500 absolute group-hover:opacity-0 group-hover:scale-90 ${className}`}
        loading="lazy"
      />
      {/* Colour version */}
      <img
        src={colour}
        alt=""
        aria-hidden="true"
        className={`object-contain transition-all duration-500 absolute opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 ${className}`}
        loading="lazy"
      />
    </div>
  );
}

interface Partner {
  name: string;
  role: string;
  logoNode: ReactNode;
}

interface PartnerGroup {
  category: string;
  description: string;
  partners: Partner[];
  emptyCellsCount: number;
}

const PARTNER_GROUPS: PartnerGroup[] = [
  {
    category: "Anchor Funders",
    description: "Capital commitment seed and de-risking funding partners.",
    partners: [
      {
        name: "Foreign, Commonwealth & Development Office",
        role: "UK FCDO — Anchor Funder (USD 21.3M)",
        logoNode: (
          <LogoImg
            src={`${BASE}/2022/10/UK-DEVELOPMENT-WHITE.png`}
            alt="UK International Development"
            className="h-9 w-auto max-w-[110px]"
          />
        ),
      },
      {
        name: "British International Investment",
        role: "BII — Co-Investment Partner",
        logoNode: (
          <LogoImg
            src={`${BASE}/2022/10/BII_Logo_All_white_RGB.png`}
            alt="British International Investment"
            className="h-9 w-auto max-w-[120px]"
          />
        ),
      },
    ],
    emptyCellsCount: 2,
  },
  {
    category: "Technical Assistance Providers",
    description: "Transactional capacity building and ESG project preparation.",
    partners: [
      {
        name: "FSD Africa",
        role: "Technical Assistance Partner",
        logoNode: (
          <LogoImg
            src={`${BASE}/2022/10/FSD-Africa-logo-1.png`}
            alt="FSD Africa"
            className="h-8 w-auto max-w-[110px]"
          />
        ),
      },
      {
        name: "Shell Foundation",
        role: "Capacity Support & Advisory",
        logoNode: (
          <LogoImg
            src={`${BASE}/2022/10/Shell-foundation-1.png`}
            alt="Shell Foundation"
            className="h-8 w-auto max-w-[110px]"
          />
        ),
      },
    ],
    emptyCellsCount: 2,
  },
  {
    category: "Cofinancing Partner",
    description: "Guarantee deployment and credit risk administration.",
    partners: [
      {
        name: "InfraCredit",
        role: "Facility Administrator & AAA Guarantor",
        // White PNG default → coloured SVG on hover
        logoNode: (
          <LogoImg
            src={`${BASE}/2022/09/ICAsset-6@4x-8-002-1024x326-1.png`}
            alt="InfraCredit"
            colourSrc={`${BASE}/2022/09/InfraCredit-1.svg`}
            className="h-7 w-auto max-w-[130px]"
          />
        ),
      },
    ],
    emptyCellsCount: 3,
  },
  {
    category: "Domestic Institutional Investors",
    description: "Local currency institutions and pension fund managers.",
    partners: [
      {
        name: "AIICO Insurance PLC",
        role: "Domestic PFA Co-financier",
        logoNode: (
          <div className="flex items-center justify-center group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white group-hover:text-[#C8102E] transition-colors duration-500 text-[11px] font-extrabold tracking-widest font-sans uppercase">AIICO</span>
          </div>
        ),
      },
      {
        name: "NEM Insurance PLC",
        role: "Domestic PFA Co-financier",
        logoNode: (
          <div className="flex items-center justify-center">
            <span className="text-white group-hover:text-[#003087] transition-colors duration-500 text-[11px] font-extrabold tracking-widest font-sans uppercase">NEM</span>
          </div>
        ),
      },
      {
        name: "Linkage Insurance PLC",
        role: "Domestic PFA Co-financier",
        logoNode: (
          <div className="flex items-center justify-center">
            <span className="text-white group-hover:text-[#0072CE] transition-colors duration-500 text-[11px] font-extrabold tracking-widest font-sans uppercase">LINKAGE</span>
          </div>
        ),
      },
      {
        name: "Leadway Insurance",
        role: "Domestic PFA Co-financier",
        logoNode: (
          <div className="flex items-center justify-center">
            <span className="text-white group-hover:text-[#E31837] transition-colors duration-500 text-[11px] font-extrabold tracking-widest font-sans uppercase">LEADWAY</span>
          </div>
        ),
      },
      {
        name: "Tangerine Life",
        role: "Domestic PFA Co-financier",
        logoNode: (
          <div className="flex items-center justify-center">
            <span className="text-white group-hover:text-[#FF6600] transition-colors duration-500 text-[11px] font-extrabold tracking-widest font-sans uppercase">TANGERINE</span>
          </div>
        ),
      },
      {
        name: "Clean Energy Local Currency Fund",
        role: "Domestic PFA Co-financier",
        logoNode: (
          <div className="flex items-center justify-center">
            <span className="text-white group-hover:text-brand-accent transition-colors duration-500 text-[10px] font-extrabold tracking-wide font-sans uppercase text-center leading-tight">CELCF</span>
          </div>
        ),
      },
      {
        name: "First Pension Custodian",
        role: "Pension Asset Custodian",
        logoNode: (
          <div className="flex items-center justify-center">
            <span className="text-white group-hover:text-[#003087] transition-colors duration-500 text-[10px] font-extrabold tracking-wide font-sans uppercase text-center leading-tight">FPC</span>
          </div>
        ),
      },
    ],
    emptyCellsCount: 0,
  },
];

type GridCell =
  | { type: 'partner'; partner: Partner }
  | { type: 'cta' }
  | { type: 'empty' };

export default function PartnerShowcase() {
  return (
    <section className="py-10 bg-[#010908] text-white relative overflow-hidden flex items-center min-h-[90vh] lg:min-h-0 lg:h-[95vh]">
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="container mx-auto px-6 max-w-[1280px] w-full flex flex-col justify-center relative z-10">

        {/* Header */}
        <div className="max-w-3xl mb-8 text-left shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-brand-accent" />
            <span className="text-brand-accent text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
              Ecosystem Partners
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Ecosystem and <span className="text-[#9BB7B1] italic font-serif">capital mobilization network</span>
          </h2>
        </div>

        {/* Seamless Grid Wrapper */}
        <div className="flex flex-col border-t border-b border-white/5 bg-[#010908] select-none rounded-[4px] overflow-hidden shrink-0">
          {PARTNER_GROUPS.map((group, groupIdx) => {
            const isInvestors = group.category === "Domestic Institutional Investors";

            const cells: GridCell[] = [
              ...group.partners.map(p => ({ type: 'partner' as const, partner: p })),
              ...(isInvestors ? [{ type: 'cta' as const }] : []),
              ...Array.from({ length: group.emptyCellsCount }).map(() => ({ type: 'empty' as const }))
            ];

            return (
              <motion.div
                key={group.category}
                {...up(groupIdx * 0.04)}
                className={`grid lg:grid-cols-12 gap-0 items-stretch border-white/5 relative z-10 ${
                  groupIdx > 0 ? 'border-t' : ''
                }`}
              >
                {/* Left Category Slab (3 cols) */}
                <div className="lg:col-span-3 p-5 md:p-6 bg-[#010908]/90 text-left flex flex-col justify-center">
                  <h3 className="text-[10px] font-bold font-mono uppercase tracking-[0.16em] text-brand-accent">
                    {group.category}
                  </h3>
                  <p className="text-xs md:text-[13px] text-gray-400 font-light font-sans mt-1 max-w-[28ch] leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Right Logo Grid (9 cols) */}
                <div className="lg:col-span-9 bg-[#010908]">
                  <div className="grid grid-cols-2 md:grid-cols-4 bg-[#010908] gap-0">
                    {cells.map((cell, idx) => {
                      const borderRightClass = (idx + 1) % 2 === 0
                        ? "border-r-0 md:border-r"
                        : "border-r";
                      const desktopBorderRightClass = (idx + 1) % 4 === 0
                        ? "md:border-r-0"
                        : "";

                      if (cell.type === 'partner') {
                        return (
                          <div
                            key={cell.partner.name}
                            className={`relative flex flex-col justify-center items-center px-4 py-6 border-white/5 h-24 md:h-28 bg-[#010908] group cursor-default overflow-hidden border-b ${borderRightClass} ${desktopBorderRightClass}`}
                          >
                            {/* Logo Display Container */}
                            <div className="relative h-12 w-full flex items-center justify-center">
                              {cell.partner.logoNode}
                            </div>

                            {/* Name panel — fades/slides up on hover */}
                            <div className="absolute bottom-2 inset-x-2 text-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-10">
                              <span className="text-[9px] text-white block font-sans truncate font-semibold leading-none">
                                {cell.partner.name}
                              </span>
                              <span className="text-[7.5px] font-bold text-brand-accent uppercase tracking-widest font-mono block mt-0.5 opacity-90">
                                {cell.partner.role}
                              </span>
                            </div>

                            {/* Intersection Crosshair */}
                            <PlusIcon
                              className="absolute -right-[12px] -bottom-[12px] z-10 size-6 text-white/5 group-hover:text-brand-accent/25 transition-colors pointer-events-none"
                              strokeWidth={0.75}
                            />
                          </div>
                        );
                      }

                      if (cell.type === 'cta') {
                        return (
                          <Link
                            href="/contact"
                            key="cta-card"
                            className={`relative flex flex-col justify-center items-center px-4 py-6 border-white/5 h-24 md:h-28 bg-brand-primary/[0.01] hover:bg-brand-primary/5 group cursor-pointer transition-colors duration-300 overflow-hidden border-b ${borderRightClass} ${desktopBorderRightClass}`}
                          >
                            <div className="flex flex-col items-center justify-center text-center transform group-hover:-translate-y-3 transition-transform duration-300 relative z-10">
                              <PlusIcon className="size-5 text-brand-accent mb-1 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
                              <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-brand-accent">Partner with CFBF</span>
                            </div>
                            <div className="absolute bottom-2 inset-x-2 text-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-10">
                              <span className="text-[8px] font-bold text-white uppercase tracking-wider flex items-center justify-center gap-0.5">
                                Join PFA co-financiers <ArrowUpRight size={8} />
                              </span>
                            </div>
                            <PlusIcon
                              className="absolute -right-[12px] -bottom-[12px] z-10 size-6 text-white/5 group-hover:text-brand-accent/25 transition-colors pointer-events-none"
                              strokeWidth={0.75}
                            />
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={`empty-${idx}`}
                          className={`relative border-white/5 h-24 md:h-28 bg-[#010908] pointer-events-none border-b ${borderRightClass} ${desktopBorderRightClass}`}
                        >
                          <PlusIcon
                            className="absolute -right-[12px] -bottom-[12px] z-10 size-6 text-white/5 pointer-events-none"
                            strokeWidth={0.75}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
