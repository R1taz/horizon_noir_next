import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from './src/shared/ui/Header'
import ReactQueryProvider from './providers/ReactQueryProvider'
import { WebSocketProvider } from './src/shared/contexts/WebSocketContext'
import AnimateNotification from './src/shared/ui/AnimateNotification'
import ClientAuthInit from './providers/ClientAuthInit'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'Horizon Noir — премиум-автосалон',
		template: '%s | Horizon Noir',
	},
	description:
		'Премиум-автосалон Horizon Noir: Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz и Audi в наличии. Покупка с доставкой и резервирование в дилерствах Москвы, Санкт-Петербурга, Минска и Алматы.',
	keywords: [
		'премиум автосалон',
		'купить Ferrari',
		'купить Lamborghini',
		'купить Porsche',
		'купить BMW',
		'купить Mercedes-Benz',
		'купить Audi',
		'Horizon Noir',
		'автосалон Москва',
	],
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		siteName: 'Horizon Noir',
		title: 'Horizon Noir — премиум-автосалон',
		description:
			'Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz и Audi в наличии. Покупка с доставкой и резервирование в дилерствах.',
	},
	robots: {
		index: true,
		follow: true,
	},
}

export const viewport: Viewport = {
	themeColor: '#0e0e0e',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className='font-wix bg-900 xl:px-20 md:px-8 px-10'>
				<ReactQueryProvider>
					<WebSocketProvider>
						<ClientAuthInit>
							<Header />
							{children}
						</ClientAuthInit>
						<AnimateNotification />
					</WebSocketProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
