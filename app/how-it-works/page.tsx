"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2
} from 'lucide-react';
import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import StepCard, { StepTheme } from '@/components/ui/StepCard';
import SectionHeader from '@/components/ui/SectionHeader';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

// ─── Logo constants (mirrors Footer) ──────────────────────────────────────────
const BASE = "https://infracredit.ng/climate-facility/wp-content/uploads";

const ANCHOR_FUNDERS = [
  { src: `${BASE}/2022/10/UK-DEVELOPMENT-WHITE.png`, alt: "FCDO – UK Foreign, Commonwealth & Development Office", href: "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office" },
  { src: `${BASE}/2022/10/BII_Logo_All_white_RGB.png`, alt: "British International Investment", href: "https://www.bii.co.uk/" },
];

const CO_FINANCING = {
  srcWhite: `${BASE}/2022/09/ICAsset-6@4x-8-002-1024x326-1.png`,
  srcColour: `${BASE}/2022/09/InfraCredit-1.svg`,
  alt: "InfraCredit",
  href: "https://infracredit.ng/",
};

const TA_PROVIDERS = [
  { src: `${BASE}/2022/10/FSD-Africa-logo-1.png`, alt: "FSD Africa", href: "https://fsdafrica.org/" },
  { src: `${BASE}/2022/10/Shell-foundation-1.png`, alt: "Shell Foundation", href: "https://shellfoundation.org/" },
  { src: `${BASE}/2022/10/kfw.png`, alt: "KfW", href: "https://www.kfw.de/" },
];

// ─── TA Slider ─────────────────────────────────────────────────────────────
function TaSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % TA_PROVIDERS.length), 2800);
    return () => clearInterval(t);
  }, []);
  const item = TA_PROVIDERS[current];
  return (
    <div className="relative h-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.a
          key={current}
          href={item.href} target="_blank" rel="noopener noreferrer"
          className="absolute inset-0 flex items-center group/ta"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <img src={item.src} alt={item.alt} className="h-7 w-auto object-contain brightness-0 invert opacity-70 group-hover/ta:opacity-100 transition-opacity duration-300" loading="lazy" />
        </motion.a>
      </AnimatePresence>
      <div className="absolute -bottom-4 left-0 flex gap-1.5">
        {TA_PROVIDERS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`transition-all duration-200 rounded-full ${i === current ? 'w-3 h-1.5 bg-[#81C34D]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Funding Steps ─────────────────────────────────────────────────────────
const FUNDING_STEPS = [
  { step: "01", title: "Checklist & request", desc: "Developer completes the preliminary readiness checklist and submits a formal Guarantee Request Letter to InfraCredit." },
  { step: "02", title: "Origination check", desc: "InfraCredit conducts a preliminary assessment, confirms eligibility for facility support, and obtains internal New Business Committee (NBC) approval." },
  { step: "03", title: "Mandate signing", desc: "InfraCredit completes Know Your Customer (KYC) verification and the Company executes the formal Mandate Letter." },
  { step: "04", title: "Credit Committee approval", desc: "InfraCredit conducts a detailed credit assessment and obtains Board Credit Committee approval." },
  { step: "05", title: "Due diligence", desc: "InfraCredit conducts comprehensive Environmental & Social (ESG), technical, and legal due diligence on the project." },
  { step: "06", title: "Investment review", desc: "The Facility's Investment Committee/Adviser reviews project details and issues a formal No-Objection." },
  { step: "07", title: "Facility approval", desc: "InfraCredit obtains final Facility Investment Approval and negotiates the co-financing agreements with the developer." },
  { step: "08", title: "CP satisfaction", desc: "The Company satisfies all required Conditions Precedent (CPs) to closing." },
  { step: "09", title: "Financial close", desc: "Execution of the local currency guarantee and successful co-financing disbursement." },
];

// ─── Hero 4-phase condensed cards ──────────────────────────────────────────
const HERO_STEPS: { index: string; range: string; title: string; desc: string; theme: StepTheme }[] = [
  { index: '01', range: 'Steps 1–2', title: 'Apply & Pre-qualify', desc: "Complete the readiness checklist, submit your Guarantee Request Letter, and pass InfraCredit's origination and eligibility screening.", theme: 'light' },
  { index: '02', range: 'Steps 3–4', title: 'Mandate & Credit Approval', desc: 'Clear KYC, execute the Mandate Letter, and secure Board Credit Committee approval after a detailed credit assessment.', theme: 'cyan' },
  { index: '03', range: 'Steps 5–7', title: 'Due Diligence & Structuring', desc: "Undergo ESG, technical and legal due diligence, an Investment Committee No-Objection, and final Facility approval with co-financing terms.", theme: 'green' },
  { index: '04', range: 'Steps 8–9', title: 'Conditions & Financial Close', desc: 'Satisfy all Conditions Precedent, then execute the local-currency guarantee and disburse co-financing at financial close.', theme: 'dark' },
];

export default function HowItWorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "How it works | Climate Finance Blending Facility",
    "description": "Understand the financing structure, facility architecture, and step-by-step process for accessing blended climate finance through CFBF and InfraCredit.",
    "publisher": { "@type": "Organization", "name": "Climate Finance Blending Facility (CFBF)" }
  };

  return (
    <div className="bg-[#051F1A] text-white min-h-screen font-sans text-left">
      <title>How it works — financing structure & process | CFBF</title>
      <meta name="description" content="Understand the financing structure, facility architecture, and step-by-step process for accessing blended climate finance through CFBF and InfraCredit." />
      <meta name="DC.title" content="How it works — climate finance blending facility" />
      <meta name="DC.creator" content="NoLimitBuzz" />
      <meta name="DC.subject" content="Blended Finance, Concessional Capital, Infrastructure" />
      <meta name="DC.description" content="Detailed guide on the blended finance capital flow model." />
      <meta name="DC.language" content="en" />
      <meta name="DC.type" content="Guidelines Document" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <GlassHero
        title={<>How it <span className="text-[#9BB7B1]">works</span></>}
        subtitle="Financing structure"
        bgImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
        currentPage="how-it-works"
        description={
          <>
            <p>
              From eligibility to financial close, CFBF channels concessional first-loss capital through
              InfraCredit's local-currency guarantee — unlocking domestic institutional finance for off-grid
              energy developers.
            </p>
            <p className="text-white/50 text-sm mt-3">
              The pathway below condenses our{' '}
              <a href="#process" className="text-[#81C34D] underline underline-offset-2 hover:text-white transition-colors">
                full nine-step process
              </a>{' '}
              into four clear phases.
            </p>
          </>
        }
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={heroRowVariants}
          initial="hidden"
          animate="show"
        >
          {HERO_STEPS.map((s) => (
            <motion.a
              key={s.index}
              href="#process"
              variants={heroCardVariants}
              whileHover={{ y: -4 }}
              className="block h-full focus:outline-none"
              aria-label={`${s.title} — jump to the full nine-step process`}
            >
              <StepCard index={s.index} range={s.range} title={s.title} desc={s.desc} theme={s.theme} className="h-full" />
            </motion.a>
          ))}
        </motion.div>
      </GlassHero>

      {/* ── SECTION 1: OVERVIEW + FINANCING STRUCTURE ─────────────────── */}
      <div data-rag-chunk="how-it-works-financing-structure" className="bg-[#051F1A] text-white py-24 relative z-10 border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#81C34D]/4 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#81C34D]" />
              <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-mono">Overview</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Copy */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight tracking-tight mb-6">
                  Financing <span className="text-[#9BB7B1]">structure</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                  The Facility deploys impact-focused capital to offer blended first-loss and low-interest funding to qualified off-grid energy companies. These companies gain access to Nigerian Naira debt financing from domestic capital markets, backed by InfraCredit guarantees.
                </p>
                <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
                  The initiative aims to catalyse at least 50% of funding from domestic institutional investors — including pension funds, insurance companies, and asset managers — to expand clean energy access across Nigeria.
                </p>
                <ul className="space-y-3">
                  {[
                    "Local currency (NGN) debt financing with InfraCredit guarantee",
                    "First-loss concessional capital reduces risk for private investors",
                    "Minimum 50% co-financing from domestic institutional sources",
                    "Technical assistance for developers through the facility lifecycle",
                  ].map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="flex items-start gap-3 text-sm text-gray-300 font-sans"
                    >
                      <CheckCircle2 size={16} className="text-[#81C34D] mt-0.5 shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right: Three partner logo blocks */}
              <div className="space-y-6">
                {/* Anchor Funders */}
                <motion.div
                  {...fadeUp(0.05)}
                  className="bg-white/[0.03] border border-white/8 rounded-[8px] p-6"
                >
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono mb-5">Anchor Funders</p>
                  <div className="flex items-center gap-8 flex-wrap">
                    {ANCHOR_FUNDERS.map((f) => (
                      <a key={f.alt} href={f.href} target="_blank" rel="noopener noreferrer" className="group/logo relative">
                        <img src={f.src} alt={f.alt} className="h-8 w-auto object-contain brightness-0 invert opacity-60 group-hover/logo:opacity-100 transition-all duration-300" loading="lazy" />
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Co-Financing Partner */}
                <motion.div
                  {...fadeUp(0.1)}
                  className="bg-white/[0.03] border border-white/8 rounded-[8px] p-6"
                >
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono mb-5">Co-Financing Partner</p>
                  <a href={CO_FINANCING.href} target="_blank" rel="noopener noreferrer" className="inline-block group/ic relative">
                    <img src={CO_FINANCING.srcWhite} alt={CO_FINANCING.alt} className="h-7 w-auto object-contain absolute transition-all duration-300 group-hover/ic:opacity-0 group-hover/ic:scale-95" loading="lazy" />
                    <img src={CO_FINANCING.srcColour} alt="" aria-hidden="true" className="h-7 w-auto object-contain opacity-0 scale-95 transition-all duration-300 group-hover/ic:opacity-100 group-hover/ic:scale-100" loading="lazy" />
                    <span className="invisible text-white text-xs font-bold">{CO_FINANCING.alt}</span>
                  </a>
                </motion.div>

                {/* Technical Assistance Providers */}
                <motion.div
                  {...fadeUp(0.15)}
                  className="bg-white/[0.03] border border-white/8 rounded-[8px] p-6 pb-10"
                >
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono mb-5">Technical Assistance Providers</p>
                  <TaSlider />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SECTION 2: FACILITY STRUCTURE DIAGRAM (light) ─────────────── */}
      <div data-rag-chunk="how-it-works-facility-architecture" className="bg-[#FAFDFB] text-[#051F1A] py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#00A788]" />
              <span className="text-[#00A788] text-xs font-semibold tracking-[0.2em] uppercase font-mono">Architecture</span>
            </div>
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight tracking-tight mb-4">
                Facility <span className="text-[#7C9590]">structure</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-light">
                Capital flows from anchor funders through the Facility and InfraCredit's guarantee mechanism into domestic capital markets, reaching developers and ultimately the communities they serve.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.12)}
            className="bg-white rounded-[8px] border border-gray-100 shadow-lg p-6 md:p-10 overflow-x-auto"
          >
            <div className="flex justify-center">
              <img
                src="https://infracredit.ng/climate-facility/wp-content/uploads/2023/02/new-diagram.svg"
                alt="CFBF facility financing structure diagram — showing capital flows from anchor funders through InfraCredit guarantee to developers and communities"
                className="w-full max-w-4xl h-auto"
                loading="lazy"
                style={{ minWidth: 360 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SECTION 3: 9-STEP PROCESS (dark) ─────────────────────────── */}
      <div id="process" data-rag-chunk="how-it-works-timeline-process" className="scroll-mt-24 bg-[#051F1A] text-white py-24 relative z-10 border-t border-white/5">
        <div className="absolute top-[10vh] right-0 w-1/4 h-1/4 bg-[#81C34D]/4 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-[#00A788]/4 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
          <motion.div {...fadeUp(0)}>
            <SectionHeader
              sub="Timeline workflow"
              title={<>Process for accessing <span className="text-[#9BB7B1]">funding</span></>}
              dark={true}
            />
            <p className="text-gray-400 text-base leading-relaxed font-light max-w-2xl mt-4">
              A structured nine-step pathway from initial checklist to financial close, administered by InfraCredit with Facility oversight at key milestones.
            </p>
          </motion.div>

          <div className="relative border-l border-white/10 ml-4 md:ml-8 mt-16 pl-6 md:pl-10 space-y-12">
            {FUNDING_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative group text-left"
              >
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#051F1A] border-2 border-white/20 group-hover:border-[#81C34D] transition-colors duration-300 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-400 group-hover:text-white font-mono">
                  {step.step}
                </div>
                <div className="bg-white/[0.01] border border-white/5 p-5 md:p-6 rounded-[6px] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300">
                  <h4 className="font-bold text-base md:text-lg text-white font-sans mb-2 group-hover:text-[#81C34D] transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEXT STEPS CTA BAR ─────────────────────────────────────────── */}
      <section className="pt-12 pb-6 bg-[#051F1A] text-white relative z-10 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6 max-w-[1280px]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#81C34D]" />
            <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-mono">Next steps</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Explore the <span className="text-[#9BB7B1] italic font-serif">facility portal</span>
          </h2>
        </motion.div>
      </section>

      <section className="bg-[#3da58a] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="max-w-[1280px] mx-auto px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            <Link href="/about" className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none">
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">About us</span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">Who we are</h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">Learn about our seed capital & mandates</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>

            <Link href="/eligibility" className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none">
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">Eligibility</span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">Check if you qualify</h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">Review criteria & pre-qualification standards</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>

            <Link href="/impact" className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none">
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">Impact</span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">View our impact</h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">Explore carbon targets & video stories</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
