# Feature: Branding

**Purpose:** Site identity, logo reference, default metadata, footer tagline.

## Content
- `content/site/branding.json` — name, tagline, metadata templates
- `public/images/logo.png` — logo asset

## Application
- `components/locale/LocaleDocument.tsx` — `<title>` and meta tags
- `components/SiteHeader.tsx` — wordmark
- `components/Footer.tsx` — tagline with highlight

## Assets not in branding.json
- Background image: hardcoded in `app/globals.css` → `.world` (`/images/background.png`)

## AI edits
Replace logo in `public/images/` and update branding JSON. No component changes needed.

**Footer slogan:** always rendered in English (`Finding beauty in the digital world.`), regardless of locale. Dutch tagline in `branding.json` is used elsewhere if needed in future.
