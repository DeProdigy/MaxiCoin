/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    INFURA_KEY: process.env.INFURA_KEY,
  },
}

module.exports = nextConfig
