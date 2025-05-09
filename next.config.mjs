/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		staleTimes: {
			dynamic: 0,
			static: 180,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
				pathname: '/uploads/**',
			},
		],
	},
}

export default nextConfig
