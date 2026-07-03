import type { Metadata } from "next";
import { DownloadHubSection } from "@/components/download-hub";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <main>
      <DownloadHubSection compact />
    </main>
  );
}
