import { useRef } from "react";
import { PanelHeading } from "@/components/audio-player/playlist-panel";

type MediaLibraryPanelProps = {
  onAudioFiles: (files: FileList | null) => void;
  onVideoFiles: (files: FileList | null) => void;
};

export function MediaLibraryPanel({ onAudioFiles, onVideoFiles }: MediaLibraryPanelProps) {
  const audioInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const futureTools = [
    "Open Folder",
    "Save Playlist",
    "Load Playlist",
    "Export Favorites",
    "Mini Player",
    "Fullscreen Visualizer",
  ];

  return (
    <section className="player-panel rounded-[1.6rem] p-4 sm:p-5">
      <PanelHeading title="Media Library" meta="Local files only" />
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*,.mp3,.wav,.ogg,.m4a"
        multiple
        className="hidden"
        onChange={(event) => {
          onAudioFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={(event) => {
          onVideoFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => audioInputRef.current?.click()} className="player-action">
          <span className="text-xl">♫</span>
          <span><strong>Open Audio Files</strong><small>MP3, WAV, OGG and browser-supported audio</small></span>
        </button>
        <button type="button" onClick={() => videoInputRef.current?.click()} className="player-action">
          <span className="text-xl">▻</span>
          <span><strong>Open Video Files</strong><small>Preview feature availability</small></span>
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-[rgba(var(--player-accent-rgb),.25)] bg-[rgba(var(--player-accent-rgb),.06)] p-4">
        <p className="text-xs font-bold text-[var(--player-accent)]">Video Mode Coming Soon</p>
        <p className="mt-1 text-xs leading-5 text-white/40">Video playback and visual effects coming soon</p>
      </div>

      <div className="mt-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Future Tools</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {futureTools.map((tool) => (
            <button key={tool} type="button" disabled className="rounded-xl border border-white/7 bg-black/10 px-3 py-2.5 text-[10px] font-semibold text-white/25">
              {tool}<span className="mt-0.5 block text-[8px] uppercase tracking-wider">Coming soon</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
