import type { JournalCategory } from "@/types/journal";
import { ORDERED_JOURNAL_CATEGORIES } from "@/types/journal";

export function buildJournalCategoryLabels(
  translate: (key: JournalCategory) => string,
): Record<JournalCategory, string> {
  return Object.fromEntries(
    ORDERED_JOURNAL_CATEGORIES.map((key) => [key, translate(key)]),
  ) as Record<JournalCategory, string>;
}
