import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tEn = await getTranslations({ locale: "en", namespace: "footer" });

  return (
    <footer className="footer card">
      <div className="footer-left">
        <h2>Jesse Kramer</h2>
        <p>
          {tEn.rich("slogan", {
            highlight: (chunks) => <span>{chunks}</span>,
          })}
        </p>
      </div>
      <p className="footer-center">{t("copyright")}</p>
      <div className="footer-action">
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
