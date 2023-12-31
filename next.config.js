/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  images: {
    domains: ["gfxckaozxzzmskgpjjln.supabase.co"],
  },
};

const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const plugins = [withBundleAnalyzer];

module.exports = withPlugins(plugins, nextConfig);
