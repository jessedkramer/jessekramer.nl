import type { ReactNode } from "react";
import LocaleDocument, {
  createLocaleMetadata,
  localeViewport,
} from "@/components/locale/LocaleDocument";

export const runtime = "nodejs";
export const viewport = localeViewport;

export async function generateMetadata() {
  return createLocaleMetadata("en");
}

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <LocaleDocument locale="en">{children}</LocaleDocument>;
}
