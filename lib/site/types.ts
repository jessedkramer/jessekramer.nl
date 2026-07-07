import type { LocalizedString } from "@/lib/content/localized";

export type SiteLinks = Record<string, string>;

export type BrandingContent = {
  name: string;
  betaLabel: string;
  tagline: LocalizedString;
  taglineHighlight: LocalizedString;
  logo: {
    src: string;
    alt: LocalizedString;
    width: number;
    height: number;
  };
  metadata: {
    title: LocalizedString;
    description: LocalizedString;
    titleSuffix: string;
  };
};

export type NavigationItem = {
  id: string;
  href?: string;
  hrefKey?: keyof SiteLinks | string;
  external?: boolean;
  icon: "home" | "about" | "journal" | "mail";
  label: LocalizedString;
};

export type NavigationContent = {
  ariaLabel: LocalizedString;
  brandLabel: LocalizedString;
  items: NavigationItem[];
};

export type FooterContent = {
  copyright: LocalizedString;
};

export type CurrentlyLinkSegment = {
  id: string;
  type: "link";
  icon?: string;
  label: LocalizedString;
  value: LocalizedString;
  href: string;
  external?: boolean;
  internal?: boolean;
  mobileOnly?: boolean;
};

export type CurrentlySoundtrackSegment = {
  id: string;
  type: "soundtrack";
  mobileOnly?: boolean;
  label: LocalizedString;
  playingLabel: LocalizedString;
  trackTitle: LocalizedString;
};

export type CurrentlySegment = CurrentlyLinkSegment | CurrentlySoundtrackSegment;

export type CurrentlyContent = {
  ariaLabel: LocalizedString;
  segments: CurrentlySegment[];
};

export type SocialLink = {
  id: string;
  hrefKey: string;
  icon: string;
  label: LocalizedString;
  showInList?: boolean;
};

export type SocialsContent = {
  title: LocalizedString;
  socialListLabel: LocalizedString;
  profileName: LocalizedString;
  linkedinBlockLabel: LocalizedString;
  viewLinkedIn: LocalizedString;
  viewLinkedInAria: LocalizedString;
  links: SocialLink[];
};

export type HomepageWidgetConfig = {
  enabled: boolean;
};

export type HomepageContent = {
  dashboardLabel: LocalizedString;
  layout: {
    desktop: {
      columns: Array<{
        id: string;
        className?: string;
        widgets: string[];
      }>;
    };
    mobileOrder: string[];
  };
  widgets: Record<string, HomepageWidgetConfig>;
};

export type AboutWidgetContent = {
  card: {
    title: LocalizedString;
    paragraphs: LocalizedString[];
    readMoreHref: string;
  };
  page: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    paragraphs: LocalizedString[];
  };
};

export type MunicipalityWidgetContent = {
  anchorId: string;
  eyebrow: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  profileHrefKey: string;
  profileAria: LocalizedString;
};

export type JournalWidgetContent = {
  page: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    lead: LocalizedString;
  };
  card: {
    title: LocalizedString;
    previewCount: number;
  };
};

export type JournalCategoryDefinition = {
  id: string;
  sortOrder: number;
  labels: LocalizedString;
  description: LocalizedString;
};

export type JournalCategoriesFile = {
  categories: JournalCategoryDefinition[];
};

/** Locale-resolved Currently bar content passed to client components. */
export type CurrentlyLinkSegmentContent = {
  id: string;
  type: "link";
  icon?: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  internal?: boolean;
  mobileOnly?: boolean;
};

export type CurrentlySoundtrackSegmentContent = {
  id: string;
  type: "soundtrack";
  mobileOnly?: boolean;
  label: string;
  playingLabel: string;
  trackTitle: string;
};

export type CurrentlySegmentContent =
  | CurrentlyLinkSegmentContent
  | CurrentlySoundtrackSegmentContent;

export type CurrentlyBarContent = {
  ariaLabel: string;
  segments: CurrentlySegmentContent[];
};
