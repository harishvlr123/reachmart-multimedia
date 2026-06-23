import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Reach Video Player" };

export default function VideoPlayerPage() {
  return <FeaturePage app={getApp("video-player")} ctaLabel="Open Beta" ctaHref="/coming-soon" />;
}
