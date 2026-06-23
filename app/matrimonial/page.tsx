import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Tamil Matrimony" };

export default function MatrimonialPage() {
  return <FeaturePage app={getApp("matrimonial")} />;
}
