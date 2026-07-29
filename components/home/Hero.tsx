"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, Variants, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { newsArticles } from '@/lib/newsData';

export default function Hero() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    if (video.readyState >= 1) {
      video.currentTime = 130;
    }

    const handleLoadedMetadata = () => {
      video.currentTime = 130;
    };

    const handleSeeked = () => {
      if (!isMounted) return;
      video.play()
        .then(() => {
          if (isMounted) {
            setVideoReady(true);
          }
        })
        .catch((err) => {
          console.warn("Autoplay blocked or play failed after seeked:", err);
          if (isMounted) {
            setVideoReady(false);
          }
        });
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= 150) {
        video.currentTime = 130;
      }
    };

    const handleError = () => {
      console.error("Hero background video loading error");
      if (isMounted) {
        setVideoReady(false);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);

    video.play().catch((err) => {
      console.warn("Initial autoplay attempt blocked:", err);
    });

    return () => {
      isMounted = false;
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const news = newsArticles.map(art => ({
    id: art.id,
    title: art.title,
    source: art.tag,
    date: art.date
  }));

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((current) => (current + 1) % news.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50); // 1% every 50ms = 5000ms total duration
    return () => clearInterval(interval);
  }, [isHovered, news.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#02100d]">
      {/* Background Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 scale-110">
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02100d] via-[#02100d]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02100d]/95 via-transparent to-[#02100d]/50 z-10" />
        
        {/* Fallback image */}
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop"
          alt="Solar Panels"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${videoReady ? 'opacity-0' : 'opacity-65'}`}
        />

        {/* Local background loop video starting at 130s and ending at 150s */}
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          muted
          playsInline
          loop
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${videoReady ? 'opacity-40' : 'opacity-0'}`}
        />
      </motion.div>

      <div className="container mx-auto relative z-20 h-full px-6 pt-28 sm:pt-32 pb-12 md:pb-20 flex flex-col justify-end">
        <div className="grid lg:grid-cols-12 gap-12 items-end">

          {/* Left Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 xl:col-span-8 mb-8 lg:mb-0"
          >
            <div className="overflow-hidden mb-2 pt-6">
              <motion.h1 variants={item} className="text-5xl md:text-6xl lg:text-[4.5rem] font-semibold text-white leading-[1.05] tracking-tight font-sans">
                Local Currency Blended
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1 variants={item} className="text-5xl md:text-6xl lg:text-[4.5rem] font-semibold font-sans">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">
                  Climate Finance
                </span>
              </motion.h1>
            </div>

            <motion.p variants={item} className="text-lg text-gray-300 leading-relaxed max-w-xl mb-10 font-sans font-light">
              Mobilising blended finance for sustainable energy access. The first of its kind to receive certification under the Electrical Grids and Storage criteria by the Climate Bonds Standard.
            </motion.p>

            {/* Button + Emblem Row */}
            <motion.div variants={item} className="mb-16 flex flex-wrap items-center gap-6">
              <button
                onClick={() => router.push('/projects')}
                className="bg-white hover:bg-brand-accent text-brand-dark hover:text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 group transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(72,192,163,0.5)] font-sans interactive uppercase tracking-wider text-sm focus:outline-none"
              >
                Explore Our Impact
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              {/* Climate Bond emblem (mobile/tablet fallback only) */}
              <img
                src="https://infracredit.ng/climate-facility/wp-content/uploads/2023/01/climate-bond-standard-certfied.svg"
                alt="Climate Bonds Certified"
                className="h-10 w-auto object-contain opacity-85 block lg:hidden"
                loading="lazy"
              />
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 0.7 }
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="cursor-pointer"
              >
                <div className="text-3xl font-bold text-white mb-1">$21.3m</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Total Funding</div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 0.7 }
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="cursor-pointer"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">35+</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">States</div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 0.7 }
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="cursor-pointer"
              >
                <div className="text-3xl font-bold text-white mb-1">2.4m</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Lives Impacted</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - News Cards Slider (desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col justify-start self-stretch pt-2">
            {/* Top: Climate Bonds Certified Emblem (top aligned, centered, fades in and hovers to 100% with subtle rotation) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-center mb-8 w-full"
            >
              <motion.img
                initial={{ opacity: 0.4 }}
                whileHover={{ opacity: 1, rotate: 2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                src="https://infracredit.ng/climate-facility/wp-content/uploads/2023/01/climate-bond-standard-certfied.svg"
                alt="Climate Bonds Certified"
                className="h-[180px] w-auto object-contain cursor-pointer"
                loading="lazy"
              />
            </motion.div>

            {/* Bottom: News Card Slider (glassmorphism like cleanenergyfund.ng) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-full mt-auto"
            >
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => router.push(`/news/${news[currentIndex].id}`)}
                className="group w-full h-[160px] bg-brand-dark/10 backdrop-blur-md border border-white/10 relative rounded-[6px] overflow-hidden flex flex-col justify-between p-6 opacity-70 hover:opacity-100 transition-all duration-300 hover:bg-brand-dark/20 hover:border-white/20 cursor-pointer shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex-1 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-medium text-[10px] tracking-widest uppercase text-white/50">
                          {news[currentIndex].source}
                        </span>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">
                          {news[currentIndex].date}
                        </span>
                      </div>
                      <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-brand-accent transition-colors font-sans">
                        {news[currentIndex].title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-white group-hover:text-brand-accent transition-colors font-sans">
                      Read Article
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar Track */}
                <div className="absolute bottom-0 left-0 h-[2.5px] bg-white/10 w-full">
                  <div
                    style={{ width: `${progress}%`, transition: isHovered ? 'none' : 'width 50ms linear' }}
                    className="h-full bg-white/40"
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent"></div>
      </motion.div>
    </section>
  );
}
