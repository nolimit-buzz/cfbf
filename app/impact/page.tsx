"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Clock, LayoutGrid, List, ArrowRight, ArrowUpRight, Globe, Building2, Users, Landmark, TrendingUp, BarChart3, ShieldCheck, FolderClosed, Zap, Leaf, Wifi } from 'lucide-react';
import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import CountUp from '@/components/ui/CountUp';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

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

const STORIES = [
  {
    title: "Meet Felicia Adindu-End User, Darway Coast",
    role: "Community Voice",
    location: "Rivers State",
    type: "Video Testimonial",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    excerpt: "In Akpoku, Rivers State, Felicia Adindu once struggled with unreliable energy. Now, clean solar power has transformed her daily life and business.",
    duration: "4:32 mins",
    video: "/videos/solar-panels.mp4",
    badge: "Case Study",
  },
  {
    title: "ACOB Lighting Solar Powered Rural Electrification Project",
    role: "Developer",
    location: "Akwa-Ibom & Benue States",
    type: "Video Testimonial",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    excerpt: "Investing in clean energy means investing in communities. How ACOB Lighting is powering local development in northern regions.",
    duration: "3:15 mins",
    video: "/videos/wind-turbines.mp4",
    badge: "Tech Showcase",
  },
  {
    title: "Prado Power Solar Powered Rural Electrification Project",
    role: "Developer",
    location: "Cross River State",
    type: "Video Testimonial",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=800&auto=format&fit=crop",
    excerpt: "The project will construct solar-hybrid mini-grid installations to power households and small businesses in off-grid rural areas.",
    duration: "5:40 mins",
    video: "/videos/infracredit-hotspot.mp4",
    badge: "Milestone Focus",
  },
  {
    title: "Mesh Grid Networks Powering Agriculture - First Electric",
    role: "Developer",
    location: "Gombe & Nasarawa States",
    type: "Video Case Study",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop",
    excerpt: "Mesh grid networks connect rural households and small agricultural processors in Gombe State, facilitating cold storage and local commerce.",
    duration: "3:45 mins",
    video: "/videos/solar-panels.mp4",
    badge: "Infrastructure",
  },
  {
    title: "Unlocking Local Capital for Off-Grid Power - CEESOLAR",
    role: "Project Lead",
    location: "Cross River State",
    type: "Project Update",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    excerpt: "CEESOLAR Energy utilizes concessional funding to build high-capacity solar-hybrid grids, powering rural communities in the Niger Delta region.",
    duration: "4:15 mins",
    video: "/videos/wind-turbines.mp4",
    badge: "Clean Finance",
  },
  {
    title: "Solarizing Rural Telecom Infrastructure - Hotspot Network",
    role: "Community Partner",
    location: "Kano & Kaduna States",
    type: "Field Documentary",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800&auto=format&fit=crop",
    excerpt: "Replacing diesel generators with high-efficiency solar hybrid arrays across 120 base stations, bringing continuous clean connectivity to rural Nigeria.",
    duration: "5:10 mins",
    video: "/videos/infracredit-hotspot.mp4",
    badge: "Digital Impact",
  }
];

// Icon Stat Box Component
const IconStatBox: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  iconBg?: string;
  iconColor: string;
  glowColor?: string;
  delay?: number;
}> = ({ icon, label, value, unit, iconColor, delay = 0 }) => {
  // Contextual description builder
  const cardDesc = label.toLowerCase().includes("capacity") ? "installed clean generating capacity co-financed." :
    label.toLowerCase().includes("emissions") || label.toLowerCase().includes("ghg") ? "tonnes of annual carbon emissions mitigated." :
    label.toLowerCase().includes("jobs") || label.toLowerCase().includes("job") ? "sustainable employment opportunities facilitated." :
    label.toLowerCase().includes("connections") ? "projected household and SME connections powered." : 
    "tracked facility transaction metrics.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative flex flex-col justify-between p-5 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[6px] min-h-[180px] group cursor-default will-change-transform transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] shadow-lg text-left"
    >
      <div className="flex justify-between items-start">
        <span className="text-gray-300 text-[9px] font-bold uppercase tracking-[0.2em] font-mono block truncate max-w-[80%]">
          {label}
        </span>
        <div style={{ color: iconColor }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 [&>svg]:w-5 [&>svg]:h-5 animate-none">
          {icon}
        </div>
      </div>

      <div className="my-3 flex items-baseline flex-wrap">
        <span className="text-2xl md:text-3xl font-light text-white font-sans tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs text-gray-400 ml-1 font-light font-sans">{unit}</span>
        )}
      </div>

      <p className="text-gray-300 text-[14px] leading-relaxed font-sans font-light mt-auto">
        {cardDesc}
      </p>
    </motion.div>
  );
};

const projects = [
  {
    id: "01",
    title: "First Electric Power and Automation Services",
    location: "Gombe, Nasarawa & Ondo States",
    year: "2025",
    capital: "₦1.70b",
    capacity: "725KW",
    category: "Solar Grid",
    connections: "5,156",
    jobs: "616",
    ghg: "762 Tonnes",
    status: "Under Construction",
  },
  {
    id: "02",
    title: "CEESOLAR Energy Limited",
    location: "Cross River State",
    year: "2025",
    capital: "₦1.70b",
    capacity: "760KW",
    category: "Solar Grid",
    connections: "3,597",
    jobs: "561",
    ghg: "737 Tonnes",
    status: "Under Construction",
  },
  {
    id: "03",
    title: "Prado Power Energy Limited",
    location: "Akwa-Ibom & Benue States",
    year: "2024",
    capital: "₦1.95b",
    capacity: "850kW",
    category: "Agro-Processing",
    connections: "15,801",
    jobs: "740",
    ghg: "893 Tonnes",
    status: "Under Construction",
  },
  {
    id: "04",
    title: "Hotspot Network Limited",
    location: "22 States in Nigeria",
    year: "2023",
    capital: "₦955m",
    capacity: "324kW",
    category: "Telecoms",
    connections: "120 Sites",
    jobs: "720",
    ghg: "8.34 Tonnes",
    status: "Operational",
  },
  {
    id: "05",
    title: "Darway Coast Limited",
    location: "Rivers & Abia States",
    year: "2022",
    capital: "₦800m",
    capacity: "526kW",
    category: "Solar Grid",
    connections: "7,711",
    jobs: "2,296",
    ghg: "4,856 Tonnes",
    status: "Operational",
  },
  {
    id: "06",
    title: "ACOB Lightning Technology Limited",
    location: "Edo & Ondo States",
    year: "2023",
    capital: "₦755m",
    capacity: "335kW",
    category: "Solar Grid",
    connections: "3,597",
    jobs: "868",
    ghg: "352 Tonnes",
    status: "Operational",
  }
];

function ImpactPageContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState('card');
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [visibleStories, setVisibleStories] = useState(3);
  const [activeImpactTab, setActiveImpactTab] = useState<'stories' | 'numbers' | 'investments' | 'assets'>('stories');

  // Auto-play modal trigger via search param
  useEffect(() => {
    const playParam = searchParams.get('play');
    if (playParam) {
      const story = STORIES[Number(playParam)] || STORIES[0];
      setSelectedVideo({ url: story.video, title: story.title });
    }
  }, [searchParams]);

  const topStats = [
    {
      value: '₦7.86B+',
      label: 'Capital Deployed',
      sub: 'mobilized from institutional investors and pension funds into the real economy.',
      category: 'Investment',
      sdg: 9,
      bgClass: 'bg-brand-primary text-white border-brand-primary/20',
      arrowColor: '#81C34D',
    },
    {
      value: '7,500+ tCO₂e',
      label: 'Emissions Avoided',
      sub: 'tonnes of annual carbon emissions mitigated across active installations.',
      category: 'Mitigation',
      sdg: 13,
      bgClass: 'bg-brand-cyan text-white border-brand-cyan/20',
      arrowColor: '#81C34D',
    },
    {
      value: '5,780+',
      label: 'Job Creation',
      sub: 'sustainable jobs facilitated in local clean energy construction & ops.',
      category: 'Employment',
      sdg: 8,
      bgClass: 'bg-brand-accent text-brand-dark border-brand-accent/20',
      arrowColor: '#051F1A',
    },
    {
      value: '4.02 MW',
      label: 'Capacity Installed',
      sub: 'installed green capacity de-risked by first-loss co-financing.',
      category: 'Generation',
      sdg: 7,
      bgClass: 'bg-[#E6F0EA] text-brand-dark border-[#E6F0EA]/20',
      arrowColor: '#00A788',
    },
    {
      value: '39,438',
      label: 'Connections Powered',
      sub: 'projected household and SME clean energy connections powered across Nigeria.',
      category: 'Energy Access',
      sdg: 7,
      bgClass: 'bg-[#D1E5F8] text-brand-dark border-[#D1E5F8]/20',
      arrowColor: '#009FD4',
    },
    {
      value: '35 States',
      label: 'Active Pipeline',
      sub: 'subnational clean energy deal flow coverage across Nigeria.',
      category: 'Reach',
      sdg: 17,
      bgClass: 'bg-brand-dark text-white border-brand-dark/20',
      arrowColor: '#81C34D',
    },
  ];

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative font-sans antialiased text-left selection:bg-brand-accent selection:text-brand-dark">
      <title>Our Impact & Transition Strategy | CFBF</title>
      <meta name="description" content="Tracking our contribution to Nigeria's Net Zero targets, SDG goals, and local clean energy community projects." />

      {/* Hero */}
      <GlassHero
        title={
          <>
            Our strategy &amp; <span className="text-[#9BB7B1]">impact</span>
          </>
        }
        subtitle="Stories & strategy"
        bgImage="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop"
        currentPage="impact"
        description={
          <>
            <p className="text-base">
              CFBF is built to bridge the green infrastructure gap, moving local pension assets into clean energy and sustainable developments that empower local communities.
            </p>
            <p className="text-white/50 text-base">
              Discover our localized case study video stories and our long-term Net Zero transition strategy below.
            </p>
          </>
        }
      >
        {/* Top metrics inside Hero */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={heroRowVariants}
          initial="hidden"
          animate="show"
        >
          {topStats.map((s, idx) => {
            return (
              <motion.div
                key={s.label}
                variants={heroCardVariants}
                whileHover={{ y: -4, scale: 1.01, borderColor: s.arrowColor + '40' }}
                className={`rounded-[6px] border ${s.bgClass} p-6 flex flex-col justify-between h-full min-h-[220px] md:min-h-[240px] shadow-lg transition-all duration-300 group cursor-default relative will-change-transform`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono block opacity-60">
                    {s.category}
                  </span>
                  <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: s.arrowColor }} />
                </div>
                
                <div className="my-4 flex items-baseline">
                  <span className="text-4xl md:text-5xl font-light font-sans tracking-tight">
                    <CountUp value={s.value} />
                  </span>
                </div>
                
                <p className="text-xs md:text-sm leading-relaxed font-sans font-light opacity-90 mb-4">
                  {s.sub}
                </p>

                {/* SDG badge */}
                {s.sdg && (
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {(() => {
                      const sdgsConfig = {
                        5: { label: 'SDG 5', color: '#FF4A6B', bg: 'bg-[#FF4A6B]/10', text: 'text-[#FF4A6B]', border: 'border-[#FF4A6B]/20' },
                        7: { label: 'SDG 7', color: '#FDB713', bg: 'bg-[#FDB713]/10', text: 'text-[#FDB713]', border: 'border-[#FDB713]/20' },
                        8: { label: 'SDG 8', color: '#FF4A6B', bg: 'bg-[#FF4A6B]/10', text: 'text-[#FF4A6B]', border: 'border-[#FF4A6B]/20' },
                        9: { label: 'SDG 9', color: '#F36D25', bg: 'bg-[#F36D25]/10', text: 'text-[#F36D25]', border: 'border-[#F36D25]/20' },
                        11: { label: 'SDG 11', color: '#FD9D24', bg: 'bg-[#FD9D24]/10', text: 'text-[#FD9D24]', border: 'border-[#FD9D24]/20' },
                        13: { label: 'SDG 13', color: '#56C36A', bg: 'bg-[#56C36A]/10', text: 'text-[#56C36A]', border: 'border-[#56C36A]/20' },
                        17: { label: 'SDG 17', color: '#19486A', bg: 'bg-[#19486A]/10', text: 'text-[#19486A]', border: 'border-[#19486A]/20' }
                      };
                      const info = sdgsConfig[s.sdg as keyof typeof sdgsConfig];
                      if (!info) return null;
                      return (
                        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded border ${info.border} ${info.bg} ${info.text} text-[9px] font-bold uppercase tracking-wider self-start font-sans`}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: info.color }} />
                          {info.label}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </GlassHero>

      {/* ── IMPACT PHILOSOPHY / INTRO SECTION ────── */}
      <section className="py-20 bg-white relative z-10 border-b border-gray-100/40">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 text-left">
              <span className="text-brand-primary text-xs font-semibold tracking-[0.2em] uppercase font-mono block mb-2">
                — Our Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark font-sans tracking-tight leading-tight mb-6">
                Mobilizing capital to power <span className="text-[#7C9590]">sustainable transitions</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6 font-light font-sans">
                The Climate Finance Blending Facility is strategically structured to address the barriers preventing long-term private investment from entering Nigeria's green infrastructure market.
              </p>
              <p className="text-gray-500 text-base leading-relaxed font-light font-sans">
                By blending concessional first-loss capital with local currency guarantees, we establish robust, investment-grade opportunities that deliver double-bottom-line returns: financial security for pension savers and clean energy access for rural and underserved communities.
              </p>
            </div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Capital Mobilization",
                  desc: "De-risking private institutional pension fund assets and matching them to clean energy developers under local-currency wrappers.",
                  n: "01"
                },
                {
                  title: "Climate Mitigation",
                  desc: "Mitigating greenhouse gas emissions through replacement of off-grid diesel generation with localized solar hybrid solutions.",
                  n: "02"
                },
                {
                  title: "Community Empowerment",
                  desc: "Providing micro-enterprises, farming hubs, and households with stable, clean electricity to increase productivity and incomes.",
                  n: "03"
                },
                {
                  title: "Local Capacity Building",
                  desc: "Supporting developer project preparation and operations to build local capacity in green infrastructure development.",
                  n: "04"
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FAFDFB] border border-gray-100/70 p-6 rounded-[6px] text-left flex flex-col justify-between min-h-[160px] hover:border-brand-primary/20 transition-all duration-300"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-primary/40 block mb-3">/ {item.n}</span>
                    <h4 className="text-sm font-bold text-brand-dark font-sans mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT STORIES & METRICS CONSOLE SECTION ────── */}
      <section id="stories" className="py-24 bg-[#02100d] text-white relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1280px]">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b border-white/10 pb-8 gap-6">
            <div>
              <span className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase font-mono block mb-2">
                — Impact Console
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-sans tracking-tight leading-tight">
                Stakeholder testimonials &amp; <span className="text-[#9BB7B1]">proof</span>
              </h2>
            </div>

            {/* Console Tab Buttons */}
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-2 lg:pb-0 w-full lg:w-auto">
              <button
                onClick={() => setActiveImpactTab('stories')}
                className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none whitespace-nowrap ${
                  activeImpactTab === 'stories' ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
                }`}
              >
                <LayoutGrid size={16} />
                Stories from our communities
                {activeImpactTab === 'stories' && (
                  <motion.div layoutId="impactPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
                )}
              </button>
              <button
                onClick={() => setActiveImpactTab('numbers')}
                className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none whitespace-nowrap ${
                  activeImpactTab === 'numbers' ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
                }`}
              >
                <BarChart3 size={16} />
                Our impact in numbers
                {activeImpactTab === 'numbers' && (
                  <motion.div layoutId="impactPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
                )}
              </button>
              <button
                onClick={() => setActiveImpactTab('investments')}
                className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none whitespace-nowrap ${
                  activeImpactTab === 'investments' ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
                }`}
              >
                <ShieldCheck size={16} />
                What we invest in
                {activeImpactTab === 'investments' && (
                  <motion.div layoutId="impactPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
                )}
              </button>
              <button
                onClick={() => setActiveImpactTab('assets')}
                className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none whitespace-nowrap ${
                  activeImpactTab === 'assets' ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
                }`}
              >
                <FolderClosed size={16} />
                Our assets
                {activeImpactTab === 'assets' && (
                  <motion.div layoutId="impactPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeImpactTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {activeImpactTab === 'stories' && (
                <div>
                  {/* View mode buttons & info row */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs text-gray-400 font-sans font-light">
                      Showing {Math.min(visibleStories, STORIES.length)} of {STORIES.length} community case studies
                    </span>
                    <div className="flex items-center gap-2 rounded-full p-1 bg-white/5 border border-white/10">
                      <button
                        onClick={() => setViewMode('card')}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          viewMode === 'card' 
                            ? 'bg-brand-accent text-brand-dark' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        aria-label="Card View"
                      >
                        <LayoutGrid size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          viewMode === 'list' 
                            ? 'bg-brand-accent text-brand-dark' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        aria-label="List View"
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {viewMode === 'card' ? (
                      <motion.div
                        key="card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                      >
                        {STORIES.slice(0, visibleStories).map((story, i) => {
                          const badgeColor = i % 3 === 0 
                            ? "text-[#81C34D] bg-[#81C34D]/10 border-[#81C34D]/25" 
                            : i % 3 === 1 
                              ? "text-[#009FD4] bg-[#009FD4]/10 border-[#009FD4]/25" 
                              : "text-[#00A788] bg-[#00A788]/10 border-[#00A788]/25";
                          
                          const playBg = i % 3 === 0 ? "bg-[#81C34D]" : i % 3 === 1 ? "bg-[#009FD4]" : "bg-[#00A788]";
                          const topicColor = i % 3 === 0 ? "text-[#81C34D]" : i % 3 === 1 ? "text-[#009FD4]" : "text-[#00A788]";
                          
                          return (
                            <div
                              key={i}
                              onClick={() => setSelectedVideo({ url: story.video, title: story.title })}
                              className="group cursor-pointer flex flex-col border border-white/10 rounded-[6px] overflow-hidden bg-white/[0.02] hover:-translate-y-0.5 transition-all duration-300 hover:border-white/20 text-left"
                            >
                              {/* Media area */}
                              <div className="relative aspect-video bg-[#051F1A] overflow-hidden">
                                <img
                                  src={story.image}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                  alt={story.title}
                                />
                                {/* Play button */}
                                <div className={`absolute top-4 right-4 w-10 h-10 rounded-[6px] flex items-center justify-center ${playBg} group-hover:scale-105 transition-transform duration-300`}>
                                  <Play size={14} fill={i % 3 === 0 ? "#051F1A" : "white"} stroke="none" className="ml-0.5" />
                                </div>
                                {/* Category badge */}
                                <div className="absolute bottom-3 left-3">
                                  <span className={`backdrop-blur-md text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full font-mono border ${badgeColor}`}>
                                    {story.badge}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Metadata Details */}
                              <div className="p-5 flex flex-col gap-0 text-left flex-1 justify-between bg-[#051F1A]/40">
                                <div>
                                  <h3 className="text-white text-sm font-bold font-sans mb-3 leading-snug group-hover:text-brand-accent transition-colors min-h-[40px] line-clamp-2">
                                    {story.title}
                                  </h3>
                                  <p className="text-gray-300 text-xs font-light leading-relaxed mb-4 line-clamp-2">{story.excerpt}</p>
                                </div>
                                
                                <div className="space-y-0 mt-2">
                                  <div className="flex justify-between border-t border-white/5 py-2">
                                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">ROLE</span>
                                    <span className="text-[9px] font-bold font-mono text-white">{story.role}</span>
                                  </div>
                                  <div className="flex justify-between border-t border-white/5 py-2">
                                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">LOCATION</span>
                                    <span className="text-[9px] font-bold font-mono text-white">{story.location}</span>
                                  </div>
                                  <div className="flex justify-between border-t border-white/5 py-2">
                                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">TYPE</span>
                                    <span className={`text-[9px] font-bold font-mono ${topicColor}`}>{story.type}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-6"
                      >
                        {STORIES.slice(0, visibleStories).map((story, i) => {
                          const badgeColor = i % 3 === 0 
                            ? "text-[#81C34D] bg-[#81C34D]/10 border-[#81C34D]/25" 
                            : i % 3 === 1 
                              ? "text-[#009FD4] bg-[#009FD4]/10 border-[#009FD4]/25" 
                              : "text-[#00A788] bg-[#00A788]/10 border-[#00A788]/25";
                          
                          const playBg = i % 3 === 0 ? "bg-[#81C34D]" : i % 3 === 1 ? "bg-[#009FD4]" : "bg-[#00A788]";
                          const topicColor = i % 3 === 0 ? "text-[#81C34D]" : i % 3 === 1 ? "text-[#009FD4]" : "text-[#00A788]";
         
                          return (
                            <div
                              key={i}
                              onClick={() => setSelectedVideo({ url: story.video, title: story.title })}
                              className="group flex flex-col md:flex-row gap-6 bg-white/[0.02] border border-white/10 p-4 rounded-[8px] hover:border-white/20 transition-all duration-300 cursor-pointer text-left"
                            >
                              {/* Media area */}
                              <div className="w-full md:w-48 aspect-video rounded-[6px] overflow-hidden shrink-0 relative bg-[#051F1A]">
                                <img src={story.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" alt={story.title} />
                                {/* Play button */}
                                <div className="absolute top-3 right-3 w-8 h-8 rounded-[4px] flex items-center justify-center bg-white/20 group-hover:scale-105 transition-transform duration-300">
                                  <Play size={12} fill="white" stroke="none" className="ml-0.5" />
                                </div>
                                {/* Category badge */}
                                <div className="absolute bottom-2.5 left-2.5">
                                  <span className={`backdrop-blur-md text-[8px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full font-mono border ${badgeColor}`}>
                                    {story.badge}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Content area */}
                              <div className="flex-1 flex flex-col justify-between py-1 text-left">
                                <div>
                                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-brand-accent transition-colors leading-snug font-sans">
                                    {story.title}
                                  </h3>
                                  <p className="text-gray-350 text-xs font-light leading-relaxed mb-3 line-clamp-1">{story.excerpt}</p>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-3">
                                  <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5">ROLE</span>
                                    <span className="text-[9px] font-bold font-mono text-white">{story.role}</span>
                                  </div>
                                  <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5">LOCATION</span>
                                    <span className="text-[9px] font-bold font-mono text-white">{story.location}</span>
                                  </div>
                                  <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5">TYPE</span>
                                    <span className={`text-[9px] font-bold font-mono ${topicColor}`}>{story.type}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* View More Button */}
                  {visibleStories < STORIES.length && (
                    <div className="flex justify-center mt-12">
                      <button
                        onClick={() => setVisibleStories(6)}
                        className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-brand-accent text-white hover:text-brand-accent px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans select-none focus:outline-none bg-white/[0.02]"
                      >
                        View more testimonials <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeImpactTab === 'numbers' && (
                <div>
                  {/* Metric Box Tiles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <IconStatBox
                      icon={<Zap />}
                      label="Capacity Installed"
                      value="4.02"
                      unit="MW"
                      iconBg="rgba(0, 167, 136, 0.1)"
                      iconColor="#00A788"
                      glowColor="#00A788"
                      delay={0.05}
                    />
                    <IconStatBox
                      icon={<Leaf />}
                      label="Emissions Avoided"
                      value="7,500+"
                      unit="tCO₂e"
                      iconBg="rgba(129, 195, 77, 0.1)"
                      iconColor="#81C34D"
                      glowColor="#81C34D"
                      delay={0.1}
                    />
                    <IconStatBox
                      icon={<Users />}
                      label="Job Creation"
                      value="5,780+"
                      unit="Jobs"
                      iconBg="rgba(255, 74, 107, 0.1)"
                      iconColor="#FF4A6B"
                      glowColor="#FF4A6B"
                      delay={0.15}
                    />
                    <IconStatBox
                      icon={<Wifi />}
                      label="Connections Powered"
                      value="39,438"
                      iconBg="rgba(0, 159, 212, 0.1)"
                      iconColor="#009FD4"
                      glowColor="#009FD4"
                      delay={0.2}
                    />
                  </div>

                  {/* Transition Dial & Penetrability indicator row */}
                  <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Left Column: Progress Wheel */}
                    <div className="flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-[12px] p-8 text-center md:text-left">
                      <div className="relative mb-6">
                        <svg viewBox="0 0 360 300" className="w-full max-w-sm mx-auto md:mx-0" style={{ overflow: 'visible' }}>
                          {[-90, -45, 0, 45, 90].map(a => {
                            const inner = polar(AX, AY, 40, a);
                            const outer = polar(AX, AY, 148, a);
                            return <line key={a} x1={inner.x.toFixed(1)} y1={inner.y.toFixed(1)} x2={outer.x.toFixed(1)} y2={outer.y.toFixed(1)} stroke="#00A788" strokeWidth="1" opacity="0.15" />;
                          })}
                          {[50, 90, 130].map(r => <circle key={r} cx={AX} cy={AY} r={r} fill="none" stroke="#00A788" strokeWidth="1" opacity="0.1" />)}
                          <path d={arc(AX, AY, AR, A_START, A_END)} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="14" strokeLinecap="round" />
                          <motion.path d={arc(AX, AY, AR, A_START, A_END)} fill="none" stroke="#00A788" strokeWidth="14" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: PROGRESS }} viewport={{ once: false, margin: '-50px' }} transition={{ duration: 2.2, ease: 'easeOut', delay: 0.4 }} />
                          <circle cx={wp2022.x.toFixed(1)} cy={wp2022.y.toFixed(1)} r="7" fill="#00A788" />
                          <circle cx={wp2022.x.toFixed(1)} cy={wp2022.y.toFixed(1)} r="12" fill="none" stroke="#00A788" strokeWidth="1.5" opacity="0.5" />
                          <circle cx={wp2030.x.toFixed(1)} cy={wp2030.y.toFixed(1)} r="6" fill="none" stroke="#009FD4" strokeWidth="2" />
                          <circle cx={wp2030.x.toFixed(1)} cy={wp2030.y.toFixed(1)} r="2" fill="#009FD4" />
                          <circle cx={wp2060.x.toFixed(1)} cy={wp2060.y.toFixed(1)} r="6" fill="none" stroke="#81C34D" strokeWidth="2" />
                          <circle cx={wp2060.x.toFixed(1)} cy={wp2060.y.toFixed(1)} r="2" fill="#81C34D" />
                          <text x={(wp2022.x - 18).toFixed(1)} y={(wp2022.y + 20).toFixed(1)} fill="#00A788" fontSize="9" fontFamily="monospace" fontWeight="bold">2022</text>
                          <text x={(wp2030.x - 10).toFixed(1)} y={(wp2030.y - 14).toFixed(1)} fill="#009FD4" fontSize="9" fontFamily="monospace">2030</text>
                          <text x={(wp2060.x + 6).toFixed(1)} y={(wp2060.y + 6).toFixed(1)} fill="#81C34D" fontSize="9" fontFamily="monospace">2060</text>
                          <text x={AX} y={AY - 10} textAnchor="middle" fill="white" fontSize="48" fontFamily="monospace" fontWeight="bold" className="fill-white">2060</text>
                          <text x={AX} y={AY + 16} textAnchor="middle" fill="#7C9590" fontSize="11" fontFamily="sans-serif" className="fill-gray-400">Nigeria NZE Target</text>
                          <text x={AX} y={AY + 38} textAnchor="middle" fill="#00A788" fontSize="10" fontFamily="monospace" fontWeight="bold" className="fill-[#00A788]">~16% progress</text>
                        </svg>
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
                          {[{ yr: '2022', col: '#00A788', filled: true, label: 'Current' }, { yr: '2030', col: '#009FD4', filled: false, label: 'Interim target' }, { yr: '2060', col: '#81C34D', filled: false, label: 'NZE goal' }].map(w => (
                            <div key={w.yr} className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full border-2" style={{ backgroundColor: w.filled ? w.col : 'transparent', borderColor: w.col }} />
                              <span className="text-[10px] font-mono text-gray-400">{w.yr} — {w.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Detailed parameters */}
                    <div className="flex flex-col justify-between space-y-4">
                      <div className="bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-[6px] p-6 flex-1 flex flex-col justify-center text-left">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-[6px] bg-[#00A788]/10 flex items-center justify-center"><Globe size={14} className="text-[#00A788]" /></div>
                          <span className="text-[10px] font-mono text-[#00A788] uppercase tracking-widest font-bold">Nigeria Energy Transition Plan</span>
                        </div>
                        <p className="text-gray-355 font-sans text-xs leading-relaxed font-light">
                          Nigeria's ETP sets an ambitious path to net zero by 2060. CFBF is purpose-built to accelerate this transition by mobilising private capital at scale for off-grid and distributed renewables.
                        </p>
                      </div>
                      
                      <div className="bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-[6px] p-6 flex-1 flex flex-col justify-center text-left">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-[10px] font-mono text-[#009FD4] uppercase tracking-widest font-bold">Pension fund penetration</span>
                          <span className="text-[#009FD4] font-bold font-mono text-sm">30% target</span>
                        </div>
                        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-1.5">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: '30%' }} viewport={{ once: false }} transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }} className="absolute inset-y-0 left-0 bg-[#009FD4] rounded-full" />
                          <div className="absolute inset-y-0 left-[6.67%] w-px bg-white/30" />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-gray-400">
                          <span>Current ~2%</span>
                          <span>Target 30% by 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeImpactTab === 'investments' && (
                <div>
                  {/* 4 Pillars Grid */}
                  <h3 className="text-sm font-bold font-mono uppercase tracking-[0.25em] text-[#81C34D] mb-6 block text-left">
                    / Strategic Investment Pillars
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                      {
                        title: "Capital Mobilization",
                        desc: "De-risking private institutional pension fund assets and matching them to clean energy developers under local-currency wrappers.",
                        n: "01"
                      },
                      {
                        title: "Climate Mitigation",
                        desc: "Mitigating greenhouse gas emissions through replacement of off-grid diesel generation with localized solar hybrid solutions.",
                        n: "02"
                      },
                      {
                        title: "Community Empowerment",
                        desc: "Providing micro-enterprises, farming hubs, and households with stable, clean electricity to increase productivity and incomes.",
                        n: "03"
                      },
                      {
                        title: "Local Capacity Building",
                        desc: "Supporting developer project preparation and operations to build local capacity in green infrastructure development.",
                        n: "04"
                      }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="group relative bg-[#051F1A] border border-white/10 p-6 pt-10 sm:pt-12 rounded-[8px] flex flex-col justify-between h-[220px] overflow-hidden hover:border-white/20 transition-all duration-300 text-left cursor-default"
                      >
                        <div className="relative z-10">
                          <span className="text-[10px] font-mono font-bold text-brand-accent block mb-3">/ {item.n}</span>
                          <h4 className="text-sm font-bold text-white font-sans mb-2">{item.title}</h4>
                        </div>
                        
                        {/* Static gradient background overlay under text */}
                        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />
                        
                        {/* Text wrapper to restrict clipping above bottom margin */}
                        <div className="absolute bottom-6 left-6 right-6 overflow-hidden h-[75px] z-10">
                          <div className="translate-y-[52px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                            <p className="text-[14px] text-gray-300 font-sans font-light leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 4 SDG Integration Cards */}
                  <h3 className="text-sm font-bold font-mono uppercase tracking-[0.25em] text-[#81C34D] mb-6 block text-left">
                    / SDG Framework Alignments
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* 07 Affordable & Clean Energy */}
                    <div className="relative rounded-[6px] overflow-hidden flex flex-col justify-between h-[320px] sm:h-[350px] group border border-[#FCC30B]/15 hover:border-[#FCC30B]/30 transition-all duration-300 cursor-default text-left">
                      <img 
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop"
                        alt="Affordable & Clean Energy background"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#051F1A]/92 group-hover:bg-[#051F1A]/85 transition-colors duration-300" />
                      
                      {/* Top bar & Fixed Header */}
                      <div className="relative z-10 p-6 pt-10 sm:pt-12 flex flex-col justify-start h-full">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-light font-mono text-white/30 leading-none">07</span>
                          <ArrowUpRight size={14} className="text-white/60 group-hover:text-[#FCC30B] transition-colors" />
                        </div>
                        <h4 className="font-bold text-sm text-white font-sans mb-1.5">Affordable &amp; Clean Energy</h4>
                        <div>
                          <span className="inline-block text-[8px] font-bold text-white font-mono bg-[#FCC30B] px-2 py-0.5 rounded-full">SDG 7</span>
                        </div>
                      </div>

                      {/* Static gradient background overlay under text */}
                      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />

                      {/* Bottom sliding description wrapper */}
                      <div className="absolute bottom-6 left-6 right-6 overflow-hidden h-[95px] z-10">
                        <div className="translate-y-[55px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                          <p className="text-[14px] text-gray-300 font-sans leading-relaxed font-light">
                            Channelling long-term local currency financing to expand distributed renewable energy, building mini-grids and solar systems across underserved communities.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 08 Decent Work & Growth */}
                    <div className="relative rounded-[6px] overflow-hidden flex flex-col justify-between h-[320px] sm:h-[350px] group border border-[#A21942]/15 hover:border-[#A21942]/30 transition-all duration-300 cursor-default text-left">
                      <img 
                        src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop"
                        alt="Decent Work & Growth background"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#051F1A]/92 group-hover:bg-[#051F1A]/85 transition-colors duration-300" />
                      
                      {/* Top bar & Fixed Header */}
                      <div className="relative z-10 p-6 pt-10 sm:pt-12 flex flex-col justify-start h-full">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-light font-mono text-white/30 leading-none">08</span>
                          <ArrowUpRight size={14} className="text-white/60 group-hover:text-[#A21942] transition-colors" />
                        </div>
                        <h4 className="font-bold text-sm text-white font-sans mb-1.5">Decent Work &amp; Growth</h4>
                        <div>
                          <span className="inline-block text-[8px] font-bold text-white font-mono bg-[#A21942] px-2 py-0.5 rounded-full">SDG 8</span>
                        </div>
                      </div>

                      {/* Static gradient background overlay under text */}
                      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />

                      {/* Bottom sliding description wrapper */}
                      <div className="absolute bottom-6 left-6 right-6 overflow-hidden h-[95px] z-10">
                        <div className="translate-y-[55px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                          <p className="text-[14px] text-gray-300 font-sans leading-relaxed font-light">
                            Promoting sustained economic growth by creating high-paying local jobs across clean energy construction, operation, maintenance, and supply chains.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 09 Industry & Infrastructure */}
                    <div className="relative rounded-[6px] overflow-hidden flex flex-col justify-between h-[320px] sm:h-[350px] group border border-[#FD6925]/15 hover:border-[#FD6925]/30 transition-all duration-300 cursor-default text-left">
                      <img 
                        src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600&auto=format&fit=crop"
                        alt="Industry & Infrastructure background"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#051F1A]/92 group-hover:bg-[#051F1A]/85 transition-colors duration-300" />
                      
                      {/* Top bar & Fixed Header */}
                      <div className="relative z-10 p-6 pt-10 sm:pt-12 flex flex-col justify-start h-full">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-light font-mono text-white/30 leading-none">09</span>
                          <ArrowUpRight size={14} className="text-white/60 group-hover:text-[#FD6925] transition-colors" />
                        </div>
                        <h4 className="font-bold text-sm text-white font-sans mb-1.5">Industry &amp; Infrastructure</h4>
                        <div>
                          <span className="inline-block text-[8px] font-bold text-white font-mono bg-[#FD6925] px-2 py-0.5 rounded-full">SDG 9</span>
                        </div>
                      </div>

                      {/* Static gradient background overlay under text */}
                      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />

                      {/* Bottom sliding description wrapper */}
                      <div className="absolute bottom-6 left-6 right-6 overflow-hidden h-[95px] z-10">
                        <div className="translate-y-[55px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                          <p className="text-[14px] text-gray-300 font-sans leading-relaxed font-light">
                            Building resilient clean energy utilities, agro-processing hubs, and green industrial parks powered by sustainable, localized off-grid networks.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 13 Climate Action */}
                    <div className="relative rounded-[6px] overflow-hidden flex flex-col justify-between h-[320px] sm:h-[350px] group border border-[#3F7E44]/15 hover:border-[#3F7E44]/30 transition-all duration-300 cursor-default text-left">
                      <img 
                        src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop"
                        alt="Climate action background"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#051F1A]/92 group-hover:bg-[#051F1A]/85 transition-colors duration-300" />
                      
                      {/* Top bar & Fixed Header */}
                      <div className="relative z-10 p-6 pt-10 sm:pt-12 flex flex-col justify-start h-full">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-light font-mono text-white/30 leading-none">13</span>
                          <ArrowUpRight size={14} className="text-white/60 group-hover:text-[#3F7E44] transition-colors" />
                        </div>
                        <h4 className="font-bold text-sm text-white font-sans mb-1.5">Climate Action</h4>
                        <div>
                          <span className="inline-block text-[8px] font-bold text-white font-mono bg-[#3F7E44] px-2 py-0.5 rounded-full">SDG 13</span>
                        </div>
                      </div>

                      {/* Static gradient background overlay under text */}
                      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-[#051F1A] via-[#051F1A]/95 to-transparent pointer-events-none z-0" />

                      {/* Bottom sliding description wrapper */}
                      <div className="absolute bottom-6 left-6 right-6 overflow-hidden h-[95px] z-10">
                        <div className="translate-y-[55px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                          <p className="text-[14px] text-gray-300 font-sans leading-relaxed font-light">
                            Confronting climate change head-on by accelerating private capital into climate-smart technologies to accelerate Nigeria's energy transition.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {activeImpactTab === 'assets' && (
                <div className="overflow-x-auto bg-white/[0.01] border border-white/10 rounded-[10px] shadow-xl">
                  <table className="w-full border-collapse text-left text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider bg-white/[0.02]">
                        <th className="py-4 px-6">Asset Name</th>
                        <th className="py-4 px-6">Location</th>
                        <th className="py-4 px-6">Asset Class</th>
                        <th className="py-4 px-6">Capacity</th>
                        <th className="py-4 px-6">Connections</th>
                        <th className="py-4 px-6">Jobs</th>
                        <th className="py-4 px-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6 font-bold text-white">{proj.title}</td>
                          <td className="py-4 px-6 text-gray-355">{proj.location}</td>
                          <td className="py-4 px-6 text-gray-355">{proj.category}</td>
                          <td className="py-4 px-6 text-gray-355 font-mono">{proj.capacity}</td>
                          <td className="py-4 px-6 text-gray-355 font-mono">{proj.connections}</td>
                          <td className="py-4 px-6 text-gray-355 font-mono">{proj.jobs}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono border ${
                              proj.status === 'Operational'
                                ? 'text-[#81C34D] bg-[#81C34D]/10 border-[#81C34D]/25'
                                : 'text-[#009FD4] bg-[#009FD4]/10 border-[#009FD4]/25'
                            }`}>
                              {proj.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── NEXT STEPS CTA BAR (3 Columns - NO SELF LINKING) ────── */}
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

          {/* About */}
          <Link
            href="/about"
            className="group flex items-center justify-between px-8 py-5 hover:bg-white/[0.07] transition-all duration-300 text-left cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-6">
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] font-mono shrink-0">
                About us
              </span>
              <div className="h-8 w-px bg-white/25" />
              <div>
                <h4 className="text-white text-base font-bold font-sans group-hover:text-white/80 transition-colors duration-300">
                  Who we are
                </h4>
                <p className="text-white/65 text-xs font-light mt-0.5 font-sans">
                  Learn about our seed capital and mandates
                </p>
              </div>
            </div>
            <ArrowRight size={16} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
          </Link>

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

        </div>
        </motion.div>
      </section>

      {/* ── VIDEO PLAYER MODAL OVERLAY ────── */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#051F1A] border border-white/10 rounded-[12px] shadow-2xl w-full max-w-4xl overflow-hidden relative z-10 flex flex-col text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white hover:text-brand-accent p-2 rounded-full border border-white/5 transition-colors cursor-pointer z-50 focus:outline-none"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>

              {/* Responsive Video Container */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  src={selectedVideo.url}
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title Strip */}
              <div className="p-5 border-t border-white/5 bg-[#02100d] text-white">
                <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block mb-1">Now Playing</span>
                <h4 className="text-sm font-bold font-sans line-clamp-1">{selectedVideo.title}</h4>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ImpactPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#FAFDFB] text-brand-dark min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        Loading impact...
      </div>
    }>
      <ImpactPageContent />
    </Suspense>
  );
}
