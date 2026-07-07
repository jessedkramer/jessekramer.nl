"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type AppLocale,
} from "@/i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");

  const switchLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return;

    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="language-switcher" role="group" aria-label={t("label")}>
      <div className="language-track">
        <button
          type="button"
          className={`language-option${locale === "nl" ? " is-active" : ""}`}
          onClick={() => switchLocale("nl")}
          aria-label={t("switchToNl")}
          aria-pressed={locale === "nl"}
        >
          <span className="language-flag" aria-hidden="true">
            🇳🇱
          </span>
          <span className="language-code">NL</span>
        </button>
        <button
          type="button"
          className={`language-option${locale === "en" ? " is-active" : ""}`}
          onClick={() => switchLocale("en")}
          aria-label={t("switchToEn")}
          aria-pressed={locale === "en"}
        >
          <span className="language-flag" aria-hidden="true">
            🇬🇧
          </span>
          <span className="language-code">EN</span>
        </button>
      </div>
    </div>
  );
}
