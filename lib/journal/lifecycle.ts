import type {
  JournalFrontmatter,
  JournalLifecycleStatus,
  JournalStorageLocation,
} from "@/types/journal";

export function resolveJournalStatus(
  location: JournalStorageLocation,
  data: Partial<JournalFrontmatter>,
): JournalLifecycleStatus {
  if (location === "archived") return "archived";
  if (location === "trash") return "trash";

  if (data.status === "archived" || data.status === "trash") {
    return data.status;
  }

  if (data.status === "draft" || data.published === false) {
    return "draft";
  }

  if (data.status === "published" || data.published === true) {
    return "published";
  }

  return "draft";
}

export function isPublishedJournalStatus(
  location: JournalStorageLocation,
  status: JournalLifecycleStatus,
): boolean {
  return location === "active" && status === "published";
}
