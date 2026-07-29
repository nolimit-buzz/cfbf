"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Leaf, Users, MapPin, Landmark, Wifi, Check } from 'lucide-react';

// Data types
interface MetricData {
  connections: string;
  connectionsLabel?: string;
  capacity: string;
  communities: string;
  communitiesLabel?: string;
  jobs: string;
  ghg: string;
  capital: string;
  capitalSub: string;
}

interface StageInfo {
  id: string;
  label: string;
  title: string;
  usdVal: string;
  ngnVal: string;
  desc: string;
  sdgs: number[];
  metrics?: MetricData;
}

interface TableRow {
  sector: string;
  projectsCount: number;
  valueNgn: number;
  percentage: string;
}

// SDG icon drawings
const SdgIcon7 = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-white fill-current">
    <circle cx="50" cy="50" r="16" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <line
        key={deg}
        x1="50"
        y1="18"
        x2="50"
        y2="30"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        transform={`rotate(${deg} 50 50)`}
      />
    ))}
  </svg>
);

const SdgIcon8 = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-white fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 80 L40 60 L60 70 L80 35" />
    <path d="M65 35 H80 V50" strokeWidth="6" />
    <line x1="20" y1="85" x2="80" y2="85" strokeWidth="4" />
  </svg>
);

const SdgIcon9 = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-white fill-none stroke-current" strokeWidth="6" strokeLinecap="round">
    <circle cx="35" cy="65" r="12" />
    <circle cx="65" cy="65" r="12" />
    <circle cx="50" cy="35" r="12" />
    <line x1="35" y1="53" x2="45" y2="45" />
    <line x1="65" y1="53" x2="55" y2="45" />
    <line x1="35" y1="65" x2="65" y2="65" />
  </svg>
);

const SdgIcon11 = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-white fill-none stroke-current" strokeWidth="5" strokeLinecap="round">
    <rect x="20" y="55" width="16" height="30" />
    <rect x="42" y="30" width="18" height="55" />
    <rect x="66" y="45" width="16" height="40" />
    <line x1="28" y1="65" x2="28" y2="66" strokeWidth="4" />
    <line x1="28" y1="75" x2="28" y2="76" strokeWidth="4" />
    <line x1="51" y1="42" x2="51" y2="43" strokeWidth="4" />
    <line x1="51" y1="54" x2="51" y2="55" strokeWidth="4" />
    <line x1="51" y1="66" x2="51" y2="67" strokeWidth="4" />
    <line x1="74" y1="56" x2="74" y2="57" strokeWidth="4" />
    <line x1="74" y1="68" x2="74" y2="69" strokeWidth="4" />
  </svg>
);

const SdgIcon13 = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-white fill-none stroke-current" strokeWidth="5">
    <circle cx="50" cy="50" r="30" />
    <path d="M35 50 Q50 35 65 50" />
    <path d="M35 50 Q50 65 65 50" />
    <path d="M50 20 C62 35 50 65 50 80" strokeWidth="3" />
  </svg>
);

const SdgIcon17 = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-white fill-none stroke-current" strokeWidth="5">
    <circle cx="50" cy="50" r="28" strokeDasharray="6,4" />
    <circle cx="34" cy="50" r="10" />
    <circle cx="66" cy="50" r="10" />
    <circle cx="50" cy="34" r="10" />
    <circle cx="50" cy="66" r="10" />
  </svg>
);

const SDG_METADATA = {
  7: { title: "Affordable & Clean Energy", color: "bg-[#FDB713]", borderClass: "border-[#FDB713]/15 hover:border-[#FDB713]/35", bgImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=400&auto=format&fit=crop", colorHex: "#FDB713" },
  8: { title: "Decent Work & Growth", color: "bg-[#8F1838]", borderClass: "border-[#8F1838]/15 hover:border-[#8F1838]/35", bgImage: "https://images.unsplash.com/photo-1521791136368-1a8682707636?q=80&w=400&auto=format&fit=crop", colorHex: "#8F1838" },
  9: { title: "Industry & Infrastructure", color: "bg-[#F36D25]", borderClass: "border-[#F36D25]/15 hover:border-[#F36D25]/35", bgImage: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=400&auto=format&fit=crop", colorHex: "#F36D25" },
  11: { title: "Sustainable Cities", color: "bg-[#FD9D24]", borderClass: "border-[#FD9D24]/15 hover:border-[#FD9D24]/35", bgImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop", colorHex: "#FD9D24" },
  13: { title: "Climate Action", color: "bg-[#3F7E44]", borderClass: "border-[#3F7E44]/15 hover:border-[#3F7E44]/35", bgImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=400&auto=format&fit=crop", colorHex: "#3F7E44" },
  17: { title: "Partnerships for Goals", color: "bg-[#19486A]", borderClass: "border-[#19486A]/15 hover:border-[#19486A]/35", bgImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop", colorHex: "#19486A" }
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const PIPELINE_STAGES: StageInfo[] = [
  {
    id: "business-models",
    label: "Business Models",
    title: "BUSINESS MODELS",
    usdVal: "687.3",
    ngnVal: "948.20B NGN EQUIV",
    desc: "Blended finance pipeline sector distribution categorized by clean energy off-grid developer business models de-risked and mandated by the Facility.",
    sdgs: [7, 8, 9, 11, 13, 17]
  },
  {
    id: "project-pipeline",
    label: "Project Pipeline",
    title: "PROJECT PIPELINE",
    usdVal: "687.3",
    ngnVal: "948.20B NGN EQUIV",
    desc: "The 72 Projects Pipeline reports on expected energy access connections, clean generating capacity, employment opportunities, and carbon mitigation aligned to UN Sustainable Development Goals (SDGs).",
    sdgs: [7, 8, 9, 11, 13, 17],
    metrics: {
      connections: "731,083",
      capacity: "166.09 MWp",
      communities: "5,287",
      jobs: "162,600.5",
      ghg: "314,681.09",
      capital: "₦46.46B",
      capitalSub: "USD 33.7 Mln"
    }
  },
  {
    id: "credit-approved",
    label: "Credit Approved Pipeline",
    title: "CREDIT APPROVED PIPELINE",
    usdVal: "38.8",
    ngnVal: "53.55B NGN EQUIV",
    desc: "The 14 Credit Approved Pipeline Projects have passed final facility guarantees and credit criteria, gearing up for commercial close and local capital drawdown.",
    sdgs: [7, 8, 9, 11, 13, 17],
    metrics: {
      connections: "79,786",
      capacity: "22.50 MW",
      communities: "62",
      jobs: "20,035",
      ghg: "81,366.00",
      capital: "₦9.6B",
      capitalSub: "USD 7.0 Mln"
    }
  },
  {
    id: "closed",
    label: "Closed Projects",
    title: "CLOSED PROJECTS",
    usdVal: "17.7",
    ngnVal: "24.36B NGN EQUIV",
    desc: "The 4 Closed Projects have successfully achieved financial close, fully drawn local pension-backed funds, and are active in construction or operations.",
    sdgs: [7, 8, 9, 11, 13, 17],
    metrics: {
      connections: "51,131",
      capacity: "7.49 MWp",
      communities: "169",
      jobs: "18,699",
      ghg: "12,510.90",
      capital: "₦11.4B",
      capitalSub: "USD 8.3 Mln"
    }
  },
  {
    id: "urban-pipeline",
    label: "Urban Pipeline Projects",
    title: "URBAN PIPELINE PROJECTS",
    usdVal: "54.6",
    ngnVal: "84.40B NGN EQUIV",
    desc: "The 7 Urban Pipeline Projects address energy reliability in municipalities, focusing on commercial utility scaling and private capital integration.",
    sdgs: [7, 8, 9, 11, 13, 17],
    metrics: {
      connections: "3,350",
      capacity: "27.68 MW",
      communities: "0",
      communitiesLabel: "Communities Impacted",
      jobs: "1,820",
      ghg: "251.89",
      capital: "₦0.0B",
      capitalSub: "USD 0.0 Mln"
    }
  },
  {
    id: "urban-credit-approved",
    label: "Urban Credit Approved Pipeline",
    title: "URBAN CREDIT APPROVED",
    usdVal: "5.95",
    ngnVal: "3.80B NGN EQUIV",
    desc: "The 2 Urban Credit Approved Projects focus on commercial microgrid integrations within dense population hubs and local government area clusters.",
    sdgs: [7, 8, 9, 11, 13, 17],
    metrics: {
      connections: "1,213",
      connectionsLabel: "Households & Businesses",
      capacity: "9.90 MW",
      communities: "12",
      communitiesLabel: "Local Gov Areas",
      jobs: "1,115",
      ghg: "90.09",
      capital: "₦0.0B",
      capitalSub: "USD 0.0 Mln"
    }
  }
];

const SECTOR_TOTAL_PIPELINE: TableRow[] = [
  { sector: "Isolated Mini-Grid", projectsCount: 37, valueNgn: 381.16, percentage: "40.20%" },
  { sector: "Interconnected Mini-Grid", projectsCount: 5, valueNgn: 32.77, percentage: "3.46%" },
  { sector: "Mesh Grid", projectsCount: 3, valueNgn: 59.27, percentage: "6.25%" },
  { sector: "Commercial & Industrial (C & I)", projectsCount: 13, valueNgn: 298.85, percentage: "31.52%" },
  { sector: "SaaS for Home and Business", projectsCount: 2, valueNgn: 28.60, percentage: "3.02%" },
  { sector: "Productive Use EaaS", projectsCount: 1, valueNgn: 1.36, percentage: "0.14%" },
  { sector: "Battery as a Service", projectsCount: 0, valueNgn: 0.00, percentage: "0.00%" },
  { sector: "Stand Alone Systems (SAS)", projectsCount: 0, valueNgn: 0.00, percentage: "0.00%" },
  { sector: "SaaS for Telecom Towers", projectsCount: 4, valueNgn: 85.04, percentage: "8.97%" },
  { sector: "E-mobility (2W & 3W)", projectsCount: 6, valueNgn: 61.15, percentage: "6.45%" }
];

const SECTOR_MANDATED_DEALS: TableRow[] = [
  { sector: "Isolated Mini-Grid", projectsCount: 37, valueNgn: 91.39, percentage: "31.06%" },
  { sector: "Interconnected Mini-Grid", projectsCount: 5, valueNgn: 28.21, percentage: "9.59%" },
  { sector: "Mesh Grid", projectsCount: 3, valueNgn: 16.27, percentage: "5.53%" },
  { sector: "Commercial & Industrial (C & I)", projectsCount: 13, valueNgn: 107.95, percentage: "36.68%" },
  { sector: "SaaS for Home and Business", projectsCount: 2, valueNgn: 1.00, percentage: "0.34%" },
  { sector: "Productive Use EaaS", projectsCount: 1, valueNgn: 1.36, percentage: "0.46%" },
  { sector: "Battery as a Service", projectsCount: 0, valueNgn: 0.00, percentage: "0.00%" },
  { sector: "Stand Alone Systems (SAS)", projectsCount: 0, valueNgn: 0.00, percentage: "0.00%" },
  { sector: "E-mobility (2W & 3W)", projectsCount: 6, valueNgn: 13.06, percentage: "4.44%" }
];

interface PipelineConsoleProps {
  stages?: StageInfo[];
  totalSectorPipeline?: TableRow[];
  mandatedDeals?: TableRow[];
}

export default function PipelineConsole({
  stages = PIPELINE_STAGES,
  totalSectorPipeline = SECTOR_TOTAL_PIPELINE,
  mandatedDeals = SECTOR_MANDATED_DEALS
}: PipelineConsoleProps) {
  const [activeStageId, setActiveStageId] = useState<string>("project-pipeline");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [businessModelView, setBusinessModelView] = useState<'total-pipeline' | 'mandated-deals'>('total-pipeline');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeStage = stages.find((s) => s.id === activeStageId) || stages[1];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update left values if business models changes total vs mandated
  const getStageValues = () => {
    if (activeStage.id === 'business-models') {
      if (businessModelView === 'total-pipeline') {
        return { usd: "687.3", ngn: "948.20B NGN EQUIV" };
      } else {
        return { usd: "213.2", ngn: "294.28B NGN EQUIV" };
      }
    }
    return { usd: activeStage.usdVal, ngn: activeStage.ngnVal };
  };

  const currentValues = getStageValues();

  // Metrics configurations with matching Icons and Labels
  const metricCards = (metrics: MetricData) => [
    {
      label: metrics.connectionsLabel || "Projected Connections",
      value: metrics.connections,
      icon: <Wifi className="w-5 h-5" />,
      glow: "rgba(129,195,77,0.15)",
      iconColor: "#81C34D"
    },
    {
      label: "Projected Capacity",
      value: metrics.capacity,
      icon: <Zap className="w-5 h-5" />,
      glow: "rgba(253,183,19,0.15)",
      iconColor: "#FDB713"
    },
    {
      label: metrics.communitiesLabel || "Communities",
      value: metrics.communities,
      icon: <MapPin className="w-5 h-5" />,
      glow: "rgba(0,159,212,0.15)",
      iconColor: "#009FD4"
    },
    {
      label: "Jobs to be Created",
      value: metrics.jobs,
      icon: <Users className="w-5 h-5" />,
      glow: "rgba(255,74,107,0.15)",
      iconColor: "#FF4A6B"
    },
    {
      label: "GHG Emissions Reduced",
      value: metrics.ghg,
      unit: "tCO₂e/yr",
      icon: <Leaf className="w-5 h-5" />,
      glow: "rgba(86,195,106,0.15)",
      iconColor: "#56C36A"
    },
    {
      label: "Private Capital Mobilised",
      value: metrics.capital,
      unit: metrics.capitalSub,
      icon: <Landmark className="w-5 h-5" />,
      glow: "rgba(243,109,37,0.15)",
      iconColor: "#F36D25"
    }
  ];

  return (
    <section className="relative z-10 w-full mt-24 pt-20" id="facility-pipeline">
      {/* Title & description wrapper to align with the standard page layout */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-brand-accent"></div>
          <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-mono">Consolidated Dealflow</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight tracking-tight mb-4 text-left">
          Facility Pipeline <span className="text-[#9BB7B1]">Status</span>
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl font-light font-sans text-left">
          Browse live consolidated aggregates of our clean energy pipelines, mandated capital transactions, and forecasted developmental impact numbers de-risked by our concessional guarantee structures.
        </p>
      </div>

      {/* Main Console Box - Full Width Section Wrapper */}
      <div className="w-full relative border-y border-white/10 bg-[#02100d] overflow-hidden">
        
        {/* Split container for content alignment */}
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 relative text-left">
            
            {/* Left Column (Dropdown, Title, SDG Grid) */}
            <div className="lg:col-span-5 py-8 md:py-10 pl-0 pr-0 lg:pr-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 text-left relative z-20">
              
              {/* Background Layer with light-blue logo overlay, bleeding to the left screen edge on desktop */}
              <div className="absolute inset-y-0 left-0 w-full lg:left-auto lg:right-0 lg:w-[100vw] z-0 pointer-events-none select-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-[#009FD4]/80" />
              </div>

              {/* Content wrapper */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                {/* Top Row: Dropdown selector (Height matched with top right row) */}
                <div className="h-[84px] flex flex-col justify-end relative" ref={dropdownRef}>
                  <span className="text-[9px] font-bold tracking-[0.25em] text-[#81C34D] uppercase font-mono block mb-2">
                    Select Pipeline Stage
                  </span>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between bg-[#051F1A]/90 hover:bg-[#051F1A]/80 border border-white/10 text-white rounded-[6px] px-4 py-3 text-sm font-semibold tracking-wide transition-all focus:outline-none interactive select-none"
                  >
                    <span>{activeStage.label}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-[#051F1A] border border-white/15 rounded-[6px] overflow-hidden shadow-2xl z-50 divide-y divide-white/5"
                      >
                        {stages.map((stage) => (
                          <button
                            key={stage.id}
                            onClick={() => {
                              setActiveStageId(stage.id);
                              setDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-xs md:text-sm text-gray-300 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-between"
                          >
                            <span className={activeStageId === stage.id ? 'text-[#81C34D] font-semibold' : ''}>
                              {stage.label}
                            </span>
                            {activeStageId === stage.id && <Check className="w-4 h-4 text-[#81C34D]" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Middle Row: Stage Title & stats (Height matched with top right expected metrics title) */}
                <div className="mt-8 mb-8 flex-grow">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase font-mono block mb-1">
                    {activeStage.title}
                  </span>
                  
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl md:text-5xl font-light text-white tracking-tight leading-none font-sans font-bold">
                      {currentValues.usd}
                    </span>
                    <span className="text-xl text-white font-light ml-1">m USD</span>
                  </div>
                  <div className="text-[#81C34D] text-xs font-mono font-bold tracking-wider mt-2.5 uppercase">
                    {currentValues.ngn}
                  </div>

                  <p className="text-gray-300 text-xs md:text-sm font-sans font-light mt-5 leading-relaxed">
                    {activeStage.desc}
                  </p>
                </div>

                {/* Bottom Row: SDG Aligned Grid (Enlarged SDG boxes & font sizes) */}
                <div className="border-t border-white/10 pt-6">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#81C34D] uppercase font-mono block mb-4">
                    Aligned UN SDG Frameworks
                  </span>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {activeStage.sdgs.map((sdgNum) => {
                      const sdg = SDG_METADATA[sdgNum as keyof typeof SDG_METADATA];
                      if (!sdg) return null;
                      return (
                        <motion.div
                          key={sdgNum}
                          variants={cardVariants}
                          className={`relative rounded-[6px] overflow-hidden p-4 flex flex-col justify-between text-left min-h-[135px] group border transition-all duration-300 ${sdg.borderClass}`}
                          title={`SDG ${sdgNum}: ${sdg.title}`}
                        >
                          <img 
                            src={sdg.bgImage}
                            alt={sdg.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none select-none"
                          />
                          <div className="absolute inset-0 bg-[#02100d]/92 group-hover:bg-[#02100d]/85 transition-colors duration-300 pointer-events-none" />
                          
                          <div className="relative z-10 flex justify-between items-start">
                            <span className="text-base font-light font-mono text-white/30 leading-none">
                              {sdgNum < 10 ? `0${sdgNum}` : sdgNum}
                            </span>
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: sdg.colorHex }} />
                          </div>

                          <div className="relative z-10 mt-auto">
                            <span className={`inline-block text-[10px] font-bold text-white font-mono ${sdg.color} px-2 py-0.5 rounded-full mb-2 leading-none`}>
                              SDG {sdgNum}
                            </span>
                            <h4 className="font-bold text-xs md:text-sm text-white font-sans leading-tight line-clamp-2">{sdg.title}</h4>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Column (Metrics Grid or Data Table) */}
            <div className="lg:col-span-7 py-8 md:py-10 pl-0 lg:pl-10 pr-0 flex flex-col justify-between text-left relative z-20">
              
              {/* Background Layer with deep blue hero overlay, bleeding to the right screen edge on desktop */}
              <div className="absolute inset-y-0 left-0 w-full lg:w-[100vw] z-0 pointer-events-none select-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#00314b]/75" />
              </div>

              {/* Content wrapper */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                {/* Top Row: Spacing or Business Model toggle selector (Height matched with top left dropdown) */}
                <div className="h-[84px] flex flex-col justify-end items-end">
                  {activeStage.id === 'business-models' && (
                    <div className="flex rounded-full p-0.5 bg-white/5 border border-white/10 shrink-0 mb-[5px]">
                      <button
                        onClick={() => setBusinessModelView('total-pipeline')}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          businessModelView === 'total-pipeline'
                            ? 'bg-[#81C34D] text-[#02100d]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Total Pipeline
                      </button>
                      <button
                        onClick={() => setBusinessModelView('mandated-deals')}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          businessModelView === 'mandated-deals'
                            ? 'bg-[#81C34D] text-[#02100d]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Mandated Deals
                      </button>
                    </div>
                  )}
                </div>

                {/* Middle Row: Content header aligned horizontally with left stage titles */}
                <div className="mt-8 mb-8 flex-grow">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-[#81C34D] block m-0 mt-0">
                    {activeStage.metrics ? "/ EXPECTED IMPACT METRICS" : "/ BUSINESS MODELS DISTRIBUTION"}
                  </h3>
                  <p className="text-gray-300 text-base font-sans font-light mt-4 leading-relaxed max-w-xl">
                    {activeStage.metrics 
                      ? "Forecasted socio-economic and environmental outputs expected from the active pipeline deals de-risked by our concessional guarantee structures."
                      : "Distribution of blended finance transactions categorized by developer business models mandated by the facility."
                    }
                  </p>
                </div>

                {/* Bottom Row: Metrics Grid or Data Table (with top border to align with Left Column SDG bottom row) */}
                <div className="border-t border-white/10 pt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.id + (activeStage.id === 'business-models' ? businessModelView : '')}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {activeStage.metrics ? (
                        /* EXPECTED IMPACT METRICS GRID */
                        <motion.div 
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, margin: "-40px" }}
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                          {metricCards(activeStage.metrics).map((card, i) => {
                            const cleanValue = card.value;
                            const displaysUnit = card.unit || "";
                            
                            const cardDesc = card.label.toLowerCase().includes("connections") || card.label.toLowerCase().includes("households") ? "projected household and SME connections powered." :
                              card.label.toLowerCase().includes("capacity") ? "installed clean generating capacity co-financed." :
                              card.label.toLowerCase().includes("communities") || card.label.toLowerCase().includes("local gov") ? "underserved administrative areas connected." :
                              card.label.toLowerCase().includes("jobs") ? "sustainable employment opportunities facilitated." :
                              card.label.toLowerCase().includes("emissions") || card.label.toLowerCase().includes("ghg") ? "tonnes of annual carbon emissions mitigated." :
                              card.label.toLowerCase().includes("capital") ? "local private currency co-investment mobilized." :
                              "tracked developmental pipeline metrics.";

                            return (
                              <motion.div
                                key={i}
                                variants={cardVariants}
                                whileHover={{ y: -4, scale: 1.01 }}
                                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 backdrop-blur-md rounded-[6px] p-5.5 min-h-[240px] flex flex-col justify-between transition-all duration-300 group cursor-default relative shadow-lg will-change-transform"
                              >
                                <div className="flex justify-between items-start gap-4">
                                  <span className="text-gray-300 text-[11px] font-bold uppercase tracking-[0.2em] font-mono block min-h-[2.2rem] line-clamp-2">
                                    {card.label}
                                  </span>
                                  <div style={{ color: card.iconColor }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 [&>svg]:w-4 [&>svg]:h-4">
                                    {card.icon}
                                  </div>
                                </div>

                                <div className="my-3 flex items-baseline flex-wrap">
                                  <span className="text-3xl md:text-4xl font-light text-white font-sans tracking-tight">
                                    {cleanValue}
                                  </span>
                                  {displaysUnit && (
                                    <span className="text-xs text-gray-400 ml-1.5 font-light font-sans">{displaysUnit}</span>
                                  )}
                                </div>

                                <p className="text-gray-300 text-xs leading-relaxed font-sans font-light mt-auto">
                                  {cardDesc}
                                </p>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      ) : (
                        /* BUSINESS MODELS DATA TABLE VIEW */
                        <div className="w-full">
                          {/* Sector Table */}
                          <div className="overflow-hidden border border-white/10 rounded-[8px] bg-[#02100d]/90">
                            <div className="max-h-[460px] overflow-y-auto overflow-x-auto no-scrollbar">
                              <table className="w-full text-left border-collapse text-xs md:text-sm">
                                <thead>
                                  <tr className="border-b border-white/10 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                                    <th className="py-4 px-6 sticky top-0 bg-[#02100d] z-30">DRE Business Model</th>
                                    <th className="py-4 px-6 text-center sticky top-0 bg-[#02100d] z-30">Projects</th>
                                    <th className="py-4 px-6 text-right sticky top-0 bg-[#02100d] z-30">
                                      {businessModelView === 'total-pipeline' ? 'Pipeline (NGN\'B)' : 'Mandated (NGN\'B)'}
                                    </th>
                                    <th className="py-4 px-6 text-right sticky top-0 bg-[#02100d] z-30">Deal Size (%)</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-300 font-sans">
                                  {(businessModelView === 'total-pipeline' ? totalSectorPipeline : mandatedDeals).map((row, index) => (
                                    <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                                      <td className="py-3.5 px-6 font-medium text-white">{row.sector}</td>
                                      <td className="py-3.5 px-6 text-center font-mono">{row.projectsCount}</td>
                                      <td className="py-3.5 px-6 text-right font-mono text-[#81C34D] font-semibold">{row.valueNgn.toFixed(2)}</td>
                                      <td className="py-3.5 px-6 text-right font-mono text-gray-400">{row.percentage}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="border-t border-white/10 bg-[#02100d] text-[10px] font-mono font-bold text-white uppercase tracking-wider sticky bottom-0 z-20">
                                  <tr>
                                    <td className="py-3 px-5">Total Portfolio</td>
                                    <td className="py-3 px-5 text-center">71</td>
                                    <td className="py-3 px-5 text-right text-[#81C34D]">
                                      {businessModelView === 'total-pipeline' ? "948.20" : "294.28"}
                                    </td>
                                    <td className="py-3 px-5 text-right">100%</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
