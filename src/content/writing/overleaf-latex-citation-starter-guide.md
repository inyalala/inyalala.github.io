---
title: "Getting Started with Overleaf, LaTeX, and Clean BibTeX Citations"
shortTitle: "Overleaf, LaTeX & Clean Citations Guide"
date: "2026-11-22"
category: "Scholar Guide"
readingTime: "7 min read"
summary: "A practical starter workflow for undergraduate capstone students, MTech scholars, and doctoral researchers preparing reproducible academic manuscripts in Overleaf."
tags:
  - Overleaf
  - LaTeX
  - Scientific Writing
  - Student Guide
image: "/images/writing/overleaf-latex-guide.webp"
imageAlt: "Scholar walnut study desk with open technical book, brass fountain pen, laptop split editor, and ceramic mug of spiced tea"
---

Switching from word processors to **Overleaf** and **LaTeX** removes layout formatting anxiety during the final week before a journal, thesis, or conference deadline. When equations, tables, figure numbering, and citations update automatically from structured source files, writers can spend their energy on scientific clarity, statistical rigor, and visual evidence rather than repairing broken margins.

## 1. Organize Your Overleaf Project Before Writing

Creating ten sections inside one 2,000-line `main.tex` file slows compilation and invites accidental deletions among co-authors. Start every project with a predictable tree:

```text
project-root/
  main.tex            # Preamble, metadata, \input{...} order, \bibliography
  references.bib      # Single canonical BibTeX file
  sections/
    01_introduction.tex
    02_methods.tex
    03_results.tex
    04_discussion.tex
  figures/            # Vector PDF figures (diagrams, charts) & cropped PNG/JPG plates
  tables/             # Separate large booktabs tables when helpful
```

In `main.tex`, prefer `\input{sections/02_methods}` over `\include{...}` inside articles so page breaks never get forced abruptly between short sections. Store `\graphicspath{{figures/}}` once in the preamble so every figure call remains short and portable if the project later moves out of Overleaf onto a local workstation.

## 2. Write Methods and Figure Outlines First

Experienced scientific authors rarely write a manuscript straight from the Abstract to the Conclusion. Follow the experimental evidence sequence:

1. **Outline with Figures First:** Decide which three to six charts or architecture schematics carry the main claims of your study before writing paragraphs.
2. **Methods Immediately:** Record dataset splits, deduplication criteria, exact software versions, random seeds, loss equations, and hardware specs right after running baselines, before details fade.
3. **Results Next:** Describe quantitative patterns, error bars, and statistical tests tied directly to `Fig.` and `Table` labels without reading every cell aloud.
4. **Discussion & Conclusion:** Explain physical or algorithmic mechanisms, contrast with prior literature, and explicitly state failure bounds and limitations.
5. **Introduction, Abstract & Title Last:** Frame the exact research gap that your finished tables and figures resolve.

## 3. Keep BibTeX Clean and Verified

Corrupted citations cost reviewers trust faster than minor typos in prose. Follow three habits across every `.bib` file:

- **Verify DOIs from Primary Records:** Never copy BibTeX blindly from unverified secondary blogs or autocomplete tools that invent volume numbers or swap page ranges. Export `.bib` entries directly from Crossref, ACM Digital Library, IEEE Xplore, Springer, ScienceDirect, or official conference proceedings (`CVPR`, `ICLR`, `PMLR`).
- **Protect Capitalization with Braces:** BibTeX sentence-cases article titles unless acronyms or proper nouns sit inside braces: write `title={{CropGuardNet}: Lightweight {CNN}-Transformer Networks for {East African} Crops}` rather than losing capitalization on `CNN`, `East African`, or `Swahili`.
- **Use Meaningful Citation Keys:** Naming keys `nyalala2026cloves` or `he2016resnet` makes drafts human-readable inside `\cite{...}` commands and keeps multi-author merges conflict-free. Never leave unused entries sitting uncited inside your submitted `.bib` archive, and check the Overleaf log tab to confirm `0` undefined citations.

## 4. Tables, Equations & Vector Figures That Pass Review

Peer reviewers zoom in closely on plots and tables. Four small formatting habits improve visual quality immediately:

- **Use `booktabs`, Never Vertical Lines:** Pair `\toprule`, `\midrule`, and `\bottomrule` with clean right-aligned numeric columns (`S` column or monospace spacing) and mark only the top column value per metric in bold.
- **Keep Captions Crisp:** State *what* the table or figure measures in one to two clear sentences; explain datasets, splits, and seeds in surrounding prose or concise table footnotes (`\dagger`).
- **Export Charts as Vector PDFs:** Save Matplotlib charts, plots, and flow schematics with `savefig("fig1.pdf", bbox_inches="tight")` rather than blurry 72-dpi PNG screenshots so typography scales razor-sharp at any magnification.
- **Follow Consistent Cross-References:** Always tie labels (`\label{fig:pipeline}`, `\label{tab:metrics}`, `\label{eq:loss}`) together with non-breaking tildes (`Fig.~\ref{fig:pipeline}`, `Table~\ref{tab:metrics}`, `Eq.~(\ref{eq:loss})`), spelling out `Figure~\ref{...}` at the start of sentences.

## 5. Protect Long-Term Reproducibility Outside the Cloud

Overleaf's **History** panel helps when collaborating live, yet academic groups should not rely on a single proprietary web workspace as their sole backup. At every milestone (first complete draft, initial submission, revised rebuttal), download the full source zip or sync Overleaf via Git into your research group archive. Keeping raw source `.tex`, `.bib`, plotting scripts, and vector figures versioned together guarantees your work compiles cleanly twenty years from now. Students enrolled in IIT Madras Zanzibar courses can also inspect live compiled examples and BibTeX exports across the [Teaching Portal](/courses/) and [Publications catalog](/publications/), or reach out via [Collaborate & Supervision](/work-with-me/).
