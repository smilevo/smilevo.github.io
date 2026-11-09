# SMILE Research Group website

Website of the Software Maintenance and Intelligent Evolution (SMILE) Research Group at the
University of Michigan-Flint, <https://mkaouer.net>.

Built with Next.js (static export) and plain CSS. All content lives in JSON files under `content/`
(see `docs/CONTENT_MODEL.md`); images and PDFs live under `public/`.

## Run locally

```sh
nvm use          # Node 24
npm ci
npm run dev      # http://localhost:3000
npm run check    # validate content, run tests, build and verify the static export
```

## Migration notes

The site was migrated from Hugo/Wowchemy. `scripts/migrate_hugo.py` and `docs/MIGRATION_REPORT.md`
document how content was converted. Events, teaching and service data are kept in
`docs/migration-extra/` until pages for them are built. The old Hugo site remains available on the
`main` branch.

The site layout and code are adapted from <https://github.com/behavioral-data/behavioral-data.github.io>.
