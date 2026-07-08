# About jessekramer.nl

## What this is

**jessekramer.nl** is the personal website of Jesse Kramer — and the **reference implementation** of an AI-native, GitHub-based, file-based content system.

This is not “a website built by AI.” It is a deliberate architectural experiment: a personal site where **GitHub is the source of truth**, **Vercel is the deployment layer**, and **AI assistants act as the content manager** — without a traditional CMS, database, or admin panel.

## Why it exists

Most personal sites depend on a CMS backend, a visual editor, or manual code edits for every text change. That creates friction between *what you want to say* and *how the site is maintained*.

jessekramer.nl inverts that model:

- **Content lives in plain files** (`content/`, `content/journal/`) that humans and AI can read and edit directly.
- **The application is the rendering layer** — stable Next.js code that turns files into pages.
- **Changes flow through Git** — reviewable, versioned, restorable.
- **Deployment is automatic** — push to GitHub, Vercel publishes.

The goal is a calm, identity-driven digital presence that stays maintainable as content grows — for Jesse, and as a pattern others can study or adapt.

## Design philosophy

- **Simplicity over complexity** — no database, no admin UI, no over-abstraction.
- **GitHub as source of truth** — if it is not in the repository, it is not on the site.
- **AI-native by default** — the repo explains itself to assistants via `AGENTS.md`, `content/manifest.json`, and `content/contract.json`.
- **Separation of concerns** — visitor copy in `content/`, UI chrome in `messages/`, behavior in `config/`, rendering in `app/`.
- **Atmosphere matters** — synthwave-influenced visual identity, liquid glass surfaces, responsive layouts that feel intentional rather than generic.

## How humans and AI collaborate

| Role | Responsibility |
|------|----------------|
| **Jesse Kramer** | Vision, content decisions, approval of public-facing changes (especially Currently bar location/status) |
| **AI assistants** (Cursor, ChatGPT, Grok, Copilot, etc.) | Edit content files, validate, propose structure, implement application changes when asked |
| **GitHub** | Version history, review, source of truth |
| **Vercel** | Build and deploy |

Typical workflow: describe a content change → AI edits `content/` → `npm run validate:content` → commit → Vercel deploys.

## Long-term vision

Replace traditional CMS backends with **AI-managed content workflows** while keeping the frontend stable. jessekramer.nl proves that model at personal scale. Future features (portfolio, projects, newsletters) should follow the same pattern: files in `content/`, loaders in `lib/`, routes in `app/`.

Planned platform concepts (not yet implemented): draft/review/publish pipelines, AI audit logs, rollback helpers, permission boundaries. Git history already provides audit and rollback today.

## Credits

| Area | Credit |
|------|--------|
| **Concept & vision** | Jesse Kramer |
| **Architecture** | Jesse Kramer, iteratively refined with AI assistants |
| **Development** | Cursor |
| **AI collaboration** | ChatGPT, Grok, Claude, Gemini, GitHub Copilot |
| **Deployment** | GitHub + Vercel |

The AI-native CMS philosophy and architectural direction were initiated by Jesse Kramer and refined through ongoing collaboration with AI tools — not generated as a one-shot output.

## Learn more

- [`AGENTS.md`](./AGENTS.md) — AI assistant entry point
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — system design
- [`CONTENT.md`](./CONTENT.md) — content operations
- [`content/manifest.json`](./content/manifest.json) — machine-readable registry
- [`content/contract.json`](./content/contract.json) — content contract
