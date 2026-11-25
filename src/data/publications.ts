import rawPubs from './publications.json';

export interface PublicationEntry {
  slug: string;
  title: string;
  shortTitle: string;
  authors: string[];
  venue: string;
  venueShort: string;
  year: number;
  month: string;
  dateISO: string;
  category: 'journal' | 'conference' | 'workshop' | 'preprint';
  status: string;
  award: string;
  impactFactor: string;
  citations: number;
  isSaailLab: boolean;
  openAccess: boolean;
  doi: string;
  paperUrl: string;
  codeUrl: string;
  datasetUrl: string;
  saailPaperUrl: string;
  tldr: string;
  topics: string[];
  bibtex: string;
}

export const PUBLICATIONS: PublicationEntry[] = rawPubs.items as PublicationEntry[];
