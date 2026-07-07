import { defineRouting } from "next-intl/routing";

export const LOCALE_STORAGE_KEY = "jessekramer.locale";
export const LOCALE_COOKIE = "jessekramer.locale";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: {
    name: LOCALE_COOKIE,
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type AppLocale = (typeof routing.locales)[number];
