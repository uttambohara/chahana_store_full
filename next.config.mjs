/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.freepik.com",
        protocol: "https",
      },
      {
        hostname: "prgbwpzcwoxdqzqzvhdh.supabase.co",
        protocol: "https",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
