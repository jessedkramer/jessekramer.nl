import { getTranslations } from "next-intl/server";
import { LINKS } from "@/lib/links";
import {
  IconArrowRight,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconCouncil,
  IconSteam,
  IconX,
} from "@/components/icons";

export default async function SocialsCard() {
  const t = await getTranslations("socialsCard");
  const labels = await getTranslations("socialLabels");

  return (
    <article className="card socials-card" id="socials">
      <h2>
        <span className="card-icon" aria-hidden="true">
          <IconCouncil className="svg-icon" />
        </span>
        {t("title")}
      </h2>
      <div className="socials-layout">
        <div className="social-list" aria-label={t("socialListLabel")}>
          <a
            className="social-row"
            href={LINKS.x}
            rel="noreferrer"
            target="_blank"
          >
            <span className="social-icon" aria-hidden="true">
              <IconX className="svg-icon" />
            </span>
            <span className="social-label">{labels("x")}</span>
            <IconArrowRight className="svg-icon svg-icon-sm social-arrow" />
          </a>
          <a
            className="social-row"
            href={LINKS.steam}
            rel="noreferrer"
            target="_blank"
          >
            <span className="social-icon" aria-hidden="true">
              <IconSteam className="svg-icon" />
            </span>
            <span className="social-label">{labels("steam")}</span>
            <IconArrowRight className="svg-icon svg-icon-sm social-arrow" />
          </a>
          <a
            className="social-row"
            href={LINKS.github}
            rel="noreferrer"
            target="_blank"
          >
            <span className="social-icon" aria-hidden="true">
              <IconGitHub className="svg-icon" />
            </span>
            <span className="social-label">{labels("github")}</span>
            <IconArrowRight className="svg-icon svg-icon-sm social-arrow" />
          </a>
          <a className="social-row" href={LINKS.email}>
            <span className="social-icon" aria-hidden="true">
              <IconMail className="svg-icon" />
            </span>
            <span className="social-label">{labels("email")}</span>
            <IconArrowRight className="svg-icon svg-icon-sm social-arrow" />
          </a>
          <span className="social-separator" aria-hidden="true" />
          <a
            className="social-row social-row--linkedin"
            href={LINKS.linkedin}
            rel="noreferrer"
            target="_blank"
            aria-label={t("viewLinkedInAria")}
          >
            <span className="social-icon social-icon--linkedin" aria-hidden="true">
              <IconLinkedIn className="svg-icon" />
            </span>
            <span className="social-label">{labels("linkedin")}</span>
            <IconArrowRight className="svg-icon svg-icon-sm social-arrow" />
          </a>
        </div>
        <div className="linkedin-block" aria-label={t("linkedinBlockLabel")}>
          <div className="linkedin-logo" aria-hidden="true">
            <IconLinkedIn className="svg-icon svg-icon-lg" />
          </div>
          <h3>Jesse Kramer</h3>
          <a
            className="small-button"
            href={LINKS.linkedin}
            rel="noreferrer"
            target="_blank"
            aria-label={t("viewLinkedInAria")}
          >
            {t("viewLinkedIn")}{" "}
            <IconArrowRight className="svg-icon svg-icon-sm" />
          </a>
        </div>
      </div>
    </article>
  );
}
