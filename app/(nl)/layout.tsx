import type { ReactNode } from "react";
import LocaleDocument, {
  createLocaleMetadata,
  localeViewport,
} from "@/components/locale/LocaleDocument";

export const runtime = "nodejs";
export const viewport = localeViewport;

export async function generateMetadata() {
  return createLocaleMetadata("nl");
}

export default function DutchLayout({ children }: { children: ReactNode }) {
  return <LocaleDocument locale="nl">{children}</LocaleDocument>;
}
