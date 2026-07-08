# AGENTS.md — jessekramer.nl

> **Start here.** This is the central guide for AI assistants working on this repository.

---

## Mission

**jessekramer.nl** is an AI-native personal website.

- The **application** (Next.js, React, design system) stays stable.
- **Content** (copy, links, journal, widgets) is fully editable without touching components.
- GitHub is the source of truth. Vercel deploys automatically on push.

A new AI assistant should be productive within minutes by reading this file, then `CONTENT.md` for workflows, and `features/` for specific areas.

---

## Architecture at a glance

```text
content/          Visitor-facing data (AI edits freely)
content/manifest.json   Machine-readable registry (read first)
content/contract.json   Content contract & lifecycle rules
config/           Runtime behavior, not copy
public/           Media assets
app/              Next.js routes (application)
components/       React UI (application)
lib/              Server loaders & parsers (application)
messages/         UI chrome only — buttons, aria, empty-state hints
i18n/             Locale routing (application)
scripts/          Validation & tooling
features/         Feature registry
```

**Golden rule:** New feature with visitor text → content files first, then wire a loader in `lib/site/` or `lib/journal/`. Never hardcode copy in components.

---

## Edit boundaries

### Safe to edit (default)

| Path | Purpose |
|------|---------|
| `content/**` | All visitor-facing text, links, widgets, journal, categories |
| `config/**` | Pagination, audio behavior, locale settings |
| `public/**` | Images, audio, icons, fonts |
| `features/**` | Feature documentation |
| `AGENTS.md`, `CONTENT.md`, `ARCHITECTURE.md`, `README.md`, `ABOUT.md` | Documentation |

### Edit only when explicitly asked

| Path | Purpose |
|------|---------|
| `app/**` | Routes and page compositions |
| `components/**` | React UI |
| `lib/**` | Loaders, parsers, utilities |
| `i18n/**` | Locale routing config |
| `types/**` | TypeScript types |
| `app/globals.css` | Design tokens and styles |
| `messages/**` | UI chrome only — not visitor content |
| `package.json`, `next.config.ts`, `tsconfig.json` | Build config |

When Jesse asks for a content change, **do not** edit application code unless the content model cannot express the request.

---

## Repository map (60-second orientation)

```text
content/site/
  branding.json       Site name, tagline, SEO metadata
  links.json          All outbound URLs (single source of truth)
  navigation.json     Header and mobile nav
  footer.json         Copyright
  currently.json      Currently bar segments
  homepage.json       Widget layout and enable flags
  socials.json        Socials widget
  widgets/
    about.json        About page + homepage card
    journal.json      Journal page hero + card title
    municipality.json Municipality widget

content/journal/
  categories.json     Category definitions
  *.md                Active articles (draft or published)
  _archived/*.md      Archived (hidden from site)
  _trash/*.md         Trash (hidden, restorable)
  _example.md         Template (excluded from site)

config/site.config.ts   postsPerPage, audio settings

lib/site/index.ts       Server loaders for content/site/*
lib/journal.ts          Journal parser
lib/journal/categories.ts

messages/nl.json        UI chrome (Dutch)
messages/en.json        UI chrome (English)
```

---

## Content vs UI strings

| Type | Location | Example |
|------|----------|---------|
| Visitor copy | `content/site/*.json`, `content/journal/*.md` | About paragraphs, nav labels, Currently bar |
| UI chrome | `messages/*.json` | "Read more", search placeholder, pagination buttons |

If copy appears on the website for visitors to read, it belongs in `content/`, not `messages/`.

---

## Common tasks

| Task | Edit |
|------|------|
| Update Currently bar text or link | `content/site/currently.json` |
| Change soundtrack file | `public/audio/` + `config/site.config.ts` → `audio` |
| Enable/disable homepage widget | `content/site/homepage.json` → `widgets.<id>.enabled` |
| Reorder homepage widgets (desktop) | `content/site/homepage.json` → `layout.desktop.columns` |
| Edit About page or card | `content/site/widgets/about.json` |
| Edit social links or labels | `content/site/links.json` + `content/site/socials.json` |
| Edit municipality widget | `content/site/widgets/municipality.json` |
| Edit journal page intro | `content/site/widgets/journal.json` |
| Publish journal article | `content/journal/<slug>.md` |
| Add journal category | `content/journal/categories.json` |
| Change navigation | `content/site/navigation.json` |
| Change footer copyright | `content/site/footer.json` |
| Change site title / SEO | `content/site/branding.json` |
| Change pagination count | `config/site.config.ts` → `journal.postsPerPage` |

---

## Registry-first workflow

1. Read `AGENTS.md` (this file)
2. Read `content/manifest.json` for paths and content types
3. Read `content/contract.json` for lifecycle and schema rules
4. Read `CONTENT.md` for operational steps
5. Read relevant `features/*.md`
6. Edit content files
7. Run `npm run validate:content`

For journal bulk operations, use manifest paths — do not scan the entire repository:

| Operation | Action |
|-----------|--------|
| Publish | `content/journal/{slug}.md` with `published: true` |
| Draft | `published: false` in active folder |
| Archive | `git mv content/journal/{slug}.md content/journal/_archived/` |
| Trash | `git mv content/journal/{slug}.md content/journal/_trash/` |
| Restore | `git mv` from `_archived/` or `_trash/` back to `content/journal/` |
| Permanent delete | Remove file from `_trash/` |

Use `getJournalInventory()` in `lib/journal.ts` for a full programmatic inventory (all lifecycle states).

---

## Journal workflow

1. Copy `content/journal/_example.md` → `content/journal/your-slug.md`
2. Set frontmatter: `title`, `date`, `category`, `published: true`
3. Write Dutch Markdown body
4. Optional English: add `titleEn`, `excerptEn`, body after `---en---` on its own line
5. Category key must exist in `content/journal/categories.json`
6. Run `npm run validate:content`

**Drafts:** `published: false`, `status: draft`, or filename prefix `_` (templates only)

**Lifecycle folders:** `_archived/` and `_trash/` hide content from the site.

**English visibility:** English mode requires an English body after `---en---`. Title alone is not enough.

---

## SEO

- Defaults: `content/site/branding.json` → `metadata.siteUrl`, `ogImage`, `twitter`
- Helpers: `lib/seo/metadata.ts`
- Auto routes: `app/sitemap.ts`, `app/robots.ts`

---

## AI Capability Matrix

| Capability | Supported | How |
|------------|-----------|-----|
| Edit site copy | ✅ | `content/site/*.json` |
| Edit config | ✅ | `config/site.config.ts` |
| Publish / draft journal | ✅ | `content/journal/{slug}.md` |
| Archive / trash / restore | ✅ | `_archived/`, `_trash/` + git mv |
| Bulk journal ops | ✅ | Manifest paths |
| SEO metadata | ✅ | `branding.json` + frontmatter |
| Add homepage widget | ⚠️ | JSON + React component |
| Review queue / audit UI | ❌ | Roadmap (Git today) |

---

## Locales

| Locale | Routes |
|--------|--------|
| Dutch (default) | `/`, `/about`, `/journal` |
| English | `/en/*` |

Content JSON uses `{ "nl": "...", "en": "..." }`. Routes use parallel trees: `app/(nl)/` and `app/en/`.

---

## Validation

```bash
npm run validate:content
```

Checks (v2.0):

- Required files from `content/manifest.json`
- Journal categories: duplicate IDs, unknown category keys
- Journal slugs: duplicate across lifecycle folders
- Lifecycle consistency (status vs folder location)
- `hrefKey` references resolve in `links.json`
- Homepage widget layout consistency
- Currently bar href validity
- SEO: siteUrl, ogImage, descriptions (warnings)
- Broken internal journal links, missing images, missing alt text (warnings)
- Privacy-sensitive patterns (warnings)
- Incomplete `nl`/`en` localization (warnings)

Run after every significant content change.

---

## Build & deploy

```bash
npm run validate:content
npm run build
npm run dev
```

Deploy path: **GitHub → Vercel → jessekramer.nl**

**Critical:** Do not run `npm run build` while `npm run dev` is active. Mixed `.next` cache causes 500 errors. Fix:

```bash
fuser -k 3000/tcp 2>/dev/null
rm -rf .next node_modules/.cache
npm run dev
```

---

## Best practices

1. **Read before editing** — `AGENTS.md` → `CONTENT.md` → relevant `features/*.md`
2. **Minimal diffs** — change only files required for the task
3. **No duplicate data** — URLs only in `links.json`; categories only in `categories.json`
4. **Preserve JSON shape** — localized fields always use `{ "nl", "en" }`
5. **Validate before finishing** — `npm run validate:content`
6. **No drive-by refactors** — don't touch unrelated application code
7. **No secrets** — never commit `.env`, tokens, or private brain material
8. **Currently bar safety** — only update location/status when Jesse explicitly confirms; keep content public-safe

---

## Examples

### Change Currently location

Edit `content/site/currently.json`:

```json
{
  "id": "location",
  "value": { "nl": "Hamburg, Duitsland", "en": "Hamburg, Germany" },
  "href": "https://en.wikipedia.org/wiki/Hamburg",
  "external": true
}
```

No component changes needed.

### Publish a journal article

Create `content/journal/mijn-artikel.md`:

```markdown
---
title: Mijn artikel
date: 2026-07-07
category: technology
published: true
---

Nederlandse tekst hier.
```

### Disable a homepage widget

In `content/site/homepage.json`:

```json
"municipality": { "enabled": false }
```

---

## Feature registry

See [`features/README.md`](./features/README.md) for per-feature documentation.

---

## Future extensions (not built)

The architecture supports adding without structural changes:

- Portfolio, projects, photo galleries, travel logs
- Changelog, reading list, bookmarks, newsletter
- New homepage widgets

Pattern: `content/<feature>/` + loader in `lib/` + route in `app/` + entry in `features/`.

---

## Related documentation

| File | When to read |
|------|--------------|
| [CONTENT.md](./CONTENT.md) | Detailed content workflows |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design, design principles |
| [ABOUT.md](./ABOUT.md) | Project story for humans |
| [ARCHITECTURE-REPORT.md](./ARCHITECTURE-REPORT.md) | CMS 2.0 review & scores |
| [features/](./features/) | Specific feature reference |
