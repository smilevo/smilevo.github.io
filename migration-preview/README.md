# SMILE migration preview

This directory contains a standalone, clean-room Next.js homepage prototype for Phase 2 of the migration. It is kept separate from the existing Hugo source so the production build, routes, and content remain unchanged. It uses SMILE-owned copy and images and does not copy the reference repository’s application source.

## Run locally

Use Node.js 24:

```sh
nvm use
npm ci
npm run dev
```

The development server binds to `0.0.0.0:3000` for the sandbox preview. For a static-export check, run `npm run build`; the deployable files are written to `out/`.

## Netlify preview

Pull requests use a `deploy-preview` context in the repository-root `netlify.toml` to run `npm ci` and `npm run build` from this directory, then publish `migration-preview/out`. The default and production contexts continue to build Hugo and publish `public/`. The preview sends `noindex` metadata and a disallow-all `robots.txt`; remove those preview-only protections only in a separately reviewed production cutover.

This Phase 2 preview covers the homepage shell only. Existing people, publication, and news links intentionally lead to the live Hugo site until later phases migrate those collections and routes.

## Implementation references

- Netlify supports context-specific build commands and publish directories in its [file-based configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/).
- Netlify selects a Node version using the `NODE_VERSION` build environment variable; this preview pins the deploy-preview context to Node 24 in `netlify.toml` ([environment variables](https://docs.netlify.com/build/configure-builds/environment-variables/)).
- Next.js static export uses `output: 'export'` and emits the deployable site into `out/` ([static exports](https://nextjs.org/docs/app/guides/static-exports)).
