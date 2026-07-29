"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, MessageSquare } from 'lucide-react';
import GlassHero from '@/components/GlassHero';

const SECTIONS = [
  { id: 'introduction', label: '1. Introduction & Scope' },
  { id: 'collection', label: '2. Information We Collect' },
  { id: 'usage', label: '3. How We Use Information' },
  { id: 'protection', label: '4. Data Protection & Security' },
  { id: 'sharing', label: '5. Information Sharing' },
  { id: 'rights', label: '6. Your Rights & Options' },
  { id: 'updates', label: '7. Policy Updates' },
  { id: 'contact', label: '8. Contact Channels' },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState('introduction');

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
      <title>Privacy Policy | CFBF</title>
      <meta name="description" content="Read our privacy policy to understand how the Climate Finance Blending Facility handles and secures developer, investor, and partner data." />

      {/* Standard GlassHero in white/light style matching the News Detail page */}
      <GlassHero
        panel="white"
        fade="light"
        title={
          <span>
            Privacy <span className="italic font-serif">Policy</span>
          </span>
        }
        subtitle="Facility Governance"
        description="This Privacy Policy explains how the Climate Finance Blending Facility ('CFBF', 'we', 'our', 'us') collects, secures, and handles user, developer, and institutional partner data."
        bgImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop"
        currentPage="privacy policy"
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
                  Sections
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

              <div className="bg-[#E6F0EA] border border-[#00A788]/10 rounded-[6px] p-6 text-left">
                <span className="text-[10px] font-mono font-bold text-[#00A788] uppercase tracking-wider block mb-2">
                  UK aid & FCDO Mandate
                </span>
                <p className="text-[11px] leading-relaxed text-gray-600 font-sans font-light">
                  CFBF operations comply with international transparency frameworks. Data protocols support local currency de-risking and capital deployment mandates.
                </p>
              </div>
            </aside>

            {/* Editorial Content Column */}
            <article className="lg:col-span-8 space-y-16 text-left text-gray-700 leading-relaxed font-sans font-light">
              
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  1. Introduction &amp; Scope
                </h2>
                <p>
                  The Climate Finance Blending Facility is seeded with UK aid from the Foreign, Commonwealth &amp; Development Office (FCDO) and managed by InfraCredit. This privacy statement describes our rules regarding the collection and usage of personal details from facility participants, site visitors, and developers.
                </p>
                <p>
                  By accessing the online portal, interacting with the capital stack simulators, or initiating eligibility self-assessments, you acknowledge the terms outlined in this document.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="collection" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  2. Information We Collect
                </h2>
                <p>
                  To process pre-qualification checklists and maintain transparency under capital deployment mandates, we collect the following datasets:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 font-light">
                  <li>
                    <strong>Corporate Details:</strong> Organization name, registration parameters, subnational pipeline location, and green certification status.
                  </li>
                  <li>
                    <strong>Project Specifications:</strong> Operational metrics (MW capacity, connections powered, carbon emissions avoided) provided during intake checks.
                  </li>
                  <li>
                    <strong>Contact Credentials:</strong> Full name, professional email address, phone number, and investor profile type (developer, donor, or institutional financier).
                  </li>
                  <li>
                    <strong>Technical Usage Metadata:</strong> IP address, device specifications, operating systems, and page navigation history retrieved via cookies.
                  </li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section id="usage" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  3. How We Use Information
                </h2>
                <p>
                  We utilize collected information solely to perform facility administrator functions and optimize green co-financing deal flow:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-[#FAFDFB] border border-gray-100 p-4 rounded-[6px]">
                    <h4 className="font-bold text-xs text-brand-dark mb-1 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-[#00A788]" /> Eligibility Assessment
                    </h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      Calculating qualifiers, estimating compliance weights, and evaluating developers for subordinated credit wraps.
                    </p>
                  </div>
                  <div className="bg-[#FAFDFB] border border-gray-100 p-4 rounded-[6px]">
                    <h4 className="font-bold text-xs text-brand-dark mb-1 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-[#00A788]" /> Facility Reporting
                    </h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      Aggregating developmental milestones (connections powered, carbon metric savings) for FCDO governance reviews.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Protection & Security */}
              <section id="protection" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  4. Data Protection &amp; Security
                </h2>
                <p>
                  CFBF implements industry-standard encryption protocols (TLS/SSL) to secure transaction channels. All uploaded project dossiers and pre-qualification outputs are stored on secure servers with restricted administrative access rights.
                </p>
                <p className="text-sm bg-gray-50 border border-gray-100 p-4 rounded-[6px] text-gray-600 font-light">
                  <strong>Notice on Transmission:</strong> While we employ advanced threat-prevention controls, no automated transmission across public internet connections is completely secure. Partners are advised to restrict highly sensitive trade secrets from basic checklist submissions.
                </p>
              </section>

              {/* Information Sharing */}
              <section id="sharing" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  5. Information Sharing &amp; Disclosure
                </h2>
                <p>
                  We do not sell, rent, or lease corporate partner registries. Information is shared strictly under the following transparent legal conditions:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 font-light">
                  <li>
                    <strong>InfraCredit:</strong> Shared with facility administrators to execute credit assessments.
                  </li>
                  <li>
                    <strong>Governance Oversight:</strong> Disclosed to the UK Foreign, Commonwealth &amp; Development Office (FCDO) for program audits.
                  </li>
                  <li>
                    <strong>Legal Mandates:</strong> Disclosed when required by Nigerian subnational financial regulations or sovereign statutory guidelines.
                  </li>
                </ul>
              </section>

              {/* Your Rights & Options */}
              <section id="rights" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  6. Your Rights &amp; Options
                </h2>
                <p>
                  In accordance with national data privacy regulations, all platform participants possess the following entitlements:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 font-light">
                  <li>
                    <strong>Access &amp; Rectification:</strong> Request copies of captured organizational details or correct inaccuracies.
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Obtain raw files of submitted assessments to transfer to external agencies.
                  </li>
                  <li>
                    <strong>Erasure Request:</strong> File formal petitions to scrub historical project details from active portals.
                  </li>
                </ul>
              </section>

              {/* Policy Updates */}
              <section id="updates" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  7. Policy Updates
                </h2>
                <p>
                  We reserve the right to modify this governance protocol to correspond with updated compliance rules. All updates will be timestamped at the top of this page. Significant revisions will be highlighted on the news bulletin and notifications portal.
                </p>
              </section>

              {/* Contact Channels */}
              <section id="contact" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold font-sans text-brand-dark pb-2 border-b border-gray-100">
                  8. Contact Channels
                </h2>
                <p>
                  If you have queries, request updates, or wish to exercise your data erasure rights, contact our privacy compliance officer through the official facility desks:
                </p>
                <div className="bg-[#FAFDFB] border border-gray-100 p-6 rounded-[6px] flex flex-col md:flex-row gap-6 md:items-center justify-between mt-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-[#00A788] uppercase block font-mono">Administration Desk</span>
                    <h4 className="text-base font-bold text-brand-dark font-sans">InfraCredit Facility Manager</h4>
                    <p className="text-xs text-gray-500 font-light">Lagos State, Nigeria</p>
                  </div>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-[#051F1A] text-white hover:bg-brand-primary px-6 py-3 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-mono">
                    <MessageSquare size={14} /> Contact Intake Team
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
