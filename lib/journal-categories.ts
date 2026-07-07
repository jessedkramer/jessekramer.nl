import type { JournalCategory } from "@/types/journal";
import { getJournalCategoryKeys } from "@/lib/journal";

export function buildJournalCategoryLabels(
  translate: (key: JournalCategory) => string,
): Record<JournalCategory, string> {
  return Object.fromEntries(
    getJournalCategoryKeys().map((key) => [key, translate(key)]),
  ) as Record<JournalCategory, string>;
}
