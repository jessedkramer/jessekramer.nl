import { getTranslations } from "next-intl/server";
import { LINKS } from "@/lib/links";
import { IconProfessional, IconExternal } from "@/components/icons";

export default async function MunicipalityCard() {
  const t = await getTranslations("municipalityCard");

  return (
    <article className="card municipality-card" id="council">
      <span className="card-icon card-icon-council" aria-hidden="true">
        <IconProfessional className="svg-icon" />
      </span>
      <div>
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>
      </div>
      <a
        className="icon-button"
        href={LINKS.gemeente}
        rel="noreferrer"
        target="_blank"
        aria-label={t("profileAria")}
      >
        <IconExternal className="svg-icon svg-icon-sm" />
      </a>
    </article>
  );
}
