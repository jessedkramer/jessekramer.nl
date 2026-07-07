import { setRequestLocale } from "next-intl/server";
import CurrentlyBar from "@/components/CurrentlyBar";
import Footer from "@/components/Footer";
import HomepageDashboard from "@/components/HomepageDashboard";
import SiteHeader from "@/components/SiteHeader";
import WorldBackground from "@/components/WorldBackground";
import type { AppLocale } from "@/i18n/config";
import { getHomepageContent } from "@/lib/site";
import { pickLocalized } from "@/lib/content/localized";

export async function HomePage({ locale }: { locale: AppLocale }) {
  setRequestLocale(locale);
  const homepage = getHomepageContent();

  return (
    <div className="home">
      <WorldBackground />
      <SiteHeader />
      <div className="home-stage">
        <CurrentlyBar />
        <main className="page-shell">
          <HomepageDashboard
            ariaLabel={pickLocalized(homepage.dashboardLabel, locale)}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}
