import type { Metadata } from "next";
import { AppCard } from "@/components/app-card";
import { apps } from "@/lib/apps";

export const metadata: Metadata = { title: "Apps" };

export default function AppsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Product directory</p>
        <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] text-white sm:text-6xl">
          One portal. Every ReachMart app.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          Explore marketplace, browser, media, AI, social, matrimony, and Tamil
          astrology products from a single destination.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => <AppCard key={app.slug} app={app} />)}
      </div>
    </main>
  );
}
