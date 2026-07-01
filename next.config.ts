import type { NextConfig } from "next";
import path from 'path';
import { fileURLToPath } from 'url';



const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      }, { protocol: 'https', hostname: 'images.unsplash.com' },
    ],

  },
};

export default nextConfig;
