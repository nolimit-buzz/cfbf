import { NextResponse } from 'next/server';
import { getProjectDetails } from '@/lib/strapi';
import { newsArticles } from '@/lib/newsData';

export async function GET() {
  // Projects come from the CMS now, so the handler awaits them; the news half
  // is still a local module. An unreachable Strapi yields an empty list rather
  // than a failed response — a partial feed beats a 500 for crawlers.
  const projects = await getProjectDetails();

  const feed = {
    projects: projects.map((p) => ({
      id: p.projectId,
      title: p.title,
      location: p.location,
      year: p.year,
      metrics: {
        capital: p.capital,
        capacity: p.capacity,
        connections: p.connections,
        jobs: p.jobs,
        ghg_avoided: p.ghg,
        status: p.status,
      },
      description: p.desc,
      financing_structure: p.financing,
      expected_impact: p.impact_desc,
      problem: p.problem,
      solution: p.solution,
      impact: p.impact,
    })),
    news: newsArticles.map((n) => ({
      id: n.id,
      tag: n.tag,
      date: n.date,
      readTime: n.readTime,
      themes: n.themes,
      context: n.keyContext,
      title: n.title,
      excerpt: n.excerpt,
      author: n.author,
      body: n.paragraphs
        .filter((item) => item.type === 'p' || item.type === 'blockquote')
        .map((item) => item.text)
        .join(' '),
    })),
  };

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=1800',
    },
  });
}
