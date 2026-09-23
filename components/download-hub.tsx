import Link from "next/link";
import {
  matrimonyUrl,
  tamilAstroUrl,
} from "@/lib/apps";

type DownloadAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "small";
  external?: boolean;
};

type DownloadProduct = {
  title: string;
  eyebrow: string;
  description: string;
  accent: string;
  actions: DownloadAction[];
};

const downloadProducts: DownloadProduct[] = [
  {
    title: "ReachVideo Studio",
    eyebrow: "Desktop & mobile",
    description: "Premium video and audio playback for Windows and Android.",
    accent: "from-blue-400 via-violet-500 to-pink-500",
    actions: [
      { label: "Download Windows EXE", href: "/downloads/ReachVideoStudioSetup.exe" },
      { label: "Download Android APK", href: "/downloads/ReachVideoStudio.apk", variant: "secondary" },
    ],
  },
  {
    title: "ReachBrowser",
    eyebrow: "Browser",
    description: "A clean ReachMart browser for Windows and Android.",
    accent: "from-cyan-400 to-blue-500",
    actions: [
      { label: "Download PC / Windows EXE", href: "/downloads/ReachBrowser.exe" },
      { label: "Download Android APK", href: "/downloads/ReachBrowser.apk", variant: "secondary" },
    ],
  },
  {
    title: "Reach Audio Player",
    eyebrow: "Audio",
    description: "Use the browser player for playlists, skins, equalizer, and visual tools.",
    accent: "from-violet-400 to-fuchsia-500",
    actions: [
      { label: "Open audio player", href: "/audio-player" },
    ],
  },
  {
    title: "Reach Video Studio",
    eyebrow: "Video",
    description: "Play local video and audio files in your browser, or download Reach Video Studio.",
    accent: "from-orange-400 to-rose-500",
    actions: [
      { label: "Open Reach Video Studio", href: "/video-player" },
      { label: "Download Windows EXE", href: "/downloads/ReachVideoStudioSetup.exe", variant: "secondary" },
      { label: "Download Android APK", href: "/downloads/ReachVideoStudio.apk", variant: "secondary" },
    ],
  },
  {
    title: "Reach Timepass Chat",
    eyebrow: "Chat",
    description: "Open the Timepass page from this website while the separate service is restored.",
    accent: "from-emerald-400 to-cyan-500",
    actions: [
      { label: "Open Timepass", href: "/chat", variant: "secondary" },
    ],
  },
];

const toolLinks = [
  ["PDF OCR Reader", "/pdf-ocr"],
  ["Online Converter", "/converter"],
  ["ReachMart Marketplace", "/post-ad"],
  ["ReachMart Matrimony", matrimonyUrl],
  ["Tamil Astro", tamilAstroUrl],
] as const;

export function DownloadHubSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="downloads" className={compact ? "" : "border-y border-white/8 bg-white/[0.025]"}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Central download hub
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              ReachMart Multimedia Downloads
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
              All ReachMart apps in one place, with Windows, Android, web, and service links.
            </p>
          </div>
          <Link href="/downloads" className="button-secondary w-full sm:w-auto">
            Open downloads page
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {downloadProducts.map((product) => (
            <article
              key={product.title}
              className="relative flex min-h-[23rem] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10"
            >
              <div
                className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${product.accent} opacity-25 blur-3xl`}
              />
              <div className="relative flex flex-1 flex-col">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                  {product.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                  {product.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                  {product.description}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {product.actions.map((action) => (
                    <DownloadActionLink key={`${product.title}-${action.label}`} action={action} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/65 p-5 sm:p-6">
          <p className="text-sm font-semibold text-white">More ReachMart tools and services</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {toolLinks.map(([label, href]) => {
              const external = !href.startsWith("/");
              return external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-cyan-200"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-cyan-200"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadActionLink({ action }: { action: DownloadAction }) {
  const className =
    action.variant === "small"
      ? "inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-bold text-cyan-200 transition hover:bg-cyan-300/10 hover:text-white"
      : action.variant === "secondary"
        ? "button-secondary w-full"
        : "button-primary w-full";

  if (action.external || !action.href.startsWith("/")) {
    return (
      <a
        href={action.href}
        target={action.href.startsWith("http") ? "_blank" : undefined}
        rel={action.href.startsWith("http") ? "noreferrer" : undefined}
        className={className}
      >
        {action.label}
      </a>
    );
  }

  return (
    <a href={action.href} className={className} download>
      {action.label}
    </a>
  );
}
