#!/usr/bin/env python3
"""
Normalize site images to one consistent standard.

Every image on the site should be the same format, the same quality setting,
and bounded by the same maximum dimension. Drop a photo of any size or format
into images/ and run this; it produces a WebP that matches everything else.

    python scripts/optimize_images.py                 # normalize images/news
    python scripts/optimize_images.py images          # normalize everything
    python scripts/optimize_images.py --check         # report only, change nothing

The standard, defined once below:

    format      WebP
    quality     82
    max edge    1600 px on the longest side
    metadata    stripped, except that EXIF rotation is applied first
    originals   removed once converted, so the repo carries one copy

On upscaling: this script never enlarges an image. A 960 px poster resized to
1600 px is not a sharper poster, it is the same poster with invented pixels and
a larger file. Uniform *display* is handled in CSS with a fixed aspect ratio
and object-fit, which is where it belongs. Uniform *encoding* is handled here.
"""

import argparse
import os
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is required: pip install pillow")

# ---- the standard ----
FORMAT = "WEBP"
QUALITY = 82
MAX_EDGE = 1600
METHOD = 6                      # slowest, smallest; this runs rarely

SOURCE_EXT = {".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff", ".webp"}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def normalize(path, check_only=False):
    """Convert one file to the standard. Returns a one-line report."""
    stem, ext = os.path.splitext(path)
    target = stem + ".webp"
    before = os.path.getsize(path)

    im = ImageOps.exif_transpose(Image.open(path))
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    # WebP handles alpha, but flatten palette images onto white for consistency.
    if im.mode == "RGBA" and ext.lower() not in (".png", ".webp"):
        im = im.convert("RGB")

    w, h = im.size
    longest = max(w, h)
    resized = False
    if longest > MAX_EDGE:
        scale = MAX_EDGE / longest
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        resized = True

    already = (
        ext.lower() == ".webp"
        and not resized
        and before < 900_000          # a large webp is still worth re-encoding
    )
    if already:
        return "skip   %-52s %dx%d, %d KB" % (
            os.path.relpath(path, ROOT).replace("\\", "/"), w, h, before // 1024)

    if check_only:
        return "would  %-52s %dx%d -> %dx%d" % (
            os.path.relpath(path, ROOT).replace("\\", "/"), w, h, im.size[0], im.size[1])

    # Save to a temporary name first so a failure cannot destroy the original.
    tmp = target + ".tmp"
    im.save(tmp, FORMAT, quality=QUALITY, method=METHOD)
    os.replace(tmp, target)
    if os.path.abspath(path) != os.path.abspath(target):
        os.remove(path)

    after = os.path.getsize(target)
    return "ok     %-52s %dx%d  %5d KB -> %5d KB  (%+d%%)" % (
        os.path.relpath(target, ROOT).replace("\\", "/"),
        im.size[0], im.size[1], before // 1024, after // 1024,
        round(100 * (after - before) / before))


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("target", nargs="?", default="images/news",
                    help="file or directory, relative to the site root")
    ap.add_argument("--check", action="store_true", help="report only")
    args = ap.parse_args()

    root = os.path.join(ROOT, args.target)
    if not os.path.exists(root):
        sys.exit("No such path: " + root)

    files = []
    if os.path.isfile(root):
        files = [root]
    else:
        for dirpath, _, names in os.walk(root):
            for n in sorted(names):
                if os.path.splitext(n)[1].lower() in SOURCE_EXT:
                    files.append(os.path.join(dirpath, n))

    if not files:
        print("Nothing to do.")
        return 0

    print("Standard: %s, quality %d, longest edge %d px\n" % (FORMAT, QUALITY, MAX_EDGE))
    changed = 0
    for f in files:
        line = normalize(f, args.check)
        print(line)
        if line.startswith("ok") or line.startswith("would"):
            changed += 1
    print("\n%d of %d file(s) %s." % (changed, len(files),
                                      "would change" if args.check else "normalized"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
