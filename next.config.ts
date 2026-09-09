import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  agentRules: false,
  devIndicators: false,
  reactStrictMode: false,
};

export default nextConfig;
