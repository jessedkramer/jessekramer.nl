import "server-only";

import fs from "fs";
import path from "path";
import type { AppLocale } from "@/i18n/config";
import { JOURNAL_DIR } from "@/lib/content-paths";
import { JOURNAL_POSTS_PER_PAGE } from "@/lib/journal-constants";
import { toJournalListEntry } from "@/lib/journal-display";
import type {
  JournalCategory,
  JournalFrontmatter,
  JournalListEntry,
  JournalPost,
} from "@/types/journal";
import { ORDERED_JOURNAL_CATEGORIES } from "@/types/journal";

const EN_CONTENT_DELIMITER = "\n---en---\n";
const JOURNAL_CATEGORIES = new Set<JournalCategory>(ORDERED_JOURNAL_CATEGORIES);

export function hasEnglishBody(post: JournalPost): boolean {
  return Boolean(post.contentEn?.trim());
}

export function isJournalPostVisibleInLocale(
  post: JournalPost,
  locale: AppLocale,
): boolean {
  if (locale === "en") {
    return hasEnglishBody(post);
  }

  return true;
}

function getVisibleJournalPosts(locale: AppLocale): JournalPost[] {
  return getAllJournalPosts().filter((post) =>
    isJournalPostVisibleInLocale(post, locale),
  );
}

export { JOURNAL_POSTS_PER_PAGE } from "@/lib/journal-constants";

/**
 * Add a journal article as a Markdown file in content/journal/.
 *
 * Example frontmatter:
 * ---
 * title: Artikel titel
 * titleEn: Article title
 * date: 2026-07-06
 * category: technology
 * excerpt: Korte samenvatting.
 * excerptEn: Short summary.
 * published: true
 * ---
 *
 * Optional English body after `---en---` in the file.
 */
function parseFrontmatter(raw: string): {
  data: Partial<JournalFrontmatter>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const data: Partial<JournalFrontmatter> = {};

  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    if (key === "published") {
      data.published = value === "true";
      continue;
    }

    if (key === "title") data.title = value;
    if (key === "titleEn") data.titleEn = value;
    if (key === "date") data.date = value;
    if (key === "category") data.category = value as JournalCategory;
    if (key === "excerpt") data.excerpt = value;
    if (key === "excerptEn") data.excerptEn = value;
    if (key === "cover") data.cover = value;
  }

  return { data, content: match[2].trim() };
}

function splitLocalizedContent(rawContent: string): {
  content: string;
  contentEn?: string;
} {
  const delimiterIndex = rawContent.indexOf(EN_CONTENT_DELIMITER);

  if (delimiterIndex === -1) {
    return { content: rawContent.trim() };
  }

  return {
    content: rawContent.slice(0, delimiterIndex).trim(),
    contentEn: rawContent.slice(delimiterIndex + EN_CONTENT_DELIMITER.length).trim(),
  };
}

function readJournalFile(fileName: string): JournalPost | null {
  const slug = fileName.replace(/\.(md|mdx)$/i, "");
  const filePath = path.join(JOURNAL_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content: rawContent } = parseFrontmatter(raw);
  const { content, contentEn } = splitLocalizedContent(rawContent);

  if (
    !data.title ||
    !data.date ||
    !data.category ||
    !JOURNAL_CATEGORIES.has(data.category) ||
    data.published !== true
  ) {
    return null;
  }

  return {
    slug,
    title: data.title,
    titleEn: data.titleEn,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt,
    excerptEn: data.excerptEn,
    cover: data.cover,
    published: true,
    content,
    contentEn,
  };
}

export function getAllJournalPosts(): JournalPost[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];

  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((file) => /\.(md|mdx)$/i.test(file) && !file.startsWith("_"))
    .map(readJournalFile)
    .filter((post): post is JournalPost => post !== null)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getJournalListEntries(
  locale: AppLocale,
  categoryLabels: Record<JournalCategory, string>,
): JournalListEntry[] {
  return getVisibleJournalPosts(locale).map((post) =>
    toJournalListEntry(post, locale, categoryLabels[post.category]),
  );
}

export function getPublishedJournalPosts(
  locale: AppLocale,
  categoryLabels: Record<JournalCategory, string>,
  limit?: number,
): JournalListEntry[] {
  const posts = getJournalListEntries(locale, categoryLabels);
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

export function getJournalPost(slug: string): JournalPost | null {
  for (const extension of ["md", "mdx"]) {
    const fileName = `${slug}.${extension}`;
    const filePath = path.join(JOURNAL_DIR, fileName);
    if (fs.existsSync(filePath)) {
      return readJournalFile(fileName);
    }
  }

  return null;
}

export function getJournalSlugs(): string[] {
  return getAllJournalPosts().map((post) => post.slug);
}

export function getJournalSlugsForLocale(locale: AppLocale): string[] {
  return getVisibleJournalPosts(locale).map((post) => post.slug);
}

export function getJournalCategoryKeys(): JournalCategory[] {
  return [...ORDERED_JOURNAL_CATEGORIES];
}
