import type { EffectsSettings } from "@/components/player/types";
import { PanelTitle } from "@/components/player/playlist-panel";
import { Toggle } from "@/components/player/equalizer";

export function EffectsPanel({
  effects,
  onChange,
  onReset,
}: {
  effects: EffectsSettings;
  onChange: (effects: EffectsSettings) => void;
  onReset: () => void;
}) {
  const set = <K extends keyof EffectsSettings>(key: K, value: EffectsSettings[K]) => onChange({ ...effects, [key]: value });
  return (
    <section className="rp-panel">
      <div className="flex items-center justify-between">
        <PanelTitle title="Effects" meta="Web Audio processing" />
        <Toggle enabled={effects.enabled} onClick={() => set("enabled", !effects.enabled)} />
      </div>
      <div className={`mt-3 space-y-2.5 ${effects.enabled ? "" : "opacity-35"}`}>
        <EffectSlider label="Bass boost" value={effects.bass} min={0} max={12} suffix="dB" onChange={(value) => set("bass", value)} />
        <EffectSlider label="Reverb" value={effects.reverb} min={0} max={1} step={0.05} onChange={(value) => set("reverb", value)} />
        <EffectSlider label="Echo" value={effects.echo} min={0} max={1} step={0.05} onChange={(value) => set("echo", value)} />
        <EffectSlider label="Stereo Wide" value={effects.stereoWidth} min={0} max={1} step={0.05} onChange={(value) => set("stereoWidth", value)} />
        <EffectSlider label="Low pass" value={effects.lowPass} min={1000} max={20000} step={250} suffix="Hz" onChange={(value) => set("lowPass", value)} />
        <EffectSlider label="High pass" value={effects.highPass} min={20} max={2000} step={20} suffix="Hz" onChange={(value) => set("highPass", value)} />
        <div className="grid grid-cols-2 gap-2">
          <EffectSwitch label="Night Mode" enabled={effects.nightMode} onClick={() => set("nightMode", !effects.nightMode)} />
          <EffectSwitch label="Loudness" enabled={effects.normalize} onClick={() => set("normalize", !effects.normalize)} />
        </div>
      </div>
      <button type="button" onClick={onReset} className="rp-text-button mt-4">Clear / reset effects</button>
    </section>
  );
}

function EffectSlider({ label, value, min, max, step = 1, suffix = "", onChange }: { label: string; value: number; min: number; max: number; step?: number; suffix?: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-white/40"><span>{label}</span><span className="font-mono text-[var(--rp-accent)]">{value}{suffix}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="rp-range mt-2 w-full" />
    </label>
  );
}

function EffectSwitch({ label, enabled, onClick }: { label: string; enabled: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-xl border p-3 text-[9px] font-bold ${enabled ? "border-[rgba(var(--rp-rgb),.35)] bg-[rgba(var(--rp-rgb),.1)] text-[var(--rp-accent)]" : "border-white/8 text-white/35"}`}>{label}</button>;
}
