import Link from "next/link";
import type { ReachApp } from "@/lib/apps";
import { StatusBadge } from "@/components/status-badge";

type FeaturePageProps = {
  app: ReachApp;
  ctaLabel?: string;
  ctaHref?: string;
  external?: boolean;
};

export function FeaturePage({
  app,
  ctaLabel,
  ctaHref,
  external = false,
}: FeaturePageProps) {
  const isComingSoon = app.status === "Coming Soon";
  const href = ctaHref ?? (isComingSoon ? "/coming-soon" : app.href);
  const label =
    ctaLabel ??
    app.ctaLabel ??
    (app.status === "Download"
      ? "Download for Windows"
      : isComingSoon
        ? "Get launch updates"
        : "Open tool");
  const shouldUseExternalLink = external || !href.startsWith("/");

  return (
    <main className="relative overflow-hidden">
      <div
        className={`absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br ${app.accent} opacity-15 blur-[100px]`}
      />
      <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Link href="/apps" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          ← All apps
        </Link>
        <div className="mt-12 grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-3xl">
                {app.icon}
              </span>
              <StatusBadge status={app.status} />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">
              {app.category}
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-[-0.045em] text-white sm:text-6xl">
              {app.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              {app.longDescription}
            </p>
            {shouldUseExternalLink ? (
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="button-primary mt-9"
              >
                {label} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link href={href} className="button-primary mt-9">
                {label} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/8 bg-[#080c1b]/90 p-7 sm:p-9">
              <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${app.accent}`} />
              <h2 className="mt-8 text-2xl font-semibold text-white">Built around what matters</h2>
              <div className="mt-7 space-y-4">
                {app.features.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-300">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
              <p className="mt-7 text-xs leading-5 text-slate-600">
                {isComingSoon
                  ? "This product is in development. Availability will be announced here."
                  : "Part of the ReachMart Multimedia product ecosystem."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
