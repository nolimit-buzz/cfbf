import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ImpactBentoCardProps {
  number: string;
  title: string;
  sdgs: number[];
  desc: string;
  lightTheme?: boolean;
}

export default function ImpactBentoCard({
  number,
  title,
  sdgs,
  desc,
  lightTheme = false
}: ImpactBentoCardProps) {
  return (
    <div className={`p-4 pb-3 rounded-[6px] flex flex-col justify-between h-[320px] hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden will-change-transform ${
      lightTheme 
        ? 'bg-gradient-to-br from-white to-[#F3FAF6] border border-gray-200 shadow-sm hover:shadow-md hover:border-[#00A788]/25 text-[#051F1A]' 
        : 'bg-gradient-to-br from-[#021814] to-[#052d24] border border-[#144D3F] shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(129,195,77,0.15)] text-white'
    }`}>
      {/* Corner glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#81C34D]/5 to-transparent opacity-40 pointer-events-none`} />
      
      <div className="flex justify-between items-start">
        <span className={`text-2xl font-black font-mono transition-colors ${
          lightTheme ? 'text-gray-300 group-hover:text-[#00A788]' : 'text-gray-700 group-hover:text-[#81C34D]'
        }`}>{number}</span>
        <ArrowRight size={16} className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 -rotate-45 ${
          lightTheme ? 'text-gray-400 group-hover:text-[#00A788]' : 'text-gray-600 group-hover:text-[#81C34D]'
        }`} />
      </div>
      
      <div className="mt-2">
        <h3 className={`text-sm font-bold font-sans mb-1 ${
          lightTheme ? 'text-[#051F1A]' : 'text-white'
        }`}>{title}</h3>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {sdgs.map(num => {
            const sdgsConfig = {
              5: { label: 'SDG 5', color: '#FF4A6B', bg: 'bg-[#FF4A6B]/10', text: 'text-[#FF4A6B]', border: 'border-[#FF4A6B]/20' },
              7: { label: 'SDG 7', color: '#FDB713', bg: 'bg-[#FDB713]/10', text: 'text-[#FDB713]', border: 'border-[#FDB713]/20' },
              8: { label: 'SDG 8', color: '#FF4A6B', bg: 'bg-[#FF4A6B]/10', text: 'text-[#FF4A6B]', border: 'border-[#FF4A6B]/20' },
              9: { label: 'SDG 9', color: '#F36D25', bg: 'bg-[#F36D25]/10', text: 'text-[#F36D25]', border: 'border-[#F36D25]/20' },
              11: { label: 'SDG 11', color: '#FD9D24', bg: 'bg-[#FD9D24]/10', text: 'text-[#FD9D24]', border: 'border-[#FD9D24]/20' },
              13: { label: 'SDG 13', color: '#56C36A', bg: 'bg-[#56C36A]/10', text: 'text-[#56C36A]', border: 'border-[#56C36A]/20' },
              17: { label: 'SDG 17', color: '#19486A', bg: 'bg-[#19486A]/10', text: 'text-[#19486A]', border: 'border-[#19486A]/20' }
            };
            const info = sdgsConfig[num as keyof typeof sdgsConfig];
            if (!info) return null;
            return (
              <span key={num} className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[8px] font-bold uppercase tracking-wider ${info.bg} ${info.text} ${info.border}`}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: info.color }} />
                {info.label}
              </span>
            );
          })}
        </div>
        <p className={`font-sans text-sm leading-relaxed ${
          lightTheme ? 'text-gray-500 font-light' : 'text-gray-300 font-light'
        }`}>
          {desc}
        </p>
      </div>
    </div>
  );
}
