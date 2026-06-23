import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-5 py-24 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:px-8 lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5 text-xs font-semibold text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
            The ReachMart digital ecosystem
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Everything you need,
            <span className="gradient-text block">beautifully connected.</span>
          </h1>
          <p className="mt-7 text-xl font-semibold text-white sm:text-2xl">
            ReachMart Multimedia
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            One place for shopping, media tools, AI converters, browser, chat,
            dating, matrimony and Tamil jathagam.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/apps" className="button-primary">
              Explore Apps <span aria-hidden="true">→</span>
            </Link>
            <Link href="/post-ad" className="button-secondary">
              Post Free Ad
            </Link>
            <Link href="/browser" className="button-secondary">
              <span aria-hidden="true">↓</span> Download ReachBrowser
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.07] p-3 shadow-2xl shadow-blue-950/50 backdrop-blur-2xl">
            <div className="rounded-[1.5rem] border border-white/8 bg-[#090d20]/90 p-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-slate-500">
                  reachmart.multimedia.in
                </span>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  ["🌐", "Browser", "from-cyan-500/20"],
                  ["🎧", "Audio", "from-violet-500/20"],
                  ["📄", "PDF OCR", "from-emerald-500/20"],
                  ["✨", "AI Tools", "from-fuchsia-500/20"],
                ].map(([icon, label, color]) => (
                  <div
                    key={label}
                    className={`rounded-2xl border border-white/8 bg-gradient-to-br ${color} to-transparent p-4`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <p className="mt-5 text-sm font-semibold text-white">{label}</p>
                    <div className="mt-2 h-1.5 w-12 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500">
                    🛍️
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">ReachMart Marketplace</p>
                    <p className="mt-1 text-xs text-slate-500">Buy and sell near you</p>
                  </div>
                  <span className="text-cyan-300">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
