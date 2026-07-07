import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];

export const LOCALE_STORAGE_KEY = "jessekramer.locale";
export const LOCALE_COOKIE = "jessekramer.locale";
