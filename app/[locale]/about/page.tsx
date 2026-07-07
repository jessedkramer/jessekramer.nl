import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <div className="home about-page">
      <WorldBackground />
      <SiteHeader activeNav="about" />
      <div className="home-stage home-stage--content">
        <main className="page-shell content-page">
          <article className="card journal-article about-article">
            <p className="content-eyebrow">{t("eyebrow")}</p>
            <h1>{t("title")}</h1>
            <div className="journal-content">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>{t("paragraph3")}</p>
              <p>{t("paragraph4")}</p>
              <p>{t("paragraph5")}</p>
              <p>{t("paragraph6")}</p>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
