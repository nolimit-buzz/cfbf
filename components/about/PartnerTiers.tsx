"use client";

import { motion } from 'framer-motion';

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
});

// ─── Partner logos ─────────────────────────────────────────────────────────
function FCDOLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 48 30" width="48" height="30" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="26" width="44" height="4" rx="1" fill="#00247D" />
        <path d="M6 24 L11 10 L18 18 L24 3 L30 18 L37 10 L42 24 Z" fill="#00247D" />
        <circle cx="11" cy="9.5" r="2.5" fill="#C8A400" />
        <circle cx="24" cy="3" r="2.5" fill="#C8A400" />
        <circle cx="37" cy="9.5" r="2.5" fill="#C8A400" />
      </svg>
      <div className="text-center">
        <div className="font-black text-[12px] tracking-[0.15em] text-[#00247D] font-sans">FCDO</div>
        <div className="text-[9px] text-gray-400 font-sans tracking-wide">UKaid</div>
      </div>
    </div>
  );
}

function BIILogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 68 32" width="68" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="7" height="28" rx="3.5" fill="#003B5C" />
        <path d="M9 16 C9 10, 14 7, 19 10 C24 13, 24 19, 19 22 C14 25, 9 22, 9 16 Z" fill="#003B5C" />
        <circle cx="33" cy="5" r="3" fill="#003B5C" />
        <rect x="30" y="11" width="6" height="19" rx="3" fill="#003B5C" />
        <circle cx="50" cy="5" r="3" fill="#003B5C" />
        <rect x="47" y="11" width="6" height="19" rx="3" fill="#003B5C" />
      </svg>
      <div className="text-[9px] text-gray-400 font-sans text-center leading-snug">British International<br />Investment</div>
    </div>
  );
}

function FSDALogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 44 32" width="44" height="32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="16" r="14" fill="#E87722" />
        <text x="22" y="21" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="sans-serif">FSD</text>
      </svg>
      <div className="font-bold text-[11px] text-[#E87722] font-sans">FSD Africa</div>
    </div>
  );
}

function ShellFoundationLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 38 38" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="19" cy="24" rx="15" ry="10" fill="#DD1D21" />
        <path d="M19 6 C19 6, 4 18, 4 26 C4 30, 10 34, 19 34 C28 34, 34 30, 34 26 C34 18, 19 6, 19 6 Z" fill="#DD1D21" />
        <line x1="19" y1="34" x2="19" y2="8" stroke="#FBCE07" strokeWidth="2.5" />
        <line x1="19" y1="34" x2="6" y2="15" stroke="#FBCE07" strokeWidth="2" />
        <line x1="19" y1="34" x2="32" y2="15" stroke="#FBCE07" strokeWidth="2" />
        <line x1="19" y1="34" x2="9" y2="24" stroke="#FBCE07" strokeWidth="1.5" />
        <line x1="19" y1="34" x2="29" y2="24" stroke="#FBCE07" strokeWidth="1.5" />
        <rect x="4" y="30" width="30" height="4" rx="2" fill="#FBCE07" />
      </svg>
      <div className="text-center leading-none">
        <div className="font-bold text-[11px] text-gray-700 font-sans">Shell</div>
        <div className="text-[9px] text-gray-500 font-sans">Foundation</div>
      </div>
    </div>
  );
}

function InfraCreditLogo() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg viewBox="0 0 48 28" width="48" height="28" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="2" width="14" height="5" rx="2" fill="#00A788" />
        <rect x="13" y="7" width="4" height="14" fill="#00A788" />
        <rect x="8" y="21" width="14" height="5" rx="2" fill="#00A788" />
        <rect x="27" y="6" width="16" height="4" rx="2" fill="#81C34D" />
        <rect x="27" y="13" width="12" height="4" rx="2" fill="#81C34D" opacity="0.7" />
        <rect x="27" y="20" width="14" height="4" rx="2" fill="#00A788" opacity="0.5" />
      </svg>
      <div className="font-bold text-[12px] text-[#00A788] font-sans tracking-tight">InfraCredit</div>
    </div>
  );
}

function AIICOLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 38 32" width="38" height="32" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 2 L36 30 L2 30 Z" fill="#C8102E" />
        <path d="M19 10 L29 28 L9 28 Z" fill="white" opacity="0.15" />
        <path d="M19 18 L24 28 L14 28 Z" fill="white" opacity="0.25" />
      </svg>
      <div className="text-center leading-none">
        <div className="font-black text-[11px] text-[#002855] font-sans tracking-wider">AIICO</div>
        <div className="text-[9px] text-gray-400 font-sans">Insurance</div>
      </div>
    </div>
  );
}

function NEMLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 52 28" width="52" height="28" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="6" height="20" rx="2" fill="#003087" />
        <path d="M8 4 L20 22 L20 4" stroke="#003087" strokeWidth="6" strokeLinejoin="round" fill="none" strokeLinecap="round" />
        <rect x="14" y="4" width="6" height="20" rx="2" fill="#003087" />
        <rect x="24" y="4" width="6" height="20" rx="2" fill="#003087" />
        <rect x="30" y="4" width="10" height="5" rx="1.5" fill="#003087" />
        <rect x="30" y="11" width="7" height="4" rx="1.5" fill="#003087" />
        <rect x="30" y="19" width="10" height="5" rx="1.5" fill="#003087" />
        <rect x="44" y="4" width="5" height="20" rx="2" fill="#003087" />
        <rect x="47" y="4" width="5" height="20" rx="2" fill="#003087" />
      </svg>
      <div className="text-[9px] text-gray-400 font-sans text-center">NEM Insurance PLC</div>
    </div>
  );
}

function LinkageLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 48 28" width="48" height="28" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="8" width="20" height="12" rx="6" fill="none" stroke="#0072CE" strokeWidth="4" />
        <rect x="26" y="8" width="20" height="12" rx="6" fill="none" stroke="#0072CE" strokeWidth="4" />
        <rect x="16" y="10" width="16" height="8" fill="white" />
        <line x1="18" y1="12" x2="30" y2="12" stroke="#0072CE" strokeWidth="2" />
        <line x1="18" y1="16" x2="30" y2="16" stroke="#0072CE" strokeWidth="2" />
      </svg>
      <div className="text-center leading-none">
        <div className="font-bold text-[11px] text-[#0072CE] font-sans">Linkage</div>
        <div className="text-[9px] text-gray-400 font-sans">Insurance PLC</div>
      </div>
    </div>
  );
}

function LeadwayLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 52 28" width="52" height="28" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="7" height="20" rx="2" fill="#E31837" />
        <rect x="4" y="18" width="22" height="6" rx="2" fill="#E31837" />
        <path d="M30 14 L44 14 M38 8 L44 14 L38 20" stroke="#E31837" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <div className="text-center leading-none">
        <div className="font-black text-[11px] text-[#E31837] font-sans tracking-wider">LEADWAY</div>
        <div className="text-[9px] text-gray-400 font-sans">Insurance</div>
      </div>
    </div>
  );
}

function TangerineLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 38 38" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="20" r="15" fill="#FF6600" />
        <line x1="19" y1="5" x2="19" y2="35" stroke="white" strokeWidth="1.5" opacity="0.3" />
        <line x1="6" y1="12" x2="32" y2="28" stroke="white" strokeWidth="1.5" opacity="0.3" />
        <line x1="6" y1="28" x2="32" y2="12" stroke="white" strokeWidth="1.5" opacity="0.3" />
        <path d="M19 5 C19 5, 23 1, 27 3" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
      <div className="text-center leading-none">
        <div className="font-bold text-[11px] text-[#FF6600] font-sans">Tangerine</div>
        <div className="text-[9px] text-gray-400 font-sans">Life</div>
      </div>
    </div>
  );
}

function CELCFLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 40 36" width="40" height="36" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2 L26 16 L20 14 L24 34 L14 16 L20 18 Z" fill="#00A788" />
        <circle cx="20" cy="18" r="16" fill="none" stroke="#81C34D" strokeWidth="2" opacity="0.4" />
      </svg>
      <div className="text-center leading-none">
        <div className="font-bold text-[9px] text-[#00A788] font-sans leading-snug text-center">Clean Energy<br />LCF</div>
      </div>
    </div>
  );
}

function FPCLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 44 28" width="44" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 2 L38 8 L38 18 C38 26, 22 32, 22 32 C22 32, 6 26, 6 18 L6 8 Z" fill="#003087" />
        <path d="M22 8 L32 12 L32 18 C32 23, 22 27, 22 27 C22 27, 12 23, 12 18 L12 12 Z" fill="white" opacity="0.15" />
        <text x="22" y="21" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">FPC</text>
      </svg>
      <div className="text-center leading-none">
        <div className="font-bold text-[10px] text-[#003087] font-sans leading-snug">First Pension<br />Custodian</div>
      </div>
    </div>
  );
}

// ─── Partner tier data ──────────────────────────────────────────────────────
const PARTNER_TIERS = [
  {
    tier: 'Anchor Funders',
    label: 'Capital Commitment',
    partners: [
      { name: 'Foreign, Commonwealth & Development Office', role: 'Anchor Funder — USD 21.3M', logo: <FCDOLogo /> },
      { name: 'British International Investment', role: 'Co-Investor — BII', logo: <BIILogo /> },
    ],
    cols: 'grid-cols-2',
    cardSize: 'py-8 px-6',
  },
  {
    tier: 'Technical Assistance',
    label: 'Capacity & Development',
    partners: [
      { name: 'FSD Africa', role: 'Technical Assistance', logo: <FSDALogo /> },
      { name: 'Shell Foundation', role: 'Technical Assistance', logo: <ShellFoundationLogo /> },
    ],
    cols: 'grid-cols-2',
    cardSize: 'py-6 px-6',
  },
  {
    tier: 'Co-financing Partner',
    label: 'Facility Administrator',
    partners: [
      { name: 'InfraCredit', role: 'Facility Administrator & Credit Guarantor', logo: <InfraCreditLogo /> },
    ],
    cols: 'grid-cols-1',
    cardSize: 'py-6 px-6',
  },
  {
    tier: 'Domestic Institutional Investors',
    label: 'Nigerian Co-financiers',
    partners: [
      { name: 'AIICO Insurance', role: 'Co-financier', logo: <AIICOLogo /> },
      { name: 'NEM Insurance PLC', role: 'Co-financier', logo: <NEMLogo /> },
      { name: 'Linkage Insurance PLC', role: 'Co-financier', logo: <LinkageLogo /> },
      { name: 'Leadway Insurance', role: 'Co-financier', logo: <LeadwayLogo /> },
      { name: 'Tangerine Life', role: 'Co-financier', logo: <TangerineLogo /> },
      { name: 'Clean Energy Local Currency Fund', role: 'Co-financier', logo: <CELCFLogo /> },
      { name: 'First Pension Custodian', role: 'Pension Custodian', logo: <FPCLogo /> },
    ],
    cols: 'grid-cols-2 sm:grid-cols-3',
    cardSize: 'py-5 px-3',
  },
];

export default function PartnerTiers({ className = '', exclude = [] }: { className?: string; exclude?: string[] }) {
  const tiers = PARTNER_TIERS.filter(t => !exclude.includes(t.tier));
  return (
    <div className={`space-y-5 ${className}`}>
      {tiers.map((tier, ti) => (
        <motion.div key={tier.tier} {...up(ti * 0.06)}>
          {/* Tier header */}
          <div className="flex items-baseline gap-4 mb-3 px-1">
            <span className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-brand-primary">{tier.tier}</span>
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[10px] font-mono text-gray-400 tracking-wider hidden sm:block">{tier.label}</span>
          </div>
          {/* Partner cards */}
          <div className={`grid ${tier.cols} gap-3`}>
            {tier.partners.map((partner) => (
              <motion.div
                key={partner.name}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white border border-gray-200 rounded-[6px] flex flex-col items-center justify-center gap-3 text-center cursor-default ${tier.cardSize}`}
              >
                {partner.logo}
                <span className="text-[9px] text-brand-primary font-mono font-semibold uppercase tracking-wider leading-snug">
                  {partner.role}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
