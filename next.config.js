/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  distDir: 'out',
  generateBuildId: async () => 'build',
  output: 'export',
};

module.exports = nextConfig;
