import { axiosInstance } from '../src/shared/api/axiosInstance'

export const getCars = async () => {
	try {
		const res = await axiosInstance.get('/api/cars')
		if (res.status !== 200) throw new Error('Failed to fetch')
		return res.data
	} catch (error) {
		console.log(`Произошла ошибка: ${error}`)
	}
}

export const getCar = async (carId: number) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/cars/${carId}`)
		if (!res.ok) throw new Error('Fetch to failed')
		return res.json()
	} catch (error) {
		console.log(`Произошла ошибка: ${error}`)
		throw new Error()
	}
}

export const removeCar = async (carId: number) => {
	try {
		const res = await axiosInstance.delete(`/api/cars/${carId}`)
		if (res.status !== 200) throw new Error(`HTTP status: ${res.status}`)
		return res.data
	} catch (error: any) {
		if (error.response) {
			const customError = new Error(`Request failed with status ${error.response.status}`)
			customError.response = error.response
			throw customError
		}
		throw new Error('Network error or something went wrong')
	}
}
