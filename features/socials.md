# Feature: Socials widget

**Purpose:** Social links and LinkedIn professional block on the homepage.

## Content
- `content/site/socials.json` — titles, labels, link definitions
- `content/site/links.json` — actual URLs (`hrefKey` references)

## Application
- `components/SocialsCard.tsx`

## AI edits
1. Change URLs in `links.json`
2. Change labels/descriptions in `socials.json`
3. Use `showInList: false` on a link to hide it from the left list (LinkedIn uses the right block)
