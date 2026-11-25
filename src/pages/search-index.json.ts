import type { APIRoute } from 'astro';
import { PUBLICATIONS } from '../data/publications';
import { COURSES } from '../data/courses';
import { WRITING_POSTS } from '../data/writing';
import { THESES } from '../data/theses';
import newsData from '../data/news.json';

interface SearchEntry {
  group: 'Pages' | 'Publications' | 'Courses' | 'Writing' | 'News';
  title: string;
  meta: string;
  url: string;
  keywords: string;
  external?: boolean;
}

export const GET: APIRoute = () => {
  const entries: SearchEntry[] = [
    {
      group: 'Pages',
      title: 'Home: Faculty Monograph',
      meta: 'Overview · Bio · Metrics',
      url: '/',
      keywords: 'home overview metrics biography iit madras zanzibar saail'
    },
    {
      group: 'Pages',
      title: 'Toleo la Kiswahili (Swahili Overview)',
      meta: 'Kiswahili · IIT Madras Zanzibar',
      url: '/sw/',
      keywords: 'kiswahili swahili tanzania zanzibar karafuu kilimo afya utafiti ufundishaji'
    },
    {
      group: 'Pages',
      title: 'Research Agenda & Grants',
      meta: 'CashewAI · Agriculture · Swahili NLP · Health ML',
      url: '/research/',
      keywords: 'research pillars grants cashewai cropguardnet cloves zstc placentavision datasets'
    },
    {
      group: 'Pages',
      title: 'Biography & Academic Career',
      meta: 'Appointments · NAU PhD · Egerton · IITMZ',
      url: '/about/',
      keywords: 'biography cv education awards nanjing agricultural university egerton'
    },
    {
      group: 'Pages',
      title: 'Collaborate & Graduate Supervision',
      meta: 'MTech · PhD · Industry · ZSTC · CPHK',
      url: '/work-with-me/',
      keywords: 'collaborate mentorship phd mtech postdoc internship industry zstc'
    },
    {
      group: 'Pages',
      title: 'Media Kit & Press Bios',
      meta: 'Biographies · Portraits · Identifiers',
      url: '/media-kit/',
      keywords: 'media kit bio portrait orcid scopus scholar press'
    },
    {
      group: 'Pages',
      title: 'Frequently Asked Questions',
      meta: 'Office Hours · Supervision · Visits',
      url: '/faq/',
      keywords: 'faq questions students supervision visiting bweleo'
    },
    {
      group: 'Pages',
      title: 'Contact & Direct Inquiry',
      meta: 'Room 105 (F1) · innocent@iitmz.ac.in',
      url: '/contact/',
      keywords: 'contact email office room 105 f1 bweleo zanzibar phone'
    }
  ];

  for (const pub of PUBLICATIONS) {
    const url = pub.isSaailLab ? pub.saailPaperUrl : `/papers/${pub.slug}/`;
    entries.push({
      group: 'Publications',
      title: pub.shortTitle || pub.title,
      meta: `${pub.year} · ${pub.venueShort || pub.venue}`,
      url,
      external: Boolean(pub.isSaailLab),
      keywords: `${pub.title} ${pub.authors.join(' ')} ${(pub.topics || []).join(' ')} ${pub.doi || ''} ${pub.tldr}`.toLowerCase()
    });
  }

  for (const th of THESES) {
    entries.push({
      group: 'Publications',
      title: th.title,
      meta: `${th.shortLabel} · ${th.institution}`,
      url: `/publications/theses/${th.slug}/`,
      keywords: `${th.degree} ${th.supervisors} ${th.methods.join(' ')} ${th.summary}`.toLowerCase()
    });
  }

  for (const c of COURSES) {
    const modTopics = (c.modules || []).map((m: any) => m.title).join(' ');
    entries.push({
      group: 'Courses',
      title: `${c.code}: ${c.title}`,
      meta: `${c.program} ${c.courseType} · ${c.term}`,
      url: `/courses/${c.slug}/`,
      keywords: `${c.code} ${c.title} ${c.summary} ${modTopics}`.toLowerCase()
    });
    if (c.status === 'active') {
      for (const m of c.modules || []) {
        const modSlug = m.code.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        entries.push({
          group: 'Courses',
          title: `${c.code} ${m.code}: ${m.title}`,
          meta: `Week ${m.weeks} · ${c.code} (${c.program})`,
          url: `/courses/${c.slug}/#mod-${modSlug}`,
          keywords: `${c.code} ${m.code} ${m.title} ${m.summary} ${m.readings || ''}`.toLowerCase()
        });
      }
    }
  }

  for (const w of WRITING_POSTS) {
    entries.push({
      group: 'Writing',
      title: w.title,
      meta: `${w.category} · ${w.date}`,
      url: `/writing/${w.slug}/`,
      keywords: `${w.title} ${w.summary} ${(w.tags || []).join(' ')}`.toLowerCase()
    });
  }

  for (const n of newsData.items) {
    entries.push({
      group: 'News',
      title: n.headline,
      meta: `${n.category} · ${n.dateRange || n.date}`,
      url: `/news/#${n.id}`,
      keywords: `${n.headline} ${n.summary} ${n.category} ${n.dateRange || ''}`.toLowerCase()
    });
  }

  return new Response(JSON.stringify({ items: entries }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
