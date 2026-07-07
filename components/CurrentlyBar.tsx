"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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

type CurrentlyBarProps = {
  compact?: boolean;
};

export default function CurrentlyBar({ compact = false }: CurrentlyBarProps) {
  const t = useTranslations("currently");
  const tLanguage = useTranslations("language");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initPurpleSkylinePlayer();

    return subscribePurpleSkylinePlayer(({ isPlaying, isReady }) => {
      setIsPlaying(isPlaying);
      setIsReady(isReady);
    });
  }, []);

  const musicLabel = isPlaying ? t("pauseMusic") : t("playMusic");

  return (
    <section
      className={`currently-bar${compact ? " currently-bar--compact" : ""}`}
      aria-label={t("ariaLabel")}
    >
      <div className="currently-pills">
        <a
          className="currently-pill currently-pill--static"
          href="https://en.wikipedia.org/wiki/Urk"
          rel="noreferrer"
          target="_blank"
        >
          <span className="currently-icon" aria-hidden="true">
            📍
          </span>
          <span className="currently-copy">
            <span className="currently-label">{t("locationLabel")}</span>
            <span className="currently-value">{t("locationValue")}</span>
          </span>
        </a>

        <button
          className={`currently-pill currently-pill--music currently-pill--mobile-only${isPlaying ? " is-playing" : " is-paused"}`}
          type="button"
          onClick={() => void togglePurpleSkylinePlayback()}
          aria-label={musicLabel}
          aria-pressed={isPlaying}
          disabled={!isReady}
        >
          <span className="currently-copy">
            <span className="currently-label">
              {isPlaying ? t("nowPlayingLabel") : t("soundtrackLabel")}
            </span>
            <span className="currently-value-row">
              <span className="currently-value">{t("trackTitle")}</span>
              <span className="currently-music-toggle" aria-hidden="true">
                <MusicControlIcon playing={isPlaying} />
              </span>
            </span>
          </span>
        </button>

        <div className="currently-locale">
          <span className="currently-copy">
            <span className="currently-label">{tLanguage("label")}</span>
            <LanguageSwitcher />
          </span>
        </div>

        <Link
          className="currently-pill currently-pill--static"
          href="/"
        >
          <span className="currently-icon" aria-hidden="true">
            ✨
          </span>
          <span className="currently-copy">
            <span className="currently-label">{t("projectLabel")}</span>
            <span className="currently-value">{t("projectValue")}</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
