import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import CurrentlyBar from "@/components/CurrentlyBar";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";
import type { AppLocale } from "@/i18n/config";
import { getAboutPageContent, getBrandingForLocale } from "@/lib/site";

export async function aboutMetadata(locale: AppLocale): Promise<Metadata> {
  const branding = getBrandingForLocale(locale);
  const about = getAboutPageContent(locale);

  return {
    title: `${about.title} ${branding.metadata.titleSuffix}`,
    description: about.paragraphs[0] ?? branding.metadata.description,
  };
}

export async function AboutPage({ locale }: { locale: AppLocale }) {
  setRequestLocale(locale);
  const content = getAboutPageContent(locale);

  return (
    <div className="home about-page">
      <WorldBackground />
      <SiteHeader activeNav="about" />
      <div className="home-stage home-stage--content">
        <CurrentlyBar compact />
        <main className="page-shell content-page">
          <article className="card journal-article about-article">
            <p className="content-eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <div className="journal-content">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
