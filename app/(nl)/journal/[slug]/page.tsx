import {
  JournalArticlePage,
  journalArticleMetadata,
} from "@/app/_views/journal-article-page";
import { getJournalSlugsForLocale } from "@/lib/journal";

export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getJournalSlugsForLocale("nl").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return journalArticleMetadata({ locale: "nl", slug });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return JournalArticlePage({ locale: "nl", slug });
}
