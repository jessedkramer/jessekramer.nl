import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileBottomNav from "@/components/MobileBottomNav";
import {
  IconAbout,
  IconHome,
  IconJournal,
  IconMail,
} from "@/components/icons";
import type { AppLocale } from "@/i18n/config";
import { getBrandingForLocale, getNavigationForLocale } from "@/lib/site";

type SiteHeaderProps = {
  activeNav?: "home" | "about" | "journal";
};

const navIcons = {
  home: IconHome,
  about: IconAbout,
  journal: IconJournal,
  mail: IconMail,
} as const;

export default async function SiteHeader({ activeNav = "home" }: SiteHeaderProps) {
  const locale = (await getLocale()) as AppLocale;
  const navigation = getNavigationForLocale(locale);
  const branding = getBrandingForLocale(locale);
  const primaryItems = navigation.items.slice(0, 2);
  const secondaryItems = navigation.items.slice(2);

  return (
    <>
      <header className="site-header">
        <nav className="header-pill" aria-label={navigation.ariaLabel}>
          <div className="header-nav-links">
            {primaryItems.map((item) => {
              const Icon = navIcons[item.icon];

              if (item.external) {
                return (
                  <a key={item.id} className="header-link" href={item.href}>
                    <Icon className="svg-icon svg-icon-nav" />
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.id}
                  className={`header-link${activeNav === item.id ? " is-active" : ""}`}
                  href={item.href}
                >
                  <Icon className="svg-icon svg-icon-nav" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Link className="brand" href="/" aria-label={navigation.brandLabel}>
            <Image
              src={branding.logo.src}
              alt={branding.logo.alt}
              width={branding.logo.width}
              height={branding.logo.height}
              className="brand-logo"
              priority
            />
          </Link>
          <div className="header-locale header-locale--mobile">
            <LanguageSwitcher />
          </div>
          <div className="header-nav-links">
            {secondaryItems.map((item) => {
              const Icon = navIcons[item.icon];

              if (item.external) {
                return (
                  <a key={item.id} className="header-link" href={item.href}>
                    <Icon className="svg-icon svg-icon-nav" />
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.id}
                  className={`header-link${activeNav === item.id ? " is-active" : ""}`}
                  href={item.href}
                >
                  <Icon className="svg-icon svg-icon-nav" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
      <MobileBottomNav activeNav={activeNav} />
    </>
  );
}
