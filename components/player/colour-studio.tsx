import { useRef } from "react";
import { PLAYER_SKINS, type PlayerShape } from "@/components/player/types";
import { PanelTitle } from "@/components/player/playlist-panel";

const SHAPES: PlayerShape[] = ["Rounded", "Square", "Capsule", "Compact", "Wide Deck"];

export function ColourStudio({
  skinId, shape, opacity, blur, glow, hasBackground, onSkin, onShape, onOpacity, onBlur, onGlow, onBackground, onReset, onSave,
}: {
  skinId: string; shape: PlayerShape; opacity: number; blur: number; glow: number; hasBackground: boolean;
  onSkin: (id: string) => void; onShape: (shape: PlayerShape) => void; onOpacity: (value: number) => void;
  onBlur: (value: number) => void; onGlow: (value: number) => void; onBackground: (file: File) => void;
  onReset: () => void; onSave: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <section className="rp-panel rp-magnet">
      <PanelTitle title="Colour Studio" meta="Skin, gradient, photo and glow" />
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {PLAYER_SKINS.map((skin) => (
          <button key={skin.id} type="button" onClick={() => onSkin(skin.id)} className={`rounded-xl border p-2 text-left ${skinId === skin.id ? "border-white/40 bg-white/10" : "border-white/8"}`}>
            <span className="block h-7 rounded-lg" style={{ background: `linear-gradient(120deg,${skin.soft},${skin.accent},#ec4899)` }} />
            <span className="mt-1 block truncate text-[9px] font-bold text-white/45">{skin.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="text-[9px] font-bold uppercase text-white/35">Player shape<select value={shape} onChange={(event) => onShape(event.target.value as PlayerShape)} className="rp-select mt-2 w-full">{SHAPES.map((entry) => <option key={entry}>{entry}</option>)}</select></label>
        <Slider label="Opacity" value={opacity} min={0} max={0.8} step={0.05} onChange={onOpacity} />
        <Slider label="Blur" value={blur} min={0} max={30} step={1} onChange={onBlur} />
        <Slider label="Glow" value={glow} min={0} max={1} step={0.05} onChange={onGlow} />
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) onBackground(file); event.target.value = ""; }} />
          <button type="button" onClick={() => fileRef.current?.click()} className="rp-small-action mt-4 w-full">{hasBackground ? "Replace photo" : "Upload photo"}</button>
        </div>
      </div>
      <div className="mt-4 flex gap-2"><button type="button" onClick={onSave} className="rp-primary">Save Skin</button><button type="button" onClick={onReset} className="rp-small-action">Reset Skin</button></div>
    </section>
  );
}

function Slider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return <label><span className="flex justify-between text-[9px] font-bold uppercase text-white/35"><span>{label}</span><span>{value}</span></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="rp-range mt-2 w-full" /></label>;
}
