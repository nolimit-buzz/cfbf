import React, { Suspense } from 'react';
import NewsDetailPageClient from '@/components/news/NewsDetailClient';

export const unstable_instant = {
  prefetch: 'static',
  samples: [
    { params: { id: '01' } }
  ]
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="bg-[#FAFDFB] min-h-screen text-brand-dark flex items-center justify-center font-mono text-xs uppercase tracking-widest">Loading article...</div>}>
      <NewsDetailPageClient params={params} />
    </Suspense>
  );
}
