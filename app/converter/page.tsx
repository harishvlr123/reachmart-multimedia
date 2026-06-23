import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "Online Converter" };

export default function ConverterPage() {
  return <FeaturePage app={getApp("converter")} />;
}
