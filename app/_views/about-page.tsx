import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import CurrentlyBar from "@/components/CurrentlyBar";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";
import type { AppLocale } from "@/i18n/config";
import { getAboutPageContent, getBrandingForLocale } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import styles from "./about-page.module.css";

export async function aboutMetadata(locale: AppLocale): Promise<Metadata> {
  const branding = getBrandingForLocale(locale);
  const about = getAboutPageContent(locale);

  return buildPageMetadata({
    locale,
    title: `${about.title} ${branding.metadata.titleSuffix}`,
    description: about.paragraphs[0] ?? branding.metadata.description,
    path: "/about",
  });
}

export async function AboutPage({ locale }: { locale: AppLocale }) {
  setRequestLocale(locale);
  const content = getAboutPageContent(locale);

  return (
    <div className={`home about-page ${styles.page}`}>
      <WorldBackground />
      <SiteHeader activeNav="about" />
      <div className="home-stage home-stage--content">
        <CurrentlyBar compact />
        <main className="page-shell content-page">
          <article className="card journal-article about-article">
            <p className="content-eyebrow">{content.eyebrow}</p>
            <h1>{content.introTitle}</h1>

            <div className={`journal-content ${styles.intro}`}>
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.sections}>
              {content.sections.map((section) => (
                <details className={styles.section} key={section.id}>
                  <summary>
                    <span>{section.title}</span>
                    <span className={styles.icon} aria-hidden="true">+</span>
                  </summary>

                  <div className={`journal-content ${styles.content}`}>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.vision ? (
                      <div className={styles.vision}>
                        <h2>{section.vision.title}</h2>
                        <p><em>{section.vision.text}</em></p>
                      </div>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
