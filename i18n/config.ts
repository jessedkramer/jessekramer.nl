export const locales = ["nl", "en"] as const;
export const defaultLocale = "nl";

export const LOCALE_STORAGE_KEY = "jessekramer.locale";
export const LOCALE_COOKIE = "jessekramer.locale";

export type AppLocale = (typeof locales)[number];
