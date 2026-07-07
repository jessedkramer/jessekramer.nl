"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type AppLocale,
} from "@/i18n/routing";

function isAppLocale(value: string | null): value is AppLocale {
  return value === "nl" || value === "en";
}

function persistLocale(locale: AppLocale) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export default function LocaleSync() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);

    if (isAppLocale(stored) && stored !== locale) {
      router.replace(pathname, { locale: stored });
      return;
    }

    persistLocale(locale);
  }, [locale, pathname, router]);

  return null;
}
