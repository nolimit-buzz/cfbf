import React from 'react';

// TECHNICAL ASSISTANCE & RATING AGENCY LOGOS
export const FSDAfricaLogo = () => (
  <div className="flex items-center gap-2.5 select-none shrink-0">
    <svg viewBox="0 0 100 100" className="w-10 h-10 fill-[#81C34D] shrink-0" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,15 C50,15 25,35 25,55 C25,75 50,90 50,90 C50,90 75,75 75,55 C75,35 50,15 50,15 Z M50,78 C38,78 33,68 33,55 C33,40 50,26 50,26 C50,26 67,40 67,55 C67,68 62,78 50,78 Z" />
      <path d="M50,35 C50,35 37,47 37,58 C37,68 50,76 50,76 C50,76 63,68 63,58 C63,47 50,35 50,35 Z" fill="#00A788" opacity="0.8" />
    </svg>
    <div className="flex flex-col items-start leading-none text-left">
      <span className="text-lg font-black tracking-tighter text-[#051F1A] font-sans">
        fsd<span className="text-[#81C34D]">africa</span>
      </span>
      <span className="text-[6.5px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 font-mono">
        Technical Assistance Partner
      </span>
    </div>
  </div>
);

export const GCRRatingsLogo = () => (
  <div className="flex flex-col items-center md:items-start select-none shrink-0 leading-none text-left">
    <span className="text-xl font-black tracking-tighter text-[#8F1838]">
      GCR<span className="text-brand-dark font-medium text-sm ml-1 tracking-widest font-sans">RATINGS</span>
    </span>
    <span className="text-[6px] font-bold text-gray-400 tracking-wider uppercase mt-1 font-sans">
      AN AFFILIATE OF MOODY'S INVESTORS SERVICE
    </span>
  </div>
);

export const AgustoCoLogo = () => (
  <div className="flex flex-col items-center md:items-start select-none shrink-0 leading-none text-left">
    <div className="flex items-center gap-1.5">
      <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0">
        <div className="bg-[#19486A] rounded-sm" />
        <div className="bg-[#81C34D] rounded-sm" />
        <div className="bg-[#009FD4] rounded-sm" />
        <div className="bg-[#19486A] rounded-sm" />
      </div>
      <span className="text-base font-black tracking-tight text-[#19486A] font-sans">
        Agusto&Co.
      </span>
    </div>
    <span className="text-[5.5px] font-bold text-gray-400 tracking-wider uppercase mt-1 font-sans">
      RESEARCH, CREDIT RATINGS, RISK MANAGEMENT
    </span>
  </div>
);
