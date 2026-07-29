import React, { Suspense } from 'react';
import ProjectDetailPageClient from '@/components/projects/ProjectDetailClient';

export const unstable_instant = {
  prefetch: 'static',
  samples: [
    { params: { id: '01' } }
  ]
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="bg-[#051F1A] min-h-screen text-white flex items-center justify-center font-mono text-xs uppercase tracking-widest">Loading case study...</div>}>
      <ProjectDetailPageClient params={params} />
    </Suspense>
  );
}
