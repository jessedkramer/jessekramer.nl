import { getTranslations } from "next-intl/server";
import { LINKS } from "@/lib/links";
import { IconArrowRight, IconProfessional } from "@/components/icons";

export default async function MunicipalityCard() {
  const t = await getTranslations("municipalityCard");

  return (
    <article className="card municipality-card" id="council">
      <div className="municipality-card__main">
        <span className="card-icon card-icon-council" aria-hidden="true">
          <IconProfessional className="svg-icon" />
        </span>
        <div className="municipality-card__copy">
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
      </div>
      <a
        className="icon-button municipality-card__action"
        href={LINKS.gemeente}
        rel="noreferrer"
        target="_blank"
        aria-label={t("profileAria")}
      >
        <IconArrowRight className="svg-icon svg-icon-sm" />
      </a>
    </article>
  );
}
