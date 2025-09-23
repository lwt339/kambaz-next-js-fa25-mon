/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.staradvertiser.com',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
}

module.exports = nextConfig
