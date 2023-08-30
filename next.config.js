/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["*.s3.amazonaws.com", "s3.us-east-2.amazonaws.com", "us-east-2.amazonaws"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "zuzana-eco-blog.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
