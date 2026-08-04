import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProjectDetailPageClient from '@/components/projects/ProjectDetailClient';
import { getProjectDetails } from '@/lib/strapi';

export const unstable_instant = {
  prefetch: 'static',
  samples: [
    { params: { id: '01' } }
  ]
};

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Resolves the case study and its neighbours. The whole collection is fetched
 * once because the page also needs prev/next and a related-projects rail — all
 * of which used to read a hardcoded ["01".."06"] array, so a seventh record
 * added in the CMS now appears without a code change.
 */
async function ProjectDetailContent({ params }: PageProps) {
  const { id } = await params;
  const projects = await getProjectDetails();

  const currentIndex = projects.findIndex((p) => p.projectId === id);

  // Unknown id is a 404. The previous hardcoded lookup silently rendered
  // project 01 instead, which made typos indistinguishable from real pages.
  if (currentIndex === -1) notFound();

  const project = projects[currentIndex];
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <ProjectDetailPageClient
      project={project}
      related={projects.filter((p) => p.projectId !== project.projectId)}
      prev={prev}
      next={next}
    />
  );
}

export default function ProjectDetailPage({ params }: PageProps) {
  // The boundary has to stay: `cacheComponents` (next.config.ts) requires
  // uncached data to sit inside Suspense, and getProjectDetails() is uncached.
  return (
    <Suspense fallback={<div className="bg-[#051F1A] min-h-screen text-white flex items-center justify-center font-mono text-xs uppercase tracking-widest">Loading case study...</div>}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}
