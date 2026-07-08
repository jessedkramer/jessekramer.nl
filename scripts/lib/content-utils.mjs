import fs from "node:fs";
import path from "node:path";

export function readJson(root, relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    return { error: `Missing file: ${relativePath}`, data: null };
  }

  try {
    return { data: JSON.parse(fs.readFileSync(filePath, "utf8")), error: null };
  } catch (error) {
    return { error: `Invalid JSON in ${relativePath}: ${error.message}`, data: null };
  }
}

export function fileExists(root, relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

export function collectLocalizedWarnings(relativePath, value, pathParts = []) {
  const warnings = [];

  if (value && typeof value === "object" && !Array.isArray(value)) {
    if ("nl" in value || "en" in value) {
      if (!value.nl || !value.en) {
        warnings.push(
          `${relativePath}: incomplete localization at ${pathParts.join(".") || "(root)"}`,
        );
      }
      return warnings;
    }

    for (const [key, nested] of Object.entries(value)) {
      warnings.push(
        ...collectLocalizedWarnings(relativePath, nested, [...pathParts, key]),
      );
    }
  }

  return warnings;
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw.trim(), body: raw.trim() };
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key === "published") data.published = value === "true";
    else if (key === "status") data.status = value;
    else data[key] = value;
  }

  const body = match[2].trim();
  const enDelimiter = "\n---en---\n";
  const enIndex = body.indexOf(enDelimiter);
  const content = enIndex === -1 ? body : body.slice(0, enIndex).trim();
  const contentEn = enIndex === -1 ? "" : body.slice(enIndex + enDelimiter.length).trim();

  return { data, content, contentEn, body };
}

export function resolveJournalStatus(location, data) {
  if (location === "archived") return "archived";
  if (location === "trash") return "trash";
  if (data.status === "archived" || data.status === "trash") return data.status;
  if (data.status === "draft" || data.published === false) return "draft";
  if (data.status === "published" || data.published === true) return "published";
  return "draft";
}

export function listJournalArticles(root, manifest) {
  const journal = manifest.contentTypes.journal.paths;
  const locations = [
    ["active", journal.active],
    ["archived", journal.archived],
    ["trash", journal.trash],
  ];

  const articles = [];

  for (const [location, relativeDir] of locations) {
    const dir = path.join(root, relativeDir);
    if (!fs.existsSync(dir)) continue;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      if (!/\.(md|mdx)$/i.test(entry.name)) continue;
      if (entry.name.startsWith("_")) continue;

      articles.push({
        fileName: entry.name,
        slug: entry.name.replace(/\.(md|mdx)$/i, ""),
        location,
        filePath: path.join(relativeDir, entry.name),
        absolutePath: path.join(dir, entry.name),
      });
    }
  }

  return articles;
}

export function extractMarkdownImages(content) {
  const images = [];
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match = imagePattern.exec(content);
  while (match) {
    images.push({ alt: match[1], src: match[2] });
    match = imagePattern.exec(content);
  }
  return images;
}

export function extractInternalLinks(content) {
  const links = [];
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match = linkPattern.exec(content);
  while (match) {
    links.push({ label: match[1], href: match[2] });
    match = linkPattern.exec(content);
  }
  return links;
}

export const PRIVACY_PATTERNS = [
  /\b\d{10}\b/,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /api[_-]?key\s*[:=]/i,
  /secret\s*[:=]/i,
];
