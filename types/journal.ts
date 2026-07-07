export type JournalCategory = string;

export type JournalFrontmatter = {
  title: string;
  titleEn?: string;
  date: string;
  category: JournalCategory;
  excerpt?: string;
  excerptEn?: string;
  cover?: string;
  published: boolean;
  draft?: boolean;
  featured?: boolean;
  pinned?: boolean;
  tags?: string[];
  updatedDate?: string;
  readingTime?: number;
  series?: string;
  canonical?: string;
};

export type JournalPost = JournalFrontmatter & {
  slug: string;
  content: string;
  contentEn?: string;
};

export type JournalListEntry = {
  slug: string;
  title: string;
  date: string;
  category: JournalCategory;
  categoryLabel: string;
  excerpt?: string;
};

export type JournalLifecycleStatus = "draft" | "published" | "archived";
