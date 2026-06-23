import type { MediaItem, ReachPlayerSettings } from "@/components/player/types";

export function TransportControls({
  item, isPlaying, currentTime, duration, settings, onPlayPause, onPrevious, onNext, onSeek, onSettings,
}: {
  item?: MediaItem; isPlaying: boolean; currentTime: number; duration: number; settings: ReachPlayerSettings;
  onPlayPause: () => void; onPrevious: () => void; onNext: () => void; onSeek: (value: number) => void;
  onSettings: React.Dispatch<React.SetStateAction<ReachPlayerSettings>>;
}) {
  return (
    <div className="rp-transport">
      <div className="flex items-center gap-3">
        <span className="w-11 font-mono text-[9px] text-white/35">{formatTime(currentTime)}</span>
        <input type="range" min={0} max={duration || 0} step={0.1} value={Math.min(currentTime, duration || 0)} disabled={!item} onChange={(event) => onSeek(Number(event.target.value))} className="rp-range flex-1" />
        <span className="w-11 text-right font-mono text-[9px] text-white/35">{formatTime(duration)}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-between">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onPrevious} disabled={!item} className="rp-control">|◀</button>
          <button type="button" onClick={onPlayPause} disabled={!item} className="grid h-11 w-11 place-items-center rounded-full bg-[var(--rp-accent)] text-lg font-black text-black shadow-[0_0_28px_rgba(var(--rp-rgb),.38)] disabled:opacity-30">{isPlaying ? "Ⅱ" : "▶"}</button>
          <button type="button" onClick={onNext} disabled={!item} className="rp-control">▶|</button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onSettings((current) => ({ ...current, shuffle: !current.shuffle }))} className={`rp-control ${settings.shuffle ? "is-active" : ""}`}>Shuffle</button>
          <button type="button" onClick={() => onSettings((current) => ({ ...current, repeat: current.repeat === "off" ? "one" : current.repeat === "one" ? "all" : "off" }))} className={`rp-control ${settings.repeat !== "off" ? "is-active" : ""}`}>Repeat {settings.repeat === "one" ? "1" : settings.repeat === "all" ? "All" : ""}</button>
        </div>
        <div className="flex min-w-48 items-center gap-2">
          <button type="button" onClick={() => onSettings((current) => ({ ...current, muted: !current.muted }))} className={`rp-control ${settings.muted ? "is-active" : ""}`}>{settings.muted ? "Muted" : "Volume"}</button>
          <input type="range" min={0} max={1} step={0.01} value={settings.volume} onChange={(event) => onSettings((current) => ({ ...current, volume: Number(event.target.value) }))} className="rp-range min-w-0 flex-1" />
        </div>
      </div>
    </div>
  );
}

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "00:00";
  return `${Math.floor(value / 60).toString().padStart(2, "0")}:${Math.floor(value % 60).toString().padStart(2, "0")}`;
}
