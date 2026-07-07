import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import LocaleSync from "@/components/LocaleSync";
import type { AppLocale } from "@/i18n/config";
import "@/app/globals.css";

export const localeViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12021f",
};

export async function createLocaleMetadata(locale: AppLocale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("siteTitle"),
    description: t("siteDescription"),
    openGraph: {
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
  };
}

type LocaleDocumentProps = {
  locale: AppLocale;
  children: ReactNode;
};

export default async function LocaleDocument({
  locale,
  children,
}: LocaleDocumentProps) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleSync />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
