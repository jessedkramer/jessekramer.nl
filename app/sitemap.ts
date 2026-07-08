import type { MetadataRoute } from "next";
import { getBrandingContent } from "@/lib/site";
import { getJournalSlugsForLocale } from "@/lib/journal";
import { absoluteUrl, localePath } from "@/lib/seo/metadata";

const STATIC_PATHS = ["/", "/about", "/journal"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const branding = getBrandingContent();
  const siteUrl = branding.metadata.siteUrl;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ["nl", "en"] as const) {
    for (const pagePath of STATIC_PATHS) {
      const localizedPath = localePath(locale, pagePath);
      entries.push({
        url: absoluteUrl(siteUrl, localizedPath),
        lastModified: new Date(),
        changeFrequency: pagePath === "/" ? "weekly" : "monthly",
        priority: pagePath === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            nl: absoluteUrl(siteUrl, localePath("nl", pagePath)),
            en: absoluteUrl(siteUrl, localePath("en", pagePath)),
          },
        },
      });
    }

    for (const slug of getJournalSlugsForLocale(locale)) {
      const localizedPath = localePath(locale, `/journal/${slug}`);
      entries.push({
        url: absoluteUrl(siteUrl, localizedPath),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            nl: absoluteUrl(siteUrl, localePath("nl", `/journal/${slug}`)),
            en: absoluteUrl(siteUrl, localePath("en", `/journal/${slug}`)),
          },
        },
      });
    }
  }

  return entries;
}
