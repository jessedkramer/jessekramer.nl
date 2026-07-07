/** Runtime behavior — not visitor-facing content. */
export const siteConfig = {
  locales: ["nl", "en"] as const,
  defaultLocale: "nl" as const,
  journal: {
    postsPerPage: 4,
  },
  audio: {
    mobileMaxWidthPx: 640,
    volume: 0.25,
    loop: true,
    storageKey: "jessekramer.purple-skyline.playing",
    src: "/audio/purple-skyline.mp3",
  },
} as const;

export type SiteConfig = typeof siteConfig;
