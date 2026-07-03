import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp, reachVideoStudioReleaseUrl } from "@/lib/apps";

export const metadata: Metadata = { title: "Reach Video Player" };

export default function VideoPlayerPage() {
  return (
    <FeaturePage
      app={getApp("video-player")}
      downloadActions={[
        { label: "Download PC / Windows EXE", href: "/downloads/ReachVideoPlayer.exe" },
        { label: "Download Android APK", href: "/downloads/ReachVideoPlayer.apk", variant: "secondary" },
        {
          label: "Source Code",
          href: reachVideoStudioReleaseUrl,
          external: true,
          variant: "small",
        },
      ]}
    />
  );
}
