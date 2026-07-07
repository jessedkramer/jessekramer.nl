# jessekramer.nl

**Finding beauty in the digital world.**

Personal website for Jesse Kramer — an AI-native publishing project where GitHub is the source of truth and Vercel deploys the public site.

## What this is

Not a traditional CMS. Not a site where AI builds the frontend.

This is a **stable Next.js application** with **content, config, and assets** designed to be edited by humans and AI without touching React components.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content vs application

| Layer | Location | Who edits |
|-------|----------|-----------|
| **Content** | `content/` | AI & humans (default) |
| **Config** | `config/` | AI & humans |
| **Assets** | `public/` | AI & humans |
| **Application** | `app/`, `components/`, `lib/` | Developers only (unless explicitly requested) |

## Common tasks

```bash
npm run validate:content   # Content integrity checks
npm run build              # Production build
```

| Task | Edit |
|------|------|
| Currently bar | `content/site/currently.json` |
| Homepage widgets | `content/site/homepage.json` + `content/site/widgets/` |
| Journal article | `content/journal/*.md` |
| Categories | `content/journal/categories.json` |
| Navigation / footer | `content/site/navigation.json`, `footer.json` |
| Social links | `content/site/links.json` |
| Branding / SEO | `content/site/branding.json` |

## Documentation

| File | Purpose |
|------|---------|
| [AGENTS.md](./AGENTS.md) | Rules for AI assistants (start here for AI) |
| [CONTENT.md](./CONTENT.md) | Content operations manual |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design & principles |
| [features/](./features/) | Per-feature registry |

## Locales

- Dutch (default): `/`, `/journal`, `/about`
- English: `/en/*`

## Deploy

```text
GitHub → Vercel → jessekramer.nl
```

Push to the default branch triggers deployment. Run `npm run validate:content` and `npm run build` before pushing when possible.

**Note:** Do not run `npm run build` while `npm run dev` is active — clear `.next` and restart dev if you see 500 errors.
