"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NigeriaMap from '../NigeriaMap';

export default function MapSection() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Solar Grid', 'Hydro', 'Biofuel', 'Telecoms'];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header with Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
           <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-3"
              >
                <div className="h-px w-8 bg-brand-primary"></div>
                <span className="text-brand-primary text-xs font-normal tracking-[0.2em] uppercase font-sans">National Footprint</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-brand-dark font-sans tracking-tight leading-tight"
              >
                Geographical <span className="text-[#7C9590]">Distribution</span>
              </motion.h2>
           </div>

           {/* Filter Controls - Fixed scrollbar */}
           <div className="mt-8 md:mt-0 w-full md:w-auto overflow-hidden">
             <div className="flex gap-2 overflow-x-auto pb-0 px-1 no-scrollbar [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setFilter(cat)}
                   className={`px-6 py-2 rounded-full border text-xs tracking-wide transition-all duration-300 font-sans whitespace-nowrap focus:outline-none ${
                     filter === cat 
                       ? 'bg-brand-primary text-white border-brand-primary font-medium shadow-md shadow-brand-primary/20' 
                       : 'bg-transparent text-gray-500 border-gray-200 hover:border-brand-primary hover:text-brand-primary font-light'
                   }`}
                 >
                   {cat.toUpperCase()}
                 </button>
               ))}
             </div>
           </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-[6rem] md:text-[8rem] font-bold text-[#0EA5E9] leading-none tracking-tighter font-sans">35</span>
                </div>
                
                <h4 className="text-3xl text-brand-dark font-medium mb-8 font-sans">States</h4>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md font-sans">
                  Collectively, renewable energy projects located in 35 states across the six geo-political zones in Nigeria have been approved for co-financing by the Facility.
                </p>
                
                <button className="bg-[#009ca6] hover:bg-[#00878f] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#009ca6]/20 transition-all hover:-translate-y-1 interactive font-sans">
                  View Locations
                </button>
            </motion.div>

            {/* Right Column: Map Visualization */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full flex items-center justify-center"
            >
               <NigeriaMap />
             </motion.div>

        </div>

      </div>
    </section>
  );
}
