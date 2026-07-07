import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import LocaleSync from "@/components/LocaleSync";
import type { AppLocale } from "@/i18n/config";
import { getBrandingForLocale } from "@/lib/site";
import "@/app/globals.css";

export const localeViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12021f",
};

export async function createLocaleMetadata(locale: AppLocale): Promise<Metadata> {
  const branding = getBrandingForLocale(locale);

  return {
    title: branding.metadata.title,
    description: branding.metadata.description,
    openGraph: {
      title: branding.metadata.title,
      description: branding.metadata.description,
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
