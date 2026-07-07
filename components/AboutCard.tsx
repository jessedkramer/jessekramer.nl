import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { IconAbout, IconArrowRight } from "@/components/icons";
import type { AppLocale } from "@/i18n/config";
import { getAboutCardContent } from "@/lib/site";

export default async function AboutCard() {
  const locale = (await getLocale()) as AppLocale;
  const content = getAboutCardContent(locale);
  const t = await getTranslations("aboutCard");

  return (
    <article className="card about-card" id="about">
      <h2>
        <span className="card-icon" aria-hidden="true">
          <IconAbout className="svg-icon" />
        </span>
        {content.title}
      </h2>
      <div className="about-copy">
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link className="small-button about-button" href={content.readMoreHref}>
        {t("readMore")} <IconArrowRight className="svg-icon svg-icon-sm" />
      </Link>
    </article>
  );
}
