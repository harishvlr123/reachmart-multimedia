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
};

export const apps: ReachApp[] = [
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
    title: "Reach Audio Player",
    shortTitle: "Audio Player",
    description: "Winamp-style online audio player.",
    longDescription:
      "Play your audio in a nostalgic, modern player designed for quick local playback and effortless controls.",
    status: "Beta",
    href: "/audio-player",
    icon: "🎧",
    category: "Media Tools",
    features: ["Local audio playback", "Playlist-ready interface", "Responsive player controls"],
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
    title: "Tamil Matrimony",
    shortTitle: "Matrimony",
    description: "Tamil marriage matching platform.",
    longDescription:
      "A Tamil-focused matrimonial platform planned around clear profiles, family-friendly discovery, and meaningful matching.",
    status: "Coming Soon",
    href: "/matrimonial",
    icon: "💍",
    category: "Social & Matrimony",
    features: ["Tamil community focus", "Detailed matching profiles", "Family-friendly experience"],
    accent: "from-amber-500 to-orange-500",
  },
  {
    slug: "jathagam",
    title: "Tamil Jathagam",
    shortTitle: "Jathagam",
    description: "Horoscope, astrology and jathagam reports.",
    longDescription:
      "An upcoming Tamil astrology destination for clear horoscope insights, matching, and accessible jathagam reports.",
    status: "Coming Soon",
    href: "/jathagam",
    icon: "🔯",
    category: "Social & Matrimony",
    features: ["Tamil horoscope reports", "Jathagam matching", "Accessible astrology insights"],
    accent: "from-indigo-500 to-purple-500",
  },
];

export const featuredApps = apps.slice(0, 6);

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
