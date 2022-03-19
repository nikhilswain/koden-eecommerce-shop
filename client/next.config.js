module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URI}/api/:path*` // Proxy to Backend
      }
    ]
  }
}
