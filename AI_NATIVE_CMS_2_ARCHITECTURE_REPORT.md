# AI-native CMS 2.0 — Architecture Report

This report documents the current AI-native CMS 2.0 architecture state of `jessekramer.nl`.

## Summary

The repository now implements the core foundation of an AI-native, GitHub-based, file-based CMS.

The architecture follows these principles:

- GitHub is the Source of Truth.
- Vercel is the deployment layer.
- Content is file-based.
- AI assistants act as content managers.
- The application remains the rendering layer.
- No database, admin panel, or traditional CMS backend is required.

## Implemented architectural foundations

### 1. Human-facing project explanation

`ABOUT.md` explains the project for humans visiting the public GitHub repository. It describes what the project is, why it exists, how humans and AI collaborate, and credits Jesse Kramer as the originator of the concept and architectural vision.

### 2. AI assistant entry point

`AGENTS.md` acts as the primary onboarding document for AI assistants. It documents:

- repository philosophy;
- edit boundaries;
- registry-first workflow;
- content lifecycle;
- validation;
- deployment;
- common CMS tasks;
- AI Capability Matrix.

### 3. Machine-readable registry

`content/manifest.json` provides a registry for AI assistants and validation tooling. It identifies:

- source of truth;
- deployment platform;
- supported locales;
- required content files;
- content types;
- lifecycle behavior;
- AI entry points.

This reduces repository scanning and gives future AI assistants a direct map of the content layer.

### 4. Content contract

`content/contract.json` describes the content model. It defines:

- publishable content types;
- journal article storage;
- required and optional frontmatter;
- localization model;
- visibility rules;
- configuration content types;
- validation entry points.

This acts as the CMS contract between content, validation, and AI assistants.

### 5. Content lifecycle

Publishable content uses a lifecycle model:

```text
Draft → Published → Archived → Trash → Permanent Delete
```

The lifecycle currently applies to Journal articles. Configuration content such as widgets, navigation, branding, footer, Currently, and site config remains directly editable.

This keeps the system simple while giving publishable content safe archive/trash behavior.

### 6. Journal architecture

The Journal is structured so AI assistants can:

- publish articles;
- draft articles;
- archive articles;
- move articles to Trash;
- restore articles;
- edit metadata;
- change categories;
- perform bulk operations.

Lifecycle folders `_archived/` and `_trash/` make content state visible through the filesystem.

### 7. Validation

`scripts/validate-content.mjs` implements v2.0 validation and checks:

- manifest-required files;
- duplicate journal category IDs;
- duplicate slugs across lifecycle folders;
- unknown category references;
- lifecycle mismatch warnings;
- hrefKey references;
- homepage widget layout consistency;
- Currently bar href validity;
- SEO metadata warnings;
- missing assets;
- broken internal journal links;
- localization completeness warnings;
- possible privacy-sensitive content.

This gives AI assistants an early feedback loop before deployment.

### 8. Documentation coherence

The repository now has layered documentation:

- `README.md` — quick overview and entry point;
- `ABOUT.md` — human-facing project story and credits;
- `AGENTS.md` — AI assistant start file;
- `ARCHITECTURE.md` — architectural model;
- `CONTENT.md` — content operations manual;
- `features/` — feature-level registry.

## Decisions made

### Keep content file-based

Rejected alternative: database-backed CMS.

Reason: a database would make AI workflows less transparent and introduce unnecessary operational complexity.

### Keep GitHub as Source of Truth

Rejected alternative: external admin panel or hidden content backend.

Reason: Git provides version history, review, restore, and deployment traceability.

### Use registries only where they help

`content/manifest.json` and `content/contract.json` are justified because they help AI assistants understand the repository quickly and reduce repository scanning.

### Limit lifecycle to publishable content

Rejected alternative: lifecycle for all content.

Reason: applying draft/archive/trash behavior to widgets, branding, navigation, Currently, or footer would over-engineer simple configuration content.

### Keep application code stable

Application files should only change for explicit feature work or when the content model cannot express a request.

## Improvements for AI assistants

- Clear start point through `AGENTS.md`.
- Machine-readable registry through `content/manifest.json`.
- Machine-readable contract through `content/contract.json`.
- Explicit edit boundaries.
- File-path based workflows.
- AI Capability Matrix.
- Validation designed to catch AI mistakes early.

## Improvements for content management

- Clear split between content and application.
- Journal lifecycle is visible through folders.
- Categories are centralized.
- Links are centralized through `content/site/links.json`.
- Widgets and site content are editable without React changes.
- English/Dutch localization model is documented.

## Improvements for maintainability

- Documentation now explains the repository from multiple perspectives.
- AI assistants can follow a predictable workflow.
- Future content types can follow the same pattern: `content/<feature>/` + loader + route + feature doc.
- Validation creates a stable quality gate.

## Rejected alternatives

- Traditional CMS backend.
- Database-backed content storage.
- Admin dashboard.
- Lifecycle for every JSON configuration file.
- Overly broad future-platform abstractions.
- Major route restructuring during this architecture pass.

## Remaining limitations

The GitHub connector can read and write repository files, but it cannot run local commands in the repository workspace. Therefore, this run could not directly execute:

```bash
npm run validate:content
npm run build
```

Those commands should still be run locally or by Cursor before treating the upgrade as fully verified.

## Scores

| Area | Score | Notes |
|------|-------|-------|
| Architecture | 9/10 | Clear separation of application, content, config, and assets. |
| AI friendliness | 9/10 | Strong onboarding, manifest, contract, and edit boundaries. |
| Maintainability | 8.5/10 | Good documentation and validation; future features should stay disciplined. |
| Scalability | 8/10 | Strong for personal-site scale and future content types; not intended as enterprise CMS. |
| Documentation | 9/10 | Layered documentation for humans and AI. |
| Future readiness | 8.5/10 | Ready for content growth and later AI-agent workflows. |

## Final assessment

Yes: the architectural foundation of `jessekramer.nl` is now largely complete as an AI-native CMS.

The repository is ready to be maintained for years as a file-based, GitHub-centered, AI-assisted content system, as long as future work follows the existing boundaries:

- content changes stay in `content/`;
- application changes happen only when explicitly needed;
- new features document their content model;
- validation is run before deployment;
- Git remains the source of truth.

## Recommendations for the next 1–3 years

1. Focus on real content rather than more architecture.
2. Add future content types only when there is a concrete use case.
3. Keep `AGENTS.md`, `CONTENT.md`, and `features/` updated when new workflows appear.
4. Consider AI audit logs only if the volume of AI-made changes becomes large.
5. Keep the project calm, personal, and maintainable.

The next phase should be content growth, Journal publishing, and carefully selected new features — not another fundamental restructuring.
