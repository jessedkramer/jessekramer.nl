# Feature registry

Quick index for AI assistants and contributors.

| Feature | Doc | Content | Components |
|---------|-----|---------|------------|
| Currently Bar | [currently-bar.md](./currently-bar.md) | `content/site/currently.json` | `CurrentlyBar.tsx`, `CurrentlyBarClient.tsx` |
| Homepage widgets | [homepage-widgets.md](./homepage-widgets.md) | `content/site/homepage.json`, `widgets/` | `HomepageDashboard.tsx`, widget cards |
| About | [about.md](./about.md) | `content/site/widgets/about.json` | `AboutCard.tsx`, `about-page.tsx` |
| Socials | [socials.md](./socials.md) | `content/site/socials.json`, `links.json` | `SocialsCard.tsx` |
| Municipality | [municipality.md](./municipality.md) | `content/site/widgets/municipality.json` | `MunicipalityCard.tsx` |
| Journal | [journal.md](./journal.md) | `content/journal/`, `categories.json` | `JournalIndex.tsx`, `JournalCard.tsx` |
| Content lifecycle | [lifecycle.md](./lifecycle.md) | `_archived/`, `_trash/` | `lib/journal.ts` |
| SEO | [seo.md](./seo.md) | `branding.json` | `lib/seo/`, `sitemap.ts`, `robots.ts` |
| Navigation & footer | [navigation-footer.md](./navigation-footer.md) | `navigation.json`, `footer.json` | `SiteHeader.tsx`, `Footer.tsx` |
| Branding | [branding.md](./branding.md) | `content/site/branding.json` | `LocaleDocument.tsx`, `SiteHeader.tsx` |
| Locales | [locales.md](./locales.md) | `messages/`, `i18n/` | `LanguageSwitcher.tsx` |
| Content validation | [validation.md](./validation.md) | — | `scripts/validate-content.mjs` |

**Default:** edit content files only. See [AGENTS.md](../AGENTS.md) for edit boundaries.
