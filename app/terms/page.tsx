"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Scale, MessageSquare } from 'lucide-react';
import GlassHero from '@/components/GlassHero';

const SECTIONS = [
  { id: 'acceptance', label: '1. Acceptance of Terms' },
  { id: 'compliance', label: '2. Service Access & Compliance' },
  { id: 'ip', label: '3. Intellectual Property' },
  { id: 'disclaimer', label: '4. Disclaimers & Warranties' },
  { id: 'liability', label: '5. Limitation of Liability' },
  { id: 'indemnity', label: '6. Indemnification' },
  { id: 'governing', label: '7. Governing Law' },
  { id: 'changes', label: '8. Changes to Terms' },
  { id: 'contact', label: '9. Contact Information' },
];

export default function TermsOfUsePage() {
  const [activeId, setActiveId] = useState('acceptance');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative font-sans antialiased text-left selection:bg-brand-accent selection:text-brand-dark">
      <title>Terms of Use | CFBF</title>
      <meta name="description" content="Review the Terms of Use governing the access and submission procedures of the Climate Finance Blending Facility portal." />

      {/* Standard GlassHero in white/light style matching the News Detail page */}
      <GlassHero
        panel="white"
        fade="light"
        title={
          <span>
            Terms of <span className="italic font-serif">Use</span>
          </span>
        }
        subtitle="Facility Terms"
        description="These Terms of Use govern your access to the Climate Finance Blending Facility web portal, simulators, and eligibility tools."
        bgImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop"
        currentPage="terms of use"
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-gray-400 uppercase tracking-widest mt-4">
          <span className="flex items-center gap-1.5">
            Last Updated: June 25, 2026
          </span>
        </div>
      </GlassHero>

      {/* Main Editorial Content Grid */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
            
            {/* Sticky Table of Contents Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-[#FAFDFB] border border-gray-100 rounded-[6px] p-6 shadow-sm">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase font-mono block mb-4">
                  Terms Sections
                </span>
                <nav className="flex flex-col gap-1.5">
                  {SECTIONS.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`text-left text-xs font-bold font-sans py-2.5 px-3 rounded-[4px] transition-all duration-300 focus:outline-none ${
                        activeId === sec.id
                          ? 'bg-[#051F1A] text-white pl-4'
                          : 'text-gray-500 hover:text-[#051F1A] hover:bg-gray-50'
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-[#FAFDFB] border border-gray-200/40 rounded-[6px] p-6 text-left flex items-start gap-3">
                <Scale size={18} className="text-[#00A788] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-brand-dark font-mono uppercase tracking-wider mb-1">Legal Notice</h5>
                  <p className="text-[11px] leading-relaxed text-gray-500 font-sans font-light">
                    These parameters establish formal bounds for submissions. Submitting checklists represents full compliance.
                  </p>
                </div>
              </div>
            </aside>

            {/* Editorial Content Column */}
            <article className="lg:col-span-8 space-y-16 text-left text-gray-700 leading-relaxed font-sans font-light">
              
              {/* Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing, browsing, or submitting eligibility information on this portal, you confirm that you have read, understood, and agreed to be bound by these Terms of Use and all statutory rules governing the Climate Finance Blending Facility.
                </p>
                <p>
                  If you are acting on behalf of a clean energy project developer or institutional co-financier, you represent that you possess standard corporate power to bind that legal entity.
                </p>
              </section>

              {/* Service Access & Compliance */}
              <section id="compliance" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  2. Service Access &amp; Compliance
                </h2>
                <p>
                  Access to the pre-qualification simulator is granted on a temporary, non-exclusive basis. All users must supply true, complete, and verified operational data:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 font-light">
                  <li>
                    <strong>True Inputs:</strong> Financial metrics, MW capacities, subnational state bounds, and projected connections must be correct estimates.
                  </li>
                  <li>
                    <strong>No Misrepresentation:</strong> Falsifying project parameters or funding profiles will lead to immediate exclusion from the facility pipeline.
                  </li>
                  <li>
                    <strong>Compliance Boundaries:</strong> Users must not attempt to intercept database operations, bypass validation scripts, or inject malicious strings.
                  </li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section id="ip" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  3. Intellectual Property Rights
                </h2>
                <p>
                  The interactive capital stack simulators, national footprint mapping configurations, logo designs, text descriptions, and web layouts are protected under copyright laws. CFBF and InfraCredit retain all global rights, titles, and interests in these assets.
                </p>
                <p>
                  You are permitted to extract pre-qualification report pages solely for corporate financing reviews. Any publication of source code, scripts, or interface templates without express written authorization is strictly prohibited.
                </p>
              </section>

              {/* Disclaimers & Warranties */}
              <section id="disclaimer" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  4. Disclaimers &amp; Warranties
                </h2>
                <p className="text-sm bg-gray-50 border border-gray-100 p-4 rounded-[6px] text-gray-600 font-light">
                  <strong>Notice on Simulator Output:</strong> The estimates generated by the capital stack simulator and the eligibility checklists are for informational purposes only. They do not constitute a formal guarantee of funding, credit wraps, or subordinated debt execution.
                </p>
                <p>
                  Portal services are provided "as is" and "as available". We make no warranties, explicit or implied, that the checklist tool will be uninterrupted, error-free, or compatible with specific administrative browser setups.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  5. Limitation of Liability
                </h2>
                <p>
                  Under no circumstances shall the Climate Finance Blending Facility, FCDO, or InfraCredit be liable for any direct, indirect, consequential, or special damages arising from:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 font-light">
                  <li>
                    Inaccuracies in calculation algorithms or simulator estimates.
                  </li>
                  <li>
                    A developer's failure to qualify for subordinated debt based on initial checklist scores.
                  </li>
                  <li>
                    Delays or server down-time interrupting active pre-qualification submissions.
                  </li>
                </ul>
              </section>

              {/* Indemnification */}
              <section id="indemnity" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  6. Indemnification
                </h2>
                <p>
                  You agree to defend, indemnify, and hold harmless CFBF, its management committees, and InfraCredit from any claims, liabilities, damages, or costs (including professional legal fees) arising from your breach of these Terms of Use or misuse of eligibility portals.
                </p>
              </section>

              {/* Governing Law */}
              <section id="governing" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  7. Governing Law
                </h2>
                <p>
                  These Terms of Use are governed by and construed in accordance with the statutory laws of the Federal Republic of Nigeria. Any disputes arising from platform usage shall be referred exclusively to the federal courts situated in Lagos, Nigeria.
                </p>
              </section>

              {/* Changes to Terms */}
              <section id="changes" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  8. Changes to Terms
                </h2>
                <p>
                  We reserve the right to amend these Terms of Use at any time. Changes will be posted directly on this page with an updated timestamp. Your continued use of the pre-qualification portal after updates represents full acceptance of the revised legal terms.
                </p>
              </section>

              {/* Contact Information */}
              <section id="contact" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  9. Contact Information
                </h2>
                <p>
                  If you have legal inquiries regarding these terms, or wish to clarify submission guidelines, submit your request through our administrative office:
                </p>
                <div className="bg-[#FAFDFB] border border-gray-100 p-6 rounded-[6px] flex flex-col md:flex-row gap-6 md:items-center justify-between mt-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-[#00A788] uppercase block font-mono">UK aid / FCDO Blended Fund</span>
                    <h4 className="text-base font-bold text-brand-dark font-sans">InfraCredit Legal Counsel</h4>
                    <p className="text-xs text-gray-500 font-light">Lagos State, Nigeria</p>
                  </div>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-[#051F1A] text-white hover:bg-brand-primary px-6 py-3 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-mono">
                    <MessageSquare size={14} /> Contact Legal Team
                  </Link>
                </div>
              </section>

            </article>

          </div>
        </div>
      </section>

    </div>
  );
}
