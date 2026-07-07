"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { CurrentlyBarContent } from "@/lib/site/types";
import {
  initPurpleSkylinePlayer,
  subscribePurpleSkylinePlayer,
  togglePurpleSkylinePlayback,
} from "@/lib/purple-skyline-player";

function MusicControlIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
        <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

type CurrentlyBarClientProps = {
  compact?: boolean;
  content: CurrentlyBarContent;
};

export default function CurrentlyBarClient({
  compact = false,
  content,
}: CurrentlyBarClientProps) {
  const tLanguage = useTranslations("language");
  const tControls = useTranslations("currentlyControls");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initPurpleSkylinePlayer();

    return subscribePurpleSkylinePlayer(({ isPlaying, isReady }) => {
      setIsPlaying(isPlaying);
      setIsReady(isReady);
    });
  }, []);

  const musicLabel = isPlaying ? tControls("pauseMusic") : tControls("playMusic");

  return (
    <section
      className={`currently-bar${compact ? " currently-bar--compact" : ""}`}
      aria-label={content.ariaLabel}
    >
      <div className="currently-pills">
        {content.segments.map((segment) => {
          if (segment.type === "link") {
            const className = "currently-pill currently-pill--static";

            if (segment.internal) {
              return (
                <Link key={segment.id} className={className} href={segment.href}>
                  {segment.icon ? (
                    <span className="currently-icon" aria-hidden="true">
                      {segment.icon}
                    </span>
                  ) : null}
                  <span className="currently-copy">
                    <span className="currently-label">{segment.label}</span>
                    <span className="currently-value">{segment.value}</span>
                  </span>
                </Link>
              );
            }

            return (
              <a
                key={segment.id}
                className={className}
                href={segment.href}
                rel={segment.external ? "noreferrer" : undefined}
                target={segment.external ? "_blank" : undefined}
              >
                {segment.icon ? (
                  <span className="currently-icon" aria-hidden="true">
                    {segment.icon}
                  </span>
                ) : null}
                <span className="currently-copy">
                  <span className="currently-label">{segment.label}</span>
                  <span className="currently-value">{segment.value}</span>
                </span>
              </a>
            );
          }

          return (
            <button
              key={segment.id}
              className={`currently-pill currently-pill--music currently-pill--mobile-only${isPlaying ? " is-playing" : " is-paused"}`}
              type="button"
              onClick={() => void togglePurpleSkylinePlayback()}
              aria-label={musicLabel}
              aria-pressed={isPlaying}
              disabled={!isReady}
            >
              <span className="currently-copy">
                <span className="currently-label">
                  {isPlaying ? segment.playingLabel : segment.label}
                </span>
                <span className="currently-value-row">
                  <span className="currently-value">{segment.trackTitle}</span>
                  <span className="currently-music-toggle" aria-hidden="true">
                    <MusicControlIcon playing={isPlaying} />
                  </span>
                </span>
              </span>
            </button>
          );
        })}

        <div className="currently-locale">
          <span className="currently-copy">
            <span className="currently-label">{tLanguage("label")}</span>
            <LanguageSwitcher />
          </span>
        </div>
      </div>
    </section>
  );
}
