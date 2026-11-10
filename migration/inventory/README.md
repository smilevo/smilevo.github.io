# Phase 1: URL and asset inventory

This is the baseline inventory for the SMILE-to-Behavioral-Data-template migration. The test branch starts from the migration-plan branch, whose website content matches upstream `main` at source commit `64a083b`. No production configuration or Hugo site content was changed for this inventory.

## Build and inventory result

The baseline was rendered with Hugo `v0.92.2+extended` on Linux ARM64 into `/tmp/smilevo-hugo-phase1`. Hugo completed successfully with one deprecation warning about `.Path`. The render reported 844 pages, 47 paginator pages, 334 non-page files, 41 static files, 205 processed images, and 10 aliases.

The generated `routes.csv` contains 581 HTML routes, including pagination and taxonomy routes. The inventory maps all 71 author profiles to their title-derived public URLs, and maps the 199 publication records, 13 event entries, and two static utilities to source files where applicable. `assets.csv` records 273 referenced local and external assets. These files are a source-to-route crosswalk for the migration, not an approved redirect map.

## Known exceptions requiring review

Three local references are missing from the rendered output:

- `/files/Almassari,SultanCVv9.1.pdf` is linked from two pages, but the repository file is `static/files/Almassari_SultanCVv9.1.pdf` (underscore rather than comma).
- `/files/Belhassen Khefacha's resumeW.pdf` is linked from two pages, but the repository file is `static/files/Belhassen Khefacha's resume.pdf` (the link includes an extra `W`).
- `/index.webmanifest` is referenced by 568 rendered pages, but no corresponding source file was found under the site’s static/assets/config paths.

The static utility pages `/dashboard/` (“SmileLab Dashboard”) and `/import/` (“DBLP Importer — SmileLab”) are rendered but absent from the sitemap. Confirm whether this exclusion is intentional and how these tools should be preserved before cutover. These exceptions have been recorded, not fixed, so Phase 1 remains open pending review.

## Reproduce

Use Hugo `v0.92.2+extended` on `PATH` (the tested ARM64 binary was built from the official Hugo v0.92.2 source), then render to a temporary destination and regenerate the CSVs and summary:

```sh
hugo version
HUGO_CACHEDIR=/tmp/hugo-cache hugo --gc --minify \
  --baseURL https://mkaouer.net/ \
  --destination /tmp/smilevo-hugo-phase1

python3 scripts/migration/generate_phase1_inventory.py \
  --public-dir /tmp/smilevo-hugo-phase1 \
  --source-root . \
  --output-dir migration/inventory \
  --base-url https://mkaouer.net/ \
  --source-commit 64a083b
```

## Outputs

- `routes.csv`: route, route kind, source slug, title, canonical URL, source file when matched, rendered file, sitemap membership, and per-page asset count.
- `assets.csv`: local/external URL, asset type, output existence/size for local assets, reference count, and referring routes.
- `summary.md`: route-kind totals and the exact missing-local-asset and non-sitemap route exceptions.
- `../../scripts/migration/generate_phase1_inventory.py`: deterministic inventory generator using only the Python standard library.
