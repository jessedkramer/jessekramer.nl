import "server-only";

import type { AppLocale } from "@/i18n/config";
import { pickLocalized } from "@/lib/content/localized";
import { getJournalCategoriesFile } from "@/lib/site";
import type { JournalCategory } from "@/types/journal";

export function getOrderedJournalCategoryIds(): JournalCategory[] {
  return getJournalCategoriesFile()
    .categories.slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => category.id as JournalCategory);
}

export function getJournalCategoryLabelMap(
  locale: AppLocale,
): Record<JournalCategory, string> {
  const categories = getJournalCategoriesFile().categories;

  return Object.fromEntries(
    categories.map((category) => [
      category.id,
      pickLocalized(category.labels, locale),
    ]),
  ) as Record<JournalCategory, string>;
}

export function buildJournalCategoryLabels(
  locale: AppLocale,
): Record<JournalCategory, string> {
  return getJournalCategoryLabelMap(locale);
}

export function isValidJournalCategory(
  category: string,
): category is JournalCategory {
  return getJournalCategoriesFile().categories.some(
    (entry) => entry.id === category,
  );
}
