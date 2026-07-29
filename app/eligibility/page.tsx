"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Check,
  Download,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Zap,
  Sprout,
  Clock,
  FileText,
  ShieldCheck,
  Activity,
  UserCheck,
  FolderCheck,
  Search,
  Sun,
  Radio,
  Flame,
  Home,
  ChevronLeft,
  ChevronRight,
  ScrollText,
  Users,
  Building2,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import GlassHero from '@/components/GlassHero';
import SectionHeader from '@/components/ui/SectionHeader';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

const SECTORS = [
  {
    icon: Sun,
    title: "Solar Hybrid Grids",
    desc: "Off-grid solar-hybrid mini-grids with battery storage for rural and peri-urban communities.",
    sdg: "SDG 7 & 13"
  },
  {
    icon: Radio,
    title: "Green Telephony",
    desc: "Solar-as-a-service for telecom towers, replacing diesel generators with clean energy.",
    sdg: "SDG 13"
  },
  {
    icon: Sprout,
    title: "Productive Agro-Use",
    desc: "Solar-powered agro-processing hubs, irrigation pumps, and crop drying facilities.",
    sdg: "SDG 2 & 7"
  },
  {
    icon: Flame,
    title: "Clean Cooking & Cold Chain",
    desc: "SME CoolHubs, solar refrigeration, and clean cooking products for households and businesses.",
    sdg: "SDG 13"
  },
  {
    icon: Home,
    title: "Solar Home Systems",
    desc: "Distributed solar home systems increasing household energy access across Nigeria.",
    sdg: "SDG 7"
  },
];

// Cycling color scheme: white → brand-cyan → brand-primary
const CARD_STYLES = [
  {
    wrapper: "bg-[#FAFDFB] border border-gray-200 shadow-sm",
    title: "text-[#051F1A]",
    desc: "text-[#051F1A]/70",
    iconBg: "bg-[#051F1A]/8 border-[#051F1A]/10",
    iconColor: "text-[#051F1A]",
    sdg: "text-[#051F1A]/50",
  },
  {
    wrapper: "bg-brand-cyan shadow-md",
    title: "text-white",
    desc: "text-white/90",
    iconBg: "bg-white/20 border-white/20",
    iconColor: "text-white",
    sdg: "text-white/70",
  },
  {
    wrapper: "bg-brand-primary shadow-md",
    title: "text-white",
    desc: "text-white/85",
    iconBg: "bg-white/20 border-white/20",
    iconColor: "text-white",
    sdg: "text-white/70",
  },
] as const;

function SectorScroller() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    function update() {
      const vc = window.innerWidth >= 1024 ? 3 : 1;
      setVisibleCount(vc);
      setActiveIndex(i => Math.min(i, Math.max(0, SECTORS.length - vc)));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, SECTORS.length - visibleCount);
  const prev = () => setActiveIndex(i => Math.max(0, i - 1));
  const next = () => setActiveIndex(i => Math.min(maxIndex, i + 1));
  const translatePct = (activeIndex * (100 / visibleCount)).toFixed(4);

  return (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
    >
      {/* Sub-heading */}
      <div className="flex items-center gap-2 mb-3 px-1.5">
        <div className="h-px w-4 bg-white/30" />
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase font-mono text-white/50">
          Eligible sectors
        </span>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${translatePct}%)` }}
        >
          {SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            const style = CARD_STYLES[idx % 3];
            return (
              <div key={idx} className="flex-shrink-0 w-full lg:w-1/3 px-1.5">
                <div className={`${style.wrapper} rounded-[6px] p-8 min-h-[220px] h-full flex flex-col justify-between cursor-default group`}>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 ${style.iconBg}`}>
                    <Icon size={20} className={style.iconColor} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold leading-tight font-sans mb-2 ${style.title}`}>{sector.title}</h3>
                    <p className={`text-sm leading-relaxed font-sans line-clamp-3 ${style.desc}`}>{sector.desc}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider font-mono mt-3 block ${style.sdg}`}>{sector.sdg}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 px-1.5">
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-200 rounded-full focus:outline-none ${
                i === activeIndex ? 'w-4 h-1.5 bg-[#81C34D]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#81C34D] hover:text-[#81C34D] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            onClick={next}
            disabled={activeIndex >= maxIndex}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#81C34D] hover:text-[#81C34D] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function EligibilityPage() {
  const router = useRouter();

  const fundingSteps = [
    {
      step: "01",
      title: "Checklist & request",
      desc: "Developer completes the preliminary readiness checklist and submits a formal Guarantee Request Letter to InfraCredit.",
      icon: FileText
    },
    {
      step: "02",
      title: "Origination check",
      desc: "InfraCredit conducts a preliminary assessment, confirms eligibility for facility support, and obtains internal New Business Committee (NBC) approval.",
      icon: Activity
    },
    {
      step: "03",
      title: "Mandate signing",
      desc: "InfraCredit completes Know Your Customer (KYC) verification and the Company executes the formal Mandate Letter.",
      icon: UserCheck
    },
    {
      step: "04",
      title: "Credit Committee approval",
      desc: "InfraCredit conducts a detailed credit assessment and obtains Board Credit Committee approval.",
      icon: FolderCheck
    },
    {
      step: "05",
      title: "Due diligence",
      desc: "InfraCredit conducts comprehensive Environmental & Social (ESG), technical, and legal due diligence on the project.",
      icon: Search
    },
    {
      step: "06",
      title: "Investment review",
      desc: "The Facility's Investment Committee/Adviser reviews project details and issues a formal No-Objection.",
      icon: Clock
    },
    {
      step: "07",
      title: "Facility approval",
      desc: "InfraCredit obtains final Facility Investment Approval and negotiates the co-financing agreements with the developer.",
      icon: ShieldCheck
    },
    {
      step: "08",
      title: "CP satisfaction",
      desc: "The Company satisfies all required Conditions Precedent (CPs) to closing.",
      icon: Check
    },
    {
      step: "09",
      title: "Financial close",
      desc: "Execution of the local currency guarantee and successful co-financing disbursement.",
      icon: Zap
    }
  ];

  const orderClasses = [
    "md:order-1",
    "md:order-2",
    "md:order-3",
    "md:order-6",
    "md:order-5",
    "md:order-4",
    "md:order-7",
    "md:order-8",
    "md:order-9",
  ];

  const renderDesktopArrow = (idx: number) => {
    const baseArrowClass = "hidden md:flex absolute items-center justify-center text-[#81C34D] z-20 pointer-events-none";
    if (idx === 0 || idx === 1 || idx === 6 || idx === 7) {
      return (
        <div className={`${baseArrowClass} top-1/2 -right-7 -translate-y-1/2`}>
          <ArrowRight size={20} />
        </div>
      );
    }
    if (idx === 2 || idx === 5) {
      return (
        <div className={`${baseArrowClass} left-1/2 -bottom-10 -translate-x-1/2`}>
          <ArrowDown size={20} />
        </div>
      );
    }
    if (idx === 3 || idx === 4) {
      return (
        <div className={`${baseArrowClass} top-1/2 -left-7 -translate-y-1/2`}>
          <ArrowLeft size={20} />
        </div>
      );
    }
    return null;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Eligibility Guidelines & Criteria Framework",
    "description": "Pre-qualification standards and timeline workflow for accessing funding from the Climate Finance Blending Facility.",
    "publisher": {
      "@type": "Organization",
      "name": "Climate Finance Blending Facility (CFBF)"
    }
  };

  return (
    <div className="bg-[#051F1A] text-white min-h-screen relative overflow-hidden font-sans text-left">
      <title>Eligibility requirements & pre-qualification | CFBF</title>
      <meta name="description" content="Pre-qualification standards and timeline workflow for accessing funding from the Climate Finance Blending Facility." />

      <meta name="DC.title" content="Eligibility framework & pre-qualification | CFBF" />
      <meta name="DC.creator" content="NoLimitBuzz" />
      <meta name="DC.subject" content="Eligibility Criteria, Pre-qualification, ESG Compliance" />
      <meta name="DC.description" content="Pre-qualification standards and timeline workflow for accessing funding from the Climate Finance Blending Facility." />
      <meta name="DC.publisher" content="Climate Finance Blending Facility" />
      <meta name="DC.language" content="en" />
      <meta name="DC.type" content="Eligibility Guidelines" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlassHero
        title={
          <>
            Eligibility requirements: <span className="text-[#9BB7B1]">a guide to applying for funding</span>
          </>
        }
        subtitle="Pre-qualification standards"
        bgImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
        currentPage="eligibility"
        description={
          <>
            <p>
              We believe in promoting sustainable and innovative projects that will help reduce the impacts of
              climate change, and to achieve this goal, we have established a set of eligibility criteria that must
              be met before applying for funding. By reviewing this page, you will gain a better understanding of
              what we are looking for in a project and whether your initiative is a good fit for our facility.
            </p>
            <p className="text-white/50 text-sm mt-3">
              The pathway below condenses our{" "}
              <a href="#process" className="text-[#81C34D] underline underline-offset-2 hover:text-white transition-colors">
                full nine-step process
              </a>{" "}
              into four clear phases.
            </p>
          </>
        }
      >
        <SectorScroller />
      </GlassHero>

      {/* Light Theme Wrapper: Asymmetric Bento Grid Criteria Console */}
      <div data-rag-chunk="eligibility-criteria-pillars" className="bg-[#FAFDFB] text-[#051F1A] py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <motion.div {...fadeUp(0)} className="mb-8">
            <SectionHeader 
              sub="Criteria pillars" 
              title={
                <>
                  CFBF <span className="text-[#7C9590]">eligibility framework</span>
                </>
              } 
              dark={false}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            
            {/* Cell 1: Technology & Sectors (Col-span 2) */}
            <motion.div
              {...fadeUp(0.04)}
              whileHover={{ y: -4 }}
              className="bg-[#02100d] border border-[#144D3F] text-white p-8 rounded-[6px] shadow-lg flex flex-col justify-between lg:col-span-2 min-h-[260px] relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#81C34D]/5 to-transparent opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#81C34D]/10 border border-[#81C34D]/20 flex items-center justify-center mb-6 text-[#81C34D]">
                  <Zap size={18} />
                </div>
                <h4 className="font-bold text-lg font-sans mb-3">01. Eligible Technologies & Sectors</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans max-w-2xl">
                  Projects must be off-grid clean energy solutions such as solar mini-grids, solar homes systems, solar lanterns, fridges, pumps, driers and clean cooking products, small medium enterprise coolhubs and low carbon public transport or such other eligible projects as may be approved by the Funders.
                </p>
                <div className="h-px bg-white/10 my-4" />
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Projects should increase energy access and/or productive use of energy.
                </p>
              </div>
              <span className="text-[9px] font-bold text-brand-primary uppercase tracking-wider font-mono mt-6 relative z-10">SDG 7 & 13 Focus</span>
            </motion.div>

            {/* Cell 2: Financial Suitability (Col-span 1) */}
            <motion.div
              {...fadeUp(0.08)}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 p-8 rounded-[6px] shadow-sm flex flex-col justify-between min-h-[260px] hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#00A788]/10 border border-[#00A788]/20 flex items-center justify-center mb-6 text-[#00A788]">
                  <ScrollText size={18} />
                </div>
                <h4 className="font-bold text-base font-sans text-[#051F1A] mb-3">02. InfraCredit Infrastructure Criteria</h4>
                <ul className="space-y-1.5 text-xs text-gray-500 font-sans list-decimal pl-4 leading-normal">
                  <li>Naira denominated</li>
                  <li>Debt Instrument</li>
                  <li>Acceptable Credit Profile based on InfraCredit's internal credit assessment</li>
                  <li>Adequate Security Package</li>
                  <li>Debt Tenor of up to 10 years</li>
                  <li>Satisfies InfraCredit's Environmental and Social Safeguards Standards</li>
                  <li>Is not on InfraCredit's Project Exclusion List</li>
                  <li>Issuer is PENCOM Compliant</li>
                </ul>
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mt-6">INFRASTRUCTURE MINIMUMS</span>
            </motion.div>

            {/* Cell 3: Regulatory & ESG Compliance (Col-span 1) */}
            <motion.div
              {...fadeUp(0.12)}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 p-8 rounded-[6px] shadow-sm flex flex-col justify-between min-h-[260px] hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#009FD4]/10 border border-[#009FD4]/20 flex items-center justify-center mb-6 text-[#009FD4]">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-bold text-base font-sans text-[#051F1A] mb-3">03. Compliance & Scale</h4>
                <ul className="space-y-2 text-xs text-gray-500 font-sans">
                  <li className="flex gap-2"><span className="text-[#009FD4] font-bold">•</span> Must comply with IFC Economic Sustainability and Governance Standards</li>
                  <li className="flex gap-2"><span className="text-[#009FD4] font-bold">•</span> Minimum of 1 active operational mini-grid site(s)</li>
                  <li className="flex gap-2"><span className="text-[#009FD4] font-bold">•</span> Scalable business model</li>
                </ul>
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mt-6">ESG & GROWTH GUIDELINES</span>
            </motion.div>

            {/* Cell 4: Capacity & Scale (Col-span 2) */}
            <motion.div
              {...fadeUp(0.16)}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 p-8 rounded-[6px] shadow-sm flex flex-col justify-between lg:col-span-2 min-h-[260px] hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#00A788]/10 border border-[#00A788]/20 flex items-center justify-center mb-6 text-[#00A788]">
                  <Building2 size={18} />
                </div>
                <h4 className="font-bold text-base font-sans text-[#051F1A] mb-6">04. Operational & Capacity Scale</h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold font-mono text-[#051F1A] block">150kW+</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-1">Installed Capacity</span>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-bold font-mono text-[#051F1A] block">200+</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-1">Paying Customers</span>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-bold font-mono text-[#051F1A] block">1+</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-1">Active Site</span>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-bold font-mono text-[#051F1A] block">Scalable</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-1">Business Model</span>
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mt-6">DEVELOPMENT THRESHOLDS</span>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Dark Theme Wrapper: Timeline Workflow & Consolidated CTA */}
      <div id="process" data-rag-chunk="eligibility-timeline-workflow" className="bg-[#051F1A] text-white py-24 relative z-10 border-t border-white/5 scroll-mt-24">
        <div className="absolute top-[10vh] right-0 w-1/4 h-1/4 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1280px]">
          <motion.div {...fadeUp(0)} className="mb-28">
            <SectionHeader 
              sub="Timeline workflow" 
              title={
                <>
                  Process for accessing funding from the <span className="text-[#9BB7B1]">Climate Finance Blending Facility</span>
                </>
              } 
              dark={true}
            />
          </motion.div>

          {/* Serpentine 3x3 Grid flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-x-12 md:gap-y-12 relative mt-16">
            {fundingSteps.map((step, idx) => {
              const Icon = step.icon;
              const orderClass = orderClasses[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                  className={`relative flex flex-col justify-between ${orderClass}`}
                >
                  <div className="bg-[#031411] border border-white/10 p-6 rounded-[6px] hover:border-white/20 hover:bg-[#06241e] transition-all duration-300 shadow-md h-full flex gap-4 items-start text-left group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-brand-primary group-hover:text-[#81C34D] group-hover:border-[#81C34D] transition-colors duration-300">
                      <Icon size={18} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#81C34D]/70 font-semibold tracking-wider block">Step {step.step}</span>
                      <h4 className="font-bold text-sm text-white font-sans">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Serpentine Arrows */}
                  {renderDesktopArrow(idx)}

                  {/* Mobile Down Arrows */}
                  {idx < 8 && (
                    <div className="flex md:hidden justify-center my-2 text-[#81C34D]">
                      <ArrowDown size={18} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── NEXT STEPS CTA BAR ────── */}
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
            <Link
              href="/projects"
              className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">
                  Portfolio
                </span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">
                    Browse portfolio
                  </h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">
                    Discover how our credit wraps support developers
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>

            <Link
              href="/how-it-works"
              className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">
                  Architecture
                </span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">
                    Learn how it works
                  </h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">
                    Understand our blending process & structures
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>

            <Link
              href="/impact"
              className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-6">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">
                  Impact
                </span>
                <div className="h-8 w-px bg-white/25" />
                <div>
                  <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">
                    View our impact
                  </h4>
                  <p className="text-white/65 text-xs font-light mt-0.5 font-sans">
                    Explore carbon targets and video stories
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Consolidated Call To Action Panel */}
      <div className="relative z-10 w-full">
        <div className="min-h-[460px] relative flex items-center justify-center group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop"
            alt="CFBF Factsheet & Assessment Background"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-brand-dark/70 group-hover:bg-brand-dark/65 transition-colors z-10" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 text-center max-w-3xl px-6 flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#81C34D]/10 border border-[#81C34D]/20 flex items-center justify-center mb-6 text-[#81C34D]">
              <FolderCheck size={24} />
            </div>

            <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">Assessment &amp; Factsheet</span>
            <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
              Find out if you are <span className="text-brand-accent">eligible</span>
            </h3>

            <p className="text-white/75 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              Take our interactive Project Readiness Assessment to quickly verify compliance against fatal requirements, estimate your qualifying scores, and fast-track your Guarantee Request. You can also download the complete Eligibility &amp; Framework Factsheet for offline reference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
              <button
                onClick={() => router.push('/eligibility/assessment')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#81C34D] text-[#051F1A] hover:bg-white hover:text-brand-dark px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans shadow-lg cursor-pointer select-none focus:outline-none"
              >
                Start the process <ArrowRight size={16} />
              </button>
              <a
                href="/wp-content/uploads/2026/05/CFBF-Factsheet-compressed.pdf"
                download="CFBF_Factsheet.pdf"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-[#81C34D] hover:bg-[#81C34D] hover:text-[#051F1A] text-white px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans shrink-0 focus:outline-none"
              >
                <Download size={14} /> Download factsheet
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
