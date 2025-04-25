/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Completely disable static optimization and pre-rendering
  experimental: {
    // Disable static generation completely during build
    disableStaticGenerationForPages: true,
    disableOptimizedLoading: true,
  },
  // Force all builds to be simple production builds without static optimization
  productionBrowserSourceMaps: false,
  // Disable all optimization during build
  optimizeFonts: false,
  swcMinify: false,
  compress: false,
  webpack: (config, { isServer }) => {
    // Suppress webpack cache warnings
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://orders-management-production.up.railway.app/:path*",
      },
    ];
  },
};
export default nextConfig;
