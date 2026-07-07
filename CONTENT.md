# CONTENT.md — AI-CMS manual for jessekramer.nl

This file is the **complete content operations manual** for jessekramer.nl.

There is no traditional CMS or admin dashboard. **The AI is the CMS.**  
ChatGPT, Grok, Cursor, or any future assistant connected to GitHub/Vercel should maintain the public website by editing Markdown, JSON, and a small number of config/component files in this repository.

**Read this file first before making content changes.**

---

## Core philosophy

```text
Jesse describes a change
        ↓
AI edits files in GitHub
        ↓
Vercel deploys
        ↓
jessekramer.nl updates
```

- GitHub is the source of truth for public content.
- Vercel publishes the site automatically on push.
- Jesse keeps vision, taste, and final approval.
- AI handles writing, editing, translating, and file maintenance.
- Never auto-translate at runtime. All translations are written into files manually or by an AI assistant.

---

## Language rules

| Rule | Detail |
|------|--------|
| Default language | **Dutch (`nl`)** — routes like `/`, `/journal`, `/about` |
| Secondary language | **English (`en`)** — routes prefixed with `/en` |
| Dutch content | **Required** for every journal article |
| English content | **Optional** |
| Dutch-only article | Visible in Dutch mode only |
| Dutch + English article | Visible in both modes (English requires an English **body**) |
| Runtime translation | **Never** — no automatic translation APIs at build or runtime |
| UI strings | Stored in `messages/nl.json` and `messages/en.json` via [next-intl](https://next-intl.dev/) |

### How English visibility works (journal)

Implemented in `lib/journal.ts`:

- **Dutch mode:** all published articles appear.
- **English mode:** an article appears **only if it has an English body** after the `---en---` delimiter.
- `titleEn` / `excerptEn` alone are **not enough** for English mode visibility.
- On an English article page, `titleEn`, `excerptEn`, and the English body are used when present; otherwise Dutch fields fall back.

Localization logic lives in `lib/journal-display.ts`.

---

## Repository map

```text
jessekramer.nl/
├── CONTENT.md              ← You are here (AI-CMS manual)
├── ARCHITECTURE.md         ← Design & product architecture
├── README.md               ← Developer quick start
├── app/                    ← Next.js App Router pages & layout
│   ├── globals.css         ← Visual design tokens & styles
│   └── [locale]/           ← Localized routes (nl default, en prefixed)
├── components/             ← React UI components
├── content/
│   └── journal/            ← Journal articles (Markdown)
├── i18n/                   ← Locale routing & navigation helpers
├── lib/                    ← Journal parser, links, audio, markdown renderer
├── messages/
│   ├── nl.json             ← Dutch UI copy (default)
│   └── en.json             ← English UI copy
├── public/                 ← Static assets (images, audio, icons, fonts)
└── types/                  ← TypeScript types (journal categories, etc.)
```

### Folder purposes

| Path | Purpose |
|------|---------|
| `content/journal/` | Published journal articles as Markdown files |
| `messages/*.json` | All translatable UI copy (header, footer, about, currently bar, journal page labels, categories) |
| `lib/links.ts` | Public outbound URLs (X, GitHub, LinkedIn, email, Steam, municipality) |
| `lib/audio.ts` | Soundtrack file path and localStorage key for the Currently music pill |
| `public/images/` | Background, logo, hero assets |
| `public/audio/` | Soundtrack MP3 for the Currently bar |
| `public/icons/` | Icon assets |
| `public/fonts/` | Font files (if self-hosted) |
| `components/CurrentlyBar.tsx` | Currently bar layout **and contextual link targets** |
| `app/[locale]/about/page.tsx` | About page shell (copy comes from messages) |

---

## Design philosophy (public direction)

When writing or editing content, preserve this identity:

- Modern personal website — **not** a corporate portfolio
- **AI Native** — content lives in Git, AI maintains it
- Space-inspired, **Purple Dream**, Vice City atmosphere
- SpaceX / X.com-inspired clarity
- Minimal, elegant, premium
- **Liquid glass UI** — translucent widgets over a cosmic background
- Personal, technology-first, calm editorial tone

**Canonical slogan (always English in the footer):**

> Finding beauty in the digital world.

The footer renders the English slogan even in Dutch mode (`components/Footer.tsx`).

---

## Journal — complete reference

### Folder structure

```text
content/journal/
├── .gitkeep
├── _example.md                 ← Template (ignored by site; starts with _)
├── jessekramer-nl-bouwen.md    ← Published example (NL + EN)
├── lokaal-nieuws-belang.md     ← Published example (Dutch only)
└── …                           ← One file per article
```

### Filename & slug rules

- One article = one file: `my-article-slug.md` (or `.mdx` when supported).
- **Slug** = filename without extension → URL `/journal/my-article-slug`.
- Use lowercase, hyphens, no spaces: `open-data-transparantie.md` ✓
- Files starting with `_` are **ignored** (use for templates/drafts).
- Do not duplicate slugs.

### Required frontmatter

Every **published** article must include:

```yaml
---
title: Nederlandse titel
date: 2026-07-06
category: technology
published: true
---
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Dutch title (always shown in Dutch mode) |
| `date` | Yes | ISO date `YYYY-MM-DD`; controls sort order (newest first) |
| `category` | Yes | Must be a valid category key (see below) |
| `published` | Yes | Must be exactly `published: true` to appear on the site |

### Optional frontmatter

```yaml
titleEn: English title
excerpt: Korte Nederlandse samenvatting
excerptEn: Short English summary
cover: /images/journal/my-cover.png   # parsed but not rendered in UI yet
```

### Valid categories

Category **keys** (used in frontmatter) → **labels** (shown in UI via `messages/*/journalCategories`):

| Key | Dutch label | English label |
|-----|-------------|---------------|
| `design` | Design | Design |
| `gaming` | Gaming | Gaming |
| `personal` | Persoonlijk | Personal |
| `politics` | Politiek | Politics |
| `travel` | Reizen | Travel |
| `technology` | Technologie | Technology |

Filter chips on `/journal` are ordered alphabetically by Dutch label, with **Alles / All** always first.

Defined in `types/journal.ts` (`ORDERED_JOURNAL_CATEGORIES`).

### Published vs draft

| State | How |
|-------|-----|
| **Published** | `published: true` + valid required fields + valid category |
| **Draft / ignored** | `published: false`, or missing required fields, or invalid category, or filename starts with `_` |

Drafts never appear on the homepage widget, journal index, or article routes.

### Article body structure

**Dutch body** — Markdown immediately after the closing `---` of frontmatter.

**English body (optional)** — after a line containing exactly:

```text
---en---
```

The delimiter must be on its own line: `\n---en---\n` (see `lib/journal.ts` → `EN_CONTENT_DELIMITER`).

### Supported Markdown (journal body)

Lightweight renderer in `lib/markdown.ts`:

- `## Heading` → `<h2>`
- `# Heading` → `<h1>`
- `**bold**`, `*italic*`
- `[link text](https://url)`
- Blank line = new paragraph

No code blocks, tables, or images in the renderer yet. Keep articles simple.

### Pagination

- **10 articles per page** on `/journal` (`lib/journal-constants.ts` → `JOURNAL_POSTS_PER_PAGE`).
- Search and category filters run client-side; URL query params (`?q=`, `?category=`, `?page=`) sync via `history.replaceState`.

---

## Journal examples

### Example A — Dutch-only article

File: `content/journal/lokaal-nieuws-belang.md`

```markdown
---
title: Waarom lokaal nieuws nog steeds telt
date: 2026-06-15
category: politics
excerpt: Over gemeenschapsinformatie, vertrouwen en context die landelijke feeds missen.
published: true
---

Lokale context is moeilijk te vervangen door landelijke koppen of algoritmische feeds.
```

- Visible in **Dutch mode** ✓
- Hidden in **English mode** ✗ (no `---en---` body)
- Homepage widget (NL): ✓ | Homepage widget (EN): ✗

### Example B — Dutch + English article

File: `content/journal/jessekramer-nl-bouwen.md`

```markdown
---
title: jessekramer.nl bouwen
titleEn: Building jessekramer.nl
date: 2026-07-06
category: technology
excerpt: Een eerste blik op het herbouwen van mijn persoonlijke site met Next.js, glasachtige UI en een file-based journal.
excerptEn: A first look at rebuilding my personal site with Next.js, glass UI, and a file-based journal.
published: true
---

Dit is het Nederlandse artikel. Schrijf in Markdown.

## Een tussenkop

Meer tekst hier.

---en---

This is the English article body. Write manually — never auto-translate at runtime.

## A subheading

More text here.
```

- Visible in **both** Dutch and English modes ✓
- English page uses `titleEn`, `excerptEn`, and English body when locale is `en`

### Template file

Copy `content/journal/_example.md` when creating a new article. It is ignored by the parser (`published: false` and `_` prefix).

---

## Journal workflows

### Create a new article

1. Copy `content/journal/_example.md` → `content/journal/your-slug.md`
2. Set required frontmatter (`title`, `date`, `category`, `published: true`)
3. Write the **Dutch body** in Markdown
4. Optionally add `titleEn`, `excerptEn`, and an English body after `---en---`
5. Run `npm run build` to verify
6. Commit and push → Vercel deploys

### Edit an article

1. Open `content/journal/{slug}.md`
2. Edit frontmatter and/or body
3. Preserve the `---en---` delimiter if bilingual
4. Run `npm run build`
5. Commit and push

### Translate an article to English

1. Open the existing Dutch article file (do **not** create a separate English file)
2. Add optional `titleEn` and `excerptEn` to frontmatter
3. Append English body after `---en---` on its own line
4. Write natural English — do not rely on runtime translation
5. Verify the article appears at `/en/journal/{slug}` after deploy

### Publish an article

Set `published: true` and ensure all required fields are valid.

### Unpublish an article

Either:

- Set `published: false`, **or**
- Rename to start with `_` (e.g. `_draft-my-post.md`)

The file remains in the repo but disappears from the public site.

### Delete an article safely

1. Confirm Jesse wants it removed
2. Delete `content/journal/{slug}.md`
3. Search the repo for links to `/journal/{slug}` (e.g. `components/CurrentlyBar.tsx`) and update or remove them
4. Run `npm run build`
5. Commit with a clear message

**Do not** delete `_example.md` or `.gitkeep`.

---

## Files that control the journal

| File | Role |
|------|------|
| `content/journal/*.md` | Article content (source of truth) |
| `lib/journal.ts` | Parser, publish filter, locale visibility |
| `lib/journal-display.ts` | Title/excerpt/body localization |
| `lib/journal-categories.ts` | Category label helper |
| `lib/journal-constants.ts` | Posts per page (10) |
| `lib/markdown.ts` | Markdown → HTML renderer |
| `types/journal.ts` | Category keys and types |
| `messages/nl.json` → `journalPage`, `journalCategories`, `journalCard` | Dutch journal UI copy |
| `messages/en.json` → `journalPage`, `journalCategories`, `journalCard` | English journal UI copy |
| `components/JournalIndex.tsx` | Search, filters, pagination (client UI) |
| `components/JournalCard.tsx` | Homepage journal widget (latest 3 posts) |
| `app/[locale]/journal/page.tsx` | Journal index page |
| `app/[locale]/journal/[slug]/page.tsx` | Individual article page |

---

## Currently bar

The **Currently bar** appears on the homepage below the header. It has three pills:

1. **Location** (📍)
2. **Music / Soundtrack** (🎵) — play/pause Purple Skyline
3. **Current project / status** (✨)

### Where to edit

| What | File(s) |
|------|---------|
| Label text (Locatie, Nu aan het spelen, Huidig project, etc.) | `messages/nl.json` → `currently` |
| English label text | `messages/en.json` → `currently` |
| Location display value | `messages/nl.json` → `currently.locationValue` |
| English location value | `messages/en.json` → `currently.locationValue` |
| Track title | `messages/*/currently.trackTitle` |
| Project/status display value | `messages/*/currently.projectValue` |
| **Location link URL** | `components/CurrentlyBar.tsx` — first pill `href` |
| **Project link URL** | `components/CurrentlyBar.tsx` — third pill `Link href` |
| Soundtrack audio file | `public/audio/purple-skyline.mp3` |
| Soundtrack path constant | `lib/audio.ts` → `PURPLE_SKYLINE_SRC` |

Music playback state is stored in the visitor's browser (`localStorage` key in `lib/audio.ts`). Do not commit user localStorage data.

### Field reference

| Pill | Message keys | Link edited in |
|------|--------------|----------------|
| Location | `locationLabel`, `locationValue` | `CurrentlyBar.tsx` → location `<a href="…">` |
| Music | `nowPlayingLabel`, `soundtrackLabel`, `trackTitle`, `playMusic`, `pauseMusic` | Audio file in `public/audio/`; labels in messages |
| Project / status | `projectLabel`, `projectValue` | `CurrentlyBar.tsx` → project `<Link href="…">` |

### Smart contextual links

When Jesse asks to update the Currently bar, choose links deliberately:

**Example 1 — Jesse is in Hamburg**

- Update `currently.locationValue` in **both** `messages/nl.json` and `messages/en.json`  
  - NL: `Hamburg, Duitsland`  
  - EN: `Hamburg, Germany`
- Update location `href` in `components/CurrentlyBar.tsx` to a public reference, e.g. `https://en.wikipedia.org/wiki/Hamburg`

**Example 2 — Jesse is working on an IT project**

- Update `currently.projectValue` in both message files
- Link priority for the project pill:
  1. Related journal post if one exists → `/journal/{slug}`
  2. Relevant public GitHub repo → `lib/links.ts` github URL or a specific repo URL
  3. Leave unlinked (use `#` or remove link — today the pill is always a `Link`; use the most relevant public URL Jesse confirms)

**Example 3 — Jesse is relaxing at the beach**

- Update `projectValue` / status text to reflect the mood (e.g. "Ontspannen aan het strand")
- Only link to an X post if Jesse **explicitly provides** a public post URL
- Do not invent social links

### Currently safety rules

- **Never** infer sensitive or precise locations without Jesse explicitly stating them.
- **Never** monitor, track, or guess Jesse's location automatically.
- **Only** update Currently when Jesse asks, states, or clearly confirms a change.
- Keep all Currently text **public-safe** — suitable for anyone on the internet.
- Do not link to private repos, private docs, or non-public content.
- Do not expose private strategy, draft posts, or personal data of other people.

---

## About page & homepage About card

| Content | File |
|---------|------|
| Full About page (6 paragraphs) | `messages/nl.json` → `aboutPage` |
| English About page | `messages/en.json` → `aboutPage` |
| Homepage About card (short) | `messages/nl.json` → `aboutCard` |
| English About card | `messages/en.json` → `aboutCard` |
| Page layout | `app/[locale]/about/page.tsx` |
| Homepage card component | `components/AboutCard.tsx` |

When updating About content:

1. Edit Dutch in `messages/nl.json`
2. Edit English in `messages/en.json`
3. Keep tone personal, professional, and consistent with Jesse's public identity
4. Do not add private biographical details Jesse has not approved

---

## Other public copy (messages/*.json)

Most visible strings live in `messages/nl.json` and `messages/en.json`:

| Namespace | Used for |
|-----------|----------|
| `metadata` | SEO titles & descriptions |
| `header` | Navigation labels |
| `footer` | Copyright (locale-aware); slogan is always English |
| `currently` | Currently bar |
| `aboutPage` / `aboutCard` | About content |
| `journalPage` / `journalCard` / `journalCategories` | Journal UI |
| `socialsCard` / `socialLabels` | Socials widget |
| `municipalityCard` | Municipal council widget |
| `xCard` / `xEmbed` | Live from X widget |
| `language` | Language switcher labels |

**Outbound URLs** (X, GitHub, LinkedIn, email, Steam, municipality) are centralized in `lib/links.ts`. Update there instead of hardcoding duplicates in components.

---

## Translation handling (site UI)

- **Default locale:** `nl` (`i18n/routing.ts`)
- **English routes:** prefixed with `/en` (`localePrefix: "as-needed"`)
- Dutch JSON: `messages/nl.json`
- English JSON: `messages/en.json`

When adding or changing UI copy:

1. Update **both** JSON files unless the string is intentionally Dutch-only or English-only (footer slogan is always English).
2. Keep JSON valid (trailing commas are not allowed).
3. Preserve existing key names — components reference them via `useTranslations("namespace")`.

---

## Images & assets

| Asset type | Location | Reference in code |
|------------|----------|-------------------|
| Background | `public/images/background.png` | `app/globals.css` → `.world` |
| Logo | `public/images/logo.png` | Header component |
| Hero assets | `public/images/hero/` | As needed |
| Journal cover (future) | `public/images/` | Frontmatter `cover` (not rendered yet) |
| Soundtrack | `public/audio/purple-skyline.mp3` | `lib/audio.ts` |
| Icons | `public/icons/` | `/icons/...` |
| Fonts | `public/fonts/` | `/fonts/...` |

Rules:

- Use root-relative paths: `/images/photo.png`
- Optimize images before committing large files
- Never commit secrets, `.env` files, or private brain-repository material

---

## Future pages

New public pages should follow existing conventions:

- Route under `app/[locale]/…`
- Copy in `messages/nl.json` and `messages/en.json`
- Reuse liquid glass components and `globals.css` tokens
- Document new content locations in this file when added

---

## Safety & privacy rules

**Never commit or publish:**

- API keys, passwords, tokens, or secrets
- Private notes, strategy, or content meant for a future private `jessekramer-brain` repo
- Personal data of other people without consent
- Precise private locations Jesse did not explicitly approve
- Draft journal content Jesse has not approved (`published: false` is for repo-only drafts)

**Always:**

- Keep municipal / public-role references professional and non-campaign
- Prefer official public links (Wikipedia, official profiles, public GitHub)
- Ask or infer only from explicit Jesse instructions for Currently bar and personal status
- Run `npm run build` before pushing when possible

---

## Using AI as the CMS

When acting as the CMS for jessekramer.nl:

1. **Read `CONTENT.md` first** (this file).
2. **Understand repository conventions** — do not invent new architectures.
3. **Modify only necessary files** for the requested change.
4. **Preserve formatting** — frontmatter, delimiters, JSON structure, Markdown style.
5. **Never invent new file structures** unless Jesse explicitly requests an architectural change.
6. **Never duplicate existing content** (one article = one file; one URL in `lib/links.ts`).
7. **Keep Git history clean** — focused commits with clear messages when Jesse asks for commits.
8. **Never break multilingual support** — update both `messages/nl.json` and `messages/en.json` for UI copy; follow journal `---en---` rules for articles.
9. **Never touch unrelated files** — no drive-by refactors.
10. **Run `npm run build`** after edits when possible and fix errors before finishing.

### Quick decision guide

| Jesse asks to… | Edit |
|----------------|------|
| Write / publish a journal post | `content/journal/{slug}.md` |
| Translate a journal post | Same file — add `titleEn`, `excerptEn`, body after `---en---` |
| Unpublish a post | `published: false` or rename to `_…` |
| Change Currently location/text | `messages/nl.json` + `messages/en.json` → `currently`; links in `CurrentlyBar.tsx` |
| Change Currently project | `currently.projectValue` + project `Link href` in `CurrentlyBar.tsx` |
| Change soundtrack title | `currently.trackTitle` in both message files |
| Replace soundtrack file | `public/audio/…` + optionally `lib/audio.ts` |
| Update About page | `aboutPage` in both message files |
| Update homepage About teaser | `aboutCard` in both message files |
| Change social URLs | `lib/links.ts` |
| Change journal page intro | `journalPage.lead` in both message files |
| Change site nav / footer labels | Respective namespaces in message files |

---

## Local verification

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production check — run after content changes
```

**Note:** Do not run `npm run build` while `npm run dev` is active on the same machine without restarting dev afterward — mixed `.next` cache can cause 500 errors. After a production build, restart dev:

```bash
fuser -k 3000/tcp 3001/tcp
rm -rf .next node_modules/.cache
npm run dev
```

---

## Related documentation

- `ARCHITECTURE.md` — product vision, homepage structure, design principles
- `.cursor/rules/content-and-assets.mdc` — Cursor-specific content rules
- `content/journal/_example.md` — copy-paste article template

---

*Last aligned with codebase: journal parser v2 (single-file bilingual), next-intl nl/en, Currently bar via messages + CurrentlyBar.tsx.*
