"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import type { ProjectItem } from '@/lib/strapi-types';

interface ProjectDetailsProps {
  project: ProjectItem;
  challengeLabel?: string;
  solutionLabel?: string;
  impactLabel?: string;
  ctaLabel?: string;
}

export default function ProjectDetails({
  project,
  challengeLabel,
  solutionLabel,
  impactLabel,
  ctaLabel,
}: ProjectDetailsProps) {
  const router = useRouter();

  const detailImages = [
    { src: project.imageOne, alt: project.imageOne_alt_text },
    { src: project.imageTwo, alt: project.imageTwo_alt_text },
  ].filter((img): img is { src: string; alt: string | undefined } => Boolean(img.src));

  return (
    <div className="px-8 pb-12 pt-8">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="grid grid-cols-2 gap-4 h-fit">
          {detailImages.map((img, idx) => (
            <div key={idx} className="rounded-[6px] overflow-hidden h-56 shadow-lg border border-white/10">
              <img src={img.src} alt={img.alt ?? ''} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-1 h-12 bg-brand-accent rounded-full mt-1 shrink-0"></div>
            <div>
              <h4 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-3 font-sans">{challengeLabel}</h4>
              <p className="text-xl text-gray-200 font-medium leading-relaxed font-sans">{project.problem}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10 bg-white/5 p-6 rounded-[6px] border border-white/10">
            <div>
              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 font-sans">{solutionLabel}</h5>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">{project.solution}</p>
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 font-sans">{impactLabel}</h5>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">{project.impact}</p>
            </div>
          </div>

          <button
            onClick={() => router.push(`/projects/${project.projectId}`)}
            className="self-start flex items-center gap-2 text-white border-b-2 border-brand-accent pb-1 hover:text-brand-accent transition-colors text-sm font-bold uppercase tracking-wider interactive font-sans focus:outline-none"
          >
            {ctaLabel} <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
