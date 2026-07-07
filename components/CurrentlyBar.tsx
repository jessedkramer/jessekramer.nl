import { getLocale } from "next-intl/server";
import CurrentlyBarClient from "@/components/CurrentlyBarClient";
import type { AppLocale } from "@/i18n/config";
import { getCurrentlyBarContent } from "@/lib/site";

type CurrentlyBarProps = {
  compact?: boolean;
};

export default async function CurrentlyBar({ compact = false }: CurrentlyBarProps) {
  const locale = (await getLocale()) as AppLocale;
  const content = getCurrentlyBarContent(locale);

  return <CurrentlyBarClient compact={compact} content={content} />;
}
