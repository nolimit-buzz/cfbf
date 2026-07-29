"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Lock, Database, Zap, RefreshCw, ChevronDown, ArrowUpRight, Mail,
  FileText, Search, Shield, ExternalLink
} from 'lucide-react';
import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import StepCard, { StepTheme } from '@/components/ui/StepCard';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: EASE, delay },
});

const PORTALS = [
  {
    id: 'dataroom',
    icon: Database,
    label: 'Dataroom Access',
    accentColor: '#00A788',
    tag: 'Project Files',
    description: 'Access confidential project documentation, financial models, legal term sheets, and due diligence materials for active CFBF portfolio investments.',
    registerUrl: 'https://dataroom.infracredit.ng/',
    loginUrl: 'https://dataroom.infracredit.ng/',
    hasRegister: true,
    badge: 'Restricted Access',
  },
  {
    id: 'pipeline',
    icon: Zap,
    label: 'Clean Energy Deal Pipeline',
    accentColor: '#009FD4',
    tag: 'Transaction Status',
    description: 'Monitor real-time status updates across the clean energy transaction pipeline — from origination through financial close and ongoing monitoring.',
    loginUrl: 'https://ces.infracredit.ng/',
    hasRegister: false,
    badge: 'Live Updates',
  },
  {
    id: 'transaction',
    icon: RefreshCw,
    label: 'Transaction Update Portal',
    accentColor: '#81C34D',
    tag: 'Portfolio Reporting',
    description: 'Get structured access to transaction-level reporting, covenant tracking, ESG data submissions, and investor communications for your committed investments.',
    registerUrl: 'https://apps.powerapps.com/play/e/default-3d1d815e-5346-4244-9f7b-62b78fb742b1/a/ef8b1331-5e6a-4f9b-ba52-3f64bd97bdf8?tenantId=3d1d815e-5346-4244-9f7b-62b78fb742b1&source=portal',
    loginUrl: 'https://apps.powerapps.com/play/e/default-3d1d815e-5346-4244-9f7b-62b78fb742b1/a/ef8b1331-5e6a-4f9b-ba52-3f64bd97bdf8?tenantId=3d1d815e-5346-4244-9f7b-62b78fb742b1&source=portal',
    hasRegister: true,
    badge: 'PowerApps',
  },
];

const FAQS = [
  {
    q: 'Can I access my product online?',
    a: 'Investment, education and funeral bonds are accessible through your registered dataroom account. Projects must be off-grid clean energy solutions such as solar mini-grids, solar home systems, solar lanterns, fridges, pumps, driers and clean cooking products, small medium enterprise coolhubs and low carbon public transport or such other eligible projects as may be approved by the Funders.',
  },
  {
    q: 'How do I register for Dataroom access?',
    a: 'Click the "Register" button on the Dataroom Access card above. You will be directed to the InfraCredit secure dataroom portal where you can complete your registration. Access is granted after identity verification by the CFBF team.',
  },
  {
    q: 'Who do I contact if I have login issues?',
    a: 'For login or access issues, please reach out to the CFBF team via the Contact page. The team typically responds within one business day.',
  },
  {
    q: 'What is the Clean Energy Deal Pipeline portal?',
    a: 'The Clean Energy Deal Pipeline (CES) gives registered funders visibility into all active transactions being originated and structured by CFBF, including indicative terms, project stages, and current status across the pipeline.',
  },
];

const QUICK_LINKS = [
  { label: 'Enquiries', href: '/contact', icon: Mail },
  { label: 'Forms & Documentation', href: '/contact', icon: FileText },
  { label: 'Find a Fund', href: '/projects', icon: Search },
];

const HERO_CARDS = [
  {
    index: '01',
    title: 'Secure Dataroom',
    desc: 'Access confidential project documents, term sheets, and financial models under identity-verified controls.',
    theme: 'light' as StepTheme,
  },
  {
    index: '02',
    title: 'Pipeline Dealflow',
    desc: 'Monitor real-time status of clean energy transactions from origination to financial close.',
    theme: 'cyan' as StepTheme,
  },
  {
    index: '03',
    title: 'ESG & Compliance',
    desc: 'Retrieve transaction-level reporting, covenant tracking sheets, and impact performance metrics.',
    theme: 'green' as StepTheme,
  },
];

const cardShadows: Record<string, string> = {
  dataroom: "hover:shadow-[0_12px_32px_rgba(0,167,136,0.06)] hover:border-[#00A788]/30",
  pipeline: "hover:shadow-[0_12px_32px_rgba(0,159,212,0.06)] hover:border-[#009FD4]/30",
  transaction: "hover:shadow-[0_12px_32px_rgba(129,195,77,0.06)] hover:border-[#81C34D]/30",
};

const topLineGradients: Record<string, string> = {
  dataroom: "bg-gradient-to-r from-[#00A788]/0 via-[#00A788]/50 to-[#00A788]/0",
  pipeline: "bg-gradient-to-r from-[#009FD4]/0 via-[#009FD4]/50 to-[#009FD4]/0",
  transaction: "bg-gradient-to-r from-[#81C34D]/0 via-[#81C34D]/50 to-[#81C34D]/0",
};

const buttonTextColors: Record<string, string> = {
  dataroom: "text-white hover:bg-[#009075]",
  pipeline: "text-white hover:bg-[#008bc0]",
  transaction: "text-[#051F1A] hover:bg-[#72b43d]",
};

const registerButtonColors: Record<string, string> = {
  dataroom: "hover:border-[#00A788]/40 hover:bg-[#00A788]/05",
  pipeline: "hover:border-[#009FD4]/40 hover:bg-[#009FD4]/05",
  transaction: "hover:border-[#81C34D]/40 hover:bg-[#81C34D]/05",
};

export default function FunderLoginPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFDFB] font-sans">

      {/* ── HERO — matches About / Contact / Eligibility standard ── */}
      <GlassHero
        title={
          <>
            Funder{' '}
            <span className="text-[#9BB7B1] italic font-serif">Login</span>
          </>
        }
        subtitle="Funder portal"
        currentPage="funder login"
        bgImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop"
        description={
          <p>
            Welcome to your secure portal — access confidential project documentation,
            deal pipeline updates, and transaction-level reporting for your CFBF commitments.
            All portals are protected by InfraCredit's identity-verified access controls.
          </p>
        }
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          variants={heroRowVariants}
          initial="hidden"
          animate="show"
        >
          {HERO_CARDS.map((card) => (
            <motion.div key={card.index} variants={heroCardVariants} whileHover={{ y: -4 }}>
              <StepCard
                index={card.index}
                title={card.title}
                desc={card.desc}
                theme={card.theme}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </GlassHero>

      {/* ── ACCOUNT PORTALS ── */}
      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-16 relative z-10">
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-[#00A788]" />
            <span className="text-[#00A788] text-xs font-bold uppercase tracking-[0.2em] font-mono">
              Account Logins
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#051F1A] tracking-tight">
            Select your access portal
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PORTALS.map((portal, i) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.id}
                {...fadeUp(i * 0.08)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`relative bg-gradient-to-br from-white via-white/98 to-[#FAFDFB]/95 border border-gray-200/50 rounded-[12px] p-7 flex flex-col justify-between group shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-400 text-left overflow-hidden ${cardShadows[portal.id]}`}
              >
                {/* Top border glow line */}
                <div className={`absolute top-0 left-0 right-0 h-[2.5px] transition-transform duration-500 origin-center scale-x-75 group-hover:scale-x-100 ${topLineGradients[portal.id]}`} />

                {/* Subtle architectural grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.18] group-hover:opacity-[0.28] transition-opacity duration-500 pointer-events-none" />

                {/* Card header */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-11 h-11 rounded-[8px] flex items-center justify-center transition-all duration-500 group-hover:scale-102 relative"
                      style={{ 
                        backgroundColor: `${portal.accentColor}12`, 
                        border: `1px solid ${portal.accentColor}25`,
                      }}
                    >
                      {/* Glow backdrop behind icon on hover */}
                      <div 
                        className="absolute inset-0 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
                        style={{
                          backgroundColor: `${portal.accentColor}25`,
                        }}
                      />
                      <Icon size={20} className="relative z-10" style={{ color: portal.accentColor }} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold font-mono text-gray-300 group-hover:text-gray-400/80 transition-colors duration-300">
                        {`0${i + 1}`}
                      </span>
                      <span
                        className="text-[9px] font-bold font-mono uppercase tracking-widest px-2.5 py-1 rounded-[4px] border transition-colors duration-300"
                        style={{ 
                          color: portal.accentColor, 
                          backgroundColor: `${portal.accentColor}06`,
                          borderColor: `${portal.accentColor}20`
                        }}
                      >
                        {portal.badge}
                      </span>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em] font-mono block mb-1.5 transition-colors duration-300"
                    style={{ color: portal.accentColor }}
                  >
                    {portal.tag}
                  </span>
                  <h3 className="text-base font-bold text-[#051F1A] tracking-tight mb-3.5 leading-snug group-hover:text-opacity-95">
                    {portal.label}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-light mb-6">
                    {portal.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5 border-t border-gray-100/70 pt-5 mt-auto relative z-10">
                  <a
                    href={portal.loginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 font-mono shadow-sm hover:shadow-md hover:-translate-y-0.5 ${buttonTextColors[portal.id]}`}
                    style={{
                      backgroundColor: portal.accentColor,
                    }}
                  >
                    Login
                    <ExternalLink size={11} />
                  </a>

                  {portal.hasRegister && portal.registerUrl && (
                    <a
                      href={portal.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-[6px] text-xs font-bold uppercase tracking-wider border border-gray-200 text-[#051F1A] transition-all duration-300 font-mono hover:-translate-y-0.5 ${registerButtonColors[portal.id]}`}
                    >
                      Register
                      <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── QUICK LINKS + FAQ ── */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">

          {/* Quick Links */}
          <motion.div {...fadeUp(0)} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#00A788]" />
              <span className="text-[#00A788] text-xs font-bold uppercase tracking-[0.2em] font-mono">
                Quick Links
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-between p-4 border border-gray-100 rounded-[6px] hover:border-[#00A788]/30 hover:bg-[#F3FAF6] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-[4px] bg-[#00A788]/8 flex items-center justify-center">
                        <LinkIcon size={13} className="text-[#00A788]" />
                      </div>
                      <span className="text-sm font-semibold text-[#051F1A] group-hover:text-[#00A788] transition-colors font-sans">
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight size={14} className="text-gray-300 group-hover:text-[#00A788] transition-colors" />
                  </Link>
                );
              })}

              {/* Facility brief */}
              <div className="mt-4 p-4 border border-gray-100 rounded-[6px] bg-[#F3FAF6]">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={12} className="text-[#00A788]" />
                  <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-[#00A788]">
                    About CFBF
                  </span>
                </div>
                <p className="text-gray-500 text-[11px] leading-relaxed font-light">
                  The Climate Finance Blending Facility is a catalytic facility capitalised with USD 21.3M concessional
                  funding by the UK FCDO and the British International Investment (BII) to mobilise additional funding
                  from development partners to co-finance off-grid clean energy investments alongside InfraCredit's
                  local currency guarantees in Nigeria.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-bold font-mono uppercase tracking-wider text-[#00A788] hover:text-[#051F1A] transition-colors"
                >
                  Contact for enquiries <ArrowUpRight size={10} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div {...fadeUp(0.05)} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#00A788]" />
              <span className="text-[#00A788] text-xs font-bold uppercase tracking-[0.2em] font-mono">
                Frequently Asked
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#051F1A] tracking-tight mb-6">
              Common questions about portal access
            </h2>

            <div className="flex flex-col gap-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-gray-100 rounded-[6px] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F3FAF6] transition-colors group focus:outline-none"
                  >
                    <span className="text-sm font-semibold text-[#051F1A] group-hover:text-[#00A788] transition-colors pr-4 leading-snug font-sans">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#00A788]' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                          <p className="text-gray-500 text-sm leading-relaxed font-light">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── CONTACT CTA STRIP ── */}
      <div className="bg-[#051F1A] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-sm mb-0.5">Need access assistance?</p>
            <p className="text-white/50 text-xs font-light">Our team will verify your credentials and provision access within one business day.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[#00A788] text-[#051F1A] px-6 py-3 rounded-[6px] text-xs font-bold uppercase tracking-wider font-mono hover:bg-[#81C34D] transition-colors duration-300"
          >
            Contact the team
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

    </div>
  );
}
