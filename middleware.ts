import createMiddleware from "next-intl/middleware";
import { LOCALE_COOKIE, routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  localeDetection: false,
  localeCookie: {
    name: LOCALE_COOKIE,
    maxAge: 60 * 60 * 24 * 365,
  },
});

export const config = {
  matcher: ["/", "/(nl|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
