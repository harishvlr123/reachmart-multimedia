import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Reach Audio Player" };

export default function AudioPlayerPage() {
  return <FeaturePage app={getApp("audio-player")} ctaLabel="Open Beta" ctaHref="/coming-soon" />;
}
