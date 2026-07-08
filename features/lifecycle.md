# Content lifecycle

Applies to **publishable content** (journal articles). Configuration JSON is edited directly — no lifecycle.

## States

```text
Draft → Published → Archived → Trash → Permanent delete
```

| State | Folder | On site |
|-------|--------|---------|
| Draft | `content/journal/` | Hidden |
| Published | `content/journal/` | Visible |
| Archived | `content/journal/_archived/` | Hidden |
| Trash | `content/journal/_trash/` | Hidden |

## Operations

```bash
# Archive
git mv content/journal/my-post.md content/journal/_archived/

# Trash
git mv content/journal/my-post.md content/journal/_trash/

# Restore
git mv content/journal/_trash/my-post.md content/journal/

# Permanent delete
git rm content/journal/_trash/my-post.md
```

## AI inventory

Use `getJournalInventory()` from `lib/journal.ts` to list all articles across lifecycle folders without scanning unrelated paths.

Registry: `content/manifest.json` → `contentTypes.journal.paths`

## Future (not implemented)

Documented in `content/contract.json`:

- Review state
- Hidden state
- AI audit log
- Version history UI
- Rollback helpers
- AI permissions
- Publication history

Git history provides audit and rollback today.
