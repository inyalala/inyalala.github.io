#!/usr/bin/env python3
"""
Turn a filled-in "Post news" issue into an entry in data/news.json.

Called by .github/workflows/news-from-issue.yml. Reads the issue body from
the ISSUE_BODY environment variable, parses the GitHub issue-form output,
prepends the entry, and writes the file. The workflow then opens a pull
request; nothing reaches the site until that is merged.

The point of this script is that posting news costs you a phone form and a
merge tap, with no HTML, no git, and no editor.
"""

import io
import json
import os
import re
import sys
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NEWS = os.path.join(ROOT, "data", "news.json")

# GitHub renders issue forms as "### Label\n\nvalue". Unfilled optional fields
# come through as the literal "_No response_".
FIELD_RE = re.compile(r"^###\s+(.+?)\s*$", re.MULTILINE)
EMPTY = {"_no response_", "_none_", ""}


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
            print("::warning::Date %r was not YYYY-MM-DD, using today instead." % when)
        when = date.today().isoformat()

    entry = {
        "id": when + "-" + slugify(headline),
        "date": when,
        "category": f.get("category", "Other").strip() or "Other",
        "headline": headline,
        "body": text,
        "link": f.get("link", "").strip() or None,
        "image": f.get("image", "").strip() or None,
        "source": f.get("source credit", "").strip() or None,
        "issue": int(number) if str(number).isdigit() else None,
    }

    data = {"items": []}
    if os.path.exists(NEWS):
        try:
            with io.open(NEWS, encoding="utf-8") as fh:
                data = json.load(fh)
        except ValueError as e:
            print("::error::data/news.json is not valid JSON (%s). Fix it first." % e)
            return 1

    items = data.get("items", [])
    # Re-submitting the same headline on the same day updates rather than
    # duplicates, which is what you want after fixing a typo.
    items = [i for i in items if i.get("id") != entry["id"]]
    items.insert(0, entry)
    items.sort(key=lambda i: i.get("date", ""), reverse=True)

    os.makedirs(os.path.dirname(NEWS), exist_ok=True)
    with io.open(NEWS, "w", encoding="utf-8") as fh:
        fh.write(json.dumps({"items": items}, indent=2, ensure_ascii=False) + "\n")

    print("Added: %s (%s)" % (headline, when))
    gh_out = os.environ.get("GITHUB_OUTPUT")
    if gh_out:
        with io.open(gh_out, "a", encoding="utf-8") as fh:
            fh.write("headline=%s\n" % headline.replace("\n", " ")[:80])
    return 0


if __name__ == "__main__":
    sys.exit(main())
