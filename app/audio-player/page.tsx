import type { Metadata } from "next";
import { ReachPlayer } from "@/components/player/reach-player";

export const metadata: Metadata = {
  title: "Reach Player",
  description:
    "A browser-based local audio and video player with playlists, equalizer, visualizers, karaoke, effects, and installable PWA support.",
};

export default function AudioPlayerPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-cyan-500/8 blur-[130px]" />
      <div className="absolute right-0 top-80 h-96 w-96 rounded-full bg-violet-500/8 blur-[130px]" />
      <section className="relative mx-auto max-w-7xl px-5 pt-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/10 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                Reach Audio Player
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Play your files in the browser.
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="relative mx-auto max-w-[1800px] px-3 py-8 sm:px-5 sm:py-12 lg:px-7">
        <ReachPlayer />
      </section>
    </main>
  );
}
