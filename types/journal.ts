export type JournalCategory = string;

export type JournalLifecycleStatus = "draft" | "published" | "archived" | "trash";

export type JournalStorageLocation = "active" | "archived" | "trash";

export type JournalFrontmatter = {
  title: string;
  titleEn?: string;
  date: string;
  category: JournalCategory;
  excerpt?: string;
  excerptEn?: string;
  cover?: string;
  published?: boolean;
  status?: JournalLifecycleStatus;
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
  status: JournalLifecycleStatus;
};

export type JournalListEntry = {
  slug: string;
  title: string;
  date: string;
  category: JournalCategory;
  categoryLabel: string;
  excerpt?: string;
};

export type JournalInventoryEntry = {
  slug: string;
  fileName: string;
  location: "active" | "archived" | "trash";
  status: JournalLifecycleStatus;
  title?: string;
  date?: string;
  category?: string;
  published?: boolean;
  hasEnglishBody?: boolean;
};
