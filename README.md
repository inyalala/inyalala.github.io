# Dr. Innocent Nyalala - Personal Website

Official website of Dr. Innocent Nyalala, Assistant Professor of Data Science & AI at IIT Madras Zanzibar.

## About

This website showcases the academic profile, research work, publications, and achievements of Dr. Innocent Nyalala, who serves as:
- Assistant Professor of Data Science and AI at IIT Madras Zanzibar
- Associate Research Fellow at Wadhwani School of Data Science & AI, IIT Madras Chennai
- Principal Investigator of SAAIL Lab (Sustainable AI for Agriculture & Intelligent Livelihoods)

## Research Focus

- Artificial Intelligence for Agriculture
- Healthcare AI and Medical Imaging
- Computer Vision
- Machine Learning and Deep Learning
- Natural Language Processing (Swahili)
- Precision Agriculture
- Responsible AI Development

## Structure

- `index.html` — homepage (profile, latest news, latest lab output, contact)
- `research/`, `publications/`, `news/`, `courses/` — main content sections
- `faq/`, `work-with-me/`, `media-kit/` — prospective student/collaborator/press pages
- `data/` — JSON files driving news, courses, and live metrics (edit these, not the HTML, to update content)
- `.github/workflows/` — automation for posting news via issue form and refreshing citation metrics

## Technology

Static HTML/JS with Font Awesome. Styling is Tailwind CSS, **compiled and purged at build time**
(`css/tailwind.css`) rather than loaded from Tailwind's CDN — the CDN build is explicitly
unsuitable for production (ships the full unminified framework and recompiles in-browser on every
load). Content that changes regularly (news, course listings, citation counts) is data-driven from
JSON in `data/` and `courses/data/`, not hand-edited in HTML, so it stays consistent across pages.

## Local Development

Open `index.html` directly in a browser to view the site as-is. If you change any Tailwind
utility classes in the HTML, rebuild the compiled CSS:

```
npm install
npx tailwindcss -i css/tailwind-source.css -o css/tailwind.css --minify
```

## Editing this site

This is a public repository — anyone can view or fork it, but only accounts explicitly added as
collaborators can push changes. Currently that is only the repository owner. Branch protection on
`main` blocks force-pushes as an extra safeguard.

## Contact

- **Email**: innocent@iitmz.ac.in
- **Website**: https://inyalala.github.io
- **LinkedIn**: [Dr. Innocent Nyalala](https://www.linkedin.com/in/innocentnyalala/)
- **Google Scholar**: [Profile](https://scholar.google.com/citations?user=jYVzIZUAAAAJ&hl=en)

## License

© 2026 Dr. Innocent Nyalala. All rights reserved.
