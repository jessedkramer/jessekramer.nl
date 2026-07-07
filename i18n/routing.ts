import { defineRouting } from "next-intl/routing";
import {
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  defaultLocale,
  locales,
  type AppLocale,
} from "./config";

export { LOCALE_COOKIE, LOCALE_STORAGE_KEY, type AppLocale };

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: {
    name: LOCALE_COOKIE,
    maxAge: 60 * 60 * 24 * 365,
  },
});
