import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/lumeforge-pricing" : "";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : "standalone",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: isGithubPages },
};

export default nextConfig;
