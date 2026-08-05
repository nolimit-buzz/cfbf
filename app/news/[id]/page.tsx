import React, { Suspense } from 'react';
import NewsDetailPageClient from '@/components/news/NewsDetailClient';
import { findSection, getNewsSections } from '@/lib/strapi';

export const unstable_instant = {
  prefetch: 'static',
  samples: [
    { params: { id: '01' } }
  ]
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function NewsDetailContent({ params }: PageProps) {
  const sections = await getNewsSections();
  const articlesSection = findSection(sections, 'news-page.articles-section');
  const detailSection = findSection(sections, 'news-page.article-detail-section');

  return (
    <NewsDetailPageClient
      params={params}
      articles={articlesSection?.articles ?? []}
      detailSection={detailSection}
    />
  );
}

export default async function NewsDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="bg-[#FAFDFB] min-h-screen text-brand-dark flex items-center justify-center font-mono text-xs uppercase tracking-widest">Loading article...</div>}>
      <NewsDetailContent params={params} />
    </Suspense>
  );
}
