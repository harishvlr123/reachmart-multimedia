import {
  DEFAULT_SETTINGS,
  createDefaultFavoriteGroups,
  createDefaultPlaylists,
  type FavoriteGroup,
  type PlayerPlaylist,
  type ReachPlayerSettings,
} from "@/components/player/types";

const STORAGE_KEY = "reach-player-state-v1";
const LYRICS_KEY = "reach-player-lyrics-v1";
const DB_NAME = "reach-player-assets";
const STORE_NAME = "skins";

export type StoredPlayerState = {
  playlists: PlayerPlaylist[];
  favoriteGroups: FavoriteGroup[];
  settings: ReachPlayerSettings;
};

export function loadPlayerState(): StoredPlayerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        playlists: createDefaultPlaylists(),
        favoriteGroups: createDefaultFavoriteGroups(),
        settings: DEFAULT_SETTINGS,
      };
    }
    const parsed = JSON.parse(raw) as Partial<StoredPlayerState>;
    const playlists = (parsed.playlists?.length ? parsed.playlists : createDefaultPlaylists()).map((playlist) => ({
      ...playlist,
      items: playlist.items.map((item) => ({ ...item, url: undefined, missing: true })),
    }));
    return {
      playlists,
      favoriteGroups: parsed.favoriteGroups?.length ? parsed.favoriteGroups : createDefaultFavoriteGroups(),
      settings: {
        ...DEFAULT_SETTINGS,
        ...parsed.settings,
        effects: { ...DEFAULT_SETTINGS.effects, ...parsed.settings?.effects },
        eqValues: parsed.settings?.eqValues?.length === 10 ? parsed.settings.eqValues : DEFAULT_SETTINGS.eqValues,
      },
    };
  } catch {
    return {
      playlists: createDefaultPlaylists(),
      favoriteGroups: createDefaultFavoriteGroups(),
      settings: DEFAULT_SETTINGS,
    };
  }
}

export function savePlayerState(state: StoredPlayerState) {
  const serializable = {
    ...state,
    playlists: state.playlists.map((playlist) => ({
      ...playlist,
      items: playlist.items.map((item) => ({ ...item, url: undefined, missing: true })),
    })),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}

export function loadLyrics(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(LYRICS_KEY) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

export function saveLyrics(lyrics: Record<string, string>) {
  localStorage.setItem(LYRICS_KEY, JSON.stringify(lyrics));
}

function openAssetDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveSkinBackground(file: Blob) {
  const db = await openAssetDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(file, "background");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

export async function loadSkinBackground(): Promise<Blob | null> {
  const db = await openAssetDb();
  const result = await new Promise<Blob | null>((resolve, reject) => {
    const request = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get("background");
    request.onsuccess = () => resolve((request.result as Blob | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return result;
}

export async function clearSkinBackground() {
  const db = await openAssetDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).delete("background");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}
