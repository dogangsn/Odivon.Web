# Odivon.Web

Odivon corporate website and expandable product catalogue. Built with React, TypeScript and Vinext on Vite.

## Development

Node.js 22.13+ is required.

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

## Deployment

The existing private preview uses Sites. `.openai/hosting.json` identifies that deployment; it contains no credentials. GitHub is the source repository, not an automatic deployment target. Firebase Hosting and GitHub Pages deployment are not configured. The current production build targets Cloudflare Workers and should not be uploaded to a static host without configuring static export first.

Do not commit local environment files, credentials, dependency folders or generated build output. When making a separate deployment, configure the destination for that environment instead of reusing the private preview's project identifier.
