import type { AppLocale } from "@/i18n/config";

export type LocalizedString = {
  nl: string;
  en: string;
};

export function pickLocalized(
  value: LocalizedString,
  locale: AppLocale,
): string {
  return value[locale] ?? value.nl;
}

export function pickLocalizedList(
  values: LocalizedString[],
  locale: AppLocale,
): string[] {
  return values.map((value) => pickLocalized(value, locale));
}
