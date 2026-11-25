// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://inyalala.github.io',
  trailingSlash: 'always',
  server: {
    host: true
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
