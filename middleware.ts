import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: {
    name: "jessekramer.locale",
    maxAge: 60 * 60 * 24 * 365,
  },
});

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
