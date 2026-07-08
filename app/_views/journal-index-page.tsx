import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import CurrentlyBar from "@/components/CurrentlyBar";
import JournalIndex from "@/components/JournalIndex";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";
import type { AppLocale } from "@/i18n/config";
import { buildJournalCategoryLabels, getOrderedJournalCategoryIds } from "@/lib/journal/categories";
import { getJournalListEntries } from "@/lib/journal";
import { getBrandingForLocale, getJournalPageContent } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

type JournalIndexPageProps = {
  locale: AppLocale;
  searchParams: {
    q?: string;
    category?: string;
    page?: string;
  };
};

export async function journalIndexMetadata(locale: AppLocale): Promise<Metadata> {
  const branding = getBrandingForLocale(locale);
  const page = getJournalPageContent(locale);

  return buildPageMetadata({
    locale,
    title: `${page.eyebrow} ${branding.metadata.titleSuffix}`,
    description: page.lead,
    path: "/journal",
  });
}

export async function JournalIndexPage({
  locale,
  searchParams,
}: JournalIndexPageProps) {
  const { q = "", category = "", page = "1" } = searchParams;
  setRequestLocale(locale);
  const pageContent = getJournalPageContent(locale);
  const categoryLabels = buildJournalCategoryLabels(locale);
  const posts = getJournalListEntries(locale, categoryLabels);
  const parsedPage = Number.parseInt(page, 10);

  return (
    <div className="home journal-page journal-index-page">
      <WorldBackground />
      <SiteHeader activeNav="journal" />
      <div className="home-stage home-stage--content">
        <CurrentlyBar compact />
        <main className="page-shell content-page">
          <section className="content-hero">
            <p className="content-eyebrow">{pageContent.eyebrow}</p>
            <h1>{pageContent.title}</h1>
            <p className="content-lead">{pageContent.lead}</p>
          </section>

          <JournalIndex
            posts={posts}
            locale={locale}
            categoryOrder={getOrderedJournalCategoryIds()}
            initialQuery={q}
            initialCategory={category}
            initialPage={Number.isNaN(parsedPage) ? 1 : parsedPage}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}
