import { getLocale } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { AppLocale } from "@/i18n/config";
import { getFooterContentForLocale } from "@/lib/site";

export default async function Footer() {
  const locale = (await getLocale()) as AppLocale;
  const footer = getFooterContentForLocale(locale);

  return (
    <footer className="footer card">
      <div className="footer-left">
        <h2>
          {footer.name}
          <span className="footer-beta">{footer.betaLabel}</span>
        </h2>
        <p>
          {(() => {
            const highlightIndex = footer.tagline.indexOf(footer.taglineHighlight);
            if (highlightIndex === -1) return footer.tagline;

            return (
              <>
                {footer.tagline.slice(0, highlightIndex)}
                <span>{footer.taglineHighlight}</span>
                {footer.tagline.slice(
                  highlightIndex + footer.taglineHighlight.length,
                )}
              </>
            );
          })()}
        </p>
      </div>
      <p className="footer-center">{footer.copyright}</p>
      <div className="footer-action">
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
