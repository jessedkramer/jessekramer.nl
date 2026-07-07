import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { formatJournalDate } from "@/lib/format";
import { localizeJournalPost } from "@/lib/journal-display";
import { buildJournalCategoryLabels } from "@/lib/journal-categories";
import {
  getJournalPost,
  getJournalSlugsForLocale,
  isJournalPostVisibleInLocale,
} from "@/lib/journal";
import { renderMarkdown } from "@/lib/markdown";

type JournalArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getJournalSlugsForLocale(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: JournalArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getJournalPost(slug);
  const t = await getTranslations({ locale, namespace: "metadata" });

  if (!post) {
    return { title: t("journalFallbackTitle") };
  }

  const localized = localizeJournalPost(post, locale);

  return {
    title: `${localized.title} · Jesse Kramer`,
    description: localized.excerpt ?? localized.title,
  };
}

export default async function JournalArticlePage({
  params,
}: JournalArticlePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journalPage");
  const tCategories = await getTranslations("journalCategories");
  const post = getJournalPost(slug);

  if (!post || !isJournalPostVisibleInLocale(post, locale as AppLocale)) {
    notFound();
  }

  const localized = localizeJournalPost(post, locale as AppLocale);
  const categoryLabels = buildJournalCategoryLabels((key) => tCategories(key));

  return (
    <div className="home journal-page">
      <WorldBackground />
      <SiteHeader activeNav="journal" />
      <div className="home-stage home-stage--content">
        <main className="page-shell content-page">
          <article className="card journal-article">
            <Link className="text-link journal-back" href="/journal">
              {t("backToAll")}
            </Link>
            <p className="journal-index-meta">
              {formatJournalDate(localized.date, locale)} ·{" "}
              {categoryLabels[localized.category]}
            </p>
            <h1>{localized.title}</h1>
            <div
              className="journal-content"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(localized.content),
              }}
            />
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
