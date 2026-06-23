import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "ReachBrowser" };

export default function BrowserPage() {
  return <FeaturePage app={getApp("browser")} ctaLabel="Download for Windows" ctaHref="#" />;
}
