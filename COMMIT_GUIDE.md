# How to commit this work

## Read this first

This folder is an extracted zip, not a git checkout. Worse, there is a git
repository at `C:\Users\Prof` (your home directory), and this folder sits
inside it. Running `git add` or `git commit` here commits into that
home-directory repo, which currently tracks nothing but can see `.ssh/`,
`.git-credentials`, and `AppData/`.

**Do not run git commands in this folder.** Follow the steps below instead.

## Step 1: Clone the real repository

Open a terminal anywhere and run:

```bash
git clone https://github.com/inyalala/inyalala.github.io.git C:/Users/Prof/Documents/site
```

Check which branch it uses, because one file depends on it:

```bash
git -C C:/Users/Prof/Documents/site branch --show-current
```

If that prints `master` rather than `main`, edit both workflow files and
change `base: main` to `base: master`.

## Step 2: Copy the new and changed files across

Twenty-six files. Everything else in the site is untouched.

```bash
cd C:/Users/Prof/Documents/inyalala.github.io-main/inyalala.github.io-main
cp -r .github courses data scripts COMMIT_GUIDE.md C:/Users/Prof/Documents/site/
cp index.html publications/index.html C:/Users/Prof/Documents/site/
```

Note the second line overwrites `index.html` and `publications/index.html`.
Those are the two existing pages that were modified. Everything else is new.

## Step 3: Review before committing

```bash
cd C:/Users/Prof/Documents/site
git status
git diff index.html
```

## Step 4: Commit in logical pieces

Three separate commits, so the history explains itself and any one part can
be reverted without losing the others.

```bash
git checkout -b teaching-and-automation

git add courses/
git commit -m "Add data-driven course pages for Z2005, Z5007, Z2004, Z5008"

git add scripts/ data/ .github/workflows/refresh-metrics.yml index.html publications/index.html
git commit -m "Add automated publication metrics and rebuild the publications page"

git add .github/ISSUE_TEMPLATE/ .github/workflows/news-from-issue.yml COMMIT_GUIDE.md
git commit -m "Add news posting via issue form"
```

## Step 5: Push and open a pull request

```bash
git push -u origin teaching-and-automation
```

Then open the pull request on GitHub and merge it when you are satisfied.

If you would rather commit straight to the default branch, skip the
`git checkout -b` line and push to that branch instead. The branch is
suggested because it lets you see the whole change in one diff first.

## Step 6: Turn on the automation

Once merged:

1. **Set the Scholar key.** Repository Settings, then Secrets and variables,
   then Actions, then New repository secret. Name it `SERPAPI_KEY` and paste
   the key from serpapi.com. Free tier is 100 searches a month; the weekly
   job uses four.
2. **Run it once by hand.** Actions tab, "Refresh publication metrics",
   Run workflow. Confirm it opens a pull request.
3. **Post a news item.** Issues tab, New issue, "Post news". Fill it in,
   submit, and confirm a pull request appears.

## What each part does

| Path | Purpose |
|---|---|
| `courses/` | Course pages. Content lives in `courses/data/*.json`; the HTML is a shell. See `courses/README.md`. |
| `scripts/refresh_metrics.py` | Fetches publications and citation counts. Standard library only. |
| `scripts/news_from_issue.py` | Turns a filled-in issue form into a news entry. |
| `.github/workflows/refresh-metrics.yml` | Weekly. Opens a pull request; never pushes to the live branch. |
| `.github/workflows/news-from-issue.yml` | Fires when you submit the news form. Opens a pull request. |
| `data/manual.json` | The few figures no API provides. Edit by hand. |
| `data/metrics.json`, `data/publications.json` | Generated. Do not edit; they are overwritten each run. |
| `data/news.json` | News entries. Safe to edit by hand. |
| `data/news-inbox.json` | Unreviewed news candidates. Nothing here is published. |

## Still outstanding

`news/index.html` is still hand-written and does not read `data/news.json`.
The posting pipeline fills that file, but the page does not yet display it.
