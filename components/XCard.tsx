import { getTranslations } from "next-intl/server";
import XTimelineEmbed from "@/components/XTimelineEmbed";
import { X_PROFILE_URL } from "@/lib/x";
import { IconArrowRight, IconX } from "@/components/icons";

export default async function XCard() {
  const t = await getTranslations("xCard");

  return (
    <article className="card x-card">
      <div className="section-top">
        <h2>
          <span className="card-icon card-icon-x" aria-hidden="true">
            <IconX className="svg-icon" />
          </span>
          {t("title")}
        </h2>
        <a
          className="text-link"
          href={X_PROFILE_URL}
          rel="noreferrer"
          target="_blank"
        >
          {t("viewOnX")} <IconArrowRight className="svg-icon svg-icon-sm" />
        </a>
      </div>
      <XTimelineEmbed />
    </article>
  );
}
