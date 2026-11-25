import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export type WritingCategory =
  | 'Research Note'
  | 'Scholar Guide'
  | 'Essay & Reflection'
  | 'Zanzibar & Campus Guide';

export interface WritingHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface WritingPost {
  slug: string;
  title: string;
  shortTitle?: string;
  date: string;
  category: WritingCategory;
  readingTime: string;
  summary: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  headings: WritingHeading[];
  Content: AstroComponentFactory;
}

interface MarkdownModule {
  frontmatter: {
    title: string;
    shortTitle?: string;
    date: string;
    category: WritingCategory;
    readingTime: string;
    summary: string;
    tags?: string[];
    image?: string;
    imageAlt?: string;
  };
  getHeadings?: () => WritingHeading[];
  default: AstroComponentFactory;
}

const modules = import.meta.glob<MarkdownModule>('../content/writing/**/*.md', { eager: true });

export const WRITING_POSTS: WritingPost[] = Object.entries(modules)
  .map(([filepath, mod]) => {
    const filename = filepath.split('/').pop() || '';
    const slug = filename.replace(/\.md$/, '');
    const headings = (mod.getHeadings ? mod.getHeadings() : []).filter((h) => h.depth === 2 || h.depth === 3);
    return {
      slug,
      title: mod.frontmatter.title,
      shortTitle: mod.frontmatter.shortTitle,
      date: mod.frontmatter.date,
      category: mod.frontmatter.category,
      readingTime: mod.frontmatter.readingTime,
      summary: mod.frontmatter.summary,
      tags: mod.frontmatter.tags || [],
      image: mod.frontmatter.image,
      imageAlt: mod.frontmatter.imageAlt,
      headings,
      Content: mod.default
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
