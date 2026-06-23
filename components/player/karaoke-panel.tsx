import { useEffect, useRef } from "react";
import type { KaraokeMode } from "@/components/player/types";
import { PanelTitle } from "@/components/player/playlist-panel";
import { Toggle } from "@/components/player/equalizer";

const MODES: KaraokeMode[] = [
  "Normal Original Voice",
  "Vocal Reduce",
  "Music Focus",
  "Karaoke Experimental",
  "Center Cancel Strong",
];

export function KaraokePanel({
  enabled, mode, strength, voiceAmount, musicAmount, lyrics, pitch, speed, autoScroll, dim, currentTime,
  onEnabled, onMode, onStrength, onVoiceAmount, onMusicAmount, onLyrics, onPitch, onSpeed, onAutoScroll, onDim, onFullscreen,
}: {
  enabled: boolean; mode: KaraokeMode; strength: number; voiceAmount: number; musicAmount: number;
  lyrics: string; pitch: number; speed: number; autoScroll: boolean; dim: boolean; currentTime: number;
  onEnabled: (value: boolean) => void; onMode: (mode: KaraokeMode) => void; onStrength: (value: number) => void;
  onVoiceAmount: (value: number) => void; onMusicAmount: (value: number) => void; onLyrics: (value: string) => void;
  onPitch: (value: number) => void; onSpeed: (value: number) => void; onAutoScroll: (value: boolean) => void;
  onDim: (value: boolean) => void; onFullscreen: (element: HTMLElement | null) => void;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const lyricsRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!autoScroll || !lyricsRef.current) return;
    lyricsRef.current.scrollTop = ((currentTime % 240) / 240) * (lyricsRef.current.scrollHeight - lyricsRef.current.clientHeight);
  }, [autoScroll, currentTime]);

  return (
    <section ref={panelRef} className={`rp-panel ${enabled && dim ? "bg-black/80" : ""}`}>
      <div className="flex items-center justify-between"><PanelTitle title="Karaoke Studio" meta="Experimental browser DSP" /><Toggle enabled={enabled} onClick={() => onEnabled(!enabled)} /></div>
      <select value={mode} onChange={(event) => onMode(event.target.value as KaraokeMode)} className="rp-select mt-3 w-full">
        {MODES.map((entry) => <option key={entry}>{entry}</option>)}
      </select>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Slider label="Strength" value={strength} min={0} max={100} suffix="%" onChange={onStrength} />
        <Slider label="Voice amount" value={voiceAmount} min={0} max={100} suffix="%" onChange={onVoiceAmount} />
        <Slider label="Music amount" value={musicAmount} min={0} max={100} suffix="%" onChange={onMusicAmount} />
        <Slider label="Pitch" value={pitch} min={-6} max={6} suffix=" st" onChange={onPitch} />
        <Slider label="Tempo" value={speed} min={0.6} max={1.5} step={0.05} suffix="×" onChange={onSpeed} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => { onMode("Normal Original Voice"); onEnabled(false); }} className="rp-small-action">Original Voice ON/OFF</button>
        <button type="button" onClick={() => { onMode("Music Focus"); onEnabled(true); }} className="rp-small-action">Music Only Attempt</button>
        <button type="button" onClick={() => onDim(!dim)} className="rp-small-action">Background dim</button>
        <button type="button" onClick={() => onFullscreen(panelRef.current)} className="rp-small-action">Fullscreen karaoke</button>
      </div>
      <textarea ref={lyricsRef} value={lyrics} onChange={(event) => onLyrics(event.target.value)} placeholder="Paste lyrics for the current song…" className="mt-3 h-40 w-full resize-none rounded-xl border border-white/10 bg-black/25 p-3 text-center text-sm leading-7 text-white/70 outline-none" />
      <button type="button" onClick={() => onAutoScroll(!autoScroll)} className="rp-text-button mt-2">Auto-scroll {autoScroll ? "on" : "off"}</button>
      <p className="mt-3 rounded-lg border border-amber-400/15 bg-amber-400/5 p-2 text-[9px] leading-4 text-amber-100/50">
        Browser karaoke is experimental. Full vocal removal is not always possible without AI stem separation.
      </p>
    </section>
  );
}

function Slider({ label, value, min, max, step = 1, suffix, onChange }: { label: string; value: number; min: number; max: number; step?: number; suffix: string; onChange: (value: number) => void }) {
  return <label><span className="flex justify-between text-[9px] font-bold uppercase text-white/35"><span>{label}</span><span className="text-[var(--rp-accent)]">{value}{suffix}</span></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="rp-range mt-2 w-full" /></label>;
}
