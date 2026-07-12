import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vinext emits dist/standalone/server.js for the VPS container when this is set.
  output: "standalone",
};

export default nextConfig;
