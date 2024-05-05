module.exports = {
    output: 'standalone',
    experimental: {
      serverActions: {
        allowedOrigins: ['http://127.0.0.1:8000', '*.my-proxy.com'],
      },
    },
    compiler: {
      // removeConsole: true,
    },
  }