import type { Metadata } from "next";
import { ReachPlayer } from "@/components/player/reach-player";

export const metadata: Metadata = { title: "Reach Video Studio" };

export default function VideoPlayerPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-orange-500/8 blur-[130px]" />
      <div className="absolute right-0 top-80 h-96 w-96 rounded-full bg-rose-500/8 blur-[130px]" />
      <section className="relative mx-auto max-w-7xl px-5 pt-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/10 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-300">
            Reach Video Studio
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Reach Video Studio for local video and audio.
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Choose a file below to start playback. Your media stays on your device.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/downloads/ReachVideoStudioSetup.exe" className="button-primary" download>
              Download Windows EXE
            </a>
            <a href="/downloads/ReachVideoStudio.apk" className="button-secondary" download>
              Download Android APK
            </a>
          </div>
        </div>
      </section>
      <section className="relative mx-auto max-w-[1800px] px-3 py-8 sm:px-5 sm:py-12 lg:px-7">
        <ReachPlayer />
      </section>
    </main>
  );
}
