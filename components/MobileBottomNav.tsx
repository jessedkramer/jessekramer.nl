import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LINKS } from "@/lib/links";
import {
  IconAbout,
  IconHome,
  IconJournal,
  IconMail,
} from "@/components/icons";

type MobileBottomNavProps = {
  activeNav?: "home" | "about" | "journal";
};

export default async function MobileBottomNav({
  activeNav = "home",
}: MobileBottomNavProps) {
  const t = await getTranslations("header");

  return (
    <div className="mobile-bottom-nav-shell">
      <nav className="mobile-bottom-nav" aria-label={t("navLabel")}>
        <Link
          className={`mobile-nav-item${activeNav === "home" ? " is-active" : ""}`}
          href="/"
        >
          <IconHome className="svg-icon" />
          <span>{t("home")}</span>
        </Link>
        <Link
          className={`mobile-nav-item${activeNav === "about" ? " is-active" : ""}`}
          href="/about"
        >
          <IconAbout className="svg-icon" />
          <span>{t("about")}</span>
        </Link>
        <Link
          className={`mobile-nav-item${activeNav === "journal" ? " is-active" : ""}`}
          href="/journal"
        >
          <IconJournal className="svg-icon" />
          <span>{t("journal")}</span>
        </Link>
        <a className="mobile-nav-item" href={LINKS.email}>
          <IconMail className="svg-icon" />
          <span>{t("contact")}</span>
        </a>
      </nav>
    </div>
  );
}
