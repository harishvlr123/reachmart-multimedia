import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Reach Dating" };

export default function DatingPage() {
  return <FeaturePage app={getApp("dating")} />;
}
