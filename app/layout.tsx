import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  title: {
    default: "ReachMart Multimedia",
    template: "%s | ReachMart Multimedia",
  },
  description:
    "Shopping, media tools, AI converters, browser, chat, dating, matrimony and Tamil jathagam in one premium portal.",
};

export const viewport: Viewport = {
  themeColor: "#071426",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
