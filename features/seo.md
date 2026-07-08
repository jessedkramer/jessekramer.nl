# SEO & discoverability

## Overview

SEO is generated from content and shared helpers — not hardcoded in components.

## Source files

| File | Purpose |
|------|---------|
| `content/site/branding.json` | `siteUrl`, default title/description, `ogImage`, Twitter card |
| `lib/seo/metadata.ts` | `buildPageMetadata()`, canonical + alternates |
| `app/sitemap.ts` | Auto-generated sitemap (nl + en) |
| `app/robots.ts` | Robots.txt with sitemap reference |

## Per-page metadata

| Page | Generator |
|------|-----------|
| Home | `createLocaleMetadata()` in locale layouts |
| About | `aboutMetadata()` |
| Journal index | `journalIndexMetadata()` |
| Journal article | `journalArticleMetadata()` — uses `cover` if set |

## Locale alternates

Dutch routes: `/`, `/about`, `/journal/...`  
English routes: `/en`, `/en/about`, `/en/journal/...`

Hreflang alternates are included in metadata and sitemap entries.

## Validation

Validator warns when:

- `metadata.siteUrl` or `ogImage` missing
- SEO description incomplete
- Referenced ogImage file missing on disk

## Domains

Canonical: `https://jessekramer.nl`.  
`www.jessekramer.nl` redirects via `next.config.ts`.
