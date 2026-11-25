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

const TODAY_ISO = new Date(Date.now() + 3 * 3600 * 1000).toISOString().slice(0, 10);

function clampDate(iso: string): string {
  return iso > TODAY_ISO ? TODAY_ISO : iso;
}

function toAbsUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith('http') ? pathOrUrl : `https://inyalala.github.io${pathOrUrl}`;
}

export const GET: APIRoute = () => {
  const newsEntries = newsData.items.map((it) => {
    const canonicalLink = `https://inyalala.github.io/news/#${it.id}`;
    const extLink = it.link ? toAbsUrl(it.link) : '';
    const firstSlide = (it as { slides?: { src: string; alt: string }[] }).slides?.[0];
    return {
      title: it.headline,
      description: it.body,
      date: clampDate(it.date),
      category: it.category,
      link: canonicalLink,
      extLink,
      extLabel: it.linkLabel || 'Reference',
      tags: [] as string[],
      imageUrl: firstSlide ? toAbsUrl(firstSlide.src) : '',
      imageAlt: firstSlide ? firstSlide.alt : ''
    };
  });

  const writingEntries = WRITING_POSTS.map((p) => ({
    title: p.title,
    description: p.summary,
    date: clampDate(p.date),
    category: p.category,
    link: `https://inyalala.github.io/writing/${p.slug}/`,
    extLink: '',
    extLabel: '',
    tags: p.tags || [],
    imageUrl: p.image ? toAbsUrl(p.image) : '',
    imageAlt: p.imageAlt || p.title
  }));

  const combined = [...writingEntries, ...newsEntries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 25);

  const lastBuildDate = combined.length
    ? new Date(`${clampDate(combined[0].date)}T00:00:00Z`).toUTCString()
    : new Date(`${TODAY_ISO}T00:00:00Z`).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
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
    const descHtml = it.extLink && it.extLink !== it.link
      ? `${it.description} (${it.extLabel}: ${it.extLink})`
      : it.description;
    const figHtml = it.imageUrl
      ? `<figure><img src="${escXml(it.imageUrl)}" alt="${escXml(it.imageAlt || it.title)}" /></figure>`
      : '';
    const linkHtml = it.extLink && it.extLink !== it.link
      ? `<p><a href="${escXml(it.extLink)}">${escXml(it.extLabel)}</a></p>`
      : '';
    const tagsHtml = it.tags.length
      ? `<p>Topics: ${it.tags.map((t) => escXml(t)).join(', ')}</p>`
      : '';
    const contentHtml = `${figHtml}<p>${escXml(it.description)}</p>${tagsHtml}${linkHtml}`;
    return `    <item>
      <title>${escXml(it.title)}</title>
      <link>${escXml(it.link)}</link>
      <description>${escXml(descHtml)}</description>
      <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>Innocent Nyalala</dc:creator>
      <category>${escXml(it.category)}</category>
      <guid isPermaLink="true">${escXml(it.link)}</guid>
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
