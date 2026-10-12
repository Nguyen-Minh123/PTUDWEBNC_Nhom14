import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000', // MinIO S3
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google Avatar
      },
      {
        protocol: 'https',
        hostname: 'api.culinaryblog.vn',
      },
    ],
  },
};

export default nextConfig;
