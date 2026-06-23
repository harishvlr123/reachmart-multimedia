import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Coming Soon" };

export default function ComingSoonPage() {
  return (
    <main className="relative grid min-h-[68vh] place-items-center overflow-hidden px-5 py-20">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[100px]" />
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-white/[0.06] text-4xl shadow-2xl">
          ✦
        </span>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">
          In development
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] text-white sm:text-6xl">
          Something useful is coming soon.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
          This ReachMart Multimedia product is being prepared for launch. Explore
          the available apps in the meantime.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/apps" className="button-primary">Explore Apps →</Link>
          <Link href="/" className="button-secondary">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
