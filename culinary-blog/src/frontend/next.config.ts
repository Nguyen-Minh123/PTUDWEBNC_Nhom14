import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
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
      {
        protocol: 'https',
        hostname: 'api.culinaryblog.vn',
      },
    ],
  },
};

export default nextConfig;
