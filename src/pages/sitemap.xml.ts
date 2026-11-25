import type { APIRoute } from 'astro';
import { COURSES } from '../data/courses';
import { PRIOR_COMPANIONS } from '../data/prior-papers';
import { THESES } from '../data/theses';
import { WRITING_POSTS } from '../data/writing';
import newsData from '../data/news.json';
import metrics from '../data/scholar-metrics.json';

const TODAY_ISO = new Date(Date.now() + 3 * 3600 * 1000).toISOString().slice(0, 10);

function clampDate(iso: string): string {
  return iso > TODAY_ISO ? TODAY_ISO : iso;
}

export const GET: APIRoute = () => {
  const latestNewsDate = clampDate(newsData.items[0]?.date || metrics.updatedAt || '2026-11-24');
  const siteUpdated = clampDate(metrics.updatedAt || latestNewsDate);

  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: latestNewsDate },
    { path: '/sw/', priority: '0.9', changefreq: 'weekly', lastmod: latestNewsDate },
    { path: '/sw/courses/', priority: '0.85', changefreq: 'weekly', lastmod: latestNewsDate },
    { path: '/sw/research/', priority: '0.85', changefreq: 'monthly', lastmod: siteUpdated },
    { path: '/sw/writing/', priority: '0.85', changefreq: 'weekly', lastmod: clampDate(WRITING_POSTS[0]?.date || siteUpdated) },
    { path: '/sw/contact/', priority: '0.75', changefreq: 'monthly', lastmod: siteUpdated },
    { path: '/sw/faq/', priority: '0.75', changefreq: 'monthly', lastmod: siteUpdated },
    { path: '/courses/', priority: '0.95', changefreq: 'weekly', lastmod: latestNewsDate },
    { path: '/research/', priority: '0.9', changefreq: 'monthly', lastmod: siteUpdated },
    { path: '/publications/', priority: '0.95', changefreq: 'weekly', lastmod: siteUpdated },
    { path: '/writing/', priority: '0.9', changefreq: 'weekly', lastmod: clampDate(WRITING_POSTS[0]?.date || siteUpdated) },
    { path: '/news/', priority: '0.9', changefreq: 'weekly', lastmod: latestNewsDate },
    { path: '/work-with-me/', priority: '0.85', changefreq: 'monthly', lastmod: siteUpdated },
    { path: '/about/', priority: '0.85', changefreq: 'monthly', lastmod: siteUpdated },
    { path: '/contact/', priority: '0.8', changefreq: 'monthly', lastmod: siteUpdated },
    { path: '/media-kit/', priority: '0.75', changefreq: 'monthly', lastmod: siteUpdated },
    { path: '/faq/', priority: '0.75', changefreq: 'monthly', lastmod: siteUpdated }
  ];

  const coursePages = COURSES.map((c) => ({
    path: `/courses/${c.slug}/`,
    priority: c.status === 'active' ? '0.9' : '0.75',
    changefreq: c.status === 'active' ? 'weekly' : 'yearly',
    lastmod: c.status === 'active' ? latestNewsDate : '2026-07-31'
  }));

  const thesisPages = THESES.map((t) => ({
    path: `/publications/theses/${t.slug}/`,
    priority: '0.8',
    changefreq: 'yearly',
    lastmod: `${t.year}-07-01`
  }));

  const priorPaperPages = PRIOR_COMPANIONS.map((p) => ({
    path: `/papers/${p.slug}/`,
    priority: '0.8',
    changefreq: 'yearly',
    lastmod: clampDate(p.dateISO || `${p.year}-01-01`)
  }));

  const writingPages = WRITING_POSTS.map((p) => ({
    path: `/writing/${p.slug}/`,
    priority: '0.85',
    changefreq: 'monthly',
    lastmod: clampDate(p.date)
  }));

  const urls = [...staticPages, ...coursePages, ...thesisPages, ...priorPaperPages, ...writingPages];

  const pairedClusters: Record<string, { hreflang: string; href: string }[]> = {
    '/': [
      { hreflang: 'en', href: 'https://inyalala.github.io/' },
      { hreflang: 'sw', href: 'https://inyalala.github.io/sw/' },
      { hreflang: 'x-default', href: 'https://inyalala.github.io/' }
    ],
    '/courses/': [
      { hreflang: 'en', href: 'https://inyalala.github.io/courses/' },
      { hreflang: 'sw', href: 'https://inyalala.github.io/sw/courses/' },
      { hreflang: 'x-default', href: 'https://inyalala.github.io/courses/' }
    ],
    '/research/': [
      { hreflang: 'en', href: 'https://inyalala.github.io/research/' },
      { hreflang: 'sw', href: 'https://inyalala.github.io/sw/research/' },
      { hreflang: 'x-default', href: 'https://inyalala.github.io/research/' }
    ],
    '/writing/': [
      { hreflang: 'en', href: 'https://inyalala.github.io/writing/' },
      { hreflang: 'sw', href: 'https://inyalala.github.io/sw/writing/' },
      { hreflang: 'x-default', href: 'https://inyalala.github.io/writing/' }
    ],
    '/faq/': [
      { hreflang: 'en', href: 'https://inyalala.github.io/faq/' },
      { hreflang: 'sw', href: 'https://inyalala.github.io/sw/faq/' },
      { hreflang: 'x-default', href: 'https://inyalala.github.io/faq/' }
    ],
    '/contact/': [
      { hreflang: 'en', href: 'https://inyalala.github.io/contact/' },
      { hreflang: 'sw', href: 'https://inyalala.github.io/sw/contact/' },
      { hreflang: 'x-default', href: 'https://inyalala.github.io/contact/' }
    ]
  };
  pairedClusters['/sw/'] = pairedClusters['/'];
  pairedClusters['/sw/courses/'] = pairedClusters['/courses/'];
  pairedClusters['/sw/research/'] = pairedClusters['/research/'];
  pairedClusters['/sw/writing/'] = pairedClusters['/writing/'];
  pairedClusters['/sw/faq/'] = pairedClusters['/faq/'];
  pairedClusters['/sw/contact/'] = pairedClusters['/contact/'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((u) => {
    const alts = pairedClusters[u.path];
    const xhtmlLinks = alts
      ? '\n' + alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n')
      : '';
    return `  <url>
    <loc>https://inyalala.github.io${u.path}</loc>${xhtmlLinks}
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
