"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export interface HeroCardData {
  title: string;
  desc: string;
}

interface InnerPageHeroProps {
  title: React.ReactNode;
  subtitle: string;
  bgImage: string;
  cards?: [HeroCardData, HeroCardData, HeroCardData];
  currentPage: string;
  projectTitle?: string;
  children?: React.ReactNode;
  /** Render the floating card as a solid white panel with dark content (instead of glassmorphism). */
  lightPanel?: boolean;
}

export default function InnerPageHero({ title, subtitle, bgImage, cards, currentPage, projectTitle, children, lightPanel = false }: InnerPageHeroProps) {
  const router = useRouter();

  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] w-full overflow-hidden bg-brand-dark flex flex-col justify-center pt-44 pb-20">
      {/* Background Banner with Parallax Zoom */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt={typeof title === 'string' ? title : "Hero Banner"} 
          className="w-full h-full object-cover opacity-75 scale-105" 
        />
        <div className="absolute inset-0 bg-[#051F1A]/60 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFDFB] via-transparent to-[#051F1A]/40 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="container mx-auto px-6 relative z-20 w-full">
        {/* Floating Glassmorphism Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full p-6 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between rounded-[6px] ${
              lightPanel
                ? 'bg-white border border-gray-100'
                : 'bg-white/[0.03] backdrop-blur-xl border border-transparent'
            }`}
          >
            {/* Breadcrumbs (lowercase, aligned inside card) */}
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-6 pb-2 border-b w-full select-none ${
              lightPanel ? 'text-gray-400 border-gray-100' : 'text-gray-300 border-white/5'
            }`}>
              <button
                onClick={() => router.push('/')}
                className={`transition-colors focus:outline-none interactive lowercase font-light ${lightPanel ? 'hover:text-brand-primary' : 'hover:text-[#81C34D]'}`}
              >
                home
              </button>
              <span className={lightPanel ? 'text-gray-300' : 'text-gray-500'}>/</span>
              {currentPage === 'project-detail' ? (
                <>
                  <button
                    onClick={() => router.push('/projects')}
                    className={`transition-colors focus:outline-none interactive lowercase font-light ${lightPanel ? 'hover:text-brand-primary' : 'hover:text-[#81C34D]'}`}
                  >
                    projects
                  </button>
                  <span className={lightPanel ? 'text-gray-300' : 'text-gray-500'}>/</span>
                  <span className={`font-semibold lowercase tracking-wide ${lightPanel ? 'text-brand-primary' : 'text-[#81C34D]'}`}>
                    {projectTitle ? projectTitle.toLowerCase().split(' ')[0] : 'detail'}
                  </span>
                </>
              ) : (
                <span className={`font-semibold lowercase tracking-wide ${lightPanel ? 'text-brand-primary' : 'text-[#81C34D]'}`}>{currentPage}</span>
              )}
            </div>

            {/* Header text */}
            <div className="mb-8 text-center md:text-left">
              <span className={`text-[10px] md:text-xs font-light tracking-[0.25em] block mb-3 font-mono uppercase ${lightPanel ? 'text-brand-primary' : 'text-brand-accent'}`}>
                {subtitle}
              </span>
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-sans tracking-tight ${lightPanel ? 'text-brand-dark' : 'text-white'}`}>
                {title}
              </h1>
            </div>

            {/* Render children custom component (such as carousels or image previews) or fallback to static cards */}
            {children ? (
              children
            ) : (
              cards && (
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  {/* Card 1: Light Gray / White surface */}
                  <motion.div 
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="bg-white/95 p-5 shadow-md flex flex-col justify-between h-32 md:h-36 transition-all duration-300 group cursor-default rounded-[6px]"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-[#051F1A] font-sans leading-none tracking-tight">{cards[0].title}</h3>
                    <p className="text-[#051F1A]/70 text-xs md:text-sm leading-relaxed font-sans">{cards[0].desc}</p>
                  </motion.div>

                  {/* Card 2: Brand Cyan surface */}
                  <motion.div 
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="bg-brand-cyan p-5 shadow-md flex flex-col justify-between h-32 md:h-36 transition-all duration-300 group cursor-default rounded-[6px]"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white font-sans leading-none tracking-tight">{cards[1].title}</h3>
                    <p className="text-white/90 text-xs md:text-sm leading-relaxed font-sans font-medium">{cards[1].desc}</p>
                  </motion.div>

                  {/* Card 3: Brand Primary Green surface */}
                  <motion.div 
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="bg-brand-primary p-5 shadow-md flex flex-col justify-between h-32 md:h-36 transition-all duration-300 group cursor-default rounded-[6px]"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white font-sans leading-none tracking-tight">{cards[2].title}</h3>
                    <p className="text-white/85 text-xs md:text-sm leading-relaxed font-sans">{cards[2].desc}</p>
                  </motion.div>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
