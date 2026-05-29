import type { MetadataRoute } from 'next'

export const revalidate = 3600

const API = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || 'http://localhost:5000'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface CarItem {
	car: { id: number; updated_at: string }
}

async function getAllCars(): Promise<CarItem[]> {
	try {
		const res = await fetch(`${API}/api/cars?page=1&limit=500`, {
			next: { revalidate: 3600 },
		})
		if (!res.ok) return []
		return res.json()
	} catch {
		return []
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const cars = await getAllCars()

	const staticPages: MetadataRoute.Sitemap = [
		{ url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
		{ url: `${SITE_URL}/catalog`, changeFrequency: 'daily', priority: 0.9 },
		{ url: `${SITE_URL}/login`, changeFrequency: 'monthly', priority: 0.3 },
		{ url: `${SITE_URL}/registration`, changeFrequency: 'monthly', priority: 0.3 },
	]

	const carPages: MetadataRoute.Sitemap = cars.map(c => ({
		url: `${SITE_URL}/catalog/${c.car.id}`,
		lastModified: c.car.updated_at ? new Date(c.car.updated_at) : new Date(),
		changeFrequency: 'weekly',
		priority: 0.8,
	}))

	return [...staticPages, ...carPages]
}
