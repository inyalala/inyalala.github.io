import type { APIRoute } from 'astro';
import { PROFILE } from '../data/profile';
import metrics from '../data/scholar-metrics.json';
import { PUBLICATIONS } from '../data/publications';
import { COURSES } from '../data/courses';
import { THESES } from '../data/theses';
import { WRITING_POSTS } from '../data/writing';

export const GET: APIRoute = () => {
  const cCount = metrics.citations.toLocaleString('en-US');
  const pCount = PUBLICATIONS.length;

  const lines = [
    '# Innocent Nyalala, PhD - Faculty Monograph & Teaching Hub',
    '',
    `> Personal academic website of ${PROFILE.name}, ${PROFILE.role} at the ${PROFILE.school}, ${PROFILE.institution} (${PROFILE.institutionShort}), ${PROFILE.secondaryRole} at the ${PROFILE.secondaryAffiliation} (WSAI, IIT Madras), and ${PROFILE.labRole} of ${PROFILE.labShort}. Formerly Part-Time Lecturer in the Department of Computer Science at Egerton University, Kenya, and researcher at Nanjing Agricultural University.`,
    '',
    '## Identity & Metrics',
    `- **Name**: ${PROFILE.fullTitle} (Dr. Innocent Nyalala)`,
    `- **Primary Appointment**: ${PROFILE.role}, ${PROFILE.school}, ${PROFILE.campusAddress}`,
    `- **Secondary Appointment**: ${PROFILE.secondaryRole}, ${PROFILE.secondaryAffiliation} (WSAI), Chennai, India`,
    '- **Previous Teaching Role**: Part-Time Lecturer, Department of Computer Science, Egerton University, Nakuru, Kenya',
    `- **Research Laboratory**: SAAIL Lab (${PROFILE.labName}) - ${PROFILE.labUrl}`,
    `- **Email**: ${PROFILE.email}`,
    '- **ORCID**: https://orcid.org/0000-0002-7969-437X',
    '- **OpenAlex**: https://openalex.org/A5013656785',
    `- **Google Scholar**: https://scholar.google.com/citations?user=jYVzIZUAAAAJ&hl=en (${cCount} citations, h-index ${metrics.hIndex}, i10-index ${metrics.i10Index}, ${pCount} cataloged papers & preprints plus ${THESES.map((t) => t.year).join(' and ')} engineering thesis monographs)`,
    '- **Scopus**: https://www.scopus.com/authid/detail.uri?authorId=57190215419',
    '- **Web of Science ResearcherID**: https://www.webofscience.com/wos/author/record/X-4277-2018',
    '- **OpenReview**: https://openreview.net/profile?id=~Innocent_Nyalala1',
    '- **Semantic Scholar**: https://www.semanticscholar.org/author/3406658',
    '- **Frontiers Loop**: https://loop.frontiersin.org/people/277165/overview',
    '- **SciProfiles**: https://sciprofiles.com/profile/1588237',
    `- **Official IITMZ Faculty Profile**: ${PROFILE.facultyProfileUrl}`,
    '',
    '## Signature Systems & Benchmarks',
    '- **CropGuardNet**: Lightweight 481.6K-parameter CNN-Transformer running at 5.00 ms CPU ONNX inference across 35,420 crop images',
    '- **DGS-Bench**: Balanced agricultural evaluation benchmark (Deep Learning Indaba 2026 Best Poster Award, Lagos)',
    '- **CLOVES-4603 & ZSTC Compositional XAI**: Public Zanzibar commercial clove grading dataset (CVPR 2026 CV4A) and 99.45% F1 segmentation-first pipeline (ETRI Journal 2026)',
    '- **CARA-FM**: Resource-aware agricultural foundation models (PMLR Vol. 302; Deep Learning Indaba 2025 Best Poster Award, Kigali)',
    '- **Zanzibar Swahili Corpus & Dira**: Coastal Kiunguja prose and translationese provenance auditing (Swahili NLP)',
    '- **PlacentaVision**: Calibrated three-view maternal imaging consortium with Penn State University and CPHK Pemba (9,883 images)',
    '',
    '## Teaching & Courses (Active Odd Semester 2026-27 & Archive)',
    '- Teaching Portal: https://inyalala.github.io/courses/',
    ...COURSES.map((c) => `- ${c.code} ${c.title} (${c.program} ${c.courseType}, ${c.term}): https://inyalala.github.io/courses/${c.slug}/`),
    `- Course Materials CDN (Slides PDFs, LaTeX Notes PDFs, Notebooks): ${PROFILE.teachingSiteUrl}`,
    '- Teaching Sitemap: https://inyalala.github.io/iitmz-teaching-site/sitemap.xml',
    '',
    '## Research, Writing, News & Languages',
    '- Kiswahili Monograph Overview (Swahili): https://inyalala.github.io/sw/',
    '- Kiswahili Teaching & Courses: https://inyalala.github.io/sw/courses/',
    '- Kiswahili Research Agenda: https://inyalala.github.io/sw/research/',
    '- Kiswahili FAQ & Contact: https://inyalala.github.io/sw/faq/ and https://inyalala.github.io/sw/contact/',
    '- Research Agenda & IC&SR CashewAI Grant: https://inyalala.github.io/research/',
    `- Complete ${pCount}-Paper Publications Catalog, BibTeX & Thesis Monographs: https://inyalala.github.io/publications/`,
    ...THESES.map((t) => `- ${t.shortLabel}: https://inyalala.github.io/publications/theses/${t.slug}/`),
    `- Essays, Research Notes, ABCs of AI in Agriculture & Guides (${WRITING_POSTS.length}): https://inyalala.github.io/writing/`,
    '- Chronological News, Conference Talks & Media Archive: https://inyalala.github.io/news/',
    '- SAAIL Lab Project Websites, Datasets & Team: https://saaillab.github.io/',
    '- Machine-Readable Search Index: https://inyalala.github.io/search-index.json',
    '- RSS Feed: https://inyalala.github.io/feed.xml',
    '- XML Sitemap: https://inyalala.github.io/sitemap.xml',
    '',
    '## Collaboration & Inquiries',
    '- Collaborations, Industry Partnerships, MTech/PhD/Postdoc Mentorship: https://inyalala.github.io/work-with-me/',
    '- Media Kit & Press Bios: https://inyalala.github.io/media-kit/',
    '- FAQ: https://inyalala.github.io/faq/',
    '- Direct Contact: https://inyalala.github.io/contact/'
  ];

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
