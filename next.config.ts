import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/lumeforge-pricing" : "";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : "standalone",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: isGithubPages },
  env: {
    // next/image does not prefix `src` with basePath when unoptimized,
    // so local <Image> usages prepend this manually.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
