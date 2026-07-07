import "server-only";

import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const SITE_CONTENT_DIR = path.join(CONTENT_DIR, "site");
export const JOURNAL_DIR = path.join(CONTENT_DIR, "journal");
export const JOURNAL_CATEGORIES_FILE = path.join(JOURNAL_DIR, "categories.json");

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
