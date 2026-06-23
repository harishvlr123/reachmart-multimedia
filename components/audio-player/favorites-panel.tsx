import { EmptyState, PanelHeading } from "@/components/audio-player/playlist-panel";

export function FavoritesPanel({
  favorites,
  onRemove,
}: {
  favorites: string[];
  onRemove: (name: string) => void;
}) {
  return (
    <section className="player-panel rounded-[1.6rem] p-4 sm:p-5">
      <PanelHeading title="Favorites" meta={`${favorites.length} saved`} />
      <div className="mt-4 space-y-2">
        {favorites.length === 0 ? (
          <EmptyState icon="♡" text="Favorite tracks are stored locally in this browser." />
        ) : (
          favorites.map((name) => (
            <div key={name} className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/10 px-3 py-2.5">
              <span className="text-[var(--player-accent)]">♥</span>
              <span className="min-w-0 flex-1 truncate text-xs text-white/65">{name}</span>
              <button type="button" onClick={() => onRemove(name)} aria-label={`Remove ${name} from favorites`} className="text-white/25 hover:text-rose-300">
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
