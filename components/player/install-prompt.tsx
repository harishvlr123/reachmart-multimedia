"use client";

import { useEffect, useState } from "react";
import { PanelTitle } from "@/components/player/playlist-panel";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt({ compact = false }: { compact?: boolean }) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" });
    }
    queueMicrotask(() => setInstalled(window.matchMedia("(display-mode: standalone)").matches));
    const listener = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", listener);
    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-black/15 p-1.5">
        <span className="hidden text-[9px] font-bold text-white/35 sm:block">Install Reach Player</span>
        <button
          type="button"
          disabled={!installEvent || installed}
          onClick={async () => {
            if (!installEvent) return;
            await installEvent.prompt();
            const choice = await installEvent.userChoice;
            if (choice.outcome === "accepted") setInstalled(true);
            setInstallEvent(null);
          }}
          className="rounded-lg bg-[var(--rp-accent)] px-3 py-2 text-[9px] font-black text-black disabled:bg-white/8 disabled:text-white/30"
        >
          {installed ? "Installed" : installEvent ? "Install App" : "Install"}
        </button>
      </div>
    );
  }

  return (
    <section className="rp-panel">
      <PanelTitle title="Install Reach Player" meta={installed ? "Installed" : "PWA ready"} />
      <button
        type="button"
        disabled={!installEvent || installed}
        onClick={async () => {
          if (!installEvent) return;
          await installEvent.prompt();
          const choice = await installEvent.userChoice;
          if (choice.outcome === "accepted") setInstalled(true);
          setInstallEvent(null);
        }}
        className="rp-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        {installed ? "App installed" : installEvent ? "Install App" : "Install from browser menu"}
      </button>
      <div className="mt-4 space-y-2 text-[10px] leading-5 text-white/35">
        <p><strong className="text-white/55">Windows:</strong> open in Chrome or Edge and click Install.</p>
        <p><strong className="text-white/55">Android:</strong> Chrome menu → Add to Home Screen.</p>
        <p><strong className="text-white/55">iPhone:</strong> Safari → Share → Add to Home Screen.</p>
      </div>
      <button type="button" disabled className="mt-4 w-full rounded-xl border border-white/8 px-3 py-3 text-[10px] font-bold text-white/25">
        Download Desktop Version Coming Soon
      </button>
    </section>
  );
}
