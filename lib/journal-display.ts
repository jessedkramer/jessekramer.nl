import type { AppLocale } from "@/i18n/routing";
import type { JournalListEntry, JournalPost } from "@/types/journal";

export function localizeJournalPost(
  post: JournalPost,
  locale: AppLocale | string,
): Pick<JournalPost, "slug" | "title" | "excerpt" | "content" | "date" | "category"> {
  const useEnglish = locale === "en";

  return {
    slug: post.slug,
    title: useEnglish && post.titleEn ? post.titleEn : post.title,
    excerpt: useEnglish && post.excerptEn ? post.excerptEn : post.excerpt,
    content: useEnglish && post.contentEn ? post.contentEn : post.content,
    date: post.date,
    category: post.category,
  };
}

export function toJournalListEntry(
  post: JournalPost,
  locale: AppLocale | string,
  categoryLabel: string,
): JournalListEntry {
  const localized = localizeJournalPost(post, locale);

  return {
    slug: localized.slug,
    title: localized.title,
    date: localized.date,
    category: localized.category,
    categoryLabel,
    excerpt: localized.excerpt,
  };
}
