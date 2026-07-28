import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Serve the exact source pixels of downloaded assets (faithful clone /
  // deterministic visual QA); no on-the-fly re-encoding.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
