import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/": ["./content/journal/**/*"],
    "/journal": ["./content/journal/**/*"],
    "/journal/[slug]": ["./content/journal/**/*"],
    "/en": ["./content/journal/**/*"],
    "/en/journal": ["./content/journal/**/*"],
    "/en/journal/[slug]": ["./content/journal/**/*"],
  },
  async redirects() {
    return [
      {
        source: "/nl",
        destination: "/",
        permanent: true,
      },
      {
        source: "/nl/:path*",
        destination: "/:path*",
        permanent: true,
      },
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
