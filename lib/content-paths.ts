import "server-only";

import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const JOURNAL_DIR = path.join(CONTENT_DIR, "journal");
