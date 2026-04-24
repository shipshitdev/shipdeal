import type { NextConfig } from 'next';

const config: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  output: 'export',
  transpilePackages: ['@shipdeal/product'],
};

export default config;
