import Image from "next/image";
import { withBasePath } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 text-center text-white">
      <Image
        src={withBasePath("/brand/lumeforge-logo.jpg")}
        alt="Lumeforge"
        width={56}
        height={56}
        className="h-14 w-14 rounded-xl object-cover"
      />
      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/50">
        Lumeforge
      </span>
      <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
        Web development, AI automation and custom MCP servers
      </h1>
      <p className="max-w-xl text-white/50">
        Cinematic video production and technical strategy for teams that ship.
      </p>
      <a
        href={withBasePath("/pricing")}
        className="rounded-full bg-gradient-to-r from-[#ff6a1f] to-[#ff3d1a] px-6 py-3 text-sm font-bold text-black"
      >
        View pricing
      </a>
    </main>
  );
}
