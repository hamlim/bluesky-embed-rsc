/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.bsky.app",
        protocol: "https",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
