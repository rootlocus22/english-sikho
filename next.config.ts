import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/topic/:slug',
        destination: '/learn/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
