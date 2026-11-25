#!/usr/bin/env python3
"""
Turn a filled-in "Post news" issue into an entry in src/data/news.json.

Called by .github/workflows/news-from-issue.yml. Reads the issue body from
the ISSUE_BODY environment variable, parses the GitHub issue-form output,
inserts or updates the entry by issue number / id, and writes src/data/news.json.
"""

import io
import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NEWS = os.path.join(ROOT, "src", "data", "news.json")

FIELD_RE = re.compile(r"^###\s+(.+?)\s*$", re.MULTILINE)
EMPTY = {"_no response_", "_none_", ""}
EAT = timezone(timedelta(hours=3))


def parse(body):
    """Split issue-form markdown into {label: value}."""
    out, marks = {}, list(FIELD_RE.finditer(body or ""))
    for i, m in enumerate(marks):
        start = m.end()
        end = marks[i + 1].start() if i + 1 < len(marks) else len(body)
        value = body[start:end].strip()
        if value.lower() in EMPTY:
            value = ""
        out[m.group(1).strip().lower()] = value
    return out


def slugify(text, limit=60):
    s = re.sub(r"[^a-z0-9]+", "-", (text or "").lower()).strip("-")
    return s[:limit].rstrip("-") or "item"


def normalize_image_path(raw):
    val = (raw or "").strip().replace("\\", "/")
    if not val:
        return None
    if ".." in val.split("/"):
        print("::warning::Rejected unsafe image path containing '..': %r" % val)
        return None
    if val.startswith(("http://", "https://")):
        return val
    if val.startswith("/"):
        resolved = val
    elif val.startswith("images/"):
        resolved = "/" + val
    else:
        resolved = "/images/news/" + val.lstrip("./")
    disk_path = os.path.join(ROOT, "public", resolved.lstrip("/"))
    if not os.path.exists(disk_path):
        print("::warning::Referenced image does not exist under public/: %s" % resolved)
    return resolved


def validate_link(raw):
    val = (raw or "").strip()
    if not val:
        return None
    if val.startswith(("https://", "http://", "/")):
        return val
    print("::warning::Ignoring invalid link scheme: %r" % val)
    return None


def main():
    body = os.environ.get("ISSUE_BODY", "")
    number = os.environ.get("ISSUE_NUMBER", "")
    if not body.strip():
        print("::error::Issue body was empty, nothing to do.")
        return 1

    f = parse(body)
    headline = f.get("headline", "").strip()
    text = f.get("what happened", "").strip()
    if not headline or not text:
        print("::error::Headline and body are both required.")
        return 1

    when = f.get("date", "").strip()
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", when):
        if when:
            print("::warning::Date %r was not YYYY-MM-DD, using today (EAT) instead." % when)
        when = datetime.now(EAT).date().isoformat()

    issue_num = int(number) if str(number).isdigit() else None
    entry = {
        "id": when + "-" + slugify(headline),
        "date": when,
        "category": f.get("category", "Other").strip() or "Other",
        "headline": headline,
        "summary": text,
        "body": text,
        "link": validate_link(f.get("link", "")),
        "image": normalize_image_path(f.get("image", "")),
        "source": f.get("source credit", "").strip() or None,
        "issue": issue_num,
    }

    data = {"items": []}
    if os.path.exists(NEWS):
        try:
            with io.open(NEWS, encoding="utf-8") as fh:
                data = json.load(fh)
        except ValueError as e:
            print("::error::src/data/news.json is not valid JSON (%s). Fix it first." % e)
            return 1

    items = data.get("items", [])
    items = [
        i
        for i in items
        if i.get("id") != entry["id"] and (issue_num is None or i.get("issue") != issue_num)
    ]
    items.insert(0, entry)
    items.sort(key=lambda i: i.get("date", ""), reverse=True)

    os.makedirs(os.path.dirname(NEWS), exist_ok=True)
    with io.open(NEWS, "w", encoding="utf-8") as fh:
        fh.write(json.dumps({"items": items}, indent=2, ensure_ascii=False) + "\n")

    print("Added: %s (%s)" % (headline, when))
    gh_out = os.environ.get("GITHUB_OUTPUT")
    if gh_out:
        clean_headline = headline.replace("\r", " ").replace("\n", " ").strip()[:80]
        with io.open(gh_out, "a", encoding="utf-8") as fh:
            fh.write("headline=%s\n" % clean_headline)
    return 0


if __name__ == "__main__":
    sys.exit(main())
