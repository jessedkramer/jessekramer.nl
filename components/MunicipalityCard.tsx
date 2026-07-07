import { getLocale } from "next-intl/server";
import { IconArrowRight, IconProfessional } from "@/components/icons";
import type { AppLocale } from "@/i18n/config";
import { getMunicipalityCardContent } from "@/lib/site";

export default async function MunicipalityCard() {
  const locale = (await getLocale()) as AppLocale;
  const content = getMunicipalityCardContent(locale);

  return (
    <article className="card municipality-card" id={content.anchorId}>
      <div className="municipality-card__main">
        <span className="card-icon card-icon-council" aria-hidden="true">
          <IconProfessional className="svg-icon" />
        </span>
        <div className="municipality-card__copy">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
      </div>
      <a
        className="icon-button municipality-card__action"
        href={content.profileHref}
        rel="noreferrer"
        target="_blank"
        aria-label={content.profileAria}
      >
        <IconArrowRight className="svg-icon svg-icon-sm" />
      </a>
    </article>
  );
}
