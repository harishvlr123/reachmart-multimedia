import { PLAYER_SKINS } from "@/components/audio-player/types";
import { PanelHeading } from "@/components/audio-player/playlist-panel";

export function SkinSwitcher({
  activeSkin,
  onChange,
}: {
  activeSkin: string;
  onChange: (skinId: string) => void;
}) {
  return (
    <section className="player-panel rounded-[1.6rem] p-4 sm:p-5">
      <PanelHeading title="Skins" meta="5 styles" />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {PLAYER_SKINS.map((skin) => (
          <button
            key={skin.id}
            type="button"
            onClick={() => onChange(skin.id)}
            className={`rounded-xl border p-2.5 text-left transition ${
              activeSkin === skin.id ? "border-white/35 bg-white/10" : "border-white/8 bg-black/10 hover:bg-white/5"
            }`}
          >
            <span
              className="block h-7 rounded-lg"
              style={{ background: `linear-gradient(110deg, ${skin.accentSoft}, ${skin.accent})` }}
            />
            <span className="mt-2 block truncate text-[10px] font-semibold text-white/60">{skin.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
