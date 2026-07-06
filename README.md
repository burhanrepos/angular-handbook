# Angular Handbook

A study handbook site — Angular fundamentals across 16 modules plus 100+ interview
questions. Built with **Angular 22** (standalone, zoneless, signals).

The app is a thin, data-driven shell: the **content lives as static files** that the
app fetches at runtime, so the handbook can be updated without touching (or rebuilding)
the Angular code.

## Quick start

```bash
npm install
npm start          # http://localhost:4200/
```

No backend to run — content is served as static files.

## Editing the handbook

All content lives in [`public/content/`](public/content/). Edit a file and refresh the
browser — **no rebuild needed** (content is fetched at runtime, not compiled in).

| To change… | Edit |
| --- | --- |
| A module's text / code samples | `public/content/<id>.html` (e.g. `m7.html`) |
| The interview Q&A | `public/content/qa.html` |
| Sidebar links, module order, titles | `public/content/handbook.json` |

**Add a module:** drop a new `public/content/<id>.html` file, then add an entry to the
`modules` array (and a sidebar link under `nav`) in `handbook.json`. The page and sidebar
pick it up automatically.

### Why content is HTML, not Angular templates

This handbook is an *Angular tutorial*, so its code samples are full of literal Angular
syntax — `@if`, `@for`, `{{ }}`, `@Component`. If that lived in an Angular template, the
compiler would try to **execute** it. So the content is treated as **rich text**: stored
as HTML and rendered via `[innerHTML]` (see [`safe-html.pipe.ts`](src/app/handbook/safe-html.pipe.ts)),
which the browser renders as plain markup.

## Project structure

```
public/content/                 # the handbook content (static files)
  handbook.json                 #   nav groups + module metadata (order, ids, titles)
  m1.html … m16.html            #   module bodies (rich-text HTML)
  qa.html                       #   interview Q&A appendix

src/app/
  app.ts / app.html             # layout shell; fetches the module list
  handbook/
    handbook.models.ts          # ModuleMeta, NavGroup, NavLink
    handbook.service.ts         # fetches content (CONTENT_BASE_URL is the swap point)
    safe-html.pipe.ts           # `trustHtml` — renders trusted content HTML
    toc/                        # sidebar navigation
    hero/                       # hero + "how to read this"
    module-section/             # one module: metadata chrome + fetched body
    qa/                         # Q&A appendix
    footer/

.github/workflows/deploy.yml    # auto-deploy to GitHub Pages on push
```

### Pointing at a real CMS/API later

`HandbookService` reads from `content/` by default. To source content from a CMS or API
instead, override one token — no component changes:

```ts
{ provide: CONTENT_BASE_URL, useValue: 'https://cms.example.com/handbook' }
```

## Build & test

```bash
npm run build      # production build → dist/angular-handbook-site/browser/
npm test           # unit tests (Vitest)
```

## Deployment (GitHub Pages)

Pushing to `main`/`master` auto-deploys via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
One-time setup:

1. Push the repo to GitHub.
2. **Settings → Pages → Source → "GitHub Actions".**

The workflow derives the correct `--base-href` from the repo name, so the site works at
`https://<you>.github.io/<repo>/` with no manual config.
