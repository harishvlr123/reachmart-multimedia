import type { CSSProperties } from "react";

export type MediaKind = "audio" | "video";
export type RepeatMode = "off" | "one" | "all";
export type VisualizerType =
  | "Neon Galaxy"
  | "Rainbow Bars"
  | "Circle Spectrum"
  | "Fire Wave"
  | "Cyber Tunnel"
  | "Star Pulse"
  | "Classic Winamp"
  | "DJ Studio Mix";
export type PlayerShape = "Rounded" | "Square" | "Capsule" | "Compact" | "Wide Deck";
export type VideoFit = "contain" | "cover" | "original";
export type LayoutPreset = "Default Studio" | "Player Focus" | "Visualizer Focus" | "Playlist Focus" | "Compact Mode";
export type KaraokeMode = "Normal Original Voice" | "Vocal Reduce" | "Music Focus" | "Karaoke Experimental" | "Center Cancel Strong";

export type MediaItem = {
  id: string;
  key: string;
  name: string;
  kind: MediaKind;
  mime: string;
  size: number;
  lastModified: number;
  path?: string;
  url?: string;
  missing?: boolean;
  duration?: number;
};

export type PlayerPlaylist = {
  id: string;
  name: string;
  items: MediaItem[];
};

export type FavoriteGroup = {
  id: string;
  name: string;
  itemKeys: string[];
};

export type EqPreset =
  | "Flat"
  | "Bass Boost"
  | "Treble Boost"
  | "Vocal"
  | "Rock"
  | "Pop"
  | "Dance"
  | "Classical"
  | "Tamil Beat"
  | "Cinema";

export type EffectsSettings = {
  enabled: boolean;
  bass: number;
  reverb: number;
  echo: number;
  stereoWidth: number;
  nightMode: boolean;
  normalize: boolean;
  lowPass: number;
  highPass: number;
};

export type SkinDefinition = {
  id: string;
  name: string;
  accent: string;
  soft: string;
  rgb: string;
  panel: string;
  screen: string;
  light: boolean;
};

export type ReachPlayerSettings = {
  activePlaylistId: string;
  activeSkinId: string;
  shape: PlayerShape;
  volume: number;
  muted: boolean;
  repeat: RepeatMode;
  shuffle: boolean;
  playbackSpeed: number;
  pitch: number;
  eqEnabled: boolean;
  eqValues: number[];
  eqPreset: EqPreset;
  effects: EffectsSettings;
  visualizerEnabled: boolean;
  visualizerType: VisualizerType;
  visualizerSensitivity: number;
  visualizerColorSpeed: number;
  visualizerSize: number;
  videoFit: VideoFit;
  videoVisualizerOverlay: boolean;
  skinOpacity: number;
  skinBlur: number;
  skinGlow: number;
  karaokeEnabled: boolean;
  karaokeMode: KaraokeMode;
  karaokeStrength: number;
  karaokeVoiceAmount: number;
  karaokeMusicAmount: number;
  karaokeDim: boolean;
  lyricsAutoScroll: boolean;
  lyricsVisible: boolean;
  colourStudioOpen: boolean;
  videoEnabled: boolean;
  layoutPreset: LayoutPreset;
};

export type PlayerSkinStyle = CSSProperties & {
  "--rp-accent": string;
  "--rp-soft": string;
  "--rp-rgb": string;
  "--rp-panel": string;
  "--rp-screen": string;
  "--rp-text": string;
  "--rp-bg-opacity": string;
  "--rp-bg-blur": string;
  "--rp-custom-bg": string;
  "--rp-glow": string;
};

export const EQ_FREQUENCIES = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
export const EQ_LABELS = ["32", "64", "125", "250", "500", "1k", "2k", "4k", "8k", "16k"];

export const EQ_PRESETS: Record<EqPreset, number[]> = {
  Flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "Bass Boost": [8, 7, 5, 3, 1, 0, 0, 0, 0, 0],
  "Treble Boost": [0, 0, 0, 0, 0, 1, 3, 5, 7, 8],
  Vocal: [-2, -1, 0, 2, 4, 5, 4, 2, 0, -1],
  Rock: [5, 4, 2, -1, -2, 1, 3, 5, 6, 6],
  Pop: [-1, 2, 4, 5, 3, 0, -1, -1, 2, 3],
  Dance: [6, 5, 2, 0, 0, -2, 0, 3, 5, 6],
  Classical: [4, 3, 2, 1, -1, -1, 0, 2, 3, 4],
  "Tamil Beat": [7, 6, 4, 1, -1, 2, 4, 5, 4, 3],
  Cinema: [6, 4, 2, 0, 2, 4, 5, 4, 3, 5],
};

export const PLAYER_SKINS: SkinDefinition[] = [
  { id: "classic-deck", name: "Classic Winamp", accent: "#9ef01a", soft: "#475569", rgb: "158,240,26", panel: "#17202b", screen: "#050805", light: false },
  { id: "neon-blue", name: "Neon Blue", accent: "#22d3ee", soft: "#2563eb", rgb: "34,211,238", panel: "#071426", screen: "#020b18", light: false },
  { id: "cyber-purple", name: "Cyber Purple", accent: "#c084fc", soft: "#7c3aed", rgb: "192,132,252", panel: "#170a29", screen: "#0b0514", light: false },
  { id: "tamil-gold", name: "Tamil Gold", accent: "#fbbf24", soft: "#b45309", rgb: "251,191,36", panel: "#251708", screen: "#100a02", light: false },
  { id: "rainbow-dj", name: "Rainbow DJ", accent: "#22d3ee", soft: "#ec4899", rgb: "34,211,238", panel: "#160b28", screen: "#050510", light: false },
  { id: "glass-black", name: "Glass Black", accent: "#e2e8f0", soft: "#334155", rgb: "226,232,240", panel: "#090b10", screen: "#020204", light: false },
  { id: "minimal-light", name: "Minimal Light", accent: "#2563eb", soft: "#bae6fd", rgb: "37,99,235", panel: "#dce8f7", screen: "#f8fbff", light: true },
  { id: "cinema-red", name: "Cinema Red", accent: "#fb7185", soft: "#991b1b", rgb: "251,113,133", panel: "#25080d", screen: "#100205", light: false },
];

export const DEFAULT_EFFECTS: EffectsSettings = {
  enabled: false,
  bass: 0,
  reverb: 0,
  echo: 0,
  stereoWidth: 0,
  nightMode: false,
  normalize: false,
  lowPass: 20000,
  highPass: 20,
};

export const DEFAULT_SETTINGS: ReachPlayerSettings = {
  activePlaylistId: "playlist-1",
  activeSkinId: "classic-deck",
  shape: "Rounded",
  volume: 0.8,
  muted: false,
  repeat: "off",
  shuffle: false,
  playbackSpeed: 1,
  pitch: 0,
  eqEnabled: true,
  eqValues: EQ_PRESETS.Flat,
  eqPreset: "Flat",
  effects: DEFAULT_EFFECTS,
  visualizerEnabled: true,
  visualizerType: "Neon Galaxy",
  visualizerSensitivity: 1,
  visualizerColorSpeed: 1,
  visualizerSize: 1,
  videoFit: "contain",
  videoVisualizerOverlay: false,
  skinOpacity: 0.3,
  skinBlur: 8,
  skinGlow: 0.45,
  karaokeEnabled: false,
  karaokeMode: "Normal Original Voice",
  karaokeStrength: 60,
  karaokeVoiceAmount: 100,
  karaokeMusicAmount: 100,
  karaokeDim: true,
  lyricsAutoScroll: false,
  lyricsVisible: false,
  colourStudioOpen: false,
  videoEnabled: true,
  layoutPreset: "Default Studio",
};

export function createDefaultPlaylists(): PlayerPlaylist[] {
  return [1, 2, 3, 4].map((number) => ({
    id: `playlist-${number}`,
    name: `Playlist ${number}`,
    items: [],
  }));
}

export function createDefaultFavoriteGroups(): FavoriteGroup[] {
  return [1, 2, 3, 4].map((number) => ({
    id: `favorite-${number}`,
    name: `Favorites ${number}`,
    itemKeys: [],
  }));
}
