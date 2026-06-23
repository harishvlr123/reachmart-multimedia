import type { LayoutPreset } from "@/components/player/types";

const PRESETS: LayoutPreset[] = ["Default Studio", "Player Focus", "Visualizer Focus", "Playlist Focus", "Compact Mode"];

export function LayoutPresets({ value, onChange, onReset }: { value: LayoutPreset; onChange: (value: LayoutPreset) => void; onReset: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[9px] font-black uppercase tracking-wider text-white/25">Magnet Dock</span>
      {PRESETS.map((preset) => <button key={preset} type="button" onClick={() => onChange(preset)} className={`rp-layout-button ${value === preset ? "is-active" : ""}`}>{preset}</button>)}
      <button type="button" onClick={onReset} className="rp-layout-button">Reset Layout</button>
    </div>
  );
}
