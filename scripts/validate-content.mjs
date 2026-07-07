#!/usr/bin/env node
/**
 * Validates content/config integrity for jessekramer.nl.
 * Run with: npm run validate:content
 */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

function readJson(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing file: ${relativePath}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${relativePath}: ${error.message}`);
    return null;
  }
}

function listMarkdownArticles() {
  const journalDir = path.join(root, "content/journal");
  if (!fs.existsSync(journalDir)) {
    errors.push("Missing directory: content/journal");
    return [];
  }

  return fs
    .readdirSync(journalDir)
    .filter((file) => /\.(md|mdx)$/i.test(file) && !file.startsWith("_"));
}

function assertHrefKey(relativePath, context, hrefKey, links) {
  if (!hrefKey) return;
  if (!links?.[hrefKey]) {
    errors.push(`${relativePath}: ${context} references unknown hrefKey "${hrefKey}"`);
  }
}

function collectLocalizedWarnings(relativePath, value, pathParts = []) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if ("nl" in value || "en" in value) {
      if (!value.nl || !value.en) {
        warnings.push(
          `${relativePath}: incomplete localization at ${pathParts.join(".") || "(root)"}`,
        );
      }
      return;
    }

    for (const [key, nested] of Object.entries(value)) {
      collectLocalizedWarnings(relativePath, nested, [...pathParts, key]);
    }
  }
}

const requiredSiteFiles = [
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
];

for (const file of requiredSiteFiles) {
  readJson(file);
}

const links = readJson("content/site/links.json");
const categories = readJson("content/journal/categories.json");
const homepage = readJson("content/site/homepage.json");
const currently = readJson("content/site/currently.json");
const navigation = readJson("content/site/navigation.json");
const socials = readJson("content/site/socials.json");
const municipality = readJson("content/site/widgets/municipality.json");

for (const file of requiredSiteFiles) {
  const data = readJson(file);
  if (file !== "content/site/links.json" && data) {
    collectLocalizedWarnings(file, data);
  }
}

if (categories?.categories) {
  const ids = categories.categories.map((category) => category.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate journal category ids: ${duplicateIds.join(", ")}`);
  }

  const categorySet = new Set(ids);
  const slugs = listMarkdownArticles().map((file) => file.replace(/\.(md|mdx)$/i, ""));
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    errors.push(`Duplicate journal slugs: ${duplicateSlugs.join(", ")}`);
  }

  for (const file of listMarkdownArticles()) {
    const raw = fs.readFileSync(path.join(root, "content/journal", file), "utf8");
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) {
      warnings.push(`${file}: missing frontmatter`);
      continue;
    }

    const categoryLine = match[1]
      .split("\n")
      .find((line) => line.startsWith("category:"));

    if (!categoryLine) {
      warnings.push(`${file}: missing category in frontmatter`);
      continue;
    }

    const category = categoryLine.split(":").slice(1).join(":").trim();
    if (!categorySet.has(category)) {
      errors.push(`${file}: unknown category "${category}"`);
    }
  }
}

if (homepage?.widgets) {
  const enabledIds = Object.entries(homepage.widgets)
    .filter(([, widget]) => widget.enabled)
    .map(([id]) => id);
  const knownIds = new Set(Object.keys(homepage.widgets));
  const layoutIds = new Set();

  for (const column of homepage.layout?.desktop?.columns ?? []) {
    for (const widgetId of column.widgets ?? []) {
      layoutIds.add(widgetId);
      if (!knownIds.has(widgetId)) {
        errors.push(`Homepage column "${column.id}" references unknown widget "${widgetId}"`);
      }
    }
  }

  for (const widgetId of enabledIds) {
    if (!layoutIds.has(widgetId)) {
      warnings.push(`Enabled homepage widget "${widgetId}" is not placed in desktop layout`);
    }
  }

  for (const widgetId of homepage.layout?.mobileOrder ?? []) {
    if (!knownIds.has(widgetId)) {
      errors.push(`Homepage mobileOrder references unknown widget "${widgetId}"`);
    }
  }

  for (const widgetId of enabledIds) {
    if (!(homepage.layout?.mobileOrder ?? []).includes(widgetId)) {
      warnings.push(`Enabled homepage widget "${widgetId}" is missing from mobileOrder`);
    }
  }
}

if (navigation?.items && links) {
  for (const item of navigation.items) {
    assertHrefKey("content/site/navigation.json", `nav item "${item.id}"`, item.hrefKey, links);
  }
}

if (socials?.links && links) {
  for (const link of socials.links) {
    assertHrefKey("content/site/socials.json", `social link "${link.id}"`, link.hrefKey, links);
  }
}

if (municipality?.profileHrefKey && links) {
  assertHrefKey(
    "content/site/widgets/municipality.json",
    "municipality profile",
    municipality.profileHrefKey,
    links,
  );
}

if (currently?.segments) {
  for (const segment of currently.segments) {
    if (segment.type !== "link" || !segment.href) continue;

    if (segment.internal && !segment.href.startsWith("/")) {
      errors.push(`Currently segment "${segment.id}" internal href must start with "/"`);
    }

    if (!segment.internal && !segment.external && !segment.href.startsWith("/")) {
      if (!/^https?:\/\//.test(segment.href)) {
        errors.push(`Currently segment "${segment.id}" has invalid external href "${segment.href}"`);
      }
    }
  }
}

if (warnings.length > 0) {
  console.warn("Warnings:");
  for (const warning of warnings) console.warn(`  - ${warning}`);
}

if (errors.length > 0) {
  console.error("Content validation failed:");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log("Content validation passed.");
