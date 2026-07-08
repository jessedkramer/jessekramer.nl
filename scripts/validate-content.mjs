#!/usr/bin/env node
/**
 * Content validation for jessekramer.nl (v2.0).
 * Registry-first: reads content/manifest.json as the source of required files.
 */

import fs from "node:fs";
import path from "node:path";
import {
  collectLocalizedWarnings,
  extractInternalLinks,
  extractMarkdownImages,
  fileExists,
  listJournalArticles,
  parseFrontmatter,
  PRIVACY_PATTERNS,
  readJson,
  resolveJournalStatus,
} from "./lib/content-utils.mjs";

const root = process.cwd();
const errors = [];
const warnings = [];

function pushError(message) {
  errors.push(message);
}

function pushWarning(message) {
  warnings.push(message);
}

function assertHrefKey(relativePath, context, hrefKey, links) {
  if (!hrefKey) return;
  if (!links?.[hrefKey]) {
    pushError(`${relativePath}: ${context} references unknown hrefKey "${hrefKey}"`);
  }
}

const manifestResult = readJson(root, "content/manifest.json");
if (manifestResult.error) pushError(manifestResult.error);
const manifest = manifestResult.data;

const contractResult = readJson(root, "content/contract.json");
if (contractResult.error) pushWarning(contractResult.error);

const requiredSiteFiles = manifest?.siteFiles ?? [];
const jsonCache = new Map();

for (const file of requiredSiteFiles) {
  const result = readJson(root, file);
  if (result.error) pushError(result.error);
  else jsonCache.set(file, result.data);
}

const links = jsonCache.get("content/site/links.json");
const categories = jsonCache.get("content/journal/categories.json");
const homepage = jsonCache.get("content/site/homepage.json");
const currently = jsonCache.get("content/site/currently.json");
const navigation = jsonCache.get("content/site/navigation.json");
const socials = jsonCache.get("content/site/socials.json");
const municipality = jsonCache.get("content/site/widgets/municipality.json");
const branding = jsonCache.get("content/site/branding.json");

for (const file of requiredSiteFiles) {
  const data = jsonCache.get(file);
  if (file !== "content/site/links.json" && data) {
    for (const warning of collectLocalizedWarnings(file, data)) {
      pushWarning(warning);
    }
  }
}

if (branding?.metadata) {
  if (!branding.metadata.siteUrl) {
    pushWarning("content/site/branding.json: missing metadata.siteUrl");
  }
  if (!branding.metadata.description?.nl || !branding.metadata.description?.en) {
    pushWarning("content/site/branding.json: missing SEO description for one or more locales");
  }
  if (!branding.metadata.ogImage) {
    pushWarning("content/site/branding.json: missing metadata.ogImage");
  } else if (!fileExists(root, branding.metadata.ogImage.replace(/^\//, "public/"))) {
    pushWarning(`content/site/branding.json: ogImage not found at public${branding.metadata.ogImage}`);
  }
  if (!branding.metadata.twitter?.card) {
    pushWarning("content/site/branding.json: missing metadata.twitter.card");
  }
}

if (categories?.categories) {
  const ids = categories.categories.map((category) => category.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    pushError(`Duplicate journal category ids: ${duplicateIds.join(", ")}`);
  }

  const categorySet = new Set(ids);
  const articles = manifest ? listJournalArticles(root, manifest) : [];
  const slugs = articles.map((article) => article.slug);
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    pushError(`Duplicate journal slugs across lifecycle folders: ${duplicateSlugs.join(", ")}`);
  }

  const publishedSlugs = new Set(
    articles
      .filter((article) => {
        const raw = fs.readFileSync(article.absolutePath, "utf8");
        const { data } = parseFrontmatter(raw);
        return resolveJournalStatus(article.location, data) === "published";
      })
      .map((article) => article.slug),
  );

  for (const article of articles) {
    const raw = fs.readFileSync(article.absolutePath, "utf8");
    const { data, content, contentEn } = parseFrontmatter(raw);
    const status = resolveJournalStatus(article.location, data);
    const label = article.filePath;

    if (!raw.match(/^---\r?\n[\s\S]*?\r?\n---/)) {
      pushWarning(`${label}: missing frontmatter`);
      continue;
    }

    if (!data.title) pushWarning(`${label}: missing title in frontmatter`);
    if (!data.date) pushWarning(`${label}: missing date in frontmatter`);
    if (!data.category) {
      pushWarning(`${label}: missing category in frontmatter`);
    } else if (!categorySet.has(data.category)) {
      pushError(`${label}: unknown category "${data.category}"`);
    }

    if (status === "published" && article.location !== "active") {
      pushWarning(`${label}: lifecycle mismatch — published status outside active folder`);
    }
    if ((status === "archived" || status === "trash") && article.location === "active") {
      pushWarning(`${label}: status "${status}" should use _${status === "trash" ? "trash" : "archived"}/ folder`);
    }
    if (status === "published" && !content.trim()) {
      pushWarning(`${label}: published article has empty body`);
    }
    if ((data.titleEn || data.excerptEn) && !contentEn.trim()) {
      pushWarning(`${label}: English metadata without ---en--- body`);
    }
    if (status === "published" && article.location === "active" && !data.excerpt && !content.trim()) {
      pushWarning(`${label}: missing SEO description/excerpt`);
    }
    if (data.cover && !fileExists(root, data.cover.replace(/^\//, "public/"))) {
      pushWarning(`${label}: cover image not found at public${data.cover}`);
    }

    for (const image of extractMarkdownImages(content + contentEn)) {
      if (image.src.startsWith("http")) continue;
      if (!image.src.startsWith("/")) {
        pushWarning(`${label}: relative image path should start with / (${image.src})`);
        continue;
      }
      if (!fileExists(root, image.src.replace(/^\//, "public/"))) {
        pushWarning(`${label}: missing referenced image public${image.src}`);
      }
      if (!image.alt?.trim()) {
        pushWarning(`${label}: image missing alt text (${image.src})`);
      }
    }

    for (const link of extractInternalLinks(content + contentEn)) {
      if (!link.href.startsWith("/journal/")) continue;
      const linkedSlug = link.href.replace(/^\/journal\//, "").replace(/\/$/, "");
      if (!publishedSlugs.has(linkedSlug)) {
        pushWarning(`${label}: broken internal journal link ${link.href}`);
      }
    }

    for (const pattern of PRIVACY_PATTERNS) {
      if (pattern.test(raw)) {
        pushWarning(`${label}: potential privacy-sensitive content detected`);
        break;
      }
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
        pushError(`Homepage column "${column.id}" references unknown widget "${widgetId}"`);
      }
    }
  }

  for (const widgetId of enabledIds) {
    if (!layoutIds.has(widgetId)) {
      pushWarning(`Enabled homepage widget "${widgetId}" is not placed in desktop layout`);
    }
  }

  for (const widgetId of homepage.layout?.mobileOrder ?? []) {
    if (!knownIds.has(widgetId)) {
      pushError(`Homepage mobileOrder references unknown widget "${widgetId}"`);
    }
  }

  for (const widgetId of enabledIds) {
    if (!(homepage.layout?.mobileOrder ?? []).includes(widgetId)) {
      pushWarning(`Enabled homepage widget "${widgetId}" is missing from mobileOrder`);
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
      pushError(`Currently segment "${segment.id}" internal href must start with "/"`);
    }

    if (!segment.internal && !segment.external && !segment.href.startsWith("/")) {
      if (!/^https?:\/\//.test(segment.href)) {
        pushError(`Currently segment "${segment.id}" has invalid external href "${segment.href}"`);
      }
    }
  }
}

if (branding?.logo?.src && !fileExists(root, branding.logo.src.replace(/^\//, "public/"))) {
  pushWarning(`content/site/branding.json: logo not found at public${branding.logo.src}`);
}

const audioSrc = "public/audio/purple-skyline.mp3";
if (!fileExists(root, audioSrc)) {
  pushWarning("Missing soundtrack file public/audio/purple-skyline.mp3");
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
