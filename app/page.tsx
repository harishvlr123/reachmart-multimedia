import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { HeroSection } from "@/components/hero-section";
import { apps, featuredApps, getAppsByCategory } from "@/lib/apps";

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
