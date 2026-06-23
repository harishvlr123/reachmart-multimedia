import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reach Player",
    short_name: "Reach Player",
    description: "Local audio and video player from ReachMart Multimedia.",
    start_url: "/audio-player",
    scope: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#071426",
    orientation: "any",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
