import rawPriorPapers from './prior-papers.json';
import rawThesisDetails from './thesis-details.json';
import rawDims from './image-dimensions.json';

export interface PriorAuthor {
  name: string;
  url?: string;
  affiliations: number[];
}

export interface PriorHighlight {
  value: string;
  label: string;
  sublabel?: string;
}

export interface PriorFigure {
  title?: string;
  src: string;
  caption: string;
  alt?: string;
}

export interface PriorTable {
  title: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface PriorDetailSection {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: { heading: string; text: string }[];
  figure?: PriorFigure;
  figures?: PriorFigure[];
  table?: PriorTable;
}

export interface PriorPaper {
  slug: string;
  title: string;
  shortTitle?: string;
  authors: PriorAuthor[];
  affiliations: string[];
  venue: string;
  venueShort: string;
  venueUrl?: string;
  year: number;
  month: string;
  dateISO: string;
  category: string;
  status: string;
  impactFactor?: string;
  award?: string;
  citations?: number;
  openAccess?: boolean;
  doi?: string;
  paperUrl?: string;
  pdfUrl?: string;
  codeUrl?: string;
  datasetUrl?: string;
  posterUrl?: string;
  teaserImage?: string;
  teaserCaption?: string;
  teaserSummary?: string;
  tldr: string;
  abstract: string;
  keywords: string[];
  topics: string[];
  highlights?: PriorHighlight[];
  figureHeading?: string;
  figures?: PriorFigure[];
  resultsSummary?: string;
  contributions?: string[];
  tables?: PriorTable[];
  detailSections?: PriorDetailSection[];
  isSaailLab?: boolean;
  bibtex: string;
  apa?: string;
}

export const PRIOR_PAPERS: PriorPaper[] = rawPriorPapers as PriorPaper[];

const richDetails = rawThesisDetails as { phd?: PriorPaper; msc?: PriorPaper };
const ALL_RAW_COMPANIONS: PriorPaper[] = [
  ...PRIOR_PAPERS,
  ...(richDetails.phd ? [richDetails.phd] : []),
  ...(richDetails.msc ? [richDetails.msc] : [])
];

export const PRIOR_COMPANIONS: PriorPaper[] = ALL_RAW_COMPANIONS.sort((a, b) => {
  if (b.year !== a.year) return b.year - a.year;
  return (b.dateISO || '').localeCompare(a.dateISO || '');
});

export const PHD_CHAPTER_SLUGS = new Set([
  'cherry-tomato-volume-2019',
  'egg-volume-cv-2020',
  'occluded-tomatoes-2021',
  'poultry-cv-review-2021',
  'broiler-carcass-weight-2021',
  'chicken-carcass-3d-2024'
]);

export function getImageDims(src: string): { width: number; height: number } {
  const map = rawDims as Record<string, { width: number; height: number }>;
  return map[src] || { width: 1200, height: 800 };
}
