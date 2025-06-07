# SAAIL Lab Website Deployment Guide

## Linking with Your Existing Website (inyalala.github.io)

### Option 1: Subdirectory Approach
Host SAAIL Lab at: `https://inyalala.github.io/saail-lab/`

1. **In your main inyalala.github.io repository:**
   - Create a `saail-lab` folder
   - Copy all SAAIL Lab files into this folder
   - Update the Astro config for subdirectory deployment

2. **Update astro.config.mjs for subdirectory:**
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://inyalala.github.io',
  base: '/saail-lab',
});
```

3. **Update navigation links in your main site:**
Add a link to SAAIL Lab in your main website's navigation.

### Option 2: Separate Repository with Cross-Linking
Keep SAAIL Lab as a separate repository but add cross-navigation.

### Option 3: Subdomain Approach
Use GitHub Pages custom domain to create: `saail.inyalala.com`

## Deployment Steps

### For Subdirectory Approach:

1. **Clone your existing repository:**
```bash
git clone https://github.com/inyalala/inyalala.github.io.git
cd inyalala.github.io
```

2. **Create saail-lab directory:**
```bash
mkdir saail-lab
cd saail-lab
```

3. **Copy SAAIL Lab files here**

4. **Update package.json in saail-lab folder:**
```json
{
  "name": "saail-lab",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build --outDir ../dist/saail-lab",
    "preview": "astro preview"
  }
}
```

5. **Update GitHub Actions workflow:**
Create `.github/workflows/deploy-saail.yml` in your main repo.

### For Separate Repository:
1. Create new repo: `saail-lab`
2. Deploy to: `https://inyalala.github.io/saail-lab/` using GitHub Pages
3. Add cross-links between sites

## Cross-Linking Strategy

### In your main website:
- Add "Research" or "SAAIL Lab" section
- Link to the SAAIL Lab website
- Add it to your navigation menu

### In SAAIL Lab website:
- Add link back to your main portfolio
- Include "Dr. Innocent Nyalala's Portfolio" in footer or header

## Custom Domain Option

If you have a custom domain, you could set up:
- Main site: `inyalala.com`
- SAAIL Lab: `saail.inyalala.com` or `lab.inyalala.com`