import type { CSSProperties } from "react";

export type Track = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
};

export type RepeatMode = "off" | "one" | "all";
export type EnvironmentEffect = "None" | "Room" | "Hall" | "Stadium" | "Echo";

export type PlayerSkin = {
  id: string;
  name: string;
  accent: string;
  accentSoft: string;
  accentRgb: string;
  panel: string;
  display: string;
  text: string;
};

export type SkinStyle = CSSProperties & {
  "--player-accent": string;
  "--player-accent-soft": string;
  "--player-accent-rgb": string;
  "--player-panel": string;
  "--player-display": string;
  "--player-text": string;
};

export const EQ_FREQUENCIES = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
export const EQ_LABELS = ["31Hz", "62Hz", "125Hz", "250Hz", "500Hz", "1k", "2k", "4k", "8k", "16k"];

export const PLAYER_SKINS: PlayerSkin[] = [
  {
    id: "neon-blue",
    name: "Neon Blue",
    accent: "#22d3ee",
    accentSoft: "#2563eb",
    accentRgb: "34, 211, 238",
    panel: "#071426",
    display: "#020b18",
    text: "#dffbff",
  },
  {
    id: "purple-night",
    name: "Purple Night",
    accent: "#c084fc",
    accentSoft: "#7c3aed",
    accentRgb: "192, 132, 252",
    panel: "#160b28",
    display: "#0b0514",
    text: "#f3e8ff",
  },
  {
    id: "classic-silver",
    name: "Classic Silver",
    accent: "#e2e8f0",
    accentSoft: "#64748b",
    accentRgb: "226, 232, 240",
    panel: "#1b2330",
    display: "#080b10",
    text: "#f8fafc",
  },
  {
    id: "fire-orange",
    name: "Fire Orange",
    accent: "#fb923c",
    accentSoft: "#dc2626",
    accentRgb: "251, 146, 60",
    panel: "#251008",
    display: "#100603",
    text: "#fff0df",
  },
  {
    id: "matrix-green",
    name: "Matrix Green",
    accent: "#4ade80",
    accentSoft: "#15803d",
    accentRgb: "74, 222, 128",
    panel: "#071b10",
    display: "#020b05",
    text: "#dcffe8",
  },
];
