"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Play, ShieldCheck, Globe, Coins, Users, Landmark, ArrowUpRight, TrendingUp, Building2, Briefcase, Plus, Zap, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import GlassHero from '@/components/GlassHero';
const EnergyAccessMap = dynamic(() => import('@/components/about/EnergyAccessMap'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-brand-dark/40 animate-pulse rounded-lg" />
});
import MilestonesTimelineV3 from '@/components/about-v3/MilestonesTimelineV3';
import { StatCard, SliderStatCard } from '@/components/ui/StatCard';
import AudienceConsole from '@/components/about-v3/AudienceConsole';
import PartnerShowcase from '@/components/about-v3/PartnerShowcase';
import CountUp from '@/components/ui/CountUp';
import StickyAboutNav from '@/components/ui/StickyAboutNav';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

const statRow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
};

const statCard = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// SVG Wheel polar and arc helpers for Net Zero display
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arc(cx: number, cy: number, r: number, a1: number, a2: number) {
  const s = polar(cx, cy, r, a1);
  const e = polar(cx, cy, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

const AX = 180, AY = 170, AR = 135;
const A_START = -135, A_END = 135;
const PROGRESS = 0.16;
const wp2022 = polar(AX, AY, AR, A_START + 270 * 0.156);
const wp2030 = polar(AX, AY, AR, A_START + 270 * 0.333);
const wp2060 = polar(AX, AY, AR, A_END);

function AboutPageContent() {
  const searchParams = useSearchParams();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [projectSize, setProjectSize] = useState<number>(15);
  const [isSimulatorExpanded, setIsSimulatorExpanded] = useState(false);

  const seniorDebt = projectSize * 0.6;
  const subordinatedDebt = projectSize * 0.2;
  const developerEquity = projectSize * 0.2;

  // Deep linking projectSize parameter
  useEffect(() => {
    const sizeParam = searchParams.get('projectSize');
    if (sizeParam) {
      const parsed = parseFloat(sizeParam);
      if (!isNaN(parsed) && parsed >= 5 && parsed <= 30) {
        setProjectSize(parsed);
      }
    }
  }, [searchParams]);

  const sliderStats = [
    { value: '32',   label: 'Active Pipeline States',  sub: 'across all 6 geo-zones' },
    { value: '100%', label: 'Green Certified',          sub: 'Climate Bonds Initiative' },
    { value: 'AAA',  label: 'Credit Rating',            sub: 'InfraCredit guarantee' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'About the Climate Facility | CFBF',
    description: 'Capitalised with USD 21.3M concessional funding by FCDO & BII to de-risk green investments and mobilise private capital in Nigeria.',
    publisher: { '@type': 'Organization', name: 'Climate Finance Blending Facility (CFBF)' },
  };

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative font-sans antialiased text-left selection:bg-brand-accent selection:text-brand-dark">
      {/* SEO Casing Standardized (Task 3) */}
      <title>About the Climate Facility | CFBF</title>
      <meta name="description" content="Capitalised with USD 21.3M concessional funding by FCDO & BII to de-risk green investments and mobilise private capital in Nigeria." />

      {/* Dublin Core Hoisting */}
      <meta name="DC.title" content="About the Climate Facility | CFBF" />
      <meta name="DC.creator" content="NoLimitBuzz" />
      <meta name="DC.subject" content="Blended Finance, Climate Capital, Credit Enhancement, PFA Assets" />
      <meta name="DC.description" content="Capitalised with USD 21.3M concessional funding by FCDO & BII to de-risk green investments and mobilise private capital in Nigeria." />
      <meta name="DC.publisher" content="Climate Finance Blending Facility" />
      <meta name="DC.language" content="en" />
      <meta name="DC.type" content="About Profile Page" />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO — WHO WE ARE ────── */}
      <GlassHero
        title={
          <>
            Mobilising <span className="text-brand-accent">blended capital</span> for Nigeria's <span className="italic font-serif text-[#9BB7B1]">green energy transition</span>
          </>
        }
        subtitle="Who we are"
        currentPage="about"
        bgImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop"
        description={
          <>
            <p>
              The Climate Finance Blending Facility (CFBF) is capitalised with seed funding by the{' '}
              <strong className="text-white">UK Foreign, Commonwealth &amp; Development Office (FCDO)</strong>{' '}
              and co-invested alongside{' '}
              <strong className="text-white">British International Investment (BII)</strong>.
            </p>
            <p>
              Administered by <strong className="text-white">InfraCredit</strong>, the facility deploys
              subordinated debt and AAA guarantees to elevate green assets to investment-grade profiles —
              unlocking domestic pension capital at institutional scale.
            </p>
          </>
        }
      >
        {/* Hero stats cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
          variants={statRow}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={statCard}
            className="rounded-[6px] overflow-hidden min-h-[200px] lg:min-h-0 relative group"
            whileHover={{ scale: 1.01 }}
          >
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop"
              alt="Wind turbines"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
          </motion.div>

          <motion.div variants={statCard} whileHover={{ y: -4 }}>
            <StatCard theme="light" flat number="01" value="USD 21.3M" label="Concessional Capital" sub="FCDO & BII commitment" accentColor="#00A788" className="h-full" />
          </motion.div>

          <motion.div variants={statCard} whileHover={{ y: -4 }}>
            <StatCard theme="cyan" number="02" value="USD 21.3M" label="Total Capital Committed" sub="to date" accentColor="#009FD4" className="h-full" />
          </motion.div>

          <motion.div variants={statCard} whileHover={{ y: -4 }}>
            <SliderStatCard theme="green" number="03" stats={sliderStats} accentColor="#81C34D" className="h-full" />
          </motion.div>
        </motion.div>
      </GlassHero>

      <StickyAboutNav />

      {/* ── 2. INSTITUTIONAL MANDATE ────── */}
      <section id="mandate"
        data-rag-chunk="about-mandate-v3"
        className="relative py-24 bg-[#FAFDFB] border-b border-gray-100 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-brand-primary/[0.03] to-transparent rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Text and Numbers */}
            <motion.div {...fadeUp(0)} className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono block mb-2">
                  About us
                </span>
                <h2 className="text-3xl md:text-[2.5rem] font-bold text-brand-dark font-sans tracking-tight leading-[1.1] max-w-xl">
                  On a mission to de-risk and mobilise green capital
                </h2>
                <p className="text-gray-500 text-sm md:text-base font-sans leading-relaxed mt-4 max-w-xl">
                  CFBF structures capital investments by providing subordinated debt products and guarantees that elevate green assets to investment-grade profiles. This directly meets the strict compliance and safety guidelines of local pension funds and insurance providers.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-3 font-mono">
                  Our mandate
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-xs md:text-sm text-gray-500 font-sans leading-relaxed">
                  <p>
                    We deploy specialized concessional capital to cover the first-loss layers of high-impact energy access projects, converting higher-risk clean infrastructure ventures into viable, institutional-grade opportunities.
                  </p>
                  <p>
                    Every transaction we facilitate is fully certified under the Climate Bonds Initiative (CBI) standards, guaranteeing transparent carbon reductions and verifiable ESG metrics across all geo-political zones in Nigeria.
                  </p>
                </div>
              </div>

              {/* The Numbers grid */}
              <div className="pt-6 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4 font-mono">
                  The numbers
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold font-mono text-brand-dark block">USD 21.3M</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-1">Concessional Capital</span>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-bold font-mono text-brand-dark block">USD 21.3M</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-1">Total Deployed Capital</span>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-bold font-mono text-brand-dark block">32</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-1">Active Pipeline States</span>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-bold font-mono text-brand-dark block">AAA</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-1">Credit Enhancement Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Bento Grid */}
            <motion.div {...fadeUp(0.12)} className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 h-[440px] md:h-[500px]">
                {/* Left tall card - looping video player */}
                <div className="relative rounded-[12px] overflow-hidden border border-gray-100/70 shadow-sm h-full flex flex-col justify-end group">
                  <video
                    src="/videos/solar-panels.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-brand-dark/35 group-hover:bg-brand-dark/25 transition-colors z-10" />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsVideoOpen(true)}
                      className="w-14 h-14 bg-brand-accent hover:bg-white text-brand-dark rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer focus:outline-none"
                      aria-label="Play Video"
                    >
                      <Play size={18} fill="currentColor" className="ml-0.5" />
                    </motion.button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent pointer-events-none z-10" />
                  <span className="relative z-20 text-[10px] font-mono text-white/90 uppercase tracking-wider p-4 leading-none font-bold">
                    Community Empowerment
                  </span>
                </div>

                {/* Right stacked images */}
                <div className="grid grid-rows-2 gap-4 h-full">
                  {/* Top right image */}
                  <div className="relative rounded-[12px] overflow-hidden border border-gray-100/70 shadow-sm h-full flex flex-col justify-end group">
                    <img 
                      src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop" 
                      alt="Solar panels installer" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent pointer-events-none" />
                    <span className="relative z-10 text-[10px] font-mono text-white/90 uppercase tracking-wider p-4 leading-none font-bold">
                      Solar Installation
                    </span>
                  </div>

                  {/* Bottom right image */}
                  <div className="relative rounded-[12px] overflow-hidden border border-gray-100/70 shadow-sm h-full flex flex-col justify-end group">
                    <img 
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" 
                      alt="Rural shop solar powered business" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent pointer-events-none" />
                    <span className="relative z-10 text-[10px] font-mono text-white/90 uppercase tracking-wider p-4 leading-none font-bold">
                      Local Clean Power
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. MARKET OPPORTUNITY ────── */}
      <section
        id="market"
        data-rag-chunk="about-market-thesis-v3"
        className="py-24 bg-white relative z-10 border-b border-gray-100 overflow-hidden"
      >
        <div className="container mx-auto px-6 max-w-[1280px] relative z-10 w-full">
          {/* Header row */}
          <motion.div {...fadeUp(0)} className="text-left mb-12 space-y-4">
            <div>
              <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono block mb-2">
                — Market opportunity
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-dark font-sans tracking-tight leading-tight">
                Broadening the market through <span className="text-[#7C9590] italic font-serif">inclusive growth</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                In Nigeria, MSMEs contribute 48% of national GDP, account for 96% of businesses and 84% of employment. Despite this significant contribution, access to traditional financing is limited, short-term and expensive — with persisting infrastructure challenges that hinder sector growth.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                We believe sustainable and inclusive finance, local capital markets, and blended finance can join forces to play an especially important role in enabling stable access to innovative finance for climate-smart infrastructure — from clean energy and better storage, to faster connectivity.
              </p>
            </div>
          </motion.div>

          {/* Bento Grid */}
          <motion.div {...fadeUp(0.08)} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[minmax(150px,auto)] md:auto-rows-[160px]">
            {/* Card 1 */}
            <div className="col-span-2 row-span-2 bg-[#009FD4] text-white p-6 md:p-8 flex flex-col justify-between rounded-[8px] relative overflow-hidden group border border-[#009FD4]/10 transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#009FD4]/10 text-left">
              <div className="absolute -bottom-4 -right-4 opacity-[0.05] text-white group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                <TrendingUp size={140} />
              </div>
              <div>
                <span className="text-5xl md:text-7xl font-bold font-mono leading-none tracking-tight block mb-3">48%</span>
                <span className="text-xs md:text-sm font-sans text-white/90 block leading-snug max-w-md">
                  {"SMEs contribution to Nigeria's GDP in the last five years"}
                </span>
              </div>
              <div className="pt-4 border-t border-white/20 text-[11px] md:text-xs text-white/75 font-sans leading-relaxed mt-4">
                {"In Nigeria, MSMEs account for 96% of businesses and 84% of employment — despite limited access to capital."}
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-span-1 rounded-[8px] overflow-hidden border border-gray-100 shadow-sm h-full group relative transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" 
                alt="Modern office building representing commercial growth" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-brand-dark/10" />
            </div>

            {/* Card 3 */}
            <div className="col-span-1 border border-gray-100 bg-white rounded-[8px] p-5 md:p-6 text-left flex flex-col justify-between relative overflow-hidden group shadow-sm transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg hover:border-brand-primary/10">
              <div className="absolute -bottom-2 -right-2 opacity-[0.03] text-brand-dark group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                <Building2 size={80} />
              </div>
              <span className="text-3xl md:text-4xl font-bold font-mono text-brand-dark leading-none block mb-4">96%</span>
              <div>
                <span className="text-[9px] font-bold font-mono text-[#7C9590] uppercase tracking-widest block mb-1">PwC Survey</span>
                <span className="text-xs text-gray-500 font-sans leading-snug">
                  {"SMEs account for 96% of businesses in Nigeria"}
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-span-1 bg-[#00A788] text-white p-5 md:p-6 flex flex-col justify-between rounded-[8px] relative overflow-hidden group shadow-sm transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00A788]/10 text-left">
              <div className="absolute -bottom-2 -right-2 opacity-[0.06] text-white group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                <Users size={80} />
              </div>
              <span className="text-3xl md:text-4xl font-bold font-mono leading-none tracking-tight block mb-4">84%</span>
              <span className="text-xs font-sans text-white/90 block leading-snug">
                {"SMEs employ 84% of Nigeria's workforce"}
              </span>
            </div>

            {/* Card 5 */}
            <div className="col-span-1 bg-[#051F1A] text-white p-5 md:p-6 flex flex-col justify-between rounded-[8px] relative overflow-hidden group shadow-sm transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#051F1A]/20 text-left">
              <div className="absolute -bottom-2 -right-2 opacity-[0.06] text-white group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                <Landmark size={80} />
              </div>
              <span className="text-3xl md:text-4xl font-bold font-mono leading-none tracking-tight block mb-4">&lt;11%</span>
              <div>
                <span className="text-[9px] font-bold font-mono text-brand-accent uppercase tracking-widest block mb-1">As of July 2021</span>
                <span className="text-xs font-sans text-white/80 block leading-snug">
                  {"Pension penetration in Nigeria — vast untapped capital pool"}
                </span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="col-span-2 bg-[#051F1A] text-white p-5 md:p-6 flex flex-col justify-between rounded-[8px] relative overflow-hidden group shadow-sm transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#051F1A]/20 text-left">
              <div className="absolute -bottom-4 -right-4 opacity-[0.06] text-white group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                <Briefcase size={100} />
              </div>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono leading-none tracking-tight block mb-4">17.4m</span>
              <div>
                <span className="text-[9px] font-bold font-mono text-brand-accent uppercase tracking-widest block mb-1">
                  {"Estimated number of SMEs in Nigeria"}
                </span>
                <span className="text-xs font-sans text-white/80 block leading-snug max-w-xl">
                  {"SMEs account for c.50% of industrial jobs and c.90% of the manufacturing sector"}
                </span>
              </div>
            </div>

            {/* Card 7 */}
            <div className="col-span-2 bg-[#81C34D] text-[#051F1A] p-5 md:p-6 flex flex-col justify-between rounded-[8px] relative overflow-hidden group shadow-sm transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#81C34D]/20 text-left">
              <div className="absolute -bottom-4 -right-4 opacity-[0.08] text-[#051F1A] group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                <TrendingUp size={100} />
              </div>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono leading-none tracking-tight block mb-4">30%</span>
              <p className="text-xs font-sans text-[#051F1A]/95 leading-snug max-w-xl">
                {"The Pension Industry has a strategic objective of covering 30% of the working population under the Contributory Pension Scheme by 2024."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. NIGERIA MARKET FUNDING GAP (Shared EnergyAccessMap) ────── */}
      <div data-rag-chunk="about-energy-gap-map" className="relative z-10">
        <EnergyAccessMap />
      </div>

      {/* ── 5. FACILITY FRAMEWORK ────── */}
      <section id="framework" className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="grid md:grid-cols-2 gap-10 xl:gap-20 items-end mb-16">
            <motion.div {...fadeUp(0)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-brand-primary" />
                <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono">Facility framework</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark font-sans tracking-tight leading-[1.1]">
                The foundation of our <span className="text-[#7C9590]">financing approach</span>
              </h2>
            </motion.div>
            <motion.p {...fadeUp(0.08)} className="text-gray-500 leading-relaxed font-sans pb-2">
              CFBF deploys three complementary financial instruments, each addressing a distinct barrier in the
              green infrastructure financing chain — from first-loss risk absorption to local currency structuring
              and full blended capital stack assembly.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', color: '#009FD4', Icon: Briefcase, title: 'Risk sharing', body: 'First-loss absorption for developer default risk via structural co-financing, reducing the risk premium demanded by commercial lenders and making green infrastructure financeable for the first time.', tag: 'First-loss facility', bgImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=600&auto=format&fit=crop' },
              { n: '02', color: '#00A788', Icon: ShieldCheck, title: 'Local currency funding', body: 'InfraCredit guarantees elevate green assets to AAA credit ratings, unlocking domestic pension fund capital held in PFAs and insurance companies — the largest untapped pool of patient capital in Nigeria.', tag: 'AAA credit enhancement', bgImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop' },
              { n: '03', color: '#81C34D', Icon: Globe, title: 'Blended finance', body: "Concessional and commercial capital layered at project level to achieve investment-grade profiles — the only sustainable path to closing Nigeria's green infrastructure financing gap at scale.", tag: 'CBI-certified', bgImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop' },
            ].map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.n}
                  {...fadeUp(i * 0.07)}
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative rounded-[6px] overflow-hidden flex flex-col justify-between h-[360px] sm:h-[400px] group border border-white/10 transition-all duration-300 cursor-default"
                >
                  <img 
                    src={item.bgImage}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#051F1A]/92 group-hover:bg-[#051F1A]/85 transition-colors duration-300" />
                  
                  {/* Top bar & Fixed Header (always in place) */}
                  <div className="relative z-10 p-8 pt-12 sm:pt-16 pb-0 flex flex-col justify-start h-full text-left">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-light font-mono text-white/30 leading-none">{item.n}</span>
                      <ArrowUpRight size={14} className="text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <h3 
                      className="text-xl font-bold font-sans group-hover:!text-white transition-colors duration-300"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Static gradient background overlay under text */}
                  <div className="absolute bottom-0 left-0 right-0 h-[220px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />

                  {/* Bottom sliding block wrapper (description & tag) */}
                  <div className="absolute bottom-8 left-8 right-8 overflow-hidden h-[180px] z-10">
                    <div className="translate-y-[134px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] flex flex-col text-left">
                      <p className="text-gray-300 text-sm leading-relaxed font-sans font-light mb-6">{item.body}</p>
                      <div>
                        <span className="inline-flex text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-[6px] border bg-white/5" style={{ color: item.color, borderColor: `${item.color}30` }}>
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Collapsible Simulator Call to Action Card */}
          <motion.div 
            layout
            {...fadeUp(0.15)}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-16 bg-white border border-gray-100/70 rounded-[12px] p-6 md:p-8 text-left relative overflow-hidden"
          >
            {/* Background decorative circles */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/[0.01] rounded-full blur-[80px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {!isSimulatorExpanded ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-px w-6 bg-brand-primary" />
                      <span className="text-brand-primary text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                        Blended Finance in Action
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-brand-dark tracking-tight mb-2">
                      Model our de-risking stack in <span className="text-[#7C9590] italic font-serif">real-time</span>
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-sans font-light">
                      Adjust variables and simulate how our credit wrap absorbs risk to unlock local currency pension funding.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSimulatorExpanded(true)}
                    className="shrink-0 inline-flex items-center justify-center gap-2 border border-gray-200/70 hover:border-brand-primary hover:bg-[#F3FAF6] text-brand-dark px-6 py-3 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans select-none focus:outline-none"
                  >
                    Launch Simulator <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-gray-50 pb-6">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-px w-6 bg-brand-primary" />
                        <span className="text-brand-primary text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                          Blended Finance in Action
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-brand-dark tracking-tight mb-2">
                        Model our de-risking stack in <span className="text-[#7C9590] italic font-serif">real-time</span>
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed font-sans font-light">
                        Adjust the slider to scale a sample green infrastructure project. See how the facility uses FCDO concessional seed capital to absorb risk, wrapping the capital structure to unlock local currency pension funding.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSimulatorExpanded(false)}
                      className="shrink-0 inline-flex items-center justify-center gap-2 border border-gray-200/70 hover:border-brand-primary hover:bg-[#FAFDFB] text-brand-dark px-6 py-3 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans select-none focus:outline-none"
                    >
                      Collapse Simulator
                    </button>
                  </div>

                  {/* Simulator Grid */}
                  <div className="grid lg:grid-cols-12 gap-10 items-stretch">
                    
                    {/* Controls & Metrics */}
                    <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                      <div>
                        {/* Slider Control */}
                        <div className="bg-white border border-gray-100/70 rounded-[6px] p-6 mb-6">
                          <div className="flex justify-between items-baseline mb-4">
                            <label className="text-xs font-bold font-mono text-gray-500 uppercase tracking-wider">Project Size (NGN)</label>
                            <div className="text-3xl font-extrabold text-brand-dark tracking-tight">
                              ₦{projectSize.toFixed(1)}<span className="text-lg font-medium text-gray-400"> Billion</span>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="30"
                            step="1"
                            value={projectSize}
                            onChange={(e) => setProjectSize(Number(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#00A788]"
                          />
                          <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-2">
                            <span>Min: ₦5.0B</span>
                            <span>Max: ₦30.0B</span>
                          </div>
                        </div>

                        {/* Segment Explanations */}
                        <div className="space-y-4">
                          {/* Senior */}
                          <div className="flex items-start gap-4 p-4 rounded-[6px] border border-gray-100/70 bg-white transition-all hover:border-gray-200/50">
                            <div className="w-8 h-8 rounded-full bg-[#051F1A]/10 flex items-center justify-center text-[#051F1A] shrink-0 mt-0.5">
                              <ShieldCheck size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Senior PFA debt (60%)</h4>
                                <span className="text-xs font-bold font-mono text-brand-dark">₦{seniorDebt.toFixed(1)}B</span>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                                Secured, long-term debt funded by domestic Pension Fund Administrators (PFAs). Wrapped under the <span className="font-semibold text-brand-primary">InfraCredit AAA guarantee</span> to meet statutory safety regulations.
                              </p>
                            </div>
                          </div>

                          {/* Blended */}
                          <div className="flex items-start gap-4 p-4 rounded-[6px] border border-brand-primary/10 bg-white transition-all hover:border-brand-primary/20">
                            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                              <Coins size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">CFBF blended layer (20%)</h4>
                                <span className="text-xs font-bold font-mono text-brand-primary">₦{subordinatedDebt.toFixed(1)}B</span>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                                Subordinated, first-loss concessional debt funded via FCDO seed capital. Absorbs developer risk and lowers the overall financing cost to attract private commercial participants.
                              </p>
                            </div>
                          </div>

                          {/* Equity */}
                          <div className="flex items-start gap-4 p-4 rounded-[6px] border border-[#009FD4]/10 bg-white transition-all hover:border-[#009FD4]/20">
                            <div className="w-8 h-8 rounded-full bg-[#009FD4]/10 flex items-center justify-center text-[#009FD4] shrink-0 mt-0.5">
                              <Zap size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-xs font-bold text-[#009FD4] uppercase tracking-wider">Developer equity (20%)</h4>
                                <span className="text-xs font-bold font-mono text-brand-dark">₦{developerEquity.toFixed(1)}B</span>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                                Sponsor/developer commitment layer. Demonstrates alignment of interests and operational responsibility for active green asset sites.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stack Visualization */}
                    <div className="lg:col-span-6 flex flex-col items-center justify-center">
                      <div className="relative w-full max-w-[320px] aspect-[4/5] bg-white border border-gray-100/70 rounded-[12px] p-8 flex flex-col justify-end">
                        
                        {/* InfraCredit AAA wrap boundary */}
                        <div className="absolute inset-x-4 top-10 bottom-20 border-2 border-dashed border-[#81C34D] rounded-[6px] pointer-events-none flex items-start justify-center">
                          <div className="bg-[#81C34D] text-[#051F1A] px-3 py-1 text-[8px] font-mono font-bold uppercase tracking-widest rounded-full -mt-2.5 shadow-md flex items-center gap-1">
                            <ShieldCheck size={10} />
                            InfraCredit AAA Guarantee Wrap
                          </div>
                        </div>

                        {/* Bar chart area */}
                        <div className="flex-grow flex items-end justify-center w-full relative pt-12 pb-2 h-[260px]">
                          <motion.div 
                            layout
                            style={{ height: `${(projectSize / 30) * 100}%` }}
                            transition={{ type: "spring", stiffness: 260, damping: 26 }}
                            className="w-24 flex flex-col justify-end gap-1.5 z-10"
                          >
                            {/* Senior */}
                            <motion.div
                              layout
                              style={{ height: '60%' }}
                              className="w-full bg-[#051F1A] rounded-[4px] flex flex-col justify-between p-3 cursor-pointer border border-white/10"
                              whileHover={{ scale: 1.02 }}
                            >
                              <span className="text-[10px] font-bold text-white font-mono leading-none">60%</span>
                              <span className="text-[8px] text-gray-300 font-mono uppercase truncate tracking-wider">Senior</span>
                            </motion.div>
                            {/* Blended */}
                            <motion.div
                              layout
                              style={{ height: '20%' }}
                              className="w-full bg-[#00A788] rounded-[4px] flex flex-col justify-between p-3 cursor-pointer border border-white/5"
                              whileHover={{ scale: 1.02 }}
                            >
                              <span className="text-[10px] font-bold text-white font-mono leading-none">20%</span>
                              <span className="text-[8px] text-white/95 font-mono uppercase truncate tracking-wider">Blended</span>
                            </motion.div>
                            {/* Equity */}
                            <motion.div
                              layout
                              style={{ height: '20%' }}
                              className="w-full bg-[#009FD4] rounded-[4px] flex flex-col justify-between p-3 cursor-pointer border border-white/5"
                              whileHover={{ scale: 1.02 }}
                            >
                              <span className="text-[10px] font-bold text-white font-mono leading-none">20%</span>
                              <span className="text-[8px] text-white/95 font-mono uppercase truncate tracking-wider">Equity</span>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Dynamic Label */}
                        <div className="border-t border-gray-150 pt-4 mt-2 text-center">
                          <span className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-widest block">Total de-risked stack</span>
                          <span className="text-xl font-bold font-sans text-brand-dark">₦{projectSize.toFixed(1)}B NGN</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── 6. UNIFIED PARTNER ECOSYSTEM GRID ────── */}
      <div id="partners" data-rag-chunk="about-partner-ecosystem" className="relative z-10">
        <PartnerShowcase />
      </div>

      {/* ── 7. MILESTONES TIMELINE ────── */}
      <div id="milestones" data-rag-chunk="about-milestones" className="relative z-10 bg-white">
        <MilestonesTimelineV3 />
      </div>

      {/* ── 7B. IDENTIFY YOUR ROLE ────── */}
      <div id="audience" data-rag-chunk="about-audience-console" className="relative z-10 bg-white">
        <AudienceConsole />
      </div>



      <section className="pt-12 pb-6 bg-[#051F1A] text-white relative z-10 border-t border-white/5">
        <motion.div {...fadeUp(0)} className="container mx-auto px-6 max-w-[1280px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-accent" />
            <span className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase font-mono">Next steps</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Explore the <span className="text-[#9BB7B1] italic font-serif">facility portal</span>
          </h2>
        </motion.div>
      </section>

      <section className="bg-[#3da58a] relative z-10">
        <motion.div {...fadeUp(0.08)} className="max-w-[1280px] mx-auto px-6">
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

      {/* ── 9. DOWNLOAD CTA (Factsheet & Prospectus visual banner) ────── */}
      <div data-rag-chunk="about-download-cta" className="relative z-10">
        <div className="min-h-[460px] relative flex items-center justify-center group overflow-hidden">
          <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop" alt="CFBF Factsheet & Prospectus Background" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-brand-dark/70 group-hover:bg-brand-dark/65 transition-colors z-10" />
          <motion.div {...fadeUp(0)} className="relative z-20 text-center max-w-2xl px-6 flex flex-col items-center">
            <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">Factsheet &amp; prospectus</span>
            <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">Get the technical specifications of the facility</h3>
            <p className="text-white/75 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              {"Download our comprehensive factsheet outlining fund structure, eligibility guidelines, co-financing terms, and regional deployment targets."}
            </p>
            <motion.a
              href="/wp-content/uploads/2026/05/CFBF-Factsheet-compressed.pdf"
              download="CFBF_Factsheet.pdf"
              whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#051F1A' }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-accent text-brand-dark px-8 py-4 rounded-[6px] flex items-center gap-3 font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-accent/25 transition-all duration-300 font-sans cursor-pointer"
            >
              <Download size={16} />
              Download Factsheet
            </motion.a>
          </motion.div>
        </div>
      </div>

    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#FAFDFB] text-brand-dark min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        Loading about...
      </div>
    }>
      <AboutPageContent />
    </Suspense>
  );
}
