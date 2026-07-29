"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { LayoutGrid, List, ArrowRight, Zap, Briefcase, Plus, Minus } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectDetails from './ProjectDetails';

interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  capital: string;
  capacity: string;
  category: string;
  image: string;
  images: string[];
  desc: string;
  problem: string;
  solution: string;
  impact: string;
}

const ProjectGridItem: React.FC<{ project: Project, index: number }> = ({ project, index }) => {
  const cardRef = useRef(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [1.1, 1.2]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onClick={() => router.push(`/projects/${project.id}`)}
      className="group relative h-[480px] rounded-[6px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 interactive border border-white/10 bg-brand-dark"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          style={{ y: imageY, scale }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-brand-dark/40 transition-colors duration-500 group-hover:bg-brand-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent opacity-100 transition-opacity duration-500" />

      <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white group-hover:bg-white group-hover:text-brand-dark group-hover:border-white transition-all duration-300 z-20">
        <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
        <div className="bg-brand-accent/20 border border-brand-accent/20 w-fit px-3 py-1 rounded-[6px] text-xs font-bold text-brand-accent mb-4 backdrop-blur-sm font-sans tracking-wider">{project.category.toUpperCase()}</div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight font-sans tracking-tight">{project.title}</h3>
        <div className="grid grid-cols-1 gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div className="flex items-center gap-3 text-gray-300 text-sm border-t border-white/10 pt-3 font-sans">
            <Briefcase size={16} className="text-brand-accent" />
            <span>{project.capital} Private Capital</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 text-sm border-t border-white/10 pt-3 font-sans">
            <Zap size={16} className="text-brand-accent" />
            <span>{project.capacity} Capacity</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState('list');
  const [filter, setFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState<string | null>('01');
  const sectionRef = useRef(null);

  const projects: Project[] = [
    {
      id: "01",
      title: "Darway Coast, Nigeria",
      location: "Rivers State",
      year: "2022",
      capital: "₦800m",
      capacity: "526KW",
      category: "Solar Grid",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"
      ],
      desc: "Providing clean energy to over 2,000 households and businesses in coastal communities.",
      problem: "Coastal communities in Rivers State lacked reliable grid connection, relying on expensive and polluting diesel generators for basic needs.",
      solution: "Deployment of a 526KW Solar Hybrid Mini-Grid with battery storage to provide 24/7 reliable power to the community.",
      impact: "Replaced 200+ diesel generators, reducing CO2 emissions by 400 tonnes annually and powering 150 SMEs."
    },
    {
      id: "02",
      title: "Hotspot Network",
      location: "Kano State",
      year: "2023",
      capital: "₦955m",
      capacity: "324KW",
      category: "Telecoms",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
      ],
      desc: "Expanding rural telephony and energy access through innovative solar-powered base stations.",
      problem: "Remote rural areas suffer from lack of connectivity and energy access, hindering economic development and social inclusion.",
      solution: "Installation of solar-powered telecommunication base stations that serve as community energy hubs.",
      impact: "Connected 50,000 people to mobile networks and provided charging services to 5,000 households."
    },
    {
      id: "03",
      title: "Prado Power Energy",
      location: "Jigawa State",
      year: "2024",
      capital: "₦1.95bn",
      capacity: "850kW",
      category: "Agro-Processing",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
      ],
      desc: "Agro-processing solar hybrid solution powering industrial growth in the northern region.",
      problem: "Post-harvest loss exceeding 40% due to lack of local power for processing and cold storage.",
      solution: "Industrial-scale solar hybrid solution tailored for agro-processing hubs.",
      impact: "Processed 5,000 tonnes of produce, creating 300 direct jobs and significantly reducing food waste."
    }
  ];

  const categories = ['All', 'Solar Grid', 'Telecoms', 'Agro-Processing'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    const nextProjects = newFilter === 'All' ? projects : projects.filter(p => p.category === newFilter);
    if (nextProjects.length > 0) {
      setExpandedProject(nextProjects[0].id);
    } else {
      setExpandedProject(null);
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-brand-dark text-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 relative z-20">
        <SectionHeader
          sub="Project Showcase"
          title="Leading with innovation in solar projects worldwide"
          activeTab={viewMode}
          onTabChange={setViewMode}
          tabs={[
            { id: 'list', label: 'List View', icon: List },
            { id: 'grid', label: 'Grid View', icon: LayoutGrid }
          ]}
          dark={true}
        />

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-6 py-2 rounded-full border text-xs tracking-wide transition-all duration-300 font-sans whitespace-nowrap ${filter === cat
                  ? 'bg-brand-accent text-brand-dark border-brand-accent font-medium shadow-lg shadow-brand-accent/20 scale-105'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-brand-accent hover:text-brand-accent font-light'
                }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key={`grid-${filter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid md:grid-cols-3 gap-8"
            >
              {filteredProjects.map((p, i) => (
                <ProjectGridItem key={p.id} project={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`list-${filter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col gap-5"
            >
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                  className={`bg-white/5 rounded-[6px] border border-white/10 shadow-sm overflow-hidden transition-all duration-300 ${expandedProject === p.id ? 'ring-1 ring-brand-accent/20 shadow-lg' : 'hover:bg-white/10 hover:border-brand-accent/30'}`}
                >
                  <div
                    onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                    className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 cursor-pointer interactive group"
                  >
                    <span className="text-xs text-brand-accent font-mono bg-brand-accent/10 px-2 py-1 rounded-[6px]">/ {p.id}</span>
                    <h3 className={`text-xl md:text-2xl font-bold flex-1 transition-colors ${expandedProject === p.id ? 'text-brand-accent' : 'text-white group-hover:text-brand-accent'}`}>
                      {p.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm text-gray-400 font-sans uppercase tracking-wider">
                      <span className="hidden md:inline">{p.location}</span>
                      <span className="hidden md:inline">•</span>
                      <span className="hidden md:inline">{p.year}</span>
                      <span className={`px-4 py-1.5 border rounded-full text-xs font-bold transition-colors ${expandedProject === p.id ? 'bg-brand-accent text-brand-dark border-brand-accent' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                        {p.category}
                      </span>
                    </div>

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${expandedProject === p.id ? 'bg-brand-accent text-brand-dark' : 'bg-white/10 text-white group-hover:bg-brand-accent group-hover:text-brand-dark'}`}>
                      {expandedProject === p.id ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {expandedProject === p.id && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="border-t border-white/10 overflow-hidden"
                      >
                        <ProjectDetails project={p} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 flex justify-center">
          <button
            onClick={() => router.push('/projects')}
            className="flex items-center gap-2 border-b border-brand-accent pb-1 text-brand-accent font-bold hover:text-white hover:border-white transition-colors font-sans interactive uppercase tracking-wider text-sm focus:outline-none"
          >
            View All Projects <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
