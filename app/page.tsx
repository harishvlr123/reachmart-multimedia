import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { HeroSection } from "@/components/hero-section";
import {
  apps,
  featuredApps,
  getAppsByCategory,
  launchedProductApps,
  reachVideoStudioDetails,
  reachVideoStudioReleaseUrl,
} from "@/lib/apps";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <AppSection
        eyebrow="Start here"
        title="Featured Apps"
        description="The core tools and experiences across the ReachMart ecosystem."
        apps={featuredApps}
      />

      <ReachVideoStudioSection />

      <AppSection
        eyebrow="Downloads and live links"
        title="Launched products"
        description="Direct links for ReachVideoStudio, Tamil Astro, Matrimony, and ReachMarket YouTube."
        apps={launchedProductApps}
        muted
      />

      <AppSection
        id="media-tools"
        eyebrow="Play, view, convert"
        title="Media Tools"
        description="Practical media utilities with familiar controls and a modern interface."
        apps={getAppsByCategory("Media Tools")}
        muted
      />

      <AppSection
        eyebrow="Smarter workflows"
        title="AI Tools"
        description="Tools designed to make documents and video easier to understand and transform."
        apps={getAppsByCategory("AI Tools")}
      />

      <AppSection
        eyebrow="Meaningful connections"
        title="Social & Matrimony"
        description="Upcoming products for communication, relationships, matrimony, and Tamil astrology."
        apps={getAppsByCategory("Social & Matrimony")}
        muted
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-cyan-500/10 p-7 sm:p-10 lg:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                Marketplace
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Turn something unused into someone&apos;s next find.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                Create a listing on ReachMart Marketplace and connect with buyers
                looking for products near them.
              </p>
            </div>
            <Link href="/post-ad" className="button-primary whitespace-nowrap">
              Post Free Ad <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Why ReachMart Multimedia
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One ecosystem, built for everyday digital life.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["✦", "One connected home", "Move between useful products without navigating a maze of unrelated websites."],
              ["⚡", "Focused experiences", "Each product is designed around a clear job, with a consistent ReachMart interface."],
              ["◈", "Built to grow", "The portal is ready to expand as new media, AI, social, and marketplace tools launch."],
            ].map(([icon, title, text]) => (
              <div key={title} className="rounded-3xl border border-white/8 bg-white/[0.035] p-7">
                <span className="text-2xl text-cyan-300">{icon}</span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ReachVideoStudioSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-300/20 bg-slate-950 p-[1px] shadow-2xl shadow-fuchsia-950/30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/45 via-violet-500/35 to-pink-500/45 opacity-70" />
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-pink-500/25 blur-3xl" />
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-slate-950/92 px-6 py-8 backdrop-blur-xl sm:px-8 sm:py-10 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 text-lg font-black text-white shadow-[0_0_36px_rgba(168,85,247,0.45)]">
                  RV
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-pink-200">
                    Windows Download
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    ReachVideoStudio
                  </h2>
                </div>
              </div>
              <p className="mt-6 text-lg font-semibold text-cyan-100">
                Premium Windows media player by ReachMarket
              </p>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Premium Windows video/audio player with playlist, fullscreen
                playback, custom skins, custom background, and 3D Video Coming Soon.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={reachVideoStudioReleaseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 shadow-[0_18px_50px_rgba(217,70,239,0.28)]"
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
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-inner shadow-white/5"
                >
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppSection({
  eyebrow,
  title,
  description,
  apps: sectionApps,
  muted = false,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  apps: typeof apps;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={muted ? "border-y border-white/8 bg-white/[0.022]" : ""}>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-slate-400">{description}</p>
          </div>
          <Link href="/apps" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            View all apps →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectionApps.map((app) => <AppCard key={app.slug} app={app} />)}
        </div>
      </div>
    </section>
  );
}
