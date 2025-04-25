/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Switch to export mode which disables static generation of pages
  output: "standalone",
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip linting during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Must unoptimize images in export mode
  images: {
    unoptimized: true,
  },
  // Disable all the features that require a server
  trailingSlash: true,
  // Disable redirects and rewrites in export mode
  // They won't work anyway in a static export

  webpack: (config, { isServer }) => {
    // Suppress webpack cache warnings
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
};

export default nextConfig;
