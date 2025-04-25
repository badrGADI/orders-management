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
  // Added for handling static generation issues
  output: "standalone",
  experimental: {
    // Skip building the not-found page during static generation
    skipTrailingSlashRedirect: true,
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

export default nextConfig;
