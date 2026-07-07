import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutCard from "@/components/AboutCard";
import CurrentlyBar from "@/components/CurrentlyBar";
import Footer from "@/components/Footer";
import JournalCard from "@/components/JournalCard";
import MunicipalityCard from "@/components/MunicipalityCard";
import SiteHeader from "@/components/SiteHeader";
import SocialsCard from "@/components/SocialsCard";
import WorldBackground from "@/components/WorldBackground";
import XCard from "@/components/XCard";
import type { AppLocale } from "@/i18n/config";

export async function HomePage({ locale }: { locale: AppLocale }) {
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <div className="home">
      <WorldBackground />
      <SiteHeader />
      <CurrentlyBar />
      <div className="home-stage">
        <main className="page-shell">
          <section className="dashboard" aria-label={t("dashboardLabel")}>
            <AboutCard />
            <SocialsCard />
            <aside className="right-column">
              <XCard />
              <MunicipalityCard />
            </aside>
            <JournalCard />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
