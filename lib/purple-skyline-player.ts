import { siteConfig } from "@/config/site.config";
import {
  PURPLE_SKYLINE_SRC,
  PURPLE_SKYLINE_STORAGE_KEY,
} from "@/lib/audio";

type PlayerSnapshot = {
  isPlaying: boolean;
  isReady: boolean;
};

type PlayerListener = (snapshot: PlayerSnapshot) => void;

const MOBILE_SOUNDTRACK_QUERY = `(max-width: ${siteConfig.audio.mobileMaxWidthPx}px)`;

let audio: HTMLAudioElement | null = null;
let initialized = false;
let isPlaying = false;
let isReady = false;
const listeners = new Set<PlayerListener>();

export function isSoundtrackContext(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_SOUNDTRACK_QUERY).matches;
}

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

function emit() {
  const snapshot = { isPlaying, isReady };

  for (const listener of listeners) {
    listener(snapshot);
  }
}

function pausePlayback(persist = true) {
  if (!audio || audio.paused) {
    isPlaying = false;
    emit();
    return;
  }

  audio.pause();
  if (persist) storePlaying(false);
}

function ensureAudio() {
  if (typeof window === "undefined" || audio) return;

  audio = new Audio(PURPLE_SKYLINE_SRC);
  audio.loop = siteConfig.audio.loop;
  audio.volume = siteConfig.audio.volume;
  audio.preload = "auto";

  audio.addEventListener("play", () => {
    isPlaying = true;
    emit();
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    emit();
  });
}

async function attemptPlay(persist = true) {
  if (!isSoundtrackContext()) {
    pausePlayback(persist);
    return false;
  }

  ensureAudio();
  if (!audio) return false;

  try {
    await audio.play();
    if (persist) storePlaying(true);
    return true;
  } catch {
    isPlaying = false;
    emit();
    return false;
  }
}

function handleViewportChange() {
  if (isSoundtrackContext()) {
    isReady = true;
    emit();
    return;
  }

  pausePlayback(true);
  isReady = true;
  emit();
}

export function subscribePurpleSkylinePlayer(listener: PlayerListener) {
  listeners.add(listener);
  listener({ isPlaying, isReady });

  return () => {
    listeners.delete(listener);
  };
}

export function initPurpleSkylinePlayer() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  const mediaQuery = window.matchMedia(MOBILE_SOUNDTRACK_QUERY);
  mediaQuery.addEventListener("change", handleViewportChange);

  if (!isSoundtrackContext()) {
    isReady = true;
    emit();
    return;
  }

  ensureAudio();

  const stored = readStoredPlaying();
  const shouldAutoplay = stored !== false;

  const startPlayback = async () => {
    if (!shouldAutoplay) {
      isReady = true;
      emit();
      return;
    }

    const started = await attemptPlay(true);
    isReady = true;
    emit();

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
}

export async function togglePurpleSkylinePlayback() {
  if (!isSoundtrackContext()) return;

  ensureAudio();
  if (!audio) return;

  if (!audio.paused) {
    pausePlayback(true);
    return;
  }

  await attemptPlay(true);
}

export function getPurpleSkylineSnapshot(): PlayerSnapshot {
  return { isPlaying, isReady };
}
