import "server-only";

import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const SITE_CONTENT_DIR = path.join(CONTENT_DIR, "site");
export const JOURNAL_DIR = path.join(CONTENT_DIR, "journal");
export const JOURNAL_ARCHIVED_DIR = path.join(JOURNAL_DIR, "_archived");
export const JOURNAL_TRASH_DIR = path.join(JOURNAL_DIR, "_trash");
export const JOURNAL_CATEGORIES_FILE = path.join(JOURNAL_DIR, "categories.json");
export const CONTENT_MANIFEST_FILE = path.join(CONTENT_DIR, "manifest.json");
export const CONTENT_CONTRACT_FILE = path.join(CONTENT_DIR, "contract.json");

export const SITE_FILES = {
  branding: path.join(SITE_CONTENT_DIR, "branding.json"),
  links: path.join(SITE_CONTENT_DIR, "links.json"),
  navigation: path.join(SITE_CONTENT_DIR, "navigation.json"),
  footer: path.join(SITE_CONTENT_DIR, "footer.json"),
  currently: path.join(SITE_CONTENT_DIR, "currently.json"),
  socials: path.join(SITE_CONTENT_DIR, "socials.json"),
  homepage: path.join(SITE_CONTENT_DIR, "homepage.json"),
  widgets: {
    about: path.join(SITE_CONTENT_DIR, "widgets", "about.json"),
    municipality: path.join(SITE_CONTENT_DIR, "widgets", "municipality.json"),
    journal: path.join(SITE_CONTENT_DIR, "widgets", "journal.json"),
  },
} as const;

/** Relative paths for tooling (validator, docs). Keep in sync with content/manifest.json */
export const REQUIRED_SITE_FILE_PATHS = [
  "content/site/branding.json",
  "content/site/links.json",
  "content/site/navigation.json",
  "content/site/footer.json",
  "content/site/currently.json",
  "content/site/socials.json",
  "content/site/homepage.json",
  "content/site/widgets/about.json",
  "content/site/widgets/journal.json",
  "content/site/widgets/municipality.json",
  "content/journal/categories.json",
] as const;

export const JOURNAL_LIFECYCLE_DIRS = {
  active: JOURNAL_DIR,
  archived: JOURNAL_ARCHIVED_DIR,
  trash: JOURNAL_TRASH_DIR,
} as const;

export type JournalStorageLocation = keyof typeof JOURNAL_LIFECYCLE_DIRS;
