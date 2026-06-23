import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "AI Video Converter" };

export default function AiVideoPage() {
  return <FeaturePage app={getApp("ai-video")} />;
}
