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
	webpack(config) {
		// Найдем правило для обработки SVG, если оно уже существует
		const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

		// Убираем SVG из правила file-loader (если оно есть)
		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/i
		}

		// Добавляем правило для @svgr/webpack
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'], // Используем @svgr/webpack для конвертации SVG в React компоненты
		})

		return config
	},
}

export default nextConfig
