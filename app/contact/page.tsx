"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Download, CheckCircle, Send, Landmark, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import StepCard, { StepTheme } from '@/components/ui/StepCard';

function FunStatsCarousel() {
  const stats = [
    {
      value: "₦7.86B+",
      label: "Active Pipeline",
      desc: "Mobilised from domestic institutional investors and pension funds into the real economy."
    },
    {
      value: "7,500+ tCO₂e",
      label: "Mitigated",
      desc: "Tonnes of annual carbon emissions avoided across active clean energy installations."
    },
    {
      value: "100% Green",
      label: "Certified",
      desc: "Project transactions fully certified under Climate Bonds Initiative (CBI) standards."
    },
    {
      value: "39,438",
      label: "Connections",
      desc: "Projected household and SME clean energy connections powered across Nigeria."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="space-y-4">
      {/* Title Header */}
      <div className="flex items-center gap-2 text-[#00A788]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00A788] animate-pulse"></span>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase font-mono">
          Fun Stats & Impact
        </span>
      </div>

      {/* Main image container */}
      <div className="relative w-full aspect-square sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-square xl:aspect-[16/10] min-h-[380px] rounded-[6px] overflow-hidden shadow-lg bg-[#02100d] flex items-center justify-center group">
        {/* Background Image with Tint Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1200&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02100d]/90 via-[#042d24]/65 to-[#02100d]/90" />

        {/* Center Card Container */}
        <div className="relative z-10 w-[85%] max-w-[420px] bg-[#021a15]/95 border border-[#043329] rounded-[6px] p-6 sm:p-8 shadow-2xl backdrop-blur-md min-h-[270px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Custom TrendingUp Icon */}
                <div className="mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17L9 11L13 15L21 7" stroke="#00A788" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 7H21V13" stroke="#00A788" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Big Metric Title */}
                <h4 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-sans tracking-tight mb-2">
                  {stats[activeIndex].value} <br />
                  <span className="text-[#00A788]">{stats[activeIndex].label}</span>
                </h4>

                {/* Horizontal Green Line Divider */}
                <div className="w-12 h-0.5 bg-[#00A788] my-4 rounded-full" />
              </div>

              {/* Subtext explanation in sentence case */}
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {stats[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators at the bottom */}
          <div className="flex gap-1.5 mt-6 items-center">
            {stats.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  i === activeIndex ? 'w-6 bg-[#00A788]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL search params
  const readiness = searchParams.get('readiness'); // 'qualified' | 'technical-assistance'
  const score = searchParams.get('score');
  const tech = searchParams.get('tech');

  const [role, setRole] = useState<'developer' | 'investor' | 'donor'>('developer');
  const [submitted, setSubmitted] = useState(false);

  // Form input states
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [techType, setTechType] = useState('Solar Mini-Grid');
  const [capacity, setCapacity] = useState('');
  const [message, setMessage] = useState('');

  // Handle URL Pre-fill parameters
  useEffect(() => {
    if (readiness) {
      setRole('developer');
      
      let msg = `Hello CFBF Team,\n\nWe have completed the Project Readiness Assessment on your website. Our project achieved a readiness score of ${score}%.\n\n`;
      if (readiness === 'qualified') {
        msg += `Our project is classified as "Highly Qualified for Guarantees." We satisfy all core operational, financial, and ESG criteria, and would like to initiate the pre-qualification check and mandate letter process.`;
      } else if (readiness === 'technical-assistance') {
        msg += `Our project is classified as "Eligible for Technical Assistance." We meet core requirements but need project preparation support (e.g. expanding paying customer base, operational tracking) to achieve guarantee-readiness.`;
      }
      setMessage(msg);

      if (tech) {
        if (tech === 'solar-grid') setTechType('Solar Mini-Grid');
        else if (tech === 'cold-storage') setTechType('Agro-Processing Solar');
        else if (tech === 'clean-cooking') setTechType('Clean Cooking');
        else if (tech === 'low-carbon-transport') setTechType('Low-Carbon Public Transport');
        else setTechType('Other Green Tech');
      }
    }
  }, [readiness, score, tech]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const heroCards: { index: string; title: string; desc: string; theme: StepTheme }[] = [
    {
      index: "01",
      title: "Developer Intake",
      desc: "Submit off-grid mini-grid, telecom, or agri-processing project profiles.",
      theme: "light",
    },
    {
      index: "02",
      title: "Investor Relations",
      desc: "Co-finance green tranches and explore local currency credit enhancements.",
      theme: "cyan",
    },
    {
      index: "03",
      title: "Donor Partnership",
      desc: "Blend concessional funds to de-risk sustainable clean energy projects.",
      theme: "green",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact and Enquiries | CFBF",
    "description": "Get in touch with the Climate Finance Blending Facility for developer intake, investor relations, or donor partnerships.",
    "publisher": {
      "@type": "Organization",
      "name": "Climate Finance Blending Facility (CFBF)"
    }
  };

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative overflow-hidden">
      {/* Dynamic Metadata Hoisting (React 19 / Next.js) */}
      <title>Contact & partnerships | CFBF</title>
      <meta name="description" content="Get in touch with the Climate Finance Blending Facility for developer intake, investor relations, or donor partnerships." />
      
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Floating Glassmorphism Hero Section (about-v2 standard) */}
      <GlassHero
        title={
          <>
            Connect with <span className="text-[#9BB7B1]">our team</span>
          </>
        }
        subtitle="Partnership portal"
        bgImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop"
        currentPage="contact"
        description={
          <p>
            Whether you are a clean energy developer looking for blended financing, or an institutional
            investor/donor looking to co-finance green transitions, reach out to our team.
          </p>
        }
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={heroRowVariants}
          initial="hidden"
          animate="show"
        >
          {heroCards.map((card) => (
            <motion.div key={card.index} variants={heroCardVariants} whileHover={{ y: -4 }}>
              <StepCard index={card.index} title={card.title} desc={card.desc} theme={card.theme} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </GlassHero>

      <div className="container mx-auto px-6 pt-20 pb-0 relative z-10">

        {/* Contact Content Grid */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Info & Downloads */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <div className="bg-white p-8 rounded-[6px] border border-gray-200/35 space-y-6">
              <h3 className="text-xl font-bold font-sans text-[#051F1A]">Facility Contacts</h3>
              
              <div className="flex gap-4 items-start">
                <MapPin className="text-brand-primary shrink-0 mt-1" size={20} />
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-sans mb-1">Office Location</span>
                  <p className="text-gray-600 text-sm font-sans leading-relaxed">
                    InfraCredit House, <br />
                    Lagos, Nigeria.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="text-brand-primary shrink-0 mt-1" size={20} />
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-sans mb-1">Email Enquiries</span>
                  <a href="mailto:info@infracredit.ng" className="text-brand-primary text-sm font-sans hover:text-[#051F1A] transition-colors font-medium interactive focus:outline-none">
                    info@infracredit.ng
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="text-brand-primary shrink-0 mt-1" size={20} />
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-sans mb-1">Phone Line</span>
                  <a href="tel:+23412345678" className="text-brand-primary text-sm font-sans hover:text-[#051F1A] transition-colors font-medium interactive focus:outline-none">
                    +234 (1) 234 5678
                  </a>
                </div>
              </div>
            </div>

            {/* Pre-qualification checklist reminder card */}
            <div className="bg-[#FAFDFB] rounded-[6px] p-8 border border-[#81C34D]/30 space-y-4">
              <div className="flex items-center gap-2 text-[#00A788]">
                <ShieldCheck size={20} className="shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">Before you connect</span>
              </div>
              <h4 className="font-bold text-lg font-sans text-brand-dark">Verify your eligibility</h4>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">
                Save time by completing our preliminary Readiness Assessment before submitting a request. This helps confirm your project matches the facility's initial funding requirements.
              </p>
              <Link 
                href="/eligibility"
                className="w-full bg-[#051F1A] text-white py-3.5 rounded-[6px] flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs hover:bg-brand-primary transition-all interactive font-sans justify-center"
              >
                Go to Eligibility Check
              </Link>
            </div>

            {/* Fun Stats & Impact Carousel */}
            <FunStatsCarousel />
          </motion.div>

          {/* Right Column: Dynamic Form & Carousel */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-[6px] border border-gray-200/35 text-left"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold font-sans mb-4 text-[#051F1A]">Send an Enquiry</h3>
                  
                  {/* Dynamic Alert Banner for pre-fills */}
                  {readiness && (
                    <div className={`p-4 rounded-[6px] border mb-6 text-xs flex items-start gap-2.5 font-sans ${
                      readiness === 'qualified' 
                        ? 'bg-green-50 text-green-800 border-green-200' 
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      {readiness === 'qualified' ? (
                        <CheckCircle className="shrink-0 mt-0.5 text-green-600" size={16} />
                      ) : (
                        <AlertCircle className="shrink-0 mt-0.5 text-blue-600" size={16} />
                      )}
                      <div>
                        <span className="font-bold uppercase tracking-wider block mb-0.5 font-mono">
                          Readiness Verified: {score}%
                        </span>
                        <p className="font-light leading-relaxed">
                          {readiness === 'qualified' 
                            ? 'Form pre-filled for priority guarantee review. Complete and submit the enquiry details below.'
                            : 'Form pre-filled for Technical Assistance application. Complete and submit the enquiry details below.'
                          }
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Role Selector Tabs */}
                  <div className="flex border-b border-gray-100 pb-2">
                    <button
                      type="button"
                      onClick={() => setRole('developer')}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 font-sans transition-colors interactive focus:outline-none ${
                        role === 'developer' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-[#051F1A]'
                      }`}
                    >
                      Developer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('investor')}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 font-sans transition-colors interactive focus:outline-none ${
                        role === 'investor' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-[#051F1A]'
                      }`}
                    >
                      Investor
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('donor')}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 font-sans transition-colors interactive focus:outline-none ${
                        role === 'donor' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-400 hover:text-[#051F1A]'
                      }`}
                    >
                      Donor / Partner
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative mt-2">
                      <input 
                        required 
                        type="text" 
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder=" "
                        className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent" 
                      />
                      <label 
                        htmlFor="fullName"
                        className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                      >
                        Full Name
                      </label>
                    </div>

                    <div className="relative mt-2">
                      <input 
                        required 
                        type="text" 
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder=" "
                        className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent" 
                      />
                      <label 
                        htmlFor="organization"
                        className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                      >
                        Organization
                      </label>
                    </div>
                  </div>

                  <div className="relative mt-2">
                    <input 
                      required 
                      type="email" 
                      id="emailAddress"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder=" "
                      className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent" 
                    />
                    <label 
                      htmlFor="emailAddress"
                      className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Dynamic Developer Fields */}
                  {role === 'developer' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid md:grid-cols-2 gap-6"
                    >
                      <div className="relative mt-2">
                        <select 
                          id="techType"
                          value={techType}
                          onChange={(e) => setTechType(e.target.value)}
                          className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans bg-white"
                        >
                          <option>Solar Mini-Grid</option>
                          <option>Telecom Solar Hubs</option>
                          <option>Agro-Processing Solar</option>
                          <option>Clean Cooking</option>
                          <option>Low-Carbon Public Transport</option>
                          <option>Other Green Tech</option>
                        </select>
                        <label 
                          htmlFor="techType"
                          className="absolute text-xs text-brand-primary font-bold uppercase tracking-wider top-1.5 left-4 pointer-events-none"
                        >
                          Technology Type
                        </label>
                      </div>

                      <div className="relative mt-2">
                        <input 
                          required 
                          type="text" 
                          id="capacity"
                          value={capacity}
                          onChange={(e) => setCapacity(e.target.value)}
                          placeholder=" "
                          className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent" 
                        />
                        <label 
                          htmlFor="capacity"
                          className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                        >
                          Project Capacity (KW)
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {/* Dynamic Investor Fields */}
                  {role === 'investor' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid md:grid-cols-2 gap-6"
                    >
                      <div className="relative mt-2">
                        <select 
                          id="institutionType"
                          className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans bg-white"
                        >
                          <option>Pension Fund Administrator (PFA)</option>
                          <option>Insurance Company</option>
                          <option>Asset Management Fund</option>
                          <option>Development Partner / DFI</option>
                          <option>Other Corporate Investor</option>
                        </select>
                        <label 
                          htmlFor="institutionType"
                          className="absolute text-xs text-brand-primary font-bold uppercase tracking-wider top-1.5 left-4 pointer-events-none"
                        >
                          Institution Type
                        </label>
                      </div>

                      <div className="relative mt-2">
                        <input 
                          required 
                          type="text" 
                          id="investmentTranche"
                          placeholder=" "
                          className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent" 
                        />
                        <label 
                          htmlFor="investmentTranche"
                          className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                        >
                          Target Investment Tranche
                        </label>
                      </div>
                    </motion.div>
                  )}

                  <div className="relative mt-2">
                    <textarea 
                      required 
                      id="message"
                      rows={6} 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder=" "
                      className="peer block w-full px-4 pt-6 pb-2 text-sm text-[#051F1A] bg-transparent border border-gray-200 rounded-[6px] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans placeholder-transparent"
                    />
                    <label 
                      htmlFor="message"
                      className="absolute text-xs text-gray-400 font-bold uppercase tracking-wider duration-300 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-brand-primary peer-focus:font-bold pointer-events-none"
                    >
                      Message / Enquiry Details
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-[#051F1A] text-white py-4 rounded-full flex items-center justify-center gap-3 font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-primary/20 transition-all interactive font-sans focus:outline-none"
                  >
                    <Send size={14} />
                    Send Enquiry Message
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="submission-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-brand-primary">Enquiry Submitted!</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto font-sans leading-relaxed font-light">
                    Thank you for reaching out to the Climate Finance Blending Facility. 
                    An investment analyst or partnership officer will contact you within 3 business days.
                  </p>
                  <div className="pt-6 flex justify-center gap-4">
                    <button 
                      onClick={() => router.push('/')}
                      className="px-8 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-all interactive font-sans focus:outline-none"
                    >
                      Return Home
                    </button>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-gray-50 text-gray-500 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-all interactive font-sans focus:outline-none"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>

      {/* ── NEXT STEPS CTA BAR (3 Columns - NO SELF LINKING) ────── */}
      <section className="mt-24 pt-12 pb-6 bg-[#051F1A] text-white relative z-10 border-t border-white/5">
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
            {/* Portfolio */}
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

            {/* Architecture */}
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

            {/* Impact */}
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

      {/* ── 9. DOWNLOAD CTA (Brochure visual banner) ────── */}
      <div className="relative z-10 w-full">
        <div className="min-h-[460px] relative flex items-center justify-center group overflow-hidden">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop"
            alt="CFBF Brochure Background"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-brand-dark/70 group-hover:bg-brand-dark/65 transition-colors z-10" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 text-center max-w-2xl px-6 flex flex-col items-center"
          >
            <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">Brochure &amp; prospectus</span>
            <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">Get the technical specifications of the facility</h3>
            <p className="text-white/75 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              {"Download our comprehensive brochure outlining fund structure, eligibility guidelines, co-financing terms, and regional deployment targets."}
            </p>
            <motion.a
              href="/download.pdf"
              download="CFBF_Brochure.pdf"
              whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#051F1A' }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-accent text-brand-dark px-8 py-4 rounded-[6px] flex items-center gap-3 font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-accent/25 transition-all duration-300 font-sans cursor-pointer focus:outline-none"
            >
              <Download size={16} />
              Download Brochure PDF
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
);
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#FAFDFB] text-[#051F1A] min-h-screen flex items-center justify-center font-mono text-sm">
        Loading connection portal...
      </div>
    }>
      <ContactForm />
    </Suspense>
  );
}
