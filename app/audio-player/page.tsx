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
      <section className="relative mx-auto max-w-[1800px] px-3 py-8 sm:px-5 sm:py-12 lg:px-7">
        <ReachPlayer />
      </section>
    </main>
  );
}
