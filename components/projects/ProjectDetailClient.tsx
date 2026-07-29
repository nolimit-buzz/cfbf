"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  Users,
  Shield,
  ShieldCheck
} from 'lucide-react';
import GlassHero, { heroRowVariants } from '@/components/GlassHero';
import ProjectBentoMetric from '@/components/ui/ProjectBentoMetric';
import ImpactBentoCard from '@/components/ui/ImpactBentoCard';
import StickyProjectNav from '@/components/ui/StickyProjectNav';
import { FSDAfricaLogo, GCRRatingsLogo, AgustoCoLogo } from '@/components/ui/MapLogos';
// @ts-ignore
import nigeriaMapData from '@svg-maps/nigeria';
import { projects, Project } from '@/lib/projectsData';

interface StateLocation {
  id: string;
  name: string;
  path: string;
}

const SDG_INFO = {
  5: { name: 'Gender Equality', color: '#FF4A6B', textClass: 'text-[#FF4A6B] border-[#FF4A6B]/25 bg-[#FF4A6B]/5' },
  7: { name: 'Affordable & Clean Energy', color: '#FDB713', textClass: 'text-[#FDB713] border-[#FDB713]/25 bg-[#FDB713]/5' },
  8: { name: 'Decent Work & Growth', color: '#8F1838', textClass: 'text-[#FF4A6B] border-[#FF4A6B]/25 bg-[#FF4A6B]/5' },
  9: { name: 'Industry, Innovation & Infrastructure', color: '#F36D25', textClass: 'text-[#F36D25] border-[#F36D25]/25 bg-[#F36D25]/5' },
  11: { name: 'Sustainable Cities & Communities', color: '#FD9D24', textClass: 'text-[#FD9D24] border-[#FD9D24]/25 bg-[#FD9D24]/5' },
  13: { name: 'Climate Action', color: '#3F7E44', textClass: 'text-[#56C36A] border-[#56C36A]/25 bg-[#56C36A]/5' },
  17: { name: 'Partnerships for the Goals', color: '#19486A', textClass: 'text-[#19486A] border-[#19486A]/25 bg-[#19486A]/5' }
};

const getProjectSDGs = (id: string): number[] => {
  switch (id) {
    case '01': return [7, 13];
    case '02': return [7, 13];
    case '03': return [7, 8, 9];
    case '04': return [9, 13];
    case '05': return [7, 13];
    case '06': return [7, 8, 13];
    default: return [7];
  }
};

const PROJECT_STATES: Record<string, string[]> = {
  "01": ["gombe", "nasarawa", "ondo"],
  "02": ["cross-river"],
  "03": ["akwa-ibom", "benue"],
  "04": ["kano", "fct", "lagos", "rivers", "bauchi", "kaduna", "cross-river", "ondo", "gombe", "nasarawa", "edo", "akwa-ibom", "benue", "abia", "katsina", "jigawa", "sokoto", "zamfara", "kebbi", "kogi", "kwara", "taraba", "adamawa", "borno", "yobe", "plateau", "niger", "ekiti", "osun", "ogun"],
  "05": ["rivers", "abia"],
  "06": ["edo", "ondo"]
};

// INTERACTIVE NIGERIA MAP
const InteractiveNigeriaMap = ({ projectId, activeStates, selectedState, setSelectedState }: {
  projectId: string;
  activeStates: string[];
  selectedState: string | null;
  setSelectedState: (s: string | null) => void;
}) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[16/11] flex flex-col justify-between min-h-[320px] bg-white/[0.02] backdrop-blur-md rounded-[6px] border border-white/10 p-4 shadow-xl overflow-visible text-white text-left">
      <div className="absolute top-4 left-4 z-10">
        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest font-mono">Interactive Map</span>
      </div>

      <div className="w-full flex-1 flex items-center justify-center py-2">
        <svg
          viewBox={nigeriaMapData.viewBox}
          className="w-full max-h-[320px] select-none fill-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {(nigeriaMapData.locations as StateLocation[]).map((loc) => {
            const locId = loc.id;
            const isActive = activeStates.includes(locId);
            const isHovered = hoveredState === locId;
            const isSelected = selectedState === locId;

            let fill = "rgba(255, 255, 255, 0.02)";
            let stroke = "rgba(255, 255, 255, 0.15)";

            if (isActive) {
              fill = "rgba(129, 195, 77, 0.12)";
              stroke = "rgba(129, 195, 77, 0.35)";
            }

            if (isHovered || isSelected) {
              fill = "rgba(129, 195, 77, 0.85)";
              stroke = "#81C34D";
            }

            return (
              <path
                key={locId}
                d={loc.path}
                id={locId}
                name={loc.name}
                role="button"
                tabIndex={isActive ? 0 : -1}
                aria-label={`${loc.name} State${isActive ? ' (Active)' : ''}`}
                aria-pressed={isSelected}
                className={`cursor-pointer transition-all duration-300 stroke-[#051F1A]/80 stroke-[0.8px] focus:outline-none ${isActive ? 'focus:stroke-[#81C34D] focus:stroke-2 focus:fill-[#81C34D]/25' : ''}`}
                style={{ fill, stroke, strokeWidth: isHovered || isSelected ? 1.5 : 0.8 }}
                onMouseEnter={() => setHoveredState(locId)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => isActive && setSelectedState(locId)}
                onKeyDown={(e) => {
                  if (isActive && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setSelectedState(locId);
                  }
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Map Legends */}
      <div className="flex flex-wrap gap-4 text-[9px] uppercase font-bold tracking-wider text-gray-500 font-mono border-t border-white/5 pt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded bg-white/[0.02] border border-white/10" />
          <span>Other Regions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded bg-[#81C34D]/20 border border-[#81C34D]/40" />
          <span>Active Region</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded bg-[#81C34D]" />
          <span>Selected / Hovered</span>
        </div>
      </div>

      {/* Hover tooltip overlay */}
      {(hoveredState || selectedState) && (
        <div className="absolute bottom-4 right-4 bg-brand-dark/95 backdrop-blur-sm text-[#81C34D] border border-[#144D3F] px-2 py-1 rounded text-[9px] font-bold font-mono tracking-tight shadow-md flex items-center gap-1.5 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#81C34D] inline-block animate-pulse" />
          {(hoveredState ? (nigeriaMapData.locations as StateLocation[]).find(l => l.id === hoveredState)?.name : (nigeriaMapData.locations as StateLocation[]).find(l => l.id === selectedState)?.name)?.toUpperCase()}
          {activeStates.includes(hoveredState || selectedState || "") ? " (ACTIVE)" : ""}
        </div>
      )}
    </div>
  );
};

// DYNAMIC TEXT GENERATOR FOR EXPECTED IMPACT SECTION
const getExpectedImpactText = (p: { id: string; connections: string; jobs: string; ghg: string }) => {
  const isTelemetry = p.id === '04';
  const connectTerm = isTelemetry ? "telephony base stations" : "unserved households and small businesses";
  
  return `The project on completion will ${isTelemetry ? `solarize ${p.connections}` : `electrify up to ${p.connections}`} ${isTelemetry ? "" : "unserved households and small businesses"}, create up to ${p.jobs} whilst enhancing access to renewable energy for productive uses, and avoid ${p.ghg} of GHG emissions.

The ${p.id === '02' ? '4 hybrid-solar mini-grids' : p.id === '04' ? '120 solar telephony sites' : 'solar-hybrid mini-grids'} will have environmental benefits of climate change mitigation, energy savings and greenhouse gas reduction and simultaneously have a positive direct contribution to the United Nations Sustainable Development Goals (SDGs) 7, 8, 9, 11, 13 and 17 as identified in the Green Bond Framework.`;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id || '01';

  const project = projects[projectId] || projects["01"];

  const projectIds = ["01", "02", "03", "04", "05", "06"];
  const currentIndex = projectIds.indexOf(projectId);
  const prevId = projectIds[(currentIndex - 1 + projectIds.length) % projectIds.length];
  const nextId = projectIds[(currentIndex + 1) % projectIds.length];

  const filteredRelated = Object.values(projects).filter(p => p.id !== project.id);
  const [hoveredGalleryIndex, setHoveredGalleryIndex] = useState<number>(1);
  const activeStates = PROJECT_STATES[project.id] || [];
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useEffect(() => {
    const states = PROJECT_STATES[projectId] || [];
    setSelectedState(states.length > 0 ? states[0] : null);
  }, [projectId]);

  // V20 Related Projects Scroller State
  const [startIndex, setStartIndex] = useState<number>(0);

  useEffect(() => {
    setStartIndex(0);
  }, [projectId]);

  const displayedRelated = [
    filteredRelated[startIndex],
    filteredRelated[(startIndex + 1) % filteredRelated.length]
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Project",
    "name": project.title,
    "description": project.desc,
    "location": {
      "@type": "Place",
      "name": project.location,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NG"
      }
    },
    "funder": [
      {
        "@type": "Organization",
        "name": "Climate Finance Blending Facility (CFBF)"
      },
      {
        "@type": "Organization",
        "name": "UK Foreign, Commonwealth & Development Office (FCDO)"
      },
      {
        "@type": "Organization",
        "name": "British International Investment (BII)"
      }
    ],
    "funding": {
      "@type": "MonetaryGrant",
      "amount": project.capital,
      "currency": "NGN"
    },
    "identifier": project.id,
    "category": project.category,
    "status": project.status,
    "capacity": project.capacity,
    "ghgAvoided": project.ghg,
    "jobsCreated": project.jobs,
    "connections": project.connections
  };

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative overflow-x-clip font-sans pb-0 text-left">
      {/* Dynamic Metadata Hoisting (React 19 / Next.js) */}
      <title>{`${project.title} | Climate Finance Blending Facility`}</title>
      <meta name="description" content={project.desc} />
      <meta property="og:title" content={project.title} />
      <meta property="og:description" content={project.desc} />
      <meta property="og:image" content={project.image} />
      <meta property="og:type" content="website" />
      
      {/* Dublin Core Hoisting */}
      <meta name="DC.title" content={project.title} />
      <meta name="DC.creator" content="NoLimitBuzz" />
      <meta name="DC.subject" content={`${project.category}, ${project.location}`} />
      <meta name="DC.description" content={project.desc} />
      <meta name="DC.publisher" content="Climate Finance Blending Facility" />
      <meta name="DC.language" content="en" />
      <meta name="DC.coverage.spatial" content={project.location} />
      <meta name="DC.identifier" content={project.id} />
      <meta name="DC.type" content="Project Case Study" />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative radial glows */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Glassmorphism Hero Section */}
      <GlassHero
        title={project.title}
        subtitle={`PROJECT CASE STUDY: / ${project.id}`}
        bgImage={project.image}
        currentPage={project.title.split(' ')[0]}
        parent={{ label: 'projects', href: '/projects' }}
        fade="dark"
      >
        <div className="w-full text-left mt-6">
          {/* Project Header Info */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-brand-primary/20 text-[#81C34D] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-sans border border-brand-primary/30">
              {project.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans border ${
              project.status === 'Operational' 
                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
            }`}>
              {project.status}
            </span>
            <span className="text-white/30 font-mono hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-gray-300 font-sans text-sm">
              <MapPin size={14} className="text-[#81C34D]" />
              {project.location}
            </div>
          </div>

          {/* Dynamic Targets Bento Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-6 gap-6"
            variants={heroRowVariants}
            initial="hidden"
            animate="show"
          >
            <ProjectBentoMetric 
              label="CAPACITY INSTALLED" 
              value={project.capacity} 
              desc="installed green capacity de-risked by first-loss co-financing." 
              colSpan="md:col-span-2"
            />
            <ProjectBentoMetric 
              label="EMISSIONS AVOIDED" 
              value={project.ghg} 
              desc="tonnes of greenhouse gas emissions offset annually by the project." 
              colSpan="md:col-span-2"
            />
            <ProjectBentoMetric 
              label="JOB CREATION" 
              value={project.jobs} 
              desc="sustainable direct and indirect jobs facilitated in local communities." 
              colSpan="md:col-span-2"
            />
            <ProjectBentoMetric 
              label="CONNECTIONS POWERED" 
              value={project.connections} 
              desc="projected household and SME connections powered across Nigeria." 
              colSpan="md:col-span-3"
            />
            <ProjectBentoMetric 
              label="CAPITAL DEPLOYED" 
              value={project.capital} 
              desc="mobilized from institutional investors and pension funds into the real economy." 
              isDark={true}
              colSpan="md:col-span-3"
            />
          </motion.div>
        </div>
      </GlassHero>

      {/* Sticky Project Nav for quick section links */}
      <StickyProjectNav />

      {/* Section 1: Project Intro (Specs Table & Interactive Map side-by-side) */}
      <section id="overview" data-rag-chunk="project-overview" className="bg-[#051F1A] text-white py-12 border-y border-[#144D3F]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#144D3F_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-85px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            {/* Header layout */}
            <div className="grid md:grid-cols-12 gap-8 items-start mb-12">
              <div className="md:col-span-12 border-l-4 border-[#81C34D] pl-5">
                <span className="text-[10px] font-bold text-[#81C34D] uppercase tracking-[0.25em] block mb-2 font-mono">
                  Project description
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-sans text-white tracking-tight leading-tight">
                  {project.intro.title}
                </h2>
                <p className="text-gray-300 font-sans font-light leading-relaxed text-sm md:text-base mt-4 max-w-4xl">
                  {project.desc}
                </p>
              </div>
            </div>

            {/* Specs Table & Nigeria Map beside it */}
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Nigeria Map Column */}
              <div className="lg:col-span-7">
                <InteractiveNigeriaMap 
                  projectId={project.id} 
                  activeStates={activeStates} 
                  selectedState={selectedState} 
                  setSelectedState={setSelectedState} 
                />
              </div>

              {/* Specs Table Column */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="border border-white/10 rounded-[6px] overflow-hidden bg-[#021814]/40 backdrop-blur-sm shadow-xl text-xs font-sans flex flex-col text-left">
                  <div>
                    <div className="grid grid-cols-3 border-b border-white/10 p-3 bg-white/[0.02]">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] font-mono">Specification</span>
                      <span className="text-white font-extrabold col-span-2">Project Metrics & Details</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
                      <span className="text-gray-400 font-mono">DEVELOPER</span>
                      <span className="text-white font-extrabold col-span-2">{project.title}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
                      <span className="text-gray-400 font-mono">STATES</span>
                      <span className="text-white font-semibold col-span-2">{project.location}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
                      <span className="text-gray-400 font-mono">CAPACITY</span>
                      <span className="text-[#81C34D] font-bold col-span-2">{project.capacity}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
                      <span className="text-gray-400 font-mono">SECTOR</span>
                      <span className="text-white font-semibold col-span-2">{project.category}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
                      <span className="text-gray-400 font-mono">CLOSE YEAR</span>
                      <span className="text-white font-mono col-span-2">{project.year}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
                      <span className="text-gray-400 font-mono">PRIVATE CAPITAL</span>
                      <span className="text-[#81C34D] font-bold font-mono col-span-2">{project.capital}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
                      <span className="text-gray-400 font-mono">CONNECTIONS</span>
                      <span className="text-white font-semibold col-span-2">{project.connections}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
                      <span className="text-gray-400 font-mono">JOBS CREATED</span>
                      <span className="text-white font-semibold col-span-2">{project.jobs}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 p-3 hover:bg-white/[0.04] transition-colors bg-white/[0.01]">
                    <span className="text-gray-400 font-mono">GHG OFFSET</span>
                    <span className="text-[#81C34D] font-bold font-mono col-span-2">{project.ghg}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Challenges & Solution Section */}
      <section id="challenges" data-rag-chunk="project-challenges-solutions" className="bg-[#FAFDFB] text-[#051F1A] py-24 border-y border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2f0ea_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 rounded-[6px] overflow-hidden border border-gray-100 w-full min-h-[400px] lg:min-h-full"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Right Information Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <span className="text-[10px] font-bold text-[#00A788] uppercase tracking-[0.25em] font-mono block mb-1">Project ID / {project.id}</span>
                  <h3 className="text-2xl font-bold font-sans tracking-tight">
                    {project.title}
                  </h3>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-[#00A788] uppercase tracking-widest mb-2 font-mono">The challenge & problem</h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans font-light">{project.problem}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-[#00A788] uppercase tracking-widest mb-2 font-mono">The action plan & solution</h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans font-light">{project.solution}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-[#00A788] uppercase tracking-widest mb-2 font-mono">Developmental & environmental impact</h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans font-light">{project.impact}</p>
                </div>
                
                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-6 border border-gray-100 bg-[#F3FAF6] rounded-[6px] p-6 text-sm font-sans mt-8">
                  <div>
                    <span className="text-gray-500 block mb-1.5 font-mono uppercase text-[9px] tracking-widest font-bold">Financial Close</span>
                    <span className="text-[#051F1A] font-extrabold font-mono text-base">{project.year.split(' ').pop()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1.5 font-mono uppercase text-[9px] tracking-widest font-bold">Private Capital Mobilised</span>
                    <span className="text-[#00A788] font-extrabold font-mono text-base">{project.capital}</span>
                  </div>
                </div>
              </div>

              {/* SDG badges */}
              <div className="border-t border-gray-200 pt-6">
                <span className="text-[9px] font-bold text-gray-400 block mb-3 uppercase tracking-wider font-mono">Aligned SDG Goals</span>
                <div className="flex flex-wrap gap-2.5">
                  {getProjectSDGs(project.id).map(sdgNum => {
                    const sdg = SDG_INFO[sdgNum as keyof typeof SDG_INFO];
                    if (!sdg) return null;
                    return (
                      <div 
                        key={sdgNum} 
                        className={`flex items-center gap-1.5 px-3.5 py-1 rounded-[6px] border text-[9px] font-bold uppercase tracking-wider ${sdg.textClass}`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sdg.color }} />
                        SDG {sdgNum}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financing Structure Section */}
      <section id="financing" data-rag-chunk="project-financing-structure" className="bg-[#F3FAF6] text-[#051F1A] py-24 border-b border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2f0ea_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header layout */}
            <div className="border-l-4 border-[#00A788] pl-5 mb-12 text-left">
              <span className="text-[10px] font-bold text-[#00A788] uppercase tracking-[0.25em] block mb-2 font-mono">
                Financing structure
              </span>
              <h2 className="text-3xl font-bold font-sans text-[#051F1A] tracking-tight leading-tight">
                Blended finance mechanism & <span className="text-[#7C9590]">risk-mitigation architecture</span>
              </h2>
            </div>

            {/* Layout content card */}
            <div className="bg-white border border-gray-100 rounded-[6px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-stretch text-left">
              {/* Text Description column */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#00A788]">
                    <Shield size={20} className="shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">De-risked Credit Enhancement</span>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans font-light">
                    {project.financing}
                  </p>
                </div>
              </div>

              {/* Sidebar metrics column */}
              <div className="md:w-[320px] w-full bg-[#FAFDFB] border border-gray-100 rounded-[6px] p-6 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-[#00A788] uppercase tracking-wider font-mono block mb-4">Financing key parameters</span>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="text-gray-500 font-mono">Instrument Type</span>
                      <span className="text-[#051F1A] font-bold text-right ml-2">{project.category === 'Telecoms' ? 'Infrastructure Bond' : project.id === '03' ? 'Sukuk Lease Sukuk' : 'Co-financing / Bond'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="text-gray-500 font-mono">Credit Rating</span>
                      <span className="text-[#00A788] font-bold">AAA-Rated (Guaranteed)</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="text-gray-500 font-mono">Facility Support</span>
                      <span className="text-[#051F1A] font-semibold text-right ml-2">CFBF (First-loss)</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-gray-500 font-mono">Currency</span>
                      <span className="text-[#051F1A] font-bold">Local Currency (NGN)</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200/60 pt-4 flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider font-mono">Capital Deployed</span>
                  <span className="text-[#00A788] font-extrabold font-mono text-xl">{project.capital}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Illustrative Transaction Structure */}
      <section id="structure" data-rag-chunk="project-transaction-structure" className="bg-white pt-20 pb-0 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <span className="text-[10px] font-bold text-[#00A788] uppercase tracking-[0.25em] font-mono block mb-2">
            Finance architecture
          </span>
          <h2 className="text-3xl font-bold font-sans text-[#051F1A] tracking-tight leading-tight">
            Illustrative <span className="text-[#7C9590]">transaction structure</span>
          </h2>
        </div>
        <div className="w-full overflow-hidden bg-white">
          <video 
            src="https://infracredit.ng/climate-facility/wp-content/uploads/2023/08/Hotspot-schematic-graphs6-2.mp4"
            className="w-full h-auto object-cover bg-white pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>

      {/* Section 4: Expected Impact Section with SDG Grid */}
      <section id="impact" data-rag-chunk="project-expected-impact" className="py-24 bg-[#051F1A] border-t border-[#144D3F]/30 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Top Title Section */}
          <div className="max-w-4xl mb-16 border-l-4 border-[#81C34D] pl-5 text-left">
            <span className="text-[10px] font-bold text-[#81C34D] uppercase tracking-[0.25em] block mb-2 font-mono">
              Expected impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-white tracking-tight leading-tight">
              A holistic approach to <span className="text-[#9BB7B1]">clean energy infrastructure & resilience</span>
            </h2>
            <p className="text-gray-300 font-sans font-light leading-relaxed text-sm md:text-base mt-4 max-w-3xl whitespace-pre-line">
              {project.impact_desc}
            </p>
          </div>

          {/* Grid Layout (2x3 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 01: Renewable Energy */}
            <ImpactBentoCard 
              number="01" 
              title="Renewable Energy" 
              sdgs={[7, 13, 9]} 
              desc="Financing clean energy generation to power communities, foster innovation, and drive global climate action." 
            />

            {/* Image 01 (Middle) */}
            <div className="rounded-[6px] overflow-hidden border border-white/10 h-[320px] w-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] group cursor-pointer relative bg-[#021814]">
              <img 
                src={project.gallery[0]?.image || project.image} 
                alt="Renewable energy preview" 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            {/* Card 02: Energy Efficiency */}
            <ImpactBentoCard 
              number="02" 
              title="Energy Efficiency" 
              sdgs={[7, 11, 13]} 
              desc="Optimizing energy consumption in sustainable cities and industrial infrastructure to reduce carbon footprints." 
            />

            {/* Card 03: Gender Equality & Jobs */}
            <ImpactBentoCard 
              number="03" 
              title="Gender Equality & Jobs" 
              sdgs={[5, 8]} 
              desc="Empowering women in leadership and creating decent work opportunities across the clean energy value chain." 
            />

            {/* Image 02 (Middle) */}
            <div className="rounded-[6px] overflow-hidden border border-white/10 h-[320px] w-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] group cursor-pointer relative bg-[#021814]">
              <img 
                src={project.gallery[1]?.image || project.image} 
                alt="Ecology and gender jobs preview" 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            {/* Card 04: Partnership for Growth */}
            <ImpactBentoCard 
              number="04" 
              title="Partnership for Growth" 
              sdgs={[17]} 
              desc="Collaborating with global and local institutions to mobilize capital for sustainable, inclusive development." 
            />

          </div>

          {/* Strategic Technical Assistance Funder (FSD Africa) */}
          <div className="border-t border-white/10 pt-12 mt-16 text-left">
            <h3 className="text-[#81C34D] font-bold tracking-[0.2em] uppercase mb-8 text-xs font-mono">
              Technical Assistance & Support
            </h3>
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
              <div className="shrink-0 bg-white border border-white/10 rounded-[6px] p-4 flex items-center justify-center">
                <FSDAfricaLogo />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-white text-sm mb-1">FSD Africa Support</span>
                <p className="text-sm text-gray-300 leading-relaxed font-sans font-light max-w-3xl">
                  Funded the upfront due diligence costs for the Project through its technical assistance facility for climate aligned infrastructure bonds established with InfraCredit.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Rating & Verification Agency Strip */}
      <section id="partners" className="bg-[#02100d] py-10 border-t border-[#144D3F]/25 text-white relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
          
          {/* Rating Agency block */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="text-[#81C34D] font-bold text-xs uppercase tracking-wider font-mono whitespace-nowrap">Rating Agency</span>
            <div className="flex items-center gap-4 sm:border-l sm:border-white/20 sm:pl-6">
              <div className="flex flex-col items-center shrink-0">
                <span className="text-[#FF4A6B] font-bold text-3xl leading-none tracking-tighter">GCR</span>
                <span className="text-gray-400 text-[8px] tracking-[0.25em] mt-1 font-mono">RATINGS</span>
              </div>
              <div className="text-[11px] text-gray-300 border-l border-white/10 pl-4 leading-tight text-left font-sans font-light whitespace-nowrap">
                An Affiliate<br/>of Moody's<br/>Investors Service
              </div>
            </div>
          </div>

          {/* Divider line for desktop */}
          <div className="hidden lg:block w-px h-8 bg-white/10" />

          {/* Green Verifier block */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="text-[#81C34D] font-bold text-xs uppercase tracking-wider font-mono whitespace-nowrap">Green Verifier</span>
            <div className="flex flex-col gap-1 sm:border-l sm:border-white/20 sm:pl-6 text-left">
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-[2px] w-3 h-3 shrink-0">
                  <div className="bg-[#009FD4] rounded-sm" />
                  <div className="bg-[#81C34D] rounded-sm" />
                  <div className="bg-gray-500 rounded-sm" />
                  <div className="bg-[#009FD4] rounded-sm" />
                </div>
                <span className="text-white font-extrabold text-xl tracking-tight leading-none">Agusto&Co.</span>
              </div>
              <div className="text-[8px] text-gray-400 italic ml-5 font-mono mt-0.5 whitespace-nowrap">
                Research, Credit Ratings, Risk Management
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Testimonial & Visual Showcase */}
      <section id="media" className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 text-left">
            <div>
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.25em] font-mono block mb-2">
                Stakeholder testimonials &amp; proof
              </span>
              <h2 className="text-3xl font-bold font-sans text-brand-dark tracking-tight leading-tight">
                Community voices &amp; <span className="text-[#7C9590]">project progress</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto">
            {project.videos && project.videos.length > 0 ? (
              project.videos.map((vid, idx) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                  className="group flex flex-col border border-gray-100 rounded-[6px] overflow-hidden bg-white shadow-sm"
                >
                  <div className="relative aspect-video bg-[#051F1A] overflow-hidden">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?rel=0`}
                      title={vid.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-0 text-left">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-brand-primary font-mono mb-1">
                      {vid.category}
                    </span>
                    <h3 className="text-[#051F1A] text-sm font-bold font-sans mb-3 leading-snug">
                      {vid.title}
                    </h3>
                    <div className="flex justify-between border-t border-gray-100 pt-2.5">
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Location</span>
                      <span className="text-[10px] font-bold font-mono text-[#051F1A] text-right">{project.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col border border-gray-100 rounded-[6px] overflow-hidden bg-white col-span-2"
              >
                <div className="relative aspect-video bg-[#051F1A] overflow-hidden">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/l2OgF8FDHq0?rel=0"
                    title="CFBF Clean Energy Infrastructure Showcase"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </motion.div>
            )}
          </div>        </div>
      </section>

      {/* Section 7: Project Gallery Section */}
      <section 
        id="gallery"
        className="bg-[#F3FAF6] py-20 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-85px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 text-left"
          >
            <div>
              <span className="text-[10px] font-bold text-[#00A788] uppercase tracking-[0.2em] font-mono block mb-2">Visual portfolio</span>
              <h2 className="text-3xl font-bold font-sans text-[#051F1A] tracking-tight leading-tight">
                Shaping a more <span className="text-[#7C9590]">sustainable tomorrow</span>
              </h2>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setHoveredGalleryIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length)}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-[#00A788] flex items-center justify-center text-gray-500 hover:text-[#00A788] transition-all duration-300 focus:outline-none interactive shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setHoveredGalleryIndex(prev => (prev + 1) % project.gallery.length)}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-[#00A788] flex items-center justify-center text-gray-500 hover:text-[#00A788] transition-all duration-300 focus:outline-none interactive shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center mb-10 pt-4">
            {project.gallery.map((item, idx) => {
              const isActive = hoveredGalleryIndex === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setHoveredGalleryIndex(idx)}
                  className={`cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden relative ${
                    isActive 
                      ? 'scale-[1.04] -translate-y-3 shadow-[0_20px_40px_rgba(0,167,136,0.15)] border border-[#00A788]/20' 
                      : 'opacity-60 hover:opacity-95 scale-[0.96] border border-transparent'
                  }`}
                  style={{ borderRadius: isActive ? '1rem' : '0.75rem' }}
                >
                  <div className="aspect-[4/3] w-full bg-gray-100 relative">
                    <img 
                      src={item.image} 
                      alt={`Gallery item ${idx + 1}`} 
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isActive ? 'filter-none' : 'filter grayscale'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200/60 pt-6 gap-4">
            <div className="flex items-center gap-3 flex-1 text-center md:text-left">
              <CheckCircle size={18} className="text-[#00A788] shrink-0 mx-auto md:mx-0" />
              <p className="text-sm font-sans text-gray-600 max-w-xl">
                {project.gallery[hoveredGalleryIndex]?.caption}
              </p>
            </div>

            <div className="flex items-center gap-6 min-w-[200px] justify-end">
              <div className="flex gap-1.5 h-1 w-24">
                {project.gallery.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setHoveredGalleryIndex(idx)}
                    className={`h-full rounded-full transition-all duration-500 flex-1 focus:outline-none ${
                      hoveredGalleryIndex === idx ? 'bg-[#00A788]' : 'bg-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm font-mono text-gray-500">
                <strong className="text-[#051F1A] font-sans">{hoveredGalleryIndex + 1}</strong> / {project.gallery.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Navigator Strip */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 border-t border-gray-200">
        <div className="flex items-center justify-between gap-4">
          <Link 
            href={`/projects/${prevId}`}
            className="flex items-center gap-3 text-brand-dark hover:text-brand-primary group max-w-xs text-left"
          >
            <div className="w-10 h-10 rounded-full border border-gray-200 hover:border-brand-primary flex items-center justify-center text-gray-400 group-hover:text-brand-primary transition-colors shrink-0">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <div className="hidden md:block leading-tight text-left">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block font-mono">Previous Project</span>
              <span className="font-extrabold text-xs line-clamp-1">{projects[prevId]?.title}</span>
            </div>
          </Link>

          <Link 
            href={`/projects/${nextId}`}
            className="flex items-center gap-3 text-brand-dark hover:text-brand-primary group max-w-xs text-right"
          >
            <div className="hidden md:block leading-tight text-right">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block font-mono">Next Project</span>
              <span className="font-extrabold text-xs line-clamp-1">{projects[nextId]?.title}</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-200 hover:border-brand-primary flex items-center justify-center text-gray-400 group-hover:text-brand-primary transition-colors shrink-0">
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* SECTION 8: RELATED PROJECTS SECTION */}
      <section id="related" className="relative text-white py-24 overflow-hidden mt-0 text-left">
        {/* Low-opacity Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200" 
            alt="Background texture" 
            className="w-full h-full object-cover opacity-15 mix-blend-overlay scale-102"
          />
          {/* Dark forest green gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFDFB]/10 via-[#051F1A] to-[#02100d] z-10" />
          <div className="absolute inset-0 bg-[#051F1A]/85 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-85px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <span className="text-[10px] font-bold text-[#81C34D] uppercase tracking-[0.25em] font-mono block mb-2">Explore alternate cases</span>
              <h3 className="text-3xl font-bold font-sans text-white tracking-tight">
                Related project <span className="text-[#9BB7B1]">commitments</span>
              </h3>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setStartIndex(prev => (prev - 1 + filteredRelated.length) % filteredRelated.length)}
                className="w-10 h-10 rounded-full border border-[#144D3F] bg-[#021814]/85 hover:border-[#81C34D] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 focus:outline-none interactive shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setStartIndex(prev => (prev + 1) % filteredRelated.length)}
                className="w-10 h-10 rounded-full border border-[#144D3F] bg-[#021814]/85 hover:border-[#81C34D] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 focus:outline-none interactive shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Grid showing 2 related vertical cards side-by-side */}
          <div className="grid md:grid-cols-2 gap-8 min-h-[460px]">
            <AnimatePresence mode="wait">
              {displayedRelated.map(rp => {
                if (!rp) return null;
                return (
                  <motion.div 
                    key={rp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#021814]/90 border border-[#144D3F] rounded-[6px] overflow-hidden shadow-xl text-white flex flex-col justify-between h-full text-left"
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between p-5 border-b border-[#144D3F]/50 bg-[#03241D]/30">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#81C34D] font-mono bg-[#03241D] border border-[#1E5E4E] px-2.5 py-0.5 rounded-[6px] font-bold">/ {rp.id}</span>
                        <Link 
                          href={`/projects/${rp.id}`}
                          className="font-extrabold text-sm text-[#81C34D] hover:text-white transition-colors leading-tight font-sans cursor-pointer"
                        >
                          {rp.title}
                        </Link>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2 shrink-0">
                        <span className="font-semibold">{rp.location.split(',')[0].toUpperCase()}</span>
                        <span>•</span>
                        <span className="font-mono">{rp.capacity}</span>
                      </div>
                    </div>

                    {/* Vertical Card Body */}
                    <div className="flex flex-col">
                      {/* Image at top of details */}
                      <div className="w-full h-48 border-b border-[#144D3F]/40 overflow-hidden relative">
                        <img src={rp.image} alt={rp.title} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Details underneath */}
                      <div className="p-5 flex flex-col justify-between space-y-4">
                        <div>
                          <h5 className="text-[10px] font-bold text-[#81C34D] uppercase tracking-widest mb-1.5 font-mono">Challenge & Solution</h5>
                          <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 font-sans font-light">
                            {rp.problem}
                          </p>
                        </div>
                        
                        {/* Specs info grid */}
                        <div className="grid grid-cols-2 gap-3 border border-[#143c33] bg-[#021814]/60 backdrop-blur-md rounded-[6px] p-3 text-[10px] font-sans">
                          <div>
                            <span className="text-gray-500 block uppercase font-bold text-[8px] font-mono tracking-wider">Financial Close</span>
                            <span className="text-white font-extrabold font-mono">{rp.year.split(' ').pop()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block uppercase font-bold text-[8px] font-mono tracking-wider">Private Capital</span>
                            <span className="text-[#81C34D] font-extrabold font-mono">{rp.capital}</span>
                          </div>
                        </div>

                        {/* SDG Icons */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {getProjectSDGs(rp.id).map(sdgNum => {
                            const sdg = SDG_INFO[sdgNum as keyof typeof SDG_INFO];
                            if (!sdg) return null;
                            return (
                              <div 
                                key={sdgNum} 
                                className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[8px] font-bold uppercase tracking-wider ${sdg.textClass}`}
                              >
                                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: sdg.color }} />
                                SDG {sdgNum}
                              </div>
                            );
                          })}
                        </div>

                        <Link 
                          href={`/projects/${rp.id}`}
                          className="self-start flex items-center gap-1.5 text-[10px] font-bold text-[#81C34D] border-b border-[#81C34D]/30 pb-0.5 hover:border-[#81C34D] hover:text-white transition-all uppercase tracking-wider mt-2 focus:outline-none interactive"
                        >
                          Explore Project Details ↗
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contextual Eligibility/Contact CTA Banner */}
      <section className="py-24 bg-[#02100d] text-white relative border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="min-h-[380px] relative flex items-center justify-center group overflow-hidden rounded-[8px] border border-white/5 shadow-2xl">
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop"
              alt="CFBF Financing background"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02] pointer-events-none select-none"
            />
            {/* Dark overlay matching about page */}
            <div className="absolute inset-0 bg-[#051F1A]/70 group-hover:bg-[#051F1A]/65 transition-colors pointer-events-none z-10" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-20 text-center max-w-3xl px-6 flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#81C34D]/10 border border-[#81C34D]/20 flex items-center justify-center mb-6 text-[#81C34D]">
                <ShieldCheck size={24} />
              </div>

              <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block font-mono">Developer pipeline</span>
              <h3 className="text-white text-3xl font-bold font-sans mb-4 leading-tight">
                Ready to scale your <span className="text-brand-accent">green infrastructure</span>?
              </h3>

              <p className="text-white/70 font-sans text-xs md:text-sm leading-relaxed mb-8 max-w-xl font-light">
                CFBF provides subordinated debt and credit wraps to de-risk local currency financing. Check if your project meets our qualification standards or connect directly with our intake team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
                <Link
                  href="/eligibility"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#81C34D] text-[#051F1A] hover:bg-white hover:text-brand-dark px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans shadow-lg focus:outline-none"
                >
                  Check Eligibility <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-[#81C34D] hover:bg-[#81C34D] hover:text-[#051F1A] text-white px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans focus:outline-none"
                >
                  Contact Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
