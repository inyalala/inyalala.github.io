# Long-Term Maintenance and 100-Year Monograph Architecture

This guide documents how `inyalala.github.io` and `iitmz-teaching-site` operate so Dr. Innocent Nyalala can update essays, news, Google Scholar metrics, and course slides over decades without database servers, recurring hosting costs, or vendor lock-in.

---

## 1. Static Monograph & Course Storage vs. Online Database

An external hosted database is unnecessary for a faculty monograph and teaching portal managed by one author:

1. **Zero downtime & zero recurring cost**: GitHub Pages serves static HTML, CSS, compressed WebP images, PDFs, and Jupyter notebooks globally with no database tier expirations or server patching.
2. **Human-readable files for 100 years**: Publications (`src/data/publications.json`), news (`src/data/news.json`), Scholar metrics (`src/data/scholar-metrics.json`), coursework (`src/data/courses.ts`), and essays (`src/content/writing/*.md`) are stored in plain UTF-8 Markdown, JSON, and TypeScript.
3. **Clear boundary from SAAIL Lab**: Personal biography, faculty courses, writing/travel guides, and complete publication bibliography stay here (`https://inyalala.github.io/`); research group member rosters, interactive lab project portals, benchmark datasets, and Android tools live on `https://saaillab.github.io/`.

---

## 2. Bi-Weekly Publishing Workflows (Essays, Travel Guides & News)

### Adding a Research Note or Travel Guide (`/writing/`)
Create a plain Markdown file under `src/content/writing/<slug>.md` with frontmatter:

```markdown
---
title: "Your Article Headline"
date: "2026-12-01"
category: "Essay & Reflection" # Research Note | Scholar Guide | Essay & Reflection | Zanzibar & Campus Guide
readingTime: "4 min read"
summary: "One crisp sentence summarizing the post."
tags:
  - AI Research
---

Article body in Markdown...
```

Commit and push to `main`; Astro generates `/writing/<slug>/`, updates `/writing/`, adds the URL to `sitemap.xml`, and includes it in `feed.xml`.

### Publishing News via GitHub Issue Form
1. Open **New issue -> Post news** (`.github/ISSUE_TEMPLATE/news.yml`) with headline, details, category (`Award`, `Publication`, `Grant`, `Talk`, `Media`, `Conference`, `Teaching`, `Appointment`, `Lab`, `Other`), date, link, optional `/images/news/...` path, and source credit.
2. `.github/workflows/news-from-issue.yml` runs `scripts/news_from_issue.py`, inserts or updates the item by issue number in `src/data/news.json`, and opens a review pull request (`create-pull-request@v6`) against the repository default branch.

---

## 3. Automated Weekly Google Scholar Sync + Auto-Deploy

- Every Monday at `03:15 UTC`, `.github/workflows/refresh-scholar-metrics.yml` runs `scripts/refresh_scholar_metrics.py`.
- The script queries SerpApi (if `SERPAPI_KEY` secret is configured under **Settings -> Secrets and variables -> Actions**), falls back to Google Scholar HTML and OpenAlex, updates `citations`, `citationsSince2021`, `citationsSinceYear`, `citationsSinceRecent`, `hIndex`, `i10Index`, and `citationsPerYear` strictly monotonically, and commits changes to `src/data/scholar-metrics.json`.
- `.github/workflows/deploy.yml` triggers automatically on completion of **Refresh Google Scholar Metrics** (`workflow_run`), rebuilding and publishing the updated citation counts without manual intervention.

---

## 4. Reusing Courses & Uploading Slides Across 25+ Years

See `iitmz-teaching-site/docs/TEACHING_WORKFLOW.md` for `scripts/add_lecture.py`, canonical URL preservation, immutable semester Git tags (`git tag -a 2026-odd` for full-semester snapshots, matching `iitmz-teaching-site/docs/TEACHING_WORKFLOW.md`, or course-scoped tags like `z5007-2026-odd`), and storing binaries `>= 40 MB` on GitHub Releases. Legacy institute syllabus PDFs under `/syllabi/` and `/courses/assets/syllabi/` remain preserved as permanent archive URLs for historical student bookmarks.

---

## 5. Initial Repository Deployment Setup (One Time)

In GitHub for `inyalala/inyalala.github.io`:
1. Open **Settings -> Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push `main`. GitHub Actions builds Astro 5 and deploys `./dist` to `https://inyalala.github.io/`.
