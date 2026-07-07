import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { IconAbout, IconArrowRight } from "@/components/icons";

export default async function AboutCard() {
  const t = await getTranslations("aboutCard");

  return (
    <article className="card about-card" id="about">
      <h2>
        <span className="card-icon" aria-hidden="true">
          <IconAbout className="svg-icon" />
        </span>
        {t("title")}
      </h2>
      <div className="about-copy">
        <p>{t("paragraph1")}</p>
        <p>{t("paragraph2")}</p>
      </div>
      <Link className="small-button about-button" href="/about">
        {t("readMore")} <IconArrowRight className="svg-icon svg-icon-sm" />
      </Link>
    </article>
  );
}
