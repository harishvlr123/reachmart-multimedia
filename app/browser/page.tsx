import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "ReachBrowser" };

export default function BrowserPage() {
  return (
    <FeaturePage
      app={getApp("browser")}
      downloadActions={[
        { label: "Download PC / Windows EXE", href: "/downloads/ReachBrowser.exe" },
        { label: "Download Android APK", href: "/downloads/ReachBrowser.apk", variant: "secondary" },
      ]}
    />
  );
}
