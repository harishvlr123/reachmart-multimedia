"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EqualizerPanel } from "@/components/audio-player/equalizer-panel";
import { FavoritesPanel } from "@/components/audio-player/favorites-panel";
import { MediaLibraryPanel } from "@/components/audio-player/media-library-panel";
import { PlayerDisplay } from "@/components/audio-player/player-display";
import { PlaylistPanel, PanelHeading } from "@/components/audio-player/playlist-panel";
import { SkinSwitcher } from "@/components/audio-player/skin-switcher";
import { TrackControls } from "@/components/audio-player/track-controls";
import {
  EQ_FREQUENCIES,
  PLAYER_SKINS,
  type EnvironmentEffect,
  type RepeatMode,
  type SkinStyle,
  type Track,
} from "@/components/audio-player/types";
import { VisualizerCanvas } from "@/components/audio-player/visualizer-canvas";

const FAVORITES_KEY = "reach-audio-player-favorites";
const SKIN_KEY = "reach-audio-player-skin";

export function AudioPlayerShell() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const tracksRef = useRef<Track[]>([]);
  const shouldPlayAfterLoadRef = useRef(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const eqNodesRef = useRef<BiquadFilterNode[]>([]);
  const bassNodeRef = useRef<BiquadFilterNode | null>(null);
  const trebleNodeRef = useRef<BiquadFilterNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const wetGainRef = useRef<GainNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const feedbackGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const [tracks, setTracks] = useState<Track[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [shuffle, setShuffle] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [eqValues, setEqValues] = useState(() => Array(10).fill(0) as number[]);
  const [bass, setBass] = useState(0);
  const [treble, setTreble] = useState(0);
  const [environment, setEnvironment] = useState<EnvironmentEffect>("None");
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [skinId, setSkinId] = useState("neon-blue");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeTrack = tracks[activeIndex];
  const activeSkin = PLAYER_SKINS.find((skin) => skin.id === skinId) ?? PLAYER_SKINS[0];
  const skinStyle: SkinStyle = {
    "--player-accent": activeSkin.accent,
    "--player-accent-soft": activeSkin.accentSoft,
    "--player-accent-rgb": activeSkin.accentRgb,
    "--player-panel": activeSkin.panel,
    "--player-display": activeSkin.display,
    "--player-text": activeSkin.text,
  };

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    let cancelled = false;
    try {
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
      const storedSkin = localStorage.getItem(SKIN_KEY);
      queueMicrotask(() => {
        if (cancelled) return;
        if (Array.isArray(storedFavorites)) {
          setFavorites(storedFavorites.filter((value): value is string => typeof value === "string"));
        }
        if (storedSkin && PLAYER_SKINS.some((skin) => skin.id === storedSkin)) setSkinId(storedSkin);
      });
    } catch {
      queueMicrotask(() => {
        if (!cancelled) setError("Saved player preferences could not be loaded.");
      });
    }

    return () => {
      cancelled = true;
      tracksRef.current.forEach((track) => URL.revokeObjectURL(track.url));
      void audioContextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!activeTrack) {
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    audio.src = activeTrack.url;
    audio.load();
  }, [activeTrack]);

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = muted ? 0 : volume;
    } else if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [muted, volume]);

  useEffect(() => {
    eqNodesRef.current.forEach((node, index) => {
      node.gain.value = eqValues[index] ?? 0;
    });
  }, [eqValues]);

  useEffect(() => {
    if (bassNodeRef.current) bassNodeRef.current.gain.value = bass;
  }, [bass]);

  useEffect(() => {
    if (trebleNodeRef.current) trebleNodeRef.current.gain.value = treble;
  }, [treble]);

  useEffect(() => {
    const settings: Record<EnvironmentEffect, { wet: number; delay: number; feedback: number }> = {
      None: { wet: 0, delay: 0.01, feedback: 0 },
      Room: { wet: 0.12, delay: 0.08, feedback: 0.08 },
      Hall: { wet: 0.18, delay: 0.16, feedback: 0.18 },
      Stadium: { wet: 0.24, delay: 0.28, feedback: 0.28 },
      Echo: { wet: 0.32, delay: 0.38, feedback: 0.35 },
    };
    const next = settings[environment];
    if (wetGainRef.current) wetGainRef.current.gain.value = next.wet;
    if (delayNodeRef.current) delayNodeRef.current.delayTime.value = next.delay;
    if (feedbackGainRef.current) feedbackGainRef.current.gain.value = next.feedback;
  }, [environment]);

  const initializeAudioGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || sourceRef.current) return;

    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) {
      setNotice("Advanced visualizer and equalizer are not supported in this browser. Playback remains available.");
      return;
    }

    try {
      const context = new AudioContextClass();
      const source = context.createMediaElementSource(audio);
      const equalizers = EQ_FREQUENCIES.map((frequency) => {
        const filter = context.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = frequency;
        filter.Q.value = 1.1;
        return filter;
      });
      const bassFilter = context.createBiquadFilter();
      bassFilter.type = "lowshelf";
      bassFilter.frequency.value = 180;
      const trebleFilter = context.createBiquadFilter();
      trebleFilter.type = "highshelf";
      trebleFilter.frequency.value = 3500;

      const dryGain = context.createGain();
      const wetGain = context.createGain();
      const delay = context.createDelay(1);
      const feedback = context.createGain();
      const analyserNode = context.createAnalyser();
      const masterGain = context.createGain();
      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.78;
      wetGain.gain.value = 0;
      delay.delayTime.value = 0.01;
      feedback.gain.value = 0;

      source.connect(equalizers[0]);
      equalizers.forEach((filter, index) => {
        const next = equalizers[index + 1];
        if (next) filter.connect(next);
      });
      const lastEqualizer = equalizers[equalizers.length - 1];
      lastEqualizer.connect(bassFilter);
      bassFilter.connect(trebleFilter);
      trebleFilter.connect(dryGain);
      dryGain.connect(analyserNode);
      trebleFilter.connect(delay);
      delay.connect(wetGain);
      wetGain.connect(analyserNode);
      delay.connect(feedback);
      feedback.connect(delay);
      analyserNode.connect(masterGain);
      masterGain.connect(context.destination);
      audio.volume = 1;
      audio.muted = false;

      audioContextRef.current = context;
      sourceRef.current = source;
      eqNodesRef.current = equalizers;
      bassNodeRef.current = bassFilter;
      trebleNodeRef.current = trebleFilter;
      dryGainRef.current = dryGain;
      wetGainRef.current = wetGain;
      delayNodeRef.current = delay;
      feedbackGainRef.current = feedback;
      masterGainRef.current = masterGain;
      masterGain.gain.value = muted ? 0 : volume;
      equalizers.forEach((node, index) => { node.gain.value = eqValues[index]; });
      bassFilter.gain.value = bass;
      trebleFilter.gain.value = treble;
      setAnalyser(analyserNode);
    } catch {
      setNotice("Advanced audio processing could not start. Standard playback is still available.");
    }
  }, [bass, eqValues, muted, treble, volume]);

  async function startPlayback() {
    const audio = audioRef.current;
    if (!audio || !activeTrack) return;
    initializeAudioGraph();
    try {
      if (audioContextRef.current?.state === "suspended") await audioContextRef.current.resume();
      await audio.play();
      shouldPlayAfterLoadRef.current = true;
      setError(null);
    } catch {
      shouldPlayAfterLoadRef.current = false;
      setError("This file could not be played. Try another browser-supported audio format.");
    }
  }

  function moveTrack(direction: 1 | -1, fromEnded = false) {
    if (tracks.length === 0) return;
    shouldPlayAfterLoadRef.current = isPlaying || fromEnded;
    setCurrentTime(0);
    setDuration(0);
    setError(null);

    if (shuffle && tracks.length > 1) {
      let next = activeIndex;
      while (next === activeIndex) next = Math.floor(Math.random() * tracks.length);
      setActiveIndex(next);
      return;
    }

    const next = activeIndex + direction;
    if (next >= 0 && next < tracks.length) {
      setActiveIndex(next);
    } else if (repeatMode === "all" || !fromEnded) {
      setActiveIndex(next < 0 ? tracks.length - 1 : 0);
    } else {
      shouldPlayAfterLoadRef.current = false;
      setIsPlaying(false);
    }
  }

  function handleAudioFiles(files: FileList | null) {
    if (!files?.length) return;
    const supportedExtensions = /\.(mp3|wav|ogg|m4a)$/i;
    const valid = Array.from(files).filter(
      (file) => file.type.startsWith("audio/") || supportedExtensions.test(file.name),
    );
    if (valid.length === 0) {
      setError("No supported audio files were selected.");
      return;
    }
    const additions = valid.map((file, index): Track => ({
      id: `${file.name}-${file.lastModified}-${file.size}-${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size,
    }));
    setTracks((current) => [...current, ...additions]);
    if (activeIndex === -1) setActiveIndex(0);
    setError(valid.length < files.length ? "Some non-audio files were skipped." : null);
  }

  function handleVideoFiles(files: FileList | null) {
    if (!files?.length) return;
    setNotice("Video playback and visual effects coming soon");
  }

  function removeTrack(index: number) {
    const removed = tracks[index];
    if (!removed) return;

    if (index === activeIndex) {
      const audio = audioRef.current;
      audio?.pause();
      audio?.removeAttribute("src");
      audio?.load();
      shouldPlayAfterLoadRef.current = false;
      setCurrentTime(0);
      setDuration(0);
    }

    const nextTracks = tracks.filter((_, trackIndex) => trackIndex !== index);
    setTracks(nextTracks);
    URL.revokeObjectURL(removed.url);
    if (nextTracks.length === 0) {
      setActiveIndex(-1);
    } else if (index < activeIndex) {
      setActiveIndex(activeIndex - 1);
    } else if (index === activeIndex) {
      setActiveIndex(Math.min(index, nextTracks.length - 1));
    }
  }

  function clearPlaylist() {
    const audio = audioRef.current;
    audio?.pause();
    audio?.removeAttribute("src");
    audio?.load();
    tracks.forEach((track) => URL.revokeObjectURL(track.url));
    shouldPlayAfterLoadRef.current = false;
    setTracks([]);
    setActiveIndex(-1);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }

  function selectTrack(index: number) {
    const audio = audioRef.current;
    shouldPlayAfterLoadRef.current = true;
    setCurrentTime(0);
    setDuration(0);
    setError(null);

    if (index === activeIndex && audio) {
      audio.currentTime = 0;
      void startPlayback();
      return;
    }

    setActiveIndex(index);
  }

  function toggleFavorite() {
    if (!activeTrack) return;
    setFavorites((current) => {
      const next = current.includes(activeTrack.name)
        ? current.filter((name) => name !== activeTrack.name)
        : [...current, activeTrack.name];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }

  const environmentOptions = useMemo<EnvironmentEffect[]>(
    () => ["None", "Room", "Hall", "Stadium", "Echo"],
    [],
  );

  return (
    <div
      style={skinStyle}
      className={`audio-player-skin relative overflow-hidden rounded-[2rem] border border-white/10 p-3 shadow-2xl transition-colors duration-500 sm:p-5 ${
        isPlaying ? "player-active" : ""
      }`}
    >
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => {
          if (shouldPlayAfterLoadRef.current && audioRef.current?.paused) void startPlayback();
        }}
        onError={() => setError("This file could not be decoded. Please choose another audio file.")}
        onEnded={() => {
          if (repeatMode === "one" && audioRef.current) {
            audioRef.current.currentTime = 0;
            void startPlayback();
          } else {
            moveTrack(1, true);
          }
        }}
      />

      <div className="relative grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,.52fr)]">
            <PlayerDisplay
              track={activeTrack}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              isFavorite={Boolean(activeTrack && favorites.includes(activeTrack.name))}
              onToggleFavorite={toggleFavorite}
            />
            <SkinSwitcher
              activeSkin={skinId}
              onChange={(nextSkin) => {
                setSkinId(nextSkin);
                localStorage.setItem(SKIN_KEY, nextSkin);
              }}
            />
          </div>

          <TrackControls
            isPlaying={isPlaying}
            hasTrack={Boolean(activeTrack)}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            muted={muted}
            repeatMode={repeatMode}
            shuffle={shuffle}
            onPlayPause={() => {
              if (isPlaying) {
                shouldPlayAfterLoadRef.current = false;
                audioRef.current?.pause();
              } else {
                void startPlayback();
              }
            }}
            onPrevious={() => moveTrack(-1)}
            onNext={() => moveTrack(1)}
            onSeek={(value) => {
              if (audioRef.current) audioRef.current.currentTime = value;
            }}
            onVolume={setVolume}
            onMute={() => setMuted((current) => !current)}
            onRepeat={() => setRepeatMode((current) => current === "off" ? "one" : current === "one" ? "all" : "off")}
            onShuffle={() => setShuffle((current) => !current)}
          />

          {(notice || error) && (
            <div className={`rounded-xl border px-4 py-3 text-xs ${error ? "border-rose-400/20 bg-rose-400/8 text-rose-200" : "border-white/10 bg-white/5 text-white/55"}`}>
              {error ?? notice}
              <button type="button" onClick={() => { setError(null); setNotice(null); }} className="float-right ml-3 text-white/40 hover:text-white">×</button>
            </div>
          )}

          <VisualizerCanvas analyser={analyser} isPlaying={isPlaying} />
          <EqualizerPanel
            values={eqValues}
            bass={bass}
            treble={treble}
            onBandChange={(index, value) => setEqValues((current) => current.map((item, itemIndex) => itemIndex === index ? value : item))}
            onBassChange={setBass}
            onTrebleChange={setTreble}
            onReset={() => { setEqValues(Array(10).fill(0)); setBass(0); setTreble(0); }}
          />
        </div>

        <div className="space-y-4">
          <MediaLibraryPanel
            onAudioFiles={handleAudioFiles}
            onVideoFiles={handleVideoFiles}
          />
          <PlaylistPanel
            tracks={tracks}
            activeIndex={activeIndex}
            onSelect={selectTrack}
            onRemove={removeTrack}
            onClear={clearPlaylist}
          />
          <EffectsPanel
            environment={environment}
            options={environmentOptions}
            onChange={setEnvironment}
          />
          <FavoritesPanel
            favorites={favorites}
            onRemove={(name) => {
              setFavorites((current) => {
                const next = current.filter((item) => item !== name);
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
                return next;
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function EffectsPanel({
  environment,
  options,
  onChange,
}: {
  environment: EnvironmentEffect;
  options: EnvironmentEffect[];
  onChange: (effect: EnvironmentEffect) => void;
}) {
  return (
    <section className="player-panel rounded-[1.6rem] p-4 sm:p-5">
      <PanelHeading title="Effects" meta="Environment" />
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 xl:grid-cols-3">
        {options.map((effect) => (
          <button
            key={effect}
            type="button"
            onClick={() => onChange(effect)}
            className={`rounded-xl border px-3 py-2.5 text-[10px] font-bold transition ${
              environment === effect
                ? "border-[rgba(var(--player-accent-rgb),.4)] bg-[rgba(var(--player-accent-rgb),.12)] text-[var(--player-accent)]"
                : "border-white/8 bg-black/10 text-white/40 hover:text-white/70"
            }`}
          >
            {effect}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[10px] leading-4 text-white/30">
        Environment presets use a light delay effect to preserve reliable playback.
      </p>
    </section>
  );
}
