import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google OAuth avatars
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000', // MinIO local storage
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000', // MinIO loopback
      },
    ],
  },
};

export default nextConfig;
