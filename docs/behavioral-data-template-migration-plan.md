# Migration plan: adapt the Behavioral Data site for SMILE

**Status:** proposal only. This branch is based on `origin/main` at `64a083b`; it does not replace the current site or change production.

## Recommendation

The Behavioral Data site is a feasible foundation for a SMILE redesign. Its strongest fit is the editorial homepage: a persistent identity/navigation rail, short lab introduction, team preview, recent news and awards, latest papers, and a support section. Its implementation is a Next.js/React site that exports static files from JSON content, so it does not require a production application server or database. [1] [2] [3] [4]

Treat it as a **selective template migration, not a drop-in copy**. Replace all Behavioral Data content, identity, images, and domain settings. Keep SMILE’s existing Netlify deploy-preview workflow for the first migration stages. Do not import the template’s GitHub Pages deployment or its lab-specific publication-maintenance automation unless those are separately reviewed and deliberately selected. The template’s deployment workflow is manual GitHub Pages; SMILE currently builds with Hugo on Netlify. [2] [5] [6] [7]

## What needs to migrate

The inspected SMILE source snapshot contains 71 author profiles, 199 publication records, 13 event pages, five news posts, 17 teaching entries (seven current and ten historical), and 110 service records. Projects and code are held in separate grouped datasets. Content is split between Hugo Markdown/front matter and JSON, and profile/publication/event media totals about 153 MB across the inspected directories, with publication files accounting for most of it. These are migration inputs, not records to copy without review. [8]

The template’s current JSON collections cover people, alumni, publications, awards, news, projects, opportunities, gallery images, sponsors, and site/page text. They do not provide SMILE’s event archive, teaching history, service record, code catalogue, or the current site’s full contact workflow as first-class sections. Add those models and routes rather than dropping the content. The existing SMILE navigation includes News, People, Events, Publications, Contact, Projects, Teaching, Code, and Service. [4] [9]

## Staged migration

1. **Inventory and freeze the URL map.** Generate a manifest of every current public route, source slug, title, canonical URL, and referenced asset from the Hugo build. Include people, papers, events, posts, teaching, service, projects, code, contact, taxonomies, and downloadable PDFs. Record the baseline against the branch’s source commit before changing route or content identifiers.

2. **Port the application shell and homepage only.** Bring over the template’s `app/`, `components/`, `lib/`, and the build/test pieces needed for its static export. Adapt the typography, color, navigation, logos, affiliation, footer, and metadata to SMILE rather than retaining the Behavioral Data brand. Replace the template’s `site.json` values and page copy, and remove the unrelated lab’s sponsor, people, publication, award, news, image, and signup records. Rebuild the homepage around SMILE’s group description, research areas, current team, recent news/publications, and only verified support. The reference layout is a guide; its wording and content are not SMILE content. [1] [3] [10]

3. **Convert core content with a deterministic importer.** Add a one-time migration script that reads Hugo front matter and the existing JSON datasets, writes the template’s validated JSON schemas, and produces a review report for skipped or ambiguous records. Preserve source slugs as stable IDs where possible. Map people into the template’s member/visitor/alumni status model, but keep SMILE’s PI, PhD, MSc, collaborator, and other role/group distinctions in explicit fields. Extend the person schema where needed to retain education, affiliation, biography, and academic/social links; the target’s minimal profile schema should not silently discard them. [4]

   Convert all 199 papers, not just the template’s sample set. Preserve full titles, author display order, years, full venue names and short venue labels, DOI and publisher links, PDFs, abstracts, and award metadata. Generate `personIds` only from a reviewed identity crosswalk; the target model uses explicit person IDs for profile-paper relationships and expects stable IDs for detail-page URLs. Preserve imported citation fields and source IDs so changes remain auditable. [4]

4. **Add SMILE-specific collections and pages.** Create `events.json` plus event archive/detail routes, retaining the existing event slugs, dates, locations, abstracts, featured images, and YouTube embeds. Create `teaching.json` with current courses and a clearly separated teaching history. Create `service.json` for the 110 dated service items, with source fields and filters or year grouping suitable for its size. Expand project/code data into route-backed pages rather than leaving them only as homepage cards. Port the contact page and decide whether to retain or replace the existing Git-Gateway content editor; the template’s normal workflow is content changes through JSON and pull requests, while SMILE currently has a Decap CMS configuration. [4] [9] [11]

5. **Preserve links and search visibility.** Keep the canonical domain `https://mkaouer.net/`. Prefer retaining existing route prefixes and slugs when that is practical. Where the template’s route names differ, generate a complete redirect/alias map—for example, `/author/{slug}/` to a person page and `/publication/{slug}/` to its paper page—and cover event, post, teaching, service, project, code, and archive routes as well. The template statically exports pages and has only a small set of built-in legacy aliases, so add and test a generated alias mechanism or Netlify redirect rules for the complete SMILE route manifest. Check canonical tags, sitemap, robots rules, trailing slashes, internal links, PDFs, and external scholarly links. Do not rely on server-side redirects that will not exist in a static export. [3] [4] [5] [8]

6. **Preview, review, and cut over only after approval.** Configure the branch build to run the template’s Node 24 static build and publish `out/` as a Netlify Deploy Preview. Keep production’s Hugo build and custom domain untouched during development. Run the template content validator, unit tests, Python tests, skeleton test, static build, route/redirect comparison, and broken-link checks. Review all generated profiles and paper relationships, then check mobile layout, keyboard navigation, image alt text, publication filters, video embeds, and download URLs in the preview. After sign-off, merge only the approved migration and change the production build configuration in a separate, explicitly reviewed cutover. Retain the last Hugo production deploy and the migration source branch for rollback. [2] [5] [6] [7]

## Proposed code layout

Use the template’s existing responsibilities as the starting point: `app/` for static routes and page layouts; `components/` for shared cards, navigation, profiles, and publication UI; `content/` for validated JSON records; `lib/` for relationships, route data, and formatters; `public/` for images, PDFs, and static files; and `scripts/` plus `tests/` for import, validation, aliases, and regression checks. Add the SMILE-specific event, teaching, and service pages and data files in the same pattern. Keep the importer and its reports separate from runtime code so future content edits do not depend on a one-off migration process. [2] [4]

## Main decisions and risks

- **Identity review:** 71 Hugo author profiles do not automatically equal 71 current lab members. Classify each record and confirm alumni, collaborator, and student status before publishing the converted roster.
- **Lossless scholarly metadata:** preserve all 199 paper URLs and source fields. Review author-to-person relationships; do not infer identity from name matching alone.
- **Non-template features:** events, teaching, service, project/code details, and the current contact/editor workflow need explicit product decisions and new page components.
- **URLs and assets:** a static export can serve the pages and media, but route changes can break bookmarks, citations, search results, PDF links, or old embeds. Build a route manifest and test every old URL against a redirect or live page.
- **Hosting and content operations:** the template’s default GitHub Pages release is manual; SMILE’s current production build is Netlify. Keep Netlify during migration, and decide separately whether JSON-plus-PR editing replaces Decap CMS.
- **Scope control:** do not import the template’s lab data, signup endpoint, sponsor list, or automated publication identity configuration as-is. Any maintenance automation must use SMILE-specific identities, review rules, and secrets only after a separate approval.

## References

[1]: https://behavioral-data.github.io/ "Behavioral Data Science Lab homepage"
[2]: https://github.com/behavioral-data/behavioral-data.github.io/blob/master/README.md "Behavioral Data website README"
[3]: https://github.com/behavioral-data/behavioral-data.github.io/blob/master/next.config.mjs "Next.js static-export configuration"
[4]: https://github.com/behavioral-data/behavioral-data.github.io/blob/master/docs/CONTENT_MODEL.md "Behavioral Data content model"
[5]: https://github.com/behavioral-data/behavioral-data.github.io/blob/master/app/page.jsx "Behavioral Data homepage implementation"
[6]: https://github.com/behavioral-data/behavioral-data.github.io/blob/master/.github/workflows/deploy.yml "Behavioral Data production deployment workflow"
[7]: https://github.com/smilevo/smilevo.github.io/blob/64a083b/netlify.toml "SMILE Netlify configuration at the migration baseline"
[8]: https://github.com/smilevo/smilevo.github.io/tree/64a083b "SMILE repository snapshot used for the inventory"
[9]: https://github.com/smilevo/smilevo.github.io/blob/64a083b/config/_default/menus.yaml "SMILE navigation at the migration baseline"
[10]: https://github.com/smilevo/smilevo.github.io/blob/64a083b/config/_default/config.yaml "SMILE Hugo configuration at the migration baseline"
[11]: https://github.com/smilevo/smilevo.github.io/blob/64a083b/static/admin/config.yml "SMILE Decap CMS configuration at the migration baseline"
