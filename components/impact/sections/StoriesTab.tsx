"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, LayoutGrid, List, ArrowRight } from 'lucide-react';

import type { StoriesTabSection, StoryItem } from '@/lib/strapi-impact-types';

type StoriesTabProps = Omit<StoriesTabSection, '__component'> & {
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  visibleStories: number;
  onShowAll: () => void;
  onSelectVideo: (story: StoryItem) => void;
};

/**
 * Cards cycle through three accent colours by position — a visual rhythm, not
 * an attribute of the story, so it is derived from the index rather than
 * authored.
 */
const ACCENTS = [
  { badge: 'text-[#81C34D] bg-[#81C34D]/10 border-[#81C34D]/25', play: 'bg-[#81C34D]', topic: 'text-[#81C34D]', playFill: '#051F1A' },
  { badge: 'text-[#009FD4] bg-[#009FD4]/10 border-[#009FD4]/25', play: 'bg-[#009FD4]', topic: 'text-[#009FD4]', playFill: 'white' },
  { badge: 'text-[#00A788] bg-[#00A788]/10 border-[#00A788]/25', play: 'bg-[#00A788]', topic: 'text-[#00A788]', playFill: 'white' },
];

export default function StoriesTab({
  countPrefix,
  countMiddle,
  countSuffix,
  viewMoreLabel,
  roleLabel,
  locationLabel,
  typeLabel,
  stories,
  viewMode,
  onViewModeChange,
  visibleStories,
  onShowAll,
  onSelectVideo,
}: StoriesTabProps) {
  const items = stories ?? [];
  const shown = items.slice(0, visibleStories);

  return (
    <div>
      {/* View mode buttons & info row */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-gray-400 font-sans font-light">
          {countPrefix} {Math.min(visibleStories, items.length)} {countMiddle} {items.length} {countSuffix}
        </span>
        <div className="flex items-center gap-2 rounded-full p-1 bg-white/5 border border-white/10">
          <button
            onClick={() => onViewModeChange('card')}
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
            onClick={() => onViewModeChange('list')}
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
            {shown.map((story, i) => {
              const accent = ACCENTS[i % 3];

              return (
                <div
                  key={story.id ?? i}
                  onClick={() => onSelectVideo(story)}
                  className="group cursor-pointer flex flex-col border border-white/10 rounded-[6px] overflow-hidden bg-white/[0.02] hover:-translate-y-0.5 transition-all duration-300 hover:border-white/20 text-left"
                >
                  {/* Media area */}
                  <div className="relative aspect-video bg-[#051F1A] overflow-hidden">
                    <img
                      src={story.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      alt={story.image_alt_text ?? story.title ?? ''}
                    />
                    {/* Play button */}
                    <div className={`absolute top-4 right-4 w-10 h-10 rounded-[6px] flex items-center justify-center ${accent.play} group-hover:scale-105 transition-transform duration-300`}>
                      <Play size={14} fill={accent.playFill} stroke="none" className="ml-0.5" />
                    </div>
                    {/* Category badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`backdrop-blur-md text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full font-mono border ${accent.badge}`}>
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
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{roleLabel}</span>
                        <span className="text-[9px] font-bold font-mono text-white">{story.role}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 py-2">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{locationLabel}</span>
                        <span className="text-[9px] font-bold font-mono text-white">{story.location}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 py-2">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{typeLabel}</span>
                        <span className={`text-[9px] font-bold font-mono ${accent.topic}`}>{story.type}</span>
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
            {shown.map((story, i) => {
              const accent = ACCENTS[i % 3];

              return (
                <div
                  key={story.id ?? i}
                  onClick={() => onSelectVideo(story)}
                  className="group flex flex-col md:flex-row gap-6 bg-white/[0.02] border border-white/10 p-4 rounded-[8px] hover:border-white/20 transition-all duration-300 cursor-pointer text-left"
                >
                  {/* Media area */}
                  <div className="w-full md:w-48 aspect-video rounded-[6px] overflow-hidden shrink-0 relative bg-[#051F1A]">
                    <img
                      src={story.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      alt={story.image_alt_text ?? story.title ?? ''}
                    />
                    {/* Play button */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-[4px] flex items-center justify-center bg-white/20 group-hover:scale-105 transition-transform duration-300">
                      <Play size={12} fill="white" stroke="none" className="ml-0.5" />
                    </div>
                    {/* Category badge */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className={`backdrop-blur-md text-[8px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full font-mono border ${accent.badge}`}>
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
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5">{roleLabel}</span>
                        <span className="text-[9px] font-bold font-mono text-white">{story.role}</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5">{locationLabel}</span>
                        <span className="text-[9px] font-bold font-mono text-white">{story.location}</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5">{typeLabel}</span>
                        <span className={`text-[9px] font-bold font-mono ${accent.topic}`}>{story.type}</span>
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
      {visibleStories < items.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={onShowAll}
            className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-brand-accent text-white hover:text-brand-accent px-8 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider transition-all duration-300 interactive font-sans select-none focus:outline-none bg-white/[0.02]"
          >
            {viewMoreLabel} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
