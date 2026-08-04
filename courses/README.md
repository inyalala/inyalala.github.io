# Course Pages: How This Works

The course section is data-driven. The HTML files are empty shells. All course
content lives in JSON under `courses/data/`, and `courses/assets/course.js`
renders it. **Do not edit the HTML to change course content.**

## Files

| Path | Purpose |
|---|---|
| `data/courses.json` | Registry of all courses. Drives the hub page cards and the grouping into Currently Running / Next Semester / Past Offerings. Also holds the instructor block shared by every course page. |
| `data/<slug>.json` | One file per course. Everything shown on that course's page. |
| `data/_TEMPLATE.json` | Copy this to start a new course. |
| `assets/course.js` | Renderer for individual course pages. |
| `assets/course.css` | Shared styles for the hub and all course pages. |
| `index.html` | Hub page. Reads `data/courses.json` only. |
| `<slug>/index.html` | Course shell. Identical across courses except for `<body data-course="<slug>">`. |

## Routine tasks

**Change anything on a course page**: edit `data/<slug>.json`. No other file
changes.

**Move a course between Currently Running / Next Semester / Past Offerings**:
set `status` to `active`, `upcoming`, or `previous` in both `data/courses.json`
and `data/<slug>.json`.

**Publish materials for a module**: fill the `slides`, `notebooks`, `lab`, and
`assignment.link` fields on that module. Items left empty render as dashed
placeholders, which tells students the material is not out yet. That is the
intended behavior; leave future modules empty rather than deleting them.

**Roll a course into a new offering**:
1. Archive the outgoing offering: `cp data/z5007.json data/z5007-2026-27.json`,
   set its `status` to `previous`, and add it to `data/courses.json` if you want
   the old page to remain reachable.
2. In `data/z5007.json`, update `term`, `academicYear`, and the assignment dates.
3. Point the module links at the new offering's tag in the materials repository.

Nothing else changes. This is the whole point of the structure: a new semester is
a JSON edit, not a rebuild.

**Add a new course**:
1. `cp data/_TEMPLATE.json data/<slug>.json` and fill it in.
2. `cp z2005/index.html <slug>/index.html` and change `data-course="z2005"` to
   your slug. That is the only edit needed in the HTML.
3. Add an entry to the `courses` array in `data/courses.json`.

## Conventions

- Slugs are the lowercased course code: `z2005`, `z5007`.
- `status` is one of `active`, `upcoming`, `previous`.
- Grading weights must total 100. The page prints a visible warning if they do
  not, so a typo cannot go out silently.
- Every field is optional. An empty string or empty array hides its block
  entirely, so a partially filled course page still looks finished.

## Local preview

The pages fetch JSON, so opening the HTML from the file system will fail with a
CORS error. Serve the site instead:

```bash
python -m http.server 8766
```

Then visit `http://localhost:8766/courses/`.

## Relationship to the materials repository

Slides, notebooks, lab sheets, and starter code live in a separate repository
(`iitmz-teaching`), not here. This site holds only the JSON describing each
course and links out. Solutions and exam material are never published to either
public repository.
