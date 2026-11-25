import { PROFILE } from './profile';
import type { CourseData } from './courses';
import type { PublicationEntry } from './publications';

const BASE = 'https://inyalala.github.io';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function personEntity() {
  return {
    '@type': 'Person',
    '@id': `${BASE}/#person`,
    name: PROFILE.name,
    alternateName: ['Dr. Innocent Nyalala', 'Prof. Innocent Nyalala'],
    givenName: 'Innocent',
    familyName: 'Nyalala',
    honorificSuffix: 'PhD',
    jobTitle: PROFILE.role,
    description: PROFILE.bios.short,
    url: `${BASE}/`,
    email: `mailto:${PROFILE.email}`,
    image: {
      '@type': 'ImageObject',
      url: `${BASE}/images/innocent-nyalala-zanzibar.jpg`,
      width: 640,
      height: 640
    },
    worksFor: {
      '@type': 'CollegeOrUniversity',
      name: PROFILE.institution,
      url: 'https://www.iitmz.ac.in/',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bweleo, P.O. Box 2496',
        addressLocality: 'Zanzibar',
        addressCountry: 'TZ'
      }
    },
    affiliation: [
      {
        '@type': 'CollegeOrUniversity',
        name: `${PROFILE.school}, ${PROFILE.institution}`,
        url: 'https://www.iitmz.ac.in/'
      },
      {
        '@type': 'CollegeOrUniversity',
        name: PROFILE.secondaryAffiliation,
        url: 'https://wsai.iitm.ac.in/'
      },
      {
        '@type': 'ResearchOrganization',
        name: PROFILE.labShort,
        url: PROFILE.labUrl
      }
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Nanjing Agricultural University'
    },
    award: [
      'Deep Learning Indaba 2026 Best Poster Award (Lagos, Nigeria)',
      'Deep Learning Indaba 2025 Best Poster Award (Kigali, Rwanda)',
      'IC&SR IIT Madras Exploratory Research Project Grant (ERP 2026-27)'
    ],
    workLocation: {
      '@type': 'Place',
      name: 'IIT Madras Zanzibar, Bweleo, Zanzibar, Tanzania',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -6.29556,
        longitude: 39.28768
      }
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Deep Learning',
      'Machine Learning',
      'Computer Vision',
      'Data Science',
      'Precision Agriculture AI',
      'Swahili Natural Language Processing',
      'Explainable AI',
      'Healthcare Machine Learning',
      'East Africa AI Research'
    ],
    sameAs: [
      PROFILE.labUrl,
      PROFILE.facultyProfileUrl,
      'https://scholar.google.com/citations?user=jYVzIZUAAAAJ&hl=en',
      'https://orcid.org/0000-0002-7969-437X',
      'https://www.scopus.com/authid/detail.uri?authorId=57190215419',
      'https://www.webofscience.com/wos/author/record/X-4277-2018',
      'https://openreview.net/profile?id=~Innocent_Nyalala1',
      'https://www.semanticscholar.org/author/3406658',
      'https://openalex.org/A5013656785',
      'https://github.com/inyalala',
      'https://www.linkedin.com/in/innocentnyalala/',
      'https://www.researchgate.net/profile/Innocent-Nyalala',
      'https://loop.frontiersin.org/people/277165/overview',
      'https://sciprofiles.com/profile/1588237',
      'https://link.springer.com/journal/44163/editorial-board'
    ]
  };
}

export function websiteEntity() {
  return {
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    url: `${BASE}/`,
    name: 'Innocent Nyalala | Faculty Monograph & Teaching Hub',
    inLanguage: 'en-US',
    publisher: { '@id': `${BASE}/#person` }
  };
}

export function isInnocentNyalala(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    (lower.includes('innocent') && lower.includes('nyalala')) ||
    lower.trim() === 'i. nyalala' ||
    lower.trim() === 'nyalala, i.'
  );
}

export function webPageEntity(opts: {
  url: string;
  name: string;
  description: string;
  type?: string;
  breadcrumbId?: string;
  mainEntityId?: string;
}) {
  return {
    '@type': opts.type || 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#person` },
    ...(opts.breadcrumbId ? { breadcrumb: { '@id': opts.breadcrumbId } } : {}),
    ...(opts.mainEntityId ? { mainEntity: { '@id': opts.mainEntityId } } : {})
  };
}

export function breadcrumbList(items: BreadcrumbItem[], id?: string) {
  return {
    '@type': 'BreadcrumbList',
    ...(id ? { '@id': id } : {}),
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function courseSchemaNode(c: CourseData) {
  const pageUrl = `${BASE}/courses/${c.slug}/`;
  const instructors: Record<string, unknown>[] = [{ '@id': `${BASE}/#person` }];
  if (c.coInstructor) {
    instructors.push({
      '@type': 'Person',
      name: c.coInstructor.name,
      affiliation: { '@type': 'CollegeOrUniversity', name: c.coInstructor.institution }
    });
  }
  return {
    '@type': 'Course',
    '@id': `${pageUrl}#course`,
    name: `${c.code}: ${c.title}`,
    courseCode: c.code,
    description: c.summary,
    url: pageUrl,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    inLanguage: 'en-US',
    educationalLevel: c.program === 'MTech' ? 'Graduate' : 'Undergraduate',
    teaches: c.outcomes,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: PROFILE.institution,
      url: 'https://www.iitmz.ac.in/'
    },
    instructor: instructors.length === 1 ? instructors[0] : instructors,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      name: `${c.code} (${c.term})`,
      courseMode: 'Onsite',
      courseWorkload: c.credits,
      instructor: { '@id': `${BASE}/#person` },
      location: {
        '@type': 'Place',
        name: PROFILE.campusAddress
      }
    }
  };
}

export function scholarlyArticleNode(p: PublicationEntry) {
  const companionUrl = p.isSaailLab ? p.saailPaperUrl : `${BASE}/papers/${p.slug}/`;
  return {
    '@type': 'ScholarlyArticle',
    headline: p.title,
    datePublished: p.dateISO || String(p.year),
    isPartOf: { '@type': 'PublicationIssue', name: p.venue },
    author: p.authors.map((name) =>
      isInnocentNyalala(name)
        ? { '@id': `${BASE}/#person` }
        : { '@type': 'Person', name }
    ),
    url: p.doi ? `https://doi.org/${p.doi}` : companionUrl,
    sameAs: companionUrl || undefined,
    isAccessibleForFree: Boolean(p.openAccess)
  };
}
