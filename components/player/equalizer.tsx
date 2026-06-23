import { EQ_LABELS, EQ_PRESETS, type EqPreset } from "@/components/player/types";
import { PanelTitle } from "@/components/player/playlist-panel";

export function Equalizer({
  enabled,
  values,
  preset,
  onEnabled,
  onValue,
  onPreset,
  onReset,
}: {
  enabled: boolean;
  values: number[];
  preset: EqPreset;
  onEnabled: (enabled: boolean) => void;
  onValue: (index: number, value: number) => void;
  onPreset: (preset: EqPreset, values: number[]) => void;
  onReset: () => void;
}) {
  return (
    <section className="rp-panel">
      <div className="flex items-center justify-between">
        <PanelTitle title="Equalizer" meta="10-band BiquadFilter" />
        <Toggle enabled={enabled} onClick={() => onEnabled(!enabled)} />
      </div>
      <select
        value={preset}
        onChange={(event) => {
          const next = event.target.value as EqPreset;
          onPreset(next, [...EQ_PRESETS[next]]);
        }}
        className="rp-select mt-4 w-full"
      >
        {(Object.keys(EQ_PRESETS) as EqPreset[]).map((name) => <option key={name}>{name}</option>)}
      </select>
      <div className={`mt-3 grid grid-cols-5 gap-2 ${enabled ? "" : "opacity-35"}`}>
        {EQ_LABELS.map((label, index) => (
          <label key={label} className="flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] text-white/35">{values[index] > 0 ? "+" : ""}{values[index]}</span>
            <input type="range" min={-12} max={12} value={values[index]} disabled={!enabled} onChange={(event) => onValue(index, Number(event.target.value))} className="rp-range-vertical" />
            <span className="font-mono text-[8px] text-white/45">{label}</span>
          </label>
        ))}
      </div>
      <button type="button" onClick={onReset} className="rp-text-button mt-3">Reset EQ</button>
    </section>
  );
}

export function Toggle({ enabled, onClick }: { enabled: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`h-6 w-11 rounded-full border p-0.5 transition ${enabled ? "border-[rgba(var(--rp-rgb),.4)] bg-[rgba(var(--rp-rgb),.25)]" : "border-white/10 bg-black/20"}`}>
      <span className={`block h-4.5 w-4.5 rounded-full bg-white transition ${enabled ? "translate-x-5 bg-[var(--rp-accent)]" : ""}`} />
    </button>
  );
}
