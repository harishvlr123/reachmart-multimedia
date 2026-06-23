import { useRef } from "react";
import type { FavoriteGroup, MediaItem, PlayerPlaylist } from "@/components/player/types";

type PlaylistPanelProps = {
  playlists: PlayerPlaylist[];
  activePlaylistId: string;
  activeItemId?: string;
  favoriteGroups: FavoriteGroup[];
  onActivePlaylist: (id: string) => void;
  onCreatePlaylist: () => void;
  onRenamePlaylist: (id: string) => void;
  onDeletePlaylist: (id: string) => void;
  onFiles: (files: FileList | null) => void;
  onSelect: (item: MediaItem) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
  onMove: (itemId: string, targetPlaylistId: string) => void;
  onReorder: (itemId: string, direction: -1 | 1) => void;
  onToggleFavorite: (itemKey: string, groupId: string) => void;
};

export function PlaylistPanel(props: PlaylistPanelProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activePlaylist = props.playlists.find((playlist) => playlist.id === props.activePlaylistId) ?? props.playlists[0];

  return (
    <section className="rp-panel flex min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3">
        <PanelTitle title="Playlists" meta={`${activePlaylist?.items.length ?? 0} media`} />
        <button type="button" onClick={props.onCreatePlaylist} className="rp-icon-button" title="Create playlist">＋</button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {props.playlists.map((playlist, index) => (
          <button
            key={playlist.id}
            type="button"
            onClick={() => props.onActivePlaylist(playlist.id)}
            className={`shrink-0 rounded-xl border px-3 py-2 text-left text-[10px] font-bold transition ${
              playlist.id === props.activePlaylistId
                ? "border-[rgba(var(--rp-rgb),.45)] bg-[rgba(var(--rp-rgb),.12)] text-[var(--rp-accent)]"
                : "border-white/8 bg-black/10 text-white/45 hover:text-white/70"
            }`}
          >
            <span className="mr-1.5 text-white/25">{index + 1}</span>{playlist.name}
          </button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => fileRef.current?.click()} className="rp-small-action">＋ Add files</button>
        <button type="button" onClick={() => folderRef.current?.click()} className="rp-small-action">▣ Open folder</button>
        <input
          ref={fileRef}
          className="hidden"
          type="file"
          multiple
          accept="audio/*,video/*,.mp3,.wav,.ogg,.m4a,.aac,.flac,.mp4,.webm,.mov"
          onChange={(event) => {
            props.onFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={folderRef}
          className="hidden"
          type="file"
          multiple
          accept="audio/*,video/*,.mp3,.wav,.ogg,.m4a,.aac,.flac,.mp4,.webm,.mov"
          {...({ webkitdirectory: "" } as React.InputHTMLAttributes<HTMLInputElement>)}
          onChange={(event) => {
            props.onFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button type="button" onClick={() => props.onRenamePlaylist(activePlaylist.id)} className="rp-text-button">Rename</button>
        <button type="button" onClick={() => props.onDeletePlaylist(activePlaylist.id)} className="rp-text-button text-rose-300/60">Delete</button>
        <button type="button" onClick={props.onClear} className="rp-text-button ml-auto">Clear</button>
        <button type="button" onClick={() => listRef.current?.scrollBy({ top: -180, behavior: "smooth" })} className="rp-row-button" title="Scroll up">↑</button>
        <button type="button" onClick={() => listRef.current?.scrollBy({ top: 180, behavior: "smooth" })} className="rp-row-button" title="Scroll down">↓</button>
      </div>

      <div ref={listRef} className="rp-scrollbar mt-3 h-[330px] space-y-1.5 overflow-y-auto pr-1">
        {activePlaylist.items.length === 0 ? (
          <EmptyState text="Add audio or video files. Local files stay on this device." />
        ) : (
          activePlaylist.items.map((item, index) => (
            <div
              key={item.id}
              className={`group rounded-xl border p-2.5 transition ${
                item.id === props.activeItemId
                  ? "border-[rgba(var(--rp-rgb),.42)] bg-[rgba(var(--rp-rgb),.12)]"
                  : "border-transparent bg-white/[0.025] hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => props.onSelect(item)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                  <span className="w-5 font-mono text-[9px] text-white/25">{index + 1}</span>
                  <span className="text-sm">{item.kind === "video" ? "▻" : "♫"}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs text-white/75">{item.name}</span>
                    <span className="flex items-center justify-between gap-2 text-[9px] text-white/25"><span className="truncate">{item.missing ? "Reselect file or folder to restore" : item.path || item.mime || item.kind}</span><span className="shrink-0">{formatTime(item.duration)}</span></span>
                  </span>
                </button>
                <button type="button" onClick={() => props.onRemove(item.id)} className="rp-row-button" title="Remove">×</button>
              </div>
              <div className="mt-2 flex items-center gap-1 opacity-70 transition group-hover:opacity-100">
                <button type="button" onClick={() => props.onReorder(item.id, -1)} className="rp-row-button" title="Move up">↑</button>
                <button type="button" onClick={() => props.onReorder(item.id, 1)} className="rp-row-button" title="Move down">↓</button>
                <select
                  aria-label={`Move ${item.name} to playlist`}
                  defaultValue=""
                  onChange={(event) => {
                    if (event.target.value) props.onMove(item.id, event.target.value);
                    event.target.value = "";
                  }}
                  className="rp-select ml-1 min-w-0 flex-1"
                >
                  <option value="">Move to…</option>
                  {props.playlists.filter((playlist) => playlist.id !== activePlaylist.id).map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                  ))}
                </select>
                {props.favoriteGroups.map((group, groupIndex) => (
                  <button
                    key={group.id}
                    type="button"
                    title={`${group.itemKeys.includes(item.key) ? "Remove from" : "Add to"} ${group.name}`}
                    onClick={() => props.onToggleFavorite(item.key, group.id)}
                    className={`rp-row-button ${group.itemKeys.includes(item.key) ? "text-[var(--rp-accent)]" : ""}`}
                  >
                    ♥{groupIndex + 1}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export function PanelTitle({ title, meta }: { title: string; meta?: string }) {
  return (
    <div>
      <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--rp-accent)]">{title}</h2>
      {meta && <p className="mt-0.5 font-mono text-[9px] uppercase text-white/25">{meta}</p>}
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-white/10 p-5 text-center text-xs leading-5 text-white/30">{text}</div>;
}

function formatTime(value?: number) {
  if (!value || !Number.isFinite(value)) return "--:--";
  return `${Math.floor(value / 60).toString().padStart(2, "0")}:${Math.floor(value % 60).toString().padStart(2, "0")}`;
}
