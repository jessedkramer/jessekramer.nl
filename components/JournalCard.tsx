import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatJournalDate } from "@/lib/format";
import { buildJournalCategoryLabels } from "@/lib/journal-categories";
import { getPublishedJournalPosts } from "@/lib/journal";
import { IconArrowRight, IconJournal } from "@/components/icons";
import type { AppLocale } from "@/i18n/routing";

export default async function JournalCard() {
  const t = await getTranslations("journalCard");
  const tCategories = await getTranslations("journalCategories");
  const locale = await getLocale();
  const categoryLabels = buildJournalCategoryLabels((key) => tCategories(key));
  const posts = getPublishedJournalPosts(
    locale as AppLocale,
    categoryLabels,
    3,
  );

  return (
    <article className="card journal-card" id="journal">
      <div className="section-top">
        <h2>
          <span className="card-icon" aria-hidden="true">
            <IconJournal className="svg-icon" />
          </span>
          {t("title")}
        </h2>
        <Link className="text-link" href="/journal">
          {t("allArticles")} <IconArrowRight className="svg-icon svg-icon-sm" />
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="journal-empty">
          <p>{t("emptyTitle")}</p>
          <p className="journal-empty-hint">
            {t("emptyHintBefore")} <code>content/journal/</code>{" "}
            {t("emptyHintAfter")} <code>published: true</code> {t("emptyHintEnd")}
          </p>
        </div>
      ) : (
        <div className="journal-posts">
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="post-card"
              href={`/journal/${post.slug}`}
            >
              <h3>{post.title}</h3>
              {post.excerpt ? <p>{post.excerpt}</p> : null}
              <small>
                {formatJournalDate(post.date, locale)} · {post.categoryLabel}
              </small>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
