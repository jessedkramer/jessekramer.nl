import "server-only";

import fs from "fs";
import path from "path";
import type { AppLocale } from "@/i18n/config";
import {
  JOURNAL_ARCHIVED_DIR,
  JOURNAL_DIR,
  JOURNAL_LIFECYCLE_DIRS,
  JOURNAL_TRASH_DIR,
} from "@/lib/content/paths";
import { toJournalListEntry } from "@/lib/journal-display";
import {
  isPublishedJournalStatus,
  resolveJournalStatus,
} from "@/lib/journal/lifecycle";
import {
  getOrderedJournalCategoryIds,
  isValidJournalCategory,
} from "@/lib/journal/categories";
import type {
  JournalFrontmatter,
  JournalInventoryEntry,
  JournalListEntry,
  JournalPost,
  JournalStorageLocation,
} from "@/types/journal";

const EN_CONTENT_DELIMITER = "\n---en---\n";

export function hasEnglishBody(post: Pick<JournalPost, "contentEn">): boolean {
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

    if (key === "status") {
      data.status = value as JournalFrontmatter["status"];
      continue;
    }

    if (key === "title") data.title = value;
    if (key === "titleEn") data.titleEn = value;
    if (key === "date") data.date = value;
    if (key === "category") data.category = value;
    if (key === "excerpt") data.excerpt = value;
    if (key === "excerptEn") data.excerptEn = value;
    if (key === "cover") data.cover = value;
    if (key === "canonical") data.canonical = value;
    if (key === "updatedDate") data.updatedDate = value;
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

function listJournalFilesInDir(
  directory: string,
  location: JournalStorageLocation,
): Array<{ fileName: string; location: JournalStorageLocation }> {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        /\.(md|mdx)$/i.test(entry.name) &&
        !entry.name.startsWith("_"),
    )
    .map((entry) => ({ fileName: entry.name, location }));
}

function listAllJournalFiles(): Array<{
  fileName: string;
  location: JournalStorageLocation;
}> {
  const activeFiles = listJournalFilesInDir(JOURNAL_DIR, "active").filter(
    ({ fileName }) => {
      const fullPath = path.join(JOURNAL_DIR, fileName);
      return fs.statSync(fullPath).isFile();
    },
  );

  return [
    ...activeFiles,
    ...listJournalFilesInDir(JOURNAL_ARCHIVED_DIR, "archived"),
    ...listJournalFilesInDir(JOURNAL_TRASH_DIR, "trash"),
  ];
}

function readJournalRawFile(
  fileName: string,
  location: JournalStorageLocation,
): {
  slug: string;
  data: Partial<JournalFrontmatter>;
  content: string;
  contentEn?: string;
  location: JournalStorageLocation;
} | null {
  const directory = JOURNAL_LIFECYCLE_DIRS[location];
  const filePath = path.join(directory, fileName);
  if (!fs.existsSync(filePath)) return null;

  const slug = fileName.replace(/\.(md|mdx)$/i, "");
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content: rawContent } = parseFrontmatter(raw);
  const { content, contentEn } = splitLocalizedContent(rawContent);

  return { slug, data, content, contentEn, location };
}

function readJournalFile(
  fileName: string,
  location: JournalStorageLocation,
): JournalPost | null {
  const parsed = readJournalRawFile(fileName, location);
  if (!parsed) return null;

  const { slug, data, content, contentEn, location: fileLocation } = parsed;
  const status = resolveJournalStatus(fileLocation, data);

  if (
    !data.title ||
    !data.date ||
    !data.category ||
    !isValidJournalCategory(data.category) ||
    !isPublishedJournalStatus(fileLocation, status)
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
    canonical: data.canonical,
    updatedDate: data.updatedDate,
    published: true,
    status,
    content,
    contentEn,
  };
}

export function getAllJournalPosts(): JournalPost[] {
  return listJournalFilesInDir(JOURNAL_DIR, "active")
    .map(({ fileName, location }) => readJournalFile(fileName, location))
    .filter((post): post is JournalPost => post !== null)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getJournalInventory(): JournalInventoryEntry[] {
  const entries: JournalInventoryEntry[] = [];

  for (const { fileName, location } of listAllJournalFiles()) {
    const parsed = readJournalRawFile(fileName, location);
    if (!parsed) continue;

    const status = resolveJournalStatus(location, parsed.data);

    entries.push({
      slug: parsed.slug,
      fileName,
      location,
      status,
      title: parsed.data.title,
      date: parsed.data.date,
      category: parsed.data.category,
      published: parsed.data.published,
      hasEnglishBody: Boolean(parsed.contentEn?.trim()),
    });
  }

  return entries.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getJournalListEntries(
  locale: AppLocale,
  categoryLabels: Record<string, string>,
): JournalListEntry[] {
  return getVisibleJournalPosts(locale).map((post) =>
    toJournalListEntry(post, locale, categoryLabels[post.category]),
  );
}

export function getPublishedJournalPosts(
  locale: AppLocale,
  categoryLabels: Record<string, string>,
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
      return readJournalFile(fileName, "active");
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

export function getJournalCategoryKeys(): string[] {
  return getOrderedJournalCategoryIds();
}

export { JOURNAL_LIFECYCLE_DIRS };
