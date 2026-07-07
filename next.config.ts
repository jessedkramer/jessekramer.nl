import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/[locale]": ["./content/journal/**/*"],
    "/[locale]/journal": ["./content/journal/**/*"],
    "/[locale]/journal/[slug]": ["./content/journal/**/*"],
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
