import "server-only";

import type { AppLocale } from "@/i18n/config";
import { pickLocalized, pickLocalizedList } from "@/lib/content/localized";
import { readJsonFile } from "@/lib/content/read-json";
import { SITE_FILES, JOURNAL_CATEGORIES_FILE } from "@/lib/content/paths";
import type {
  AboutWidgetContent,
  BrandingContent,
  CurrentlyContent,
  FooterContent,
  HomepageContent,
  JournalCategoriesFile,
  JournalWidgetContent,
  MunicipalityWidgetContent,
  NavigationContent,
  SiteLinks,
  SocialsContent,
} from "@/lib/site/types";

export function getSiteLinks(): SiteLinks {
  return readJsonFile<SiteLinks>(SITE_FILES.links);
}

export function getSiteLink(key: string): string {
  const links = getSiteLinks();
  const href = links[key];

  if (!href) {
    throw new Error(`Unknown site link key: ${key}`);
  }

  return href;
}

export function getBrandingContent(): BrandingContent {
  return readJsonFile<BrandingContent>(SITE_FILES.branding);
}

export function getNavigationContent(): NavigationContent {
  return readJsonFile<NavigationContent>(SITE_FILES.navigation);
}

export function getFooterContent(): FooterContent {
  return readJsonFile<FooterContent>(SITE_FILES.footer);
}

export function getCurrentlyContent(): CurrentlyContent {
  return readJsonFile<CurrentlyContent>(SITE_FILES.currently);
}

export function getSocialsContent(): SocialsContent {
  return readJsonFile<SocialsContent>(SITE_FILES.socials);
}

export function getHomepageContent(): HomepageContent {
  return readJsonFile<HomepageContent>(SITE_FILES.homepage);
}

export function getAboutWidgetContent(): AboutWidgetContent {
  return readJsonFile<AboutWidgetContent>(SITE_FILES.widgets.about);
}

export function getMunicipalityWidgetContent(): MunicipalityWidgetContent {
  return readJsonFile<MunicipalityWidgetContent>(SITE_FILES.widgets.municipality);
}

export function getJournalWidgetContent(): JournalWidgetContent {
  return readJsonFile<JournalWidgetContent>(SITE_FILES.widgets.journal);
}

export function getJournalCategoriesFile(): JournalCategoriesFile {
  return readJsonFile<JournalCategoriesFile>(JOURNAL_CATEGORIES_FILE);
}

export function getBrandingForLocale(locale: AppLocale) {
  const branding = getBrandingContent();

  return {
    name: branding.name,
    betaLabel: branding.betaLabel,
    tagline: pickLocalized(branding.tagline, locale),
    taglineHighlight: pickLocalized(branding.taglineHighlight, locale),
    logo: {
      src: branding.logo.src,
      alt: pickLocalized(branding.logo.alt, locale),
      width: branding.logo.width,
      height: branding.logo.height,
    },
    metadata: {
      title: pickLocalized(branding.metadata.title, locale),
      description: pickLocalized(branding.metadata.description, locale),
      titleSuffix: branding.metadata.titleSuffix,
      siteUrl: branding.metadata.siteUrl,
      ogImage: branding.metadata.ogImage,
      twitter: branding.metadata.twitter,
    },
  };
}

export function getAboutCardContent(locale: AppLocale) {
  const about = getAboutWidgetContent();

  return {
    title: pickLocalized(about.card.title, locale),
    paragraphs: pickLocalizedList(about.card.paragraphs, locale),
    readMoreHref: about.card.readMoreHref,
  };
}

export function getAboutPageContent(locale: AppLocale) {
  const about = getAboutWidgetContent();

  return {
    eyebrow: pickLocalized(about.page.eyebrow, locale),
    title: pickLocalized(about.page.title, locale),
    paragraphs: pickLocalizedList(about.page.paragraphs, locale),
    sections: about.page.sections.map((section) => ({
      id: section.id,
      title: pickLocalized(section.title, locale),
      paragraphs: pickLocalizedList(section.paragraphs, locale),
      vision: section.vision
        ? {
            title: pickLocalized(section.vision.title, locale),
            text: pickLocalized(section.vision.text, locale),
          }
        : undefined,
    })),
  };
}

/** Localized journal widget content for the index page and homepage card. */
export function getJournalPageContent(locale: AppLocale) {
  const journal = getJournalWidgetContent();

  return {
    eyebrow: pickLocalized(journal.page.eyebrow, locale),
    title: pickLocalized(journal.page.title, locale),
    lead: pickLocalized(journal.page.lead, locale),
    cardTitle: pickLocalized(journal.card.title, locale),
    previewCount: journal.card.previewCount,
  };
}

export function getMunicipalityCardContent(locale: AppLocale) {
  const municipality = getMunicipalityWidgetContent();

  return {
    anchorId: municipality.anchorId,
    eyebrow: pickLocalized(municipality.eyebrow, locale),
    title: pickLocalized(municipality.title, locale),
    description: pickLocalized(municipality.description, locale),
    profileHref: getSiteLink(municipality.profileHrefKey),
    profileAria: pickLocalized(municipality.profileAria, locale),
  };
}

export function getSocialsCardContent(locale: AppLocale) {
  const socials = getSocialsContent();
  const links = getSiteLinks();

  return {
    title: pickLocalized(socials.title, locale),
    socialListLabel: pickLocalized(socials.socialListLabel, locale),
    profileName: pickLocalized(socials.profileName, locale),
    linkedinBlockLabel: pickLocalized(socials.linkedinBlockLabel, locale),
    viewLinkedIn: pickLocalized(socials.viewLinkedIn, locale),
    viewLinkedInAria: pickLocalized(socials.viewLinkedInAria, locale),
    links: socials.links.map((link) => ({
      ...link,
      label: pickLocalized(link.label, locale),
      href: links[link.hrefKey] ?? "",
    })),
  };
}

export function getCurrentlyBarContent(locale: AppLocale) {
  const currently = getCurrentlyContent();

  return {
    ariaLabel: pickLocalized(currently.ariaLabel, locale),
    segments: currently.segments.map((segment) => {
      if (segment.type === "soundtrack") {
        return {
          ...segment,
          label: pickLocalized(segment.label, locale),
          playingLabel: pickLocalized(segment.playingLabel, locale),
          trackTitle: pickLocalized(segment.trackTitle, locale),
        };
      }

      return {
        ...segment,
        label: pickLocalized(segment.label, locale),
        value: pickLocalized(segment.value, locale),
      };
    }),
  };
}

export function getFooterContentForLocale(locale: AppLocale) {
  const footer = getFooterContent();
  const branding = getBrandingContent();

  return {
    name: branding.name,
    betaLabel: branding.betaLabel,
    // Footer slogan is always English, even in Dutch mode.
    tagline: branding.tagline.en,
    taglineHighlight: branding.taglineHighlight.en,
    copyright: pickLocalized(footer.copyright, locale),
  };
}

export function getNavigationForLocale(locale: AppLocale) {
  const navigation = getNavigationContent();
  const links = getSiteLinks();

  return {
    ariaLabel: pickLocalized(navigation.ariaLabel, locale),
    brandLabel: pickLocalized(navigation.brandLabel, locale),
    items: navigation.items.map((item) => ({
      ...item,
      label: pickLocalized(item.label, locale),
      href: item.href ?? (item.hrefKey ? links[item.hrefKey] : "/"),
    })),
  };
}
