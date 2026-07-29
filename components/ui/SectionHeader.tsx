"use client";

import React from 'react';
import { motion } from 'framer-motion';

const renderTitle = (title: React.ReactNode, dark: boolean) => {
  if (typeof title !== 'string') {
    return title;
  }

  const words = title.split(' ');
  if (words.length <= 1) {
    return title;
  }

  // Split at the last 3 words if it has more than 5 words, otherwise split at last 2 words
  // If exactly 2 words, split at last 1 word so that the first word is colored first-tone, second is colored second-tone.
  const splitIndex = words.length > 5 
    ? words.length - 3 
    : (words.length === 2 ? 1 : words.length - 2);
  
  const firstPart = words.slice(0, splitIndex).join(' ');
  const secondPart = words.slice(splitIndex).join(' ');

  const greyClass = dark ? 'text-[#9BB7B1]' : 'text-[#7C9590]';

  return (
    <>
      {firstPart}{' '}
      <span className={greyClass}>{secondPart}</span>
    </>
  );
};

export default function SectionHeader({ 
  sub, 
  title, 
  tabs = [], 
  activeTab = null, 
  onTabChange = () => {}, 
  dark = false 
}: {
  sub: string,
  title: React.ReactNode,
  tabs?: {id: string, label: string, icon?: any}[],
  activeTab?: string | null,
  onTabChange?: (id: string) => void,
  dark?: boolean
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 border-b ${dark ? 'border-white/10' : 'border-gray-100'} pb-8`}>
      <div className="mb-6 md:mb-0 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className={`h-px w-8 ${dark ? 'bg-brand-accent' : 'bg-brand-primary'}`}></div>
          <span className={`${dark ? 'text-brand-accent' : 'text-brand-primary'} text-xs font-normal tracking-[0.2em] uppercase font-sans`}>{sub}</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-3xl font-bold ${dark ? 'text-white' : 'text-brand-dark'} font-sans tracking-tight leading-tight`}
        >
          {renderTitle(title, dark)}
        </motion.h2>
      </div>

      {tabs && tabs.length > 0 && (
         <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-8 overflow-x-auto pb-2 md:pb-0 no-scrollbar"
         >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`text-sm tracking-wide transition-all duration-300 font-sans interactive relative pb-2 whitespace-nowrap flex items-center gap-2 ${
                   activeTab === tab.id 
                    ? (dark ? 'text-white font-medium' : 'text-brand-dark font-medium')
                    : (dark ? 'text-white/40 hover:text-white/70 font-normal' : 'text-gray-400 hover:text-gray-600 font-normal')
                }`}
              >
                {tab.icon && <tab.icon size={16} />}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId={`activeTabLine-${typeof title === 'string' ? title : sub}`}
                    className={`absolute bottom-0 left-0 w-full h-0.5 ${dark ? 'bg-brand-accent' : 'bg-brand-accent'}`}
                  />
                )}
              </button>
            ))}
         </motion.div>
      )}
    </div>
  );
}
