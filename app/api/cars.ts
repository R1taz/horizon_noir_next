export const getCars = async () => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_BACKEND_URL
		const res = await fetch(`${baseUrl}/api/cars`)
		if (!res.ok) throw new Error('Failed to fetch')
		return res.json()
	} catch (error) {
		console.log(`Произошла ошибка: ${error}`)
	}
}

export const getCar = async (carId: number) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/cars/${carId}`)
		if (!res.ok) throw new Error('Failed to fetch')
		return res.json()
	} catch (error) {
		console.log(`Произошла ошибка: ${error}`)
	}
}

export const removeCar = async (carId: number) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/cars/${carId}`, {
			method: 'DELETE',
		})
		if (!res.ok) throw new Error('Failed to fetch')
		return res.json()
	} catch (error) {
		console.log(`Произошла ошибка: ${error}`)
	}
}
