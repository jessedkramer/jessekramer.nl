import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/[locale]": ["./content/journal/**/*"],
    "/[locale]/journal": ["./content/journal/**/*"],
    "/[locale]/journal/[slug]": ["./content/journal/**/*"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/nl" },
        { source: "/about", destination: "/nl/about" },
        { source: "/journal", destination: "/nl/journal" },
        { source: "/journal/:slug", destination: "/nl/journal/:slug" },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "jessekramer-nl.vercel.app" }],
        destination: "https://jessekramer.nl/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jessekramer.nl" }],
        destination: "https://jessekramer.nl/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
