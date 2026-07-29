"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BarChart3, LayoutGrid, Download, Plus, Minus, MapPin, Zap, Leaf, Users, Wifi, ShieldCheck, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import FootprintMap from '@/components/projects/FootprintMap';
import PipelineConsole from '@/components/projects/PipelineConsole';

import GlassHero, { heroRowVariants, heroCardVariants } from '@/components/GlassHero';
import CountUp from '@/components/ui/CountUp';
import { ALL_STATES } from '@/lib/mapData';

interface ProjectData {
  id: string;
  title: string;
  location: string;
  year: string;
  capital: string;
  capacity: string;
  category: string;
  connections: string;
  jobs: string;
  ghg: string;
  status: 'Closed' | 'Under Construction' | 'Operational';
  image: string;
  desc: string;
  problem: string;
  solution: string;
  impact: string;
}

interface StateProjectInfo {
  projectName: string;
  capacity: string;
  funding: string;
  sdgs: number[];
  category: string;
  status: string;
}



// SDG Mapping & Color Themes
const SDG_INFO = {
  7: { name: 'Affordable & Clean Energy', color: '#FDB713', textClass: 'text-[#FDB713] border-[#FDB713]/25 bg-[#FDB713]/5' },
  8: { name: 'Decent Work & Growth', color: '#8F1838', textClass: 'text-[#FF4A6B] border-[#FF4A6B]/25 bg-[#FF4A6B]/5' },
  9: { name: 'Industry, Innovation & Infrastructure', color: '#F36D25', textClass: 'text-[#F36D25] border-[#F36D25]/25 bg-[#F36D25]/5' },
  13: { name: 'Climate Action', color: '#3F7E44', textClass: 'text-[#56C36A] border-[#56C36A]/25 bg-[#56C36A]/5' }
};

// Project to State Mappings
const STATE_PROJECTS: Record<string, StateProjectInfo[]> = {
  gombe: [
    { projectName: "First Electric", capacity: "240kW (Regional Share)", funding: "₦560m", sdgs: [7, 13], category: "Solar Grid", status: "Under Construction" }
  ],
  nasarawa: [
    { projectName: "First Electric", capacity: "240kW (Regional Share)", funding: "₦560m", sdgs: [7, 13], category: "Solar Grid", status: "Under Construction" }
  ],
  edo: [
    { projectName: "ACOB Lightning", capacity: "165kW (Regional Share)", funding: "₦370m", sdgs: [7, 8, 13], category: "Solar Grid", status: "Operational" }
  ],
  ondo: [
    { projectName: "First Electric", capacity: "245kW (Regional Share)", funding: "₦580m", sdgs: [7, 13], category: "Solar Grid", status: "Under Construction" },
    { projectName: "ACOB Lightning", capacity: "170kW (Regional Share)", funding: "₦385m", sdgs: [7, 8, 13], category: "Solar Grid", status: "Operational" }
  ],
  "cross-river": [
    { projectName: "CEESOLAR Energy", capacity: "760kW", funding: "₦1.70b", sdgs: [7, 13], category: "Solar Grid", status: "Under Construction" }
  ],
  "akwa-ibom": [
    { projectName: "Prado Power", capacity: "425kW (Regional Share)", funding: "₦975m", sdgs: [7, 8, 9], category: "Agro-Processing", status: "Under Construction" }
  ],
  benue: [
    { projectName: "Prado Power", capacity: "425kW (Regional Share)", funding: "₦975m", sdgs: [7, 8, 9], category: "Agro-Processing", status: "Under Construction" }
  ],
  rivers: [
    { projectName: "Darway Coast", capacity: "263kW (Regional Share)", funding: "₦400m", sdgs: [7, 13], category: "Solar Grid", status: "Operational" }
  ],
  abia: [
    { projectName: "Darway Coast", capacity: "263kW (Regional Share)", funding: "₦400m", sdgs: [7, 13], category: "Solar Grid", status: "Operational" }
  ],
  kaduna: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  kano: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  oyo: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  bauchi: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  katsina: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  jigawa: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  sokoto: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  zamfara: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  kebbi: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  kogi: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  kwara: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  taraba: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  adamawa: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  borno: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  yobe: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  plateau: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  niger: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  ekiti: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  osun: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  ogun: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  lagos: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }],
  fct: [{ projectName: "Hotspot Network", capacity: "15kW (Site Average)", funding: "₦43.4m (Site Share)", sdgs: [9, 13], category: "Telecoms", status: "Operational" }]
};

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
    label.toLowerCase().includes("jobs") ? "sustainable employment opportunities facilitated." :
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
        <div style={{ color: iconColor }} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 [&>svg]:w-5 [&>svg]:h-5">
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

      <p className="text-gray-300 text-[10px] leading-relaxed font-sans font-light mt-auto">
        {cardDesc}
      </p>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'analysis' | 'pipeline' | 'footprint'>('pipeline');
  const [filter, setFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState<string | null>("01");
  // selectedState is used by the pipeline tab filter (state-based project highlighting)
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const projectsSectionRef = useRef<HTMLDivElement>(null);

  const projects: ProjectData[] = [
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
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      desc: "Mesh grid networks connecting rural households and SMEs across three states.",
      problem: "Lack of grid access in agricultural communities leading to low economic productivity.",
      solution: "Construction of 725kWp total capacity mesh grid electricity networks in 20 communities.",
      impact: "Connecting 5,156 households and creating over 616 local construction and operational jobs."
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
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      desc: "Green Finance for Off-Grid Rural Electrification in four communities.",
      problem: "Lack of grid infrastructure in remote areas of Cross River, relying heavily on wood fuel and generators.",
      solution: "Installation of 760kWp solar-hybrid mini-grids with high-capacity storage.",
      impact: "Powering households, small retailers, and agricultural processors; reducing GHG by 737 tonnes per year."
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
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
      desc: "Solar hybrid mini-grids powering agricultural value chain hubs.",
      problem: "Post-harvest agricultural losses and lack of cold storage for rural farming cooperatives.",
      solution: "850kWp total capacity solar hybrid grids connecting farms, processing plants, and residential clusters.",
      impact: "De-risking local food supply chains, connecting 15,801 households, and creating 740 productive jobs."
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
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      desc: "Green Finance for Sustainable Rural Telephony networks.",
      problem: "Off-grid telecommunication towers in rural communities rely on diesel generators, releasing heavy CO2.",
      solution: "Solarization of 120 base stations across 22 states using highly efficient panels.",
      impact: "Providing continuous rural connectivity, saving carbon emissions, and creating 720 telecom support jobs."
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
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      desc: "Isolated solar mini-grids for underserved southern communities.",
      problem: "Lack of clean, reliable energy for coastal fish drying and local enterprise in southern Riverine zones.",
      solution: "526kWp solar grids using prepaid smart meters and remote monitoring systems.",
      impact: "Powering 7,711 connections, replacing diesel gensets, and boosting local riverine commerce."
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
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop",
      desc: "Off-grid rural electrification for agricultural hubs.",
      problem: "Energy poverty in rural cocoa-farming communities with zero electricity access.",
      solution: "335kWp solar-hybrid installations with local commercial distribution networks.",
      impact: "De-risked electricity access for 3,597 cocoa farmers, saving 352 tonnes of carbon annually."
    }
  ];

  const handleStateSelect = (stateId: string | null) => {
    setSelectedState(stateId);
    if (stateId) {
      setActiveTab('pipeline');
      
      const stateProjs = STATE_PROJECTS[stateId];
      if (stateProjs && stateProjs.length > 0) {
        const firstProjName = stateProjs[0].projectName;
        const matchingProj = projects.find(p => 
          p.title.toLowerCase().includes(firstProjName.toLowerCase())
        );
        if (matchingProj) {
          setExpandedProject(matchingProj.id);
        }
      }
      
      setTimeout(() => {
        projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleStateClick = (stateId: string) => {
    if (selectedState === stateId) {
      setSelectedState(null);
    } else {
      handleStateSelect(stateId);
    }
  };

  const getProjectSDGs = (projectId: string): number[] => {
    switch (projectId) {
      case '01': return [7, 13];
      case '02': return [7, 13];
      case '03': return [7, 8, 9];
      case '04': return [9, 13];
      case '05': return [7, 13];
      case '06': return [7, 8, 13];
      default: return [7];
    }
  };

  const categories = ['All', 'Solar Grid', 'Telecoms', 'Agro-Processing'];

  // Calculations for totals row
  const totalCapacity = projects.reduce((sum, p) => {
    const num = parseFloat(p.capacity.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const totalCapital = projects.reduce((sum, p) => {
    const isMillion = p.capital.toLowerCase().includes('m');
    const num = parseFloat(p.capital.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return sum;
    return sum + (isMillion ? num / 1000 : num);
  }, 0);

  const totalJobs = projects.reduce((sum, p) => {
    const num = parseInt(p.jobs.replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const totalGHG = projects.reduce((sum, p) => {
    const num = parseFloat(p.ghg.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const isProjectInSelectedState = (project: ProjectData) => {
    if (!selectedState) return true;
    const stateProjs = STATE_PROJECTS[selectedState];
    if (!stateProjs || stateProjs.length === 0) return false;
    return stateProjs.some(sp => 
      project.title.toLowerCase().includes(sp.projectName.toLowerCase())
    );
  };

  const filteredProjects = projects.filter(p => {
    const matchesCategory = filter === 'All' ? true : p.category === filter;
    const matchesState = selectedState ? isProjectInSelectedState(p) : true;
    return matchesCategory && matchesState;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Projects Portfolio | Climate Finance Blending Facility",
    "description": "Directory of active clean energy infrastructure projects de-risked and co-financed by the Climate Finance Blending Facility in Nigeria.",
    "url": "https://climatesupportfacility.org/projects",
    "about": {
      "@type": "Organization",
      "name": "Climate Finance Blending Facility (CFBF)"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Project",
          "name": p.title,
          "description": p.desc,
          "location": p.location,
          "category": p.category,
          "status": p.status
        }
      }))
    }
  };

  return (
    <div className="bg-[#051F1A] text-white min-h-screen relative overflow-hidden pb-0 font-sans">
      <title>Projects & portfolio footprint | CFBF</title>
      <meta name="description" content="Browse our catalog of local currency de-risked clean energy projects in Nigeria." />

      {/* Dublin Core Hoisting */}
      <meta name="DC.title" content="Projects portfolio - climate finance blending facility" />
      <meta name="DC.creator" content="NoLimitBuzz" />
      <meta name="DC.subject" content="Solar Grid, Telecoms Solarization, Agro-Processing, Green Bonds" />
      <meta name="DC.description" content="Directory of active clean energy infrastructure projects in Nigeria." />
      <meta name="DC.publisher" content="Climate Finance Blending Facility" />
      <meta name="DC.language" content="en" />
      <meta name="DC.coverage.spatial" content="Nigeria" />
      <meta name="DC.type" content="Collection of Case Studies" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative radial glows */}
      <div className="absolute top-[80vh] right-0 w-1/3 h-1/3 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Showcase Section (about-v2 standard) */}
      <GlassHero
        title={<>Portfolio <span className="text-[#9BB7B1]">performance</span></>}
        subtitle="Proven results"
        currentPage="projects"
        fade="dark"
        bgImage="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop"
        description={
          <p>
            The Climate Finance Blending Facility (CFBF) deploys strategic first-loss co-financing to de-risk
            private commercial capital, mobilizing local funding to power clean energy and create sustainable jobs.
          </p>
        }
      >
        {/* Portfolio impact metrics — staggered entrance */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
          variants={heroRowVariants}
          initial="hidden"
          animate="show"
        >
            
            {/* Card 1: Capacity Installed */}
            <motion.div 
              variants={heroCardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[6px] p-6 min-h-[220px] md:min-h-[240px] flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.06] group cursor-default relative md:col-span-2 shadow-lg will-change-transform"
            >
              <div className="flex justify-between items-start">
                <span className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] font-mono block">
                  Capacity installed
                </span>
                <ArrowUpRight size={16} className="text-[#81C34D] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="my-4 flex items-baseline">
                <span className="text-4xl md:text-5xl lg:text-6xl font-light text-white font-sans tracking-tight"><CountUp value="4.02" /></span>
                <span className="text-xl md:text-2xl text-gray-400 ml-1 font-light font-sans">MW</span>
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans font-light">
                installed green capacity de-risked by first-loss co-financing.
              </p>

              <div className="mt-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#FDB713]/30 bg-[#FDB713]/10 text-[#FDB713] text-[9px] font-bold uppercase tracking-wider self-start font-sans">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FDB713]" />
                SDG 7
              </div>
            </motion.div>

            {/* Card 2: Emissions Avoided */}
            <motion.div 
              variants={heroCardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[6px] p-6 min-h-[220px] md:min-h-[240px] flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.06] group cursor-default relative md:col-span-2 shadow-lg will-change-transform"
            >
              <div className="flex justify-between items-start">
                <span className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] font-mono block">
                  Emissions avoided
                </span>
                <ArrowUpRight size={16} className="text-[#81C34D] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="my-4 flex items-baseline">
                <span className="text-4xl md:text-5xl lg:text-6xl font-light text-white font-sans tracking-tight"><CountUp value="7,500+" /></span>
                <span className="text-xl md:text-2xl text-gray-400 ml-1 font-light font-sans">tCO₂e</span>
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans font-light">
                tonnes of carbon emissions mitigated annually across our portfolio.
              </p>

              <div className="mt-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#56C36A]/30 bg-[#56C36A]/10 text-[#56C36A] text-[9px] font-bold uppercase tracking-wider self-start font-sans">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3F7E44]" />
                SDG 13
              </div>
            </motion.div>

            {/* Card 3: Job Creation */}
            <motion.div 
              variants={heroCardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[6px] p-6 min-h-[220px] md:min-h-[240px] flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.06] group cursor-default relative md:col-span-2 shadow-lg will-change-transform"
            >
              <div className="flex justify-between items-start">
                <span className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] font-mono block">
                  Job creation
                </span>
                <ArrowUpRight size={16} className="text-[#81C34D] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="my-4 flex items-baseline">
                <span className="text-4xl md:text-5xl lg:text-6xl font-light text-white font-sans tracking-tight"><CountUp value="5,780+" /></span>
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans font-light">
                sustainable jobs facilitated in local communities.
              </p>

              <div className="mt-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#FF4A6B]/30 bg-[#FF4A6B]/10 text-[#FF4A6B] text-[9px] font-bold uppercase tracking-wider self-start font-sans">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8F1838]" />
                SDG 8
              </div>
            </motion.div>

            {/* Card 4: Connections Powered */}
            <motion.div 
              variants={heroCardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-[#02100d] border border-white/15 rounded-[6px] p-6 min-h-[220px] md:min-h-[240px] flex flex-col justify-between transition-all duration-300 hover:bg-[#02100d]/90 group cursor-default relative md:col-span-3 shadow-md will-change-transform"
            >
              <div className="flex justify-between items-start">
                <span className="text-[#81C34D] text-[10px] font-bold uppercase tracking-[0.2em] font-mono block">
                  Connections powered
                </span>
                <ArrowUpRight size={16} className="text-[#81C34D] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="my-4 flex items-baseline">
                <span className="text-4xl md:text-5xl lg:text-6xl font-light text-white font-sans tracking-tight"><CountUp value="39,438" /></span>
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans font-light">
                projected household and SME connections powered across Nigeria.
              </p>

              <div className="mt-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#FDB713]/30 bg-[#FDB713]/10 text-[#FDB713] text-[9px] font-bold uppercase tracking-wider self-start font-sans">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FDB713]" />
                SDG 7
              </div>
            </motion.div>

            {/* Card 5: Capital Deployed */}
            <motion.div 
              variants={heroCardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-[#02100d] border border-white/15 rounded-[6px] p-6 min-h-[220px] md:min-h-[240px] flex flex-col justify-between transition-all duration-300 hover:bg-[#02100d]/90 group cursor-default relative md:col-span-3 shadow-md will-change-transform"
            >
              <div className="flex justify-between items-start">
                <span className="text-[#81C34D] text-[10px] font-bold uppercase tracking-[0.2em] font-mono block">
                  Capital deployed
                </span>
                <ArrowUpRight size={16} className="text-[#81C34D] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="my-4 flex items-baseline">
                <span className="text-4xl md:text-5xl lg:text-6xl font-light text-white font-sans tracking-tight"><CountUp value="₦7.86B+" /></span>
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans font-light">
                mobilized from institutional investors and pension funds into the real economy.
              </p>

              <div className="mt-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#F36D25]/30 bg-[#F36D25]/10 text-[#F36D25] text-[9px] font-bold uppercase tracking-wider self-start font-sans">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F36D25]" />
                SDG 9
              </div>
            </motion.div>

        </motion.div>
      </GlassHero>

      {/* Main Page Body */}
      <div ref={projectsSectionRef} data-rag-chunk="projects-portfolio-container" className="container mx-auto px-6 pt-20 pb-0 relative z-10 text-left">
        {/* Page Section Title & Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-accent"></div>
              <span className="text-[#81C34D] text-xs font-semibold tracking-[0.2em] uppercase font-sans">Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight tracking-tight">
              Our footprint <span className="text-[#9BB7B1]">in Nigeria</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mt-3 max-w-xl font-sans font-light">
              Collectively, renewable energy projects located in 35 states across the six geo-political zones in Nigeria have been approved for co-financing by the Facility.
            </p>
          </div>

          {/* Page Tabs */}
          <div className="flex gap-8 mt-6 md:mt-0 border-b border-white/10 md:border-b-0 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none ${
                activeTab === 'pipeline' ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
              }`}
            >
              <LayoutGrid size={16} />
              Project Pipeline
              {activeTab === 'pipeline' && (
                <motion.div layoutId="projectsPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none ${
                activeTab === 'analysis' ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
              }`}
            >
              <BarChart3 size={16} />
              Project Analysis
              {activeTab === 'analysis' && (
                <motion.div layoutId="projectsPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
              )}
            </button>
            <button
              onClick={() => {
                document.getElementById('national-footprint')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none text-gray-400 hover:text-gray-300 font-normal whitespace-nowrap"
            >
              <MapPin size={16} />
              National Footprint
            </button>
          </div>
        </motion.div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'analysis' ? (
            <motion.div
              key="analysis-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Icon Stat Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <IconStatBox
                  icon={<Zap />}
                  label="Capacity installed"
                  value="4.02"
                  unit="MW"
                  iconBg="rgba(253, 183, 19, 0.12)"
                  iconColor="#FDB713"
                  glowColor="#FDB713"
                  delay={0}
                />
                <IconStatBox
                  icon={<Leaf />}
                  label="Emissions avoided"
                  value="7,500+"
                  unit="tCO₂e"
                  iconBg="rgba(86, 195, 106, 0.12)"
                  iconColor="#56C36A"
                  glowColor="#56C36A"
                  delay={0.08}
                />
                <IconStatBox
                  icon={<Users />}
                  label="Jobs created"
                  value="5,780+"
                  iconBg="rgba(255, 74, 107, 0.12)"
                  iconColor="#FF4A6B"
                  glowColor="#FF4A6B"
                  delay={0.16}
                />
                <IconStatBox
                  icon={<Wifi />}
                  label="Connections powered"
                  value="39,438"
                  iconBg="rgba(129, 195, 77, 0.12)"
                  iconColor="#81C34D"
                  glowColor="#81C34D"
                  delay={0.24}
                />
              </div>

              {/* Performance Data Table */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="bg-white/[0.02] backdrop-blur-md rounded-[6px] border border-white/10 overflow-hidden shadow-2xl"
              >
                <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="font-bold text-lg font-sans text-white">Portfolio Transactions Performance</h3>
                  <a 
                    href="/download.pdf" 
                    download
                    className="flex items-center gap-2 text-xs font-bold text-brand-accent uppercase tracking-wider hover:text-white transition-colors interactive font-sans"
                  >
                    <Download size={14} /> Download Impact Report
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="bg-white/[0.02] border-b border-white/5 text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                         <th className="p-4 pl-6">Project Name</th>
                         <th className="p-4">Capacity</th>
                         <th className="p-4">Capital Mobilised</th>
                         <th className="p-4">Connections</th>
                         <th className="p-4">Jobs Created</th>
                         <th className="p-4">GHG Reduced</th>
                         <th className="p-4 pr-6">Status</th>
                       </tr>
                     </thead>
                     <tbody className="text-sm font-sans text-gray-300 divide-y divide-white/5">
                       {projects.map((p) => (
                         <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                           <td className="p-4 pl-6 font-semibold">
                             <Link 
                               href={`/projects/${p.id}`}
                               className="text-white hover:text-[#81C34D] transition-colors font-semibold text-left focus:outline-none interactive"
                             >
                               {p.title}
                             </Link>
                           </td>
                           <td className="p-4">{p.capacity}</td>
                           <td className="p-4 font-mono font-medium text-brand-accent">{p.capital}</td>
                           <td className="p-4">{p.connections}</td>
                           <td className="p-4">{p.jobs}</td>
                           <td className="p-4">{p.ghg}/yr</td>
                           <td className="p-4 pr-6">
                             <span className={`px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wide border ${
                              p.status === 'Operational' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t-2 border-white/10 bg-white/[0.02] text-xs font-mono font-bold text-white uppercase tracking-wider">
                      <tr>
                        <td className="p-4 pl-6 text-gray-400 font-sans normal-case">Total Portfolio</td>
                        <td className="p-4 text-[#81C34D]">{totalCapacity.toLocaleString()} kW</td>
                        <td className="p-4 text-[#81C34D]">₦{totalCapital.toFixed(2)}b</td>
                        <td className="p-4 text-[#81C34D]">
                          {projects.reduce((sum, p) => {
                            if (p.connections.toLowerCase().includes('site')) return sum;
                            const num = parseInt(p.connections.replace(/[^0-9]/g, ''), 10);
                            return sum + (isNaN(num) ? 0 : num);
                          }, 0).toLocaleString()} + 120 Sites
                        </td>
                        <td className="p-4 text-[#81C34D]">{totalJobs.toLocaleString()}</td>
                        <td className="p-4 text-[#81C34D]">
                          {totalGHG.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })} t/yr
                        </td>
                        <td className="p-4 pr-6"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="pipeline-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {selectedState && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between bg-white/[0.02] border border-[#81C34D]/30 p-4 rounded-[6px] mb-4 text-xs md:text-sm font-sans"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="text-[#81C34D]" size={16} />
                    <span>
                      Filtering by region: <strong className="text-white">{ALL_STATES.find(s => s.mapId === selectedState)?.name} State</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedState(null)}
                    className="text-[10px] font-bold text-[#81C34D] uppercase tracking-wider hover:text-white transition-colors border-b border-[#81C34D] hover:border-white pb-0.5 focus:outline-none"
                  >
                    Clear State Filter
                  </button>
                </motion.div>
              )}

              {/* Category Filter Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
              >
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-[6px] border text-xs tracking-wide transition-all duration-300 font-sans whitespace-nowrap focus:outline-none ${
                      filter === cat
                        ? 'bg-[#81C34D] text-[#051F1A] border-[#81C34D] font-semibold'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-brand-accent hover:text-white font-light'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </motion.div>

              {/* Interactive Accordion List */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                {filteredProjects.map((p) => {
                  const isHighlighted = selectedState && isProjectInSelectedState(p);
                  return (
                    <div 
                      key={p.id}
                      className={`bg-white/[0.02] backdrop-blur-md rounded-[6px] border transition-all duration-300 overflow-hidden shadow-lg ${
                        isHighlighted 
                          ? 'border-[#81C34D]/40 shadow-[0_0_15px_rgba(113,181,81,0.15)] ring-1 ring-[#81C34D]/30' 
                          : expandedProject === p.id 
                            ? 'ring-1 ring-brand-accent/20 shadow-xl border-brand-accent/20' 
                            : 'border-white/10 hover:border-brand-accent/30'
                      }`}
                    >

                      {/* Header Row */}
                      <div 
                        onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 cursor-pointer interactive group"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-xs text-brand-accent font-mono bg-brand-accent/10 px-2.5 py-1 rounded-[6px]">/ {p.id}</span>
                          <h3 className={`text-lg md:text-xl font-bold transition-colors ${expandedProject === p.id ? 'text-brand-accent' : 'text-white group-hover:text-brand-accent'}`}>
                            {p.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4 md:mt-0 font-sans text-xs uppercase tracking-wider text-gray-400">
                          <span>{p.location}</span>
                          <span className="hidden md:inline">•</span>
                          <span>{p.capacity}</span>
                          <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#81C34D] group-hover:text-[#051F1A] transition-colors duration-300`}>
                            {expandedProject === p.id ? <Minus size={16} /> : <Plus size={16} />}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Section Content */}
                      <AnimatePresence>
                        {expandedProject === p.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35 }}
                            className="border-t border-white/5 bg-[#02100d]/30"
                          >
                            <div className="p-6 md:p-8">
                              <div className="grid lg:grid-cols-2 gap-8">
                                <div>
                                  <img src={p.image} alt={p.title} className="w-full h-56 object-cover rounded-[6px] border border-white/10 shadow-md" />
                                </div>
                                <div className="flex flex-col justify-center space-y-4">
                                  <div>
                                    <h4 className="text-xs font-bold text-[#81C34D] uppercase tracking-widest mb-1.5">Challenge &amp; solution</h4>
                                    <p className="text-gray-300 text-sm leading-relaxed">{p.problem}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 bg-white/[0.02] p-4 rounded-[6px] border border-white/5 shadow-md text-xs">
                                    <div>
                                      <span className="font-semibold text-gray-500 block mb-1">Financial close:</span>
                                      <span className="text-white font-bold font-mono">{p.year}</span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-500 block mb-1">Private capital:</span>
                                      <span className="text-brand-accent font-bold font-mono">{p.capital}</span>
                                    </div>
                                  </div>

                                  {/* Aligned SDG Goals */}
                                  <div>
                                    <span className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wider">Aligned SDG goals</span>
                                    <div className="flex flex-wrap gap-2">
                                      {getProjectSDGs(p.id).map(sdgNum => {
                                        const sdg = SDG_INFO[sdgNum as keyof typeof SDG_INFO];
                                        if (!sdg) return null;
                                        return (
                                          <div 
                                            key={sdgNum} 
                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border text-[10px] font-bold uppercase tracking-wider ${sdg.textClass}`}
                                          >
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sdg.color }} />
                                            SDG {sdgNum}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  
                                  <Link 
                                    href={`/projects/${p.id}`}
                                    className="self-start flex items-center gap-1.5 text-xs font-bold text-brand-accent border-b border-brand-accent pb-0.5 hover:text-white hover:border-white transition-colors interactive font-sans uppercase tracking-wider mt-2"
                                  >
                                    Explore Project Details <ArrowUpRight size={14} />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PipelineConsole />

      <div className="container mx-auto px-6 pt-0 pb-0 relative z-10 text-left">
        {/* Contextual Eligibility CTA Banner */}
        <div className="relative z-10 w-full mt-24 border-t border-white/10 pt-20">
          <div className="min-h-[400px] relative flex items-center justify-center group overflow-hidden rounded-[8px] border border-white/5 shadow-2xl">
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
              alt="Clean energy installation background"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02] pointer-events-none select-none"
            />
            {/* Dark overlay matching about page */}
            <div className="absolute inset-0 bg-[#051F1A]/70 group-hover:bg-[#051F1A]/65 transition-colors pointer-events-none z-10" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 text-center max-w-3xl px-6 flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#81C34D]/10 border border-[#81C34D]/20 flex items-center justify-center mb-6 text-[#81C34D]">
                <ShieldCheck size={24} />
              </div>

              <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">Funding intake</span>
              <h3 className="text-white text-3xl md:text-4xl font-bold font-sans mb-4 leading-tight">
                Do you have a <span className="text-brand-accent">clean energy project</span>?
              </h3>

              <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-xl font-light">
                Verify your project's compliance against our eligibility checklist, estimate your qualifying scores, and start the blended finance pre-qualification application.
              </p>

              <Link
                href="/eligibility"
                className="inline-flex items-center justify-center gap-2 bg-[#81C34D] text-[#051F1A] hover:bg-white hover:text-brand-dark px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans shadow-lg focus:outline-none"
              >
                Check project eligibility <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* National Footprint — 3-Column Interactive Map */}
        <motion.section
          id="national-footprint"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 border-t border-white/10 pt-16"
        >
          <FootprintMap />
        </motion.section>
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
    </div>
  );
}

