import type { AppStatus } from "@/lib/apps";

const statusStyles: Record<AppStatus, string> = {
  Live: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  Beta: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  "Coming Soon": "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Download: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
};

export function StatusBadge({ status }: { status: AppStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
