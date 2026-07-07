import { getLocale } from "next-intl/server";
import {
  IconArrowRight,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconCouncil,
  IconSteam,
  IconX,
} from "@/components/icons";
import type { AppLocale } from "@/i18n/config";
import { getSocialsCardContent } from "@/lib/site";

const iconMap = {
  x: IconX,
  steam: IconSteam,
  github: IconGitHub,
  email: IconMail,
  linkedin: IconLinkedIn,
} as const;

export default async function SocialsCard() {
  const locale = (await getLocale()) as AppLocale;
  const socials = getSocialsCardContent(locale);
  const iconLinks = socials.links.filter(
    (link) => link.showInList !== false && link.id !== "linkedin",
  );
  const linkedinLink = socials.links.find((link) => link.id === "linkedin");

  return (
    <article className="card socials-card" id="socials">
      <h2>
        <span className="card-icon" aria-hidden="true">
          <IconCouncil className="svg-icon" />
        </span>
        {socials.title}
      </h2>
      <div className="socials-layout">
        <div className="social-list" aria-label={socials.socialListLabel}>
          {iconLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap] ?? IconMail;

            return (
              <a
                key={link.id}
                className="social-row"
                href={link.href}
                rel={link.id === "email" ? undefined : "noreferrer"}
                target={link.id === "email" ? undefined : "_blank"}
              >
                <span className="social-icon" aria-hidden="true">
                  <Icon className="svg-icon" />
                </span>
                <span className="social-label">{link.label}</span>
                <IconArrowRight className="svg-icon svg-icon-sm social-arrow" />
              </a>
            );
          })}
          {linkedinLink ? (
            <>
              <span className="social-separator" aria-hidden="true" />
              <a
                className="social-row social-row--linkedin"
                href={linkedinLink.href}
                rel="noreferrer"
                target="_blank"
                aria-label={socials.viewLinkedInAria}
              >
                <span className="social-icon social-icon--linkedin" aria-hidden="true">
                  <IconLinkedIn className="svg-icon" />
                </span>
                <span className="social-label">{linkedinLink.label}</span>
                <IconArrowRight className="svg-icon svg-icon-sm social-arrow" />
              </a>
            </>
          ) : null}
        </div>
        <div className="linkedin-block" aria-label={socials.linkedinBlockLabel}>
          <div className="linkedin-logo" aria-hidden="true">
            <IconLinkedIn className="svg-icon svg-icon-lg" />
          </div>
          <h3>{socials.profileName}</h3>
          {linkedinLink ? (
            <a
              className="small-button"
              href={linkedinLink.href}
              rel="noreferrer"
              target="_blank"
              aria-label={socials.viewLinkedInAria}
            >
              {socials.viewLinkedIn}{" "}
              <IconArrowRight className="svg-icon svg-icon-sm" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
