"use client";

import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'mandate',   label: 'Mandate'          },
  { id: 'market',    label: 'Market Thesis'     },
  { id: 'framework', label: 'Framework'         },
  { id: 'partners',  label: 'Partners'          },
  { id: 'milestones',label: 'Milestones'        },
  { id: 'audience',  label: 'Who We Serve'      },
];

export default function StickyAboutNav() {
  const [activeSection, setActiveSection] = useState('mandate');

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 130;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 shadow-sm transition-all select-none">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-start md:justify-center overflow-x-auto gap-6 md:gap-10 scrollbar-none">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 pb-1.5 border-b-2 font-mono whitespace-nowrap focus:outline-none ${
              activeSection === item.id
                ? 'text-[#00A788] border-[#00A788]'
                : 'text-gray-400 border-transparent hover:text-[#051F1A]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
