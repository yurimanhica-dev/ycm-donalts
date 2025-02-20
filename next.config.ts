import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "dbmib2q8rj.ufs.sh" },
      { hostname: "u9a6wmr3as.ufs.sh" },
    ],
  },
};

export default nextConfig;
