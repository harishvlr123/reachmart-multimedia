import Link from "next/link";
import type { ReachApp } from "@/lib/apps";
import { StatusBadge } from "@/components/status-badge";

function buttonLabel(app: ReachApp) {
  if (app.ctaLabel) return app.ctaLabel;
  if (app.status === "Download") return "Download";
  if (app.status === "Coming Soon") return "Coming Soon";
  return "Open";
}

export function AppCard({ app }: { app: ReachApp }) {
  const label = buttonLabel(app);
  const isExternal = !app.href.startsWith("/");
  const buttonClasses =
    "mt-6 inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-100";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]">
      <div
        className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${app.accent} opacity-10 blur-2xl transition duration-300 group-hover:opacity-25`}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="grid h-13 w-13 place-items-center rounded-2xl border border-white/10 bg-white/8 text-2xl shadow-inner shadow-white/5">
          {app.icon}
        </div>
        <StatusBadge status={app.status} />
      </div>
      <div className="relative mt-6 flex flex-1 flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {app.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
          {app.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
          {app.description}
        </p>
        {isExternal ? (
          <a
            href={app.href}
            target={app.href.startsWith("http") ? "_blank" : undefined}
            rel={app.href.startsWith("http") ? "noreferrer" : undefined}
            className={buttonClasses}
          >
            {label}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              -&gt;
            </span>
          </a>
        ) : (
          <Link href={app.href} className={buttonClasses}>
            {label}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              -&gt;
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
