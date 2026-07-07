import { getTranslations } from "next-intl/server";
import { X_HANDLE } from "@/lib/x";
import { IconX } from "@/components/icons";

export default async function XTimelineEmbed() {
  const t = await getTranslations("xEmbed");

  return (
    <div className="x-wip" role="status">
      <div className="x-wip-icon" aria-hidden="true">
        <IconX className="svg-icon" />
      </div>
      <p className="x-wip-title">{t("wipTitle")}</p>
      <p className="x-wip-copy">{t("wipCopy", { handle: X_HANDLE })}</p>
    </div>
  );
}
