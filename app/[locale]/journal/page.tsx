import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import JournalIndex from "@/components/JournalIndex";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";
import type { AppLocale } from "@/i18n/config";
import { buildJournalCategoryLabels } from "@/lib/journal-categories";
import { getJournalListEntries } from "@/lib/journal";

export const runtime = "nodejs";

type JournalIndexPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

export async function generateMetadata({
  params,
}: JournalIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("journalTitle"),
    description: t("siteDescription"),
  };
}

export default async function JournalIndexPage({
  params,
  searchParams,
}: JournalIndexPageProps) {
  const { locale } = await params;
  const { q = "", category = "", page = "1" } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("journalPage");
  const tCategories = await getTranslations("journalCategories");
  const categoryLabels = buildJournalCategoryLabels((key) => tCategories(key));
  const posts = getJournalListEntries(locale as AppLocale, categoryLabels);
  const parsedPage = Number.parseInt(page, 10);

  return (
    <div className="home journal-page">
      <WorldBackground />
      <SiteHeader activeNav="journal" />
      <div className="home-stage home-stage--content">
        <main className="page-shell content-page">
          <section className="content-hero">
            <p className="content-eyebrow">{t("eyebrow")}</p>
            <h1>{t("title")}</h1>
            <p className="content-lead">{t("lead")}</p>
          </section>

          <JournalIndex
            posts={posts}
            locale={locale}
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
