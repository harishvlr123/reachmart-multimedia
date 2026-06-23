import type { Track } from "@/components/audio-player/types";

type PlaylistPanelProps = {
  tracks: Track[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onRemove: (index: number) => void;
  onClear: () => void;
};

export function PlaylistPanel({ tracks, activeIndex, onSelect, onRemove, onClear }: PlaylistPanelProps) {
  return (
    <section className="player-panel flex min-h-[300px] flex-col rounded-[1.6rem] p-4 sm:p-5">
      <PanelHeading title="Playlist" meta={`${tracks.length} track${tracks.length === 1 ? "" : "s"}`} />
      <div className="mt-4 flex-1 space-y-1.5 overflow-y-auto pr-1 lg:max-h-[410px]">
        {tracks.length === 0 ? (
          <EmptyState icon="♫" text="Your selected audio files will appear here." />
        ) : (
          tracks.map((track, index) => (
            <div
              key={track.id}
              className={`group flex items-center gap-3 rounded-xl border p-2.5 transition ${
                index === activeIndex
                  ? "border-[rgba(var(--player-accent-rgb),.4)] bg-[rgba(var(--player-accent-rgb),.12)]"
                  : "border-transparent bg-white/[0.025] hover:border-white/10 hover:bg-white/5"
              }`}
            >
              <button type="button" onClick={() => onSelect(index)} className="min-w-0 flex-1 text-left">
                <span className="flex items-center gap-3">
                  <span className="w-6 font-mono text-[10px] text-white/35">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="truncate text-xs font-medium text-white/75">{track.name}</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${track.name}`}
                className="px-1 text-white/25 opacity-0 transition hover:text-rose-300 group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
      {tracks.length > 0 && (
        <button type="button" onClick={onClear} className="mt-4 self-end text-xs text-white/40 hover:text-rose-300">
          Clear playlist
        </button>
      )}
    </section>
  );
}

export function PanelHeading({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--player-accent)]">{title}</h2>
      {meta && <span className="font-mono text-[10px] uppercase text-white/35">{meta}</span>}
    </div>
  );
}

export function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="grid min-h-44 place-items-center rounded-2xl border border-dashed border-white/10 bg-black/10 p-6 text-center">
      <div>
        <span className="text-3xl text-white/20">{icon}</span>
        <p className="mt-3 max-w-xs text-xs leading-5 text-white/35">{text}</p>
      </div>
    </div>
  );
}
