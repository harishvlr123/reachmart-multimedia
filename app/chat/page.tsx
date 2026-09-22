import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Reach Chat" };

export default function ChatPage() {
  return <FeaturePage app={getApp("chat")} />;
}
