"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatJournalDate } from "@/lib/format";
import { JOURNAL_POSTS_PER_PAGE } from "@/lib/journal-constants";
import type { JournalListEntry } from "@/types/journal";
import { ORDERED_JOURNAL_CATEGORIES } from "@/types/journal";

type JournalIndexProps = {
  posts: JournalListEntry[];
  locale: string;
  initialQuery?: string;
  initialCategory?: string;
  initialPage?: number;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function matchesQuery(post: JournalListEntry, query: string) {
  if (!query) return true;

  const haystack = [post.title, post.excerpt ?? "", post.categoryLabel]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function buildJournalUrl(
  pathname: string,
  query: string,
  category: string,
  page: number,
) {
  const params = new URLSearchParams();

  if (query.trim()) params.set("q", query.trim());
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));

  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

export default function JournalIndex({
  posts,
  locale,
  initialQuery = "",
  initialCategory = "",
  initialPage = 1,
}: JournalIndexProps) {
  const t = useTranslations("journalPage");
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);

  const replaceUrl = useCallback(
    (nextQuery: string, nextCategory: string, nextPage: number) => {
      const url = buildJournalUrl(
        window.location.pathname,
        nextQuery,
        nextCategory,
        nextPage,
      );

      window.history.replaceState(window.history.state, "", url);
    },
    [],
  );

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);

      setQuery(params.get("q") ?? "");
      setCategory(params.get("category") ?? "");
      setPage(Number.parseInt(params.get("page") ?? "1", 10) || 1);
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      replaceUrl(query, category, page);
    }, 280);

    return () => window.clearTimeout(timer);
  }, [category, page, query, replaceUrl]);

  const categories = useMemo(() => {
    const map = new Map<string, string>();

    for (const post of posts) {
      map.set(post.category, post.categoryLabel);
    }

    return ORDERED_JOURNAL_CATEGORIES.filter((key) => map.has(key)).map(
      (key) => [key, map.get(key)!] as const,
    );
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = normalize(query);

    return posts.filter((post) => {
      if (category && post.category !== category) {
        return false;
      }

      return matchesQuery(post, normalizedQuery);
    });
  }, [category, posts, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / JOURNAL_POSTS_PER_PAGE),
  );
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [currentPage, page]);
  const pagePosts = filteredPosts.slice(
    (currentPage - 1) * JOURNAL_POSTS_PER_PAGE,
    currentPage * JOURNAL_POSTS_PER_PAGE,
  );

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleCategoryChange = (nextCategory: string) => {
    setCategory(nextCategory);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (posts.length === 0) {
    return (
      <section className="card journal-empty journal-empty-page">
        <p>{t("emptyTitle")}</p>
        <p className="journal-empty-hint">
          {t("emptyHintBefore")} <code>content/journal/</code>{" "}
          {t("emptyHintAfter")} <code>published: true</code> {t("emptyHintEnd")}
        </p>
      </section>
    );
  }

  return (
    <div className="journal-index">
      <section className="card journal-toolbar" aria-label={t("toolbarLabel")}>
        <label className="journal-search">
          <span className="journal-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm8.78 13.22-3.9-3.9 1.42-1.42 3.9 3.9-1.42 1.42Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchLabel")}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </label>

        <div className="journal-category-filter" role="group" aria-label={t("categoryLabel")}>
          <button
            type="button"
            className={`journal-category-chip${!category ? " is-active" : ""}`}
            onClick={() => handleCategoryChange("")}
          >
            {t("allCategories")}
          </button>
          {categories.map(([categoryKey, categoryLabel]) => (
            <button
              key={categoryKey}
              type="button"
              className={`journal-category-chip${category === categoryKey ? " is-active" : ""}`}
              onClick={() => handleCategoryChange(categoryKey)}
            >
              {categoryLabel}
            </button>
          ))}
        </div>

        <p className="journal-results-meta" aria-live="polite">
          {t("resultsCount", { count: filteredPosts.length })}
        </p>
      </section>

      <div className="journal-results-panel">
        {filteredPosts.length === 0 ? (
          <section className="card journal-empty journal-empty-page">
            <p>{t("noResultsTitle")}</p>
            <p className="journal-empty-hint">{t("noResultsHint")}</p>
          </section>
        ) : (
          <>
            <section className="journal-index-list">
              {pagePosts.map((post) => (
                <Link
                  key={post.slug}
                  className="card journal-index-item"
                  href={`/journal/${post.slug}`}
                >
                  <p className="journal-index-meta">
                    {formatJournalDate(post.date, locale)} · {post.categoryLabel}
                  </p>
                  <h2>{post.title}</h2>
                  {post.excerpt ? <p>{post.excerpt}</p> : null}
                </Link>
              ))}
            </section>

            {totalPages > 1 ? (
              <nav
                className="journal-pagination"
                aria-label={t("paginationLabel")}
              >
                <button
                  type="button"
                  className="journal-page-btn"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {t("previousPage")}
                </button>

                <div className="journal-page-list">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        className={`journal-page-btn journal-page-number${pageNumber === currentPage ? " is-active" : ""}`}
                        aria-current={
                          pageNumber === currentPage ? "page" : undefined
                        }
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="journal-page-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {t("nextPage")}
                </button>
              </nav>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
