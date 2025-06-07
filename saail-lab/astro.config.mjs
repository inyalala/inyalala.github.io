// @ts-check
import { defineConfig } from 'astro/config';

// Configuration for subdirectory deployment
// Uncomment and modify the base path if deploying as subdirectory
export default defineConfig({
  // For subdirectory deployment (e.g., inyalala.github.io/saail-lab/)
  // site: 'https://inyalala.github.io',
  // base: '/saail-lab',
  
  // For separate domain or root deployment
  site: 'https://inyalala.github.io',
});