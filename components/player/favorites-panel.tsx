import type { FavoriteGroup, MediaItem } from "@/components/player/types";
import { EmptyState, PanelTitle } from "@/components/player/playlist-panel";
import { useRef } from "react";

export function FavoritesPanel({
  groups,
  items,
  activeGroupId,
  onActiveGroup,
  onRename,
  onSelect,
  onRemove,
}: {
  groups: FavoriteGroup[];
  items: MediaItem[];
  activeGroupId: string;
  onActiveGroup: (id: string) => void;
  onRename: (id: string) => void;
  onSelect: (item: MediaItem) => void;
  onRemove: (key: string, groupId: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const group = groups.find((entry) => entry.id === activeGroupId) ?? groups[0];
  const favoriteItems = group.itemKeys.map((key) => items.find((item) => item.key === key)).filter((item): item is MediaItem => Boolean(item));

  return (
    <section className="rp-panel flex min-h-0 flex-col">
      <div className="flex items-center justify-between">
        <PanelTitle title="Favorites" meta={`${favoriteItems.length} saved`} />
        <button type="button" onClick={() => onRename(group.id)} className="rp-text-button">Rename</button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {groups.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onActiveGroup(entry.id)}
            className={`rounded-lg border px-2 py-2 text-[9px] font-bold ${entry.id === group.id ? "border-[rgba(var(--rp-rgb),.4)] bg-[rgba(var(--rp-rgb),.12)] text-[var(--rp-accent)]" : "border-white/8 text-white/35"}`}
          >
            ♥ {index + 1}
          </button>
        ))}
      </div>
      <div className="mt-3 flex justify-end gap-1">
        <button type="button" onClick={() => listRef.current?.scrollBy({ top: -160, behavior: "smooth" })} className="rp-row-button">↑</button>
        <button type="button" onClick={() => listRef.current?.scrollBy({ top: 160, behavior: "smooth" })} className="rp-row-button">↓</button>
      </div>
      <div ref={listRef} className="rp-scrollbar mt-2 h-[330px] space-y-1.5 overflow-y-auto pr-1">
        {favoriteItems.length === 0 ? <EmptyState text="Use the heart buttons beside tracks to build favorite groups." /> : favoriteItems.map((item) => (
          <div key={item.key} className="flex items-center gap-2 rounded-xl border border-white/8 bg-black/10 p-2.5">
            <button type="button" onClick={() => onSelect(item)} className="min-w-0 flex-1 truncate text-left text-xs text-white/65">
              {item.kind === "video" ? "▻" : "♫"} {item.name}
            </button>
            <button type="button" onClick={() => onRemove(item.key, group.id)} className="rp-row-button">×</button>
          </div>
        ))}
      </div>
    </section>
  );
}
