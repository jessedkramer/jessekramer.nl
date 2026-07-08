import type { MetadataRoute } from "next";
import { getBrandingContent } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const branding = getBrandingContent();
  const siteUrl = branding.metadata.siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
