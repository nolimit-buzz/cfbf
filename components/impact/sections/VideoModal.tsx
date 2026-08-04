"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type VideoModalProps = {
  /** The playing story, or null when the modal is closed. */
  selected: { url?: string; title?: string } | null;
  onClose: () => void;
  nowPlayingLabel?: string;
};

export default function VideoModal({ selected, onClose, nowPlayingLabel }: VideoModalProps) {
  return (
    <AnimatePresence>
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#051F1A] border border-white/10 rounded-[12px] shadow-2xl w-full max-w-4xl overflow-hidden relative z-10 flex flex-col text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white hover:text-brand-accent p-2 rounded-full border border-white/5 transition-colors cursor-pointer z-50 focus:outline-none"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            {/* Responsive Video Container */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={selected.url}
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title Strip */}
            <div className="p-5 border-t border-white/5 bg-[#02100d] text-white">
              <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block mb-1">{nowPlayingLabel}</span>
              <h4 className="text-sm font-bold font-sans line-clamp-1">{selected.title}</h4>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
