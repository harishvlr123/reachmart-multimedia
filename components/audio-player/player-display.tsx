import type { Track } from "@/components/audio-player/types";

type PlayerDisplayProps = {
  track?: Track;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "00:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function PlayerDisplay({
  track,
  currentTime,
  duration,
  isPlaying,
  isFavorite,
  onToggleFavorite,
}: PlayerDisplayProps) {
  return (
    <section className="player-panel overflow-hidden rounded-[1.6rem] p-4 sm:p-5">
      <div className="player-led relative overflow-hidden rounded-2xl border border-white/8 px-4 py-5">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:100%_4px]" />
        <div className="relative flex items-center gap-4">
          <div
            className={`player-disc grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/15 ${
              isPlaying ? "is-playing" : ""
            }`}
          >
            <div className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-black/50">
              <span className="h-2 w-2 rounded-full bg-[var(--player-accent)] shadow-[0_0_12px_var(--player-accent)]" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
              <span>{isPlaying ? "Playing" : track ? "Ready" : "No media loaded"}</span>
              <button
                type="button"
                onClick={onToggleFavorite}
                disabled={!track}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                className={`text-lg transition disabled:cursor-not-allowed disabled:opacity-25 ${
                  isFavorite ? "text-[var(--player-accent)]" : "text-white/40 hover:text-white"
                }`}
              >
                {isFavorite ? "♥" : "♡"}
              </button>
            </div>
            <div className="mt-2 overflow-hidden whitespace-nowrap font-mono text-sm font-bold uppercase tracking-[0.12em] text-[var(--player-accent)]">
              <span className={track ? "player-marquee inline-block" : ""}>
                {track?.name ?? "Open audio files to begin"}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-xs text-white/55">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
