import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CarDetailClient from './CarDetailClient'
import type { ICar } from '@/app/interfaces/carsInterface'

export const revalidate = 60

const API = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || 'http://localhost:5000'

async function getCar(carId: string): Promise<ICar | null> {
	try {
		const res = await fetch(`${API}/api/cars/${carId}`, {
			next: { revalidate: 60 },
		})
		if (!res.ok) return null
		const data = await res.json()
		if (!data?.car) return null
		return data as ICar
	} catch {
		return null
	}
}

interface PageProps {
	params: { carId: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const car = await getCar(params.carId)
	if (!car) return { title: 'Автомобиль не найден' }

	const title = `${car.car.brand} ${car.car.model} ${car.car.manufacturer_date} года`
	const price = Number(car.car.price).toLocaleString('ru-RU')
	const volume = car.model.engine_volume ? `${car.model.engine_volume} л / ` : ''
	const description = `Купить ${car.car.brand} ${car.car.model} ${car.car.manufacturer_date} года в Horizon Noir. Двигатель ${car.model.engine_type}, ${volume}${car.model.power} л.с. Цена ${price} ₽. Покупка с доставкой или резервирование в дилерстве.`

	const mainPhoto = car.photos.find(p => p.main_photo)
	const ogImage = mainPhoto ? `${API}/${mainPhoto.url.replace(/\\/g, '/')}` : undefined

	return {
		title,
		description,
		alternates: { canonical: `/catalog/${params.carId}` },
		openGraph: {
			title: `${title} | Horizon Noir`,
			description,
			type: 'website',
			images: ogImage ? [{ url: ogImage, width: 800, height: 600, alt: title }] : undefined,
		},
	}
}

export default async function CarDetailPage({ params }: PageProps) {
	const car = await getCar(params.carId)
	if (!car) notFound()

	return <CarDetailClient car={car} />
}
