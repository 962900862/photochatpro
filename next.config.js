/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/photochatpro' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/photochatpro/' : '',
  trailingSlash: true,
  distDir: 'dist',
  generateBuildId: async () => 'build',
};

module.exports = nextConfig;
