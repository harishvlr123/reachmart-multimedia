import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Reach Chat" };

export default function ChatPage() {
  return (
    <FeaturePage
      app={getApp("chat")}
      downloadActions={[
        { label: "Open Web Chat", href: "https://timepass.reachmart.in", external: true },
        { label: "Download Android APK", href: "/downloads/ReachChat.apk", variant: "secondary" },
        { label: "Download PC App", href: "/downloads/ReachChat.exe", variant: "secondary" },
      ]}
    />
  );
}
