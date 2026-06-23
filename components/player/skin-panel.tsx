import { useRef } from "react";
import { PLAYER_SKINS, type PlayerShape } from "@/components/player/types";
import { PanelTitle } from "@/components/player/playlist-panel";

const shapes: PlayerShape[] = ["Rounded", "Square", "Capsule", "Compact", "Wide Deck"];

export function SkinPanel({
  skinId,
  shape,
  opacity,
  blur,
  hasBackground,
  onSkin,
  onShape,
  onOpacity,
  onBlur,
  onBackground,
  onReset,
}: {
  skinId: string;
  shape: PlayerShape;
  opacity: number;
  blur: number;
  hasBackground: boolean;
  onSkin: (id: string) => void;
  onShape: (shape: PlayerShape) => void;
  onOpacity: (value: number) => void;
  onBlur: (value: number) => void;
  onBackground: (file: File) => void;
  onReset: () => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  return (
    <section className="rp-panel">
      <PanelTitle title="Skin Studio" meta="Color, shape and photo" />
      <div className="mt-4 grid grid-cols-2 gap-2">
        {PLAYER_SKINS.map((skin) => (
          <button key={skin.id} type="button" onClick={() => onSkin(skin.id)} className={`rounded-xl border p-2 text-left ${skinId === skin.id ? "border-white/35 bg-white/10" : "border-white/8"}`}>
            <span className="block h-6 rounded-lg" style={{ background: `linear-gradient(110deg,${skin.soft},${skin.accent})` }} />
            <span className="mt-1.5 block text-[9px] font-bold text-white/50">{skin.name}</span>
          </button>
        ))}
      </div>
      <label className="mt-4 block text-[9px] font-bold uppercase tracking-wider text-white/35">
        Player shape
        <select value={shape} onChange={(event) => onShape(event.target.value as PlayerShape)} className="rp-select mt-2 w-full">
          {shapes.map((entry) => <option key={entry}>{entry}</option>)}
        </select>
      </label>
      <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={(event) => {
        const file = event.target.files?.[0];
        if (file) onBackground(file);
        event.target.value = "";
      }} />
      <button type="button" onClick={() => imageRef.current?.click()} className="rp-small-action mt-4 w-full">
        {hasBackground ? "Replace skin photo" : "Upload skin photo"}
      </button>
      <SkinSlider label="Background opacity" value={opacity} min={0} max={0.8} step={0.05} onChange={onOpacity} />
      <SkinSlider label="Background blur" value={blur} min={0} max={30} step={1} suffix="px" onChange={onBlur} />
      <button type="button" onClick={onReset} className="rp-text-button mt-4">Reset skin</button>
    </section>
  );
}

function SkinSlider({ label, value, min, max, step, suffix = "", onChange }: { label: string; value: number; min: number; max: number; step: number; suffix?: string; onChange: (value: number) => void }) {
  return (
    <label className="mt-4 block">
      <span className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-white/35"><span>{label}</span><span>{value}{suffix}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="rp-range mt-2 w-full" />
    </label>
  );
}
