import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Post Free Ad" };

export default function PostAdPage() {
  return (
    <FeaturePage
      app={getApp("marketplace")}
      ctaLabel="Continue to ReachMart"
      ctaHref="https://reachmart.in/post"
      external
    />
  );
}
