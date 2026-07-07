import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatJournalDate } from "@/lib/format";
import { buildJournalCategoryLabels } from "@/lib/journal-categories";
import { getPublishedJournalPosts } from "@/lib/journal";
import { IconArrowRight, IconJournal } from "@/components/icons";
import type { AppLocale } from "@/i18n/config";

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
      <header className="journal-card__header section-top">
        <div className="journal-card__title-wrap">
          <h2>
            <span className="card-icon" aria-hidden="true">
              <IconJournal className="svg-icon" />
            </span>
            {t("title")}
          </h2>
          {posts.length > 0 ? (
            <p className="journal-card__subtitle">
              {t("latestCount", { count: posts.length })}
            </p>
          ) : null}
        </div>
        <Link className="text-link journal-card__all-link" href="/journal">
          {t("allArticles")}{" "}
          <IconArrowRight className="svg-icon svg-icon-sm" />
        </Link>
      </header>

      {posts.length === 0 ? (
        <div className="journal-empty">
          <p>{t("emptyTitle")}</p>
          <p className="journal-empty-hint">
            {t("emptyHintBefore")} <code>content/journal/</code>{" "}
            {t("emptyHintAfter")} <code>published: true</code>{" "}
            {t("emptyHintEnd")}
          </p>
        </div>
      ) : (
        <ol className="journal-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link className="journal-item" href={`/journal/${post.slug}`}>
                <span className="journal-item-content">
                  <span className="journal-item-meta">
                    <span className="journal-item-category">
                      {post.categoryLabel}
                    </span>
                    <time
                      className="journal-item-date"
                      dateTime={post.date}
                    >
                      {formatJournalDate(post.date, locale)}
                    </time>
                  </span>
                  <span className="journal-item-title">{post.title}</span>
                  {post.excerpt ? (
                    <span className="journal-item-excerpt">{post.excerpt}</span>
                  ) : null}
                </span>
                <IconArrowRight className="svg-icon svg-icon-sm journal-item-arrow" />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </article>
  );
}
