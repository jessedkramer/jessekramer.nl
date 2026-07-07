# Feature: Journal

**Purpose:** File-based editorial content with bilingual support.

## Content
- `content/journal/*.md` — articles
- `content/journal/categories.json` — category definitions

## Application
- `lib/journal.ts` — parser and loaders
- `lib/markdown.ts` — lightweight renderer
- `components/JournalIndex.tsx`, `JournalCard.tsx`
- `app/_views/journal-*-page.tsx`

## AI edits
- Add/edit/delete markdown files
- Update categories in `categories.json` (labels auto-propagate to filters)
- Set `published: false` for drafts

## Extended frontmatter (optional)
`titleEn`, `excerpt`, `excerptEn`, `cover`, `tags`, `featured`, `draft`, `updatedDate`

## Related code
- `lib/journal/categories.ts` — category labels from JSON
- `lib/journal-display.ts` — locale-aware title/excerpt/body
- `lib/markdown.ts` — lightweight body renderer
- `config/site.config.ts` → `journal.postsPerPage`
