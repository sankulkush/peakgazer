import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires every quality used by next/image to be declared here.
    // An undeclared quality does not fall back — it returns a 44-byte error.
    // 48 is the ascent backgrounds only: they sit under a ~0.73 veil, where
    // compression artefacts are not resolvable and the bytes are.
    qualities: [48, 75, 82],
    // The audience is on Indian mobile networks; AVIF first is a real saving.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
