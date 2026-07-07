# Feature: Currently Bar

**Purpose:** Live status strip (location, soundtrack on mobile, current activity).

## Content
- `content/site/currently.json` — all segments, labels, values, URLs

## Config
- `config/site.config.ts` → `audio` — mobile max width, volume, file path, storage key

## Application
- `components/CurrentlyBar.tsx` — server wrapper
- `components/CurrentlyBarClient.tsx` — client audio controls
- `lib/purple-skyline-player.ts` — mobile-only playback
- `lib/audio.ts` — audio constants from config

## AI edits
Update `currently.json` only. Do not hardcode URLs or copy in components.

## Segment types
- `link` — pill with icon, localized value, `href` (set `external: true` or `internal: true`)
- `soundtrack` — mobile-only music toggle (`mobileOnly: true`)

## Safety
Only update location/status when Jesse explicitly confirms. Keep all text public-safe.
