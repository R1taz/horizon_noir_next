import type { Metadata } from 'next'
import CatalogClient from './CatalogClient'

export const revalidate = 60

const API = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || 'http://localhost:5000'

export const metadata: Metadata = {
	title: 'Каталог автомобилей',
	description:
		'Премиум-автомобили Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz и Audi в наличии. Заказ с доставкой и резервирование в дилерствах Horizon Noir.',
	alternates: { canonical: '/catalog' },
	openGraph: {
		title: 'Каталог автомобилей | Horizon Noir',
		description:
			'Премиум-автомобили в наличии: Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz и Audi.',
		type: 'website',
	},
}

interface SeoCar {
	car: {
		id: number
		brand: string
		model: string
		price: string
		manufacturer_date: number
	}
}

async function getCarsForSeo(): Promise<SeoCar[]> {
	try {
		const res = await fetch(`${API}/api/cars?page=1&limit=50`, {
			next: { revalidate: 60 },
		})
		if (!res.ok) return []
		return res.json()
	} catch {
		return []
	}
}

export default async function CatalogPage() {
	const cars = await getCarsForSeo()

	return (
		<>
			{/* SEO block — indexable by search engines, visually hidden */}
			<section className='sr-only'>
				<h1>Каталог премиум-автомобилей Horizon Noir</h1>
				<p>
					В нашем салоне представлены {cars.length} автомобилей премиум-класса от ведущих
					производителей — Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz и Audi. Покупка с
					доставкой по России или резервирование в дилерствах Москвы, Санкт-Петербурга, Минска и
					Алматы.
				</p>
				<ul>
					{cars.map(item => (
						<li key={item.car.id}>
							<a href={`/catalog/${item.car.id}`}>
								{item.car.brand} {item.car.model} {item.car.manufacturer_date} года, цена{' '}
								{Number(item.car.price).toLocaleString('ru-RU')} ₽
							</a>
						</li>
					))}
				</ul>
			</section>

			<CatalogClient />
		</>
	)
}
