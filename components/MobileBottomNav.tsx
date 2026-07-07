import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  IconAbout,
  IconHome,
  IconJournal,
  IconMail,
} from "@/components/icons";
import type { AppLocale } from "@/i18n/config";
import { getNavigationForLocale } from "@/lib/site";

type MobileBottomNavProps = {
  activeNav?: "home" | "about" | "journal";
};

const navIcons = {
  home: IconHome,
  about: IconAbout,
  journal: IconJournal,
  mail: IconMail,
} as const;

export default async function MobileBottomNav({
  activeNav = "home",
}: MobileBottomNavProps) {
  const locale = (await getLocale()) as AppLocale;
  const navigation = getNavigationForLocale(locale);

  return (
    <div className="mobile-bottom-nav-shell">
      <nav className="mobile-bottom-nav" aria-label={navigation.ariaLabel}>
        {navigation.items.map((item) => {
          const Icon = navIcons[item.icon];

          if (item.external) {
            return (
              <a key={item.id} className="mobile-nav-item" href={item.href}>
                <Icon className="svg-icon" />
                <span>{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              className={`mobile-nav-item${activeNav === item.id ? " is-active" : ""}`}
              href={item.href}
            >
              <Icon className="svg-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
