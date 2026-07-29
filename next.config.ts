import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires every quality used by next/image to be declared here.
    qualities: [75, 82],
    // The audience is on Indian mobile networks; AVIF first is a real saving.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
