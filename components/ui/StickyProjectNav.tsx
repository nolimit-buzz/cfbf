"use client";

import React, { useState, useEffect } from 'react';

export default function StickyProjectNav() {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenges', label: 'Challenge & Solution' },
    { id: 'financing', label: 'Financing' },
    { id: 'structure', label: 'Structure' },
    { id: 'impact', label: 'Expected Impact' },
    { id: 'partners', label: 'Partners' },
    { id: 'media', label: 'Testimonials' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'related', label: 'Related' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 130; // accounting for header + sticky nav heights
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-[72px] z-40 bg-[#051F1A] backdrop-blur-md border-b border-white/10 py-3.5 shadow-sm transition-all select-none">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-start md:justify-center overflow-x-auto gap-6 md:gap-10 scrollbar-none">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 pb-1.5 border-b-2 font-mono whitespace-nowrap focus:outline-none ${
              activeSection === item.id 
                ? 'text-[#00A788] border-[#00A788]' 
                : 'text-white/40 border-transparent hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
