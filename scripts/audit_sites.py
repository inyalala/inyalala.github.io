"""Programmatic audit for built Astro dist/ and iitmz-teaching-site HTML files."""

from __future__ import annotations

import base64
import json
import re
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote

_FILE_DIR = Path(__file__).resolve().parent
SITE_ROOT = _FILE_DIR.parent if _FILE_DIR.name == "scripts" else Path(r"c:\Users\Prof\Documents\inyalala.github.io-Old")
SITE_DIST = SITE_ROOT / "dist"
TEACH_ROOT = SITE_ROOT.parent / "iitmz-teaching-site"
TEACH_PREFIX = "https://inyalala.github.io/iitmz-teaching-site/"

BANNED_PROSE = [
    r"\baligns\b",
    r"\barena\b",
    r"\barsenal\b",
    r"\bbloated?\b",
    r"\bboost\w*\b",
    r"\bcornerstone\b",
    r"\bcritical\w*\b",
    r"\bcrucial\w*\b",
    r"\bcutting-edge\b",
    r"\bdeep dive\b",
    r"\bdelve\w*\b",
    r"\bdetermin(?:e|es|ed|ing)\b",
    r"\bdiverge\w*\b",
    r"\becosystem\w*\b",
    r"\belevat\w*\b",
    r"\bembark\w*\b",
    r"\bemploy\w*\b",
    r"\bempower\w*\b",
    r"\bengag\w*\b",
    r"\benhanc\w*\b",
    r"\bfacilitat\w*\b",
    r"\bfoster\w*\b",
    r"\bgroundbreaking\b",
    r"\bharness\w*\b",
    r"\bholistic\w*\b",
    r"\bimpacting\b",
    r"\bincorporat\w*\b",
    r"\bintricate\b",
    r"\bleverag\w*\b",
    r"\bmeticulous\w*\b",
    r"\bmultifaceted\b",
    r"\bnavigat\w*\b",
    r"\bnuanced?\b",
    r"\bparadigm\w*\b",
    r"\bparamount\b",
    r"\bpioneering\b",
    r"\bpivotal\b",
    r"\brealm\w*\b",
    r"\bresonat\w*\b",
    r"\brobust\w*\b",
    r"\bseamless\w*\b",
    r"\bshowcase\w*\b",
    r"\bsurge\w*\b",
    r"\bsurpassing\b",
    r"\btackl\w*\b",
    r"\btailor\w*\b",
    r"\btapestry\b",
    r"\btestament\b",
    r"\btransformative\b",
    r"\buncover\w*\b",
    r"\bunderscore\w*\b",
    r"\bunleash\w*\b",
    r"\bunlock\w*\b",
    r"\bunprecedented\b",
    r"\bunveil\w*\b",
    r"\butiliz\w*\b",
    r"\bcompelling\b",
    r"\bconvey(?:s|ed|ing)?\b",
    r"\bextremely\b",
    r"\bvery\b",
    r"\bhighly\b",
    r"\bfurthermore\b",
    r"\bmoreover\b",
    r"\badditionally\b",
    r"\bimportantly\b",
    r"\bnotably\b",
    r"\bsignificantly\b",
    r"\bultimately\b",
    r"\bdramatic\w*\b",
    r"\bnot only\b",
    r"\bpercent\b",
]
BANNED_RE = re.compile("|".join(BANNED_PROSE), re.IGNORECASE)
TECH_EXCLUDE_RE = re.compile(r"\b(navigation|navigator|boosting|criticality)\b", re.IGNORECASE)
CAUSAL_CONCESSIVE_RE = re.compile(
    r"(?:^|[.!?]\s+)While\b|,\s+while\b|,\s+as\s+[a-z]|,\s+since\s+[a-z]"
)
PROHIBITED_LITERAL_RE = re.compile(
    r"egerton\.ac\.ke|School of Science and Engineering|\u2014|&mdash;|&#8212;|&#x2014;|"
    r"Maseno University|Zetech University|The East African University|Kabarak University|\[object Object\]",
    re.IGNORECASE,
)


def check_data_invariants(errors: list[str], ci_mode: bool = False) -> dict:
    metrics_path = SITE_ROOT / "src" / "data" / "scholar-metrics.json"
    metrics = json.loads(metrics_path.read_text(encoding="utf-8"))
    cit = metrics.get("citations") or 0
    tw = metrics.get("totalWorks") or 0
    ja = metrics.get("journalArticles") or 0
    pw = metrics.get("priorWorksCount") or 0
    cpy = metrics.get("citationsPerYear") or {}
    if not isinstance(cit, int) or cit < 1000:
        errors.append(f"[data] scholar-metrics.json invalid citations={cit}")
    if not isinstance(tw, int) or tw < 40:
        errors.append(f"[data] scholar-metrics.json invalid totalWorks={tw}")
    if metrics.get("citationsPerYearExact") is not True:
        errors.append("[data] scholar-metrics.json citationsPerYearExact is not True")
    if not cpy or sum(cpy.values()) <= 0:
        errors.append("[data] scholar-metrics.json citationsPerYear empty")

    pubs_path = SITE_ROOT / "src" / "data" / "publications.json"
    pubs = json.loads(pubs_path.read_text(encoding="utf-8"))
    pub_items = pubs.get("items", pubs) if isinstance(pubs, dict) else pubs
    if len(pub_items) != tw:
        errors.append(f"[data] publications.json count={len(pub_items)} != scholar-metrics.totalWorks={tw}")
    if any((it.get("id") or it.get("slug")) == "intelligent-greenhouse-arduino-2016" for it in pub_items if isinstance(it, dict)):
        errors.append("[data] intelligent-greenhouse-arduino-2016 still present in publications.json")

    if not ci_mode:
        if cit != 1273:
            errors.append(f"[data] scholar-metrics.json citations={cit} != 1273")
        if tw != 41:
            errors.append(f"[data] scholar-metrics.json totalWorks={tw} != 41")
        if ja != 24:
            errors.append(f"[data] scholar-metrics.json journalArticles={ja} != 24")
        if pw != 21:
            errors.append(f"[data] scholar-metrics.json priorWorksCount={pw} != 21")
        if sum(cpy.values()) != 1256:
            errors.append(f"[data] scholar-metrics.json sum(citationsPerYear)={sum(cpy.values())} != 1256")
        if len(pub_items) != 41:
            errors.append(f"[data] publications.json count={len(pub_items)} != 41")

    if not (SITE_ROOT / "src" / "data" / "theses.ts").exists():
        errors.append("[data] Missing src/data/theses.ts")

    dims_path = SITE_ROOT / "src" / "data" / "image-dimensions.json"
    dims = json.loads(dims_path.read_text(encoding="utf-8"))
    for k, val in dims.items():
        if not isinstance(val, dict) or not isinstance(val.get("width"), int) or not isinstance(val.get("height"), int) or "w" in val or "h" in val:
            errors.append(f"[data] image-dimensions.json invalid entry for {k}: {val}")

    # Direct prose checks on writing markdown & theses.ts
    for md in sorted((SITE_ROOT / "src" / "content" / "writing").rglob("*.md")):
        md_text = md.read_text(encoding="utf-8", errors="replace")
        # Strip YAML frontmatter and fenced code blocks
        body = re.sub(r"^---\s*\n.*?\n---\s*\n", "", md_text, count=1, flags=re.S)
        body_no_code = re.sub(r"```.*?```", " ", body, flags=re.S)
        body_no_code = re.sub(r"`[^`]+`", " ", body_no_code)
        if "\u2014" in md_text:
            errors.append(f"[writing/{md.name}] Em-dash found")
        for m in BANNED_RE.finditer(body_no_code):
            if not TECH_EXCLUDE_RE.match(m.group(0)):
                ctx = body_no_code[max(0, m.start() - 25):min(len(body_no_code), m.end() + 25)].replace("\n", " ")
                errors.append(f"[writing/{md.name}] Banned token '{m.group(0)}' in: ...{ctx}...")
        for m in CAUSAL_CONCESSIVE_RE.finditer(body_no_code):
            ctx = body_no_code[max(0, m.start() - 20):min(len(body_no_code), m.end() + 35)].replace("\n", " ")
            errors.append(f"[writing/{md.name}] Grammar '{m.group(0).strip()}' in: ...{ctx}...")

    abcs_ts = (SITE_ROOT / "src" / "data" / "abcs-agriculture.ts").read_text(encoding="utf-8", errors="replace")
    if "\u2014" in abcs_ts:
        errors.append("[src/data/abcs-agriculture.ts] Em-dash found")
    # Strip verbatim published paper titles from prose check (paper titles are factual bibliography)
    abcs_prose = re.sub(r"title:\s*'[^']*'", " ", abcs_ts)
    for m in BANNED_RE.finditer(abcs_prose):
        if not TECH_EXCLUDE_RE.match(m.group(0)):
            ctx = abcs_prose[max(0, m.start() - 25):min(len(abcs_prose), m.end() + 25)].replace("\n", " ")
            errors.append(f"[abcs-agriculture.ts] Banned token '{m.group(0)}' in: ...{ctx}...")
    for m in CAUSAL_CONCESSIVE_RE.finditer(abcs_prose):
        ctx = abcs_prose[max(0, m.start() - 20):min(len(abcs_prose), m.end() + 35)].replace("\n", " ")
        errors.append(f"[abcs-agriculture.ts] Grammar '{m.group(0).strip()}' in: ...{ctx}...")

    theses_ts = (SITE_ROOT / "src" / "data" / "theses.ts").read_text(encoding="utf-8", errors="replace")
    if "\u2014" in theses_ts:
        errors.append("[src/data/theses.ts] Em-dash found")
    # Strip BibTeX fields or TypeScript keys before prose scan
    theses_clean = re.sub(r"bibtex:\s*`.*?`", " ", theses_ts, flags=re.S)
    for m in BANNED_RE.finditer(theses_clean):
        if not TECH_EXCLUDE_RE.match(m.group(0)):
            ctx = theses_clean[max(0, m.start() - 25):min(len(theses_clean), m.end() + 25)].replace("\n", " ")
            errors.append(f"[theses.ts] Banned token '{m.group(0)}' in: ...{ctx}...")
    return metrics


class PageInspector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.title = ""
        self.in_title = False
        self.meta_desc = ""
        self.robots_metas: list[str] = []
        self.canonicals: list[str] = []
        self.h1_count = 0
        self.ids: set[str] = set()
        self.skip_hrefs: list[str] = []
        self.links: list[str] = []
        self.imgs: list[tuple[str, str | None, str | None, str | None, str | None]] = []
        self.assets: list[str] = []
        self.jsonld_blocks: list[str] = []
        self.in_jsonld = False
        self._buf: list[str] = []
        self.prose_chunks: list[str] = []
        self.tablist_missing_label = 0
        self.skip_depth = 0
        self.skip_tags = {"script", "style", "svg", "pre", "code"}

    def handle_starttag(self, tag: str, attrs_list: list[tuple[str, str | None]]) -> None:
        attrs = dict(attrs_list)
        if (attrs.get("role") or "").lower() == "tablist" and not attrs.get("aria-labelledby"):
            self.tablist_missing_label += 1
        cls = (attrs.get("class") or "").split()
        el_id = attrs.get("id")
        if el_id:
            self.ids.add(el_id)

        if tag == "title":
            self.in_title = True
            self._buf = []
        elif tag == "meta":
            name = (attrs.get("name") or "").lower()
            if name == "description":
                self.meta_desc = attrs.get("content") or ""
            elif name == "robots":
                self.robots_metas.append((attrs.get("content") or "").lower())
        elif tag == "link":
            rel = (attrs.get("rel") or "").lower().split()
            href = attrs.get("href") or ""
            if "canonical" in rel and href:
                self.canonicals.append(href)
            if href and any(r in rel for r in ("stylesheet", "icon", "manifest", "alternate")):
                self.assets.append(href)
        elif tag == "a":
            href = attrs.get("href")
            if href:
                self.links.append(href)
                if "skip-link" in cls and href.startswith("#"):
                    self.skip_hrefs.append(href[1:])
        elif tag == "img":
            self.imgs.append(
                (
                    attrs.get("src") or "",
                    attrs.get("alt"),
                    attrs.get("aria-hidden"),
                    attrs.get("width"),
                    attrs.get("height"),
                )
            )
        elif tag == "script":
            src = attrs.get("src")
            if src:
                self.assets.append(src)
            if (attrs.get("type") or "").lower() == "application/ld+json":
                self.in_jsonld = True
                self._buf = []
        elif tag == "h1":
            self.h1_count += 1

        if tag in self.skip_tags or "pub-title" in cls or "bibtex-pre" in cls:
            self.skip_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False
            self.title = "".join(self._buf).strip()
        elif tag == "script" and self.in_jsonld:
            self.in_jsonld = False
            self.jsonld_blocks.append("".join(self._buf))
        if tag in self.skip_tags:
            self.skip_depth = max(0, self.skip_depth - 1)

    def handle_data(self, data: str) -> None:
        if self.in_title or self.in_jsonld:
            self._buf.append(data)
        if self.skip_depth == 0:
            self.prose_chunks.append(data)


class TeachingProseParser(HTMLParser):
    """Streaming HTMLParser masking code, math, scripts, styles, SVGs, and formulas."""

    SKIP_TAGS = {"pre", "code", "script", "style", "svg", "kbd", "samp", "var", "textarea"}
    SKIP_CLASSES = {"sourceCode", "math", "cell-output", "formula"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.skip_stack: list[str] = []
        self.chunks: list[str] = []

    def handle_starttag(self, tag: str, attrs_list: list[tuple[str, str | None]]) -> None:
        attrs = dict(attrs_list)
        cls = set((attrs.get("class") or "").split())
        if self.skip_stack or tag in self.SKIP_TAGS or bool(cls & self.SKIP_CLASSES):
            self.skip_stack.append(tag)

    def handle_endtag(self, tag: str) -> None:
        if self.skip_stack:
            self.skip_stack.pop()

    def handle_data(self, data: str) -> None:
        if not self.skip_stack:
            self.chunks.append(data)


def strip_verbatim_pub_elements(raw_html: str) -> str:
    cleaned = re.sub(r"<script\b.*?</script>", " ", raw_html, flags=re.S | re.I)
    cleaned = re.sub(r"<style\b.*?</style>", " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r"<pre\b.*?</pre>", " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r"<code\b.*?</code>", " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r'<h[23][^>]*class="[^"]*pub-title[^"]*"[^>]*>.*?</h[23]>', " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r'<a\b[^>]*class="[^"]*pub-title[^"]*"[^>]*>.*?</a>', " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r'<div[^>]*class="pub-title"[^>]*>.*?</div>', " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r'<div\s+class="abstract-prose"[^>]*>.*?</div>', " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r'<p[^>]*class="[^"]*pub-venue-full[^"]*"[^>]*>.*?</p>', " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r'<span[^>]*class="[^"]*pub-venue[^"]*"[^>]*>.*?</span>', " ", cleaned, flags=re.S | re.I)
    cleaned = re.sub(r"<[^>]+>", " ", cleaned)
    return re.sub(r"\s+", " ", cleaned)


def resolve_local(base_file: Path, root_dir: Path, ref: str) -> Path | None:
    clean = ref.split("#")[0].split("?")[0]
    if not clean:
        return None
    if clean.startswith("/"):
        cand = root_dir / unquote(clean.lstrip("/"))
    else:
        cand = (base_file.parent / unquote(clean)).resolve()
    if cand.is_dir():
        cand = cand / "index.html"
    return cand


def audit_dist(ci_mode: bool = False) -> dict:
    errors: list[str] = []
    warnings: list[str] = []
    metrics = check_data_invariants(errors, ci_mode=ci_mode)
    html_files = sorted(SITE_DIST.rglob("*.html"))
    titles: dict[str, str] = {}
    descs: dict[str, str] = {}
    canonicals: dict[str, str] = {}
    teach_checked: set[str] = set()
    teach_verified = 0
    noindex_pages = {"404.html", "team/index.html"}

    if not html_files:
        errors.append("No HTML files found in dist/")
        return {"htmlPagesChecked": 0, "teachingUrlsVerified": 0, "errors": errors, "warnings": warnings}

    phd_page = SITE_DIST / "publications/theses/phd-dissertation-2023/index.html"
    msc_page = SITE_DIST / "publications/theses/msc-thesis-2016/index.html"
    pubs_index = SITE_DIST / "publications/index.html"
    if not phd_page.exists():
        errors.append("[dist] Missing verified thesis monograph page: publications/theses/phd-dissertation-2023/index.html")
    else:
        phd_html = phd_page.read_text(encoding="utf-8", errors="replace")
        if "Chen Kunjie" not in phd_html or "Agricultural Electrification and Automation Engineering" not in phd_html:
            errors.append("[dist] phd-dissertation-2023 missing verified supervisor/department details")
    if not msc_page.exists():
        errors.append("[dist] Missing verified thesis monograph page: publications/theses/msc-thesis-2016/index.html")
    else:
        msc_html = msc_page.read_text(encoding="utf-8", errors="replace")
        if "Bai Zhentian" not in msc_html or "Xu Huanliang" not in msc_html:
            errors.append("[dist] msc-thesis-2016 missing verified supervisor details")
    if pubs_index.exists():
        pubs_html = pubs_index.read_text(encoding="utf-8", errors="replace")
        if "once the university cover sheet" in pubs_html:
            errors.append("[dist] publications/index.html still contains placeholder thesis notice")

    writing_posts = [p for p in (SITE_DIST / "writing").glob("*/index.html")]
    if not ci_mode and len(writing_posts) != 6:
        errors.append(f"[dist/writing] Expected 6 writing post pages, found {len(writing_posts)}")
    elif ci_mode and len(writing_posts) < 6:
        errors.append(f"[dist/writing] Expected >= 6 writing post pages, found {len(writing_posts)}")

    for path in html_files:
        rel = path.relative_to(SITE_DIST).as_posix()
        raw = path.read_text(encoding="utf-8", errors="replace")
        p = PageInspector()
        p.feed(raw)
        is_noindex = rel in noindex_pages

        # Zero <script> after </html>
        end_html_idx = raw.lower().rfind("</html>")
        last_script_idx = raw.lower().rfind("<script")
        if end_html_idx != -1 and last_script_idx > end_html_idx:
            errors.append(f"[{rel}] Script tag appears after </html>")

        # Title check
        if not p.title:
            errors.append(f"[{rel}] Missing <title>")
        else:
            if p.title in titles:
                errors.append(f"[{rel}] Duplicate <title> with {titles[p.title]}: {p.title}")
            titles[p.title] = rel

        # Robots check: exactly 1 meta robots
        if len(p.robots_metas) != 1:
            errors.append(f"[{rel}] Expected 1 <meta name='robots'>, found {len(p.robots_metas)}")
        else:
            rval = p.robots_metas[0]
            if is_noindex and "noindex" not in rval:
                errors.append(f"[{rel}] Expected 'noindex' in robots meta, got '{rval}'")
            if not is_noindex and "noindex" in rval:
                errors.append(f"[{rel}] Unexpected 'noindex' on indexable page")

        # Canonical check: noindex pages must NOT have canonical; indexable pages must have 1 unique canonical
        if is_noindex:
            if p.canonicals:
                errors.append(f"[{rel}] Noindex page must not declare <link rel='canonical'>")
        else:
            if not p.meta_desc:
                errors.append(f"[{rel}] Missing <meta name='description'>")
            else:
                if p.meta_desc in descs:
                    warnings.append(f"[{rel}] Duplicate description with {descs[p.meta_desc]}")
                descs[p.meta_desc] = rel

            if len(p.canonicals) != 1:
                errors.append(f"[{rel}] Expected 1 <link rel='canonical'>, found {len(p.canonicals)}")
            else:
                can = p.canonicals[0]
                if can in canonicals:
                    errors.append(f"[{rel}] Duplicate canonical with {canonicals[can]}: {can}")
                canonicals[can] = rel

        if p.h1_count != 1:
            errors.append(f"[{rel}] Expected 1 <h1>, found {p.h1_count}")

        for sid in p.skip_hrefs:
            if sid not in p.ids:
                errors.append(f"[{rel}] Skip link target #{sid} missing id in document")

        # JSON-LD check
        if not is_noindex and not p.jsonld_blocks:
            errors.append(f"[{rel}] Missing JSON-LD structured data")
        for idx, block in enumerate(p.jsonld_blocks):
            try:
                parsed = json.loads(block)
                if isinstance(parsed, dict) and "@graph" in parsed:
                    for node in parsed["@graph"]:
                        if isinstance(node, dict) and "@id" not in node and node.get("@type") not in ("BreadcrumbList", "CourseInstance"):
                            warnings.append(f"[{rel}] JSON-LD graph node missing @id: {node.get('@type')}")
            except json.JSONDecodeError as exc:
                errors.append(f"[{rel}] Invalid JSON-LD block #{idx}: {exc}")

        # Image width/height/alt + existence check
        for src, alt, aria_hidden, w, h in p.imgs:
            if alt is None or (alt.strip() == "" and aria_hidden != "true"):
                errors.append(f"[{rel}] Image missing alt attribute: {src}")
            if not (w and h and w.isdigit() and h.isdigit()):
                errors.append(f"[{rel}] Image missing explicit integer width/height: {src} (w={w}, h={h})")
            if src and not src.startswith(("http://", "https://", "data:")):
                target = resolve_local(path, SITE_DIST, src)
                if not target or not target.exists():
                    errors.append(f"[{rel}] Missing image file in dist: {src}")

        for asset in p.assets:
            if not asset.startswith(("http://", "https://", "data:", "mailto:", "tel:")):
                target = resolve_local(path, SITE_DIST, asset)
                if not target or not target.exists():
                    errors.append(f"[{rel}] Missing static asset in dist: {asset}")

        for href in p.links:
            if href.startswith(("#", "mailto:", "tel:", "javascript:")):
                continue
            if href.startswith(TEACH_PREFIX):
                if TEACH_ROOT.exists():
                    sub = unquote(href[len(TEACH_PREFIX):].split("#")[0].split("?")[0])
                    target = TEACH_ROOT / sub if sub else TEACH_ROOT / "index.html"
                    if target.is_dir():
                        target = target / "index.html"
                    if href not in teach_checked:
                        teach_checked.add(href)
                        if not target.exists():
                            errors.append(f"[{rel}] Missing target in iitmz-teaching-site for link: {href} -> {target}")
                        else:
                            teach_verified += 1
            elif href.startswith("https://inyalala.github.io/"):
                sub = unquote(href[len("https://inyalala.github.io/"):].split("#")[0].split("?")[0])
                target = SITE_DIST / (sub or "index.html")
                if target.is_dir():
                    target = target / "index.html"
                if not target.exists():
                    errors.append(f"[{rel}] Missing absolute local link target: {href}")
            elif not href.startswith(("http://", "https://")):
                target = resolve_local(path, SITE_DIST, href)
                if target and not target.exists():
                    errors.append(f"[{rel}] Broken internal link: {href} -> {target}")

        # Prohibited literal check (strip script/style slightly to avoid CSS font comments? No, keep strict on HTML)
        for m in PROHIBITED_LITERAL_RE.finditer(raw):
            errors.append(f"[{rel}] Prohibited literal string: {repr(m.group(0))}")

        # Citation parity check across key pages
        if rel in {"index.html", "about/index.html", "publications/index.html", "media-kit/index.html"}:
            cit = metrics.get("citations", 1273)
            if f"{cit:,}" not in raw and str(cit) not in raw:
                errors.append(f"[{rel}] Expected live citation figure '{cit:,}' missing")

        # Footer PI own-line & silent llms.txt checks
        if "SiteFooter" in raw or "colophon" in raw or "<footer" in raw:
            if "Principal Investigator, SAAIL Lab" in raw and not re.search(
                r"<br\b[^>]*>\s*Principal Investigator,\s*SAAIL Lab\s*(?:<br\b[^>]*>|</p>)", raw
            ):
                errors.append(f"[{rel}] 'Principal Investigator, SAAIL Lab' not on its own <br> line in footer")
        if re.search(r'<a\b[^>]*href=["\']/llms\.txt["\']', raw, re.I):
            errors.append(f"[{rel}] Visible anchor to /llms.txt still present")
        if not re.search(r'<link\b[^>]*rel=["\']alternate["\'][^>]*href=["\']/llms\.txt["\']', raw, re.I) and not re.search(
            r'<link\b[^>]*href=["\']/llms\.txt["\'][^>]*rel=["\']alternate["\']', raw, re.I
        ):
            errors.append(f"[{rel}] Silent <link rel='alternate' href='/llms.txt'> missing from head")

        if rel == "index.html":
            for icon_name in ("Google_Scholar_logo.svg", "ORCID_iD.svg", "scopus-icon.svg", "openreview-icon.svg", "icons8-github.svg", "LinkedIn_icon.svg", "ResearchGate_icon_SVG.svg", "openalex-icon.svg"):
                if f"/images/icons/{icon_name}" not in raw:
                    errors.append(f"[index.html] Missing full-color hero brand icon: {icon_name}")
            if "pathway-strip" in raw or "Mon/Wed/Thu/Fri" in raw:
                errors.append("[index.html] Removed pathway-strip or Mon/Wed/Thu/Fri schedule still present")

        if rel == "about/index.html":
            if "Part-Time Lecturer, Department of Computer Science" not in raw:
                errors.append("[about/index.html] Expected Egerton 'Part-Time Lecturer, Department of Computer Science' role missing")
            if "Disambiguation" in raw:
                errors.append("[about/index.html] Prohibited jargon 'Disambiguation' remains")
            for req_about in ("phd-dissertation-2023", "msc-thesis-2016", "Prof. Chen Kunjie", "Prof. Bai Zhentian", "iitmz-crest.webp"):
                if req_about not in raw:
                    errors.append(f"[about/index.html] Missing verified bio/crest entry: {req_about}")

        if rel == "news/index.html":
            if "/images/news/aaai-2026-sovereignty.webp" not in raw or "dgs-bench-gap.png" in raw:
                errors.append("[news/index.html] AAAI image check failed (expected aaai-2026-sovereignty.webp, not dgs-bench-gap.png)")
            for bad_news in ("cloves-etri2026-abstract.png", "dsa2026-dcgan-poster.webp", "tais2026-oxford-poster.webp", "dsa-day-3-55"):
                if bad_news in raw:
                    errors.append(f"[news/index.html] Removed wrong/duplicate asset still present: {bad_news}")

        if rel == "courses/index.html":
            main_m = re.search(r"<main\b[^>]*>(.*)</main>", raw, re.S | re.I)
            main_body = main_m.group(1) if main_m else raw
            arch_idx = main_body.find("Previous")
            if arch_idx == -1:
                arch_idx = main_body.find("Archive")
            z2005_idx = main_body.find("Z2005")
            if arch_idx == -1 or (z2005_idx != -1 and z2005_idx < arch_idx):
                errors.append("[courses/index.html] Z2005 appears before Previous/Archive section in <main>")

        if rel in {"courses/z5007/index.html", "courses/z2005/index.html"}:
            if "Monday, Wednesday, Thursday, and Friday" not in raw:
                errors.append(f"[{rel}] Missing Mon/Wed/Thu/Fri schedule")

        if rel == "writing/abcs-of-ai-in-agriculture/index.html":
            for ch in "abcdefghijklmnopqrstuvwxyz":
                if f'id="letter-{ch}"' not in raw:
                    errors.append(f"[abcs] Missing letter section id='letter-{ch}'")
            abc_imgs = set(re.findall(r'/images/writing/abcs/[a-z0-9\-]+\.webp', raw))
            if len(abc_imgs) != 26:
                errors.append(f"[abcs] Expected 26 distinct A-Z plate images, found {len(abc_imgs)}")

        if rel == "writing/index.html" or rel.startswith("writing/"):
            if "/images/news/" in raw:
                errors.append(f"[{rel}] Reused /images/news/ image inside /writing/")
        if rel == "writing/index.html":
            for cat in ("Scholar Guide", "Essay &amp; Reflection", "Zanzibar &amp; Campus Guide", "Research Note"):
                plain_cat = cat.replace("&amp;", "&")
                if cat not in raw and plain_cat not in raw:
                    errors.append(f"[writing/index.html] Missing category filter/label: {plain_cat}")

        # Authored prose checks
        prose = strip_verbatim_pub_elements(raw)
        for m in BANNED_RE.finditer(prose):
            word = m.group(0)
            if TECH_EXCLUDE_RE.match(word):
                continue
            ctx = prose[max(0, m.start() - 35):min(len(prose), m.end() + 35)]
            warnings.append(f"[{rel}] Banned prose token '{word}' in: ...{ctx}...")

        for m in CAUSAL_CONCESSIVE_RE.finditer(prose):
            ctx = prose[max(0, m.start() - 25):min(len(prose), m.end() + 45)]
            warnings.append(f"[{rel}] Grammar check ({m.group(0).strip()}): ...{ctx}...")

    # Thumbnail size check (<= 90 KB)
    thumbs_dir = SITE_ROOT / "public" / "images" / "thumbs"
    if thumbs_dir.exists():
        for tfile in thumbs_dir.rglob("*"):
            if tfile.is_file() and tfile.stat().st_size > 90 * 1024:
                errors.append(f"Thumbnail exceeds 90 KB ({tfile.stat().st_size / 1024:.1f} KB): {tfile.relative_to(SITE_ROOT)}")

    # XML & required root artifacts check
    for xml_name in ("sitemap.xml", "feed.xml"):
        xml_path = SITE_DIST / xml_name
        if not xml_path.exists():
            errors.append(f"Missing dist/{xml_name}")
            continue
        try:
            tree = ET.parse(xml_path)
            if xml_name == "sitemap.xml":
                ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
                for el in tree.findall(".//sm:loc", ns):
                    loc = el.text or ""
                    if loc.startswith("https://inyalala.github.io/"):
                        sub = unquote(loc[len("https://inyalala.github.io/"):])
                        target = SITE_DIST / (sub or "index.html")
                        if target.is_dir():
                            target = target / "index.html"
                        if not target.exists():
                            errors.append(f"[sitemap.xml] URL missing in dist: {loc}")
        except ET.ParseError as exc:
            errors.append(f"[{xml_name}] XML parse error: {exc}")

    for req_file in ("robots.txt", "llms.txt", "sw.js", "site.webmanifest"):
        if not (SITE_DIST / req_file).exists():
            errors.append(f"Missing dist/{req_file}")

    return {
        "htmlPagesChecked": len(html_files),
        "teachingUrlsVerified": teach_verified,
        "errors": errors,
        "warnings": warnings,
    }


def _extract_teach_prose(html_frag: str) -> str:
    tp = TeachingProseParser()
    tp.feed(html_frag)
    return re.sub(r"\s+", " ", " ".join(tp.chunks)).strip()


def audit_teaching_site() -> dict:
    errors: list[str] = []
    warnings: list[str] = []
    all_html = sorted(TEACH_ROOT.rglob("*.html"))
    reveal_count = 0
    checked_count = 0

    ANCHOR_JS_CALL_RE = re.compile(r"anchor\.min\.js|window\.AnchorJS|new\s+AnchorJS", re.I)
    TEACH_BANNED_RE = re.compile(
        r"\b(?:dramatic\w*|drastic\w*|additionally|extremely|remarkably|fundamentally|fundamental|"
        r"very|highly|pivotal|crucial\w*|cornerstone|delve\w*|leverag\w*|showcase\w*|unleash\w*|unlock\w*|tapestry|testament|not only)\b",
        re.I,
    )
    TEACH_CAUSAL_RE = re.compile(
        r":\s+while\b|,\s+while\b|(?:^|[.!?]\s+)While\b(?!\s+loop)|\bwhile\s+(?:returning|still guaranteeing|others benefit|a worse-ratio item|quicksort|n stays|matrix\[1\]\[0\])|"
        r":\s+since(?=\s+(?!(?:19|20)\d\d\b))|,\s+since(?=\s+(?!(?:19|20)\d\d\b))|"
        r"(?:^|[.!?]\s+)Since(?=\s+(?!(?:19|20)\d\d\b))|\bhere since\b|"
        r",\s+as\s+(?:a|an|the|it|they|we|this|that|there|each|no)\b"
    )

    for path in all_html:
        rel = path.relative_to(TEACH_ROOT).as_posix()
        # Reveal.js exported slide decks are strictly lecture-\d+.html (NOT L34-L45 prose lectures)
        if re.match(r"^lecture-\d+\.html$", path.name):
            reveal_count += 1
            raw_any = path.read_text(encoding="utf-8", errors="replace")
            if ANCHOR_JS_CALL_RE.search(raw_any):
                errors.append(f"[teaching/{rel}] Active AnchorJS JS call/script remains")
            if "\u00b93" in raw_any:
                errors.append(f"[teaching/{rel}] Stray superscript mojibake '\u00b93' remains")
            if "#6d28d9" in raw_any or "#6D28D9" in raw_any:
                errors.append(f"[teaching/{rel}] Prohibited violet #6d28d9 remains")
            if "assets/site.css?v=2" in raw_any:
                errors.append(f"[teaching/{rel}] Outdated site.css?v=2 remains")
            if "lenis" in raw_any.lower():
                errors.append(f"[teaching/{rel}] Residual Lenis CDN reference remains")
            if '</style>\\n\\t\n' in raw_any or '<\\/script>\\n\\t\n</body>' in raw_any:
                errors.append(f"[teaching/{rel}] Broken unescaped newline inside RevealNotes JS string literal")
            s0 = raw_any.find('<div class="slides">')
            s1 = raw_any.find("<script", s0) if s0 != -1 else -1
            if s0 != -1 and s1 != -1:
                frag = raw_any[s0:s1]
                for attr_m in re.finditer(r'(?:alt|aria-label)="([^"]*)"', frag, re.I):
                    aval = attr_m.group(1)
                    if "dramatic" in aval.lower():
                        errors.append(f"[teaching/{rel}] Banned token in image attr: {aval[:60]}")
                    for gm in TEACH_CAUSAL_RE.finditer(aval):
                        errors.append(f"[teaching/{rel}] Grammar ({gm.group(0).strip()}) in image attr: ...{aval[max(0,gm.start()-20):gm.end()+35]}...")
                    for bm in TEACH_BANNED_RE.finditer(aval):
                        w = bm.group(0)
                        ctx = aval[max(0, bm.start()-25):bm.end()+25]
                        if w.lower() == "not only" and "Not Only SQL" in ctx:
                            continue
                        errors.append(f"[teaching/{rel}] Banned token '{w}' in image attr: ...{ctx}...")
                for b64_m in re.finditer(r'data:image/svg\+xml;base64,([^"\'>\s]+)', frag):
                    try:
                        svg_xml = base64.b64decode(b64_m.group(1).strip()).decode("utf-8", errors="ignore")
                    except Exception:
                        continue
                    if any(tok in svg_xml for tok in ("\u2014", "&mdash;", "&#8212;", "&#x2014;")):
                        errors.append(f"[teaching/{rel}] Em-dash inside embedded base64 SVG diagram XML")
                prose = _extract_teach_prose(frag)
                if "\u2014" in prose:
                    errors.append(f"[teaching/{rel}] Em-dash in Reveal slide prose")
                for gm in TEACH_CAUSAL_RE.finditer(prose):
                    errors.append(f"[teaching/{rel}] Grammar ({gm.group(0).strip()}) in: ...{prose[max(0,gm.start()-20):gm.end()+35]}...")
                for bm in TEACH_BANNED_RE.finditer(prose):
                    w = bm.group(0)
                    ctx = prose[max(0, bm.start()-25):bm.end()+25]
                    if w.lower() == "not only" and "Not Only SQL" in ctx:
                        continue
                    errors.append(f"[teaching/{rel}] Banned token '{w}' in: ...{ctx}...")
            continue

        checked_count += 1
        raw = path.read_text(encoding="utf-8", errors="replace")
        if ANCHOR_JS_CALL_RE.search(raw):
            errors.append(f"[teaching/{rel}] Active AnchorJS JS call/script remains")
        if "\u00b93" in raw:
            errors.append(f"[teaching/{rel}] Stray superscript mojibake '\u00b93' remains")
        if "#6d28d9" in raw or "#6D28D9" in raw:
            errors.append(f"[teaching/{rel}] Prohibited violet #6d28d9 remains")
        if "JetBrains Mono" in raw:
            errors.append(f"[teaching/{rel}] Unloaded font 'JetBrains Mono' remains in inline CSS")
        if rel.startswith("courses/z2004/lectures/L") and "<h4" in raw.lower():
            errors.append(f"[teaching/{rel}] Disallowed <h4> heading skip remains in L34-L45 lecture")
        if rel.endswith(("/exam-prep.html", "/project-rubric.html")) and "<h2>Other Formats</h2>" in raw:
            errors.append(f"[teaching/{rel}] Pre-main <h2>Other Formats</h2> landmark order issue remains")

        p = PageInspector()
        p.feed(raw)
        if p.tablist_missing_label:
            errors.append(f"[teaching/{rel}] role='tablist' missing aria-labelledby ({p.tablist_missing_label}x)")

        if rel.startswith("courses/dm-scale/") and "<nav " not in raw:
            errors.append(f"[teaching/{rel}] Missing semantic <nav> landmark")

        # Redirect stubs only check title
        is_redirect = 'http-equiv="refresh"' in raw.lower()
        if not is_redirect:
            if not p.title:
                errors.append(f"[teaching/{rel}] Missing <title>")
            if p.h1_count != 1:
                errors.append(f"[teaching/{rel}] Expected 1 <h1>, found {p.h1_count}")
            if not p.jsonld_blocks:
                errors.append(f"[teaching/{rel}] Missing Schema.org JSON-LD")
            for sid in p.skip_hrefs:
                if sid not in p.ids:
                    errors.append(f"[teaching/{rel}] Skip link target #{sid} missing id")
            m0 = re.search(r"<main\b[^>]*>", raw, re.I)
            if m0:
                m_end = raw.find("</main>", m0.end())
                m_frag = raw[m0.end():m_end] if m_end != -1 else raw[m0.end():]
                m_prose = _extract_teach_prose(m_frag)
                if "\u2014" in m_prose:
                    errors.append(f"[teaching/{rel}] Em-dash in <main> prose")
                for gm in TEACH_CAUSAL_RE.finditer(m_prose):
                    errors.append(f"[teaching/{rel}] Grammar ({gm.group(0).strip()}) in: ...{m_prose[max(0,gm.start()-20):gm.end()+35]}...")
                for bm in TEACH_BANNED_RE.finditer(m_prose):
                    w = bm.group(0)
                    ctx = m_prose[max(0, bm.start()-25):bm.end()+25]
                    if w.lower() == "not only" and "Not Only SQL" in ctx:
                        continue
                    errors.append(f"[teaching/{rel}] Banned token '{w}' in: ...{ctx}...")

        if "_files/libs/" in raw:
            errors.append(f"[teaching/{rel}] Broken Quarto _files/libs/ reference remains")
        if "lab2.html" in raw:
            errors.append(f"[teaching/{rel}] Dead link lab2.html remains")
        if "gsap" in raw.lower() or "lenis" in raw.lower():
            errors.append(f"[teaching/{rel}] Residual GSAP/Lenis blocking script found")
        if any(s in raw for s in ("School of Science and Engineering", "egerton.ac.ke", "Reproduction without permission", "Reproduction without attribution")):
            errors.append(f"[teaching/{rel}] Prohibited wording/institution string found")

        for href in p.links:
            if href.startswith(("#", "mailto:", "tel:", "http://", "https://", "javascript:")):
                continue
            target = (path.parent / unquote(href.split("#")[0].split("?")[0])).resolve()
            if not target.exists():
                errors.append(f"[teaching/{rel}] Broken relative link: {href} -> {target}")
        for asset in p.assets:
            if asset.startswith(("http://", "https://", "data:")):
                continue
            target = (path.parent / unquote(asset.split("#")[0].split("?")[0])).resolve()
            if not target.exists():
                errors.append(f"[teaching/{rel}] Broken stylesheet/asset: {asset}")

    # Specific factual invariants on teaching portal
    root_idx = (TEACH_ROOT / "index.html").read_text(encoding="utf-8")
    root_main_m = re.search(r"<main\b[^>]*>(.*)</main>", root_idx, re.S | re.I)
    root_main = root_main_m.group(1) if root_main_m else root_idx
    arch_pos = root_main.find("Archive")
    z2005_pos = root_main.find("Z2005")
    if arch_pos == -1 or (z2005_pos != -1 and z2005_pos < arch_pos):
        errors.append("[teaching/index.html] Z2005 must appear only under Archive section in <main>")

    for orphan_png in ("cluouddb.png", "hdd.png", "image.png", "mr.png", "rag.png"):
        if (TEACH_ROOT / "courses" / "z2004" / "lectures" / orphan_png).exists():
            errors.append(f"[teaching] Unreferenced legacy PNG remains: courses/z2004/lectures/{orphan_png}")

    for course_code in ("z5007", "z2005"):
        chtml = (TEACH_ROOT / "courses" / course_code / "index.html").read_text(encoding="utf-8")
        if re.search(r"<tr><td>Lecture[^<]*</td><td>[^<]*Tuesday", chtml, re.I):
            errors.append(f"[teaching/courses/{course_code}/index.html] Stray 'Tuesday' lecture remains")
        if "Monday, Wednesday, Thursday, and Friday" not in chtml:
            errors.append(f"[teaching/courses/{course_code}/index.html] Missing 'Monday, Wednesday, Thursday, and Friday'")

    for course_code in ("z2005", "z5007"):
        for orphan_dir in ("exam-prep_files", "project-rubric_files"):
            if (TEACH_ROOT / "courses" / course_code / "13-project-review" / orphan_dir).exists():
                errors.append(f"[teaching] Orphan dir remains: courses/{course_code}/13-project-review/{orphan_dir}")

    css_text = (TEACH_ROOT / "assets" / "site.css").read_text(encoding="utf-8")
    if "#6d28d9" in css_text.lower():
        errors.append("[teaching/assets/site.css] Prohibited violet #6d28d9 remains")

    z2004 = (TEACH_ROOT / "courses" / "z2004" / "index.html").read_text(encoding="utf-8")
    if "L31_Views_and_Index.pdf" not in z2004 or "L45_Cloud_Databases.pdf" not in z2004:
        errors.append("[teaching/courses/z2004/index.html] Missing L31 or L45 PDF link")

    z5008 = (TEACH_ROOT / "courses" / "z5008" / "index.html").read_text(encoding="utf-8")
    if ">TBA<" in z5008:
        errors.append("[teaching/courses/z5008/index.html] Unreplaced '>TBA<' in grading weights")

    for nb in sorted((TEACH_ROOT / "courses" / "z5007").glob("*/notebook.ipynb")):
        data = json.loads(nb.read_text(encoding="utf-8"))
        src = "".join(data.get("cells", [{}])[0].get("source", ""))
        if "Z2005" in src:
            errors.append(f"[teaching/{nb.relative_to(TEACH_ROOT).as_posix()}] Stray Z2005 in cell 0")

    return {
        "teachingPagesChecked": checked_count,
        "revealDecksChecked": reveal_count,
        "errors": errors,
        "warnings": warnings,
    }


def main() -> int:
    import sys, time
    dist_only = "--dist-only" in sys.argv
    ci_mode = "--ci" in sys.argv
    t0 = time.time()
    print("[1/2] Auditing dist/...", file=sys.stderr, flush=True)
    dist_res = audit_dist(ci_mode=ci_mode)
    if dist_only or not TEACH_ROOT.exists():
        print(f"[done] dist/ only in {time.time() - t0:.2f}s.", file=sys.stderr, flush=True)
        print(json.dumps({"dist": dist_res, "ciMode": ci_mode}, indent=2))
        total_err = len(dist_res["errors"])
        total_warn = len(dist_res["warnings"])
        return 1 if (total_err if ci_mode else (total_err or total_warn)) else 0
    print(f"[2/2] dist/ done in {time.time() - t0:.2f}s. Auditing teaching site...", file=sys.stderr, flush=True)
    t1 = time.time()
    teach_res = audit_teaching_site()
    print(f"[done] teaching done in {time.time() - t1:.2f}s.", file=sys.stderr, flush=True)
    print(json.dumps({"dist": dist_res, "teaching": teach_res}, indent=2))
    total_err = len(dist_res["errors"]) + len(teach_res["errors"])
    total_warn = len(dist_res["warnings"]) + len(teach_res["warnings"])
    return 1 if (total_err if ci_mode else (total_err or total_warn)) else 0


if __name__ == "__main__":
    raise SystemExit(main())
