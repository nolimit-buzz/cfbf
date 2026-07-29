"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  images: string[];
  problem: string;
  solution: string;
  impact: string;
}

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const router = useRouter();

  return (
    <div className="px-8 pb-12 pt-8">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="grid grid-cols-2 gap-4 h-fit">
          {project.images.map((img, idx) => (
            <div key={idx} className="rounded-[6px] overflow-hidden h-56 shadow-lg border border-white/10">
              <img src={img} alt="Project detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-1 h-12 bg-brand-accent rounded-full mt-1 shrink-0"></div>
            <div>
              <h4 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-3 font-sans">Challenge Analysis</h4>
              <p className="text-xl text-gray-200 font-medium leading-relaxed font-sans">{project.problem}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10 bg-white/5 p-6 rounded-[6px] border border-white/10">
            <div>
              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 font-sans">Solution</h5>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">{project.solution}</p>
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 font-sans">Impact</h5>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">{project.impact}</p>
            </div>
          </div>

          <button
            onClick={() => router.push(`/projects/${project.id}`)}
            className="self-start flex items-center gap-2 text-white border-b-2 border-brand-accent pb-1 hover:text-brand-accent transition-colors text-sm font-bold uppercase tracking-wider interactive font-sans focus:outline-none"
          >
            Learn More <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
