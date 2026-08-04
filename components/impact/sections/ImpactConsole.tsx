"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, BarChart3, ShieldCheck, FolderClosed } from 'lucide-react';

import type {
  AssetsTabSection,
  ImpactConsoleSection,
  InvestmentsTabSection,
  NumbersTabSection,
  StoriesTabSection,
  StoryItem,
  VideoModalSection,
} from '@/lib/strapi-impact-types';
import StoriesTab from './StoriesTab';
import NumbersTab from './NumbersTab';
import InvestmentsTab from './InvestmentsTab';
import AssetsTab from './AssetsTab';
import VideoModal from './VideoModal';

/**
 * Owns every piece of console state — the active tab, the stories view mode and
 * page size, and the video modal — so the four tab bodies and the modal are
 * rendered from here rather than as siblings in the dynamiczone. Same shape as
 * PortfolioTabs on the projects page.
 */
type ImpactConsoleProps = Omit<ImpactConsoleSection, '__component'> & {
  stories?: Omit<StoriesTabSection, '__component'>;
  numbers?: Omit<NumbersTabSection, '__component'>;
  investments?: Omit<InvestmentsTabSection, '__component'>;
  assets?: Omit<AssetsTabSection, '__component'>;
  videoModal?: Omit<VideoModalSection, '__component'>;
};

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Tab icons by position — a visual choice, so not authored in the CMS. */
const TAB_ICONS = [LayoutGrid, BarChart3, ShieldCheck, FolderClosed];

/** How many stories are shown before "View more". */
const INITIAL_STORIES = 3;

export default function ImpactConsole({
  eyebrow,
  headingPartOne,
  headingHighlight,
  tabs,
  stories,
  numbers,
  investments,
  assets,
  videoModal,
}: ImpactConsoleProps) {
  const searchParams = useSearchParams();
  const tabItems = tabs ?? [];

  const [activeImpactTab, setActiveImpactTab] = useState<string>(tabItems[0]?.tabId ?? 'stories');
  const [viewMode, setViewMode] = useState('card');
  const [visibleStories, setVisibleStories] = useState(INITIAL_STORIES);
  const [selectedVideo, setSelectedVideo] = useState<{ url?: string; title?: string } | null>(null);

  const storyItems = stories?.stories ?? [];

  // Auto-play modal trigger via search param (/impact?play=2). Depends on the
  // section prop rather than the `?? []` fallback, which is a fresh array on
  // every render.
  useEffect(() => {
    const playParam = searchParams.get('play');
    const items = stories?.stories ?? [];
    if (playParam && items.length) {
      const story = items[Number(playParam)] ?? items[0];
      setSelectedVideo({ url: story.video, title: story.title });
    }
  }, [searchParams, stories]);

  const openVideo = (story: StoryItem) =>
    setSelectedVideo({ url: story.video, title: story.title });

  return (
    <section id="stories" className="py-24 bg-[#02100d] text-white relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[1280px]">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b border-white/10 pb-8 gap-6">
          <div>
            <span className="text-brand-accent text-xs font-semibold tracking-[0.2em] uppercase font-mono block mb-2">
              {eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-sans tracking-tight leading-tight">
              {headingPartOne}<span className="text-[#9BB7B1]">{headingHighlight}</span>
            </h2>
          </div>

          {/* Console Tab Buttons */}
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-2 lg:pb-0 w-full lg:w-auto">
            {tabItems.map((tab, i) => {
              const Icon = TAB_ICONS[i] ?? TAB_ICONS[0];
              const isActive = activeImpactTab === tab.tabId;

              return (
                <button
                  key={tab.id ?? i}
                  onClick={() => setActiveImpactTab(tab.tabId ?? '')}
                  className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 flex items-center gap-2 focus:outline-none whitespace-nowrap ${
                    isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300 font-normal'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                  {isActive && (
                    <motion.div layoutId="impactPageTabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent" />
                  )}
                </button>
              );
            })}
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
            {activeImpactTab === 'stories' && stories && (
              <StoriesTab
                {...stories}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                visibleStories={visibleStories}
                onShowAll={() => setVisibleStories(storyItems.length)}
                onSelectVideo={openVideo}
              />
            )}

            {activeImpactTab === 'numbers' && numbers && <NumbersTab {...numbers} />}

            {activeImpactTab === 'investments' && investments && <InvestmentsTab {...investments} />}

            {activeImpactTab === 'assets' && assets && <AssetsTab {...assets} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <VideoModal
        selected={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        nowPlayingLabel={videoModal?.nowPlayingLabel}
      />
    </section>
  );
}
