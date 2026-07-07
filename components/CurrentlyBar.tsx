"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  PURPLE_SKYLINE_SRC,
  PURPLE_SKYLINE_STORAGE_KEY,
} from "@/lib/audio";

function readStoredPlaying(): boolean | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(PURPLE_SKYLINE_STORAGE_KEY);
  if (value === "false") return false;
  if (value === "true") return true;
  return null;
}

function storePlaying(playing: boolean) {
  window.localStorage.setItem(
    PURPLE_SKYLINE_STORAGE_KEY,
    playing ? "true" : "false",
  );
}

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

export default function CurrentlyBar() {
  const t = useTranslations("currently");
  const tLanguage = useTranslations("language");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const attemptPlay = useCallback(async (persist = true) => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      await audio.play();
      setIsPlaying(true);
      if (persist) storePlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, []);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    storePlaying(false);
  }, []);

  useEffect(() => {
    const audio = new Audio(PURPLE_SKYLINE_SRC);
    audio.loop = true;
    audio.volume = 0.25;
    audio.preload = "auto";
    audioRef.current = audio;

    const stored = readStoredPlaying();
    const shouldAutoplay = stored !== false;

    const startPlayback = async () => {
      if (!shouldAutoplay) {
        setIsPlaying(false);
        setIsReady(true);
        return;
      }

      const started = await attemptPlay(true);
      setIsReady(true);

      if (started || !shouldAutoplay) return;

      const resumeOnInteraction = () => {
        void attemptPlay(true);
        window.removeEventListener("pointerdown", resumeOnInteraction);
        window.removeEventListener("keydown", resumeOnInteraction);
      };

      window.addEventListener("pointerdown", resumeOnInteraction, { once: true });
      window.addEventListener("keydown", resumeOnInteraction, { once: true });
    };

    void startPlayback();

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [attemptPlay]);

  const toggleMusic = useCallback(async () => {
    if (isPlaying) {
      pauseMusic();
      return;
    }

    await attemptPlay(true);
  }, [attemptPlay, isPlaying, pauseMusic]);

  const musicLabel = isPlaying ? t("pauseMusic") : t("playMusic");

  return (
    <section className="currently-bar" aria-label={t("ariaLabel")}>
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
          className={`currently-pill currently-pill--music${isPlaying ? " is-playing" : " is-paused"}`}
          type="button"
          onClick={() => void toggleMusic()}
          aria-label={musicLabel}
          aria-pressed={isPlaying}
          disabled={!isReady}
        >
          <span className="currently-icon" aria-hidden="true">
            🎵
          </span>
          <span className="currently-copy">
            <span className="currently-label-wrap" aria-live="polite">
              <span
                className={`currently-label-option${isPlaying ? " is-visible" : ""}`}
              >
                {t("nowPlayingLabel")}
              </span>
              <span
                className={`currently-label-option${!isPlaying ? " is-visible" : ""}`}
              >
                {t("soundtrackLabel")}
              </span>
            </span>
            <span className="currently-value-row">
              <span className="currently-value">{t("trackTitle")}</span>
              <span className="currently-music-controls" aria-hidden="true">
                <span className={`currently-eq${isPlaying ? " is-active" : ""}`}>
                  <span />
                  <span />
                  <span />
                </span>
                <span className="currently-music-toggle">
                  <MusicControlIcon playing={isPlaying} />
                </span>
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
          href="/journal/jessekramer-nl-bouwen"
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
