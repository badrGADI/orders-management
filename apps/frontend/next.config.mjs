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
  // Moved from experimental per warning message
  skipTrailingSlashRedirect: true,
  // Added for handling static generation issues
  output: "standalone",
  // Disable tracing to avoid permission errors
  generateBuildId: async () => {
    // This will disable trace generation
    process.env.NEXT_DISABLE_TRACERS = "1";
    return "build-" + Date.now();
  },
  experimental: {
    disableOptimizedLoading: true,
  },
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
        destination: "http://localhost:3001/:path*",
      },
    ];
  },
  // Add redirects to handle not-found page
  async redirects() {
    return [
      {
        source: "/_not-found",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

// Use CommonJS module.exports instead of ES module export
module.exports = nextConfig;
