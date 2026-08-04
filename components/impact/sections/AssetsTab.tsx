"use client";

import React from 'react';

import type { AssetsTabSection } from '@/lib/strapi-impact-types';

type AssetsTabProps = Omit<AssetsTabSection, '__component'>;

export default function AssetsTab({ columns, assets }: AssetsTabProps) {
  return (
    <div className="overflow-x-auto bg-white/[0.01] border border-white/10 rounded-[10px] shadow-xl">
      <table className="w-full border-collapse text-left text-xs md:text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider bg-white/[0.02]">
            {(columns ?? []).map((column, i) => (
              <th key={column.id ?? i} className="py-4 px-6">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {(assets ?? []).map((asset, i) => (
            <tr key={asset.id ?? i} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-4 px-6 font-bold text-white">{asset.title}</td>
              <td className="py-4 px-6 text-gray-355">{asset.location}</td>
              <td className="py-4 px-6 text-gray-355">{asset.category}</td>
              <td className="py-4 px-6 text-gray-355 font-mono">{asset.capacity}</td>
              <td className="py-4 px-6 text-gray-355 font-mono">{asset.connections}</td>
              <td className="py-4 px-6 text-gray-355 font-mono">{asset.jobs}</td>
              <td className="py-4 px-6">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono border ${
                  asset.status === 'Operational'
                    ? 'text-[#81C34D] bg-[#81C34D]/10 border-[#81C34D]/25'
                    : 'text-[#009FD4] bg-[#009FD4]/10 border-[#009FD4]/25'
                }`}>
                  {asset.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
