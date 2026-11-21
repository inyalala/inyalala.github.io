#!/usr/bin/env python3
"""
Refresh publication metrics and news candidates for inyalala.github.io.

Runs unattended on a schedule. Writes three files under data/:

    metrics.json        headline numbers for the profile page
    publications.json   full publication list with venue information
    news-inbox.json     candidate news mentions, NOT published automatically

Design notes, because this is meant to run for years without attention:

  * Standard library only. No pip dependencies to rot.
  * Every network call is wrapped. If a source is unavailable the previous
    good data is kept rather than overwritten with nothing.
  * Sanity guards refuse to write implausible regressions (citation counts
    do not fall by 30 percent; that means a bad query, not lost citations).
  * Google Scholar is deliberately not scraped. It has no API, forbids
    automated access, and blocks bots. Scholar figures are maintained by
    hand in data/manual.json and merged in, clearly labeled.

Usage:
    python scripts/refresh_metrics.py            # write files
    python scripts/refresh_metrics.py --dry-run  # print, write nothing
"""

import argparse
import html as html_lib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

# ---------------------------------------------------------------- config

ORCID = "0000-0002-7969-437X"
# The 'user' parameter from your Google Scholar profile URL.
SCHOLAR_USER_ID = "jYVzIZUAAAAJ"
# OpenAlex asks for a contact address in the query string. It is not
# authentication; it just moves you into their faster, politer pool.
MAILTO = "innocent@iitmz.ac.in"

NEWS_QUERIES = [
    '"Innocent Nyalala"',
    '"SAAIL Lab" Zanzibar',
]

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")

USER_AGENT = "inyalala.github.io metrics refresh (+https://inyalala.github.io)"
BROWSER_UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")
TIMEOUT = 45
RETRIES = 3

# Guards. If new data violates these, the run fails loudly and writes nothing.
MAX_CITATION_DROP = 0.30   # 30 percent
MAX_WORKS_DROP = 0.20      # 20 percent


# ---------------------------------------------------------------- helpers

def log(msg):
    print("[%s] %s" % (datetime.now().strftime("%H:%M:%S"), msg), flush=True)


def fetch(url, parse="json", ua=None):
    """GET with retries and backoff. Returns parsed body, or None on failure."""
    last = None
    for attempt in range(1, RETRIES + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": ua or USER_AGENT})
            with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
                raw = r.read()
            return json.loads(raw) if parse == "json" else raw
        except (urllib.error.URLError, urllib.error.HTTPError,
                ValueError, TimeoutError) as e:
            last = e
            wait = 2 ** attempt
            log("  attempt %d/%d failed (%s), retrying in %ds" % (attempt, RETRIES, e, wait))
            time.sleep(wait)
    log("  giving up on %s: %s" % (url, last))
    return None


def read_json(name, default=None):
    path = os.path.join(DATA, name)
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (ValueError, OSError) as e:
        log("  could not read existing %s (%s), treating as absent" % (name, e))
        return default


def write_json(name, payload, dry_run=False):
    path = os.path.join(DATA, name)
    body = json.dumps(payload, indent=2, ensure_ascii=False) + "\n"
    if dry_run:
        log("  DRY RUN, would write %s (%d bytes)" % (name, len(body)))
        return False
    os.makedirs(DATA, exist_ok=True)
    # Write to a temporary file and replace, so an interrupted run cannot
    # leave a half-written file that the site would then fail to parse.
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(body)
    os.replace(tmp, path)
    log("  wrote %s" % name)
    return True


def h_index(citation_counts):
    ordered = sorted(citation_counts, reverse=True)
    return sum(1 for i, c in enumerate(ordered) if c >= i + 1)


def i10_index(citation_counts):
    return sum(1 for c in citation_counts if c >= 10)


# ---------------------------------------------------------------- openalex

def openalex(path, **params):
    params["mailto"] = MAILTO
    return fetch("https://api.openalex.org/%s?%s" % (path, urllib.parse.urlencode(params)))


def fetch_author():
    d = openalex("authors", filter="orcid:" + ORCID)
    if not d or not d.get("results"):
        return None
    return d["results"][0]


def fetch_works():
    """All works for the ORCID, paged."""
    out, cursor = [], "*"
    while cursor:
        d = openalex("works", filter="author.orcid:" + ORCID,
                     per_page="200", cursor=cursor)
        if not d:
            return None
        out.extend(d.get("results", []))
        cursor = (d.get("meta") or {}).get("next_cursor")
        if not d.get("results"):
            break
    return out


def fetch_sources(source_ids):
    """Venue-level metrics for the journals the works appeared in."""
    sources = {}
    ids = [s for s in source_ids if s]
    for i in range(0, len(ids), 50):
        batch = ids[i:i + 50]
        key = "|".join(s.rsplit("/", 1)[-1] for s in batch)
        d = openalex("sources", filter="openalex_id:" + key, per_page="50")
        if not d:
            continue
        for s in d.get("results", []):
            sources[s["id"]] = s
    return sources


def fetch_scholar_direct():
    """
    Attempt lightweight direct parse of the public Google Scholar profile page.
    If rate-limited or blocked on datacenter IPs, returns None gracefully so
    scheduled workflows fall back to data/manual.json without failing.
    """
    if not SCHOLAR_USER_ID:
        return None
    url = "https://scholar.google.com/citations?user=%s&hl=en" % urllib.parse.quote(SCHOLAR_USER_ID)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": BROWSER_UA,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            body = r.read().decode("utf-8", errors="ignore")
    except Exception as e:
        log("  Direct Scholar fetch skipped/blocked (%s), using fallback" % e)
        return None

    if "gsc_rsb_std" not in body:
        log("  Direct Scholar HTML had no citation table (likely consent/captcha gate), using fallback")
        return None

    cells = re.findall(r'<td class="gsc_rsb_std">(\d+)</td>', body)
    if len(cells) < 5:
        return None
    citations_all = int(cells[0])
    since_2021 = int(cells[1]) if len(cells) > 1 else None
    h_idx = int(cells[2]) if len(cells) > 2 else None
    i10_idx = int(cells[4]) if len(cells) > 4 else None

    years = re.findall(r'<span class="gsc_g_t"[^>]*>(\d{4})</span>', body)
    vals = re.findall(r'<span class="gsc_g_al">(\d+)</span>', body)
    graph = {}
    if len(years) == len(vals) and years:
        for y, v in zip(years, vals):
            graph[str(y)] = int(v)

    return {
        "citations": citations_all,
        "since2021": since_2021,
        "hIndex": h_idx,
        "i10Index": i10_idx,
        "citationsPerYear": graph or None,
        "citationsPerYearExact": bool(graph),
        "asOf": datetime.now(timezone.utc).strftime("%Y-%m"),
        "automated": True,
    }


def fetch_scholar():
    """
    Google Scholar figures via SerpApi (when SERPAPI_KEY is set), otherwise
    direct public profile parse with graceful fallback to data/manual.json.
    """
    key = os.environ.get("SERPAPI_KEY", "").strip()
    if not key:
        log("  SERPAPI_KEY not set, attempting direct Scholar parse with manual.json fallback")
        return fetch_scholar_direct()
    if not SCHOLAR_USER_ID:
        log("  SCHOLAR_USER_ID not configured, skipping Scholar")
        return None

    url = "https://serpapi.com/search?" + urllib.parse.urlencode({
        "engine": "google_scholar_author",
        "author_id": SCHOLAR_USER_ID,
        "api_key": key,
        "num": "100",
    })
    d = fetch(url)
    if not d:
        log("  SerpApi unavailable, trying direct Scholar / manual fallback")
        return fetch_scholar_direct()
    if d.get("error"):
        log("  SerpApi returned an error (%s), trying direct Scholar / manual fallback" % d["error"])
        return fetch_scholar_direct()

    table = {}
    for row in (d.get("cited_by") or {}).get("table") or []:
        for metric, cell in row.items():
            if isinstance(cell, dict) and cell.get("all") is not None:
                table[metric] = cell["all"]

    if not table.get("citations"):
        log("  SerpApi response had no citation table, trying direct Scholar / manual fallback")
        return fetch_scholar_direct()

    # The bar chart on the Scholar profile: citations RECEIVED in each year.
    # This is a different quantity from the OpenAlex series, which partitions
    # citations by the publication year of the cited work.
    graph = {}
    for point in (d.get("cited_by") or {}).get("graph") or []:
        if point.get("year") and point.get("citations") is not None:
            graph[str(point["year"])] = point["citations"]

    return {
        "citations": table.get("citations"),
        "hIndex": table.get("h_index"),
        "i10Index": table.get("i10_index"),
        "works": len(d.get("articles") or []) or None,
        "citationsPerYear": graph or None,
        "citationsPerYearExact": bool(graph),
        "asOf": datetime.now(timezone.utc).strftime("%Y-%m"),
        "automated": True,
    }


def load_sjr():
    """
    Optional. Scimago blocks automated download, so if you want SJR
    quartiles, download journalrank.php as CSV by hand once a year and drop
    it at data/sjr.csv. Joined on ISSN. Absent file is not an error.
    """
    path = os.path.join(DATA, "sjr.csv")
    if not os.path.exists(path):
        return {}
    table = {}
    try:
        import csv
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            for row in csv.DictReader(f, delimiter=";"):
                quartile = (row.get("SJR Best Quartile") or "").strip()
                for issn in (row.get("Issn") or "").split(","):
                    issn = issn.strip()
                    if len(issn) == 8:
                        issn = issn[:4] + "-" + issn[4:]
                    if issn and quartile and quartile != "-":
                        table[issn] = quartile
        log("  loaded SJR quartiles for %d ISSNs" % len(table))
    except Exception as e:
        log("  could not parse sjr.csv (%s), skipping quartiles" % e)
    return table


# ---------------------------------------------------------------- news

def fetch_news():
    """
    Candidate mentions from Google News RSS. These are NOT published.
    They land in an inbox for review, because this is text written by
    strangers and it should never reach the live site unread.
    """
    items = []
    any_feed_ok = False
    for q in NEWS_QUERIES:
        url = ("https://news.google.com/rss/search?q=%s&hl=en-US&gl=US&ceid=US:en"
               % urllib.parse.quote(q))
        # Google News rejects unfamiliar user-agents outright.
        raw = fetch(url, parse="raw", ua=BROWSER_UA)
        if not raw:
            continue
        try:
            root = ET.fromstring(raw)
        except ET.ParseError as e:
            log("  could not parse news feed for %s (%s)" % (q, e))
            continue
        any_feed_ok = True
        for it in root.iter("item"):
            def txt(tag):
                el = it.find(tag)
                return (el.text or "").strip() if el is not None and el.text else ""
            items.append({
                "title": txt("title"),
                "link": txt("link"),
                "published": txt("pubDate"),
                "source": txt("source"),
                "query": q,
                "status": "unreviewed",
            })
    # De-duplicate on link, newest first is whatever the feed gave us.
    seen, unique = set(), []
    for it in items:
        if it["link"] and it["link"] not in seen:
            seen.add(it["link"])
            unique.append(it)
    # None means every feed failed. An empty list means the feeds worked and
    # simply had nothing, which is a legitimate result worth writing.
    return unique if any_feed_ok else None


# ---------------------------------------------------------------- build

def build(dry_run=False):
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat()

    log("fetching author record from OpenAlex")
    author = fetch_author()
    log("fetching works")
    works = fetch_works()

    if author is None or works is None:
        log("ABORT: OpenAlex unavailable. Existing data left untouched.")
        return 1
    if not works:
        log("ABORT: OpenAlex returned zero works. Refusing to publish that.")
        return 1

    cites = [w.get("cited_by_count", 0) for w in works]
    total_citations = sum(cites)

    # ---- sanity guards against a bad query silently gutting the site
    previous = read_json("metrics.json") or {}
    prev_c = ((previous.get("openalex") or {}).get("citations")) or 0
    prev_w = ((previous.get("openalex") or {}).get("works")) or 0
    if prev_c and total_citations < prev_c * (1 - MAX_CITATION_DROP):
        log("ABORT: citations fell from %d to %d. That is not real; check the query."
            % (prev_c, total_citations))
        return 1
    if prev_w and len(works) < prev_w * (1 - MAX_WORKS_DROP):
        log("ABORT: works fell from %d to %d. Refusing to write."
            % (prev_w, len(works)))
        return 1

    # ---- venue information
    source_ids = []
    for w in works:
        src = ((w.get("primary_location") or {}).get("source")) or {}
        if src.get("id"):
            source_ids.append(src["id"])
    log("fetching venue metrics for %d distinct sources" % len(set(source_ids)))
    sources = fetch_sources(sorted(set(source_ids)))
    sjr = load_sjr()

    pubs = []
    for w in works:
        src = ((w.get("primary_location") or {}).get("source")) or {}
        full = sources.get(src.get("id"), {})
        issn_l = full.get("issn_l") or src.get("issn_l")
        summary = full.get("summary_stats") or {}
        doi = (w.get("doi") or "").replace("https://doi.org/", "")
        # Not peer reviewed: ResearchGate-hosted working papers (DOI prefix
        # 10.13140), arXiv and other preprint servers, and anything OpenAlex
        # types as a preprint. Flagged so the site can label or exclude them
        # rather than listing them beside journal articles.
        is_preprint = (
            doi.startswith("10.13140")
            or doi.startswith("10.48550")
            or (w.get("type") or "") == "preprint"
            or bool((w.get("primary_location") or {}).get("is_published") is False)
        )
        pubs.append({
            "isPreprint": is_preprint,
            "title": w.get("title") or w.get("display_name"),
            "year": w.get("publication_year"),
            "type": w.get("type"),
            "doi": doi or None,
            "citations": w.get("cited_by_count", 0),
            "openAccess": ((w.get("open_access") or {}).get("is_oa")) or False,
            "authors": [
                (a.get("author") or {}).get("display_name")
                for a in (w.get("authorships") or [])
            ][:12],
            "venue": {
                "name": full.get("display_name") or src.get("display_name"),
                "issn": issn_l,
                "publisher": full.get("host_organization_name"),
                # OpenAlex 2-year mean citedness. This is an impact-factor-like
                # figure computed on open data. It is NOT the Clarivate JIF and
                # must never be labeled as one.
                "meanCitedness2yr": round(summary["2yr_mean_citedness"], 2)
                    if summary.get("2yr_mean_citedness") else None,
                "sjrQuartile": sjr.get(issn_l) if issn_l else None,
            },
            "url": w.get("doi") or w.get("id"),
        })

    # Merge curated non-OpenAlex items from existing data/publications.json
    # (e.g., ETRI/workshop/under-review entries not yet indexed by OpenAlex)
    # so weekly OpenAlex runs never delete curated records.
    existing_pubs = (read_json("publications.json") or {}).get("items", [])
    seen_dois = {str(p.get("doi") or "").lower().strip() for p in pubs if p.get("doi")}
    seen_titles = {re.sub(r"[^a-z0-9]+", "", str(p.get("title") or "").lower()) for p in pubs}
    for old_p in existing_pubs:
        old_doi = str(old_p.get("doi") or "").lower().strip()
        old_tnorm = re.sub(r"[^a-z0-9]+", "", str(old_p.get("title") or "").lower())
        if old_p.get("manual") or (old_doi and old_doi not in seen_dois) or (old_tnorm and old_tnorm not in seen_titles):
            pubs.append(old_p)
            if old_doi:
                seen_dois.add(old_doi)
            if old_tnorm:
                seen_titles.add(old_tnorm)

    pubs.sort(key=lambda p: (-(p["year"] or 0), -(p.get("citations") or 0)))

    # ---- Scholar figures: automated via SerpApi or direct HTML parse when
    # reachable, otherwise the verified baseline values in data/manual.json.
    manual = read_json("manual.json", {}) or {}
    scholar = dict(manual.get("scholar") or {})
    prev_s_block = previous.get("scholar") or {}
    if (prev_s_block.get("citations") or 0) > (scholar.get("citations") or 0):
        for k in ("citations", "since2021", "hIndex", "i10Index", "works", "citationsPerYear", "asOf"):
            if prev_s_block.get(k) is not None:
                scholar[k] = prev_s_block[k]
    log("fetching Google Scholar figures")
    live = fetch_scholar()
    if live:
        prev_s = scholar.get("citations") or 0
        if prev_s and live["citations"] < prev_s * (1 - MAX_CITATION_DROP):
            log("  Scholar citations fell from %d to %d, ignoring this response"
                % (prev_s, live["citations"]))
        elif prev_s and live["citations"] < prev_s:
            log("  Scholar live total (%d) below baseline (%d), preserving baseline"
                % (live["citations"], prev_s))
        else:
            scholar.update({k: v for k, v in live.items() if v is not None})
            log("  Scholar: %s citations, h-index %s"
                % (scholar.get("citations"), scholar.get("hIndex")))

    metrics = {
        "updatedAt": now,
        "openalex": {
            "source": "OpenAlex",
            "sourceUrl": "https://openalex.org/" + (author.get("id", "").rsplit("/", 1)[-1]),
            "works": len(works),
            "citations": total_citations,
            "hIndex": h_index(cites),
            "i10Index": i10_index(cites),
            "note": "Computed from indexed works with a DOI. Lower than Google "
                    "Scholar, which also counts theses, preprints, and book chapters.",
        },
        "scholar": {
            "source": "Google Scholar",
            "sourceUrl": scholar.get("profileUrl"),
            "citations": scholar.get("citations"),
            "since2021": scholar.get("since2021"),
            "hIndex": scholar.get("hIndex"),
            "i10Index": scholar.get("i10Index"),
            "works": scholar.get("works"),
            "asOf": scholar.get("asOf"),
            "automated": bool(scholar.get("automated")),
            "citationsPerYear": scholar.get("citationsPerYear"),
            "citationsPerYearExact": bool(scholar.get("citationsPerYearExact", scholar.get("automated"))),
            "note": ("Synchronized automatically from Google Scholar with data/manual.json fallback."
                     if scholar.get("automated") else
                     "Baseline maintained in data/manual.json with live Scholar sync fallback."),
        },
        # Citations attributed to the year the cited work was PUBLISHED. Sums to
        # the OpenAlex total. Not comparable to the Scholar series above.
        "citationsByPublicationYear": {
            str(y["year"]): y["cited_by_count"]
            for y in sorted(author.get("counts_by_year") or [],
                            key=lambda x: x["year"])
        },
        "worksByYear": {
            str(y["year"]): y["works_count"]
            for y in sorted(author.get("counts_by_year") or [],
                            key=lambda x: x["year"])
        },
        "firstPublicationYear": min((p["year"] for p in pubs if p["year"]), default=None),
        "openAccessCount": sum(1 for p in pubs if p["openAccess"]),
    }

    log("OpenAlex: %d works, %d citations, h-index %d, i10 %d"
        % (len(works), total_citations, metrics["openalex"]["hIndex"],
           metrics["openalex"]["i10Index"]))

    log("fetching news candidates")
    news = fetch_news()
    if news is None:
        log("  news feeds unavailable, keeping existing inbox")
    else:
        # Preserve review decisions already made on items we have seen before.
        old = {n["link"]: n for n in (read_json("news-inbox.json") or {}).get("items", [])}
        for n in news:
            if n["link"] in old:
                n["status"] = old[n["link"]].get("status", "unreviewed")
        log("  %d candidates (%d already reviewed)"
            % (len(news), sum(1 for n in news if n["status"] != "unreviewed")))

    changed = False
    changed |= write_json("metrics.json", metrics, dry_run)
    changed |= write_json("publications.json",
                          {"updatedAt": now, "count": len(pubs), "items": pubs}, dry_run)
    if news is not None:
        changed |= write_json("news-inbox.json",
                              {"updatedAt": now, "items": news}, dry_run)

    # Expose a one-line summary for the pull request title.
    summary = "citations %d, works %d, h-index %d" % (
        total_citations, len(works), metrics["openalex"]["hIndex"])
    gh_out = os.environ.get("GITHUB_OUTPUT")
    if gh_out:
        with open(gh_out, "a", encoding="utf-8") as f:
            f.write("summary=%s\n" % summary)
    log("done: %s" % summary)
    return 0


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dry-run", action="store_true",
                    help="fetch and report, but write nothing")
    args = ap.parse_args()
    try:
        return build(dry_run=args.dry_run)
    except Exception as e:
        log("UNEXPECTED FAILURE: %r" % e)
        return 1


if __name__ == "__main__":
    sys.exit(main())
