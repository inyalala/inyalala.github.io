import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    category: z.enum(['Research Note', 'Scholar Guide', 'Essay & Reflection', 'Zanzibar & Campus Guide']),
    readingTime: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional()
  })
});

export const collections = { writing };
