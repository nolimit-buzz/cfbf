"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Lock, Zap, BookOpen, ChevronDown, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/projectsData';
import { newsArticles } from '@/lib/newsData';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const NAV_MAX = 1280;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaOpen, setMediaOpen] = useState(false);
  const [sideOffset, setSideOffset] = useState(0);
  const pathname = usePathname();

  // Mega-menu hover handling (small close delay bridges the gap between trigger and panel)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMediaOpen(true);
  };
  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMediaOpen(false), 140);
  };
  const closeNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMediaOpen(false);
  };

  useEffect(() => {
    const update = () => setSideOffset(Math.max(0, (window.innerWidth - NAV_MAX) / 2));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  // Close the mega-menu whenever the route changes
  useEffect(() => {
    setMediaOpen(false);
  }, [pathname]);

  const navLinks: { name: string; href: string; key: string; mega?: boolean }[] = [
    { name: 'About', href: '/about', key: 'about' },
    { name: 'Projects', href: '/projects', key: 'projects' },
    { name: 'Impact', href: '/impact', key: 'impact' },
    { name: 'Eligibility', href: '/eligibility', key: 'eligibility' },
    { name: 'Media', href: '/news', key: 'news', mega: true },
    { name: 'How It Works', href: '/how-it-works', key: 'how-it-works' },
    { name: 'Contact', href: '/contact', key: 'contact' },
  ];

  const getActivePage = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/projects')) return 'projects';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/impact')) return 'impact';
    if (pathname.startsWith('/eligibility')) return 'eligibility';
    if (pathname.startsWith('/news')) return 'news';
    if (pathname.startsWith('/how-it-works')) return 'how-it-works';
    if (pathname.startsWith('/contact')) return 'contact';
    return '';
  };

  const activePage = getActivePage();
  // The nav is transparent over dark heroes; it turns into the white slab when scrolled OR when the
  // mega-menu is open (hover). `solid` drives every visual; `isWhite` keeps the logo/menu dark.
  const solid = scrolled || mediaOpen;
  const isWhite = solid;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="relative" onMouseLeave={closeMega}>

      {/* ── Animated background slab ── */}
      <motion.div
        className={`absolute inset-0 border-b pointer-events-none ${solid ? 'backdrop-blur-md' : ''}`}
        animate={{
          left: solid ? 0 : sideOffset,
          right: solid ? 0 : sideOffset,
          backgroundColor: solid ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0)',
          borderColor: solid ? 'rgba(229,231,235,1)' : 'rgba(255,255,255,0.01)',
          boxShadow: solid ? '0 4px 24px rgba(0,0,0,0.05)' : '0 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {/* ── Nav content ── */}
      <motion.div
        className="relative z-10 max-w-[1280px] mx-auto flex items-center justify-between px-6 pointer-events-auto"
        animate={{
          paddingTop: solid ? '12px' : '20px',
          paddingBottom: solid ? '12px' : '20px',
        }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center group relative z-50 focus:outline-none interactive shrink-0"
        >
          <img
            src={
              isWhite
                ? 'https://infracredit.ng/climate-facility/wp-content/uploads/2022/09/Climate-Facility.svg'
                : 'https://infracredit.ng/climate-facility/wp-content/uploads/2022/09/climate-white-logo.svg'
            }
            alt="CFBF Logo"
            className="h-8 md:h-10 lg:h-12 max-w-[160px] md:max-w-[180px] lg:max-w-none w-auto object-contain transition-opacity duration-300"
          />
        </Link>

        {/* Desktop nav links pill */}
        <div className={`hidden md:flex items-center gap-3 lg:gap-7 px-4 lg:px-7 py-2.5 rounded-full border backdrop-blur-md transition-all duration-500 ${
          isWhite ? 'bg-brand-dark/5 border-brand-dark/5' : 'bg-white/5 border-white/5'
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={link.mega ? openMega : closeNow}
              onMouseLeave={link.mega ? closeMega : undefined}
              className={`text-xs lg:text-sm font-medium transition-colors relative group font-sans interactive focus:outline-none inline-flex items-center gap-1 ${
                isWhite
                  ? activePage === link.key ? 'text-brand-primary' : 'text-gray-600 hover:text-brand-primary'
                  : activePage === link.key ? 'text-brand-accent' : 'text-gray-300 hover:text-brand-accent'
              }`}
            >
              {link.name}
              {link.mega && (
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${mediaOpen ? 'rotate-180' : ''}`}
                />
              )}
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                isWhite ? 'bg-brand-primary' : 'bg-brand-accent'
              } ${activePage === link.key ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </div>

        {/* Desktop right icons */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setSearchOpen(true)}
            className={`p-2 transition-colors focus:outline-none interactive ${
              isWhite ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-brand-accent'
            }`}
            aria-label="Search site"
          >
            <Search size={20} />
          </button>

          <Link
            href="/funder-login"
            className={`p-2 transition-colors focus:outline-none interactive flex items-center justify-center ${
              isWhite ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-brand-accent'
            }`}
            aria-label="Funder portal"
          >
            <Lock size={20} />
          </Link>
        </div>

        {/* Mobile icons */}
        <div className="flex md:hidden items-center gap-2 relative z-50">
          <button
            onClick={() => setSearchOpen(true)}
            className={`p-2 transition-colors focus:outline-none ${
              isWhite ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-brand-accent'
            }`}
            aria-label="Search site"
          >
            <Search size={20} />
          </button>

          <Link
            href="/funder-login"
            onClick={() => setMenuOpen(false)}
            className={`p-2 transition-colors focus:outline-none flex items-center justify-center ${
              isWhite ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-brand-accent'
            }`}
            aria-label="Funder portal"
          >
            <Lock size={20} />
          </Link>

          <button
            className={`p-2 focus:outline-none transition-colors ${isWhite ? 'text-brand-dark' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* ── Media mega menu ── */}
      <AnimatePresence>
        {mediaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className="hidden md:block absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-[0_24px_48px_rgba(0,0,0,0.08)] pointer-events-auto"
          >
            <div className="max-w-[1280px] mx-auto px-6 py-8 grid md:grid-cols-2 gap-10">
              {/* Latest News */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-brand-primary">Latest News</span>
                  <Link href="/news" onClick={closeNow} className="text-[10px] font-mono uppercase tracking-wider text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-1">
                    View all <ChevronDown size={10} className="-rotate-90" />
                  </Link>
                </div>
                <div className="flex flex-col gap-1">
                  {newsArticles.slice(0, 3).map((n) => (
                    <Link
                      key={n.id}
                      href={`/news/${n.id}`}
                      onClick={closeNow}
                      className="group flex gap-3 items-center p-2 rounded-[6px] hover:bg-[#F3FAF6] transition-colors"
                    >
                      <div className="w-14 h-14 rounded-[6px] overflow-hidden shrink-0 bg-[#051F1A]">
                        <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-gray-400 font-mono uppercase tracking-wider mb-0.5">{n.date} · {n.tag}</div>
                        <div className="text-sm font-semibold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug line-clamp-2 font-sans">{n.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Latest Impact Stories */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-brand-primary">Latest Impact Stories</span>
                  <Link href="/impact" onClick={closeNow} className="text-[10px] font-mono uppercase tracking-wider text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-1">
                    Explore Impact Portal <ChevronDown size={10} className="-rotate-90" />
                  </Link>
                </div>

                {/* Prominent Impact Portal CTA Card */}
                <Link
                  href="/impact"
                  onClick={closeNow}
                  className="group flex flex-col p-4 rounded-[6px] bg-[#FAFDFB] border border-gray-100 hover:border-brand-primary/20 hover:bg-[#F3FAF6] transition-all mb-4 text-left pointer-events-auto"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-bold font-mono text-[#00A788] uppercase tracking-wider">Strategy Portal</span>
                    <ArrowUpRight size={14} className="text-gray-300 group-hover:text-brand-primary transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug font-sans">
                    Explore Our Impact &amp; Net Zero Transition
                  </h4>
                  <p className="text-[10px] text-gray-400 font-sans mt-1 leading-normal font-light">
                    Track our carbon reductions, SDG metrics, and play community video stories.
                  </p>
                </Link>

                <div className="flex flex-col gap-1">
                  {Object.values(projects).slice(0, 2).map((p: any) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.id}`}
                      onClick={closeNow}
                      className="group flex gap-3 items-center p-2 rounded-[6px] hover:bg-[#F3FAF6] transition-colors"
                    >
                      <div className="w-12 h-12 rounded-[6px] overflow-hidden shrink-0 bg-[#051F1A]">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-gray-400 font-mono uppercase tracking-wider mb-0.5">{p.location} · {p.capacity}</div>
                        <div className="text-sm font-semibold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug line-clamp-2 font-sans">{p.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* ── Mobile menu drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed top-0 left-0 w-full bg-brand-dark z-40 flex flex-col pt-32 px-6 overflow-hidden pointer-events-auto"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="w-full border-b border-white/10"
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full text-white text-4xl font-light py-6 font-sans text-left focus:outline-none ${
                    activePage === link.key ? 'text-brand-accent font-normal' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search modal ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#051F1A]/80 backdrop-blur-md z-[100] flex items-start justify-center pt-24 px-6 pointer-events-auto"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-white border border-gray-100 rounded-[6px] w-full max-w-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-brand-primary p-2 focus:outline-none transition-colors"
                aria-label="Close search"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-6">
                <Search size={22} className="text-[#00A788]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search projects, states, or news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-lg md:text-xl font-sans text-brand-dark focus:outline-none bg-transparent placeholder-gray-300 font-light"
                />
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-2">
                {searchQuery.trim() === '' ? (
                  <div className="text-center py-12 text-gray-400 text-sm font-sans font-light">
                    <Search size={36} className="mx-auto text-gray-200 mb-3" />
                    Type a query to search the blended finance directory.
                  </div>
                ) : (
                  Object.values(projects).filter(p =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length > 0 || newsArticles.filter(n =>
                    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    n.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    n.themes.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                  ).length > 0
                ) ? (
                  <div className="space-y-6 text-left">
                    {Object.values(projects).filter(p =>
                      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A788] mb-3 font-mono">Projects & Case Studies</h4>
                        <div className="flex flex-col gap-2">
                          {Object.values(projects).filter(p =>
                            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase())
                          ).map(p => (
                            <Link key={p.id} href={`/projects/${p.id}`} onClick={() => setSearchOpen(false)} className="group flex items-center justify-between p-3 rounded-[6px] border border-gray-100 hover:border-brand-primary/20 hover:bg-[#F3FAF6] transition-all">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[#00A788]/10 flex items-center justify-center text-[#00A788]">
                                  <Zap size={16} />
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-brand-dark group-hover:text-brand-primary transition-colors block">{p.title}</span>
                                  <span className="text-[10px] text-gray-400 font-mono">{p.location} · {p.capacity} · {p.capital}</span>
                                </div>
                              </div>
                              <span className="text-[10px] bg-brand-light text-brand-primary px-2.5 py-1 rounded-[6px] font-bold uppercase tracking-wider font-mono">View</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {newsArticles.filter(n =>
                      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      n.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      n.themes.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009FD4] mb-3 font-mono">News & Insights</h4>
                        <div className="flex flex-col gap-2">
                          {newsArticles.filter(n =>
                            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            n.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            n.themes.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                          ).map(n => (
                            <Link key={n.id} href={`/news/${n.id}`} onClick={() => setSearchOpen(false)} className="group flex items-center justify-between p-3 rounded-[6px] border border-gray-100 hover:border-[#009FD4]/20 hover:bg-[#F0F9FD] transition-all">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[#009FD4]/10 flex items-center justify-center text-[#009FD4]">
                                  <BookOpen size={16} />
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-brand-dark group-hover:text-[#009FD4] transition-colors block">{n.title}</span>
                                  <span className="text-[10px] text-gray-400 font-mono">{n.date} · {n.tag}</span>
                                </div>
                              </div>
                              <span className="text-[10px] bg-[#EBF7FD] text-[#009FD4] px-2.5 py-1 rounded-[6px] font-bold uppercase tracking-wider font-mono">Read</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 text-sm font-sans font-light">
                    No results found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
