import type { APIRoute } from 'astro';
import newsData from '../data/news.json';
import { WRITING_POSTS } from '../data/writing';

function escXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = () => {
  const newsEntries = newsData.items.map((it) => ({
    id: it.id,
    title: it.headline,
    description: it.body,
    date: it.date,
    category: it.category,
    link: it.link
      ? it.link.startsWith('http')
        ? it.link
        : `https://inyalala.github.io${it.link}`
      : `https://inyalala.github.io/news/#${it.id}`
  }));

  const writingEntries = WRITING_POSTS.map((p) => ({
    id: `writing-${p.slug}`,
    title: p.title,
    description: p.summary,
    date: p.date,
    category: p.category,
    link: `https://inyalala.github.io/writing/${p.slug}/`
  }));

  const combined = [...writingEntries, ...newsEntries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 25);

  const lastBuildDate = combined.length
    ? new Date(`${combined[0].date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Innocent Nyalala - Writing, News &amp; Teaching Updates</title>
    <link>https://inyalala.github.io/</link>
    <description>Research notes, Zanzibar travel guides, grants, peer-reviewed publications, talks, and course updates from Innocent Nyalala at IIT Madras Zanzibar.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>innocent@iitmz.ac.in (Innocent Nyalala)</managingEditor>
    <webMaster>innocent@iitmz.ac.in (Innocent Nyalala)</webMaster>
    <copyright>${new Date().getUTCFullYear()} Innocent Nyalala</copyright>
    <atom:link href="https://inyalala.github.io/feed.xml" rel="self" type="application/rss+xml"/>
${combined
  .map((it) => {
    const pubDate = new Date(`${it.date}T00:00:00Z`).toUTCString();
    return `    <item>
      <title>${escXml(it.title)}</title>
      <link>${escXml(it.link)}</link>
      <description>${escXml(it.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>Innocent Nyalala</dc:creator>
      <category>${escXml(it.category)}</category>
      <guid isPermaLink="false">${escXml(it.id)}</guid>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
};
