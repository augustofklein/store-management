/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_BACKEND_API: process.env.REACT_APP_BACKEND_API
  },
};

export default nextConfig;
