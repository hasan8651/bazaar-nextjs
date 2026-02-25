/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // This allows insecure sources if needed
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;