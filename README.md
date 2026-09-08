# Odivon.Web

Odivon corporate website and expandable product catalogue. Built with React, TypeScript and Vinext on Vite.

## Development

Node.js 22 LTS is required (see `.nvmrc`).

```sh
npm ci
npm run dev
```

## Validation

```sh
npx tsc --noEmit
npm run build
```

## Routes and content

- `/`: company website.
- `/urunler`: product cards, details dialogs and optional external demo links.
- `lib/products.ts`: the 12 founder-supplied product names. Add future products to this catalogue and supply verified bilingual descriptions, scope and `demoUrl` values.
- `lib/messages.ts` and `lib/ui-messages.ts`: Turkish and English content.
- `components/site-shell.tsx`: shared navigation, language selector and light/dark appearance.

Product readiness, detailed capabilities and demo URLs have not yet been supplied. No live demo endpoints are fabricated. Language and appearance preferences are stored in the visitor's browser.

## Vercel deployment

Import `dogangsn/Odivon.Web` with the repository root as Root Directory. The committed `vercel.json` configures:

- Framework Preset: **Other** (Vinext, not a standard Next.js build).
- Node.js: **22.x**.
- Install Command: `npm ci`.
- Build Command: `npm run build:static`.
- Output Directory: `dist/client`.
- Clean URLs: `/urunler` serves the exported `urunler.html`.

Redeploy the newest `main` commit in the existing Vercel project. Remove dashboard overrides that still select Next.js or another output directory. No application environment variables are required for this marketing site.

`build:static` excludes Cloudflare/Sites runtime plugins and exports HTML, scripts, fonts and images. It fails if either page is missing. Do not publish `dist/server` on Vercel.

## Existing Sites preview

`npm run build` keeps the original Cloudflare Workers build. `.openai/hosting.json` identifies the private Sites preview and contains no credentials. The static build does not change that preview. Vercel has its own access settings; the Sites access policy does not transfer to Vercel.

## GitHub versus GitHub Pages

Pushing to GitHub saves source code. Hosting requires a connected provider such as Vercel. GitHub Pages is a separate static hosting service; no Pages workflow is configured. A repository-path Pages deployment also needs a base path for links and assets; do not upload this root-domain export unchanged to `/Odivon.Web/`.

Do not commit environment files, credentials, dependencies or generated output.
