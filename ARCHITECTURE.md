# Architecture v1

This document defines the foundation for **jessekramer.nl**.

The project is not just a personal website. It is the first version of an AI-native personal publishing workflow where GitHub is the source of truth, Vercel publishes the website, and AI collaborators help create, maintain and evolve the experience.

## Philosophy

**Finding beauty in the digital world.**

A personal website should not just tell people who you are. It should let them experience who you are.

The website should feel like a calm digital world instead of a standard portfolio. The visitor should immediately feel the identity, atmosphere and personality behind the site before reading every detail.

## Canonical domain

The canonical public domain is:

```text
https://jessekramer.nl
```

Other domains, including the Vercel preview/domain, are technical fallbacks and should redirect to the canonical domain where possible.

## Public repository

This repository contains the public website.

It may include:

```text
README.md
ARCHITECTURE.md
app/
components/
content/
lib/
public/
types/
```

It should not include private notes, personal strategy, sensitive AI context, private planning or deep personal memory.

## Future private brain repository

Later, private AI context should move to a separate private repository, likely called:

```text
jessekramer-brain
```

That repository may contain:

```text
brain/
overleg/
decisions/
writing-style.md
brand-guidelines.md
personal-context.md
ai-rules.md
roadmap-private.md
```

The public repository is the website. The private repository is the creative memory.

## Current technical setup

Version 1 runs on Next.js with a component-based homepage, file-based journal content and Vercel deployment.

```text
GitHub → Vercel → jessekramer.nl
```

## Homepage structure v1

The homepage is based on the locked visual direction.

```text
Header
Hero
Currently
Over mij
Socials & Publiek profiel
Live from X
Journal
Gemeenteraad Urk
Footer
```

Removed from v1:

```text
Projects
Online
Building
```

Those sections do not fit the current identity of the site.

## Visual direction

The website should feel like TheJessePost translated into Jesse Kramer as a personal website.

Core visual rules:

- cosmic purple atmosphere
- deep layered background with subtle motion
- calm futuristic editorial mood
- liquid glass widgets
- SpaceX-like clarity with X.com readability
- no heavy cyberpunk overload
- no generic portfolio look
- enough breathing room
- the cosmic world continues behind the widgets and footer
- Jesse Kramer is the brand, not TheJessePost

TheJessePost appears only as part of the social identity, not as the website brand.

## Header rules

Header content:

```text
Home
Over mij
Jesse Kramer (centered wordmark)
Journal
Contact
```

The Jesse Kramer wordmark should visually match the handwritten `J.` style from the hoodie/fav icon direction.

The Gemeenteraad Urk link lives in the municipality widget only, not in the header.

## Currently system

The currently block is a subtle status element in the hero.

Example:

```text
CURRENTLY:
⌖ Urk, Netherlands   ♫ Purple Skyline   ✧ Working on jessekramer.nl
```

Rules:

- location can link to Wikipedia or Grokipedia
- music should stay consistent as part of TheJessePost identity
- activity can link to a relevant journal or tweet
- updates happen when Jesse asks, mentions a change, publishes a journal, or when a relevant status change is intentionally made

The system should remain human-directed. AI may suggest updates, but Jesse decides.

## Socials & public profile widget

This is one widget with two balanced parts.

Left side:

```text
X
GitHub
Steam
Email
```

Right side:

```text
LinkedIn logo
Jesse Kramer
professional description
LinkedIn button
```

Rules:

- widget title stays `Socials & Publiek profiel`
- no YouTube or Discord in v1
- no `TheJessePost` as a section title
- LinkedIn is professional, not TheJessePost-branded

## Municipality section

The municipality section should stay small and subtle.

It exists to acknowledge Jesse's official public role, not to turn the website into a political campaign site.

Rules:

- header button removed from v1 header
- widget stays small
- no party branding
- no campaign language
- link to official council profile later

## Journal

The Journal is for longer writing.

It is Markdown/MDX driven from `content/journal/` with frontmatter:

```text
title
date
category
excerpt
cover (optional)
published
```

Possible content:

- digital identity
- technology
- travel
- personal reflections
- AI-native CMS progress
- public role reflections, written professionally and carefully

The Journal is not a traditional WordPress blog and should not feel like a news feed.

## Live from X

The Live from X widget uses the official X embedded timeline for @TheJessePost where possible.

Rules:

- show current activity from @TheJessePost
- no fake sample tweets or engagement numbers
- if the embed cannot load, show a polished fallback with a link to the profile
- no duplicate `Show more on X` button if `View on X` already exists
- keep the widget visually integrated in the liquid glass style

## AI-native workflow

The desired workflow:

```text
Jesse describes a change
↓
ChatGPT or Grok edits the repository
↓
GitHub stores the change
↓
Vercel deploys automatically
↓
jessekramer.nl updates
```

The human keeps the vision, taste and final decision. AI handles execution, iteration and publishing support.

## Future AI-native CMS

The eventual CMS concept:

- content lives in GitHub
- pages and journals are Markdown/MDX
- AI helps write, edit, translate and publish
- GitHub remains the source of truth
- Vercel handles deployment
- private brain repository contains strategy, writing style and AI rules

## Design principle

Every new feature must strengthen the experience, not demand attention.

Avoid:

- unnecessary widgets
- noisy animations
- generic portfolio sections
- over-branding TheJessePost
- features that exist only because they are technically possible

Prioritize:

- calm atmosphere
- personal identity
- clarity
- consistency
- subtle beauty
- maintainability
