# jessekramer.nl

**Finding beauty in the digital world.**

Personal website for Jesse Kramer — and the **reference implementation** of an AI-native, GitHub-based, file-based CMS.

## What this is

This is **not** “an AI-built website.” It is the first implementation of an **AI-native CMS**: a stable Next.js frontend with file-based content that humans and AI manage through Git — no database, no admin panel, no traditional CMS backend.

- **GitHub** = source of truth  
- **Vercel** = deployment  
- **AI** = content manager  
- **Application** = rendering layer  

See [`ABOUT.md`](./ABOUT.md) for the full story, philosophy, and credits.

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
| **Registry** | `content/manifest.json`, `content/contract.json` | Maintainers |
| **Config** | `config/` | AI & humans |
| **Assets** | `public/` | AI & humans |
| **Application** | `app/`, `components/`, `lib/` | Developers only (unless explicitly requested) |

## Common tasks

```bash
npm run validate:content   # Content integrity checks (v2.0)
npm run build              # Production build
```

| Task | Edit |
|------|------|
| Currently bar | `content/site/currently.json` |
| Homepage widgets | `content/site/homepage.json` + `content/site/widgets/` |
| Journal article | `content/journal/*.md` |
| Archive article | Move to `content/journal/_archived/` |
| Trash article | Move to `content/journal/_trash/` |
| Categories | `content/journal/categories.json` |
| Navigation / footer | `content/site/navigation.json`, `footer.json` |
| Social links | `content/site/links.json` |
| Branding / SEO | `content/site/branding.json` |

## Documentation

| File | Purpose |
|------|---------|
| [ABOUT.md](./ABOUT.md) | Human-facing project story & vision |
| [AGENTS.md](./AGENTS.md) | Rules for AI assistants (start here for AI) |
| [CONTENT.md](./CONTENT.md) | Content operations manual |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design & principles |
| [ARCHITECTURE-REPORT.md](./ARCHITECTURE-REPORT.md) | CMS 2.0 review & scores |
| [features/](./features/) | Per-feature registry |

## Locales

- Dutch (default): `/`, `/journal`, `/about`
- English: `/en/*`

## SEO

- `/sitemap.xml` — auto-generated
- `/robots.txt` — auto-generated
- Canonical URLs, Open Graph, and Twitter cards via `lib/seo/metadata.ts`
- SEO defaults in `content/site/branding.json`

## Deploy

```text
GitHub → Vercel → jessekramer.nl
```

Push to the default branch triggers deployment. Run `npm run validate:content` and `npm run build` before pushing when possible.

**Note:** Do not run `npm run build` while `npm run dev` is active — clear `.next` and restart dev if you see 500 errors.

## Domains

Both `https://jessekramer.nl` and `https://www.jessekramer.nl` work. The canonical domain is **non-www** (`jessekramer.nl`). Redirect is configured in `next.config.ts`. No extra DNS steps required if both domains point to Vercel.
