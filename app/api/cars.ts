import { ICar } from '../interfaces/carsInterface'
import { axiosInstance } from '../src/shared/api/axiosInstance'
import { IFilters } from '../src/shared/types/filters'

export const getCars = async (
	page: number,
	limit: number,
	filters?: IFilters,
	sort?: boolean
): Promise<ICar[]> => {
	let queryPath = ''

	if (filters) {
		for (let key in filters) {
			const typedKey = key as keyof IFilters
			if (!Array.isArray(filters[typedKey])) {
				queryPath += `&${key}=${filters[typedKey]}`
			} else {
				if (filters[typedKey].length !== 0) {
					queryPath += '&'

					filters[typedKey].forEach((el, idx) => {
						if (idx === 0) queryPath += `${key}=${el}`
						else queryPath += `,${el}`
					})
				}
			}
		}
	}

	if (sort) queryPath += `&sort=${sort}`

	try {
		const res = await axiosInstance.get(`/api/cars?page=${page}&limit=${limit}${queryPath}`)
		if (res.status !== 200) throw new Error('Failed to fetch')
		return res.data
	} catch (error) {
		console.log(`Произошла ошибка: ${error}`)
		return []
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
