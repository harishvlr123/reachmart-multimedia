import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Downloads</p>
        <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] text-white sm:text-6xl">
          ReachMart apps for your device.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          Desktop downloads and platform releases will be collected here as they
          become available.
        </p>
      </div>

      <div className="mt-14 max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 shadow-2xl shadow-black/20 sm:p-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="grid h-18 w-18 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-4xl">
            🌐
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">ReachBrowser for Windows</h2>
              <StatusBadge status="Download" />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Fast Windows browser with a clean interface and integrated smart tools.
            </p>
          </div>
          <Link href="/browser" className="button-primary whitespace-nowrap">
            View download
          </Link>
        </div>
      </div>
    </main>
  );
}
