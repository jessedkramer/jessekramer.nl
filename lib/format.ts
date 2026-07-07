import type { AppLocale } from "@/i18n/config";

export function formatJournalDate(date: string, locale: AppLocale | string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  const intlLocale = locale === "nl" ? "nl-NL" : "en-US";

  return new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}
