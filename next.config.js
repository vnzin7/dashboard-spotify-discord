/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.scdn.co', // Spotify images
      'cdn.discordapp.com', // Discord images
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
