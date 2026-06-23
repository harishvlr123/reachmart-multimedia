import Link from "next/link";

const productLinks = [
  ["All Apps", "/apps"],
  ["ReachBrowser", "/browser"],
  ["PDF OCR", "/pdf-ocr"],
  ["Downloads", "/downloads"],
] as const;

const exploreLinks = [
  ["Marketplace", "/post-ad"],
  ["AI Video", "/ai-video"],
  ["Tamil Matrimony", "/matrimonial"],
  ["Tamil Jathagam", "/jathagam"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-black/15">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 font-black text-white">
              R
            </span>
            <div>
              <p className="font-bold text-white">ReachMart Multimedia</p>
              <p className="text-xs text-slate-500">One portal. More possibilities.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-500">
            Shopping, media utilities, AI tools, communication, and Tamil-focused
            services brought together in one premium digital home.
          </p>
        </div>
        <FooterColumn title="Products" links={productLinks} />
        <FooterColumn title="Explore" links={exploreLinks} />
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} ReachMart Multimedia.</p>
          <p>Built for the ReachMart ecosystem.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-sm text-slate-500 transition hover:text-cyan-300">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
