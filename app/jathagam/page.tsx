import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Tamil Jathagam" };

export default function JathagamPage() {
  return <FeaturePage app={getApp("jathagam")} />;
}
