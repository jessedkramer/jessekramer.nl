export type JournalCategory =
  | "personal"
  | "technology"
  | "design"
  | "travel"
  | "politics"
  | "gaming";

export const ORDERED_JOURNAL_CATEGORIES: JournalCategory[] = [
  "design",
  "gaming",
  "personal",
  "politics",
  "travel",
  "technology",
];

export type JournalFrontmatter = {
  title: string;
  titleEn?: string;
  date: string;
  category: JournalCategory;
  excerpt?: string;
  excerptEn?: string;
  cover?: string;
  published: boolean;
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
