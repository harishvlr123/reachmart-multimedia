import type { RefObject } from "react";
import type { MediaItem, VideoFit } from "@/components/player/types";

export function VideoScreen({
  mediaRef,
  item,
  fit,
  subtitleUrl,
  onFullscreen,
}: {
  mediaRef: RefObject<HTMLVideoElement | null>;
  item?: MediaItem;
  fit: VideoFit;
  subtitleUrl?: string;
  onFullscreen: () => void;
}) {
  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl bg-black">
      <video
        ref={mediaRef}
        playsInline
        preload="metadata"
        className={`h-full w-full ${fit === "original" ? "object-none" : fit === "cover" ? "object-cover" : "object-contain"} ${item?.kind === "audio" ? "invisible absolute" : ""}`}
      >
        {subtitleUrl && <track kind="subtitles" src={subtitleUrl} srcLang="en" label="Loaded subtitles" default />}
      </video>
      {item?.kind === "video" && (
        <button type="button" onClick={onFullscreen} className="absolute right-3 top-3 rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-[10px] text-white/70 backdrop-blur">
          Fullscreen video
        </button>
      )}
    </div>
  );
}
