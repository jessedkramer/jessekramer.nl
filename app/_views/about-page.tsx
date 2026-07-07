import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import CurrentlyBar from "@/components/CurrentlyBar";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";
import type { AppLocale } from "@/i18n/config";

export async function aboutMetadata(locale: AppLocale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

export async function AboutPage({ locale }: { locale: AppLocale }) {
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <div className="home about-page">
      <WorldBackground />
      <SiteHeader activeNav="about" />
      <div className="home-stage home-stage--content">
        <CurrentlyBar compact />
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
