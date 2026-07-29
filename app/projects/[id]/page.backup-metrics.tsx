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
  Users
} from 'lucide-react';
import InnerPageHero, { HeroCardData } from '../../../components/InnerPageHero';
import ProjectBentoMetric from '../../../components/ui/ProjectBentoMetric';
import ImpactBentoCard from '../../../components/ui/ImpactBentoCard';
import StickyProjectNav from '../../../components/ui/StickyProjectNav';
import { FSDAfricaLogo, GCRRatingsLogo, AgustoCoLogo } from '../../../components/ui/MapLogos';
// @ts-ignore
import nigeriaMapData from '@svg-maps/nigeria';

interface Project {
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
  status: string;
  image: string;
  problem: string;
  solution: string;
  impact: string;
  testimonial?: {
    name: string;
    role: string;
    quote: string;
  };
  percentages: {
    capital: number;
    capacity: number;
    connections: number;
    jobs: number;
    ghg: number;
  };
  gallery: {
    image: string;
    caption: string;
  }[];
  intro: {
    title: string;
    col1Text: string;
    col2Image: string;
    col3Image: string;
  };
  impactCard: {
    title: string;
    col1Text: string;
    col2Image: string;
    percentage: number;
    statText: string;
  };
}

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

  const projects: Record<string, Project> = {
    "01": {
      id: "01",
      title: "First Electric Power and Automation Services",
      location: "Gombe, Nasarawa & Ondo States",
      year: "Dec. 2025",
      capital: "₦1.70 Billion",
      capacity: "725KW",
      category: "Solar Grid",
      connections: "5,156 Connections",
      jobs: "616 Jobs",
      ghg: "762 Tonnes GHG/yr",
      status: "Under Construction",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
      problem: "Remote community households and local agricultural mills across Gombe, Nasarawa, and Ondo states lacked access to clean energy grid systems. Relying on kerosene lamps and polluting petroleum engines caused high fuel expenses, carbon emissions, and stagnant community business growth.",
      solution: "CFBF co-financed and de-risked First Electric’s NGN debt financing to construct a 725kWp decentralized mesh grid electricity network. Utilizing intelligent metering and decentralized solar clusters, the project connects 5,156 households and SMEs directly.",
      impact: "Replaces traditional carbon-heavy lighting sources, saves over 762 tonnes of greenhouse gas emissions annually, and stimulates local agro-rural businesses with a stable and affordable power supply.",
      percentages: { capital: 75, capacity: 60, connections: 40, jobs: 80, ghg: 45 },
      gallery: [
        { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Grid panels installed in agricultural fields across Nasarawa state." },
        { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "Rural retail shops powered for the first time by local clean energy grids." },
        { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Agro-processing machinery running continuously on decentralized solar energy." },
        { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "A local community leader validating grid stability at the central monitoring hub." }
      ],
      intro: {
        title: "Advancing Clean Energy Infrastructure Across Underserved States",
        col1Text: "To maximize rural development impact, the mesh grid electricity model is co-financed with first-loss credit guarantees to absorb developer risk and unlock domestic institutional pensions.",
        col2Image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600",
        col3Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600"
      },
      impactCard: {
        title: "Driving Sustainable Local Growth",
        col1Text: "Expanding Clean Grid Capacity. Resolving initial connection bottlenecks and establishing smart meters ensures sustainable regional collections and resource security.",
        col2Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
        percentage: 80,
        statText: "80% of connected agricultural processors reported a doubling of monthly crop processing output."
      }
    },
    "02": {
      id: "02",
      title: "CEESOLAR Energy Limited",
      location: "Cross River State",
      year: "Nov. 2025",
      capital: "₦1.70 Billion",
      capacity: "760KW",
      category: "Solar Grid",
      connections: "3,597 Connections",
      jobs: "561 Jobs",
      ghg: "737 Tonnes GHG/yr",
      status: "Under Construction",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
      problem: "Rurally isolated farming communities in Cross River state had zero electricity connections. Small businesses suffered from irregular operations, and cocoa drying was dependent on firewood combustion, causing regional deforestation.",
      solution: "Blending First-Loss subordinated capital with local currency debt guarantees enabled CEESOLAR to access long-tenor financing. The funds are deployed to construct 760kWp solar-hybrid mini-grids in four rural farming communities.",
      impact: "Provides clean energy access to 3,597 residential and retail connections, replaces wood-burning agricultural processing dryer systems, and creates 561 jobs.",
      percentages: { capital: 75, capacity: 55, connections: 35, jobs: 75, ghg: 40 },
      gallery: [
        { image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600", caption: "High-voltage battery packs stored in the central Cross River control facility." },
        { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Solar array structures built adjacent to cocoa farming cooperatives." },
        { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Technical engineers configuring remote prepaid meters." },
        { image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600", caption: "Hybrid inverters running test loads during grid commissioning." }
      ],
      intro: {
        title: "De-risking Cocoa Farming Value Chains in Cross River",
        col1Text: "Enabling local currency finance for remote farming hubs guarantees cocoa growers access to clean thermal drying, replacing forest-destructive wood combustion.",
        col2Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600",
        col3Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600"
      },
      impactCard: {
        title: "Mitigating Deforestation Patterns",
        col1Text: "Transitioning to Clean Dehydration. Replacing open-fire wood burners with solar hybrid crop driers limits regional carbon outputs and preserves local ecology.",
        col2Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600",
        percentage: 70,
        statText: "70% reduction in local wood consumption recorded among participating cocoa cooperatives."
      }
    },
    "03": {
      id: "03",
      title: "Prado Power Energy Limited",
      location: "Akwa-Ibom & Benue States",
      year: "Oct. 2024",
      capital: "₦1.95 Billion",
      capacity: "850kW",
      category: "Agro-Processing",
      connections: "15,801 Connections",
      jobs: "740 Jobs",
      ghg: "893.5 Tonnes GHG/yr",
      status: "Under Construction",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
      problem: "Akwa-Ibom and Benue states are prime agricultural hubs, yet farmers suffered from high post-harvest losses (over 40%) due to a lack of power for cold preservation, milling, and value-addition processing.",
      solution: "Credit-enhanced green financing supported Prado Power to install a total of 850kWp capacity of solar hybrid mini-grids, directly connected to agricultural cold hubs and agro-processing equipment.",
      impact: "De-risks local food systems, extends fresh produce shelf-life, serves 15,801 connections (households and agro-processors), and cuts greenhouse gas emissions by 893 tonnes per year.",
      percentages: { capital: 80, capacity: 70, connections: 50, jobs: 85, ghg: 50 },
      gallery: [
        { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Walk-in solar cold room structures completed in Akwa-Ibom agricultural hub." },
        { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Community sorting warehouse running on stable solar-powered circuits." },
        { image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=600", caption: "Farmers inspecting crop quality under high-efficiency cooling conditions." },
        { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "Power distribution panels routing clean electricity to milling engines." }
      ],
      intro: {
        title: "Securing Agricultural Value Chains & Reducing Post-Harvest Loss",
        col1Text: "Linking cold storage hubs and solarized crop processors directly to regional farms guarantees crop preservation and elevates rural incomes.",
        col2Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
        col3Image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=600"
      },
      impactCard: {
        title: "Strengthening Rural Food Security",
        col1Text: "Providing Resilient Cooling. Sustainable refrigeration preserves crop freshness, reduces food waste metrics, and expands farmers' regional market reach.",
        col2Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600",
        percentage: 60,
        statText: "60% decrease in average post-harvest losses reported across Akwa-Ibom solar hubs."
      }
    },
    "04": {
      id: "04",
      title: "Hotspot Network Limited",
      location: "22 States in Nigeria",
      year: "Jun. 2023",
      capital: "₦955 Million",
      capacity: "324kW",
      category: "Telecoms",
      connections: "120 Sites",
      jobs: "720 Jobs",
      ghg: "8.34 Tonnes GHG/yr",
      status: "Operational",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
      problem: "Rural telecommunication towers require continuous power, but grid absence forced network operators to run dirty diesel generators 24/7. This led to high maintenance costs, frequent network downtime, and heavy local carbon emissions.",
      solution: "Hotspot Network created a special purpose vehicle, Micropolitan Mobile Connectivity Limited, raising NGN 955 million in green-certified debt capital de-risked by CFBF. The proceeds funded the solarization of 120 rural base stations in collaboration with major mobile operators.",
      impact: "Provides clean, solar-powered mobile network services across 120 remote communities. It guarantees 99.9% uptime, reduces diesel combustion, and supports 720 local maintenance jobs.",
      percentages: { capital: 100, capacity: 100, connections: 100, jobs: 100, ghg: 100 },
      gallery: [
        { image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600", caption: "Solar hybrid power plant backing up a rural telephony mast." },
        { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "Technicians mounting photovoltaic frames onto mast enclosures." },
        { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Clean hybrid battery storage bank operational on site." },
        { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "A local technician performing quarterly panel efficiency cleaning." }
      ],
      intro: {
        title: "Decarbonizing Digital Connectivity Networks Across 22 States",
        col1Text: "Replacing round-the-clock diesel fuel combustion at remote towers with high-efficiency solar-hybrid storage lowers network costs and emissions.",
        col2Image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600",
        col3Image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600"
      },
      impactCard: {
        title: "Sustaining Continuous Connectivity",
        col1Text: "Replacing Diesel Dependence. Transitioning telecom towers to solar hybrid setups prevents fuel theft disruptions and provides 99.9% network reliability.",
        col2Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
        percentage: 99,
        statText: "99.9% network uptime achieved, cutting operating expenses and generator reliance."
      }
    },
    "05": {
      id: "05",
      title: "Darway Coast Limited",
      location: "Rivers & Abia States",
      year: "Sep. 2022",
      capital: "₦800 Million",
      capacity: "526kW",
      category: "Solar Grid",
      connections: "7,711 Connections",
      jobs: "2,296 Jobs",
      ghg: "4,856 Tonnes GHG/yr",
      status: "Operational",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
      problem: "Underserved coastal and riverine communities in Rivers and Abia states suffered from absolute energy poverty. Local businesses and fishermen relied on toxic petrol generators, driving up operational costs and damaging coastal ecosystems.",
      solution: "Pioneered the first-ever green-certified blended local currency debt issue for a solar mini-grid in Nigeria. The NGN 800 million funding backed Darway Coast to build 526kWp of isolated solar mini-grids utilizing smart prepaid meters and remote disconnections.",
      impact: "Eliminated diesel generators in target locations, cutting 4,856 tonnes of CO2 emissions annually. Powered 7,711 homes and retail stores, creating 2,296 direct and indirect jobs.",
      testimonial: {
        name: "Felicia Adindu",
        role: "Small Business Owner, Akpoku Village",
        quote: "In Akpoku, we once struggled with unreliable electricity which limited our business hours. Since the solar grid arrived, our lighting costs have dropped, sales have doubled, and we can preserve our fresh goods without generator noise."
      },
      percentages: { capital: 100, capacity: 100, connections: 100, jobs: 100, ghg: 100 },
      gallery: [
        { image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600", caption: "Community members in Akpoku village accessing clean grid sockets." },
        { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Mini-grid substation panels overlooking Akpoku community boundaries." },
        { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "Smart prepayment terminals operational inside local retail shops." },
        { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "Technical training session for local mini-grid operators." }
      ],
      intro: {
        title: "Pioneering Green Blended Local Currency Bonds for Mini-Grids",
        col1Text: "Securing capital enhancement guarantees enabled a local developer to secure long-term NGN financing, bringing clean energy grids to coastal markets.",
        col2Image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600",
        col3Image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600"
      },
      impactCard: {
        title: "Transforming Coastal Economies",
        col1Text: "Replacing Petrol Generators. Phasing out small, dirty retail fuel engines lowers local merchant operating expenses and preserves coastal air quality.",
        col2Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600",
        percentage: 95,
        statText: "95% of village retail merchants reported significant operational cost reductions."
      }
    },
    "06": {
      id: "06",
      title: "ACOB Lightning Technology Limited",
      location: "Edo & Ondo States",
      year: "Dec. 2023",
      capital: "₦755 Million",
      capacity: "335kW",
      category: "Solar Grid",
      connections: "3,597 Connections",
      jobs: "868 Jobs",
      ghg: "352 Tonnes GHG/yr",
      status: "Operational",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
      problem: "Energy poverty in rural cocoa-farming communities with zero electricity access. Manual cocoa processing caused low productivity and post-harvest decay.",
      solution: "Through NGN 755 million in credit-enhanced debt finance, ACOB constructed a 335kWp solar hybrid mini-grid to power households, agricultural centers, and high-efficiency streetlights.",
      impact: "Powers 3,597 connections, providing reliable energy to agro-businesses, enhancing security with solar streetlights, and preventing 352 tonnes of GHG emissions yearly.",
      percentages: { capital: 100, capacity: 100, connections: 100, jobs: 100, ghg: 100 },
      gallery: [
        { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600", caption: "High-efficiency streetlights illuminating cocoa collection points at dusk." },
        { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600", caption: "Substation site in Ondo state during peak generation hours." },
        { image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", caption: "A local cocoa processing mill running on clean smart circuits." },
        { image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600", caption: "Resident families experiencing modern indoor lighting solutions." }
      ],
      intro: {
        title: "Lighting Up Agricultural Villages & Securing Cocoa Centers",
        col1Text: "Deploying credit-enhanced funding backed the creation of stable micro-power grids to run cocoa sorting machines and public streetlights.",
        col2Image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600",
        col3Image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600"
      },
      impactCard: {
        title: "Enhancing Rural Quality of Life",
        col1Text: "Activating Streetlights. Installing smart, solar-powered streetlights provides security, extends business hours, and supports village assembly points.",
        col2Image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600",
        percentage: 100,
        statText: "100% of target village centers now benefit from operational solar street lighting."
      }
    }
  };

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

  const heroCards: [HeroCardData, HeroCardData, HeroCardData] = [
    {
      title: project.capital,
      desc: "Capital mobilized via co-financing."
    },
    {
      title: project.capacity,
      desc: "Installed green power capacity."
    },
    {
      title: project.connections,
      desc: "Connected households & SMEs."
    }
  ];

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative overflow-x-clip font-sans pb-0 text-left">
      {/* Decorative radial glows */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Glassmorphism Hero Section */}
      <InnerPageHero 
        title={project.title} 
        subtitle={`PROJECT CASE STUDY: / ${project.id}`} 
        bgImage={project.image}
        cards={heroCards}
        currentPage="project-detail"
        projectTitle={project.title}
      />

      {/* Sticky Project Nav for quick section links */}
      <StickyProjectNav />

      {/* Main page content container */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* Project Header Info */}
        <div className="max-w-4xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-sans border border-brand-primary/20">
                {project.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans border ${
                project.status === 'Operational' ? 'bg-green-500/10 text-green-700 border-green-500/20' : 'bg-orange-500/10 text-orange-700 border-orange-500/20'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="flex items-center gap-2 text-gray-500 font-sans text-sm">
              <MapPin size={16} className="text-brand-primary" />
              {project.location}
            </p>
          </div>
        </div>

        {/* Dynamic Targets Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-16">
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
        </div>
      </div>

      {/* Section 1: Project Intro (Specs Table & Interactive Map side-by-side) */}
      <section id="overview" className="bg-[#051F1A] text-white py-12 border-y border-[#144D3F]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#144D3F_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-85px" }}
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
      <section id="challenges" className="bg-[#FAFDFB] text-[#051F1A] py-24 border-y border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2f0ea_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 rounded-[6px] overflow-hidden border border-gray-200 shadow-xl w-full min-h-[400px] lg:min-h-full"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Right Information Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
                <div className="grid grid-cols-2 gap-6 border border-gray-200/80 bg-[#F3FAF6] rounded-[6px] p-6 text-sm font-sans mt-8 shadow-sm">
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

      {/* Section 3: Illustrative Transaction Structure */}
      <section id="structure" className="bg-white pt-20 pb-0 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <span className="text-[10px] font-bold text-[#00A788] uppercase tracking-[0.25em] font-mono block mb-2">
            Finance Architecture
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
      <section id="impact" className="py-24 bg-[#051F1A] border-t border-[#144D3F]/30 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Top Title Section */}
          <div className="max-w-4xl mb-16 border-l-4 border-[#81C34D] pl-5 text-left">
            <span className="text-[10px] font-bold text-[#81C34D] uppercase tracking-[0.25em] block mb-2 font-mono">
              Development Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-white tracking-tight leading-tight">
              A holistic approach to <span className="text-[#9BB7B1]">clean energy infrastructure & resilience</span>
            </h2>
            <p className="text-gray-300 font-sans font-light leading-relaxed text-sm md:text-base mt-4 max-w-3xl whitespace-pre-line">
              {getExpectedImpactText(project)}
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

        </div>
      </section>

      {/* Section 5: Technical Assistance Support */}
      <section id="partners" className="bg-[#FAFDFB] border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-10">
            <span className="text-[10px] font-extrabold text-[#00A788] uppercase tracking-[0.3em] font-mono block">
              Technical assistance support
            </span>
          </div>

          <div className="flex flex-col gap-8 bg-[#F4F8F6] rounded-[6px] border border-gray-200/60 overflow-hidden shadow-sm">
            {/* Top row: FSD Africa */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 border-b border-gray-200/50 bg-[#FAFDFB]/40">
              <FSDAfricaLogo />
              <div className="hidden md:block h-12 w-px bg-gray-200" />
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-sans font-light text-center md:text-left max-w-xl">
                funded the upfront due diligence costs for the Project through its technical assistance facility for climate aligned infrastructure bonds established with InfraCredit
              </p>
            </div>

            {/* Bottom row: Rating Agency & Green Verifier */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-0 p-6 md:p-8 bg-[#F4F8F6]">
              {/* Rating Agency */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:border-r border-gray-200/60 md:pr-8">
                <span className="text-xs font-bold text-[#19486A] uppercase tracking-wider font-mono sm:min-w-[100px] text-center sm:text-right">
                  Rating Agency
                </span>
                <div className="h-px w-8 sm:h-8 sm:w-px bg-gray-200 hidden sm:block" />
                <GCRRatingsLogo />
              </div>

              {/* Green Verifier */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:pl-8">
                <span className="text-xs font-bold text-[#19486A] uppercase tracking-wider font-mono sm:min-w-[100px] text-center sm:text-right">
                  Green Verifier
                </span>
                <div className="h-px w-8 sm:h-8 sm:w-px bg-gray-200 hidden sm:block" />
                <AgustoCoLogo />
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
                Stakeholder testimonials & proof
              </span>
              <h2 className="text-3xl font-bold font-sans text-brand-dark tracking-tight leading-tight">
                Community voices & <span className="text-[#7C9590]">project progress</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto">
            {/* Video Card 1: Localized local background videos */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[6px] overflow-hidden aspect-video shadow-xl border border-gray-200 bg-black group"
            >
              <video 
                src="/videos/solar-panels.mp4"
                className="w-full h-full object-cover opacity-80 animate-fade-in"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 flex flex-col justify-between p-6">
                <div>
                  <span className="bg-[#81C34D]/25 border border-[#81C34D]/30 backdrop-blur-md text-[#81C34D] text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full font-mono">
                    Community Interview
                  </span>
                </div>
                
                <div className="space-y-2 text-left">
                  {project.testimonial ? (
                    <>
                      <p className="text-white text-xs md:text-sm font-serif italic leading-relaxed">
                        "{project.testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3 border-t border-white/20 pt-2">
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-[#81C34D] font-sans">{project.testimonial.name}</span>
                          <span className="text-[8px] text-gray-300 font-mono uppercase tracking-widest">{project.testimonial.role}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-white text-xs md:text-sm font-serif italic leading-relaxed">
                        "The stable power connection from the mini-grid has unlocked retail operations and boosted household lighting security."
                      </p>
                      <div className="flex items-center gap-3 border-t border-white/20 pt-2">
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-[#81C34D] font-sans">Local Retail Merchant</span>
                          <span className="text-[8px] text-gray-300 font-mono uppercase tracking-widest">Community Voice</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Video Card 2: Localized verification video */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative rounded-[6px] overflow-hidden aspect-video shadow-xl border border-gray-200 bg-black group"
            >
              <video 
                src="/videos/wind-turbines.mp4"
                className="w-full h-full object-cover opacity-80 animate-fade-in"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 flex flex-col justify-between p-6">
                <div>
                  <span className="bg-[#009FD4]/25 border border-[#009FD4]/30 backdrop-blur-md text-[#009FD4] text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full font-mono">
                    Project Verification
                  </span>
                </div>
                
                <div className="space-y-2 text-left">
                  <p className="text-white text-xs md:text-sm font-serif italic leading-relaxed">
                    "{project.impactCard.col1Text}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/20 pt-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-[#009FD4] font-sans">Metrics & Footprint</span>
                      <span className="text-[8px] text-gray-300 font-mono uppercase tracking-widest">{project.impactCard.statText}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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
            viewport={{ once: true, margin: "-85px" }}
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
            viewport={{ once: true, margin: "-85px" }}
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

    </div>
  );
}
