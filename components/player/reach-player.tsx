"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ColourStudio } from "@/components/player/colour-studio";
import { EffectsPanel } from "@/components/player/effects-panel";
import { Equalizer } from "@/components/player/equalizer";
import { FavoritesPanel } from "@/components/player/favorites-panel";
import { KaraokePanel } from "@/components/player/karaoke-panel";
import { LayoutPresets } from "@/components/player/layout-presets";
import { PanelTitle, PlaylistPanel } from "@/components/player/playlist-panel";
import { PlayerHeader } from "@/components/player/player-header";
import { TransportControls } from "@/components/player/transport-controls";
import { clearSkinBackground, loadLyrics, loadPlayerState, loadSkinBackground, saveLyrics, savePlayerState, saveSkinBackground } from "@/components/player/storage";
import {
  DEFAULT_EFFECTS, DEFAULT_SETTINGS, EQ_FREQUENCIES, PLAYER_SKINS, createDefaultFavoriteGroups, createDefaultPlaylists,
  type FavoriteGroup, type MediaItem, type PlayerPlaylist, type PlayerSkinStyle, type ReachPlayerSettings, type VisualizerType,
} from "@/components/player/types";
import { VideoScreen } from "@/components/player/video-screen";
import { Visualizer } from "@/components/player/visualizer";

type MobileTab = "Player" | "Playlist" | "EQ" | "Effects" | "Skin";
const VISUALIZERS: VisualizerType[] = ["Neon Galaxy", "Rainbow Bars", "Circle Spectrum", "Fire Wave", "Cyber Tunnel", "Star Pulse", "Classic Winamp", "DJ Studio Mix"];

export function ReachPlayer() {
  const mediaRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const urlsRef = useRef(new Set<string>());
  const hydratedRef = useRef(false);
  const shouldAutoplayRef = useRef(false);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const eqRefs = useRef<BiquadFilterNode[]>([]);
  const bassRef = useRef<BiquadFilterNode | null>(null);
  const lowPassRef = useRef<BiquadFilterNode | null>(null);
  const highPassRef = useRef<BiquadFilterNode | null>(null);
  const normalRef = useRef<GainNode | null>(null);
  const cancelRef = useRef<GainNode | null>(null);
  const wetRef = useRef<GainNode | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const feedbackRef = useRef<GainNode | null>(null);
  const widthDelayRef = useRef<DelayNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const [playlists, setPlaylists] = useState<PlayerPlaylist[]>(createDefaultPlaylists);
  const [favoriteGroups, setFavoriteGroups] = useState<FavoriteGroup[]>(createDefaultFavoriteGroups);
  const [settings, setSettings] = useState<ReachPlayerSettings>(DEFAULT_SETTINGS);
  const [activeItemId, setActiveItemId] = useState<string>();
  const [activeFavoriteGroupId, setActiveFavoriteGroupId] = useState("favorite-1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [mini, setMini] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("Player");
  const [lyricsMap, setLyricsMap] = useState<Record<string, string>>({});
  const [skinBackgroundUrl, setSkinBackgroundUrl] = useState("");
  const [subtitleUrl, setSubtitleUrl] = useState("");
  const [notice, setNotice] = useState("Select files or a folder to begin.");

  const activePlaylist = playlists.find((playlist) => playlist.id === settings.activePlaylistId) ?? playlists[0];
  const allItems = useMemo(() => {
    const unique = new Map<string, MediaItem>();
    playlists.forEach((playlist) => playlist.items.forEach((item) => unique.set(item.key, item)));
    return [...unique.values()];
  }, [playlists]);
  const activeItem = allItems.find((item) => item.id === activeItemId);
  const activeIndex = activePlaylist.items.findIndex((item) => item.id === activeItemId);
  const activeSkin = PLAYER_SKINS.find((skin) => skin.id === settings.activeSkinId) ?? PLAYER_SKINS[0];
  const activeLyrics = activeItem ? lyricsMap[activeItem.name] ?? "" : "";
  const shapeClass = { Rounded: "rounded-[2rem]", Square: "rounded-md", Capsule: "rounded-[3rem]", Compact: "rounded-2xl max-w-5xl mx-auto", "Wide Deck": "rounded-[1.5rem]" }[settings.shape];
  const skinStyle: PlayerSkinStyle = {
    "--rp-accent": activeSkin.accent, "--rp-soft": activeSkin.soft, "--rp-rgb": activeSkin.rgb,
    "--rp-panel": activeSkin.panel, "--rp-screen": activeSkin.screen, "--rp-text": activeSkin.light ? "#0f172a" : "#f8fafc",
    "--rp-bg-opacity": String(settings.skinOpacity), "--rp-bg-blur": `${settings.skinBlur}px`,
    "--rp-custom-bg": skinBackgroundUrl ? `url("${skinBackgroundUrl}")` : "none", "--rp-glow": String(settings.skinGlow),
  };

  useEffect(() => {
    let cancelled = false;
    const urls = urlsRef.current;
    const stored = loadPlayerState();
    void loadSkinBackground().then((blob) => {
      if (!blob || cancelled) return;
      const url = URL.createObjectURL(blob);
      urls.add(url);
      setSkinBackgroundUrl(url);
    });
    queueMicrotask(() => {
      if (cancelled) return;
      setPlaylists(stored.playlists);
      setFavoriteGroups(stored.favoriteGroups);
      setSettings(stored.settings);
      setLyricsMap(loadLyrics());
      hydratedRef.current = true;
    });
    return () => {
      cancelled = true;
      urls.forEach((url) => URL.revokeObjectURL(url));
      void contextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (hydratedRef.current) savePlayerState({ playlists, favoriteGroups, settings });
  }, [favoriteGroups, playlists, settings]);

  useEffect(() => {
    if (!activeItem?.url || !mediaRef.current) return;
    mediaRef.current.src = activeItem.url;
    mediaRef.current.load();
    setCurrentTime(0);
    setDuration(0);
  }, [activeItem?.id, activeItem?.url]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    media.playbackRate = Math.max(0.5, Math.min(2, settings.playbackSpeed * Math.pow(2, settings.pitch / 12)));
    media.preservesPitch = settings.pitch === 0;
  }, [settings.pitch, settings.playbackSpeed]);

  useEffect(() => {
    const gain = settings.muted ? 0 : settings.volume;
    if (masterRef.current) masterRef.current.gain.value = gain;
    else if (mediaRef.current) { mediaRef.current.volume = settings.volume; mediaRef.current.muted = settings.muted; }
  }, [settings.muted, settings.volume]);

  useEffect(() => {
    eqRefs.current.forEach((node, index) => { node.gain.value = settings.eqEnabled ? settings.eqValues[index] : 0; });
  }, [settings.eqEnabled, settings.eqValues]);

  useEffect(() => {
    const effects = settings.effects;
    if (bassRef.current) bassRef.current.gain.value = effects.enabled ? effects.bass : 0;
    if (lowPassRef.current) lowPassRef.current.frequency.value = effects.enabled ? effects.lowPass : 20000;
    if (highPassRef.current) highPassRef.current.frequency.value = effects.enabled ? effects.highPass : 20;
    if (wetRef.current) wetRef.current.gain.value = effects.enabled ? Math.max(effects.reverb * 0.32, effects.echo * 0.42) : 0;
    if (delayRef.current) delayRef.current.delayTime.value = effects.enabled ? 0.04 + effects.echo * 0.42 + effects.reverb * 0.12 : 0.01;
    if (feedbackRef.current) feedbackRef.current.gain.value = effects.enabled ? effects.echo * 0.38 + effects.reverb * 0.14 : 0;
    if (widthDelayRef.current) widthDelayRef.current.delayTime.value = effects.enabled ? effects.stereoWidth * 0.018 : 0;
    if (compressorRef.current) { compressorRef.current.threshold.value = effects.nightMode ? -35 : -12; compressorRef.current.ratio.value = effects.nightMode ? 10 : 2; }
    if (masterRef.current) masterRef.current.gain.value = (settings.muted ? 0 : settings.volume) * (effects.enabled && effects.normalize ? 1.28 : 1);
  }, [settings.effects, settings.muted, settings.volume]);

  useEffect(() => {
    const strength = settings.karaokeStrength / 100;
    const voice = settings.karaokeVoiceAmount / 100;
    const music = settings.karaokeMusicAmount / 100;
    let normal = 1;
    let cancel = 0;
    if (settings.karaokeEnabled && settings.karaokeMode !== "Normal Original Voice") {
      if (settings.karaokeMode === "Vocal Reduce") { normal = (1 - strength * 0.7) * voice; cancel = strength * 0.55 * music; }
      else if (settings.karaokeMode === "Music Focus") { normal = (1 - strength * 0.85) * voice; cancel = strength * 0.8 * music; }
      else if (settings.karaokeMode === "Karaoke Experimental") { normal = (1 - strength * 0.95) * voice; cancel = strength * music; }
      else { normal = (1 - strength) * voice; cancel = Math.min(1.2, strength * 1.15) * music; }
    }
    if (normalRef.current) normalRef.current.gain.value = normal;
    if (cancelRef.current) cancelRef.current.gain.value = cancel;
  }, [settings.karaokeEnabled, settings.karaokeMode, settings.karaokeMusicAmount, settings.karaokeStrength, settings.karaokeVoiceAmount]);

  const initializeAudio = useCallback(() => {
    const media = mediaRef.current;
    if (!media || sourceRef.current) return;
    try {
      const context = new AudioContext();
      const source = context.createMediaElementSource(media);
      const eq = EQ_FREQUENCIES.map((frequency) => { const node = context.createBiquadFilter(); node.type = "peaking"; node.frequency.value = frequency; node.Q.value = 1.05; return node; });
      const bass = context.createBiquadFilter(); bass.type = "lowshelf"; bass.frequency.value = 180;
      const lowPass = context.createBiquadFilter(); lowPass.type = "lowpass";
      const highPass = context.createBiquadFilter(); highPass.type = "highpass";
      const normal = context.createGain();
      const cancel = context.createGain();
      const splitter = context.createChannelSplitter(2);
      const widthDelay = context.createDelay(0.03);
      const widthMerger = context.createChannelMerger(2);
      const left = context.createGain();
      const right = context.createGain(); right.gain.value = -1;
      const cancelMerger = context.createChannelMerger(2);
      const dry = context.createGain();
      const delay = context.createDelay(1);
      const wet = context.createGain(); wet.gain.value = 0;
      const feedback = context.createGain(); feedback.gain.value = 0;
      const compressor = context.createDynamicsCompressor();
      const analyserNode = context.createAnalyser(); analyserNode.fftSize = 512; analyserNode.smoothingTimeConstant = 0.8;
      const master = context.createGain();

      source.connect(eq[0]);
      eq.forEach((node, index) => { if (eq[index + 1]) node.connect(eq[index + 1]); });
      eq.at(-1)?.connect(bass); bass.connect(lowPass); lowPass.connect(highPass); highPass.connect(splitter);
      splitter.connect(widthMerger, 0, 0); splitter.connect(widthDelay, 1); widthDelay.connect(widthMerger, 0, 1);
      widthMerger.connect(normal); normal.connect(dry);
      splitter.connect(left, 0); splitter.connect(right, 1);
      left.connect(cancelMerger, 0, 0); left.connect(cancelMerger, 0, 1); right.connect(cancelMerger, 0, 0); right.connect(cancelMerger, 0, 1);
      cancelMerger.connect(cancel); cancel.connect(dry);
      highPass.connect(delay); delay.connect(wet); delay.connect(feedback); feedback.connect(delay);
      dry.connect(compressor); wet.connect(compressor); compressor.connect(analyserNode); analyserNode.connect(master); master.connect(context.destination);
      media.volume = 1; media.muted = false;
      contextRef.current = context; sourceRef.current = source; eqRefs.current = eq; bassRef.current = bass;
      lowPassRef.current = lowPass; highPassRef.current = highPass; normalRef.current = normal; cancelRef.current = cancel;
      wetRef.current = wet; delayRef.current = delay; feedbackRef.current = feedback; widthDelayRef.current = widthDelay;
      compressorRef.current = compressor; masterRef.current = master; setAnalyser(analyserNode);
      normal.gain.value = 1; cancel.gain.value = 0;
    } catch {
      setNotice("Advanced audio processing is unavailable. Standard playback remains active.");
    }
  }, []);

  async function play() {
    const media = mediaRef.current;
    if (!media || !activeItem?.url) { setNotice(activeItem?.missing ? "Reselect the matching file or folder." : "Select a playable file first."); return; }
    initializeAudio();
    try {
      if (contextRef.current?.state === "suspended") await contextRef.current.resume();
      await media.play();
      shouldAutoplayRef.current = true;
      setNotice("");
    } catch {
      shouldAutoplayRef.current = false;
      setNotice("This media format is not supported by the current browser.");
    }
  }

  function pause() { shouldAutoplayRef.current = false; mediaRef.current?.pause(); }
  function selectItem(item: MediaItem) { setActiveItemId(item.id); shouldAutoplayRef.current = true; if (item.id === activeItemId && item.url) { if (mediaRef.current) mediaRef.current.currentTime = 0; void play(); } }
  function next(direction: -1 | 1, ended = false) {
    if (!activePlaylist.items.length) return;
    let index = activeIndex;
    if (settings.shuffle && activePlaylist.items.length > 1) while (index === activeIndex) index = Math.floor(Math.random() * activePlaylist.items.length);
    else {
      index += direction;
      if (index < 0 || index >= activePlaylist.items.length) {
        if (settings.repeat === "all" || !ended) index = index < 0 ? activePlaylist.items.length - 1 : 0;
        else return pause();
      }
    }
    shouldAutoplayRef.current = true;
    setActiveItemId(activePlaylist.items[index].id);
  }

  function importFiles(files: FileList | null) {
    if (!files?.length) return;
    const audioPattern = /\.(mp3|wav|ogg|m4a|aac|flac)$/i;
    const videoPattern = /\.(mp4|webm|mov)$/i;
    const valid = Array.from(files).filter((file) => file.type.startsWith("audio/") || file.type.startsWith("video/") || audioPattern.test(file.name) || videoPattern.test(file.name));
    if (!valid.length) return setNotice("No supported audio or video files were found.");
    const imported = valid.map((file): MediaItem => {
      const path = (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name;
      const key = `${path}|${file.size}|${file.lastModified}`;
      const url = URL.createObjectURL(file); urlsRef.current.add(url);
      return { id: `${key}|${crypto.randomUUID()}`, key, name: file.name, kind: file.type.startsWith("video/") || videoPattern.test(file.name) ? "video" : "audio", mime: file.type, size: file.size, lastModified: file.lastModified, path, url, missing: false };
    });
    const byKey = new Map(imported.map((item) => [item.key, item]));
    const restored = new Set<string>();
    const existingMatch = allItems.find((item) => byKey.has(item.key));
    setPlaylists((current) => current.map((playlist) => ({ ...playlist, items: playlist.items.map((item) => {
      const match = byKey.get(item.key); if (!match) return item; restored.add(item.key); return { ...item, url: match.url, mime: match.mime, missing: false };
    }) })).map((playlist) => playlist.id === settings.activePlaylistId ? { ...playlist, items: [...playlist.items, ...imported.filter((item) => !restored.has(item.key) && !playlist.items.some((existing) => existing.key === item.key))] } : playlist));
    if (!activeItemId) setActiveItemId(existingMatch?.id ?? imported[0].id);
    setNotice(`${valid.length} local media file${valid.length === 1 ? "" : "s"} ready.`);
  }

  function revokeIfUnused(item: MediaItem, excludingId: string) {
    const used = item.url && playlists.some((playlist) => playlist.items.some((entry) => entry.id !== excludingId && entry.url === item.url));
    if (item.url && !used) { URL.revokeObjectURL(item.url); urlsRef.current.delete(item.url); }
  }
  function removeItem(itemId: string) {
    const item = activePlaylist.items.find((entry) => entry.id === itemId);
    if (item) revokeIfUnused(item, itemId);
    if (itemId === activeItemId) { pause(); mediaRef.current?.removeAttribute("src"); mediaRef.current?.load(); setActiveItemId(undefined); }
    setPlaylists((current) => current.map((playlist) => playlist.id === settings.activePlaylistId ? { ...playlist, items: playlist.items.filter((entry) => entry.id !== itemId) } : playlist));
  }
  function clearPlaylist() {
    activePlaylist.items.forEach((item) => revokeIfUnused(item, item.id));
    pause(); mediaRef.current?.removeAttribute("src"); mediaRef.current?.load(); setActiveItemId(undefined);
    setPlaylists((current) => current.map((playlist) => playlist.id === settings.activePlaylistId ? { ...playlist, items: [] } : playlist));
  }
  function fullscreen(element: HTMLElement | null) { if (!element) return; if (document.fullscreenElement) void document.exitFullscreen(); else void element.requestFullscreen(); }

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const onTime = () => setCurrentTime(media.currentTime);
    const onDuration = () => {
      const value = Number.isFinite(media.duration) ? media.duration : 0;
      setDuration(value);
      if (activeItemId && value) setPlaylists((current) => current.map((playlist) => ({ ...playlist, items: playlist.items.map((item) => item.id === activeItemId ? { ...item, duration: value } : item) })));
    };
    const onCanPlay = () => { if (shouldAutoplayRef.current && media.paused) void play(); };
    const onEnded = () => { if (settings.repeat === "one") { media.currentTime = 0; void play(); } else next(1, true); };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    media.addEventListener("timeupdate", onTime); media.addEventListener("durationchange", onDuration); media.addEventListener("canplay", onCanPlay);
    media.addEventListener("ended", onEnded); media.addEventListener("play", onPlay); media.addEventListener("pause", onPause);
    return () => { media.removeEventListener("timeupdate", onTime); media.removeEventListener("durationchange", onDuration); media.removeEventListener("canplay", onCanPlay); media.removeEventListener("ended", onEnded); media.removeEventListener("play", onPlay); media.removeEventListener("pause", onPause); };
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.code === "Space") { event.preventDefault(); if (isPlaying) pause(); else void play(); }
      else if (event.key === "ArrowLeft" && mediaRef.current) mediaRef.current.currentTime = Math.max(0, mediaRef.current.currentTime - 5);
      else if (event.key === "ArrowRight" && mediaRef.current) mediaRef.current.currentTime = Math.min(duration || Infinity, mediaRef.current.currentTime + 5);
      else if (event.key === "ArrowUp") setSettings((current) => ({ ...current, volume: Math.min(1, current.volume + 0.05) }));
      else if (event.key === "ArrowDown") setSettings((current) => ({ ...current, volume: Math.max(0, current.volume - 0.05) }));
      else if (event.key.toLowerCase() === "f") fullscreen(playerRef.current);
      else if (event.key.toLowerCase() === "n") next(1);
      else if (event.key.toLowerCase() === "p") next(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const hideSideDocks = settings.layoutPreset === "Visualizer Focus" || settings.layoutPreset === "Player Focus";
  const studioColumns = hideSideDocks ? "lg:grid-cols-1" : "lg:grid-cols-[minmax(220px,.62fr)_minmax(420px,1.5fr)_minmax(240px,.68fr)]";
  const resetDefaults = () => {
    setMini(false); setMobileTab("Player");
    setSettings((current) => ({ ...current, volume: 0.8, playbackSpeed: 1, pitch: 0, eqEnabled: true, eqValues: [...DEFAULT_SETTINGS.eqValues], eqPreset: "Flat", effects: { ...DEFAULT_EFFECTS, enabled: false }, visualizerEnabled: true, visualizerType: "Neon Galaxy", visualizerSensitivity: 1, visualizerColorSpeed: 1, visualizerSize: 1, karaokeEnabled: false, karaokeMode: "Normal Original Voice", lyricsVisible: false, colourStudioOpen: false, activeSkinId: "classic-deck", layoutPreset: "Default Studio" }));
    setNotice("Default studio settings restored. Songs and favorites were kept.");
  };
  const setSkinPhoto = (file: File) => {
    void saveSkinBackground(file);
    if (skinBackgroundUrl) { URL.revokeObjectURL(skinBackgroundUrl); urlsRef.current.delete(skinBackgroundUrl); }
    const url = URL.createObjectURL(file); urlsRef.current.add(url); setSkinBackgroundUrl(url);
  };
  const resetSkin = () => {
    void clearSkinBackground();
    if (skinBackgroundUrl) { URL.revokeObjectURL(skinBackgroundUrl); urlsRef.current.delete(skinBackgroundUrl); }
    setSkinBackgroundUrl("");
    setSettings((current) => ({ ...current, activeSkinId: "classic-deck", shape: "Rounded", skinOpacity: 0.3, skinBlur: 8, skinGlow: 0.45 }));
  };

  const playlistDock = <PlaylistPanel
    playlists={playlists} activePlaylistId={settings.activePlaylistId} activeItemId={activeItemId} favoriteGroups={favoriteGroups}
    onActivePlaylist={(id) => setSettings((current) => ({ ...current, activePlaylistId: id }))}
    onCreatePlaylist={() => { const name = window.prompt("Playlist name", `Playlist ${playlists.length + 1}`); if (name?.trim()) setPlaylists((current) => [...current, { id: crypto.randomUUID(), name: name.trim(), items: [] }]); }}
    onRenamePlaylist={(id) => { const playlist = playlists.find((entry) => entry.id === id); const name = window.prompt("Rename playlist", playlist?.name); if (name?.trim()) setPlaylists((current) => current.map((entry) => entry.id === id ? { ...entry, name: name.trim() } : entry)); }}
    onDeletePlaylist={(id) => { if (playlists.length === 1) return setNotice("At least one playlist is required."); const remaining = playlists.filter((playlist) => playlist.id !== id); setPlaylists(remaining); setSettings((current) => ({ ...current, activePlaylistId: remaining[0].id })); }}
    onFiles={importFiles} onSelect={selectItem} onRemove={removeItem} onClear={() => { if (window.confirm("Clear this playlist? Favorites and other playlists will remain.")) clearPlaylist(); }}
    onMove={(itemId, targetId) => { const item = activePlaylist.items.find((entry) => entry.id === itemId); if (!item) return; setPlaylists((current) => current.map((playlist) => playlist.id === settings.activePlaylistId ? { ...playlist, items: playlist.items.filter((entry) => entry.id !== itemId) } : playlist.id === targetId ? { ...playlist, items: [...playlist.items, item] } : playlist)); }}
    onReorder={(itemId, direction) => setPlaylists((current) => current.map((playlist) => { if (playlist.id !== settings.activePlaylistId) return playlist; const items = [...playlist.items]; const index = items.findIndex((item) => item.id === itemId); const target = index + direction; if (index < 0 || target < 0 || target >= items.length) return playlist; [items[index], items[target]] = [items[target], items[index]]; return { ...playlist, items }; }))}
    onToggleFavorite={(key, groupId) => setFavoriteGroups((current) => current.map((group) => group.id === groupId ? { ...group, itemKeys: group.itemKeys.includes(key) ? group.itemKeys.filter((entry) => entry !== key) : [...group.itemKeys, key] } : group))}
  />;
  const favoritesDock = <FavoritesPanel groups={favoriteGroups} items={allItems} activeGroupId={activeFavoriteGroupId} onActiveGroup={setActiveFavoriteGroupId} onRename={(id) => { const group = favoriteGroups.find((entry) => entry.id === id); const name = window.prompt("Rename favorite group", group?.name); if (name?.trim()) setFavoriteGroups((current) => current.map((entry) => entry.id === id ? { ...entry, name: name.trim() } : entry)); }} onSelect={selectItem} onRemove={(key, groupId) => setFavoriteGroups((current) => current.map((group) => group.id === groupId ? { ...group, itemKeys: group.itemKeys.filter((entry) => entry !== key) } : group))} />;

  return (
    <div ref={playerRef} style={skinStyle} className={`reach-player relative overflow-hidden border border-white/10 p-3 shadow-2xl transition-all sm:p-4 ${shapeClass} ${mini ? "rp-mini" : ""} ${isPlaying ? "rp-playing" : ""}`}>
      <div className="rp-custom-background" />
      <div className="relative">
        <PlayerHeader trackName={activeItem?.name} />
        <TransportControls item={activeItem} isPlaying={isPlaying} currentTime={currentTime} duration={duration} settings={settings} onPlayPause={() => isPlaying ? pause() : void play()} onPrevious={() => next(-1)} onNext={() => next(1)} onSeek={(value) => { if (mediaRef.current) mediaRef.current.currentTime = value; }} onSettings={setSettings} />

        <div className="mt-3 rounded-xl border border-white/7 bg-black/10 p-2">
          <LayoutPresets value={settings.layoutPreset} onChange={(layoutPreset) => { setSettings((current) => ({ ...current, layoutPreset })); setMini(layoutPreset === "Compact Mode"); }} onReset={() => setSettings((current) => ({ ...current, layoutPreset: "Default Studio" }))} />
          <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-5 lg:grid-cols-10">
            <Toolbar label={`Visualizer ${settings.visualizerEnabled ? "ON" : "OFF"}`} active={settings.visualizerEnabled} onClick={() => setSettings((current) => ({ ...current, visualizerEnabled: !current.visualizerEnabled }))} />
            <Toolbar label={`Equalizer ${settings.eqEnabled ? "ON" : "OFF"}`} active={settings.eqEnabled} onClick={() => setSettings((current) => ({ ...current, eqEnabled: !current.eqEnabled }))} />
            <Toolbar label={`Effects ${settings.effects.enabled ? "ON" : "OFF"}`} active={settings.effects.enabled} onClick={() => setSettings((current) => ({ ...current, effects: { ...current.effects, enabled: !current.effects.enabled } }))} />
            <Toolbar label={`Karaoke ${settings.karaokeEnabled ? "ON" : "OFF"}`} active={settings.karaokeEnabled} onClick={() => setSettings((current) => ({ ...current, karaokeEnabled: !current.karaokeEnabled }))} />
            <Toolbar label={`Video ${settings.videoEnabled ? "ON" : "OFF"}`} active={settings.videoEnabled} onClick={() => setSettings((current) => ({ ...current, videoEnabled: !current.videoEnabled }))} />
            <Toolbar label={`Lyrics ${settings.lyricsVisible ? "ON" : "OFF"}`} active={settings.lyricsVisible} onClick={() => setSettings((current) => ({ ...current, lyricsVisible: !current.lyricsVisible }))} />
            <Toolbar label="Colour Studio" active={settings.colourStudioOpen} onClick={() => setSettings((current) => ({ ...current, colourStudioOpen: !current.colourStudioOpen }))} />
            <Toolbar label="Default Settings" onClick={resetDefaults} />
            <Toolbar label="Fullscreen" onClick={() => fullscreen(playerRef.current)} />
            <Toolbar label={mini ? "Normal Mode" : "Mini Mode"} active={mini} onClick={() => setMini((value) => !value)} />
          </div>
        </div>

        <nav className="mt-3 grid grid-cols-5 gap-1 lg:hidden">
          {(["Player", "Playlist", "EQ", "Effects", "Skin"] as MobileTab[]).map((tab) => <button key={tab} type="button" onClick={() => setMobileTab(tab)} className={`rounded-lg px-2 py-2 text-[9px] font-bold ${mobileTab === tab ? "bg-[rgba(var(--rp-rgb),.14)] text-[var(--rp-accent)]" : "text-white/35"}`}>{tab}</button>)}
        </nav>

        <div className={`mt-3 grid gap-3 ${studioColumns}`}>
          {!hideSideDocks && <div className={`${mobileTab === "Effects" ? "block" : "hidden"} lg:block`}><EffectsPanel effects={settings.effects} onChange={(effects) => setSettings((current) => ({ ...current, effects }))} onReset={() => setSettings((current) => ({ ...current, effects: { ...DEFAULT_EFFECTS, enabled: false } }))} /></div>}
          <section className={`${mobileTab === "Player" ? "block" : "hidden"} rp-panel rp-magnet lg:block`}>
            <div className="flex flex-wrap items-center justify-between gap-2"><PanelTitle title={activeItem?.kind === "video" && settings.videoEnabled ? "Video Screen" : "Grand Visualizer"} meta={activeItem?.name ?? "Reach Player Studio"} /><select value={settings.visualizerType} onChange={(event) => setSettings((current) => ({ ...current, visualizerType: event.target.value as VisualizerType }))} className="rp-select">{VISUALIZERS.map((type) => <option key={type}>{type}</option>)}</select></div>
            <div className="relative mt-3 h-[clamp(260px,31vw,430px)]">
              <VideoScreen mediaRef={mediaRef} item={settings.videoEnabled ? activeItem : activeItem?.kind === "audio" ? activeItem : undefined} fit={settings.videoFit} subtitleUrl={subtitleUrl} onFullscreen={() => fullscreen(mediaRef.current)} />
              {(activeItem?.kind !== "video" || !settings.videoEnabled || settings.videoVisualizerOverlay) && <div className={activeItem?.kind === "video" && settings.videoEnabled ? "absolute inset-0 opacity-70" : "absolute inset-0"}><Visualizer analyser={analyser} active={settings.visualizerEnabled} type={settings.visualizerType} sensitivity={settings.visualizerSensitivity} colorSpeed={settings.visualizerColorSpeed} size={settings.visualizerSize} overlay={activeItem?.kind === "video"} onFullscreen={fullscreen} /></div>}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3"><MiniSlider label="Intensity" value={settings.visualizerSensitivity} min={0.5} max={2.5} step={0.1} onChange={(visualizerSensitivity) => setSettings((current) => ({ ...current, visualizerSensitivity }))} /><MiniSlider label="Colour speed" value={settings.visualizerColorSpeed} min={0.2} max={3} step={0.1} onChange={(visualizerColorSpeed) => setSettings((current) => ({ ...current, visualizerColorSpeed }))} /><MiniSlider label="Visualizer size" value={settings.visualizerSize} min={0.6} max={1.5} step={0.1} onChange={(visualizerSize) => setSettings((current) => ({ ...current, visualizerSize }))} /></div>
            {activeItem?.kind === "video" && <div className="mt-3 flex flex-wrap gap-2"><select value={settings.videoFit} onChange={(event) => setSettings((current) => ({ ...current, videoFit: event.target.value as ReachPlayerSettings["videoFit"] }))} className="rp-select"><option>contain</option><option>cover</option><option>original</option></select><Toolbar label="Visualizer Overlay" active={settings.videoVisualizerOverlay} onClick={() => setSettings((current) => ({ ...current, videoVisualizerOverlay: !current.videoVisualizerOverlay }))} /><SubtitleInput currentUrl={subtitleUrl} onUrl={(url) => { if (subtitleUrl) { URL.revokeObjectURL(subtitleUrl); urlsRef.current.delete(subtitleUrl); } urlsRef.current.add(url); setSubtitleUrl(url); }} /></div>}
          </section>
          {!hideSideDocks && <div className={`${mobileTab === "EQ" ? "block" : "hidden"} lg:block`}><Equalizer enabled={settings.eqEnabled} values={settings.eqValues} preset={settings.eqPreset} onEnabled={(eqEnabled) => setSettings((current) => ({ ...current, eqEnabled }))} onValue={(index, value) => setSettings((current) => ({ ...current, eqPreset: "Flat", eqValues: current.eqValues.map((entry, itemIndex) => itemIndex === index ? value : entry) }))} onPreset={(eqPreset, eqValues) => setSettings((current) => ({ ...current, eqPreset, eqValues }))} onReset={() => setSettings((current) => ({ ...current, eqPreset: "Flat", eqValues: [...DEFAULT_SETTINGS.eqValues] }))} /></div>}
        </div>

        {settings.colourStudioOpen && <div className={`${mobileTab === "Skin" || mobileTab === "Player" ? "block" : "hidden"} mt-3 lg:block`}><ColourStudio skinId={settings.activeSkinId} shape={settings.shape} opacity={settings.skinOpacity} blur={settings.skinBlur} glow={settings.skinGlow} hasBackground={Boolean(skinBackgroundUrl)} onSkin={(activeSkinId) => setSettings((current) => ({ ...current, activeSkinId }))} onShape={(shape) => setSettings((current) => ({ ...current, shape }))} onOpacity={(skinOpacity) => setSettings((current) => ({ ...current, skinOpacity }))} onBlur={(skinBlur) => setSettings((current) => ({ ...current, skinBlur }))} onGlow={(skinGlow) => setSettings((current) => ({ ...current, skinGlow }))} onBackground={setSkinPhoto} onReset={resetSkin} onSave={() => setNotice("Skin settings saved in this browser.")} /></div>}

        {(settings.karaokeEnabled || settings.lyricsVisible) && <div className="mt-3"><KaraokePanel enabled={settings.karaokeEnabled} mode={settings.karaokeMode} strength={settings.karaokeStrength} voiceAmount={settings.karaokeVoiceAmount} musicAmount={settings.karaokeMusicAmount} lyrics={activeLyrics} pitch={settings.pitch} speed={settings.playbackSpeed} autoScroll={settings.lyricsAutoScroll} dim={settings.karaokeDim} currentTime={currentTime} onEnabled={(karaokeEnabled) => setSettings((current) => ({ ...current, karaokeEnabled }))} onMode={(karaokeMode) => setSettings((current) => ({ ...current, karaokeMode }))} onStrength={(karaokeStrength) => setSettings((current) => ({ ...current, karaokeStrength }))} onVoiceAmount={(karaokeVoiceAmount) => setSettings((current) => ({ ...current, karaokeVoiceAmount }))} onMusicAmount={(karaokeMusicAmount) => setSettings((current) => ({ ...current, karaokeMusicAmount }))} onLyrics={(value) => { if (!activeItem) return; setLyricsMap((current) => { const nextMap = { ...current, [activeItem.name]: value }; saveLyrics(nextMap); return nextMap; }); }} onPitch={(pitch) => setSettings((current) => ({ ...current, pitch }))} onSpeed={(playbackSpeed) => setSettings((current) => ({ ...current, playbackSpeed }))} onAutoScroll={(lyricsAutoScroll) => setSettings((current) => ({ ...current, lyricsAutoScroll }))} onDim={(karaokeDim) => setSettings((current) => ({ ...current, karaokeDim }))} onFullscreen={fullscreen} /></div>}

        <div className={`${mobileTab === "Playlist" || mobileTab === "Player" ? "grid" : "hidden"} mt-3 gap-3 lg:grid lg:grid-cols-2`}>{playlistDock}{favoritesDock}</div>
        <div className="mt-3 flex flex-col gap-1 px-2 text-[9px] leading-4 text-white/25 sm:flex-row sm:justify-between"><p>Local songs stay on your device; the browser may ask you to select the folder again after reload.</p><p>{notice || "No server upload. Keyboard: Space, arrows, F, N, P."}</p></div>
      </div>
    </div>
  );
}

function Toolbar({ label, active = false, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rp-toolbar-button ${active ? "is-active" : ""}`}>{label}</button>;
}

function MiniSlider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return <label><span className="flex justify-between text-[9px] font-bold uppercase text-white/35"><span>{label}</span><span>{value}</span></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="rp-range mt-2 w-full" /></label>;
}

function SubtitleInput({ currentUrl, onUrl }: { currentUrl: string; onUrl: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return <>
    <input ref={inputRef} type="file" accept=".srt,.vtt,text/vtt" className="hidden" onChange={(event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (file.name.toLowerCase().endsWith(".vtt")) onUrl(URL.createObjectURL(file));
      else void file.text().then((text) => onUrl(URL.createObjectURL(new Blob([`WEBVTT\n\n${text.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2")}`], { type: "text/vtt" }))));
      event.target.value = "";
    }} />
    <button type="button" onClick={() => inputRef.current?.click()} className="rp-header-button">{currentUrl ? "Replace subtitles" : "Load subtitles"}</button>
  </>;
}
