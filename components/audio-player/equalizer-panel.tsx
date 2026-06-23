import { EQ_LABELS } from "@/components/audio-player/types";
import { PanelHeading } from "@/components/audio-player/playlist-panel";

type EqualizerPanelProps = {
  values: number[];
  bass: number;
  treble: number;
  onBandChange: (index: number, value: number) => void;
  onBassChange: (value: number) => void;
  onTrebleChange: (value: number) => void;
  onReset: () => void;
};

export function EqualizerPanel(props: EqualizerPanelProps) {
  return (
    <section className="player-panel rounded-[1.6rem] p-4 sm:p-5">
      <PanelHeading title="10-band Equalizer" meta="Live DSP" />
      <div className="mt-6 grid grid-cols-5 gap-3 sm:grid-cols-10">
        {EQ_LABELS.map((label, index) => (
          <label key={label} className="flex min-w-0 flex-col items-center gap-2">
            <span className="font-mono text-[9px] text-white/35">{props.values[index] > 0 ? "+" : ""}{props.values[index]}</span>
            <input
              aria-label={`${label} equalizer band`}
              type="range"
              min={-12}
              max={12}
              step={1}
              value={props.values[index]}
              onChange={(event) => props.onBandChange(index, Number(event.target.value))}
              className="player-range-vertical"
            />
            <span className="font-mono text-[8px] text-white/50">{label}</span>
          </label>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ToneSlider label="Bass boost" value={props.bass} onChange={props.onBassChange} />
        <ToneSlider label="Treble" value={props.treble} onChange={props.onTrebleChange} />
      </div>
      <button type="button" onClick={props.onReset} className="mt-5 text-xs text-white/40 hover:text-[var(--player-accent)]">
        Reset equalizer
      </button>
    </section>
  );
}

function ToneSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="rounded-xl border border-white/8 bg-black/10 p-3">
      <span className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/50">
        {label}<span className="font-mono text-[var(--player-accent)]">{value > 0 ? "+" : ""}{value} dB</span>
      </span>
      <input
        type="range"
        min={-12}
        max={12}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="player-range mt-3 w-full"
      />
    </label>
  );
}
