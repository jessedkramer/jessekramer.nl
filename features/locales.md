# Feature: Locales

**Purpose:** Dutch (default) and English site modes.

## Content
- Visitor copy: `{ "nl": "...", "en": "..." }` in `content/site/*.json`
- UI chrome: `messages/nl.json`, `messages/en.json`

## Application
- `i18n/` — routing, navigation helpers
- `app/(nl)/` — Dutch routes
- `app/en/` — English routes
- `components/LanguageSwitcher.tsx`

## Rules
- Never auto-translate at runtime
- Journal English requires body after `---en---`
- UI chrome keys: language switcher, search placeholders, pagination, music controls

## AI edits
- Visitor text → `content/`
- Button/aria labels → `messages/` (both locales)
