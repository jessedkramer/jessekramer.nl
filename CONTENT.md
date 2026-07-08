# CONTENT.md — Content operations manual

**Read this file before editing visitor-facing content.**

There is no admin dashboard. Content lives in Git. AI assistants and humans edit files; Vercel deploys on push.

See also: [AGENTS.md](./AGENTS.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [features/](./features/)

---

## Workflow

```text
Describe change → Edit content/ or config/ → npm run validate:content → Push → Vercel deploys
```

---

## Repository map

```text
content/
  site/
    branding.json       Site name, tagline, default metadata
    links.json          All outbound URLs (single source)
    navigation.json     Header + mobile nav items
    footer.json         Copyright text
    currently.json      Currently bar segments
    homepage.json       Widget layout + enable flags
    socials.json        Socials widget copy
    widgets/
      about.json
      journal.json
      municipality.json
  journal/
    categories.json     Category definitions
    *.md                Articles

config/
  site.config.ts        Behavior only (pagination, audio limits)

messages/
  nl.json / en.json     UI chrome (buttons, aria, journal filter labels)

public/
  images/  audio/  icons/  fonts/
```

---

## Locales

| Locale | Routes | Content format |
|--------|--------|----------------|
| Dutch (default) | `/`, `/journal`, `/about` | `"nl"` fields |
| English | `/en/*` | `"en"` fields |

Runtime translation is never used. All copy is written into files.

---

## Currently bar

**File:** `content/site/currently.json`

Each segment has localized labels/values, optional `href`, and a `type` (`link` or `soundtrack`).

- Location and project links: edit `href` in JSON — not in components
- Soundtrack: `public/audio/purple-skyline.mp3`; mobile-only playback (≤640px) via `config/site.config.ts`

---

## Homepage widgets

**Layout:** `content/site/homepage.json`

- Enable/disable widgets in `widgets.<id>.enabled`
- Reorder via `layout.desktop.columns` and `layout.mobileOrder`
- Widget copy in `content/site/widgets/*.json` and `socials.json`

No homepage code changes needed for content or layout tweaks.

---

## Journal

### Create article

1. Copy `content/journal/_example.md` → `content/journal/your-slug.md`
2. Set frontmatter: `title`, `date`, `category`, `published: true`
3. Write Dutch Markdown body
4. Optionally add English after `---en---` on its own line
5. Run `npm run validate:content`

### Required frontmatter

```yaml
---
title: Nederlandse titel
date: 2026-07-06
category: technology
published: true
---
```

### Optional frontmatter

`titleEn`, `excerpt`, `excerptEn`, `cover`, `tags`, `featured`, `draft`, `updatedDate`

### Categories

**File:** `content/journal/categories.json`

Add/edit/remove categories here. Filters and labels update automatically. Category key in frontmatter must match a defined category.

### Drafts

- `published: false`, or
- Filename prefix `_` (e.g. `_draft-post.md`)

### English visibility

English mode shows an article only if it has an English body after `---en---`. `titleEn` alone is not enough.

### Lifecycle (publishable content)

```text
Draft → Published → Archived → Trash → Permanent delete
```

| State | How |
|-------|-----|
| **Draft** | `published: false` in `content/journal/` |
| **Published** | `published: true` in `content/journal/` |
| **Archived** | Move file to `content/journal/_archived/` |
| **Trash** | Move file to `content/journal/_trash/` (hidden, restorable) |
| **Restore** | `git mv` back to `content/journal/` |
| **Permanent delete** | Delete file from `_trash/` |

See `content/contract.json` and [features/lifecycle.md](./features/lifecycle.md).

### Retire article (preferred over hard delete)

1. `git mv content/journal/{slug}.md content/journal/_trash/`
2. Update links in `content/site/currently.json` if needed
3. Run `npm run validate:content`

---

## Links & socials

**All outbound URLs:** `content/site/links.json`

Keys are referenced by widgets and the Currently bar. Do not duplicate URLs elsewhere.

Social widget labels/descriptions: `content/site/socials.json`

---

## Navigation & footer

| Area | File |
|------|------|
| Header nav | `content/site/navigation.json` |
| Footer copyright | `content/site/footer.json` |
| Site title/description | `content/site/branding.json` |

---

## About page

Full about copy: `content/site/widgets/about.json` (page sections + homepage card teaser).

---

## UI strings (messages/)

Use `messages/*.json` only for **interface chrome**:

- Button labels, aria text, pagination, search placeholders
- Journal filter UI labels that are not article content

Do **not** put Currently bar values, About paragraphs, or widget descriptions in messages — those belong in `content/site/`.

---

## Validation

```bash
npm run validate:content
```

Checks required files, journal categories/slugs, hrefKey references, homepage layout, and localization completeness (warnings).

Always run before pushing significant content changes.

---

## Local development

```bash
npm run dev
npm run validate:content
npm run build
```

**Cache note:** Do not run `npm run build` while `npm run dev` is active. If you see 500 errors or missing modules, restart dev after clearing `.next`:

```bash
fuser -k 3000/tcp 2>/dev/null
rm -rf .next node_modules/.cache
npm run dev
```

---

## Safety rules

- Never commit secrets or `.env` files
- Never infer precise private locations for the Currently bar without explicit confirmation
- Keep municipal references professional and non-campaign
- Do not auto-translate at runtime

---

## Quick reference

| Jesse asks to… | Edit |
|----------------|------|
| Update Currently bar | `content/site/currently.json` |
| Change homepage widgets | `content/site/homepage.json` + widget JSON |
| Publish journal post | `content/journal/{slug}.md` |
| Add category | `content/journal/categories.json` |
| Change social URL | `content/site/links.json` |
| Change nav labels | `content/site/navigation.json` |
| Change site title/SEO | `content/site/branding.json` |

Application code (`components/`, `app/`) should only change when explicitly requested or when adding a new feature type.
