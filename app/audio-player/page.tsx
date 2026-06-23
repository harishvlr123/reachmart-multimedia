import type { Metadata } from "next";
import { AudioPlayerShell } from "@/components/audio-player/audio-player-shell";

export const metadata: Metadata = { title: "Reach Audio Player" };

export default function AudioPlayerPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute left-1/4 top-28 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="absolute right-0 top-64 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]" />
      <section className="relative mx-auto max-w-[1500px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5 text-xs font-semibold text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
            Browser-based beta
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-[-0.045em] text-white sm:text-6xl">
            Reach Audio Player
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            Classic music player feeling with modern skins, playlist, equalizer,
            visualizer and smart media tools.
          </p>
          <p className="mt-3 text-xs text-slate-600">
            Your local media stays in your browser and is not uploaded.
          </p>
        </div>
        <AudioPlayerShell />
      </section>
    </main>
  );
}
