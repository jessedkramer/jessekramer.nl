import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileBottomNav from "@/components/MobileBottomNav";
import { LINKS } from "@/lib/links";
import {
  IconAbout,
  IconHome,
  IconJournal,
  IconMail,
} from "@/components/icons";

type SiteHeaderProps = {
  activeNav?: "home" | "about" | "journal";
};

export default async function SiteHeader({ activeNav = "home" }: SiteHeaderProps) {
  const t = await getTranslations("header");

  return (
    <>
      <header className="site-header">
        <nav className="header-pill" aria-label={t("navLabel")}>
          <div className="header-nav-links">
            <Link
              className={`header-link${activeNav === "home" ? " is-active" : ""}`}
              href="/"
            >
              <IconHome className="svg-icon svg-icon-nav" />
              {t("home")}
            </Link>
            <Link
              className={`header-link${activeNav === "about" ? " is-active" : ""}`}
              href="/about"
            >
              <IconAbout className="svg-icon svg-icon-nav" />
              {t("about")}
            </Link>
          </div>
          <Link className="brand" href="/" aria-label={t("brandLabel")}>
            <Image
              src="/images/logo.png"
              alt="Jesse Kramer"
              width={703}
              height={219}
              className="brand-logo"
              priority
            />
          </Link>
          <div className="header-locale header-locale--mobile">
            <LanguageSwitcher />
          </div>
          <div className="header-nav-links">
            <Link
              className={`header-link${activeNav === "journal" ? " is-active" : ""}`}
              href="/journal"
            >
              <IconJournal className="svg-icon svg-icon-nav" />
              {t("journal")}
            </Link>
            <a className="header-link" href={LINKS.email}>
              <IconMail className="svg-icon svg-icon-nav" />
              {t("contact")}
            </a>
          </div>
        </nav>
      </header>
      <MobileBottomNav activeNav={activeNav} />
    </>
  );
}
