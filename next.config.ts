import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许 127.0.0.1 访问 dev 资源（HMR WebSocket 等）；localhost 默认受信任。
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
