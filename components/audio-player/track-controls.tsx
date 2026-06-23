import type { RepeatMode } from "@/components/audio-player/types";
import { formatTime } from "@/components/audio-player/player-display";

type TrackControlsProps = {
  isPlaying: boolean;
  hasTrack: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  repeatMode: RepeatMode;
  shuffle: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (value: number) => void;
  onVolume: (value: number) => void;
  onMute: () => void;
  onRepeat: () => void;
  onShuffle: () => void;
};

export function TrackControls(props: TrackControlsProps) {
  return (
    <section className="player-panel rounded-[1.6rem] p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="w-11 font-mono text-[10px] text-white/45">{formatTime(props.currentTime)}</span>
        <input
          aria-label="Seek"
          type="range"
          min={0}
          max={props.duration || 0}
          step={0.1}
          value={Math.min(props.currentTime, props.duration || 0)}
          disabled={!props.hasTrack}
          onChange={(event) => props.onSeek(Number(event.target.value))}
          className="player-range flex-1"
        />
        <span className="w-11 text-right font-mono text-[10px] text-white/45">{formatTime(props.duration)}</span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:justify-between">
        <div className="flex items-center gap-2">
          <ControlButton label="Previous" onClick={props.onPrevious} disabled={!props.hasTrack}>↤</ControlButton>
          <button
            type="button"
            onClick={props.onPlayPause}
            disabled={!props.hasTrack}
            aria-label={props.isPlaying ? "Pause" : "Play"}
            className="grid h-13 w-13 place-items-center rounded-full bg-[var(--player-accent)] text-xl font-black text-black shadow-[0_0_30px_rgba(var(--player-accent-rgb),.35)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {props.isPlaying ? "Ⅱ" : "▶"}
          </button>
          <ControlButton label="Next" onClick={props.onNext} disabled={!props.hasTrack}>↦</ControlButton>
        </div>

        <div className="flex items-center gap-2">
          <ControlButton label={`Repeat: ${props.repeatMode}`} active={props.repeatMode !== "off"} onClick={props.onRepeat}>
            {props.repeatMode === "one" ? "↻1" : props.repeatMode === "all" ? "↻A" : "↻"}
          </ControlButton>
          <ControlButton label="Shuffle" active={props.shuffle} onClick={props.onShuffle}>⇄</ControlButton>
        </div>

        <div className="flex min-w-[160px] items-center gap-2">
          <ControlButton label={props.muted ? "Unmute" : "Mute"} active={props.muted} onClick={props.onMute}>
            {props.muted ? "×" : "◖"}
          </ControlButton>
          <input
            aria-label="Volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={props.volume}
            onChange={(event) => props.onVolume(Number(event.target.value))}
            className="player-range min-w-0 flex-1"
          />
        </div>
      </div>
    </section>
  );
}

function ControlButton({
  children,
  label,
  active = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid h-10 min-w-10 place-items-center rounded-xl border px-2 font-mono text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-30 ${
        active
          ? "border-[rgba(var(--player-accent-rgb),.45)] bg-[rgba(var(--player-accent-rgb),.14)] text-[var(--player-accent)]"
          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
