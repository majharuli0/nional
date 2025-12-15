import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // This is crucial! It tells the app: "I live in the /pdf folder"
  basePath: '/pdf', 
  images: { unoptimized: true },
};

export default nextConfig;
