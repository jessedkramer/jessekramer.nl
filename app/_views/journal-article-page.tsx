import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import CurrentlyBar from "@/components/CurrentlyBar";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";
import type { AppLocale } from "@/i18n/config";
import { formatJournalDate } from "@/lib/format";
import { localizeJournalPost } from "@/lib/journal-display";
import { buildJournalCategoryLabels } from "@/lib/journal/categories";
import { getBrandingForLocale } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  getJournalPost,
  isJournalPostVisibleInLocale,
} from "@/lib/journal";
import { renderMarkdown } from "@/lib/markdown";

type JournalArticlePageProps = {
  locale: AppLocale;
  slug: string;
};

export async function journalArticleMetadata({
  locale,
  slug,
}: JournalArticlePageProps): Promise<Metadata> {
  const post = getJournalPost(slug);
  const branding = getBrandingForLocale(locale);

  if (!post) {
    return { title: `Journal ${branding.metadata.titleSuffix}` };
  }

  const localized = localizeJournalPost(post, locale);

  return buildPageMetadata({
    locale,
    title: `${localized.title} ${branding.metadata.titleSuffix}`,
    description: localized.excerpt ?? localized.title,
    path: `/journal/${slug}`,
    ogImage: post.cover ?? branding.metadata.ogImage,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updatedDate ?? post.date,
  });
}

export async function JournalArticlePage({ locale, slug }: JournalArticlePageProps) {
  setRequestLocale(locale);
  const t = await getTranslations("journalPage");
  const post = getJournalPost(slug);

  if (!post || !isJournalPostVisibleInLocale(post, locale)) {
    notFound();
  }

  const localized = localizeJournalPost(post, locale);
  const categoryLabels = buildJournalCategoryLabels(locale);

  return (
    <div className="home journal-page journal-article-page">
      <Script
        src="https://platform.x.com/widgets.js"
        strategy="afterInteractive"
        charSet="utf-8"
      />
      <WorldBackground />
      <SiteHeader activeNav="journal" />
      <div className="home-stage home-stage--content">
        <CurrentlyBar compact />
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
