# Phase 1 URL and asset inventory

- Source commit: `64a083b`
- Site base URL: `https://mkaouer.net/`
- Hugo output: `/tmp/smilevo-hugo-phase1`
- HTML routes/pages inventoried: 581
- Referenced assets (local and external): 273
- Missing referenced local assets: 3
- Non-alias pages absent from sitemap: 2

## Route counts

- `admin`: 1
- `code`: 1
- `contact`: 1
- `event`: 13
- `event-archive`: 1
- `home`: 1
- `news`: 7
- `news-archive`: 1
- `page`: 3
- `people-archive`: 30
- `person`: 71
- `project`: 1
- `publication`: 199
- `publication-archive`: 1
- `service`: 1
- `static-tool`: 2
- `taxonomy`: 211
- `taxonomy-index:publication_type`: 2
- `taxonomy:category`: 4
- `taxonomy:publication_type`: 25
- `taxonomy:tag`: 4
- `teaching`: 1

## Missing local assets

- `/files/Almassari,SultanCVv9.1.pdf` — referenced by 2 page(s).
- `/files/Belhassen Khefacha's resumeW.pdf` — referenced by 2 page(s).
- `/index.webmanifest` — referenced by 568 page(s).

## Routes absent from sitemap

- `/dashboard/` — SmileLab Dashboard (`static-tool`).
- `/import/` — DBLP Importer — SmileLab (`static-tool`).

## Review notes

- `routes.csv` records rendered route, inferred kind/source slug, title, canonical URL, source file where it could be matched, output file, sitemap presence, and count of directly referenced assets.
- `assets.csv` records local/external resources referenced by rendered HTML, including image/media sources, stylesheets, scripts, embeds, downloadable links, and CSS `url(...)` references; local resources are checked against the rendered output.
- Taxonomy and generated routes may not have a single Markdown source file. An empty `source_file` means the mapping requires source review, not that the route is invalid.
- Confirm whether the non-sitemap utility pages should remain excluded before the migration cutover.
