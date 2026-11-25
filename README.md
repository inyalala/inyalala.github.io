# Innocent Nyalala: Faculty Website

Source repository for the personal faculty website of Dr. Innocent Nyalala (`https://inyalala.github.io`), Assistant Professor in the School of Engineering and Science, Indian Institute of Technology Madras Zanzibar, and Associate Research Fellow in the Wadhwani School of Data Science and Artificial Intelligence, IIT Madras.

## Architecture Overview

- **Framework**: Astro 5 (`output: 'static'`, zero client-side framework overhead, native CSS design tokens)
- **Course Delivery Hub**: Companion repository `iitmz-teaching-site` (`https://inyalala.github.io/iitmz-teaching-site/`) hosting standalone lecture HTML decks, downloadable PDFs, PPTX slide decks, Jupyter/Colab notebooks, tutorials, and question banks
- **Lab Website Separation**: Research group members, project companion sites, datasets, software releases, and student spotlights live on `https://saaillab.github.io/`
- **Hosting & Automation**: GitHub Pages deployed via GitHub Actions (`.github/workflows/deploy.yml`), weekly Google Scholar metric updates via `scripts/refresh_scholar_metrics.py`, and issue-driven news publishing via `scripts/news_from_issue.py`

## Local Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static bundle to ./dist
npm run preview  # previews built ./dist bundle
```

## Long-Term Maintenance

See [LONG_TERM_MAINTENANCE_AND_TEACHING_ARCHITECTURE.md](docs/LONG_TERM_MAINTENANCE_AND_TEACHING_ARCHITECTURE.md) for the 25-year zero-database storage design, semester archiving with Git tags, one-command lecture upload workflows, and large-file handling via GitHub Releases.

## Licensing

- Editorial prose and site pages: Creative Commons Attribution-NonCommercial 4.0 International (`CC BY-NC 4.0`)
- Course notes, slides, and tutorials: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (`CC BY-NC-SA 4.0`)
- Site source code and build scripts: MIT License (see `LICENSE`)
