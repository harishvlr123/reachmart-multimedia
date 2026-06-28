import type { Metadata } from "next";
import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { StatusBadge } from "@/components/status-badge";
import {
  launchedProductApps,
  reachVideoStudioDetails,
  reachVideoStudioReleaseUrl,
} from "@/lib/apps";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
          Downloads
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] text-white sm:text-6xl">
          ReachMart apps for your device.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          Desktop downloads, app links, and live ReachMart services are collected here.
        </p>
      </div>

      <section className="mt-14 overflow-hidden rounded-[2rem] border border-fuchsia-300/20 bg-slate-950 p-[1px] shadow-2xl shadow-fuchsia-950/30">
        <div className="relative rounded-[calc(2rem-1px)] bg-slate-950/95 p-6 sm:p-8 lg:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  ReachVideoStudio
                </h2>
                <StatusBadge status="Download" />
              </div>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Premium Windows video/audio player with playlist, fullscreen playback,
                custom skins, custom background, and 3D Video Coming Soon.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={reachVideoStudioReleaseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500"
                >
                  Download for Windows
                </a>
                <a
                  href={reachVideoStudioReleaseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                >
                  View GitHub Release
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {reachVideoStudioDetails.map(([label, text]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
                >
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Live links
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Downloads and services
            </h2>
          </div>
          <Link href="/apps" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            View all apps -&gt;
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {launchedProductApps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </main>
  );
}
