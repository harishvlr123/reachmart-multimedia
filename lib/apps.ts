export type AppStatus = "Live" | "Beta" | "Coming Soon" | "Download";

export type AppCategory = "Marketplace" | "Media Tools" | "AI Tools" | "Social & Matrimony";

export type ReachApp = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  status: AppStatus;
  href: string;
  icon: string;
  category: AppCategory;
  features: string[];
  accent: string;
  ctaLabel?: string;
};

export const reachVideoStudioReleaseUrl =
  "https://github.com/harishvlr123/reachvideostudio/releases/tag/v0.3.0";

export const tamilAstroUrl = "https://tamilastro.reachmart.in";
export const matrimonyUrl = "https://matrimony.reachmart.in";
export const youtubeChannelUrl = "REPLACE_WITH_YOUTUBE_CHANNEL_LINK";

export const reachVideoStudioDetails = [
  ["Windows PC Installer", "Ready for Windows desktops"],
  ["Version 0.3.0", "Current Windows release"],
  ["Size about 314 MB", "GitHub Releases download"],
  ["Android APK Coming Soon", "Mobile version coming later"],
  ["3D Video Coming Soon", "Planned premium playback mode"],
] as const;

export const apps: ReachApp[] = [
  {
    slug: "reach-video-studio",
    title: "ReachVideoStudio",
    shortTitle: "VideoStudio",
    description:
      "Premium Windows video/audio player with playlist, fullscreen playback, custom skins, custom background, and 3D Video Coming Soon.",
    longDescription:
      "Premium Windows video/audio player with playlist, fullscreen playback, custom skins, custom background, and 3D Video Coming Soon.",
    status: "Download",
    href: reachVideoStudioReleaseUrl,
    icon: "RVS",
    category: "Media Tools",
    features: [
      "Windows PC Installer",
      "Version 0.3.0",
      "Size about 314 MB",
      "Android APK Coming Soon",
      "3D Video Coming Soon",
    ],
    accent: "from-blue-500 via-violet-500 to-pink-500",
    ctaLabel: "Download for Windows",
  },
  {
    slug: "marketplace",
    title: "ReachMart Marketplace",
    shortTitle: "Marketplace",
    description: "Buy and sell products near you.",
    longDescription:
      "List products, discover local deals, and connect with buyers and sellers through the ReachMart marketplace.",
    status: "Live",
    href: "/post-ad",
    icon: "🛍️",
    category: "Marketplace",
    features: ["Post local listings", "Discover nearby products", "Simple seller connection"],
    accent: "from-blue-500 to-cyan-400",
  },
  {
    slug: "browser",
    title: "ReachBrowser",
    shortTitle: "ReachBrowser",
    description: "Fast Windows browser with smart tools.",
    longDescription:
      "A focused Windows browser built for everyday speed, useful utilities, and a cleaner way to get things done online.",
    status: "Download",
    href: "/browser",
    icon: "🌐",
    category: "Media Tools",
    features: ["Fast Windows browsing", "Integrated smart tools", "Clean, focused interface"],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    slug: "audio-player",
    title: "Reach Player",
    shortTitle: "Reach Player",
    description:
      "Premium local audio and video player with playlists, karaoke, skins, equalizer and visualizers.",
    longDescription:
      "Play local audio and video with multiple playlists, favorites, karaoke tools, visualizers, effects, subtitles, and installable PWA support.",
    status: "Beta",
    href: "/audio-player",
    icon: "🎧",
    category: "Media Tools",
    features: ["Mixed audio and video playlists", "Karaoke, effects and visualizers", "Installable browser app"],
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "video-player",
    title: "Reach Video Player",
    shortTitle: "Video Player",
    description: "VLC-style online video player.",
    longDescription:
      "A capable browser-based video player experience with familiar controls and a polished distraction-free layout.",
    status: "Beta",
    href: "/video-player",
    icon: "🎬",
    category: "Media Tools",
    features: ["Local video playback", "Familiar media controls", "Full-screen friendly design"],
    accent: "from-orange-500 to-rose-500",
  },
  {
    slug: "pdf-ocr",
    title: "PDF OCR Reader",
    shortTitle: "PDF OCR",
    description: "Read PDF and extract Tamil/English text.",
    longDescription:
      "Turn scanned PDF pages into useful Tamil and English text with a clear workflow built for reading and extraction.",
    status: "Beta",
    href: "/pdf-ocr",
    icon: "📄",
    category: "AI Tools",
    features: ["Tamil and English OCR", "Readable text extraction", "PDF-focused workflow"],
    accent: "from-emerald-500 to-cyan-500",
  },
  {
    slug: "converter",
    title: "Online Converter",
    shortTitle: "Converter",
    description: "Convert audio, video, photo and PDF files.",
    longDescription:
      "A unified conversion workspace for common media and document formats, designed to keep every tool in one place.",
    status: "Coming Soon",
    href: "/converter",
    icon: "🔄",
    category: "Media Tools",
    features: ["Audio and video formats", "Photo conversion", "PDF utilities"],
    accent: "from-sky-500 to-indigo-500",
  },
  {
    slug: "ai-video",
    title: "AI Video Converter",
    shortTitle: "AI Video",
    description: "AI-powered video tools and converter.",
    longDescription:
      "Prepare, enhance, and transform video with an upcoming set of AI-assisted tools built for practical creative work.",
    status: "Coming Soon",
    href: "/ai-video",
    icon: "✨",
    category: "AI Tools",
    features: ["AI-assisted workflows", "Smart video conversion", "Creator-friendly tools"],
    accent: "from-purple-500 to-pink-500",
  },
  {
    slug: "chat",
    title: "Reach Chat",
    shortTitle: "Reach Chat",
    description: "Telegram-style secure chat app.",
    longDescription:
      "An upcoming communication space for direct conversations, groups, and a focused messaging experience.",
    status: "Coming Soon",
    href: "/chat",
    icon: "💬",
    category: "Social & Matrimony",
    features: ["Direct conversations", "Group-ready design", "Privacy-focused direction"],
    accent: "from-blue-500 to-violet-500",
  },
  {
    slug: "dating",
    title: "Reach Dating",
    shortTitle: "Dating",
    description: "Friend and dating connection app.",
    longDescription:
      "A thoughtful upcoming space for meeting new people, building friendships, and discovering meaningful connections.",
    status: "Coming Soon",
    href: "/dating",
    icon: "💞",
    category: "Social & Matrimony",
    features: ["Connection-first profiles", "Friendship and dating", "Simple discovery experience"],
    accent: "from-pink-500 to-rose-500",
  },
  {
    slug: "matrimonial",
    title: "ReachMart Matrimony",
    shortTitle: "Matrimony",
    description: "Community matrimony profile and matching service.",
    longDescription:
      "Community matrimony profile and matching service for clear profiles, family-friendly discovery, and meaningful connections.",
    status: "Live",
    href: matrimonyUrl,
    icon: "💍",
    category: "Social & Matrimony",
    features: ["Community profiles", "Matching service", "Family-friendly experience"],
    accent: "from-amber-500 to-orange-500",
    ctaLabel: "Open Matrimony",
  },
  {
    slug: "jathagam",
    title: "Tamil Astro",
    shortTitle: "Tamil Astro",
    description: "Tamil astrology, jathagam, horoscope, matching, and reports.",
    longDescription:
      "Tamil astrology, jathagam, horoscope, matching, and reports for people who want clear Tamil astrology tools online.",
    status: "Live",
    href: tamilAstroUrl,
    icon: "🔯",
    category: "Social & Matrimony",
    features: ["Tamil horoscope reports", "Jathagam matching", "Accessible astrology insights"],
    accent: "from-indigo-500 to-purple-500",
    ctaLabel: "Open Tamil Astro",
  },
  {
    slug: "reachmarket-youtube",
    title: "ReachMarket YouTube",
    shortTitle: "YouTube",
    description: "Videos, tutorials, product updates, and ReachMarket apps.",
    longDescription:
      "Videos, tutorials, product updates, and ReachMarket apps in one ReachMarket video channel.",
    status: "Live",
    href: youtubeChannelUrl,
    icon: "YT",
    category: "Media Tools",
    features: ["Videos and tutorials", "Product updates", "ReachMarket apps"],
    accent: "from-red-500 to-pink-500",
    ctaLabel: "Open YouTube",
  },
];

export const featuredApps = apps.slice(0, 6);
export const launchedProductApps = apps.filter((app) =>
  ["reach-video-studio", "jathagam", "matrimonial", "reachmarket-youtube"].includes(app.slug),
);

export function getAppsByCategory(category: AppCategory) {
  return apps.filter((app) => app.category === category);
}

export function getApp(slug: string) {
  const app = apps.find((item) => item.slug === slug);

  if (!app) {
    throw new Error(`Unknown ReachMart app: ${slug}`);
  }

  return app;
}
