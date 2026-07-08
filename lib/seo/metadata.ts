import "server-only";

import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";
import { getBrandingForLocale } from "@/lib/site";

type PageMetadataInput = {
  locale: AppLocale;
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function localePath(locale: AppLocale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "nl") {
    return normalized === "/" ? "/" : normalized;
  }

  return normalized === "/" ? "/en" : `/en${normalized}`;
}

export function absoluteUrl(siteUrl: string, path: string): string {
  const base = siteUrl.replace(/\/$/, "");
  if (path === "/" || path === "") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildAlternateLanguages(
  siteUrl: string,
  path: string,
): NonNullable<Metadata["alternates"]>["languages"] {
  return {
    nl: absoluteUrl(siteUrl, localePath("nl", path)),
    en: absoluteUrl(siteUrl, localePath("en", path)),
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const branding = getBrandingForLocale(locale);
  const canonicalPath = localePath(locale, path);
  const canonical = absoluteUrl(branding.metadata.siteUrl, canonicalPath);
  const imagePath = ogImage ?? branding.metadata.ogImage;
  const imageUrl = absoluteUrl(branding.metadata.siteUrl, imagePath);
  const twitter = branding.metadata.twitter;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildAlternateLanguages(branding.metadata.siteUrl, path),
    },
    openGraph: {
      type,
      locale: locale === "nl" ? "nl_NL" : "en_US",
      url: canonical,
      siteName: branding.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: branding.name,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: twitter?.card ?? "summary_large_image",
      title,
      description,
      images: [imageUrl],
      ...(twitter?.site ? { site: twitter.site } : {}),
    },
  };
}

export function buildSiteMetadata(locale: AppLocale): Metadata {
  const branding = getBrandingForLocale(locale);

  return buildPageMetadata({
    locale,
    title: branding.metadata.title,
    description: branding.metadata.description,
    path: "/",
  });
}
