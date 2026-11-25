"""Monotonic-safe Google Scholar metrics updater for src/data/scholar-metrics.json."""

from __future__ import annotations

import datetime as dt
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
METRICS_PATH = ROOT / "src" / "data" / "scholar-metrics.json"
DEFAULT_SCHOLAR_ID = "jYVzIZUAAAAJ"
DEFAULT_OPENALEX_AUTHOR_ID = "A5013656785"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
)


def load_existing() -> dict:
    if METRICS_PATH.exists():
        return json.loads(METRICS_PATH.read_text(encoding="utf-8"))
    eat_today = dt.datetime.now(dt.timezone(dt.timedelta(hours=3))).date().isoformat()
    return {
        "scholarId": DEFAULT_SCHOLAR_ID,
        "orcid": "0000-0002-7969-437X",
        "openalexId": DEFAULT_OPENALEX_AUTHOR_ID,
        "updatedAt": eat_today,
        "citations": 1273,
        "citationsSince2021": 1206,
        "citationsSinceYear": 2021,
        "hIndex": 15,
        "i10Index": 17,
        "totalWorks": 41,
        "saailPublishedCount": 15,
        "saailUnderReviewCount": 5,
        "priorWorksCount": 21,
        "journalArticles": 24,
        "conferencePapers": 12,
        "grantsAwarded": 3,
        "openAccessCount": 24,
        "source": "baseline",
    }


def fetch_json(url: str, timeout: int = 20) -> dict | None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as exc:
        print(f"Fetch failed for {url}: {exc}", file=sys.stderr)
        return None


def fetch_from_serpapi(api_key: str, scholar_id: str) -> dict | None:
    params = urllib.parse.urlencode(
        {
            "engine": "google_scholar_author",
            "author_id": scholar_id,
            "api_key": api_key,
            "num": "100",
            "hl": "en",
        }
    )
    data = fetch_json(f"https://serpapi.com/search.json?{params}")
    if not data or data.get("error"):
        if data and data.get("error"):
            print(f"SerpApi error: {data.get('error')}", file=sys.stderr)
        return None

    table = data.get("cited_by", {}).get("table", [])
    if len(table) < 3:
        return None

    try:
        cites = table[0].get("citations", {})
        h_idx = table[1].get("h_index", {})
        i10 = table[2].get("i10_index", {})
        since_pair = next(
            ((k, int(v)) for k, v in cites.items() if k.startswith("since_") and v is not None),
            None,
        )
        per_year: dict[str, int] = {}
        for bar in data.get("cited_by", {}).get("graph", []):
            yr = bar.get("year")
            val = bar.get("citations")
            if yr is not None and isinstance(val, int):
                per_year[str(yr)] = val

        c_all = int(str(cites.get("all", 0)).replace(",", ""))
        if c_all <= 0:
            return None
        res: dict = {
            "citations": c_all,
            "hIndex": int(str(h_idx.get("all", 0)).replace(",", "")),
            "i10Index": int(str(i10.get("all", 0)).replace(",", "")),
            "perYear": per_year,
            "source": "Google Scholar via SerpApi",
        }
        if since_pair:
            since_key, since_val = since_pair
            since_year = int(since_key.replace("since_", ""))
            res["citationsSinceYear"] = since_year
            if since_year == 2021:
                res["citationsSince2021"] = since_val
            else:
                res["citationsSinceRecent"] = since_val
        return res
    except (ValueError, TypeError, AttributeError):
        return None


def fetch_from_scholar_html(scholar_id: str) -> dict | None:
    url = f"https://scholar.google.com/citations?user={scholar_id}&hl=en"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            html = resp.read().decode("utf-8", errors="replace")
    except Exception as exc:
        print(f"Scholar HTML fetch skipped: {exc}", file=sys.stderr)
        return None

    cells = re.findall(r'<td class="gsc_rsb_std">([\d,]+)</td>', html)
    if len(cells) < 6:
        return None
    vals = [int(v.replace(",", "")) for v in cells[:6]]
    if vals[0] <= 0:
        return None
    seg = html[html.find("gsc_md_hist_w") :] if "gsc_md_hist_w" in html else html
    years = re.findall(r'<span class="gsc_g_t"[^>]*>(\d{4})</span>', seg)
    bar_vals = re.findall(r'<span class="gsc_g_al"[^>]*>([\d,]+)</span>', seg)
    if years and bar_vals and len(years) == len(bar_vals):
        per_year = {y: int(v.replace(",", "")) for y, v in zip(years, bar_vals)}
    else:
        per_year = {}
    since_match = re.search(r'Since\s+(\d{4})', html)
    since_year = int(since_match.group(1)) if since_match else None
    res: dict = {
        "citations": vals[0],
        "hIndex": vals[2],
        "i10Index": vals[4],
        "perYear": per_year,
        "source": "Google Scholar Live Profile",
    }
    if since_year is not None:
        res["citationsSinceYear"] = since_year
        if since_year == 2021:
            res["citationsSince2021"] = vals[1]
        else:
            res["citationsSinceRecent"] = vals[1]
    else:
        res["citationsSince2021"] = vals[1]
    return res


def fetch_openalex_fallback(openalex_id: str) -> dict | None:
    data = fetch_json(f"https://api.openalex.org/authors/{openalex_id}")
    if not data:
        return None
    summary = data.get("summary_stats", {})
    per_year: dict[str, int] = {}
    for row in data.get("counts_by_year", []):
        yr = row.get("year")
        cnt = row.get("cited_by_count")
        if isinstance(yr, int) and isinstance(cnt, int) and yr >= 2019:
            per_year[str(yr)] = cnt
    c_all = int(data.get("cited_by_count", 0))
    if c_all <= 0:
        return None
    return {
        "citations": c_all,
        "hIndex": int(summary.get("h_index", 0)),
        "i10Index": int(summary.get("i10_index", 0)),
        "perYear": per_year,
        "source": "OpenAlex Author API",
    }


def main() -> int:
    current = load_existing()
    scholar_id = str(current.get("scholarId") or DEFAULT_SCHOLAR_ID)
    openalex_id = str(current.get("openalexId") or DEFAULT_OPENALEX_AUTHOR_ID)
    api_key = os.environ.get("SERPAPI_KEY", "").strip()

    fetched = None
    if api_key:
        fetched = fetch_from_serpapi(api_key, scholar_id)
    if not fetched:
        fetched = fetch_from_scholar_html(scholar_id)
    if not fetched:
        fetched = fetch_openalex_fallback(openalex_id)

    if not fetched:
        print("Error: all metrics sources (SerpApi, Google Scholar HTML, OpenAlex) failed.", file=sys.stderr)
        return 1

    updated = dict(current)
    metric_keys = ["citations", "citationsSince2021", "hIndex", "i10Index"]
    changed = False
    for key in metric_keys:
        new_val = fetched.get(key)
        old_val = int(current.get(key, 0))
        if isinstance(new_val, int) and new_val > old_val:
            updated[key] = new_val
            changed = True

    old_since_year = int(current.get("citationsSinceYear", 2021))
    new_since_year = fetched.get("citationsSinceYear")
    if isinstance(new_since_year, int) and new_since_year != old_since_year:
        updated["citationsSinceYear"] = new_since_year
        changed = True
    if isinstance(fetched.get("citationsSinceRecent"), int) and fetched["citationsSinceRecent"] > 0:
        old_rec = int(current.get("citationsSinceRecent", 0))
        if (isinstance(new_since_year, int) and new_since_year != old_since_year) or fetched["citationsSinceRecent"] > old_rec:
            updated["citationsSinceRecent"] = fetched["citationsSinceRecent"]
            changed = True

    new_py = fetched.get("perYear")
    if isinstance(new_py, dict) and new_py:
        source_name = str(fetched.get("source", ""))
        if len(new_py) >= 4 and "Google Scholar" in source_name:
            cleaned = {yr: cnt for yr, cnt in sorted(new_py.items()) if int(yr) >= 2019}
            if cleaned and (cleaned != current.get("citationsPerYear") or not current.get("citationsPerYearExact")):
                updated["citationsPerYear"] = cleaned
                updated["citationsPerYearExact"] = True
                changed = True
        else:
            merged_py = dict(current.get("citationsPerYear") or {})
            for yr, cnt in sorted(new_py.items()):
                if int(yr) >= 2019 and cnt > int(merged_py.get(yr, 0)):
                    merged_py[yr] = cnt
                    changed = True
            updated["citationsPerYear"] = dict(sorted(merged_py.items()))

    if changed:
        now_eat = dt.datetime.now(dt.timezone(dt.timedelta(hours=3))).date().isoformat()
        updated["updatedAt"] = now_eat
        updated["source"] = fetched.get("source", current.get("source", "manual"))
        METRICS_PATH.write_text(json.dumps(updated, indent=2) + "\n", encoding="utf-8")
        print(f"Updated scholar-metrics.json from {updated['source']}.")
    else:
        print("Metrics unchanged (monotonic guard preserved current values).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
