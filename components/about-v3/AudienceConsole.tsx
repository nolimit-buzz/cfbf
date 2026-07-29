"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Check, ArrowRight, Download, FileText, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Persona = 'investor' | 'developer' | 'partner';

interface ChecklistItem {
  question: string;
  answer: string;
}

interface PersonaDetails {
  id: Persona;
  tabLabel: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  intro: string;
  ctaText: string;
  ctaHref: string;
  isDownload: boolean;
  checklist: ChecklistItem[];
}

const PERSONA_DATA: PersonaDetails[] = [
  {
    id: 'investor',
    tabLabel: 'Institutional Investor',
    icon: ShieldCheck,
    title: "Unlocking secure local currency assets for Nigerian PFAs",
    tagline: "Regulatory-compliant, AAA-rated investments de-risked from first loss.",
    intro: "CFBF bridges the gap between infrastructure need and institutional safety. By blending concessional seed capital with AAA-credit wraps, we deliver institutional-grade green debt structures tailored for Pension Fund Administrators, Asset Managers, and Insurance providers.",
    ctaText: "Download Prospectus & Factsheet",
    ctaHref: "/wp-content/uploads/2026/05/CFBF-Factsheet-compressed.pdf",
    isDownload: true,
    checklist: [
      { question: "Is the investment principal secured?", answer: "Yes, Senior debt blocks are wrapped in an unconditional, irrevocable AAA credit guarantee administered by InfraCredit." },
      { question: "What is the green asset governance standard?", answer: "Every transaction is pre-certified under the international Climate Bonds Initiative (CBI) standards." },
      { question: "How does it align with PENCOM guidelines?", answer: "Structures comply fully with PENCOM regulations, matching statutory asset quality and tenor requirements (up to 10 years)." },
      { question: "Are payments denominated in foreign currency?", answer: "No, all transactions and payouts are denominated in Nigerian Naira (NGN) to eliminate foreign exchange risk." },
    ]
  },
  {
    id: 'developer',
    tabLabel: 'Project Developer',
    icon: Zap,
    title: "Accessing catalytic local currency funding for clean energy assets",
    tagline: "Concessional subordinated debt and risk-sharing structures for developers.",
    intro: "We provide project developers with first-loss risk-sharing facilities, credit-guaranteed local currency loans, and structured debt co-financing. This de-risks clean energy projects, enabling them to raise patient capital from local markets.",
    ctaText: "Start Eligibility Assessment",
    ctaHref: "/eligibility",
    isDownload: false,
    checklist: [
      { question: "What technologies are eligible for facility support?", answer: "Solar hybrid mini-grids, green telecom infrastructure, productive agro-use solar hubs, clean cooking, and solar home systems." },
      { question: "What is the minimum scale or capacity required?", answer: "Projects require a minimum of 150 kW combined capacity, 1 active operational site, and 200+ registered paying customers." },
      { question: "Do you offer equity or seed grants?", answer: "CFBF operates through local currency debt instruments and guarantees, co-investing alongside project sponsors." },
      { question: "What ESG safeguards must my project satisfy?", answer: "Developers must comply strictly with IFC Environmental & Social Safeguards, and PENCOM rules." },
    ]
  },
  {
    id: 'partner',
    tabLabel: 'Development Partner',
    icon: Globe,
    title: "Scaling catalytic development impact in Sub-Saharan Africa",
    tagline: "High-leverage mobilization of private finance to support climate goals.",
    intro: "Seeded by the UK FCDO and co-invested with BII, CFBF sets a repeatable blueprint for blended finance. We absorb early-stage risk, mobilizing domestic private pension capital at scale to achieve real-world energy access and emission reductions.",
    ctaText: "View Impact Reports & SDGs",
    ctaHref: "/projects",
    isDownload: false,
    checklist: [
      { question: "What is the capitalization of the facility?", answer: "Capitalisation of USD21.3M concessional funding from the UK Foreign, Commonwealth & Development Office (FCDO) and British International Investment (BII)." },
      { question: "How is the capital mobilization leverage measured?", answer: "We target a high multiplier, leveraging institutional capital by layering concessional risk-absorption cushions." },
      { question: "Which UN Sustainable Development Goals (SDGs) are aligned?", answer: "Primary focus is SDG 7 (Affordable Clean Energy) and SDG 13 (Climate Action), with secondary impact on SDG 8 & 9 (Jobs and Infrastructure)." },
      { question: "How does the facility align with national climate policies?", answer: "We directly support Nigeria's Energy Transition Plan (ETP) target of achieving Net Zero emissions by 2060." },
    ]
  }
];

export default function AudienceConsole({ className = "" }: { className?: string }) {
  const [activePersona, setActivePersona] = useState<Persona>('investor');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const router = useRouter();

  const currentData = PERSONA_DATA.find((p) => p.id === activePersona)!;
  const ActiveIcon = currentData.icon;

  const handlePersonaChange = (persona: Persona) => {
    setActivePersona(persona);
    setExpandedIndex(0);
  };

  const handleCta = (href: string, isDownload: boolean) => {
    if (isDownload) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  };

  return (
    <section className={`py-24 bg-white relative overflow-hidden ${className}`}>
      <div className="container mx-auto px-6 max-w-[1280px]">
        
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-6 text-left">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono">
                Identify your role
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-brand-dark font-sans tracking-tight">
              Partner with <span className="text-[#7C9590] italic font-serif">CFBF</span>
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {PERSONA_DATA.map((p) => {
              const isSelected = activePersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePersonaChange(p.id)}
                  className={`text-sm tracking-wide transition-all duration-300 font-sans pb-2 whitespace-nowrap cursor-pointer focus:outline-none relative select-none ${
                    isSelected
                      ? 'text-brand-dark font-medium'
                      : 'text-gray-400 hover:text-gray-600 font-normal'
                  }`}
                >
                  {p.tabLabel}
                  {isSelected && (
                    <motion.div
                      layoutId="activeAudienceTabLine"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Board */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-12 items-start"
          >
            
            {/* Left Content (7 columns) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <ActiveIcon size={16} />
                </div>
                <span className="text-brand-primary text-xs font-bold uppercase tracking-widest font-mono">
                  {currentData.tabLabel} Journey
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight leading-tight">
                {currentData.title}
              </h3>
              
              <p className="text-base text-gray-700 font-sans leading-relaxed italic font-medium border-l-2 border-brand-primary/40 pl-4">
                {currentData.tagline}
              </p>

              <p className="text-gray-500 text-sm leading-relaxed max-w-[65ch]">
                {currentData.intro}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => handleCta(currentData.ctaHref, currentData.isDownload)}
                  className="inline-flex items-center gap-3 bg-[#051F1A] hover:bg-brand-primary text-white hover:text-white px-8 py-4 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-sans shadow-lg focus:outline-none cursor-pointer"
                >
                  {currentData.isDownload ? <Download size={14} /> : <FileText size={14} />}
                  {currentData.ctaText}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Checklist (5 columns) - Interactive Accordion Deck */}
            <div className="lg:col-span-5 bg-[#FAFDFB] border border-gray-100 rounded-[8px] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
              <h4 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-widest mb-6 pb-3 border-b border-gray-100 text-left">
                Critical Questions &amp; Answers
              </h4>
              
              <div className="divide-y divide-gray-100 text-left">
                {currentData.checklist.map((item, i) => {
                  const isOpen = expandedIndex === i;
                  return (
                    <div key={i} className="py-2.5 first:pt-0 last:pb-0">
                      <button
                        onClick={() => setExpandedIndex(isOpen ? null : i)}
                        className="w-full flex items-start justify-between py-3.5 text-left group focus:outline-none select-none"
                      >
                        <div className="flex gap-3 items-start w-full pr-4">
                          <span className={`text-[10px] font-mono font-bold tracking-wider mt-0.5 w-5 ${isOpen ? 'text-brand-primary' : 'text-gray-400 group-hover:text-brand-primary transition-colors duration-200'}`}>
                            0{i + 1}
                          </span>
                          <h5 className={`text-xs md:text-sm font-bold font-sans leading-tight transition-colors duration-200 ${isOpen ? 'text-brand-dark' : 'text-gray-600 group-hover:text-brand-dark'}`}>
                            {item.question}
                          </h5>
                        </div>
                        <span className="shrink-0 mt-0.5">
                          <ChevronDown 
                            size={14} 
                            className={`transition-all duration-300 stroke-[2.5] ${isOpen ? 'rotate-180 text-brand-primary' : 'text-gray-400 group-hover:text-brand-primary'}`} 
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-8 pr-2 text-xs text-gray-500 leading-relaxed font-sans font-light">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
