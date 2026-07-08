# Architecture Report — AI-native CMS 2.0

**Date:** July 2026  
**Repository:** jessekramer.nl  
**Status:** Reference implementation, production-ready foundation

---

## Executive summary

jessekramer.nl now implements a **complete v2.0 foundation** for an AI-native, GitHub-based, file-based CMS. The application layer is stable; content is registry-driven; validation, SEO, and journal lifecycle are documented and enforced. Future CMS platform features (review queues, AI audit logs, permissions) are **prepared in documentation** but not implemented — by design.

**Is the architectural foundation complete?**

**Yes — for v1/v2 reference scope.** The repo can serve as a template for AI-managed personal publishing. Gaps are intentional roadmap items (review workflow, audit UI, widget registry in code), not blocking structural flaws.

---

## Architectural decisions

| Decision | Rationale |
|----------|-----------|
| **GitHub as source of truth** | Versioning, review, rollback without new infrastructure |
| **File-based content** | AI-readable, diff-friendly, no DB migration |
| **Registry + contract** (`manifest.json`, `contract.json`) | AI finds paths and rules without scanning the repo |
| **Journal lifecycle via folders** | `_archived/`, `_trash/` enable bulk git operations and clear visibility |
| **Backward-compatible `published:` field** | Existing articles unchanged; `status:` optional |
| **SEO in `lib/seo/metadata.ts`** | Single helper for canonical, OG, Twitter, hreflang |
| **Validator reads manifest** | Single required-file list; extensible utils in `scripts/lib/` |
| **Parallel locale routes** | Kept to avoid route breakage; consolidation deferred |
| **Configuration stays directly editable** | Widgets, branding, nav — no lifecycle wrapper |

### Rejected alternatives

| Alternative | Why rejected |
|-------------|--------------|
| Database / headless CMS | Violates simplicity; adds ops burden |
| Full `status`-only lifecycle (no folders) | Harder for AI bulk archive/trash/restore |
| Machine-readable widget registry in JSON only | Widgets still need React components; JSON-only would lie about capability |
| Implementing review/audit/permissions now | Over-engineering; Git history suffices for v2.0 |
| Unified `app/[locale]/` migration | High risk, low immediate value |

---

## AI improvements

- **`content/manifest.json`** — paths, content types, AI entry points, journal operations list
- **`content/contract.json`** — schema, lifecycle rules, future roadmap hooks
- **`getJournalInventory()`** — programmatic inventory for assistants (all lifecycle states)
- **AGENTS.md** — capability matrix, registry-first workflow, lifecycle docs
- **Validator warnings** — SEO, links, images, privacy patterns, lifecycle mismatches

---

## Content management improvements

| Capability | Implementation |
|------------|----------------|
| Publish | `content/journal/{slug}.md` + `published: true` |
| Draft | `published: false` or `status: draft` |
| Archive | Move to `content/journal/_archived/` |
| Trash | Move to `content/journal/_trash/` |
| Restore | `git mv` back to `content/journal/` |
| Permanent delete | Remove file from `_trash/` |
| Bulk ops | Folder-based + manifest paths (no full-repo scan) |

Configuration (widgets, branding, nav, footer, currently) remains directly editable — no lifecycle gate.

---

## Maintainability improvements

- Validator uses manifest for required files (no duplicated hardcoded list in practice)
- `REQUIRED_SITE_FILE_PATHS` exported from `lib/content/paths.ts` for TypeScript consumers
- Expanded `.gitignore` for env files and logs
- Secret scan: no credentials found in tracked files
- SEO centralized; sitemap/robots auto-generated
- `ABOUT.md` for humans; `AGENTS.md` for AI — clear audience split

---

## Future extensibility

Documented in `content/contract.json` and `features/lifecycle.md`:

- Review state, hidden state
- AI audit log, version history UI, rollback helpers
- AI permissions, publication history

Extension pattern unchanged: `content/<feature>/` + `lib/` loader + `app/` route + `features/` doc.

---

## Scores (0–10)

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Architecture** | 9 | Clear layers, registry, lifecycle; parallel locale trees are minor debt |
| **AI friendliness** | 9 | manifest, contract, AGENTS, inventory API; widget map still in code |
| **Maintainability** | 9 | Validation, docs, single SEO layer; CI not yet automated |
| **Scalability** | 8 | Fine for personal scale; journal folder scan OK at hundreds of posts |
| **Documentation** | 9 | Comprehensive; keep in sync as features grow |
| **Future readiness** | 8 | Roadmap documented; platform features not built |

**Overall:** **8.7 / 10** — strong reference foundation.

---

## Recommendations (1–3 years)

Focus on **content and features**, not architectural rewrites:

1. **Content** — Replace placeholder about copy; finish draft articles; add English bodies where missing
2. **Features** — Portfolio/projects, reading list, or newsletter (follow extension pattern)
3. **CI** — GitHub Action: `validate:content` + `build` on PR
4. **Media** — Optional `content/media/manifest.json` if asset count grows
5. **Lifecycle UI** — Only if non-technical collaborators need it; otherwise Git + AI suffices

Avoid unless justified: database, admin panel, `[locale]` migration, widget system rewrite.

---

## Validation

```bash
npm run validate:content   # passed (with expected draft warnings)
npm run build              # passed — includes /sitemap.xml, /robots.txt
```

---

## Credits

Concept & vision — Jesse Kramer. Architecture — Jesse Kramer, iteratively refined with AI assistants. Development — Cursor. AI collaboration — ChatGPT, Grok, Claude, Gemini. Deployment — GitHub + Vercel.
