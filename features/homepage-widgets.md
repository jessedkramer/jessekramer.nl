# Feature: Homepage Widgets

**Purpose:** Configurable dashboard on the homepage.

## Content
- `content/site/homepage.json` — layout columns, widget enable/order
- `content/site/widgets/about.json`
- `content/site/widgets/municipality.json`
- `content/site/widgets/journal.json`
- `content/site/socials.json`

## Application
- `components/HomepageDashboard.tsx` — renders layout from JSON
- Widget components: `AboutCard`, `SocialsCard`, `JournalCard`, `MunicipalityCard`

## AI edits
1. Edit widget content JSON for copy
2. Edit `homepage.json` to enable/disable/reorder widgets
3. Do not edit `home-page.tsx` for content changes

## Layout model
Desktop uses three columns (`left`, `center`, `right`) from `layout.desktop.columns`.

`layout.mobileOrder` documents the intended mobile stack order and is validated against enabled widgets. CSS in `app/globals.css` mirrors this order.
