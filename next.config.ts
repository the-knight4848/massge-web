import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* วางโค้ดด้านล่างนี้แทนที่บรรทัดที่ 4 เดิม */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;