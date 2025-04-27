import { ICarData } from './types'

export const addCar = async (carData: FormData) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/cars`, {
			method: 'POST',
			/* 		headers: {
				Authorization: 'Bearer',
			}, */
			body: carData,
		})
		if (!res.ok) throw new Error('Failed to fetch')
		return res.json()
	} catch (error) {
		console.log(`Произошла ошибка: ${error}`)
	}
}
