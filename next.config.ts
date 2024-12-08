import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    headersTimeout: 120, // Increased to 120 seconds (2 minutes)
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'], // Add any other allowed origins
    },
  },
}

module.exports = nextConfig

