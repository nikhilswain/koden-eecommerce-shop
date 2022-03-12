module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:1337/api/:path*' // Proxy to Backend
      }
    ]
  }
}
