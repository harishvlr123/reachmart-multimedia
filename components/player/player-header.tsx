import { InstallPrompt } from "@/components/player/install-prompt";

export function PlayerHeader({ trackName }: { trackName?: string }) {
  return (
    <header className="rp-dock-header flex flex-wrap items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--rp-accent)] to-[var(--rp-soft)] font-black text-black shadow-[0_0_24px_rgba(var(--rp-rgb),.38)]">R</div>
      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-black tracking-tight text-[var(--rp-text)]">Reach Player</h1>
        <p className="truncate text-[10px] text-white/35">{trackName ?? "Premium local media studio"}</p>
      </div>
      <InstallPrompt compact />
    </header>
  );
}
