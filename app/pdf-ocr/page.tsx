import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getApp } from "@/lib/apps";

export const metadata: Metadata = { title: "PDF OCR Reader" };

export default function PdfOcrPage() {
  return <FeaturePage app={getApp("pdf-ocr")} ctaLabel="Open Beta" ctaHref="/coming-soon" />;
}
