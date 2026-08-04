"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Play, Clock } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import type { StoriesSection } from '@/lib/strapi-types';

type StoriesProps = Omit<StoriesSection, '__component'>;

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: EASE, delay },
});

/** View-toggle icons are presentational; the CMS only supplies tabId + label. */
const VIEW_TAB_ICONS: Record<string, React.ElementType> = {
  card: LayoutGrid,
  list: List,
};

export default function FeaturedStories({
  eyebrow,
  heading,
  roleLabel,
  locationLabel,
  typeLabel,
  viewTabs = [],
  stories = [],
}: StoriesProps) {
  const [viewMode, setViewMode] = useState(viewTabs[0]?.tabId ?? 'card');

  return (
    <section className="py-24 bg-white">
      <motion.div {...fadeUp(0)} className="container mx-auto px-6">
        <SectionHeader
          sub={eyebrow ?? ""}
          title={heading ?? ""}
          activeTab={viewMode}
          onTabChange={setViewMode}
          tabs={viewTabs.map((tab, idx) => ({
            id: tab.tabId ?? String(idx),
            label: tab.label ?? '',
            icon: VIEW_TAB_ICONS[tab.tabId ?? ''] ?? LayoutGrid
          }))}
        />

        <AnimatePresence mode="wait">
          {viewMode === 'card' ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {stories.map((story, i) => {
                const badgeColor = i === 0 
                  ? "text-[#81C34D] bg-[#81C34D]/25 border-[#81C34D]/30" 
                  : i === 1 
                    ? "text-[#009FD4] bg-[#009FD4]/25 border-[#009FD4]/30" 
                    : "text-[#00A788] bg-[#00A788]/25 border-[#00A788]/30";
                
                const playBg = i === 0 ? "bg-[#81C34D]" : i === 1 ? "bg-[#009FD4]" : "bg-[#00A788]";
                const topicColor = i === 0 ? "text-[#81C34D]" : i === 1 ? "text-[#009FD4]" : "text-[#00A788]";
                
                return (
                  <div key={i} className="group cursor-pointer flex flex-col border border-gray-100 rounded-[6px] overflow-hidden bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.025)] hover:border-gray-200 text-left">
                    {/* Media area */}
                    <div className="relative aspect-video bg-[#051F1A] overflow-hidden">
                      <img
                        src={story.image}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        alt={story.image_alt_text ?? ""}
                      />
                      {/* Play button – top-right */}
                      <div className={`absolute top-3 right-3 w-8 h-8 rounded-[4px] flex items-center justify-center ${playBg} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                          <polygon points="3,2 12,7 3,12" fill={i === 0 ? "#051F1A" : "white"} />
                        </svg>
                      </div>
                      {/* Category badge bottom-left */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`backdrop-blur-md text-xs font-bold tracking-wider uppercase px-3 py-0.5 rounded-full font-mono border ${badgeColor}`}>
                          {story.badge}
                        </span>
                      </div>
                    </div>
                    {/* Metadata details */}
                    <div className="p-4 flex flex-col gap-0 text-left flex-1 justify-between">
                      <h3 className="text-[#051F1A] text-base font-bold font-sans mb-2 leading-snug group-hover:text-opacity-80 transition-colors min-h-[48px] line-clamp-2">
                        {story.title}
                      </h3>
                      
                      <div className="space-y-0">
                        <div className="flex justify-between border-t border-gray-100 py-1.5">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{roleLabel}</span>
                          <span className="text-xs font-bold font-mono text-[#051F1A]">{story.role}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-100 py-1.5">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{locationLabel}</span>
                          <span className="text-xs font-bold font-mono text-[#051F1A]">{story.location}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-100 py-1.5">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{typeLabel}</span>
                          <span className={`text-xs font-bold font-mono ${topicColor}`}>{story.storyType}</span>
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
              {stories.map((story, i) => {
                const badgeColor = i === 0 
                  ? "text-[#81C34D] bg-[#81C34D]/25 border-[#81C34D]/30" 
                  : i === 1 
                    ? "text-[#009FD4] bg-[#009FD4]/25 border-[#009FD4]/30" 
                    : "text-[#00A788] bg-[#00A788]/25 border-[#00A788]/30";
                
                const playBg = i === 0 ? "bg-[#81C34D]" : i === 1 ? "bg-[#009FD4]" : "bg-[#00A788]";
                const topicColor = i === 0 ? "text-[#81C34D]" : i === 1 ? "text-[#009FD4]" : "text-[#00A788]";

                return (
                  <div key={i} className="group flex flex-col md:flex-row gap-6 bg-white border border-gray-100 p-4 rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.025)] hover:border-gray-200 transition-all duration-300 cursor-pointer text-left">
                    {/* Media area */}
                    <div className="w-full md:w-48 aspect-video rounded-[6px] overflow-hidden shrink-0 relative bg-[#051F1A]">
                      <img src={story.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" alt={story.image_alt_text ?? ""} />
                      {/* Play button – top-right */}
                      <div className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-[4px] flex items-center justify-center ${playBg} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                        <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
                          <polygon points="3,2 12,7 3,12" fill={i === 0 ? "#051F1A" : "white"} />
                        </svg>
                      </div>
                      {/* Category badge bottom-left */}
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className={`backdrop-blur-md text-xs font-bold tracking-wider uppercase px-3 py-0.5 rounded-full font-mono border ${badgeColor}`}>
                          {story.badge}
                        </span>
                      </div>
                    </div>
                    {/* Content area */}
                    <div className="flex-1 flex flex-col justify-between py-0.5 text-left">
                      <div>
                        <h3 className="text-base font-bold text-[#051F1A] mb-1 group-hover:text-opacity-80 transition-colors leading-snug">
                          {story.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light mb-3 line-clamp-1">{story.excerpt}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-3">
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-0.5">{roleLabel}</span>
                          <span className="text-xs font-bold font-mono text-[#051F1A]">{story.role}</span>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-0.5">{locationLabel}</span>
                          <span className="text-xs font-bold font-mono text-[#051F1A]">{story.location}</span>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-0.5">{typeLabel}</span>
                          <span className={`text-xs font-bold font-mono ${topicColor}`}>{story.storyType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
