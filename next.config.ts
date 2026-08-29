import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = '';

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
  if (repo && !process.env.CUSTOM_DOMAIN) {
    basePath = `/${repo}`;
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || basePath,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  devIndicators: false,
};

export default nextConfig;
