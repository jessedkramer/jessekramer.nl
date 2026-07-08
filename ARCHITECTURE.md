# Architecture — jessekramer.nl

This document describes how the repository is organized for long-term maintenance by developers and AI assistants.

## Core principle

**Application code is stable. Content is editable.**

New features follow one rule: code lives in `app/` and `components/`; visitor-facing text, links, and layout configuration live in `content/` and `config/`.

## Layer model

```text
┌─────────────────────────────────────────────┐
│  Application (app/, components/, lib/)      │
│  Next.js, React, routing, design system     │
└─────────────────────────────────────────────┘
                      ▲ reads
┌─────────────────────────────────────────────┐
│  Content (content/)                         │
│  Copy, widgets, journal, categories         │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Config (config/)                           │
│  Behavior: pagination, audio, layout limits │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Assets (public/)                           │
│  Images, audio, icons, fonts                │
└─────────────────────────────────────────────┘
```

## Single source of truth

| Data | Source file |
|------|-------------|
| AI registry | `content/manifest.json` |
| Content contract | `content/contract.json` |
| Outbound URLs | `content/site/links.json` |
| Navigation | `content/site/navigation.json` |
| Footer | `content/site/footer.json` |
| Currently bar | `content/site/currently.json` |
| Homepage layout | `content/site/homepage.json` |
| Widget copy | `content/site/widgets/*.json`, `socials.json` |
| Branding / SEO | `content/site/branding.json` |
| Journal categories | `content/journal/categories.json` |
| Journal articles (active) | `content/journal/*.md` |
| Journal archived | `content/journal/_archived/*.md` |
| Journal trash | `content/journal/_trash/*.md` |

## Journal lifecycle

Publishable content only:

```text
Draft → Published → Archived → Trash → Permanent delete
```

| State | Location | Visible on site |
|-------|----------|-----------------|
| Draft | `content/journal/` + `published: false` | No |
| Published | `content/journal/` + `published: true` | Yes |
| Archived | `content/journal/_archived/` | No |
| Trash | `content/journal/_trash/` | No |

Restore via `git mv`. Permanent delete removes the file from `_trash/`.

Configuration content (widgets, branding, nav) has **no lifecycle** — edit JSON directly.

## SEO

| Component | Location |
|-----------|----------|
| Site defaults | `content/site/branding.json` |
| Metadata builder | `lib/seo/metadata.ts` |
| Sitemap | `app/sitemap.ts` |
| Robots | `app/robots.ts` |

Canonical URLs, Open Graph, Twitter cards, and locale alternates (nl/en) are generated per page.

## Domains

Canonical: `https://jessekramer.nl` (non-www).  
Redirect: `www.jessekramer.nl` → `jessekramer.nl` in `next.config.ts`.  
Both hostnames must point to Vercel in DNS — no extra repo config needed.

## Content loading

Server loaders in `lib/site/index.ts` read JSON at build time. Components receive data through these loaders — no hardcoded visitor copy in React files.

Journal parsing lives in `lib/journal.ts` with categories from `lib/journal/categories.ts`.

## Internationalization

Two parallel route trees:

- `app/(nl)/` — Dutch default routes
- `app/en/` — English prefixed routes

Content JSON uses `{ "nl": "...", "en": "..." }` objects. UI chrome (buttons, aria labels, empty states) stays in `messages/nl.json` and `messages/en.json`.

Journal English visibility requires an English body after the `---en---` delimiter.

## Validation

`scripts/validate-content.mjs` (v2.0) reads `content/manifest.json` and checks:

- Required content files exist and parse as JSON
- Journal lifecycle consistency and duplicate slugs across folders
- Journal categories: duplicate IDs, unknown category keys in articles
- `hrefKey` references in navigation, socials, municipality
- Homepage widget layout consistency (desktop columns + `mobileOrder`)
- Currently bar href validity
- SEO metadata and asset existence (warnings)
- Broken internal links, missing alt text (warnings)
- Incomplete `nl`/`en` localization (warnings)

Utilities: `scripts/lib/content-utils.mjs`

Run via `npm run validate:content`.

## Feature registry

See [`features/README.md`](./features/README.md) for the full index.

## AI assistant onboarding

1. Read `AGENTS.md` for edit boundaries
2. Read `CONTENT.md` for workflows
3. Check `features/` for the specific area being changed
4. Run `npm run validate:content` after edits

## Routing (intentional current state)

The site uses parallel `app/(nl)/` and `app/en/` trees rather than a unified `app/[locale]/` segment. This works correctly but is a future consolidation candidate — not changed in this refactor to avoid breaking routes.

## Design principles

These guide all future work — content and application alike.

| Principle | Meaning |
|-----------|---------|
| **Calm over loud** | Atmosphere and clarity before spectacle |
| **Content over effects** | Typography and writing carry the experience |
| **Timeless over trendy** | Avoid gimmicks that date quickly |
| **Glass, not chrome** | Liquid glass widgets over a cosmic background |
| **Subtle motion** | Animations support mood, never demand attention |
| **Mobile first** | Soundtrack and key interactions respect small screens |
| **Accessible** | Semantic HTML, aria labels, keyboard-friendly controls |
| **Performance** | Static generation, minimal client JS |
| **AI-native** | Content lives in Git; AI edits files, not components |

Canonical slogan: *Finding beauty in the digital world.*

Jesse Kramer is the brand. TheJessePost appears only in social context.

## Visual implementation

Design tokens and component styles live in `app/globals.css` (`:root` variables, breakpoints, card classes). There is no separate style guide document — the CSS is the source of truth to prevent drift.

Key tokens: cosmic purple palette, `--dash-max` (homepage), `--content-max` (editorial pages), liquid glass card styling.

## Visual direction (unchanged)

- Cosmic purple atmosphere, liquid glass widgets
- Calm editorial identity — not a generic portfolio
- Jesse Kramer is the brand; TheJessePost appears only in social context

## Deployment

```text
GitHub → Vercel → https://jessekramer.nl
```

Static generation for journal articles; homepage and index pages pre-rendered at build time.

## Future-ready (not built)

The architecture supports future additions without structural changes:

| Future feature | Extension pattern |
|----------------|-------------------|
| Portfolio / projects | `content/projects/` + loader + route |
| Photo galleries | `content/galleries/` + co-located `public/` assets |
| Travel logs | `content/travel/` or journal subcategories |
| Changelog | `content/changelog/` |
| Reading list / bookmarks | `content/reading/` or `content/bookmarks/` |
| Newsletter | External service link in `links.json` + widget |
| New homepage widget | `content/site/widgets/<name>.json` + component + `homepage.json` entry |

Add `content/<feature>/` + loader in `lib/` + route in `app/` + doc in `features/`.

## Private context

Private AI context and strategy belong in a separate private repository (`jessekramer-brain`), not in this public site repo.
