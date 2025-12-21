/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// Allow cross-origin requests in development mode
if (process.env.NODE_ENV === 'development') {
  // Get all possible network IPs that might access the server
  // Add your mobile's IP here when you know it (format: 'http://172.16.22.x:3000')
  nextConfig.allowedDevOrigins = [
    'http://172.16.23.81:3000',
    'http://172.16.22.87:3000', // Mobile device IP
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]
  
  // Also add CORS headers
  nextConfig.headers = async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig

