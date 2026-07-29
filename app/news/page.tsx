"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Calendar, ArrowRight, Tag, User, ChevronLeft, ChevronRight } from 'lucide-react';
import GlassHero from '@/components/GlassHero';
import SectionHeader from '@/components/ui/SectionHeader';
import { newsArticles } from '@/lib/newsData';

export default function NewsArchivePage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('All');

  // Carousel slider state for inner page hero
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, newsArticles.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const categories = ['All', 'Market Insights', 'Fund Updates', 'Impact Report', 'Industry News'];
  
  const filteredArticles = activeFilter === 'All' 
    ? newsArticles 
    : newsArticles.filter(item => item.tag === activeFilter);

  const GAP = 24;
  const cardWidth = `calc((100% - ${(itemsPerPage - 1) * GAP}px) / ${itemsPerPage})`;
  const translateValue = `calc(-${currentIndex} * (${cardWidth} + ${GAP}px))`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "News & Media | Climate Finance Blending Facility",
    "description": "Stay updated on the green transition, market insights, fund updates, and impact reports from the Climate Finance Blending Facility.",
    "url": "https://climatesupportfacility.org/news",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Climate Finance Blending Facility (CFBF)"
    }
  };

  return (
    <div className="bg-[#FAFDFB] text-brand-dark min-h-screen relative overflow-hidden">
      <title>News, insights & press releases | CFBF</title>
      <meta name="description" content="Stay updated on the green transition, market insights, and announcements from the Climate Finance Blending Facility." />

      {/* Dublin Core Hoisting */}
      <meta name="DC.title" content="News & media center - climate finance blending facility" />
      <meta name="DC.creator" content="NoLimitBuzz" />
      <meta name="DC.subject" content="Climate Finance, Green Bonds, Renewable Energy, Market Insights" />
      <meta name="DC.description" content="Insights and press releases from the Climate Finance Blending Facility." />
      <meta name="DC.publisher" content="Climate Finance Blending Facility" />
      <meta name="DC.language" content="en" />
      <meta name="DC.type" content="News Archive" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Floating Glassmorphism Hero Section (about-v2 standard) */}
      <GlassHero
        title={
          <>
            News & <span className="text-[#9BB7B1]">media center</span>
          </>
        }
        subtitle="Stay updated on the green transition"
        bgImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop"
        currentPage="news"
      >
        <motion.div
          className="w-full mt-4 flex flex-col gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(${translateValue})` }}
            >
              {newsArticles.map((article) => (
                <Link
                  href={`/news/${article.id}`}
                  key={article.id}
                  style={{ width: cardWidth }}
                  className="shrink-0 bg-white border border-gray-200/60 hover:border-brand-primary/30 shadow-sm hover:shadow-md transition-all duration-300 rounded-[6px] p-5 flex gap-4 h-40 md:h-44 cursor-pointer group select-none"
                >
                  {/* Thumbnail */}
                  <div className="w-20 md:w-24 h-full rounded-[6px] overflow-hidden shrink-0 border border-gray-100 relative bg-[#051F1A]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[9px] font-bold text-brand-primary uppercase tracking-wider font-mono">
                          {article.tag}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{article.date}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors font-sans leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-sans font-light mt-1.5 line-clamp-1 leading-relaxed hidden sm:block">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary group-hover:text-brand-dark transition-colors mt-2">
                      <span>Read Article</span>
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Slider bottom-right navigation bar */}
          <div className="flex items-center justify-between md:justify-end gap-6 mt-2 pb-2">
            {/* Progress Bar / Slider Track */}
            <div className="relative w-32 h-[3px] bg-white/25 rounded-full overflow-hidden hidden sm:block">
              <div 
                className="absolute top-0 h-full bg-[#81C34D] transition-all duration-300 rounded-full"
                style={{ 
                  left: `${maxIndex > 0 ? (currentIndex / maxIndex) * (100 - 25) : 0}%`,
                  width: '25%'
                }}
              />
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all focus:outline-none interactive ${
                  currentIndex === 0 
                    ? 'border-white/10 text-white/30 bg-white/[0.02] cursor-not-allowed' 
                    : 'border-white/35 text-white bg-white/[0.05] hover:bg-white/[0.15] hover:border-[#81C34D] hover:scale-105'
                }`}
                aria-label="Previous articles"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all focus:outline-none interactive ${
                  currentIndex >= maxIndex 
                    ? 'border-white/10 text-white/30 bg-white/[0.02] cursor-not-allowed' 
                    : 'border-white/35 text-white bg-white/[0.05] hover:bg-white/[0.15] hover:border-[#81C34D] hover:scale-105'
                }`}
                aria-label="Next articles"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </GlassHero>

      {/* Main Listing Section */}
      <div data-rag-chunk="news-archive-container" className="container mx-auto px-6 py-24 relative z-10">
        
        {/* Section Title & View Toggle */}
        <SectionHeader 
          sub="Latest Updates" 
          title="Insights, announcements and press statements" 
          activeTab={viewMode}
          onTabChange={setViewMode}
          tabs={[
            { id: 'grid', label: 'Grid View', icon: LayoutGrid },
            { id: 'list', label: 'List View', icon: List }
          ]}
          dark={false}
        />

        {/* Category Filters */}
        <div className="flex gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full border text-xs tracking-wide transition-all duration-300 font-sans whitespace-nowrap focus:outline-none interactive ${
                activeFilter === cat 
                  ? 'bg-brand-primary text-white border-brand-primary font-medium shadow-md shadow-brand-primary/10' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-brand-primary hover:text-brand-primary font-light'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Articles List / Grid Container */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
              key={`grid-${activeFilter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article, i) => (
                <Link href={`/news/${article.id}`} key={article.id} className="block h-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.05 }}
                    className="group cursor-pointer flex flex-col h-full bg-white rounded-[6px] border border-gray-200/50 hover:border-brand-primary/20 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.03)] transition-all duration-500 interactive"
                  >
                    <div className="relative h-56 overflow-hidden rounded-t-[6px] border-b border-gray-100">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-[6px] text-[10px] font-bold text-brand-primary uppercase tracking-wider shadow-sm flex items-center gap-1.5 font-sans">
                        <Tag size={10} className="text-brand-accent" />
                        {article.tag}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-gray-400 text-xs font-medium mb-3 flex items-center gap-2 font-sans">
                          <Calendar size={12} className="text-brand-accent" />
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors leading-snug font-sans line-clamp-2 tracking-tight">{article.title}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed mb-6 font-sans font-light">{article.excerpt}</p>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-brand-accent font-bold text-xs uppercase tracking-wider group-hover:text-brand-primary transition-colors font-sans">
                        <span>Read Article</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key={`list-${activeFilter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6"
            >
              {filteredArticles.map((article, i) => (
                <Link href={`/news/${article.id}`} key={article.id} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex flex-col md:flex-row gap-6 items-center bg-white border border-gray-200/50 hover:border-brand-primary/20 p-5 rounded-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.03)] transition-all cursor-pointer interactive"
                  >
                    <div className="w-full md:w-48 aspect-video md:aspect-[4/3] rounded-[6px] overflow-hidden shrink-0 border border-gray-100 relative">
                      <img 
                        src={article.image} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        alt={article.title} 
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold bg-brand-light text-brand-primary px-2.5 py-1 rounded-[6px] uppercase tracking-wider">{article.tag}</span>
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5"><Calendar size={12}/> {article.date}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-400 font-light">{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors leading-snug font-sans tracking-tight">{article.title}</h3>
                      <p className="text-gray-500 text-sm font-sans line-clamp-2 leading-relaxed font-light">{article.excerpt}</p>
                    </div>
                    <div className="hidden md:block pr-2">
                      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
                        <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform"/>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── NEXT STEPS CTA BAR (3 Columns - NO SELF LINKING) ────── */}
      <section className="pt-12 pb-6 bg-[#051F1A] text-white relative z-10 border-t border-white/5">
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
    </div>
  );
}

