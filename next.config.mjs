/** @type {import('next').NextConfig} */
const nextConfig = {
  // R3F canvases double-mount under StrictMode in dev, which replays the hero
  // intro animation and can re-attach the scene background. Off for stability.
  reactStrictMode: false,
  transpilePackages: ["three"],
};

export default nextConfig;
