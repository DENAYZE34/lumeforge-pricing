import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Веб-разработка", href: "/pricing#matrix" },
  { label: "AI-автоматизация", href: "/pricing#matrix" },
  { label: "MCP-серверы", href: "/pricing#matrix" },
  { label: "Видео / аудио", href: "/pricing#matrix" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/lumeforge-logo.jpg`}
            alt="Lumeforge"
            width={32}
            height={32}
            className="h-8 w-8 rounded-md object-cover"
          />
          <span className="text-sm font-extrabold tracking-wide text-white">
            Lumeforge
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white sm:block"
          >
            Cinema Studio
          </Link>
          <Link
            href="/pricing"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-white/90"
          >
            Тарифы
          </Link>
        </div>
      </div>
    </header>
  );
}
