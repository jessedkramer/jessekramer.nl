# Feature: Content validation

**Purpose:** Catch content errors before deploy.

## Script
- `scripts/validate-content.mjs`
- Run: `npm run validate:content`

## Checks
- Required JSON files exist and parse
- Journal categories and slugs (no duplicates, valid keys)
- `hrefKey` references in nav, socials, municipality
- Homepage widget layout consistency
- Currently bar href validity
- Missing `nl`/`en` pairs (warnings)

## AI workflow
Run after every significant content edit. Fix all errors before pushing.
